import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScrollTextIcon,
  ShieldIcon,
  ZapIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  EditIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  UsersIcon,
  BrainIcon,
  LinkIcon,
  CodeIcon,
  NetworkIcon,
  SlidersIcon,
  ArrowRightIcon,
  LockIcon,
  UnlockIcon,
  RefreshCwIcon,
  ClockIcon,
  DollarSignIcon,
  SparklesIcon,
  CheckIcon,
  CircleDotIcon,
  GitMergeIcon,
  ServerIcon,
  KeyIcon,
  GlobeIcon,
  MessageSquareIcon,
  TriangleAlertIcon } from
'lucide-react';
type RulesTab =
'management' |
'customization' |
'crosscheck' |
'schema' |
'integration';
// ─── Types ─────────────────────────────────────────────────────────────────────
interface Rule {
  id: string;
  name: string;
  description: string;
  appliesTo: string[];
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  active: boolean;
  type: 'global' | 'conditional' | 'executive';
  detail: string;
}
// ─── Data ──────────────────────────────────────────────────────────────────────
const executives = [
{
  id: 'ceo',
  role: 'CEO',
  name: 'Aria',
  color: 'from-amber-400 to-amber-600',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/40',
  text: 'text-amber-400',
  tone: 'Strategic',
  threshold: 2000,
  focus: 'Long-term growth',
  custom:
  'Always consider the 3-year strategic horizon before recommending any major operational change.',
  domains: ['Strategy', 'M&A', 'Partnerships', 'Vision'],
  notifyOn: ['Critical', 'High']
},
{
  id: 'cfo',
  role: 'CFO',
  name: 'Felix',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/40',
  text: 'text-blue-400',
  tone: 'Analytical',
  threshold: 500,
  focus: 'Cash flow optimization',
  custom:
  'Flag any payment terms beyond net-30. Require CFO review for all vendor contracts exceeding $5,000.',
  domains: ['Finance', 'Invoicing', 'Payroll', 'Forecasting'],
  notifyOn: ['Critical', 'High', 'Medium']
},
{
  id: 'coo',
  role: 'COO',
  name: 'Orion',
  color: 'from-green-400 to-green-600',
  bg: 'bg-green-500/20',
  border: 'border-green-500/40',
  text: 'text-green-400',
  tone: 'Direct',
  threshold: 1500,
  focus: 'Operational speed',
  custom:
  'Prioritize crew safety over cost savings in all dispatch decisions. Emergency rerouting is always pre-approved.',
  domains: ['Operations', 'Logistics', 'Scheduling', 'Dispatch'],
  notifyOn: ['Critical']
},
{
  id: 'cmo',
  role: 'CMO',
  name: 'Maya',
  color: 'from-pink-400 to-pink-600',
  bg: 'bg-pink-500/20',
  border: 'border-pink-500/40',
  text: 'text-pink-400',
  tone: 'Creative',
  threshold: 800,
  focus: 'ROI-driven campaigns',
  custom:
  'A/B test all campaigns before full launch. Never commit full ad budget without 48-hour test results.',
  domains: ['Marketing', 'Brand', 'Content', 'Campaigns'],
  notifyOn: ['Critical', 'High']
},
{
  id: 'cto',
  role: 'CTO',
  name: 'Theo',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/40',
  text: 'text-purple-400',
  tone: 'Technical',
  threshold: 1000,
  focus: 'Security-first architecture',
  custom:
  'No third-party integrations without security review. All API keys must be rotated every 90 days.',
  domains: ['Technology', 'Security', 'Integrations', 'Automation'],
  notifyOn: ['Critical', 'High']
},
{
  id: 'clo',
  role: 'CLO',
  name: 'Lex',
  color: 'from-cyan-400 to-cyan-600',
  bg: 'bg-cyan-500/20',
  border: 'border-cyan-500/40',
  text: 'text-cyan-400',
  tone: 'Formal',
  threshold: 0,
  focus: 'Zero compliance risk',
  custom:
  'Zero tolerance for regulatory violations. All compliance actions require CLO sign-off regardless of dollar amount.',
  domains: ['Legal', 'Compliance', 'Contracts', 'Risk'],
  notifyOn: ['Critical', 'High', 'Medium', 'Low']
},
{
  id: 'chro',
  role: 'CHRO',
  name: 'Hana',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/40',
  text: 'text-rose-400',
  tone: 'Empathetic',
  threshold: 500,
  focus: 'Employee wellbeing',
  custom:
  'Employee wellbeing takes priority over operational efficiency. Escalate any HR decision affecting more than 3 employees.',
  domains: ['HR', 'Culture', 'Payroll', 'Onboarding'],
  notifyOn: ['Critical', 'High']
},
{
  id: 'cso',
  role: 'CSO',
  name: 'Sage',
  color: 'from-orange-400 to-orange-600',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/40',
  text: 'text-orange-400',
  tone: 'Persuasive',
  threshold: 1200,
  focus: 'Revenue maximization',
  custom:
  'Never discount more than 15% without owner approval. Always offer value-add before price reduction.',
  domains: ['Sales', 'Revenue', 'CRM', 'Retention'],
  notifyOn: ['Critical', 'High']
}];

