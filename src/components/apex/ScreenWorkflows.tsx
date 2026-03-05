import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  BuildingIcon,
  ActivityIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  BotIcon,
  ChevronDownIcon,
  ZapIcon,
  ClockIcon,
  DollarSignIcon } from
'lucide-react';
type IndustryKey =
'warehousing' |
'trades' |
'logistics' |
'construction' |
'medical' |
'financial';
interface WorkflowRole {
  title: string;
  humanCost: string;
  timeSaved: string;
  agent: string;
  agentRole: string;
  agentColor: string;
  agentBg: string;
  agentText: string;
  tasks: string[];
  status: 'active' | 'available' | 'coming-soon';
}
interface IndustryWorkflow {
  name: string;
  icon: React.ElementType;
  color: string;
  roles: WorkflowRole[];
}
const workflows: Record<IndustryKey, IndustryWorkflow> = {
  warehousing: {
    name: 'Warehousing & Distribution',
    icon: PackageIcon,
    color: 'from-indigo-500 to-indigo-700',
    roles: [
    {
      title: 'Warehouse Manager',
      humanCost: '$75K/yr',
      timeSaved: '40 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Dock scheduling & cross-docking',
      'Labor planning & shift management',
      'KPI tracking & reporting',
      'Inbound/outbound coordination'],

      status: 'active'
    },
    {
      title: 'Inventory Analyst',
      humanCost: '$55K/yr',
      timeSaved: '25 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Cycle count management',
      'Shrinkage & loss tracking',
      'Demand forecasting',
      'Safety stock optimization'],

      status: 'active'
    },
    {
      title: 'Dispatcher',
      humanCost: '$52K/yr',
      timeSaved: '35 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Crew routing & assignments',
      'Real-time rerouting',
      'Shipment tracking',
      'Carrier coordination'],

      status: 'active'
    },
    {
      title: 'Finance Manager',
      humanCost: '$85K/yr',
      timeSaved: '30 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Invoice processing & AP/AR',
      'Cash flow management',
      'Vendor payment scheduling',
      'Budget variance reporting'],

      status: 'active'
    },
    {
      title: 'Safety & Compliance Officer',
      humanCost: '$70K/yr',
      timeSaved: '20 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'OSHA compliance monitoring',
      'Incident reporting & tracking',
      'Safety checklist automation',
      'Regulatory filing management'],

      status: 'active'
    },
    {
      title: 'HR & Payroll Coordinator',
      humanCost: '$58K/yr',
      timeSaved: '22 hrs/wk',
      agent: 'Hana',
      agentRole: 'CHRO',
      agentColor: 'from-rose-400 to-rose-600',
      agentBg: 'bg-rose-500/20',
      agentText: 'text-rose-400',
      tasks: [
      'Employee scheduling',
      'Payroll processing',
      'Onboarding new hires',
      'Benefits administration'],

      status: 'available'
    },
    {
      title: 'Sales & Business Development',
      humanCost: '$90K/yr',
      timeSaved: '28 hrs/wk',
      agent: 'Sage',
      agentRole: 'CSO',
      agentColor: 'from-orange-400 to-orange-600',
      agentBg: 'bg-orange-500/20',
      agentText: 'text-orange-400',
      tasks: [
      'Client acquisition outreach',
      'Contract renewals',
      'At-risk account retention',
      'Pipeline management'],

      status: 'active'
    },
    {
      title: 'Marketing Manager',
      humanCost: '$72K/yr',
      timeSaved: '18 hrs/wk',
      agent: 'Maya',
      agentRole: 'CMO',
      agentColor: 'from-pink-400 to-pink-600',
      agentBg: 'bg-pink-500/20',
      agentText: 'text-pink-400',
      tasks: [
      'Digital marketing campaigns',
      'Brand management',
      'Lead generation',
      'Content & SEO strategy'],

      status: 'active'
    }]

  },
  trades: {
    name: 'Trades (HVAC/Plumbing/Electrical)',
    icon: WrenchIcon,
    color: 'from-yellow-500 to-yellow-700',
    roles: [
    {
      title: 'Service Dispatcher',
      humanCost: '$48K/yr',
      timeSaved: '38 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Technician routing & scheduling',
      'Job priority management',
      'Parts availability checks',
      'Customer ETA notifications'],

      status: 'active'
    },
    {
      title: 'Office Manager / Estimator',
      humanCost: '$55K/yr',
      timeSaved: '30 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Quote generation & follow-up',
      'Invoice processing',
      'Job costing & profitability',
      'Accounts receivable'],

      status: 'active'
    },
    {
      title: 'Compliance & Licensing',
      humanCost: '$45K/yr',
      timeSaved: '15 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'License renewal tracking',
      'Permit management',
      'OSHA/NEC/UPC compliance',
      'Insurance certificate management'],

      status: 'active'
    },
    {
      title: 'Customer Success Manager',
      humanCost: '$52K/yr',
      timeSaved: '25 hrs/wk',
      agent: 'Maya',
      agentRole: 'CMO',
      agentColor: 'from-pink-400 to-pink-600',
      agentBg: 'bg-pink-500/20',
      agentText: 'text-pink-400',
      tasks: [
      'Review & reputation management',
      'Service agreement renewals',
      'Customer follow-up sequences',
      'Referral program management'],

      status: 'active'
    },
    {
      title: 'Sales & Lead Management',
      humanCost: '$65K/yr',
      timeSaved: '22 hrs/wk',
      agent: 'Sage',
      agentRole: 'CSO',
      agentColor: 'from-orange-400 to-orange-600',
      agentBg: 'bg-orange-500/20',
      agentText: 'text-orange-400',
      tasks: [
      'Inbound lead qualification',
      'Commercial bid management',
      'Maintenance contract sales',
      'Upsell & cross-sell campaigns'],

      status: 'active'
    }]

  },
  logistics: {
    name: 'Logistics & Freight',
    icon: TruckIcon,
    color: 'from-blue-500 to-blue-700',
    roles: [
    {
      title: 'Load Planner / Dispatcher',
      humanCost: '$58K/yr',
      timeSaved: '40 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Load board management',
      'Route optimization',
      'Driver HOS compliance',
      'Freight matching & brokering'],

      status: 'active'
    },
    {
      title: 'Fleet Finance Manager',
      humanCost: '$72K/yr',
      timeSaved: '28 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Fuel cost tracking & optimization',
      'Customer invoicing & collections',
      'Driver pay & settlements',
      'Maintenance cost analysis'],

      status: 'active'
    },
    {
      title: 'DOT Compliance Officer',
      humanCost: '$62K/yr',
      timeSaved: '20 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'DOT compliance monitoring',
      'Driver qualification files',
      'Safety score management',
      'Audit preparation'],

      status: 'active'
    },
    {
      title: 'Customer Account Manager',
      humanCost: '$68K/yr',
      timeSaved: '25 hrs/wk',
      agent: 'Sage',
      agentRole: 'CSO',
      agentColor: 'from-orange-400 to-orange-600',
      agentBg: 'bg-orange-500/20',
      agentText: 'text-orange-400',
      tasks: [
      'Shipper relationship management',
      'Rate negotiations',
      'Spot market pricing',
      'Contract renewals'],

      status: 'active'
    }]

  },
  construction: {
    name: 'Construction & GC',
    icon: BuildingIcon,
    color: 'from-amber-500 to-amber-700',
    roles: [
    {
      title: 'Project Manager',
      humanCost: '$95K/yr',
      timeSaved: '35 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Project scheduling & milestones',
      'Subcontractor coordination',
      'Daily progress reporting',
      'Change order management'],

      status: 'active'
    },
    {
      title: 'Estimator / Bid Manager',
      humanCost: '$80K/yr',
      timeSaved: '30 hrs/wk',
      agent: 'Aria',
      agentRole: 'CEO',
      agentColor: 'from-amber-400 to-amber-600',
      agentBg: 'bg-amber-500/20',
      agentText: 'text-amber-400',
      tasks: [
      'Bid preparation & submission',
      'Win/loss analysis',
      'Competitive pricing strategy',
      'Scope of work documentation'],

      status: 'active'
    },
    {
      title: 'Construction Accountant',
      humanCost: '$70K/yr',
      timeSaved: '28 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Job cost tracking',
      'Subcontractor payments',
      'Lien waiver management',
      'Budget vs. actual reporting'],

      status: 'active'
    },
    {
      title: 'Safety Manager',
      humanCost: '$75K/yr',
      timeSaved: '22 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'OSHA compliance monitoring',
      'Toolbox talk scheduling',
      'Incident reporting',
      'Safety training tracking'],

      status: 'active'
    }]

  },
  medical: {
    name: 'Medical Practice',
    icon: ActivityIcon,
    color: 'from-rose-500 to-rose-700',
    roles: [
    {
      title: 'Practice Manager',
      humanCost: '$72K/yr',
      timeSaved: '32 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Patient scheduling optimization',
      'Provider utilization tracking',
      'Appointment reminder sequences',
      'No-show management'],

      status: 'active'
    },
    {
      title: 'Medical Biller / Coder',
      humanCost: '$55K/yr',
      timeSaved: '38 hrs/wk',
      agent: 'Felix',
      agentRole: 'CFO',
      agentColor: 'from-blue-400 to-blue-600',
      agentBg: 'bg-blue-500/20',
      agentText: 'text-blue-400',
      tasks: [
      'Insurance billing & coding',
      'Claims submission & follow-up',
      'Denial management',
      'Revenue cycle optimization'],

      status: 'active'
    },
    {
      title: 'Compliance Officer',
      humanCost: '$68K/yr',
      timeSaved: '20 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'HIPAA compliance monitoring',
      'Provider credentialing',
      'Audit readiness',
      'Policy & procedure updates'],

      status: 'active'
    },
    {
      title: 'Patient Experience Manager',
      humanCost: '$52K/yr',
      timeSaved: '18 hrs/wk',
      agent: 'Maya',
      agentRole: 'CMO',
      agentColor: 'from-pink-400 to-pink-600',
      agentBg: 'bg-pink-500/20',
      agentText: 'text-pink-400',
      tasks: [
      'Review management & responses',
      'Patient satisfaction surveys',
      'Recall campaign automation',
      'Referral program management'],

      status: 'active'
    }]

  },
  financial: {
    name: 'Financial Advisory',
    icon: TrendingUpIcon,
    color: 'from-emerald-500 to-emerald-700',
    roles: [
    {
      title: 'Operations Manager',
      humanCost: '$85K/yr',
      timeSaved: '30 hrs/wk',
      agent: 'Orion',
      agentRole: 'COO',
      agentColor: 'from-green-400 to-green-600',
      agentBg: 'bg-green-500/20',
      agentText: 'text-green-400',
      tasks: [
      'Client reporting automation',
      'Meeting scheduling & prep',
      'Portfolio rebalancing alerts',
      'CRM workflow management'],

      status: 'active'
    },
    {
      title: 'Compliance Analyst',
      humanCost: '$78K/yr',
      timeSaved: '25 hrs/wk',
      agent: 'Lex',
      agentRole: 'CLO',
      agentColor: 'from-cyan-400 to-cyan-600',
      agentBg: 'bg-cyan-500/20',
      agentText: 'text-cyan-400',
      tasks: [
      'SEC/FINRA monitoring',
      'ADV filing management',
      'Suitability documentation',
      'Regulatory change tracking'],

      status: 'active'
    },
    {
      title: 'Business Development',
      humanCost: '$95K/yr',
      timeSaved: '28 hrs/wk',
      agent: 'Sage',
      agentRole: 'CSO',
      agentColor: 'from-orange-400 to-orange-600',
      agentBg: 'bg-orange-500/20',
      agentText: 'text-orange-400',
      tasks: [
      'Prospect pipeline management',
      'Referral partner outreach',
      'Seminar & event coordination',
      'AUM growth tracking'],

      status: 'active'
    },
    {
      title: 'Marketing & Content',
      humanCost: '$65K/yr',
      timeSaved: '20 hrs/wk',
      agent: 'Maya',
      agentRole: 'CMO',
      agentColor: 'from-pink-400 to-pink-600',
      agentBg: 'bg-pink-500/20',
      agentText: 'text-pink-400',
      tasks: [
      'Thought leadership content',
      'Email newsletter campaigns',
      'Social media management',
      'Webinar coordination'],

      status: 'active'
    }]

  }
};
const industryKeys: IndustryKey[] = [
'warehousing',
'trades',
'logistics',
'construction',
'medical',
'financial'];

