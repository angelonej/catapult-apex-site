/**
 * Table schema documentation for the APEX Agent Studio DynamoDB single table.
 *
 * Table name (controlled by env var): DYNAMODB_TABLE_NAME
 * Default local table name: ApexAgentStudio-local
 *
 * ─── Single-table design ──────────────────────────────────────────────────────
 *
 * One table. All entities. Access patterns drive the key design.
 *
 * PK / SK key patterns:
 *
 * ┌──────────────────────────┬──────────────────────────────┬────────────────────────────┬──────────────────────────┬──────────────────────────┐
 * │ Entity                   │ PK                           │ SK                         │ GSI1PK                   │ GSI1SK                   │
 * ├──────────────────────────┼──────────────────────────────┼────────────────────────────┼──────────────────────────┼──────────────────────────┤
 * │ Agent (versioned)        │ AGENT#<agentId>              │ VERSION#<semver>           │ ROLE#<role>              │ VERSION#<semver>         │
 * │ Agent (latest pointer)   │ AGENT#<agentId>              │ VERSION#latest             │ ROLE#<role>              │ VERSION#latest           │
 * │ Board roster entry       │ BOARD#<companyId>            │ AGENT#<agentId>            │ STATUS#<status>          │ AGENT#<agentId>          │
 * │ Decision log entry       │ COMPANY#<companyId>          │ DECISION#<ts>#<seq>        │ EXEC#<role>              │ DECISION#<ts>            │
 * │ Approval rule            │ COMPANY#<companyId>          │ RULE#<ruleId>              │ —                        │ —                        │
 * │ Persona style            │ COMPANY#<companyId>          │ PERSONA#<agentId>          │ —                        │ —                        │
 * │ Work feed post           │ FEED#<postId>                │ METADATA                   │ INDUSTRY#<industry>      │ <iso-ts>                 │
 * │ Feed engagement (like)   │ FEED#<postId>                │ LIKE#<userId>              │ —                        │ —                        │
 * │ Meeting metadata         │ MEETING#<meetingId>          │ METADATA                   │ COMPANY#<companyId>      │ <iso-ts>                 │
 * │ Meeting event            │ MEETING#<meetingId>          │ EVENT#<ts>#<seq>           │ —                        │ —                        │
 * │ Company profile          │ COMPANY#<companyId>          │ PROFILE                    │ —                        │ —                        │
 * │ Company overlay          │ COMPANY_OVERLAY#<companyId>  │ OVERLAY                    │ —                        │ —                        │
 * │ Company API key          │ COMPANY#<companyId>          │ API_KEY                    │ —                        │ —                        │
 * │ Pending session          │ COMPANY#<companyId>          │ PENDING#<sessionId>        │ —                        │ —                        │
 * │ User profile             │ USER#<userId>                │ PROFILE                    │ EMAIL#<email>            │ USER#<userId>            │
 * │ Company → User member    │ COMPANY#<companyId>          │ USER#<userId>              │ —                        │ —                        │
 * │ Vertical overlay         │ VERTICAL#<verticalId>        │ ROLE#<role>                │ —                        │ —                        │
 * │ Agent task               │ TASK#<taskId>                │ RESULT                     │ —                        │ —                        │
 * │ Email task               │ EMAIL_TASK#<taskId>          │ RESULT                     │ —                        │ —                        │
 * └──────────────────────────┴──────────────────────────────┴────────────────────────────┴──────────────────────────┴──────────────────────────┘
 *
 * GSI1 access patterns:
 *   - GSI1PK=ROLE#ceo                    → all CEO agents
 *   - GSI1PK=STATUS#active               → all active board agents (for a companyId scan)
 *   - GSI1PK=EXEC#coo + SK begins_with DECISION  → all COO decisions
 *   - GSI1PK=INDUSTRY#warehousing        → feed posts for warehousing
 *   - GSI1PK=COMPANY#<id>               → all meetings for a company (sorted by time)
 *   - GSI1PK=EMAIL#<email>              → user lookup by email
 */

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? 'ApexAgentStudio-local'

