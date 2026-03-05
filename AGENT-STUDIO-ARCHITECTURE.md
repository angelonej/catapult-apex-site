# Agent Studio — Architecture Reference
*For use in external projects — March 2026*

---

## Overview

Agent Studio is a multi-agent AI advisory system. Companies configure a "board" of AI specialists, ask a strategic question, and the agents independently write memos, challenge each other in a rebuttal round, and produce a structured final decision.

The system is built as a TypeScript monorepo with clean package boundaries so any layer can be dropped into another project.

---

## Package Map

```
packages/
  agent-core/       — Types, Zod schemas, inheritance resolver, vertical overlay logic
  agent-registry/   — DynamoDB repositories for agents, verticals, companies, meetings
  agent-runtime/    — LLMClient (OpenAI wrapper) + AgentExecutor (memo/rebuttal generation)
  orchestrator/     — MeetingOrchestrator (the full meeting protocol)
  shared/           — DynamoDB client, logger, error classes, utilities

services/
  api/              — Lambda handler + Express dev server (routes → handlers)

apps/
  admin-ui/         — Next.js 14 Agent Studio (agent CRUD, verticals, presets)
  company-portal/   — Next.js 14 company-facing portal (sessions, board config, mobile)
```

---

## Layer Architecture

```
┌─────────────────────────────────────────┐
│           API Layer (Lambda)            │  services/api
│   POST /meetings/run → runMeeting()     │
│   POST /agents → createAgent()          │
│   GET  /agents/:id → getAgent()  etc.   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         MeetingOrchestrator             │  packages/orchestrator
│  Phase 1 → Resolve agents              │
│  Phase 2 → Parallel memo generation    │
│  Phase 2.5→ Rebuttal round             │
│  Phase 3 → Moderator critique          │
│  Phase 4 → Final structured decision   │
└──────┬──────────────┬───────────────────┘
       │              │
┌──────▼──────┐  ┌────▼────────────────────┐
│ AgentRuntime│  │    AgentRegistry         │
│             │  │                          │
│ LLMClient   │  │ AgentRepository          │
│  - OpenAI   │  │ AgentResolutionService   │
│    wrapper  │  │ VerticalRepository       │
│  - retry    │  │ CompanyOverlayRepository │
│  - JSON     │  │ MeetingRepository        │
│    parsing  │  │ SessionRepository        │
│             │  │                          │
│ AgentExecutor│  └────────────┬─────────────┘
│  - memo     │               │
│  - rebuttal │    ┌──────────▼──────────────┐
└─────────────┘    │       agent-core         │
                   │  Types + Zod schemas     │
                   │  Inheritance resolver    │
                   │  Vertical overlay logic  │
                   │  Validation              │
                   └──────────────────────────┘
                              │
                   ┌──────────▼──────────────┐
                   │         shared           │
                   │  DynamoDB client         │
                   │  Logger (pino)           │
                   │  Error classes           │
                   │  ID + time utils         │
                   └──────────────────────────┘
```

---

## Data Model (DynamoDB — single table)

One table, key pattern: `PK / SK`.

| Entity | PK | SK |
|---|---|---|
| Agent (versioned) | `AGENT#<agentId>` | `VERSION#<semver>` |
| Agent (latest pointer) | `AGENT#<agentId>` | `VERSION#latest` |
| Vertical overlay | `VERTICAL#<verticalId>` | `ROLE#<role>` |
| Meeting metadata | `MEETING#<meetingId>` | `METADATA` |
| Meeting event | `MEETING#<meetingId>` | `EVENT#<ts>#<seq>` |
| Company profile | `COMPANY#<companyId>` | `PROFILE` |
| Company overlay | `COMPANY_OVERLAY#<companyId>` | `OVERLAY` |
| Company API key | `COMPANY#<companyId>` | `API_KEY` |
| Pending session | `COMPANY#<companyId>` | `PENDING#<sessionId>` |
| Agent task | `TASK#<taskId>` | `RESULT` |
| Email task | `EMAIL_TASK#<taskId>` | `RESULT` |

