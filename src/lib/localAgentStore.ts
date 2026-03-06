/**
 * localAgentStore.ts
 *
 * localStorage-backed board roster store with shared in-memory cache.
 *
 * The module-level `cache` array is THE single source of truth for every
 * useAgents() call in the same browser tab. All writes:
 *   1. Mutate cache[]
 *   2. Persist to localStorage
 *   3. Notify all subscribers so every useAgents() re-renders immediately
 *
 * On first access, cache is hydrated from localStorage.
 * If localStorage is empty, SEED_AGENTS are written once — they are never
 * overwritten. User-added agents (Peter, John, etc.) survive reloads.
 *
 * No component should ever use hardcoded mock data — the store always
 * returns real persisted data.
 */

import { type AgentConfig, enrichAgent } from './agentApi'

const STORAGE_KEY = 'apex:board-agents-v9'

// ─── Default seed agents (written to localStorage ONCE on first load) ─────────

const SEED_AGENTS: AgentConfig[] = [
  {
    agentId: 'agent.exec.ceo', version: '1.0.0', name: 'Aria', role: 'ceo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Executive Officer AI. You drive strategy, set vision, and make cross-functional calls.',
    tools: ['web-search', 'market-data', 'company-profile'],
    capabilities: ['strategic-planning', 'vision-setting', 'stakeholder-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 10000 },
    displayName: 'Strategic Vision AI', avatarInitial: 'A',
    colorGradient: 'from-amber-400 to-amber-600', specialty: 'Strategy & Growth',
    status: 'active', performance: 94, decisionsToday: 23, roiToday: 4280, uptime: 99.8,
  },
  {
    agentId: 'agent.exec.cfo', version: '1.0.0', name: 'Felix', role: 'cfo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Financial Officer AI. You manage cash flow, financial forecasting, and risk.',
    tools: ['financial-data', 'accounting-api', 'company-profile'],
    capabilities: ['financial-analysis', 'cash-flow-management', 'risk-assessment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 5000 },
    displayName: 'Financial Intelligence AI', avatarInitial: 'F',
    colorGradient: 'from-blue-400 to-blue-600', specialty: 'Finance & Cash Flow',
    status: 'active', performance: 97, decisionsToday: 47, roiToday: 6140, uptime: 99.9,
  },
  {
    agentId: 'agent.exec.coo', version: '1.0.0', name: 'Orion', role: 'coo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Operating Officer AI. You own operational efficiency, process optimization, and logistics.',
    tools: ['ops-data', 'logistics-api', 'company-profile'],
    capabilities: ['operations-management', 'process-optimization', 'logistics'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 500, requireApprovalAbove: 2000 },
    displayName: 'Operations Excellence AI', avatarInitial: 'O',
    colorGradient: 'from-green-400 to-green-600', specialty: 'Operations & Logistics',
    status: 'active', performance: 91, decisionsToday: 156, roiToday: 8320, uptime: 99.7,
  },
  {
    agentId: 'agent.exec.cmo', version: '1.0.0', name: 'Maya', role: 'cmo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Marketing Officer AI. You drive growth, brand, and customer acquisition.',
    tools: ['web-search', 'ad-platforms', 'analytics-api'],
    capabilities: ['marketing-strategy', 'brand-management', 'growth-hacking'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 3000 },
    displayName: 'Growth Marketing AI', avatarInitial: 'M',
    colorGradient: 'from-pink-400 to-pink-600', specialty: 'Marketing & Acquisition',
    status: 'active', performance: 88, decisionsToday: 31, roiToday: 3910, uptime: 99.5,
  },
  {
    agentId: 'agent.exec.cto', version: '1.0.0', name: 'Theo', role: 'cto',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Technology Officer AI. You oversee technology strategy, automation, and platform.',
    tools: ['code-analysis', 'tech-research', 'company-profile'],
    capabilities: ['tech-strategy', 'automation', 'platform-engineering'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 150, requireApprovalAbove: 5000 },
    displayName: 'Technology AI', avatarInitial: 'T',
    colorGradient: 'from-purple-400 to-purple-600', specialty: 'Tech & Automation',
    status: 'active', performance: 93, decisionsToday: 18, roiToday: 2100, uptime: 99.9,
  },
  {
    agentId: 'agent.advisor.legal', version: '1.0.0', name: 'Lex', role: 'legal',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Legal Officer AI. You manage compliance, legal risk, and regulatory matters.',
    tools: ['legal-research', 'regulatory-db', 'company-profile'],
    capabilities: ['legal-analysis', 'compliance', 'risk-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 50, requireApprovalAbove: 1000 },
    displayName: 'Legal & Compliance AI', avatarInitial: 'L',
    colorGradient: 'from-cyan-400 to-cyan-600', specialty: 'Compliance & Risk',
    status: 'active', performance: 99, decisionsToday: 12, roiToday: 9800, uptime: 100,
  },
  {
    agentId: 'agent.exec.chro', version: '1.0.0', name: 'Hana', role: 'chro',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Human Resources Officer AI. You manage people ops, hiring, and culture.',
    tools: ['hr-platforms', 'company-profile'],
    capabilities: ['people-management', 'hiring', 'culture'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 80, requireApprovalAbove: 2000 },
    displayName: 'People & Culture AI', avatarInitial: 'H',
    colorGradient: 'from-rose-400 to-rose-600', specialty: 'HR & People Ops',
    status: 'paused', performance: 86, decisionsToday: 0, roiToday: 0, uptime: 0,
  },
  {
    agentId: 'agent.exec.vpsales', version: '1.0.0', name: 'Sage', role: 'vpsales',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the VP of Sales AI. You drive pipeline, close deals, and protect revenue.',
    tools: ['crm-api', 'web-search', 'company-profile'],
    capabilities: ['sales-strategy', 'pipeline-management', 'account-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 10000 },
    displayName: 'Sales Intelligence AI', avatarInitial: 'S',
    colorGradient: 'from-orange-400 to-orange-600', specialty: 'Sales & Revenue',
    status: 'active', performance: 90, decisionsToday: 29, roiToday: 5240, uptime: 99.6,
  },
  // ── Board Moderator ──
  {
    agentId: 'agent.exec.moderator', version: '1.0.0', name: 'Axiom', role: 'moderator',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Board Moderator AI. You facilitate board sessions, synthesize perspectives, and surface consensus without advocating.',
    tools: ['company-profile', 'meeting-history'],
    capabilities: ['facilitation', 'synthesis', 'consensus-building'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 50, requireApprovalAbove: 50000 },
    displayName: 'Board Moderator AI', avatarInitial: 'X',
    colorGradient: 'from-slate-400 to-slate-600', specialty: 'Facilitation & Synthesis',
    status: 'active', performance: 98, decisionsToday: 8, roiToday: 12000, uptime: 100,
  },
  // ── Extended C-Suite ──
  {
    agentId: 'agent.exec.cro', version: '1.0.0', name: 'Rex', role: 'cro',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Revenue Officer AI. You unify sales, marketing, and customer success to maximize revenue growth and reduce churn.',
    tools: ['crm-api', 'financial-data', 'market-data', 'company-profile'],
    capabilities: ['revenue-strategy', 'pipeline-optimization', 'go-to-market', 'churn-reduction'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 150, requireApprovalAbove: 25000 },
    displayName: 'Revenue Growth AI', avatarInitial: 'R',
    colorGradient: 'from-red-400 to-rose-600', specialty: 'Revenue & Pipeline Growth',
    status: 'active', performance: 92, decisionsToday: 34, roiToday: 7840, uptime: 99.7,
  },
  {
    agentId: 'agent.exec.cpo', version: '1.0.0', name: 'Nova', role: 'cpo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Product Officer AI. You own product strategy, roadmap, and cross-functional product decisions.',
    tools: ['product-analytics', 'market-data', 'user-research', 'company-profile'],
    capabilities: ['product-strategy', 'roadmap-planning', 'feature-prioritization', 'market-fit'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 15000 },
    displayName: 'Product Strategy AI', avatarInitial: 'N',
    colorGradient: 'from-indigo-400 to-violet-600', specialty: 'Product Strategy & Roadmap',
    status: 'active', performance: 91, decisionsToday: 19, roiToday: 3600, uptime: 99.5,
  },
  {
    agentId: 'agent.exec.cdo', version: '1.0.0', name: 'Iris', role: 'cdo',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Data Officer AI. You govern data strategy, analytics infrastructure, AI/ML initiatives, and data-driven decision-making.',
    tools: ['data-platform', 'analytics-api', 'bi-tools', 'company-profile'],
    capabilities: ['data-strategy', 'analytics', 'ai-ml-oversight', 'data-governance'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 20000 },
    displayName: 'Data Intelligence AI', avatarInitial: 'I',
    colorGradient: 'from-sky-400 to-cyan-600', specialty: 'Data Strategy & Analytics',
    status: 'active', performance: 94, decisionsToday: 41, roiToday: 8900, uptime: 99.9,
  },
  {
    agentId: 'agent.exec.ciso', version: '1.0.0', name: 'Shield', role: 'ciso',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Information Security Officer AI. You protect company assets, manage cyber risk, and ensure security compliance across all systems.',
    tools: ['security-monitoring', 'threat-intel', 'compliance-db', 'company-profile'],
    capabilities: ['cyber-security', 'risk-management', 'compliance-monitoring', 'incident-response'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 300, requireApprovalAbove: 5000 },
    displayName: 'Security & Risk AI', avatarInitial: 'S',
    colorGradient: 'from-slate-500 to-gray-700', specialty: 'Security & Cyber Risk',
    status: 'active', performance: 97, decisionsToday: 62, roiToday: 11200, uptime: 100,
  },
  {
    agentId: 'agent.exec.cso', version: '1.0.0', name: 'Ember', role: 'cso',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Strategy Officer AI. You craft long-range strategy, analyze competitive landscape, identify M&A opportunities, and lead strategic planning cycles.',
    tools: ['market-data', 'competitor-intel', 'financial-data', 'company-profile'],
    capabilities: ['strategic-planning', 'competitive-analysis', 'ma-evaluation', 'scenario-modeling'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 50, requireApprovalAbove: 50000 },
    displayName: 'Corporate Strategy AI', avatarInitial: 'E',
    colorGradient: 'from-amber-400 to-yellow-600', specialty: 'Corporate Strategy',
    status: 'active', performance: 93, decisionsToday: 11, roiToday: 5500, uptime: 99.6,
  },
  {
    agentId: 'agent.exec.clo', version: '1.0.0', name: 'Lex', role: 'clo',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Legal Officer AI. You manage contracts, regulatory compliance, licenses, and legal risk across the organization.',
    tools: ['legal-db', 'compliance-api', 'contract-api', 'company-profile'],
    capabilities: ['contract-management', 'regulatory-compliance', 'license-tracking', 'legal-risk'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 80, requireApprovalAbove: 25000 },
    displayName: 'Legal & Compliance AI', avatarInitial: 'L',
    colorGradient: 'from-cyan-400 to-cyan-600', specialty: 'Compliance & Risk',
    status: 'active', performance: 91, decisionsToday: 14, roiToday: 3800, uptime: 99.5,
  },
  {
    agentId: 'agent.exec.cco', version: '1.0.0', name: 'Cleo', role: 'cco',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Customer Officer AI. You own end-to-end customer experience, NPS, retention, and customer advocacy.',
    tools: ['crm-api', 'nps-platform', 'support-api', 'company-profile'],
    capabilities: ['customer-experience', 'retention-strategy', 'nps-management', 'voice-of-customer'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 150, requireApprovalAbove: 10000 },
    displayName: 'Customer Experience AI', avatarInitial: 'C',
    colorGradient: 'from-teal-400 to-emerald-600', specialty: 'Customer Success & NPS',
    status: 'active', performance: 89, decisionsToday: 27, roiToday: 4100, uptime: 99.4,
  },
  // ── Board of Directors ──
  {
    agentId: 'agent.board.chair', version: '1.0.0', name: 'Marcus', role: 'board-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Independent Board Chair AI. You lead board governance, protect shareholder interests, ensure fiduciary accountability, and guide the company through strategic and ethical decisions.',
    tools: ['company-profile', 'financial-data', 'governance-db'],
    capabilities: ['board-governance', 'fiduciary-oversight', 'executive-accountability', 'shareholder-relations'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 20, requireApprovalAbove: 100000 },
    displayName: 'Board Governance AI', avatarInitial: 'M',
    colorGradient: 'from-amber-500 to-yellow-700', specialty: 'Board Governance & Oversight',
    status: 'active', performance: 98, decisionsToday: 4, roiToday: 18000, uptime: 99.9,
  },
  {
    agentId: 'agent.board.audit', version: '1.0.0', name: 'Felix', role: 'audit-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Audit Committee Chair AI. You oversee financial reporting integrity, external audit relationships, internal controls, and regulatory compliance.',
    tools: ['financial-data', 'audit-tools', 'regulatory-db', 'company-profile'],
    capabilities: ['audit-oversight', 'financial-controls', 'sox-compliance', 'risk-reporting'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Audit Committee AI', avatarInitial: 'A',
    colorGradient: 'from-blue-600 to-indigo-800', specialty: 'Financial Audit & Controls',
    status: 'active', performance: 99, decisionsToday: 6, roiToday: 22000, uptime: 100,
  },
  {
    agentId: 'agent.board.risk', version: '1.0.0', name: 'Shield', role: 'risk-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Risk Committee Chair AI. You oversee enterprise risk management, ensure risk appetite alignment with strategy, and provide board-level risk governance.',
    tools: ['risk-platform', 'financial-data', 'threat-intel', 'company-profile'],
    capabilities: ['enterprise-risk', 'risk-governance', 'stress-testing', 'board-reporting'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Risk Committee AI', avatarInitial: 'R',
    colorGradient: 'from-red-600 to-rose-800', specialty: 'Enterprise Risk Management',
    status: 'active', performance: 97, decisionsToday: 5, roiToday: 16000, uptime: 100,
  },
  {
    agentId: 'agent.board.comp', version: '1.0.0', name: 'Claire', role: 'comp-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Compensation Committee Chair AI. You set executive compensation philosophy, oversee equity programs, and ensure pay equity and performance alignment.',
    tools: ['hr-platforms', 'comp-benchmarks', 'financial-data', 'company-profile'],
    capabilities: ['exec-comp', 'equity-design', 'pay-equity-analysis', 'performance-alignment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 20, requireApprovalAbove: 50000 },
    displayName: 'Comp Committee AI', avatarInitial: 'C',
    colorGradient: 'from-emerald-500 to-green-700', specialty: 'Executive Compensation',
    status: 'active', performance: 95, decisionsToday: 3, roiToday: 9000, uptime: 99.8,
  },
  {
    agentId: 'agent.board.gov', version: '1.0.0', name: 'Priya', role: 'gov-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Governance & Nominating Committee Chair AI. You oversee board composition, director succession, ESG commitments, and corporate governance best practices.',
    tools: ['governance-db', 'esg-platform', 'company-profile'],
    capabilities: ['board-composition', 'governance-policy', 'esg-reporting', 'director-succession'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 20, requireApprovalAbove: 50000 },
    displayName: 'Governance Committee AI', avatarInitial: 'G',
    colorGradient: 'from-violet-500 to-purple-700', specialty: 'Corporate Governance & ESG',
    status: 'active', performance: 96, decisionsToday: 4, roiToday: 11000, uptime: 99.8,
  },
  // ── Senior Directors / Advisors ──
  {
    agentId: 'agent.advisor.counsel', version: '1.0.0', name: 'Lex', role: 'general-counsel',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the General Counsel AI. You handle M&A transactions, complex commercial contracts, litigation strategy, and board-level legal advisory.',
    tools: ['legal-research', 'regulatory-db', 'contract-db', 'company-profile'],
    capabilities: ['ma-legal', 'commercial-contracts', 'litigation-strategy', 'regulatory-advisory'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 40, requireApprovalAbove: 10000 },
    displayName: 'General Counsel AI', avatarInitial: 'G',
    colorGradient: 'from-cyan-500 to-teal-700', specialty: 'M&A, Contracts & Litigation',
    status: 'active', performance: 98, decisionsToday: 9, roiToday: 14000, uptime: 100,
  },
  {
    agentId: 'agent.exec.cos', version: '1.0.0', name: 'Donna', role: 'chief-of-staff',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief of Staff AI. You coordinate executive priorities, manage cross-functional initiatives, run the operating cadence, and ensure strategic decisions are executed.',
    tools: ['company-profile', 'calendar-api', 'project-management'],
    capabilities: ['executive-coordination', 'cross-functional-program-management', 'operating-cadence', 'strategic-execution'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 300, requireApprovalAbove: 5000 },
    displayName: 'Executive Operations AI', avatarInitial: 'C',
    colorGradient: 'from-orange-400 to-amber-600', specialty: 'Executive Operations & Coordination',
    status: 'active', performance: 91, decisionsToday: 74, roiToday: 6800, uptime: 99.7,
  },
  {
    agentId: 'agent.exec.vpe', version: '1.0.0', name: 'Theo', role: 'vp-engineering',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the VP of Engineering AI. You lead engineering teams, manage technical delivery, architect scalable systems, and ensure engineering excellence.',
    tools: ['code-analysis', 'tech-research', 'project-management', 'company-profile'],
    capabilities: ['engineering-leadership', 'platform-architecture', 'delivery-management', 'technical-excellence'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 10000 },
    displayName: 'Engineering Leadership AI', avatarInitial: 'V',
    colorGradient: 'from-violet-400 to-indigo-600', specialty: 'Engineering & Platform',
    status: 'active', performance: 92, decisionsToday: 38, roiToday: 5700, uptime: 99.8,
  },
  {
    agentId: 'agent.exec.growth', version: '1.0.0', name: 'Blaze', role: 'head-of-growth',
    tier: 'operational', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Head of Growth AI. You design and run rapid growth experiments, optimize conversion funnels, and scale user acquisition and revenue through data-driven testing.',
    tools: ['analytics-api', 'ad-platforms', 'ab-testing', 'company-profile'],
    capabilities: ['growth-experimentation', 'funnel-optimization', 'acquisition-scaling', 'retention-loops'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 5000 },
    displayName: 'Growth Engine AI', avatarInitial: 'H',
    colorGradient: 'from-fuchsia-400 to-pink-600', specialty: 'Growth & Experimentation',
    status: 'active', performance: 88, decisionsToday: 53, roiToday: 4900, uptime: 99.3,
  },
  // ── Independent Board Directors (non-executive) ──────────────────────────────
  {
    agentId: 'agent.board.ethics', version: '1.0.0', name: 'Vera', role: 'ethics-chair',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Ethics & AI Safety Chair. You champion responsible AI deployment, ethical frameworks, and ensure all board decisions meet the highest standards of integrity, transparency, and societal impact. You are independent — you hold no executive role.',
    tools: ['ethics-db', 'ai-safety-research', 'company-profile'],
    capabilities: ['ethics-review', 'ai-safety', 'responsible-ai', 'integrity-oversight'],
    modelPolicy: { model: 'claude-3-opus', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Ethics & AI Safety Chair', avatarInitial: 'V',
    colorGradient: 'from-fuchsia-500 to-purple-700', specialty: 'AI Ethics & Responsible AI',
    status: 'active', performance: 96, decisionsToday: 7, roiToday: 14000, uptime: 99.9,
  },
  {
    agentId: 'agent.board.independent', version: '1.0.0', name: 'Atlas', role: 'independent-director',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Independent Director. You provide unbiased oversight, represent minority shareholder and customer interests, and bring external market perspective to all board deliberations. You hold no executive role and have no conflicts of interest.',
    tools: ['market-data', 'company-profile', 'governance-db'],
    capabilities: ['independent-oversight', 'shareholder-advocacy', 'market-validation', 'conflict-resolution'],
    modelPolicy: { model: 'gpt-4-turbo', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Independent Director', avatarInitial: 'A',
    colorGradient: 'from-orange-400 to-amber-600', specialty: 'Customer & Market Advocacy',
    status: 'active', performance: 94, decisionsToday: 9, roiToday: 16000, uptime: 99.8,
  },
  {
    agentId: 'agent.board.tech', version: '1.0.0', name: 'Sterling', role: 'tech-advisor',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Independent Technology Advisor to the Board. You evaluate technology strategy, AI adoption roadmaps, cybersecurity posture, and platform scalability. You are independent — not part of the executive team.',
    tools: ['tech-research', 'code-analysis', 'market-data', 'company-profile'],
    capabilities: ['technology-strategy', 'ai-evaluation', 'platform-review', 'innovation-advisory'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Independent Technology Advisor', avatarInitial: 'S',
    colorGradient: 'from-violet-400 to-purple-600', specialty: 'Technology & Innovation',
    status: 'active', performance: 93, decisionsToday: 11, roiToday: 18000, uptime: 99.7,
  },
  {
    agentId: 'agent.board.strategy', version: '1.0.0', name: 'River', role: 'strategy-advisor',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Independent Strategy Advisor to the Board. You provide objective analysis of strategic direction, M&A opportunities, competitive positioning, and long-term value creation. You serve as a trusted external voice free from internal politics.',
    tools: ['market-data', 'financial-data', 'company-profile', 'web-search'],
    capabilities: ['strategic-analysis', 'ma-advisory', 'competitive-intelligence', 'value-creation'],
    modelPolicy: { model: 'claude-35-sonnet', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Independent Strategy Advisor', avatarInitial: 'R',
    colorGradient: 'from-emerald-400 to-teal-600', specialty: 'Corporate Strategy & M&A',
    status: 'active', performance: 95, decisionsToday: 13, roiToday: 21000, uptime: 99.8,
  },
  {
    agentId: 'agent.board.investor', version: '1.0.0', name: 'Victoria', role: 'investor-director',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Lead Investor Director on the Board. You represent institutional investor interests, monitor return on invested capital, evaluate capital allocation decisions, and ensure the company is on a path to sustainable shareholder value creation.',
    tools: ['financial-data', 'market-data', 'company-profile'],
    capabilities: ['investor-relations', 'capital-allocation', 'shareholder-value', 'financial-governance'],
    modelPolicy: { model: 'apex-native', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Lead Investor Director', avatarInitial: 'V',
    colorGradient: 'from-amber-500 to-yellow-600', specialty: 'Capital & Investor Relations',
    status: 'active', performance: 97, decisionsToday: 6, roiToday: 28000, uptime: 99.9,
  },
  {
    agentId: 'agent.board.customer', version: '1.0.0', name: 'Sage', role: 'customer-director',
    tier: 'strategic', inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Customer Advisory Director on the Board. You represent the voice of the customer at the highest level of governance. You ensure product decisions, pricing, and service quality consistently reflect customer needs and market expectations.',
    tools: ['customer-feedback', 'market-data', 'company-profile'],
    capabilities: ['customer-advocacy', 'product-feedback', 'market-validation', 'nps-governance'],
    modelPolicy: { model: 'gemini-15-pro', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 30, requireApprovalAbove: 50000 },
    displayName: 'Customer Advisory Director', avatarInitial: 'S',
    colorGradient: 'from-rose-400 to-pink-600', specialty: 'Customer Voice & Advocacy',
    status: 'active', performance: 91, decisionsToday: 17, roiToday: 13000, uptime: 99.6,
  },
  // ── Worker Agents — Sales ─────────────────────────────────────────────────────
  {
    agentId: 'agent.worker.rex', version: '1.0.0', name: 'Rex', role: 'sdr',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Rex, an Outbound SDR AI. You execute high-volume cold outreach, qualify leads, crush objections, and book meetings for the account executive team. You are relentless, fearless, and never take no as a final answer.',
    tools: ['crm-api', 'email-api', 'phone-api', 'company-profile'],
    capabilities: ['cold-outreach', 'objection-handling', 'lead-qualification', 'appointment-setting'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 500, requireApprovalAbove: 0 },
    displayName: 'Outbound Sales AI', avatarInitial: 'R',
    colorGradient: 'from-red-400 to-red-600', specialty: 'Cold Outreach & Qualification',
    status: 'active', performance: 87, decisionsToday: 312, roiToday: 4800, uptime: 99.4,
  },
  {
    agentId: 'agent.worker.viper', version: '1.0.0', name: 'Viper', role: 'closer',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Viper, a Deal Closer AI. You take warm leads from the pipeline and close them into signed contracts. You negotiate with confidence, create urgency, handle last-mile objections, and protect deal margins.',
    tools: ['crm-api', 'contract-api', 'e-sign-api', 'company-profile'],
    capabilities: ['deal-closing', 'contract-negotiation', 'urgency-creation', 'discount-defense'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 5000 },
    displayName: 'Deal Closer AI', avatarInitial: 'V',
    colorGradient: 'from-rose-400 to-rose-600', specialty: 'Contract Negotiation & Closing',
    status: 'active', performance: 91, decisionsToday: 28, roiToday: 9200, uptime: 99.6,
  },
  {
    agentId: 'agent.worker.chase', version: '1.0.0', name: 'Chase', role: 'bdr',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Chase, a Revenue Hunter BDR AI. You run multi-touch prospecting sequences, qualify inbound leads, enrich CRM data, and build a relentless top-of-funnel pipeline through persistent follow-up automation.',
    tools: ['crm-api', 'sequencing-api', 'data-enrichment', 'company-profile'],
    capabilities: ['multi-touch-sequences', 'lead-qualification', 'pipeline-building', 'follow-up-automation'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 400, requireApprovalAbove: 0 },
    displayName: 'Revenue Hunter AI', avatarInitial: 'C',
    colorGradient: 'from-orange-500 to-red-500', specialty: 'Pipeline Building & Sequences',
    status: 'active', performance: 85, decisionsToday: 189, roiToday: 3700, uptime: 99.2,
  },
  // ── Worker Agents — Marketing ─────────────────────────────────────────────────
  {
    agentId: 'agent.worker.nova', version: '1.0.0', name: 'Nova', role: 'demand-gen',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Nova, a Demand Gen AI. You plan, launch, and optimize paid media campaigns across Google, Meta, and LinkedIn. You own MQL targets, funnel metrics, and cost-per-acquisition across all paid channels.',
    tools: ['ad-platforms', 'analytics-api', 'crm-api', 'company-profile'],
    capabilities: ['paid-media', 'funnel-optimization', 'mql-generation', 'cpa-optimization'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 500 },
    displayName: 'Demand Gen AI', avatarInitial: 'N',
    colorGradient: 'from-violet-400 to-violet-600', specialty: 'Paid Media & Lead Gen',
    status: 'active', performance: 89, decisionsToday: 67, roiToday: 5400, uptime: 99.5,
  },
  {
    agentId: 'agent.worker.pixel', version: '1.0.0', name: 'Pixel', role: 'content-seo',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Pixel, a Content & SEO AI. You research keywords, write high-ranking blog posts, optimize on-page SEO, build topical authority, and drive compounding organic traffic for the business.',
    tools: ['seo-api', 'content-api', 'keyword-research', 'analytics-api', 'company-profile'],
    capabilities: ['content-creation', 'seo-optimization', 'keyword-research', 'organic-growth'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 0 },
    displayName: 'Content & SEO AI', avatarInitial: 'P',
    colorGradient: 'from-purple-400 to-purple-600', specialty: 'SEO & Content Strategy',
    status: 'active', performance: 88, decisionsToday: 43, roiToday: 2900, uptime: 99.3,
  },
  {
    agentId: 'agent.worker.blaze', version: '1.0.0', name: 'Blaze', role: 'growth-hacker',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Blaze, a Growth Hacker AI. You design viral loops, referral programs, and conversion rate experiments. You run rapid A/B tests, optimize landing pages, and identify the highest-leverage growth levers in the funnel.',
    tools: ['ab-testing', 'analytics-api', 'landing-page-api', 'referral-api', 'company-profile'],
    capabilities: ['viral-loop-design', 'ab-testing', 'conversion-optimization', 'referral-programs'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 300, requireApprovalAbove: 100 },
    displayName: 'Growth Hacker AI', avatarInitial: 'B',
    colorGradient: 'from-fuchsia-400 to-fuchsia-600', specialty: 'Viral Growth & Conversion',
    status: 'active', performance: 86, decisionsToday: 94, roiToday: 4100, uptime: 99.1,
  },
  // ── Worker Agents — Support ───────────────────────────────────────────────────
  {
    agentId: 'agent.worker.cleo', version: '1.0.0', name: 'Cleo', role: 'customer-success',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Cleo, a Customer Success AI. You proactively manage customer health scores, execute onboarding sequences, identify expansion revenue opportunities, and ensure every customer achieves measurable value.',
    tools: ['crm-api', 'nps-platform', 'email-api', 'analytics-api', 'company-profile'],
    capabilities: ['onboarding', 'health-score-monitoring', 'expansion-revenue', 'churn-prevention'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 300, requireApprovalAbove: 0 },
    displayName: 'Customer Success AI', avatarInitial: 'C',
    colorGradient: 'from-teal-400 to-teal-600', specialty: 'Onboarding & Health Scoring',
    status: 'active', performance: 90, decisionsToday: 112, roiToday: 4600, uptime: 99.6,
  },
  {
    agentId: 'agent.worker.patch', version: '1.0.0', name: 'Patch', role: 'support-specialist',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Patch, a Support Specialist AI. You resolve support tickets, manage escalation paths, maintain SLA compliance, and turn every support interaction into a trust-building moment with the customer.',
    tools: ['support-api', 'knowledge-base', 'escalation-api', 'crm-api', 'company-profile'],
    capabilities: ['ticket-resolution', 'escalation-management', 'sla-tracking', 'knowledge-base'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 500, requireApprovalAbove: 0 },
    displayName: 'Support Specialist AI', avatarInitial: 'P',
    colorGradient: 'from-emerald-400 to-emerald-600', specialty: 'Ticket Resolution & SLA',
    status: 'active', performance: 94, decisionsToday: 287, roiToday: 3800, uptime: 99.8,
  },
  {
    agentId: 'agent.worker.ember', version: '1.0.0', name: 'Ember', role: 'retention',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Ember, a Retention AI. You predict churn before it happens, execute win-back campaigns, recover NPS detractors, and keep customers engaged through personalized lifecycle touchpoints.',
    tools: ['crm-api', 'email-api', 'churn-model', 'nps-platform', 'company-profile'],
    capabilities: ['churn-prediction', 'win-back-campaigns', 'nps-recovery', 'lifecycle-marketing'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 300, requireApprovalAbove: 0 },
    displayName: 'Retention AI', avatarInitial: 'E',
    colorGradient: 'from-green-400 to-teal-500', specialty: 'Churn Prevention & Win-Back',
    status: 'active', performance: 88, decisionsToday: 74, roiToday: 6200, uptime: 99.3,
  },
  // ── Worker Agents — PR ────────────────────────────────────────────────────────
  {
    agentId: 'agent.worker.iris', version: '1.0.0', name: 'Iris', role: 'pr-media',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Iris, a PR & Media AI. You write press releases, pitch journalists, track media coverage, and build the company\'s earned media presence across trade publications and mainstream outlets.',
    tools: ['media-api', 'press-release-api', 'journalist-db', 'monitoring-api', 'company-profile'],
    capabilities: ['press-release-writing', 'journalist-pitching', 'media-monitoring', 'coverage-tracking'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 0 },
    displayName: 'PR & Media AI', avatarInitial: 'I',
    colorGradient: 'from-sky-400 to-sky-600', specialty: 'Media Relations & Press',
    status: 'active', performance: 87, decisionsToday: 31, roiToday: 2700, uptime: 99.1,
  },
  {
    agentId: 'agent.worker.shield', version: '1.0.0', name: 'Shield', role: 'crisis-comms',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Shield, a Crisis Communications AI. You monitor for reputational threats, draft rapid-response statements, manage narrative control during crises, and protect the brand from PR damage.',
    tools: ['monitoring-api', 'media-api', 'social-listening', 'company-profile'],
    capabilities: ['crisis-response', 'reputation-management', 'narrative-control', 'damage-control'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 0 },
    displayName: 'Crisis Comms AI', avatarInitial: 'S',
    colorGradient: 'from-blue-400 to-blue-600', specialty: 'Crisis Response & Reputation',
    status: 'active', performance: 96, decisionsToday: 9, roiToday: 8400, uptime: 100,
  },
  {
    agentId: 'agent.worker.buzz', version: '1.0.0', name: 'Buzz', role: 'brand-amplifier',
    tier: 'assistant', inherits: 'agent.exec.executive',
    systemPrompt: 'You are Buzz, a Brand Amplifier AI. You manage influencer partnerships, build social proof programs, coordinate brand collaborations, and amplify positive customer stories and company milestones across all channels.',
    tools: ['influencer-api', 'social-media-api', 'content-api', 'monitoring-api', 'company-profile'],
    capabilities: ['influencer-outreach', 'social-proof', 'brand-partnerships', 'content-amplification'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 200 },
    displayName: 'Brand Amplifier AI', avatarInitial: 'B',
    colorGradient: 'from-indigo-400 to-indigo-600', specialty: 'Brand & Influencer Growth',
    status: 'active', performance: 84, decisionsToday: 53, roiToday: 3100, uptime: 99.0,
  },
]

// ─── Shared in-memory cache ───────────────────────────────────────────────────

export interface BoardAgent extends AgentConfig {
  boardId?: string
  addedAt?: string
  /** LLM model key selected for this agent in the Board screen (persisted) */
  llmKey?: string
}

let cache: BoardAgent[] = []

function readStorage(): BoardAgent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as BoardAgent[]
  } catch {
    return []
  }
}

function writeStorage(agents: BoardAgent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agents))
}

/** Read the wizard setup from localStorage, if present. */
function loadWizardSetup(): { executives?: string[]; allRoles?: string[] } | null {
  try {
    const raw = localStorage.getItem('apex:company-setup')
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * Hydrate the cache on first access.
 *
 * Priority:
 *  1. If a wizard setup exists → use only the roles it selected (applySetup logic).
 *     Never merge extra seeds — the wizard IS the source of truth.
 *  2. If no wizard setup → fall back to full SEED_AGENTS (demo / pre-setup state).
 *
 * In both cases, non-exec agents (board, worker, advisor) that are already
 * in localStorage are preserved.
 */
function ensureCache(): BoardAgent[] {
  const stored = readStorage()
  const setup = loadWizardSetup()

  if (setup?.executives?.length) {
    // Wizard has run — rebuild exec roster exactly from saved roles.
    const roles = Array.from(new Set(['ceo', ...setup.executives]))
    const nonExecs = stored.filter((a) => !a.agentId.startsWith('agent.exec.'))
    const execs: BoardAgent[] = roles
      .map((role) => {
        const existing = stored.find((a) => a.agentId === `agent.exec.${role}`)
        if (existing) return existing
        const seed = SEED_AGENTS.find((a) => a.agentId === `agent.exec.${role}`)
        if (!seed) return null
        return { ...seed, boardId: 'default', addedAt: new Date().toISOString() } as BoardAgent
      })
      .filter(Boolean) as BoardAgent[]
    const merged = [...execs, ...nonExecs]
    writeStorage(merged)
    cache = merged.map(enrichAgent)
    return cache
  }

  // No wizard setup yet — seed everything for demo purposes.
  const storedIds = new Set(stored.map((a) => a.agentId))
  const missing: BoardAgent[] = SEED_AGENTS
    .filter((a) => !storedIds.has(a.agentId))
    .map((a) => ({ ...a, boardId: 'default', addedAt: new Date().toISOString() }))
  const merged = missing.length > 0 ? [...stored, ...missing] : stored
  if (missing.length > 0) {
    writeStorage(merged)
    setTimeout(() => notify(), 0)
  }
  cache = merged.map(enrichAgent)
  return cache
}

// ─── Cloud sync ──────────────────────────────────────────────────────────────

/** Returns the production API base URL, or empty string in dev (uses /local proxy). */
function getApiBase(): string {
  try {
    return (import.meta as any).env?.VITE_API_URL ?? ''
  } catch {
    return ''
  }
}

/**
 * Pull company-setup and board-agents from the cloud API and hydrate
 * localStorage + the in-memory cache.  Called once on app boot.
 * Never throws — silently no-ops if the network is unavailable.
 */
export async function syncFromCloud(): Promise<void> {
  const base = getApiBase()
  // In dev (no VITE_API_URL) there is nothing to sync — local DynamoDB via proxy handles it.
  if (!base) return

  try {
    // 1. Fetch company setup
    const setupRes = await fetch(`${base}/company-setup`, { signal: AbortSignal.timeout(5000) })
    if (setupRes.ok) {
      const { setup } = await setupRes.json() as { setup: Record<string, unknown> | null }
      if (setup) {
        try { localStorage.setItem('apex:company-setup', JSON.stringify(setup)) } catch {}
      }
    }

    // 2. Fetch board agents
    const agentsRes = await fetch(`${base}/board-agents`, { signal: AbortSignal.timeout(5000) })
    if (agentsRes.ok) {
      const { agents } = await agentsRes.json() as { agents: BoardAgent[] }
      if (agents?.length) {
        // Write directly to localStorage so ensureCache() picks them up
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(agents)) } catch {}
        // Bust the in-memory cache so next getAll() re-reads from storage
        cache = []
        notify()
      }
    }
  } catch {
    // Network unavailable — fall back to whatever is already in localStorage
  }
}

// ─── Pub/sub ──────────────────────────────────────────────────────────────────

type Listener = () => void
const listeners = new Set<Listener>()

export function subscribeAgentStore(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function notify(): void {
  listeners.forEach((fn) => fn())
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const localAgentStore = {
  /** Synchronous read from cache — use this for instant renders. */
  getAll(): BoardAgent[] {
    return ensureCache()
  },

  /** Async alias for API-shape compatibility. */
  async list(): Promise<BoardAgent[]> {
    return ensureCache()
  },

  /** Upsert an agent — updates cache, persists, notifies all subscribers. */
  async add(agent: AgentConfig): Promise<BoardAgent> {
    const current = ensureCache()
    const idx = current.findIndex((a) => a.agentId === agent.agentId)
    const boardAgent: BoardAgent = { ...agent, boardId: 'default', addedAt: new Date().toISOString() }
    const enriched = enrichAgent(boardAgent) as BoardAgent
    if (idx >= 0) {
      cache[idx] = enriched
    } else {
      cache.push(enriched)
    }
    writeStorage(cache)
    notify()
    return enriched
  },

  /** Patch specific fields on an existing agent — updates cache, persists, notifies. */
  updateAgent(agentId: string, patch: Partial<BoardAgent>): void {
    const current = ensureCache()
    const idx = current.findIndex((a) => a.agentId === agentId)
    if (idx >= 0) {
      cache[idx] = { ...cache[idx], ...patch }
      writeStorage(cache)
      notify()
    }
  },

  /** Remove an agent — updates cache, persists, notifies all subscribers. */
  async remove(agentId: string): Promise<void> {
    cache = ensureCache().filter((a) => a.agentId !== agentId)
    writeStorage(cache)
    notify()
  },

  /** Reset to seeds. */
  async clear(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY)
    ensureCache()
    notify()
  },

  async isAvailable(): Promise<boolean> {
    return true
  },

  /**
   * Rebuild the exec roster from a wizard-selected role list.
   * CEO is always included. Non-exec (worker) agents are preserved.
   * Triggers a full notify() so every useAgents() re-renders.
   */
  applySetup(selectedRoles: string[]): void {
    const current = ensureCache()
    // Keep all non-exec agents (workers, assistants)
    const workers = current.filter(
      (a) => !a.agentId.startsWith('agent.exec.')
    )
    // Always include CEO
    const roles = Array.from(new Set(['ceo', ...selectedRoles]))
    const execs: BoardAgent[] = roles
      .map((role) => {
        // Reuse existing agent if already in cache (preserves llmKey, etc.)
        const existing = current.find((a) => a.agentId === `agent.exec.${role}`)
        if (existing) return existing
        // Otherwise pull from SEED_AGENTS
        const seed = SEED_AGENTS.find((a) => a.agentId === `agent.exec.${role}`)
        if (!seed) return null
        return { ...seed, boardId: 'default', addedAt: new Date().toISOString() } as BoardAgent
      })
      .filter(Boolean) as BoardAgent[]
    cache = [...execs, ...workers].map(enrichAgent) as BoardAgent[]
    writeStorage(cache)
    notify()
  },
}