export function ScreenWorkflows() {
  const [selectedIndustry, setSelectedIndustry] =
  useState<IndustryKey>('warehousing');
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const industry = workflows[selectedIndustry];
  const totalSavings = industry.roles.reduce((sum, r) => {
    const cost = parseInt(r.humanCost.replace(/\D/g, ''));
    return sum + cost;
  }, 0);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-white">
          AI Workforce Workflows
        </h2>
        <p className="text-sm text-slate-400">
          Every job position replaced by AI agents · Full org coverage
        </p>
      </div>

      {/* Industry selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {industryKeys.map((key) => {
          const ind = workflows[key];
          const Icon = ind.icon;
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedIndustry(key);
                setExpandedRole(null);
              }}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${selectedIndustry === key ? `bg-gradient-to-br ${ind.color} border-transparent text-white` : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'}`}>

              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-bold leading-tight">
                {ind.name}
              </span>
            </button>);

        })}
      </div>

      {/* Summary stats */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndustry}
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
          }}>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
              <p className="text-xl font-black text-orange-400">
                {industry.roles.length}
              </p>
              <p className="text-xs text-slate-500">Positions Covered</p>
            </div>
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
              <p className="text-xl font-black text-green-400">
                ${(totalSavings / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-slate-500">Annual Savings</p>
            </div>
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
              <p className="text-xl font-black text-blue-400">24/7</p>
              <p className="text-xs text-slate-500">Coverage</p>
            </div>
          </div>

          {/* Role cards */}
          <div className="space-y-2">
            {industry.roles.map((role, i) => {
              const isExpanded = expandedRole === role.title;
              return (
                <motion.div
                  key={role.title}
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: i * 0.05
                  }}
                  className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

                  <button
                    onClick={() =>
                    setExpandedRole(isExpanded ? null : role.title)
                    }
                    className="w-full flex items-center gap-3 p-4 text-left">

                    {/* Agent avatar */}
                    <div
                      className={`w-10 h-10 bg-gradient-to-br ${role.agentColor} rounded-xl flex items-center justify-center flex-shrink-0`}>

                      <span className="text-white font-black text-sm">
                        {role.agentRole[0]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-white truncate">
                          {role.title}
                        </p>
                        <span
                          className={`text-xs font-black px-1.5 py-0.5 rounded-lg ${role.agentBg} ${role.agentText} flex-shrink-0`}>

                          {role.agentRole}
                        </span>
                        {role.status === 'active' &&
                        <span className="flex-shrink-0 w-1.5 h-1.5 bg-green-400 rounded-full" />
                        }
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <DollarSignIcon className="w-3 h-3" />
                          Saves {role.humanCost}
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          {role.timeSaved}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${role.status === 'active' ? 'bg-green-500/20 text-green-400' : role.status === 'available' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700 text-slate-500'}`}>

                        {role.status === 'active' ?
                        'AI Active' :
                        role.status === 'available' ?
                        'Available' :
                        'Soon'}
                      </span>
                      <ChevronDownIcon
                        className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />

                    </div>
                  </button>

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

                        <div className="px-4 pb-4 border-t border-slate-800">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-3 mb-2">
                            Tasks handled by {role.agent} ({role.agentRole})
                          </p>
                          <div className="space-y-1.5">
                            {role.tasks.map((task, ti) =>
                          <div
                            key={ti}
                            className="flex items-center gap-2 text-xs text-slate-300">

                                <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                {task}
                              </div>
                          )}
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <BotIcon className="w-3.5 h-3.5 text-orange-400" />
                            <p className="text-xs text-orange-400 font-semibold">
                              Fully automated · No human required · 24/7
                              coverage
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    }
                  </AnimatePresence>
                </motion.div>);

            })}
          </div>

          {/* Bottom CTA */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mt-4">
            <div className="flex items-center gap-3">
              <ZapIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-white">
                  Replace your entire {industry.name} team with AI
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Save ${(totalSavings / 1000).toFixed(0)}K/year · Deploy in
                  under 2 minutes · No training required
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}