const managementRules: Rule[] = [
{
  id: 'R-001',
  name: 'Auto-Approval Threshold',
  description:
  'Decisions under the configured threshold are automatically approved without human review.',
  appliesTo: ['ALL'],
  category: 'Decision Authority',
  priority: 'high',
  active: true,
  type: 'global',
  detail:
  'Each executive has an individual threshold. Global minimum: $500. Global maximum: $5,000. Threshold is per-decision, not cumulative.'
},
{
  id: 'R-002',
  name: 'Critical Decision Escalation',
  description:
  'Any decision marked Critical impact always requires human owner approval before execution.',
  appliesTo: ['ALL'],
  category: 'Decision Authority',
  priority: 'critical',
  active: true,
  type: 'global',
  detail:
  'Critical decisions are paused and owner is notified via push + email. 24-hour response window. If no response, decision is held (not auto-rejected).'
},
{
  id: 'R-003',
  name: 'Financial Consensus Rule',
  description:
  'Financial decisions exceeding $5,000 require both CFO and CEO consensus before execution.',
  appliesTo: ['CFO', 'CEO'],
  category: 'Decision Authority',
  priority: 'critical',
  active: true,
  type: 'conditional',
  detail:
  'CFO initiates. CEO reviews within 4 hours. If CEO is unavailable, decision escalates to owner. Blockchain-logged with both signatures.'
},
{
  id: 'R-004',
  name: 'Compliance Review Gate',
  description:
  'All decisions touching legal, regulatory, or compliance domains require CLO review.',
  appliesTo: ['CLO', 'ALL'],
  category: 'Compliance',
  priority: 'critical',
  active: true,
  type: 'global',
  detail:
  'CLO Lex reviews within 2 hours. If compliance risk is detected, decision is blocked until CLO clears it. No override permitted.'
},
{
  id: 'R-005',
  name: '24-Hour Decision Expiry',
  description:
  'Pending decisions that receive no human response within 24 hours are held and re-queued.',
  appliesTo: ['ALL'],
  category: 'Workflow',
  priority: 'medium',
  active: true,
  type: 'global',
  detail:
  'After 24 hours, decision is flagged as "Stale" and re-presented to owner. After 72 hours, escalated to Board notification.'
},
{
  id: 'R-006',
  name: 'Blockchain Audit Logging',
  description:
  'Every decision, approval, rejection, and override is immutably logged to the blockchain.',
  appliesTo: ['ALL'],
  category: 'Compliance',
  priority: 'high',
  active: true,
  type: 'global',
  detail:
  'Logs include: decision hash, executive ID, timestamp, confidence score, human action, outcome. Cannot be disabled.'
},
{
  id: 'R-007',
  name: 'Confidence Threshold Gate',
  description:
  'Decisions with AI confidence below 70% are automatically flagged for human review.',
  appliesTo: ['ALL'],
  category: 'Quality Control',
  priority: 'high',
  active: true,
  type: 'global',
  detail:
  'Confidence is calculated from data completeness, historical accuracy, and model certainty. Flagged decisions show confidence breakdown.'
},
{
  id: 'R-008',
  name: 'Cross-Executive Conflict Resolution',
  description:
  'When 2+ executives recommend conflicting actions, the decision escalates to human owner.',
  appliesTo: ['ALL'],
  category: 'Quality Control',
  priority: 'high',
  active: true,
  type: 'global',
  detail:
  'Conflict is detected when executives recommend mutually exclusive actions on the same business event. Both recommendations are presented to owner.'
},
{
  id: 'R-009',
  name: 'Emergency Operations Override',
  description:
  'COO can execute critical operational decisions without approval during declared emergencies.',
  appliesTo: ['COO'],
  category: 'Decision Authority',
  priority: 'critical',
  active: true,
  type: 'conditional',
  detail:
  'Emergency is declared when: safety risk detected, time-critical crew situation, or owner pre-authorized emergency mode. All emergency actions are logged and reviewed post-execution.'
},
{
  id: 'R-010',
  name: 'Sales Discount Limit',
  description:
  'CSO cannot offer discounts exceeding 15% without explicit owner approval.',
  appliesTo: ['CSO'],
  category: 'Financial Controls',
  priority: 'high',
  active: true,
  type: 'executive',
  detail:
  'Applies to all pricing negotiations, contract renewals, and promotional offers. Discount calculation is based on list price, not previous discounted price.'
},
{
  id: 'R-011',
  name: 'HR Multi-Employee Escalation',
  description:
  'Any HR decision affecting 3 or more employees requires human review before execution.',
  appliesTo: ['CHRO'],
  category: 'HR Controls',
  priority: 'high',
  active: true,
  type: 'executive',
  detail:
  'Includes: schedule changes, policy updates, compensation adjustments, disciplinary actions. Single-employee decisions follow standard threshold rules.'
},
{
  id: 'R-012',
  name: 'Third-Party Integration Gate',
  description:
  'No new third-party API integrations can be activated without CTO security review.',
  appliesTo: ['CTO'],
  category: 'Security',
  priority: 'high',
  active: true,
  type: 'executive',
  detail:
  'CTO Theo runs automated security scan + manual review. Integration is sandboxed for 48 hours before production access. All API keys stored in encrypted vault.'
}];

