import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  BuildingIcon,
  ActivityIcon,
  TrendingUpIcon,
  ZapIcon } from
'lucide-react';
type IndustryKey =
'warehousing' |
'trades' |
'logistics' |
'construction' |
'medical' |
'financial';
interface OrgNode {
  role: string;
  name: string;
  title: string;
  color: string;
  type: 'executive' | 'employee';
  reports?: OrgNode[];
}
interface OrgStructure {
  name: string;
  icon: React.ElementType;
  color: string;
  ceo: OrgNode;
}
const orgStructures: Record<IndustryKey, OrgStructure> = {
  warehousing: {
    name: 'Warehousing & Distribution',
    icon: PackageIcon,
    color: 'from-indigo-500 to-indigo-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'WM',
          name: 'Atlas',
          title: 'Warehouse Manager AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'DSP',
          name: 'Nova',
          title: 'Dispatcher AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'RCV',
          name: 'Echo',
          title: 'Receiving Lead AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CFO',
        name: 'Felix',
        title: 'Financial Intelligence AI',
        color: 'from-blue-400 to-blue-600',
        type: 'executive',
        reports: [
        {
          role: 'INV',
          name: 'Clio',
          title: 'Inventory Analyst AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        },
        {
          role: 'AP',
          name: 'Finn',
          title: 'Finance Analyst AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'SAF',
          name: 'Rex',
          title: 'Safety Officer AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CSO',
        name: 'Sage',
        title: 'Sales Intelligence AI',
        color: 'from-orange-400 to-orange-600',
        type: 'executive',
        reports: [
        {
          role: 'AM',
          name: 'Zara',
          title: 'Account Manager AI',
          color: 'from-orange-600 to-orange-800',
          type: 'employee'
        }]

      },
      {
        role: 'CMO',
        name: 'Maya',
        title: 'Growth Marketing AI',
        color: 'from-pink-400 to-pink-600',
        type: 'executive',
        reports: [
        {
          role: 'MKT',
          name: 'Luna',
          title: 'Marketing Specialist AI',
          color: 'from-pink-600 to-pink-800',
          type: 'employee'
        }]

      },
      {
        role: 'CHRO',
        name: 'Hana',
        title: 'People & Culture AI',
        color: 'from-rose-400 to-rose-600',
        type: 'executive',
        reports: [
        {
          role: 'HR',
          name: 'Iris',
          title: 'HR Coordinator AI',
          color: 'from-rose-600 to-rose-800',
          type: 'employee'
        }]

      }]

    }
  },
  trades: {
    name: 'Trades (HVAC/Plumbing/Electrical)',
    icon: WrenchIcon,
    color: 'from-yellow-500 to-yellow-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'DSP',
          name: 'Nova',
          title: 'Service Dispatcher AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'SCH',
          name: 'Atlas',
          title: 'Scheduler AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CFO',
        name: 'Felix',
        title: 'Financial Intelligence AI',
        color: 'from-blue-400 to-blue-600',
        type: 'executive',
        reports: [
        {
          role: 'EST',
          name: 'Clio',
          title: 'Estimator AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        },
        {
          role: 'INV',
          name: 'Finn',
          title: 'Invoicing AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'LIC',
          name: 'Rex',
          title: 'License Compliance AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CMO',
        name: 'Maya',
        title: 'Growth Marketing AI',
        color: 'from-pink-400 to-pink-600',
        type: 'executive',
        reports: [
        {
          role: 'CX',
          name: 'Luna',
          title: 'Customer Success AI',
          color: 'from-pink-600 to-pink-800',
          type: 'employee'
        }]

      },
      {
        role: 'CSO',
        name: 'Sage',
        title: 'Sales Intelligence AI',
        color: 'from-orange-400 to-orange-600',
        type: 'executive',
        reports: [
        {
          role: 'LDS',
          name: 'Zara',
          title: 'Lead Sales AI',
          color: 'from-orange-600 to-orange-800',
          type: 'employee'
        }]

      }]

    }
  },
  logistics: {
    name: 'Logistics & Freight',
    icon: TruckIcon,
    color: 'from-blue-500 to-blue-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'LDP',
          name: 'Atlas',
          title: 'Load Planner AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'DSP',
          name: 'Nova',
          title: 'Dispatcher AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'FLT',
          name: 'Bolt',
          title: 'Fleet Manager AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CFO',
        name: 'Felix',
        title: 'Financial Intelligence AI',
        color: 'from-blue-400 to-blue-600',
        type: 'executive',
        reports: [
        {
          role: 'FIN',
          name: 'Clio',
          title: 'Fleet Finance AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'DOT',
          name: 'Rex',
          title: 'DOT Compliance AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CSO',
        name: 'Sage',
        title: 'Sales Intelligence AI',
        color: 'from-orange-400 to-orange-600',
        type: 'executive',
        reports: [
        {
          role: 'AM',
          name: 'Zara',
          title: 'Account Manager AI',
          color: 'from-orange-600 to-orange-800',
          type: 'employee'
        }]

      }]

    }
  },
  construction: {
    name: 'Construction & GC',
    icon: BuildingIcon,
    color: 'from-amber-500 to-amber-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'PM',
          name: 'Atlas',
          title: 'Project Manager AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'SUP',
          name: 'Bolt',
          title: 'Site Supervisor AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CFO',
        name: 'Felix',
        title: 'Financial Intelligence AI',
        color: 'from-blue-400 to-blue-600',
        type: 'executive',
        reports: [
        {
          role: 'EST',
          name: 'Clio',
          title: 'Estimator AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        },
        {
          role: 'ACC',
          name: 'Finn',
          title: 'Construction Accountant AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'SAF',
          name: 'Rex',
          title: 'Safety Manager AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CSO',
        name: 'Sage',
        title: 'Sales Intelligence AI',
        color: 'from-orange-400 to-orange-600',
        type: 'executive',
        reports: [
        {
          role: 'BID',
          name: 'Zara',
          title: 'Bid Manager AI',
          color: 'from-orange-600 to-orange-800',
          type: 'employee'
        }]

      }]

    }
  },
  medical: {
    name: 'Medical Practice',
    icon: ActivityIcon,
    color: 'from-rose-500 to-rose-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'SCH',
          name: 'Atlas',
          title: 'Scheduler AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'FRD',
          name: 'Nova',
          title: 'Front Desk AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CFO',
        name: 'Felix',
        title: 'Financial Intelligence AI',
        color: 'from-blue-400 to-blue-600',
        type: 'executive',
        reports: [
        {
          role: 'BIL',
          name: 'Clio',
          title: 'Medical Biller AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        },
        {
          role: 'RCM',
          name: 'Finn',
          title: 'Revenue Cycle AI',
          color: 'from-blue-600 to-blue-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'HIP',
          name: 'Rex',
          title: 'HIPAA Compliance AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CMO',
        name: 'Maya',
        title: 'Growth Marketing AI',
        color: 'from-pink-400 to-pink-600',
        type: 'executive',
        reports: [
        {
          role: 'PX',
          name: 'Luna',
          title: 'Patient Experience AI',
          color: 'from-pink-600 to-pink-800',
          type: 'employee'
        }]

      }]

    }
  },
  financial: {
    name: 'Financial Advisory',
    icon: TrendingUpIcon,
    color: 'from-emerald-500 to-emerald-700',
    ceo: {
      role: 'CEO',
      name: 'Aria',
      title: 'Growth & Leadership AI',
      color: 'from-amber-400 to-amber-600',
      type: 'executive',
      reports: [
      {
        role: 'COO',
        name: 'Orion',
        title: 'Operations Excellence AI',
        color: 'from-green-400 to-green-600',
        type: 'executive',
        reports: [
        {
          role: 'OPS',
          name: 'Atlas',
          title: 'Operations Analyst AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        },
        {
          role: 'RPT',
          name: 'Nova',
          title: 'Reporting Specialist AI',
          color: 'from-green-600 to-green-800',
          type: 'employee'
        }]

      },
      {
        role: 'CLO',
        name: 'Lex',
        title: 'Legal & Compliance AI',
        color: 'from-cyan-400 to-cyan-600',
        type: 'executive',
        reports: [
        {
          role: 'CMP',
          name: 'Rex',
          title: 'Compliance Analyst AI',
          color: 'from-cyan-600 to-cyan-800',
          type: 'employee'
        }]

      },
      {
        role: 'CSO',
        name: 'Sage',
        title: 'Sales Intelligence AI',
        color: 'from-orange-400 to-orange-600',
        type: 'executive',
        reports: [
        {
          role: 'BD',
          name: 'Zara',
          title: 'Business Dev AI',
          color: 'from-orange-600 to-orange-800',
          type: 'employee'
        }]

      },
      {
        role: 'CMO',
        name: 'Maya',
        title: 'Growth Marketing AI',
        color: 'from-pink-400 to-pink-600',
        type: 'executive',
        reports: [
        {
          role: 'MKT',
          name: 'Luna',
          title: 'Content & Marketing AI',
          color: 'from-pink-600 to-pink-800',
          type: 'employee'
        }]

      }]

    }
  }
};
function OrgNode({ node, depth = 0 }: {node: OrgNode;depth?: number;}) {
  const isExec = node.type === 'executive';
  return (
    <div
      className={`flex flex-col items-center ${depth > 0 ? 'relative' : ''}`}>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          delay: depth * 0.08
        }}
        className={`flex flex-col items-center gap-1 ${isExec ? 'w-20' : 'w-16'}`}>

        <div
          className={`${isExec ? 'w-14 h-14' : 'w-11 h-11'} bg-gradient-to-br ${node.color} rounded-xl flex items-center justify-center shadow-lg border-2 ${isExec ? 'border-white/20' : 'border-white/10'}`}>

          <span
            className={`text-white font-black ${isExec ? 'text-sm' : 'text-xs'}`}>

            {node.role.slice(0, 3)}
          </span>
        </div>
        <div className="text-center">
          <p
            className={`font-black text-white leading-none ${isExec ? 'text-xs' : 'text-[10px]'}`}>

            {node.role}
          </p>
          <p
            className={`text-slate-500 leading-none mt-0.5 ${isExec ? 'text-[10px]' : 'text-[9px]'}`}>

            {node.name}
          </p>
        </div>
      </motion.div>
    </div>);

}
const industryKeys: IndustryKey[] = [
'warehousing',
'trades',
'logistics',
'construction',
'medical',
'financial'];