**GSI1:** `GSI1PK=ROLE#<role>` → list all agents by role.

**Env var required:** `DYNAMODB_TABLE_NAME`

---

## Agent Resolution (the core algorithm)

Every agent at runtime is a **resolved agent** — the product of merging its full inheritance chain plus any vertical and company overlays.

### Merge rules

```
systemPrompt    → parentPrompt + "\n\n" + childPrompt   (concatenated, parent first)
tools           → union(parent, child)
capabilities    → union(parent, child)
modelPolicy     → child OVERRIDES parent entirely
limits          → child OVERRIDES parent entirely
```

### Prompt injection order (lowest → highest priority)

```
1. agent.exec.base          (ethics guardrails, core principles)
2. agent.exec.executive     (cross-functional strategic thinking)
3. agent.exec.cfo           (finance-specific layer)
4. vertical overlay         (e.g. food industry: FDA, CPG, co-packer context)
5. company overlay          (e.g. "our debt covenants are...", "we are Series B")
6. personality override     (e.g. "blunt tone, contrarian debate style, growth focus")
```

### Code path

```typescript
// packages/agent-core/src/inheritance-resolver.ts
export async function resolveAgent(agentId, fetcher, chain = []) {
  const config = await fetcher(agentId);           // load from DynamoDB
  if (!config.inherits) return toBaseResolved(config);

  const parent = await resolveAgent(config.inherits, fetcher, [...chain, agentId]);
  return {
    resolvedSystemPrompt: parent.resolvedSystemPrompt + '\n\n' + config.systemPrompt,
    resolvedTools:        union(parent.resolvedTools, config.tools),
    resolvedCapabilities: union(parent.resolvedCapabilities, config.capabilities),
    modelPolicy:          { ...config.modelPolicy },   // child wins
    limits:               { ...config.limits },         // child wins
    inheritanceChain:     [...chain, agentId],
  };
}

// packages/agent-registry/src/agent-resolution-service.ts
// After inheritance: apply vertical overlay, then company overlay
resolved = applyVerticalOverlay(resolved, verticalOverlay);
resolved = { ...resolved, resolvedSystemPrompt: resolved.resolvedSystemPrompt + '\n\n' + companyOverlay.promptAppend };
```

---

## Meeting Protocol (4 phases)

Implemented in `packages/orchestrator/src/meeting-orchestrator.ts`.

### Phase 1 — Intake
- Validate `agentIds`, `companyProfile`, `verticalId`
- Resolve every agent (inheritance + vertical + company overlays) — parallel
- Apply per-seat personality overrides (injected as final prompt block)
- Create `MEETING` record in DynamoDB with `status: 'running'`
- Emit `session_started` event

### Phase 2 — Memos (parallel)
- All non-moderator agents write independently — **no agent sees another's memo yet**
- Each agent receives: its resolved system prompt + company profile + strategic question + optional prior-meeting context
- Output per agent: `AgentMemo` — `{ content, keyPoints, risks, recommendations, confidence }`
- Events emitted: `agent_thinking` → `memo_posted` per agent

### Phase 2.5 — Rebuttals (optional, parallel)
- Each agent reads **all other agents' memos** and writes a rebuttal
- Output: `AgentRebuttal` — `{ content, agreements, challenges, newInsights, positionChanged }`
- Events: `rebuttal_thinking` → `rebuttal_posted`
- Skipped when `enableRebuttals: false`

### Phase 3 — Moderator Critique
- Moderator agent reads all memos + rebuttals
- Produces: `ModeratorCritique` — `{ summary, agreements, disagreements, gaps, synthesisNotes }`
- Event: `critique_started` → `critique_complete`

