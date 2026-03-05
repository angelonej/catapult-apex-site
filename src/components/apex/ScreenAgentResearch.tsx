import React, { useState } from 'react';
import {
  ZapIcon,
  HeadphonesIcon,
  MegaphoneIcon,
  SettingsIcon,
  UsersIcon,
  DollarSignIcon,
  WifiIcon,
  BookOpenIcon,
  BarChart3Icon } from
'lucide-react';
interface AgentProfile {
  id: string;
  name: string;
  icon: typeof ZapIcon;
  color: string;
  tools: string[];
  workflow: string[];
  staffing: string;
  smeKnowledge: string[];
  behavioralData: string[];
  kpis: string[];
}
const agents: AgentProfile[] = [
{
  id: 'sales',
  name: 'Sales Agent',
  icon: ZapIcon,
  color: 'blue',
  tools: [
  'Salesforce / HubSpot CRM',
  'Apollo.io',
  'LinkedIn Sales Navigator',
  'Outreach.io',
  'Calendly',
  'Zoom',
  'Gong.io'],

  workflow: [
  'Prospect discovery',
  'Lead scoring',
  'Personalized outreach',
  'Follow-up sequences',
  'Demo booking',
  'Proposal sent',
  'Close deal',
  'Handoff to Success'],

  staffing:
  '1 human sales manager per 10 AI agents (oversight + complex deals)',
  smeKnowledge: [
  'MEDDIC / Challenger methodology',
  'Objection handling playbooks',
  'Industry pricing benchmarks',
  'Competitive positioning',
  'Buyer persona profiles'],

  behavioralData: [
  'Call recordings & transcripts',
  'Email response rates',
  'Win/loss analysis',
  'Buyer behavior patterns',
  'Conversion funnel data'],

  kpis: [
  'Meetings booked per week',
  'Pipeline generated ($)',
  'Lead-to-close conversion rate',
  'Average deal size',
  'Sales cycle length']

},
{
  id: 'support',
  name: 'Support Agent',
  icon: HeadphonesIcon,
  color: 'emerald',
  tools: [
  'Zendesk',
  'Intercom',
  'Freshdesk',
  'Knowledge base platform',
  'Sentiment analysis API',
  'Twilio (voice/SMS)',
  'Slack escalation'],

  workflow: [
  'Ticket intake',
  'Intent classification',
  'Knowledge base search',
  'Draft response',
  'Human review (if needed)',
  'Send response',
  'CSAT collection',
  'Learn from outcome'],

  staffing:
  '1 human specialist per 50 AI agents (escalations + quality assurance)',
  smeKnowledge: [
  'Full product documentation',
  'Empathy and de-escalation protocols',
  'Resolution playbooks by issue type',
  'SLA requirements',
  'Refund and exception policies'],

  behavioralData: [
  'Ticket history and patterns',
  'Resolution success rates',
  'Customer sentiment trends',
  'Escalation triggers',
  'Response time benchmarks'],

  kpis: [
  'First response time',
  'Resolution rate (%)',
  'CSAT score',
  'Escalation rate',
  'Tickets resolved per hour']

},
{
  id: 'marketing',
  name: 'Marketing Agent',
  icon: MegaphoneIcon,
  color: 'purple',
  tools: [
  'HubSpot',
  'Canva API',
  'Buffer / Hootsuite',
  'Google Analytics',
  'SEMrush',
  'Mailchimp',
  'Figma API'],

  workflow: [
  'Brief creation',
  'Research & ideation',
  'Content draft',
  'Brand review',
  'Approval workflow',
  'Publish content',
  'Monitor performance',
  'Optimize & report'],

  staffing:
  '1 creative director per 5 AI agents (brand consistency + strategy)',
  smeKnowledge: [
  'Brand voice and style guide',
  'SEO best practices',
  'Audience segment profiles',
  'Campaign history and learnings',
  'Competitor content analysis'],

  behavioralData: [
  'Engagement rates by content type',
  'Conversion data from campaigns',
  'A/B test results',
  'Audience behavior patterns',
  'Channel performance benchmarks'],

  kpis: [
  'Content pieces published per week',
  'Engagement rate (%)',
  'Leads generated from content',
  'Brand consistency score',
  'SEO ranking improvements']

},
{
  id: 'operations',
  name: 'Operations Agent',
  icon: SettingsIcon,
  color: 'amber',
  tools: [
  'Monday.com / Asana',
  'Slack',
  'Zapier',
  'Notion',
  'Inventory management system',
  'Scheduling tools',
  'Reporting dashboards'],

  workflow: [
  'Request intake',
  'Priority assessment',
  'Resource allocation',
  'Task assignment',
  'Execution monitoring',
  'Completion verification',
  'Report generation',
  'Process optimization'],

  staffing: '1 operations manager per 20 AI agents',
  smeKnowledge: [
  'Process documentation library',
  'SLA management standards',
  'Vendor relationships and contacts',
  'Compliance requirements',
  'Resource capacity planning'],

  behavioralData: [
  'Task completion rates',
  'Bottleneck patterns',
  'Resource utilization data',
  'SLA adherence history',
  'Cost-per-operation trends'],

  kpis: [
  'Task completion rate (%)',
  'SLA adherence (%)',
  'Cost per operation',
  'Process efficiency score',
  'Bottleneck resolution time']

},
{
  id: 'hr',
  name: 'HR & Recruiting Agent',
  icon: UsersIcon,
  color: 'pink',
  tools: [
  'Greenhouse / Lever ATS',
  'LinkedIn Recruiter',
  'Checkr (background checks)',
  'DocuSign',
  'BambooHR',
  'Slack'],

  workflow: [
  'Job posting',
  'Source candidates',
  'Resume screening',
  'Interview scheduling',
  'Feedback coordination',
  'Offer extension',
  'Onboarding',
  '30/60/90-day check-ins'],

  staffing: '1 HR specialist per 15 AI agents',
  smeKnowledge: [
  'Employment law by jurisdiction',
  'Culture fit criteria',
  'Compensation benchmarking data',
  'DEI guidelines and practices',
  'Onboarding best practices'],

  behavioralData: [
  'Hire quality scores',
  'Time-to-fill by role',
  'Offer acceptance rates',
  'Retention data at 90 days',
  'Source-of-hire effectiveness'],

  kpis: [
  'Time to hire (days)',
  'Quality of hire score',
  'Offer acceptance rate (%)',
  'Retention at 90 days (%)',
  'Cost per hire']

},
{
  id: 'finance',
  name: 'Finance Agent',
  icon: DollarSignIcon,
  color: 'teal',
  tools: [
  'QuickBooks / Xero',
  'Stripe',
  'Expensify',
  'Carta',
  'Forecasting tools',
  'Compliance checkers'],

  workflow: [
  'Transaction capture',
  'Categorization',
  'Reconciliation',
  'Report generation',
  'Cash flow forecasting',
  'Anomaly alert',
  'Compliance check',
  'Investor reporting'],

  staffing: '1 controller per 10 AI agents',
  smeKnowledge: [
  'GAAP accounting standards',
  'Tax compliance by jurisdiction',
  'Cash flow management principles',
  'Investor reporting requirements',
  'Fraud detection patterns'],

  behavioralData: [
  'Transaction patterns',
  'Budget variance history',
  'Fraud indicators',
  'Payment timing trends',
  'Forecast accuracy scores'],

  kpis: [
  'Reconciliation accuracy (%)',
  'Report turnaround time',
  'Forecast accuracy (%)',
  'Compliance score',
  'Anomalies detected per month']

},
{
  id: 'beacon',
  name: 'Beacon / Field Agent',
  icon: WifiIcon,
  color: 'orange',
  tools: [
  'BLE beacon hardware APIs',
  'Geofencing platforms',
  'Safety monitoring systems',
  'OSHA compliance tools',
  'Real-time location systems (RTLS)'],

  workflow: [
  'Worker check-in via beacon tap',
  'Location verified',
  'Task assigned by AI',
  'Progress monitored',
  'Automated safety check',
  'Completion logged',
  'Sign-off',
  'Shift report generated'],

  staffing: '1 field supervisor per 30 beacon-equipped workers',
  smeKnowledge: [
  'OSHA regulations and standards',
  'Field safety protocols',
  'Emergency response procedures',
  'Labor compliance requirements',
  'Zone-based task management'],

  behavioralData: [
  'Worker movement patterns',
  'Task completion times',
  'Safety incident history',
  'Zone dwell times',
  'Check-in compliance rates'],

  kpis: [
  'Check-in compliance (%)',
  'Task completion rate (%)',
  'Safety incidents per shift',
  'Response time to alerts (seconds)',
  'Zone coverage efficiency']

}];