export function ScreenOrgChart() {
  const [selectedIndustry, setSelectedIndustry] =
  useState<IndustryKey>('warehousing');
  const org = orgStructures[selectedIndustry];
  const totalPositions =
  1 + (
  org.ceo.reports?.length || 0) + (
  org.ceo.reports?.reduce((s, r) => s + (r.reports?.length || 0), 0) || 0);
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-white">AI Org Chart</h2>
        <p className="text-sm text-slate-400">
          Complete AI-staffed organization · Every position filled
        </p>
      </div>

      {/* Industry selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {industryKeys.map((key) => {
          const ind = orgStructures[key];
          const Icon = ind.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedIndustry(key)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${selectedIndustry === key ? `bg-gradient-to-br ${ind.color} border-transparent text-white` : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'}`}>

              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-bold leading-tight">
                {ind.name}
              </span>
            </button>);

        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-orange-400">{totalPositions}</p>
          <p className="text-xs text-slate-500">AI Positions</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-green-400">3</p>
          <p className="text-xs text-slate-500">Tiers</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-blue-400">$0</p>
          <p className="text-xs text-slate-500">Salaries</p>
        </div>
      </div>

      {/* Org chart */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIndustry}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.25
          }}
          className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 overflow-x-auto">

          {/* Legend */}
          <div className="flex items-center gap-4 mb-5 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded" />
              <span className="text-xs text-slate-400">
                AI Leadership (C-Suite)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 bg-gradient-to-br from-green-600 to-green-800 rounded" />
              <span className="text-xs text-slate-400">AI Employees</span>
            </div>
          </div>

          {/* Chart — scrollable inner container */}
          <div className="min-w-max mx-auto">
            {/* CEO tier */}
            <div className="flex flex-col items-center">
              <OrgNode node={org.ceo} depth={0} />

              {/* Vertical line down from CEO */}
              <div className="w-px h-5 bg-slate-700" />

              {/* Horizontal spanning line */}
              <div className="h-px bg-slate-700 w-full" />

              {/* C-Suite tier — nowrap so tree never collapses */}
              <div className="flex items-start justify-center gap-4 flex-nowrap">
                {org.ceo.reports?.map((exec) =>
                <div key={exec.role} className="flex flex-col items-center">
                    {/* Vertical line up to horizontal bar */}
                    <div className="w-px h-5 bg-slate-700" />

                    <OrgNode node={exec} depth={1} />

                    {/* Reports */}
                    {exec.reports && exec.reports.length > 0 &&
                  <>
                        <div className="w-px h-4 bg-slate-700 mt-1" />
                        {/* Mini horizontal connector for multiple reports */}
                        {exec.reports.length > 1 &&
                    <div className="h-px bg-slate-700 w-full" />
                    }
                        <div className="flex items-start gap-2 flex-nowrap">
                          {exec.reports.map((emp) =>
                      <div
                        key={emp.role}
                        className="flex flex-col items-center">

                              <div className="w-px h-4 bg-slate-700" />
                              <OrgNode node={emp} depth={2} />
                            </div>
                      )}
                        </div>
                      </>
                  }
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All AI — callout */}
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <ZapIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white mb-1">
              100% AI-Staffed Organization
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Catapult Company provides both AI leadership (C-Suite) and AI
              employees for every department. From the CEO down to the
              front-line worker — every position is filled by a specialized AI
              agent trained on your industry's workflows, compliance
              requirements, and success metrics.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="text-center bg-slate-800/50 rounded-xl p-2">
            <p className="text-sm font-black text-orange-400">Tier 1</p>
            <p className="text-xs text-slate-500">CEO</p>
          </div>
          <div className="text-center bg-slate-800/50 rounded-xl p-2">
            <p className="text-sm font-black text-blue-400">Tier 2</p>
            <p className="text-xs text-slate-500">C-Suite</p>
          </div>
          <div className="text-center bg-slate-800/50 rounded-xl p-2">
            <p className="text-sm font-black text-green-400">Tier 3</p>
            <p className="text-xs text-slate-500">AI Employees</p>
          </div>
        </div>
      </div>
    </div>);

}