### Phase 4 — Decision
- Moderator synthesises final `MeetingOutput` JSON:
  ```typescript
  {
    decision: string,
    confidence: number,
    voteSummary: Record<agentId, { stance, rationale }>,
    keyRisks: [{ risk, severity, mitigationStrategy }],
    assumptions: string[],
    recommendedActions: [{ action, owner, timeframe, priority }],
    fullReport: string,
    memos, rebuttals, critique,
  }
  ```
- Written back to DynamoDB, `status: 'completed'`
- Event: `decision_started` → `session_complete`

### Async execution model
`runAsync()` creates the meeting record and returns `{ meetingId }` immediately. The orchestration runs in a Lambda worker (`run-worker.ts`) invoked asynchronously. The portal polls `GET /meetings/:id` or streams `GET /meetings/:id/events` for live updates.

---

## LLM Client

`packages/agent-runtime/src/llm-client.ts`

- Thin wrapper around OpenAI Chat Completions
- Enforces `ModelPolicy` per agent (model, maxTokens, temperature, topP, etc.)
- Exponential backoff retry on 429 / 408
- `completeJSON<T>()` — forces JSON-only output, strips markdown fences, sanitizes control characters before `JSON.parse`
- Per-company API key support — pass `openaiApiKey` on `RunMeetingInput` to bill usage to the company's own OpenAI account

```typescript
const llm = new LLMClient(optionalApiKey);
const result = await llm.completeJSON<AgentMemo>({
  systemPrompt: agent.resolvedSystemPrompt,
  userMessage:  buildMemoPrompt(companyProfile, context),
  modelPolicy:  agent.modelPolicy,
});
```

---

## Agent Tiers

| Tier | Purpose | Examples |
|---|---|---|
| `strategic` | Board-level advisor — writes memos, votes, rebuttals | CEO, CFO, CTO, Moderator |
| `operational` | Functional exec — advises + runs domain tasks | CHRO, VP Sales, Controller |
| `assistant` | Task execution — drafts, analysis, coordination | Bookkeeper, SDR, HR Coord |

---

## Inheritance Tree (seed agents)

```
agent.exec.base                   ← ethics guardrails, core advisory principles
  └── agent.exec.executive        ← cross-functional strategic thinking
        ├── agent.exec.ceo
        ├── agent.exec.cfo
        ├── agent.exec.coo
        ├── agent.exec.cto
        ├── agent.exec.cmo
        ├── agent.exec.chro
        ├── agent.exec.vpsales
        ├── agent.exec.moderator
        ├── agent.advisor.legal
        ├── agent.advisor.tax
        ├── agent.advisor.controller
        ├── agent.advisor.strategy
        ├── agent.ops.field
        ├── agent.ops.csm
        ├── agent.assistant.bookkeeper
        ├── agent.assistant.fpa
        ├── agent.assistant.hr
        ├── agent.assistant.sdr
        ├── agent.assistant.marketing
        └── agent.assistant.ops-analyst

agent.food.base                   ← food/CPG fundamentals, FDA awareness
  ├── agent.food.brand
  ├── agent.food.rnd
  │     └── agent.food.heat-profile
  ├── agent.food.ops
  ├── agent.food.ecommerce
  ├── agent.food.regulatory
  ├── agent.food.copacker
  ├── agent.food.retail
  ├── agent.food.marketing
  ├── agent.food.consumer-psych
  ├── agent.food.chef
  └── agent.food.formulation
```

---

## Vertical System

A vertical is a named collection of `VerticalOverlay` records — one per agent role. Each overlay appends to that role's system prompt and adds tools/capabilities.

**Example:** `verticalId = "food.hot-sauce"` with a `role = "cfo"` overlay might add:
- `promptAppend`: "This company operates in the specialty food CPG space. Co-packer MOQs, broker margins, and DTC shipping costs are key financial drivers..."
- `capabilitiesAdd`: `["food-supply-chain", "regulatory-compliance"]`

Verticals can be created manually in Agent Studio or AI-generated via `POST /verticals/generate`.

---

## Company Overlay