const crossChecks = [
{
  from: 'CEO',
  fromColor: 'text-amber-400',
  fromBg: 'bg-amber-500/20',
  to: 'CFO',
  toColor: 'text-blue-400',
  toBg: 'bg-blue-500/20',
  trigger: 'Strategic financial decisions >$10K',
  frequency: '47 checks this month',
  status: 'active'
},
{
  from: 'CFO',
  fromColor: 'text-blue-400',
  fromBg: 'bg-blue-500/20',
  to: 'CLO',
  toColor: 'text-cyan-400',
  toBg: 'bg-cyan-500/20',
  trigger: 'Compliance-related financial actions',
  frequency: '23 checks this month',
  status: 'active'
},
{
  from: 'COO',
  fromColor: 'text-green-400',
  fromBg: 'bg-green-500/20',
  to: 'CFO',
  toColor: 'text-blue-400',
  toBg: 'bg-blue-500/20',
  trigger: 'Operational spend >$2,500',
  frequency: '89 checks this month',
  status: 'active'
},
{
  from: 'CMO',
  fromColor: 'text-pink-400',
  fromBg: 'bg-pink-500/20',
  to: 'CSO',
  toColor: 'text-orange-400',
  toBg: 'bg-orange-500/20',
  trigger: 'Revenue-impacting campaigns',
  frequency: '31 checks this month',
  status: 'active'
},
{
  from: 'CTO',
  fromColor: 'text-purple-400',
  fromBg: 'bg-purple-500/20',
  to: 'CLO',
  toColor: 'text-cyan-400',
  toBg: 'bg-cyan-500/20',
  trigger: 'Technology compliance & data privacy',
  frequency: '18 checks this month',
  status: 'active'
},
{
  from: 'CSO',
  fromColor: 'text-orange-400',
  fromBg: 'bg-orange-500/20',
  to: 'CFO',
  toColor: 'text-blue-400',
  toBg: 'bg-blue-500/20',
  trigger: 'Contract pricing & discount approvals',
  frequency: '29 checks this month',
  status: 'active'
},
{
  from: 'CHRO',
  fromColor: 'text-rose-400',
  fromBg: 'bg-rose-500/20',
  to: 'CLO',
  toColor: 'text-cyan-400',
  toBg: 'bg-cyan-500/20',
  trigger: 'Employment law & HR compliance',
  frequency: '12 checks this month',
  status: 'active'
},
{
  from: 'ALL',
  fromColor: 'text-slate-300',
  fromBg: 'bg-slate-500/20',
  to: 'CEO',
  toColor: 'text-amber-400',
  toBg: 'bg-amber-500/20',
  trigger: 'Any Critical impact decision',
  frequency: '14 checks this month',
  status: 'active'
}];