const colorMap: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
    tab: string;
  }> =
{
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    tab: 'bg-blue-600'
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    tab: 'bg-emerald-600'
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    tab: 'bg-purple-600'
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    tab: 'bg-amber-600'
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    tab: 'bg-pink-600'
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30',
    text: 'text-teal-400',
    tab: 'bg-teal-600'
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    tab: 'bg-orange-600'
  }
};
export function ScreenAgentResearch() {
  const [activeAgent, setActiveAgent] = useState('sales');
  const agent = agents.find((a) => a.id === activeAgent)!;
  const colors = colorMap[agent.color];
  const Icon = agent.icon;
  return (
    <div className="h-full overflow-y-auto bg-gray-900">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4 border-b border-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Agent Research Hub
        </h2>
        <p className="text-gray-400 text-sm">
          Tools, workflows, staffing, and knowledge for each AI agent type. All
          new agents are pre-loaded with SME knowledge and behavioral data.
        </p>
      </div>

      {/* Agent Tabs — horizontal scroll on mobile */}
      <div className="flex gap-2 px-4 sm:px-6 py-4 overflow-x-auto border-b border-gray-800 scrollbar-hide">
        {agents.map((a) => {
          const AIcon = a.icon;
          const isActive = activeAgent === a.id;
          const c = colorMap[a.color];
          return (
            <button
              key={a.id}
              onClick={() => setActiveAgent(a.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${isActive ? `${c.tab} text-white` : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>

              <AIcon className="w-3.5 h-3.5" />
              {a.name}
            </button>);

        })}
      </div>

      {/* Agent Detail */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Agent Header */}
        <div className={`${colors.bg} border ${colors.border} rounded-2xl p-5`}>
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center`}>

              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${colors.text}`}>
                {agent.name}
              </h3>
              <p className="text-gray-400 text-sm mt-0.5">{agent.staffing}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tools */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 text-gray-400" />
              <h4 className="text-white font-semibold">Tools & Integrations</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.tools.map((tool) =>
              <span
                key={tool}
                className="bg-gray-700 text-gray-300 text-xs px-2.5 py-1.5 rounded-lg">

                  {tool}
                </span>
              )}
            </div>
          </div>

          {/* KPIs */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3Icon className="w-4 h-4 text-gray-400" />
              <h4 className="text-white font-semibold">
                Key Performance Indicators
              </h4>
            </div>
            <ul className="space-y-2">
              {agent.kpis.map((kpi) =>
              <li key={kpi} className="flex items-center gap-2.5">
                  <div
                  className={`w-1.5 h-1.5 rounded-full ${colors.text.replace('text-', 'bg-')}`} />

                  <span className="text-gray-300 text-sm">{kpi}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Workflow */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ZapIcon className="w-4 h-4 text-gray-400" />
              <h4 className="text-white font-semibold">Workflow Steps</h4>
            </div>
            <div className="space-y-2">
              {agent.workflow.map((step, i) =>
              <div key={i} className="flex items-center gap-3">
                  <div
                  className={`w-6 h-6 rounded-full ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>

                    <span className={`text-xs font-bold ${colors.text}`}>
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-gray-300 text-sm">{step}</span>
                </div>
              )}
            </div>
          </div>

          {/* SME Knowledge + Behavioral Data */}
          <div className="space-y-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BookOpenIcon className="w-4 h-4 text-gray-400" />
                <h4 className="text-white font-semibold">SME Knowledge Base</h4>
              </div>
              <ul className="space-y-2">
                {agent.smeKnowledge.map((item) =>
                <li key={item} className="flex items-start gap-2.5">
                    <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.text.replace('text-', 'bg-')}`} />

                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3Icon className="w-4 h-4 text-gray-400" />
                <h4 className="text-white font-semibold">
                  Behavioral Data Sources
                </h4>
              </div>
              <ul className="space-y-2">
                {agent.behavioralData.map((item) =>
                <li key={item} className="flex items-start gap-2.5">
                    <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${colors.text.replace('text-', 'bg-')}`} />

                    <span className="text-gray-300 text-sm">{item}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Default for all new agents */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-5">
          <h4 className="text-white font-semibold mb-3">
            Default Configuration for All New Agents
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Pre-loaded with SME knowledge base for their domain
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Behavioral data from similar agents pre-loaded
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Standard escalation protocols configured
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Performance benchmarks from industry data
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Continuous learning from every interaction
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                Human oversight controls and override capabilities
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}