A single free-text `promptAppend` appended to **every** agent's resolved prompt for a given company. Used for permanent company-wide context:
- Org structure
- Debt covenants / financial constraints
- Strategic priorities
- Competitive positioning

Applied last in the injection order — highest priority after personality overrides.

---

## Session Types

| Type | Description |
|---|---|
| `board-session` | Full formal advisory — memos, rebuttals, vote, structured decision |
| `status-meeting` | Quick roundtable — each member gives a short domain update |
| `planning-session` | Action items + owners + timelines |
| `one-on-one` | Single specialist deep-dive |
| `review-meeting` | Retrospective — what worked, what didn't |
| `product-session` | Roadmap & feature prioritization (CTO + CMO + COO focus) |
| `crisis-session` | Urgent triage — rapid decision under pressure, action owners |
| `hiring-session` | Key hire planning — role design, criteria, offer strategy |

---

## API Handler Pattern

All handlers follow the same pattern — works with AWS Lambda v2 events and the local Express dev server:

```typescript
// services/api/src/handlers/agents.ts
export async function createAgent(event: APIGatewayProxyEventV2) {
  if (getMethod(event) === 'OPTIONS') return corsHandler();
  try {
    const body = parseBody<unknown>(event);
    const config = validateAgentConfig(body);   // Zod validation
    await repo.save(config);
    return ok(config, 201);                      // { success: true, data: config }
  } catch (err) {
    return fail(err);                            // { success: false, error: { code, message } }
  }
}
```

Response helpers (`ok` / `fail`) live in `services/api/src/response.ts` and always return CORS headers.

---

## Infrastructure (CDK)

- **Single Lambda** with a `{proxy+}` catch-all route — all routing done in `src/index.ts`
- **Lambda Worker** — separate function for async meeting execution (invoked via `InvokeCommand`)
- **DynamoDB** — single table with GSI for role-based queries
- **API Gateway** — two authorizers:
  - `/admin/*` → API key auth (admin-ui)
  - `/*` → Cognito JWT auth (company portal)
- **Amplify** — hosts both Next.js apps with SSR

**Required env vars for Lambda:**
```
OPENAI_API_KEY
DYNAMODB_TABLE_NAME
AWS_REGION
```

---

## Implementing This in Another Project

### Minimum viable setup (meetings only)

1. **Copy or install `agent-core`** — types + inheritance resolver (only dep: `zod`)
2. **Implement a storage backend** — replace `AgentRepository` / `MeetingRepository` with your DB (the `AgentFetcher` interface is a plain async function, easy to swap)
3. **Instantiate the orchestrator:**
   ```typescript
   import { MeetingOrchestrator } from '@ai-exec-board/orchestrator';
   const orchestrator = new MeetingOrchestrator();
   const { meetingId } = await orchestrator.runAsync({
     companyProfile, agentIds, moderatorAgentId, verticalId, sessionType
   });
   ```
4. **Seed agents** — use `packages/agent-core/src/agents.ts` as your starter definitions, call `POST /agents` to load them into your store
5. **Point at the API** — use the client from `AGENT-STUDIO-API.md` if calling the existing backend, or host your own Lambda using `services/api`

### Key interfaces to implement for a custom backend

```typescript
// Replace DynamoDB with anything by implementing these shapes:
type AgentFetcher = (agentId: string) => Promise<AgentConfig | null>;

interface AgentStore {
  save(config: AgentConfig): Promise<void>;
  getById(agentId: string, version?: string): Promise<AgentConfig | null>;
  listAll(): Promise<AgentConfig[]>;
  listByRole(role: AgentRole): Promise<AgentConfig[]>;
}

interface MeetingStore {
  createMeeting(meta: Partial<MeetingMetadata>): Promise<void>;
  updateMeeting(meetingId: string, updates: Partial<MeetingMetadata>): Promise<void>;
  appendEvent(meetingId: string, event: SessionEvent): Promise<void>;
  getEvents(meetingId: string): Promise<SessionEvent[]>;
}
```
