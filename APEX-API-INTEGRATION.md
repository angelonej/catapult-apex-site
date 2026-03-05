# APEX Frontend ↔ Agent Studio API — Integration Notes
*Generated March 2026*

---

## What's been wired up

### New files
| File | Purpose |
|---|---|
| `src/lib/agentApi.ts` | Typed API client — all endpoints, all types from the architecture doc |
| `src/hooks/useAgents.ts` | React hooks with mock fallback: `useAgents`, `useAgent`, `useCreateMeeting`, `useMeetingEvents` |
| `infra/dynamodb/docker-compose.yml` | Local DynamoDB + Admin UI |
| `infra/dynamodb/seed-agents.ts` | Seeds 11 agents (base chain + 8 execs + moderator) into local DynamoDB |
| `infra/dynamodb/table-schema.ts` | PK/SK key patterns, table name, GSI1 definition |
| `.env.local.example` | Env var template |

### Wired components
| Component | What changed |
|---|---|
| `ScreenTeam` in `ApexPlatform.tsx` | Now calls `useAgents()` — real agents from API, optimistic pause/resume via `PATCH /agents/:id/status` |
| `ScreenDashboard` in `ApexPlatform.tsx` | Agent status strip and active count use live agent data |
| `ScreenBoardOfDirectors.tsx` | "Call to Order" triggers `POST /meetings/run`. Live phase events stream in via polling `GET /meetings/:id/events`. Session type selector + question input added. |

### Mock fallback behavior
If `VITE_AGENT_API_URL` is **not set** or the API is unreachable:
- `useAgents` → returns the 8 mock executives from `MOCK_AGENTS`
- `useCreateMeeting` → returns a `mock-meeting-<timestamp>` ID
- `useMeetingEvents` → simulates a full 4-phase board session with timed events (~8 seconds)

The UI is fully functional in mock mode with no backend required.

---

## Local dev setup

### 1. Start DynamoDB Local
```powershell
cd infra\dynamodb
docker-compose up -d
cd ..\..
```
- DynamoDB Local: `http://localhost:8000`
- Admin UI (table browser): `http://localhost:8001`

### 2. Seed agents
```powershell
# From repo root — run once to populate the table
$env:DYNAMODB_TABLE_NAME   = 'ApexAgentStudio-local'
$env:DYNAMODB_ENDPOINT     = 'http://localhost:8000'
$env:AWS_REGION            = 'us-east-1'
$env:AWS_ACCESS_KEY_ID     = 'local'
$env:AWS_SECRET_ACCESS_KEY = 'local'
npx tsx infra/dynamodb/seed-agents.ts
```
`@aws-sdk/client-dynamodb`, `@aws-sdk/lib-dynamodb`, and `tsx` are already in `devDependencies` — no extra install needed.

### 3. Start the backend API
In your Agent Studio backend repo (`services/api`) — PowerShell sets env vars before running:
```powershell
$env:DYNAMODB_TABLE_NAME    = 'ApexAgentStudio-local'
$env:DYNAMODB_ENDPOINT      = 'http://localhost:8000'
$env:AWS_REGION             = 'us-east-1'
$env:AWS_ACCESS_KEY_ID      = 'local'
$env:AWS_SECRET_ACCESS_KEY  = 'local'
$env:OPENAI_API_KEY         = 'sk-...'   # your key
npm run dev
# Starts Express dev server on :3001
```

### 4. Configure this frontend
```powershell
# .env.local was already created — open it and set:
#   VITE_AGENT_API_URL=http://localhost:3001
notepad .env.local
npm run dev
```

---

## Changes needed in the backend API

The frontend calls these endpoints exactly as defined in the architecture doc. The following **additions or confirmations** are needed:

### Required — confirm these exist
| Method | Path | Notes |
|---|---|---|
| `GET` | `/agents` | Must return array of `AgentConfig[]`. If it returns paginated results, add `?limit=100` support. |
| `GET` | `/agents/:id` | Returns single `AgentConfig` by `agentId` |
| `PATCH` | `/agents/:id/status` | Body: `{ status: 'active' \| 'paused' }`. **Needed** for pause/resume toggle. |
| `POST` | `/meetings/run` | Async — returns `{ meetingId }` immediately, runs in Lambda worker |
| `GET` | `/meetings/:id` | Returns `MeetingMetadata` including `status` and `output` when complete |
| `GET` | `/meetings/:id/events` | Returns `SessionEvent[]` array — frontend polls every 2s |
| `GET` | `/companies/:id` | Returns `CompanyProfile` |

### New endpoints to add
| Method | Path | Priority | Notes |
|---|---|---|---|
| `PATCH` | `/agents/:id/status` | **High** | Toggle active/paused. Simple DynamoDB update. |
| `GET` | `/agents?role=:role` | Medium | Already has GSI1 for this — just wire the route handler |
| `POST` | `/verticals/generate` | Low | AI-generate vertical overlays for an industry — future feature |
| `PUT` | `/companies/:id/overlay` | Low | Update company-wide prompt append |

### CORS
Confirm `http://localhost:5173` (Vite dev server) is in the allowed origins list for local dev.

### Response shape
All responses must follow the `{ success: true, data: T }` / `{ success: false, error: { code, message } }` pattern defined in `services/api/src/response.ts`. The frontend client in `src/lib/agentApi.ts` expects this exact shape.

### AgentConfig display fields
The seed script adds these extra fields to each agent record in DynamoDB (they are not in the core `AgentConfig` type but are used by the frontend):

```typescript
displayName: string        // e.g. "Financial Intelligence AI"
avatarInitial: string      // e.g. "F"
colorGradient: string      // Tailwind gradient e.g. "from-blue-400 to-blue-600"
specialty: string          // e.g. "Finance & Cash Flow"
performance?: number       // 0–100 (computed from meeting history or static seed)
decisionsToday?: number
roiToday?: number
uptime?: number
```

The API should pass these through in `GET /agents` responses. If your `AgentConfig` Zod schema strips unknown fields, add these to the schema or use a `AgentDisplayMeta` extension type.

---

## Data flow

```
User opens /apex → ApexPlatform mounts
  └─ useAgents() called
       ├─ VITE_AGENT_API_URL set? → GET /agents → real data
       └─ not set / API down?    → MOCK_AGENTS (8 execs)

User clicks "AI Team" tab → ScreenTeam renders live agents

User opens "Board of Directors" → ScreenBoardOfDirectors mounts
  └─ useCreateMeeting() ready (idle)

User selects session type + types question + clicks "Call to Order"
  └─ handleCallToOrder() →
       POST /meetings/run { companyProfile, agentIds, question, sessionType }
         └─ returns { meetingId }
              └─ useMeetingEvents(meetingId) starts polling GET /meetings/:id/events
                   └─ Each phase event appended to EventFeed in real time
                        └─ session_complete event → complete = true → polling stops
                             └─ "New Session" button appears to reset
```