const schemaLines = [
{
  text: '{',
  color: 'text-slate-300',
  indent: 0
},
{
  text: '"rule_schema": {',
  color: 'text-blue-400',
  indent: 1
},
{
  text: '"id": "string · UUID · auto-generated",',
  color: 'text-green-400',
  indent: 2
},
{
  text: '"name": "string · max 80 chars",',
  color: 'text-green-400',
  indent: 2
},
{
  text: '"type": "global | executive | conditional",',
  color: 'text-amber-400',
  indent: 2
},
{
  text: '"applies_to": ["CEO", "CFO", "COO", "ALL"],',
  color: 'text-purple-400',
  indent: 2
},
{
  text: '"trigger": {',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"condition": "string · natural language",',
  color: 'text-green-400',
  indent: 3
},
{
  text: '"threshold": "number | null",',
  color: 'text-orange-400',
  indent: 3
},
{
  text: '"impact_level": "low | medium | high | critical",',
  color: 'text-amber-400',
  indent: 3
},
{
  text: '"confidence_min": "number · 0-100"',
  color: 'text-orange-400',
  indent: 3
},
{
  text: '},',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"action": {',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"type": "auto_approve | escalate | block | consensus",',
  color: 'text-amber-400',
  indent: 3
},
{
  text: '"notify": ["owner", "exec", "board"],',
  color: 'text-purple-400',
  indent: 3
},
{
  text: '"timeout_hours": "number · default 24",',
  color: 'text-orange-400',
  indent: 3
},
{
  text: '"fallback": "hold | reject | escalate"',
  color: 'text-orange-400',
  indent: 3
},
{
  text: '},',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"cross_check": {',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"required": "boolean",',
  color: 'text-green-400',
  indent: 3
},
{
  text: '"reviewers": ["CFO", "CLO"],',
  color: 'text-purple-400',
  indent: 3
},
{
  text: '"consensus_required": "boolean"',
  color: 'text-green-400',
  indent: 3
},
{
  text: '},',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"audit": {',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"blockchain_log": "boolean · always true",',
  color: 'text-green-400',
  indent: 3
},
{
  text: '"hash": "string · SHA-256",',
  color: 'text-green-400',
  indent: 3
},
{
  text: '"immutable": true',
  color: 'text-orange-400',
  indent: 3
},
{
  text: '},',
  color: 'text-blue-400',
  indent: 2
},
{
  text: '"priority": "number · 1-10",',
  color: 'text-orange-400',
  indent: 2
},
{
  text: '"active": "boolean",',
  color: 'text-green-400',
  indent: 2
},
{
  text: '"created_at": "ISO 8601 timestamp",',
  color: 'text-slate-400',
  indent: 2
},
{
  text: '"version": "number · auto-incremented"',
  color: 'text-slate-400',
  indent: 2
},
{
  text: '}',
  color: 'text-blue-400',
  indent: 1
},
{
  text: '}',
  color: 'text-slate-300',
  indent: 0
}];

const integrations = [
{
  name: 'OpenAI GPT-4o',
  type: 'AI Model',
  status: 'connected',
  access: 'Read · Reasoning',
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  emoji: '🤖',
  usage: 'Decision reasoning & natural language processing',
  rateLimit: '10,000 req/day',
  lastCall: '2 min ago'
},
{
  name: 'Anthropic Claude 3.5',
  type: 'AI Model',
  status: 'connected',
  access: 'Read · Compliance',
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  emoji: '🧠',
  usage: 'Compliance review & legal document analysis',
  rateLimit: '5,000 req/day',
  lastCall: '18 min ago'
},
{
  name: 'QuickBooks AI',
  type: 'Business Agent',
  status: 'connected',
  access: 'Read/Write · Finance',
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  emoji: '📊',
  usage: 'Invoice sync, payment processing, financial data',
  rateLimit: 'Unlimited',
  lastCall: '45 sec ago'
},
{
  name: 'Salesforce Einstein',
  type: 'Business Agent',
  status: 'connected',
  access: 'Read/Write · CRM',
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  emoji: '☁️',
  usage: 'Lead scoring, pipeline management, contact sync',
  rateLimit: 'Unlimited',
  lastCall: '3 min ago'
},
{
  name: 'Custom Webhook Agent',
  type: 'Custom Agent',
  status: 'connected',
  access: 'Read/Write · All',
  color: 'text-orange-400',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  emoji: '⚡',
  usage: 'Custom business logic, legacy system bridge',
  rateLimit: '50,000 req/day',
  lastCall: '8 min ago'
},
{
  name: 'Human: John Doe (Owner)',
  type: 'Human Principal',
  status: 'active',
  access: 'Full Override',
  color: 'text-amber-400',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/30',
  emoji: '👤',
  usage: 'Final authority on all Critical decisions. 24hr response window.',
  rateLimit: 'N/A',
  lastCall: '2 hrs ago'
},
{
  name: 'Board of Directors',
  type: 'Human Group',
  status: 'active',
  access: 'Strategic Override',
  color: 'text-violet-400',
  bg: 'bg-violet-500/20',
  border: 'border-violet-500/30',
  emoji: '🏛️',
  usage: 'Unanimous vote required for decisions >$50K or AGI-tier changes',
  rateLimit: 'N/A',
  lastCall: '3 days ago'
},
{
  name: 'Zapier Automation',
  type: 'Workflow Agent',
  status: 'pending',
  access: 'Write · Triggers',
  color: 'text-yellow-400',
  bg: 'bg-yellow-500/20',
  border: 'border-yellow-500/30',
  emoji: '🔗',
  usage: 'Cross-platform workflow automation',
  rateLimit: '2,000 tasks/mo',
  lastCall: 'Not connected'
}];

const priorityConfig = {
  critical: {
    label: 'Critical',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30'
  },
  high: {
    label: 'High',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30'
  },
  medium: {
    label: 'Medium',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30'
  },
  low: {
    label: 'Low',
    color: 'text-slate-400',
    bg: 'bg-slate-500/20',
    border: 'border-slate-600/30'
  }
};
// ─── TAB 1: MANAGEMENT RULES ──────────────────────────────────────────────────
function TabManagement() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rules, setRules] = useState(managementRules);
  const [filter, setFilter] = useState<string>('all');
  const categories = [
  'all',
  ...Array.from(new Set(managementRules.map((r) => r.category)))];

  const filtered =
  filter === 'all' ? rules : rules.filter((r) => r.category === filter);
  const toggleRule = (id: string) => {
    setRules((prev) =>
    prev.map((r) =>
    r.id === id ?
    {
      ...r,
      active: !r.active
    } :
    r
    )
    );
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Management Rules Engine
          </p>
          <p className="text-xs text-slate-400">
            {rules.filter((r) => r.active).length} active rules ·{' '}
            {rules.filter((r) => !r.active).length} inactive · All
            blockchain-logged
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors">
          <PlusIcon className="w-3.5 h-3.5" /> New Rule
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-red-400">
            {rules.filter((r) => r.priority === 'critical').length}
          </p>
          <p className="text-xs text-slate-500">Critical Rules</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-orange-400">
            {rules.filter((r) => r.type === 'global').length}
          </p>
          <p className="text-xs text-slate-500">Global Rules</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-blue-400">
            {rules.filter((r) => r.type === 'conditional').length}
          </p>
          <p className="text-xs text-slate-500">Conditional</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-green-400">
            {rules.filter((r) => r.active).length}
          </p>
          <p className="text-xs text-slate-500">Active</p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 flex-wrap">
        {categories.map((cat) =>
        <button
          key={cat}
          onClick={() => setFilter(cat)}
          className={`flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${filter === cat ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>

            {cat === 'all' ? 'All Rules' : cat}
          </button>
        )}
      </div>

      {/* Rules list */}
      <div className="space-y-2">
        {filtered.map((rule, i) => {
          const pConfig = priorityConfig[rule.priority];
          const isExpanded = expanded === rule.id;
          return (
            <motion.div
              key={rule.id}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.04
              }}
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition-all ${rule.active ? 'border-slate-700/50' : 'border-slate-800 opacity-60'}`}>

              <div className="flex items-start gap-3 p-4">
                {/* Priority indicator */}
                <div
                  className={`w-1 self-stretch rounded-full flex-shrink-0 ${rule.priority === 'critical' ? 'bg-red-400' : rule.priority === 'high' ? 'bg-orange-400' : rule.priority === 'medium' ? 'bg-yellow-400' : 'bg-slate-600'}`} />


                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-slate-600">
                        {rule.id}
                      </span>
                      <p className="text-sm font-bold text-white">
                        {rule.name}
                      </p>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${pConfig.bg} ${pConfig.border} ${pConfig.color}`}>

                        {pConfig.label}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rule.type === 'global' ? 'bg-blue-500/20 text-blue-400' : rule.type === 'conditional' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-700 text-slate-400'}`}>

                        {rule.type}
                      </span>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => toggleRule(rule.id)}
                      className={`flex-shrink-0 transition-colors ${rule.active ? 'text-orange-400' : 'text-slate-600'}`}>

                      {rule.active ?
                      <ToggleRightIcon className="w-6 h-6" /> :

                      <ToggleLeftIcon className="w-6 h-6" />
                      }
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {rule.description}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <UsersIcon className="w-3 h-3 text-slate-600" />
                      {rule.appliesTo.map((exec) =>
                      <span
                        key={exec}
                        className={`text-[10px] font-black px-1.5 py-0.5 rounded ${exec === 'ALL' ? 'bg-slate-700 text-slate-300' : 'bg-orange-500/20 text-orange-400'}`}>

                          {exec}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-600">
                      {rule.category}
                    </span>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : rule.id)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-orange-400 transition-colors ml-auto">

                      Details
                      <ChevronDownIcon
                        className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />

                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded &&
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1
                  }}
                  exit={{
                    height: 0,
                    opacity: 0
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="overflow-hidden">

                    <div className="px-4 pb-4 border-t border-slate-800 pt-3 ml-4">
                      <div className="flex items-start gap-2 bg-slate-800/60 rounded-xl p-3">
                        <ScrollTextIcon className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {rule.detail}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors">
                          <EditIcon className="w-3 h-3" /> Edit Rule
                        </button>
                        <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors">
                          <CodeIcon className="w-3 h-3" /> View Schema
                        </button>
                      </div>
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </motion.div>);

        })}
      </div>
    </div>);

}
// ─── TAB 2: CUSTOMIZATION ─────────────────────────────────────────────────────
function TabCustomization() {
  const [selected, setSelected] = useState<string>('ceo');
  const exec = executives.find((e) => e.id === selected)!;
  const [customText, setCustomText] = useState(exec.custom);
  const handleSelect = (id: string) => {
    setSelected(id);
    const e = executives.find((ex) => ex.id === id)!;
    setCustomText(e.custom);
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm font-black text-white">
          Executive Behavior Customization
        </p>
        <span className="text-xs text-slate-500">
          Per-executive rules override global defaults
        </span>
      </div>

      {/* Executive selector */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {executives.map((e) =>
        <button
          key={e.id}
          onClick={() => handleSelect(e.id)}
          className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${selected === e.id ? `${e.bg} ${e.border}` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

            <div
            className={`w-8 h-8 bg-gradient-to-br ${e.color} rounded-lg flex items-center justify-center`}>

              <span className="text-white font-black text-xs">{e.name[0]}</span>
            </div>
            <span
            className={`text-[10px] font-bold ${selected === e.id ? e.text : 'text-slate-500'}`}>

              {e.role}
            </span>
          </button>
        )}
      </div>

      {/* Selected exec config */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="space-y-4">

          {/* Header */}
          <div className={`${exec.bg} border ${exec.border} rounded-2xl p-4`}>
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center shadow-lg`}>

                <span className="text-white font-black text-lg">
                  {exec.name[0]}
                </span>
              </div>
              <div>
                <p className="text-base font-black text-white">
                  {exec.role} — {exec.name}
                </p>
                <p className={`text-xs font-bold ${exec.text}`}>{exec.focus}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Tone & Style */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Communication Tone
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                'Strategic',
                'Analytical',
                'Direct',
                'Creative',
                'Technical',
                'Formal',
                'Empathetic',
                'Persuasive'].
                map((tone) =>
                <button
                  key={tone}
                  className={`text-xs font-bold py-2 px-3 rounded-xl border transition-all ${exec.tone === tone ? `${exec.bg} ${exec.border} ${exec.text}` : 'bg-slate-800 border-slate-700 text-slate-500 hover:border-slate-600'}`}>

                    {tone}
                  </button>
                )}
              </div>
            </div>

            {/* Thresholds */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Decision Thresholds
              </p>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">
                      Auto-Approve Limit
                    </span>
                    <span className={`text-sm font-black ${exec.text}`}>
                      {exec.threshold === 0 ?
                      'All require review' :
                      `$${exec.threshold.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${exec.color} rounded-full`}
                      style={{
                        width: `${Math.min(exec.threshold / 5000 * 100, 100)}%`
                      }} />

                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                    <span>$0</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400">
                    Notify on Impact Level
                  </p>
                  {['Critical', 'High', 'Medium', 'Low'].map((level) =>
                  <div
                    key={level}
                    className="flex items-center justify-between">

                      <span className="text-xs text-slate-300">
                        {level} Impact
                      </span>
                      <div
                      className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-all ${exec.notifyOn.includes(level) ? 'bg-orange-500 justify-end' : 'bg-slate-700 justify-start'}`}>

                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Domains */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Domain Permissions
            </p>
            <div className="flex flex-wrap gap-2">
              {exec.domains.map((domain) =>
              <span
                key={domain}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl ${exec.bg} ${exec.border} border ${exec.text}`}>

                  {domain}
                </span>
              )}
              <button className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 border border-dashed border-slate-600 text-slate-500 hover:border-slate-400 transition-colors">
                + Add Domain
              </button>
            </div>
          </div>

          {/* Custom instructions */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Custom Instructions
              </p>
              <span className="text-[10px] text-slate-600">
                {customText.length}/500 chars
              </span>
            </div>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 resize-none leading-relaxed" />

            <div className="flex gap-2 mt-3">
              <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
                <CheckIcon className="w-3.5 h-3.5" /> Save Changes
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl hover:bg-slate-700 transition-colors">
                <RefreshCwIcon className="w-3.5 h-3.5" /> Reset to Default
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}
// ─── TAB 3: CROSS-CHECK ───────────────────────────────────────────────────────
function TabCrossCheck() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Cross-Verification Matrix
          </p>
          <p className="text-xs text-slate-400">
            How AI executives verify each other's decisions before execution
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
          </span>
          {crossChecks.
          reduce((s, c) => s + parseInt(c.frequency), 0).
          toLocaleString()}{' '}
          checks this month
        </span>
      </div>

      {/* Cross-check pairs */}
      <div className="space-y-2">
        {crossChecks.map((check, i) =>
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: -8
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: i * 0.06
          }}
          className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

            <div className="flex items-center gap-3 flex-wrap">
              {/* From */}
              <span
              className={`text-xs font-black px-2.5 py-1.5 rounded-xl ${check.fromBg} ${check.fromColor} flex-shrink-0`}>

                {check.from}
              </span>

              {/* Arrow */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <div className="w-8 h-px bg-slate-700" />
                <GitMergeIcon className="w-3.5 h-3.5 text-slate-500" />
                <div className="w-8 h-px bg-slate-700" />
              </div>

              {/* To */}
              <span
              className={`text-xs font-black px-2.5 py-1.5 rounded-xl ${check.toBg} ${check.toColor} flex-shrink-0`}>

                {check.to}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 font-semibold">
                  {check.trigger}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-slate-500">
                  {check.frequency}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                  ACTIVE
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Conflict resolution protocol */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangleIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">
            Conflict Resolution Protocol
          </p>
        </div>
        <div className="space-y-3">
          {[
          {
            step: '1',
            label: 'Conflict Detected',
            desc: 'Two or more executives recommend mutually exclusive actions on the same event',
            color: 'text-red-400',
            bg: 'bg-red-500/20'
          },
          {
            step: '2',
            label: 'Auto-Hold',
            desc: 'All conflicting actions are paused. No execution until resolution.',
            color: 'text-orange-400',
            bg: 'bg-orange-500/20'
          },
          {
            step: '3',
            label: 'Consensus Attempt',
            desc: "Executives re-evaluate with each other's reasoning. 30-minute window.",
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/20'
          },
          {
            step: '4',
            label: 'Human Escalation',
            desc: 'If no consensus, owner is presented both recommendations with full context.',
            color: 'text-blue-400',
            bg: 'bg-blue-500/20'
          },
          {
            step: '5',
            label: 'Owner Decision',
            desc: 'Owner selects preferred action. Decision is blockchain-logged with conflict record.',
            color: 'text-green-400',
            bg: 'bg-green-500/20'
          }].
          map((step) =>
          <div key={step.step} className="flex items-start gap-3">
              <div
              className={`w-6 h-6 ${step.bg} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>

                <span className={`text-xs font-black ${step.color}`}>
                  {step.step}
                </span>
              </div>
              <div>
                <p className={`text-xs font-bold ${step.color}`}>
                  {step.label}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Consensus requirements */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Consensus Requirements by Decision Type
        </p>
        <div className="space-y-2">
          {[
          {
            type: 'Financial >$10K',
            required: 'CFO + CEO',
            color: 'text-blue-400'
          },
          {
            type: 'Legal/Compliance',
            required: 'CLO + CEO',
            color: 'text-cyan-400'
          },
          {
            type: 'Strategic (Critical)',
            required: 'CEO + Board',
            color: 'text-amber-400'
          },
          {
            type: 'HR (3+ employees)',
            required: 'CHRO + CEO',
            color: 'text-rose-400'
          },
          {
            type: 'Technology Security',
            required: 'CTO + CLO',
            color: 'text-purple-400'
          },
          {
            type: 'Sales Discount >15%',
            required: 'CSO + CFO + Owner',
            color: 'text-orange-400'
          }].
          map((item, i) =>
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">

              <span className="text-xs text-slate-300">{item.type}</span>
              <span className={`text-xs font-bold ${item.color}`}>
                {item.required}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>);

}
// ─── TAB 4: SCHEMA ────────────────────────────────────────────────────────────
function TabSchema() {
  const [activeSchema, setActiveSchema] = useState<
    'rule' | 'decision' | 'agent'>(
    'rule');
  const decisionSchema = [
  {
    text: '{',
    color: 'text-slate-300',
    indent: 0
  },
  {
    text: '"decision_schema": {',
    color: 'text-blue-400',
    indent: 1
  },
  {
    text: '"id": "string · UUID",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"executive_id": "string · CEO | CFO | COO...",',
    color: 'text-amber-400',
    indent: 2
  },
  {
    text: '"category": "string · Operations | Finance...",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"impact": "low | medium | high | critical",',
    color: 'text-orange-400',
    indent: 2
  },
  {
    text: '"confidence": "number · 0-100",',
    color: 'text-orange-400',
    indent: 2
  },
  {
    text: '"recommendation": "string · natural language",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"outcome_projected": "string",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"financial_impact": "number | null",',
    color: 'text-orange-400',
    indent: 2
  },
  {
    text: '"status": "pending | approved | rejected | auto_approved",',
    color: 'text-amber-400',
    indent: 2
  },
  {
    text: '"cross_checked_by": ["CFO", "CLO"],',
    color: 'text-purple-400',
    indent: 2
  },
  {
    text: '"human_action": "string | null",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"blockchain_hash": "string · SHA-256",',
    color: 'text-slate-400',
    indent: 2
  },
  {
    text: '"created_at": "ISO 8601",',
    color: 'text-slate-400',
    indent: 2
  },
  {
    text: '"resolved_at": "ISO 8601 | null"',
    color: 'text-slate-400',
    indent: 2
  },
  {
    text: '}',
    color: 'text-blue-400',
    indent: 1
  },
  {
    text: '}',
    color: 'text-slate-300',
    indent: 0
  }];

  const agentSchema = [
  {
    text: '{',
    color: 'text-slate-300',
    indent: 0
  },
  {
    text: '"agent_integration_schema": {',
    color: 'text-blue-400',
    indent: 1
  },
  {
    text: '"agent_id": "string · UUID",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"name": "string",',
    color: 'text-green-400',
    indent: 2
  },
  {
    text: '"type": "ai_model | business_agent | human | workflow",',
    color: 'text-amber-400',
    indent: 2
  },
  {
    text: '"access_level": "read | write | read_write | override",',
    color: 'text-orange-400',
    indent: 2
  },
  {
    text: '"permissions": {',
    color: 'text-blue-400',
    indent: 2
  },
  {
    text: '"can_initiate_decisions": "boolean",',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '"can_approve_decisions": "boolean",',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '"can_override_rules": "boolean",',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '"data_domains": ["Finance", "Operations"]',
    color: 'text-purple-400',
    indent: 3
  },
  {
    text: '},',
    color: 'text-blue-400',
    indent: 2
  },
  {
    text: '"handoff_protocol": {',
    color: 'text-blue-400',
    indent: 2
  },
  {
    text: '"trigger": "string · condition for handoff",',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '"target_agent": "string · agent_id",',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '"context_transfer": "boolean"',
    color: 'text-green-400',
    indent: 3
  },
  {
    text: '},',
    color: 'text-blue-400',
    indent: 2
  },
  {
    text: '"rate_limit": "number | null",',
    color: 'text-orange-400',
    indent: 2
  },
  {
    text: '"status": "connected | pending | disconnected"',
    color: 'text-amber-400',
    indent: 2
  },
  {
    text: '}',
    color: 'text-blue-400',
    indent: 1
  },
  {
    text: '}',
    color: 'text-slate-300',
    indent: 0
  }];

  const schemas = {
    rule: schemaLines,
    decision: decisionSchema,
    agent: agentSchema
  };
  const activeLines = schemas[activeSchema];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Management Schema Definitions
          </p>
          <p className="text-xs text-slate-400">
            Data structures powering the APEX rules engine
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400">
          JSON Schema v3.1
        </span>
      </div>

      {/* Schema selector */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1 w-fit">
        {(
        [
        {
          id: 'rule',
          label: 'Rule Schema'
        },
        {
          id: 'decision',
          label: 'Decision Schema'
        },
        {
          id: 'agent',
          label: 'Agent Schema'
        }] as
        const).
        map((s) =>
        <button
          key={s.id}
          onClick={() => setActiveSchema(s.id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSchema === s.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

            <CodeIcon className="w-3.5 h-3.5" />
            {s.label}
          </button>
        )}
      </div>

      {/* Schema viewer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSchema}
          initial={{
            opacity: 0,
            y: 4
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.15
          }}
          className="bg-[#0d1117] border border-slate-700/50 rounded-2xl overflow-hidden">

          {/* File header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                {activeSchema}_schema.json
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>JSON</span>
              <span>·</span>
              <span>{activeLines.length} lines</span>
            </div>
          </div>

          {/* Code content */}
          <div className="p-4 overflow-x-auto">
            <div className="space-y-0.5">
              {activeLines.map((line, i) =>
              <div key={i} className="flex items-start">
                  <span className="w-8 text-right text-slate-700 text-xs select-none mr-4 pt-0.5 flex-shrink-0 font-mono">
                    {i + 1}
                  </span>
                  <span
                  className={`font-mono text-xs leading-relaxed ${line.color}`}
                  style={{
                    paddingLeft: `${line.indent * 16}px`
                  }}>

                    {line.text || '\u00A0'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Schema stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-orange-400">12</p>
          <p className="text-xs text-slate-500">Active Rules</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-blue-400">3</p>
          <p className="text-xs text-slate-500">Schema Types</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-green-400">v3.1</p>
          <p className="text-xs text-slate-500">Schema Version</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-purple-400">100%</p>
          <p className="text-xs text-slate-500">Validated</p>
        </div>
      </div>
    </div>);

}
// ─── TAB 5: AGENT INTEGRATION ─────────────────────────────────────────────────
function TabIntegration() {
  const humanHandoffRules = [
  {
    trigger: 'Decision impact = Critical',
    action: 'Notify owner via push + email',
    timeout: '24 hours',
    fallback: 'Hold decision'
  },
  {
    trigger: 'AI confidence < 70%',
    action: 'Flag for human review with reasoning',
    timeout: '12 hours',
    fallback: 'Re-queue with context'
  },
  {
    trigger: 'Cross-exec conflict detected',
    action: 'Present both options to owner',
    timeout: '6 hours',
    fallback: 'Escalate to Board'
  },
  {
    trigger: 'Financial impact > $50K',
    action: 'Require Board unanimous vote',
    timeout: '48 hours',
    fallback: 'Block execution'
  },
  {
    trigger: 'New vendor/contract',
    action: 'CLO review + owner sign-off',
    timeout: '24 hours',
    fallback: 'Hold pending review'
  }];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Agent & Human Integration Rules
          </p>
          <p className="text-xs text-slate-400">
            How APEX executives interact with external agents and humans
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors">
          <PlusIcon className="w-3.5 h-3.5" /> Add Integration
        </button>
      </div>

      {/* Integration cards */}
      <div className="space-y-3">
        {integrations.map((int, i) =>
        <motion.div
          key={int.name}
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.06
          }}
          className={`${int.bg} border ${int.border} rounded-2xl p-4`}>

            <div className="flex items-start gap-3">
              <div
              className={`w-10 h-10 ${int.bg} border ${int.border} rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>

                {int.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-sm font-bold text-white">{int.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500">
                        {int.type}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        ·
                      </span>
                      <span className={`text-[10px] font-bold ${int.color}`}>
                        {int.access}
                      </span>
                    </div>
                  </div>
                  <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${int.status === 'connected' || int.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>

                    {int.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  {int.usage}
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {int.lastCall}
                  </span>
                  <span className="flex items-center gap-1">
                    <ServerIcon className="w-3 h-3" />
                    {int.rateLimit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Human handoff rules */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <UsersIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">Human Escalation Rules</p>
        </div>
        <div className="space-y-2">
          {humanHandoffRules.map((rule, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: -6
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.07
            }}
            className="bg-slate-800/60 rounded-xl p-3">

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-slate-500 mb-0.5">Trigger</p>
                  <p className="text-orange-400 font-bold">{rule.trigger}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-0.5">Action</p>
                  <p className="text-slate-300">{rule.action}</p>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-slate-500 mb-0.5">Timeout</p>
                    <p className="text-blue-400 font-bold">{rule.timeout}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-0.5">Fallback</p>
                    <p className="text-red-400 font-bold">{rule.fallback}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Agent communication protocol */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <NetworkIcon className="w-4 h-4 text-blue-400" />
          <p className="text-sm font-bold text-white">
            Agent Communication Protocol
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-900/60 rounded-xl p-3">
            <p className="text-xs font-bold text-blue-400 mb-1">
              Message Format
            </p>
            <p className="text-xs text-slate-400">
              JSON over HTTPS · Signed with HMAC-SHA256 · TLS 1.3
            </p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3">
            <p className="text-xs font-bold text-green-400 mb-1">Auth Method</p>
            <p className="text-xs text-slate-400">
              OAuth 2.0 + API Key · Rotated every 90 days · Vault-stored
            </p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-3">
            <p className="text-xs font-bold text-orange-400 mb-1">
              Audit Trail
            </p>
            <p className="text-xs text-slate-400">
              All agent calls logged · Blockchain-verified · Immutable
            </p>
          </div>
        </div>
      </div>
    </div>);

}
// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenRules() {
  const [tab, setTab] = useState<RulesTab>('management');
  const tabs: {
    id: RulesTab;
    label: string;
    emoji: string;
  }[] = [
  {
    id: 'management',
    label: 'Management Rules',
    emoji: '📋'
  },
  {
    id: 'customization',
    label: 'Customization',
    emoji: '🎛️'
  },
  {
    id: 'crosscheck',
    label: 'Cross-Check',
    emoji: '🔄'
  },
  {
    id: 'schema',
    label: 'Schema',
    emoji: '🗂️'
  },
  {
    id: 'integration',
    label: 'Agent Integration',
    emoji: '🤝'
  }];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <p className="text-sm text-slate-400">Detailed management instructions · Customization · Cross-checking · Agent & human integration</p>
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1.5 flex-shrink-0">
          <ShieldIcon className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-bold text-orange-400">
            Rules Engine Active
          </span>
        </div>
      </div>

      {/* Tab nav */}
      <div className="bg-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto">
        {tabs.map((t) =>
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

            <span>{t.emoji}</span>
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.label.split(' ')[0]}</span>
          </button>
        )}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -6
          }}
          transition={{
            duration: 0.2
          }}>

          {tab === 'management' && <TabManagement />}
          {tab === 'customization' && <TabCustomization />}
          {tab === 'crosscheck' && <TabCrossCheck />}
          {tab === 'schema' && <TabSchema />}
          {tab === 'integration' && <TabIntegration />}
        </motion.div>
      </AnimatePresence>
    </div>);

}