export const KEY_PATTERNS = {
  // ── Agents ────────────────────────────────────────────────────────────────
  agent:           (id: string) => ({ PK: `AGENT#${id}`,            SK: 'VERSION#latest' }),
  agentVersion:    (id: string, v: string) => ({ PK: `AGENT#${id}`, SK: `VERSION#${v}` }),

  // ── Board roster (company's active agent selection) ───────────────────────
  boardAgent:      (companyId: string, agentId: string) => ({ PK: `BOARD#${companyId}`, SK: `AGENT#${agentId}` }),

  // ── Decision log ──────────────────────────────────────────────────────────
  decision:        (companyId: string, ts: string, seq: number) => ({
    PK: `COMPANY#${companyId}`,
    SK: `DECISION#${ts}#${String(seq).padStart(6, '0')}`,
  }),

  // ── Rules & personas (per-company agent config) ───────────────────────────
  rule:            (companyId: string, ruleId: string) => ({ PK: `COMPANY#${companyId}`, SK: `RULE#${ruleId}` }),
  persona:         (companyId: string, agentId: string) => ({ PK: `COMPANY#${companyId}`, SK: `PERSONA#${agentId}` }),

  // ── Work feed ─────────────────────────────────────────────────────────────
  feedPost:        (postId: string) => ({ PK: `FEED#${postId}`,     SK: 'METADATA' }),
  feedLike:        (postId: string, userId: string) => ({ PK: `FEED#${postId}`, SK: `LIKE#${userId}` }),

  // ── Meetings ──────────────────────────────────────────────────────────────
  meeting:         (id: string) => ({ PK: `MEETING#${id}`,          SK: 'METADATA' }),
  meetingEvent:    (id: string, ts: string, seq: number) => ({
    PK: `MEETING#${id}`,
    SK: `EVENT#${ts}#${String(seq).padStart(6, '0')}`,
  }),

  // ── Company ───────────────────────────────────────────────────────────────
  company:         (id: string) => ({ PK: `COMPANY#${id}`,          SK: 'PROFILE' }),
  companyOverlay:  (id: string) => ({ PK: `COMPANY_OVERLAY#${id}`,  SK: 'OVERLAY' }),
  companyApiKey:   (id: string) => ({ PK: `COMPANY#${id}`,          SK: 'API_KEY' }),
  pendingSession:  (companyId: string, sessionId: string) => ({ PK: `COMPANY#${companyId}`, SK: `PENDING#${sessionId}` }),
  companyUser:     (companyId: string, userId: string) => ({ PK: `COMPANY#${companyId}`, SK: `USER#${userId}` }),

  // ── Users ─────────────────────────────────────────────────────────────────
  user:            (userId: string) => ({ PK: `USER#${userId}`,     SK: 'PROFILE' }),

  // ── Vertical overlays ─────────────────────────────────────────────────────
  vertical:        (id: string, role: string) => ({ PK: `VERTICAL#${id}`, SK: `ROLE#${role}` }),

  // ── Tasks ─────────────────────────────────────────────────────────────────
  task:            (id: string) => ({ PK: `TASK#${id}`,             SK: 'RESULT' }),
  emailTask:       (id: string) => ({ PK: `EMAIL_TASK#${id}`,       SK: 'RESULT' }),

  // ── GSI1 projections ──────────────────────────────────────────────────────
  gsi1Agent:       (role: string) => ({ GSI1PK: `ROLE#${role}`,              GSI1SK: 'VERSION#latest' }),
  gsi1BoardAgent:  (status: string) => ({ GSI1PK: `STATUS#${status}` }),
  gsi1Decision:    (role: string, ts: string) => ({ GSI1PK: `EXEC#${role}`,  GSI1SK: `DECISION#${ts}` }),
  gsi1FeedPost:    (industry: string, ts: string) => ({ GSI1PK: `INDUSTRY#${industry}`, GSI1SK: ts }),
  gsi1Meeting:     (companyId: string, ts: string) => ({ GSI1PK: `COMPANY#${companyId}`, GSI1SK: ts }),
  gsi1User:        (email: string, userId: string) => ({ GSI1PK: `EMAIL#${email}`, GSI1SK: `USER#${userId}` }),
} as const

/** CreateTable params — works with local DynamoDB and AWS */
export const CREATE_TABLE_PARAMS = {
  TableName: TABLE_NAME,
  BillingMode: 'PAY_PER_REQUEST',
  AttributeDefinitions: [
    { AttributeName: 'PK',     AttributeType: 'S' },
    { AttributeName: 'SK',     AttributeType: 'S' },
    { AttributeName: 'GSI1PK', AttributeType: 'S' },
    { AttributeName: 'GSI1SK', AttributeType: 'S' },
  ],
  KeySchema: [
    { AttributeName: 'PK', KeyType: 'HASH' },
    { AttributeName: 'SK', KeyType: 'RANGE' },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'GSI1',
      KeySchema: [
        { AttributeName: 'GSI1PK', KeyType: 'HASH' },
        { AttributeName: 'GSI1SK', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'ALL' },
    },
  ],
}
