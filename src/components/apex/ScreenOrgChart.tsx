import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZapIcon, XCircleIcon, PlusCircleIcon, CheckCircleIcon, BuildingIcon } from 'lucide-react';
import { localAgentStore, subscribeAgentStore } from '../../lib/localAgentStore';

interface CompanySetup {
  companyName?: string; industry?: string; teamSize?: string;
  executives?: string[]; allRoles?: string[];
  approvalLimit?: string; integrations?: string[];
}
interface WorkerNode { role: string; name: string; title: string; workerColor: string; }

const WORKERS: Record<string, Record<string, WorkerNode[]>> = {
  coo: {
    warehousing:  [{role:'WM', name:'Atlas',title:'Warehouse Mgr AI', workerColor:'from-green-500 to-green-700'},{role:'DSP',name:'Nova', title:'Dispatcher AI',    workerColor:'from-green-500 to-green-700'},{role:'RCV',name:'Echo',title:'Receiving AI',    workerColor:'from-green-500 to-green-700'}],
    trades:       [{role:'DSP',name:'Nova', title:'Dispatcher AI',    workerColor:'from-green-500 to-green-700'},{role:'SCH',name:'Atlas',title:'Scheduler AI',     workerColor:'from-green-500 to-green-700'}],
    logistics:    [{role:'LDP',name:'Atlas',title:'Load Planner AI',  workerColor:'from-green-500 to-green-700'},{role:'DSP',name:'Nova', title:'Dispatcher AI',    workerColor:'from-green-500 to-green-700'},{role:'FLT',name:'Bolt',title:'Fleet Mgr AI',    workerColor:'from-green-500 to-green-700'}],
    construction: [{role:'PM', name:'Atlas',title:'Project Mgr AI',   workerColor:'from-green-500 to-green-700'},{role:'SUP',name:'Bolt', title:'Site Super AI',    workerColor:'from-green-500 to-green-700'}],
    medical:      [{role:'SCH',name:'Atlas',title:'Scheduler AI',     workerColor:'from-green-500 to-green-700'},{role:'FRD',name:'Nova', title:'Front Desk AI',    workerColor:'from-green-500 to-green-700'}],
    financial:    [{role:'OPS',name:'Atlas',title:'Operations AI',    workerColor:'from-green-500 to-green-700'},{role:'RPT',name:'Nova', title:'Reporting AI',     workerColor:'from-green-500 to-green-700'}],
    default:      [{role:'OPS',name:'Atlas',title:'Operations AI',    workerColor:'from-green-500 to-green-700'}],
  },
  cfo: {
    warehousing:  [{role:'INV',name:'Clio',title:'Inventory AI',      workerColor:'from-blue-500 to-blue-700'},{role:'AP', name:'Finn',title:'Finance AI',          workerColor:'from-blue-500 to-blue-700'}],
    trades:       [{role:'EST',name:'Clio',title:'Estimator AI',      workerColor:'from-blue-500 to-blue-700'},{role:'INV',name:'Finn',title:'Invoicing AI',         workerColor:'from-blue-500 to-blue-700'}],
    logistics:    [{role:'FIN',name:'Clio',title:'Fleet Finance AI',  workerColor:'from-blue-500 to-blue-700'}],
    construction: [{role:'EST',name:'Clio',title:'Estimator AI',      workerColor:'from-blue-500 to-blue-700'},{role:'ACC',name:'Finn',title:'Accountant AI',        workerColor:'from-blue-500 to-blue-700'}],
    medical:      [{role:'BIL',name:'Clio',title:'Biller AI',         workerColor:'from-blue-500 to-blue-700'},{role:'RCM',name:'Finn',title:'Revenue Cycle AI',     workerColor:'from-blue-500 to-blue-700'}],
    financial:    [{role:'ANL',name:'Clio',title:'Analyst AI',        workerColor:'from-blue-500 to-blue-700'}],
    default:      [{role:'FIN',name:'Clio',title:'Finance AI',        workerColor:'from-blue-500 to-blue-700'}],
  },
  clo: {
    warehousing:  [{role:'SAF',name:'Lex',title:'Safety Officer AI',  workerColor:'from-cyan-500 to-cyan-700'}],
    trades:       [{role:'LIC',name:'Lex',title:'License Compliance', workerColor:'from-cyan-500 to-cyan-700'}],
    logistics:    [{role:'DOT',name:'Lex',title:'DOT Compliance AI',  workerColor:'from-cyan-500 to-cyan-700'}],
    construction: [{role:'SAF',name:'Lex',title:'Safety Mgr AI',      workerColor:'from-cyan-500 to-cyan-700'}],
    medical:      [{role:'HIP',name:'Lex',title:'HIPAA Compliance',   workerColor:'from-cyan-500 to-cyan-700'}],
    financial:    [{role:'CMP',name:'Lex',title:'Compliance AI',      workerColor:'from-cyan-500 to-cyan-700'}],
    default:      [{role:'CMP',name:'Lex',title:'Compliance AI',      workerColor:'from-cyan-500 to-cyan-700'}],
  },
  cmo:  {default:[{role:'MKT',name:'Luna',  title:'Marketing AI',      workerColor:'from-pink-500 to-pink-700'    }],trades:[{role:'CX', name:'Luna',  title:'Customer Success AI',workerColor:'from-pink-500 to-pink-700'    }],medical:[{role:'PX',name:'Luna', title:'Patient Exp AI',workerColor:'from-pink-500 to-pink-700'    }],technology:[{role:'PLG',name:'Luna',title:'PLG Marketer AI',workerColor:'from-pink-500 to-pink-700'}]},
  cso:  {default:[{role:'AM', name:'Sage',  title:'Account Mgr AI',    workerColor:'from-orange-500 to-orange-700'}],trades:[{role:'LDS',name:'Sage',  title:'Lead Sales AI',      workerColor:'from-orange-500 to-orange-700'}],construction:[{role:'BID',name:'Sage',title:'Bid Mgr AI',workerColor:'from-orange-500 to-orange-700'}],technology:[{role:'AE',name:'Sage',title:'Account Exec AI',workerColor:'from-orange-500 to-orange-700'},{role:'SDR',name:'Rex',title:'SDR AI',workerColor:'from-orange-500 to-orange-700'}]},
  chro: {default:[{role:'HR', name:'Hana',  title:'HR Coordinator AI', workerColor:'from-rose-500 to-rose-700'    }],technology:[{role:'RCR',name:'Hana',title:'Tech Recruiter AI',  workerColor:'from-rose-500 to-rose-700'    }]},
  cto:  {default:[{role:'DEV',name:'Theo',  title:'Lead Developer AI', workerColor:'from-purple-500 to-purple-700'}],technology:[{role:'ENG',name:'Theo',title:'Eng Lead AI',workerColor:'from-purple-500 to-purple-700'},{role:'QA',name:'Bolt',title:'QA Automation AI',workerColor:'from-purple-500 to-purple-700'},{role:'DEV',name:'Echo',title:'Full-Stack AI',workerColor:'from-purple-500 to-purple-700'}]},
  cro:  {default:[{role:'REV',name:'Rex',   title:'Revenue Ops AI',    workerColor:'from-red-500 to-red-700'      }],technology:[{role:'ROP',name:'Rex',title:'RevOps AI',workerColor:'from-red-500 to-red-700'},{role:'CS', name:'Cleo',title:'Customer Success AI',workerColor:'from-red-500 to-red-700'}]},
  cpo:  {default:[{role:'PM', name:'Nova',  title:'Product Mgr AI',    workerColor:'from-violet-500 to-violet-700'}],technology:[{role:'PM', name:'Nova',title:'Product Mgr AI',workerColor:'from-violet-500 to-violet-700'},{role:'UX', name:'Iris',title:'UX Designer AI',workerColor:'from-violet-500 to-violet-700'},{role:'BA', name:'Bolt',title:'Business Analyst AI',workerColor:'from-violet-500 to-violet-700'}]},
  cdo:  {default:[{role:'DA', name:'Iris',  title:'Data Analyst AI',   workerColor:'from-sky-500 to-sky-700'      }],technology:[{role:'DA', name:'Iris',title:'Data Analyst AI',workerColor:'from-sky-500 to-sky-700'},{role:'ML', name:'Nova',title:'ML Eng AI',workerColor:'from-sky-500 to-sky-700'}]},
  cco:  {default:[{role:'CX', name:'Cleo',  title:'CX Specialist AI',  workerColor:'from-teal-500 to-emerald-700' }],technology:[{role:'CSM',name:'Cleo',title:'CS Manager AI',workerColor:'from-teal-500 to-emerald-700'},{role:'SUP',name:'Echo',title:'Support AI',workerColor:'from-teal-500 to-emerald-700'}]},
  ciso: {default:[{role:'SEC',name:'Volt',  title:'Security Analyst',  workerColor:'from-slate-500 to-slate-700'  }],technology:[{role:'SEC',name:'Volt',title:'Security Analyst',workerColor:'from-slate-500 to-slate-700'},{role:'CMP',name:'Lex',title:'Compliance AI',workerColor:'from-slate-500 to-slate-700'}]},
};

function getWorkers(role: string, industry: string): WorkerNode[] {
  const map = WORKERS[role];
  if (!map) return [];
  return map[industry] ?? map['default'] ?? [];
}

// Matches EXEC_CATALOG in ScreenSetup exactly
const ROLE_META: Record<string, {label:string;color:string;initial:string;name:string;specialty:string}> = {
  ceo:  {label:'CEO', color:'from-amber-400 to-amber-600',   initial:'A', name:'Aria',  specialty:'Strategy & Growth'      },
  cfo:  {label:'CFO', color:'from-blue-400 to-blue-600',     initial:'F', name:'Felix', specialty:'Finance & Cash Flow'     },
  coo:  {label:'COO', color:'from-green-400 to-green-600',   initial:'O', name:'Orion', specialty:'Operations & Logistics'  },
  cmo:  {label:'CMO', color:'from-pink-400 to-pink-600',     initial:'M', name:'Maya',  specialty:'Marketing & Acquisition' },
  cto:  {label:'CTO', color:'from-purple-400 to-purple-600', initial:'T', name:'Theo',  specialty:'Tech & Automation'       },
  clo:  {label:'CLO', color:'from-cyan-400 to-cyan-600',     initial:'L', name:'Lex',   specialty:'Compliance & Risk'       },
  chro: {label:'CHRO',color:'from-rose-400 to-rose-600',     initial:'H', name:'Hana',  specialty:'HR & People Ops'         },
  cso:  {label:'CSO', color:'from-orange-400 to-orange-600', initial:'S', name:'Sage',  specialty:'Sales & Revenue'         },
  cro:  {label:'CRO', color:'from-red-400 to-rose-600',      initial:'R', name:'Rex',   specialty:'Revenue Ops'             },
  cpo:  {label:'CPO', color:'from-indigo-400 to-violet-600', initial:'N', name:'Nova',  specialty:'Product Strategy'        },
  cdo:  {label:'CDO', color:'from-sky-400 to-cyan-600',      initial:'I', name:'Iris',  specialty:'Data & Analytics'        },
  ciso: {label:'CISO',color:'from-slate-400 to-gray-600',    initial:'V', name:'Volt',  specialty:'Security & Risk'         },
  cco:  {label:'CCO', color:'from-teal-400 to-emerald-600',  initial:'C', name:'Cleo',  specialty:'Customer Experience'     },
};

// Industry-specific role subtitles (reason the role matters for this industry)
const ROLE_REASONS: Record<string, Record<string, string>> = {
  warehousing:  { cfo:'Inventory finance & cash flow', coo:'Warehouse & logistics ops', cto:'WMS & automation', chro:'Workforce & shift management', cmo:'B2B marketing', clo:'OSHA & contracts', cso:'Customer accounts', cdo:'Inventory analytics', cro:'Retention & upsell', ciso:'Facility security', cco:'Client satisfaction', cpo:'Service roadmap' },
  trades:       { cfo:'Job costing & billing', coo:'Scheduling & field ops', cso:'Estimates & new accounts', chro:'Crew hiring & compliance', cmo:'Local marketing & reviews', clo:'Licensing & liability', cdo:'Job analytics', cro:'Recurring revenue', cto:'Field tech & apps', cco:'Customer experience', ciso:'Data security', cpo:'Service offerings' },
  logistics:    { cfo:'Fleet finance & fuel cost', coo:'Route & dispatch ops', cto:'TMS & route AI', cdo:'Freight analytics', cso:'Shipper relationships', chro:'Driver hiring', clo:'DOT & compliance', cro:'Contract renewals', cmo:'Carrier marketing', cco:'On-time experience', ciso:'Cargo security', cpo:'Service expansion' },
  construction: { cfo:'Bid finance & job costing', coo:'Site & subcontractor ops', clo:'OSHA, bonds & contracts', chro:'Labor & subcontractor HR', cso:'New project pipeline', cmo:'RFP & reputation', cto:'BIM & project tech', cdo:'Cost analytics', cro:'Change order revenue', cco:'Owner satisfaction', ciso:'Site data security', cpo:'Service offerings' },
  medical:      { cfo:'Billing & revenue cycle', clo:'HIPAA & licensing', chro:'Clinical staff & credentialing', cmo:'Patient acquisition', cco:'Patient experience', cdo:'Clinical analytics', ciso:'EHR security', cto:'Health IT & telehealth', cso:'Referral growth', cro:'Patient retention', coo:'Clinic operations', cpo:'Care programs' },
  financial:    { cfo:'P&L & regulatory capital', clo:'SEC/FINRA compliance', cdo:'Risk & market analytics', ciso:'Client data security', cto:'Fintech & trading systems', cmo:'Client acquisition', cso:'AUM growth', cro:'Fee revenue & retention', chro:'Advisor hiring', coo:'Back-office ops', cco:'Client experience', cpo:'Product offerings' },
};

const SETUP_KEY = 'apex:company-setup';
function loadSetup(): CompanySetup {
  try { const r = localStorage.getItem(SETUP_KEY); if (r) return JSON.parse(r); } catch {}
  return {};
}
function saveSetup(s: CompanySetup) {
  try { localStorage.setItem(SETUP_KEY, JSON.stringify(s)); } catch {}
}

type OrgTypeInfo = { label: string; description: string; icon: string; color: string };
function getOrgType(roles: string[]): OrgTypeInfo {
  const has = (r: string) => roles.includes(r);
  const hasCTO  = has('cto');
  const hasCFO  = has('cfo');
  const hasCOO  = has('coo');
  const hasCMO  = has('cmo');
  const hasCHRO = has('chro');
  const hasCLO  = has('clo');
  const hasCDO  = has('cdo') || has('ciso');
  const hasRev  = has('cro') || has('cso');
  const total   = roles.length;

  if (total >= 8)
    return { label: 'Enterprise Matrix',   description: 'Cross-functional authority across all domains', icon: '⬡', color: 'text-violet-400 border-violet-500/30 bg-violet-500/10' };
  if (hasCTO && hasCDO)
    return { label: 'Tech-Led',            description: 'Dual technology & data leadership',             icon: '⚡', color: 'text-blue-400 border-blue-500/30 bg-blue-500/10'   };
  if (hasCFO && hasCOO && !hasCMO)
    return { label: 'Operations-First',    description: 'Finance and operations as core pillars',        icon: '⚙', color: 'text-green-400 border-green-500/30 bg-green-500/10' };
  if (hasCMO && hasRev && !hasCOO)
    return { label: 'Revenue-Focused',     description: 'Growth and marketing as primary drivers',       icon: '📈', color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' };
  if (hasCLO && hasCHRO)
    return { label: 'Compliance-Centric',  description: 'Legal and people operations at the forefront', icon: '🛡', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10'   };
  if (hasCFO && hasCOO && hasCMO && total >= 5)
    return { label: 'Functional',          description: 'Specialized leaders across each function',      icon: '◈', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'   };
  if (total <= 3)
    return { label: 'Flat Structure',      description: 'Lean leadership with broad executive ownership',icon: '▬', color: 'text-slate-400 border-slate-500/30 bg-slate-500/10' };
  return   { label: 'Hierarchical Classic',description: 'Traditional top-down reporting structure',      icon: '◆', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
}

function WorkerCard({node,index}:{node:WorkerNode;index:number}) {
  return (
    <div className="apex-fade-up flex flex-col items-center gap-0.5 w-14"
      style={{animationDelay:`${0.05 + index*0.07}s`}}>
      <div className={'w-11 h-11 rounded-xl bg-gradient-to-br '+node.workerColor+' flex items-center justify-center shadow border border-white/10'}>
        <span className="text-white text-[9px] font-black">{node.role.slice(0,3)}</span>
      </div>
      <p className="text-[9px] font-bold text-white text-center leading-tight">{node.role}</p>
      <p className="text-[8px] text-slate-500 text-center leading-tight">{node.name}</p>
    </div>
  );
}

function ExecCard({role, active, onToggle, industry, execIndex}:{
  role:string; active:boolean; onToggle:()=>void; industry:string; execIndex:number;
}) {
  const meta = ROLE_META[role];
  const workers = active ? getWorkers(role, industry) : [];
  const reasons = ROLE_REASONS[industry] ?? {};
  const subtitle = reasons[role] ?? meta?.specialty ?? '';
  if (!meta) return null;
  return (
    <div className="flex flex-col items-center">
      <div className="w-px h-8 bg-slate-600" />
      <button
        className="apex-pop-in group relative flex flex-col items-center gap-1 focus:outline-none"
        style={{animationDelay:`${execIndex*0.07}s`}}
        onClick={onToggle}
        title={`${meta.label} · ${meta.name} · ${subtitle}${active ? ' · click to disable' : ' · click to enable'}`}
      >
        <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 transition-all duration-200 ${
          active
            ? `bg-gradient-to-br ${meta.color} border-white/20 hover:scale-110 hover:shadow-xl cursor-pointer`
            : 'bg-slate-800/60 border-slate-700/30 opacity-35 hover:opacity-60 cursor-pointer'
        }`}>
          <span className="text-white font-black text-sm">{meta.initial}</span>
          {/* Active indicator dot */}
          {active && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-slate-900" />
          )}
          {/* Hover overlay: show X when active, + when inactive */}
          <div className="absolute inset-0 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/50">
            {active
              ? <XCircleIcon    className="w-5 h-5 text-red-400"   />
              : <PlusCircleIcon className="w-5 h-5 text-green-400" />}
          </div>
        </div>
        <p className={`text-[11px] font-black leading-none transition-colors duration-200 ${active ? 'text-slate-300' : 'text-slate-600'}`}>{meta.label}</p>
        <p className={`text-[9px] leading-none text-center max-w-[64px] transition-colors duration-200 ${active ? 'text-slate-500' : 'text-slate-700'}`}>{subtitle}</p>
        {!active && <p className="text-[8px] text-slate-600 italic">tap to add</p>}
      </button>
      <AnimatePresence>
        {workers.length > 0 && (
          <motion.div key="wk" className="flex flex-col items-center"
            initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            transition={{duration:0.3}}>
            <div className="w-px h-5 bg-slate-700" />
            {workers.length > 1 && <div className="h-px bg-slate-700" style={{width:workers.length*64}} />}
            <div className="flex gap-2 items-start">
              {workers.map((w,wi) => (
                <div key={w.role+wi} className="flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-700" />
                  <WorkerCard node={w} index={wi+execIndex*3} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ScreenOrgChart() {
  const [setup, setSetup] = useState<CompanySetup>(() => loadSetup());
  const [agents, setAgents] = useState(() => localAgentStore.getAll());

  // Re-sync agents whenever the store changes (wizard launch, toggle, etc.)
  useEffect(() => {
    return subscribeAgentStore(() => {
      setAgents([...localAgentStore.getAll()]);
      // Also re-read setup from localStorage in case wizard just wrote it
      setSetup(loadSetup());
    });
  }, []);

  // ─── Derive display data ───────────────────────────────────────────────────
  const agentExecIds = agents
    .filter(a => a.agentId.startsWith('agent.exec.') && !['moderator','executive','ceo'].includes(a.role))
    .map(a => a.role);

  // allRoles = the FULL wizard-selected roster. Never shrinks when roles are toggled off.
  // Falls back to agentExecIds if setup hasn't saved allRoles yet.
  const allRoles: string[] = (
    setup.allRoles?.filter(r => r !== 'ceo') ??
    setup.executives?.filter(r => r !== 'ceo') ??
    agentExecIds
  );

  // executives = the currently ACTIVE subset. Defaults to allRoles.
  const activeExecs: string[] = setup.executives?.length
    ? setup.executives.filter(r => r !== 'ceo')
    : allRoles;

  const industry    = setup.industry    ?? 'default';
  const companyName = setup.companyName ?? '';
  const teamSize    = setup.teamSize    ?? '';
  const hasSetup    = Boolean(setup.executives?.length || setup.allRoles?.length);

  // Toggle: flip a role between active/inactive.
  // Only mutates `executives` (active list). `allRoles` stays fixed.
  const toggleExec = useCallback((role: string) => {
    setSetup(prev => {
      // Seed allRoles from agent store on first ever toggle
      const knownRoles: string[] = (
        prev.allRoles?.filter(r => r !== 'ceo') ??
        prev.executives?.filter(r => r !== 'ceo') ??
        agents
          .filter(a => a.agentId.startsWith('agent.exec.') && !['moderator','executive','ceo'].includes(a.role))
          .map(a => a.role)
      );
      const currentActive: string[] = prev.executives?.filter(r => r !== 'ceo') ?? knownRoles;
      const isActive = currentActive.includes(role);
      const nextActive = isActive
        ? currentActive.filter(r => r !== role)      // disable
        : [...currentActive, role];                   // re-enable
      const withCeo = Array.from(new Set(['ceo', ...nextActive]));
      const updated: CompanySetup = {
        ...prev,
        executives: withCeo,
        allRoles: prev.allRoles ?? Array.from(new Set(['ceo', ...knownRoles])),
      };
      saveSetup(updated);
      localAgentStore.applySetup(withCeo);
      return updated;
    });
  }, [agents]);

  const activeExecIds   = allRoles.filter(r => activeExecs.includes(r));
  const inactiveExecIds = allRoles.filter(r => !activeExecs.includes(r));
  // Active roles first, then inactive (ghosted)
  const orderedExecIds  = [...activeExecIds, ...inactiveExecIds];

  const activeCount  = activeExecIds.length + 1; // +1 for CEO
  const workerCount  = activeExecIds.reduce((s, r) => s + getWorkers(r, industry).length, 0);
  const orgType      = getOrgType(activeExecIds);

  const INDUSTRY_LABELS: Record<string,string> = {
    warehousing:'Warehousing', trades:'Trades', logistics:'Logistics',
    construction:'Construction', medical:'Medical', financial:'Financial Services',
  };
  const TEAM_LABELS: Record<string,string> = {
    solo:'Solo', small:'Small', medium:'Medium', large:'Large', enterprise:'Enterprise',
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          {companyName ? (
            <div className="flex items-center gap-1.5 mb-0.5">
              <BuildingIcon className="w-3.5 h-3.5 text-orange-400" />
              <p className="text-sm font-black text-white">{companyName}</p>
            </div>
          ) : null}
          <p className="text-xs text-slate-400">
            {hasSetup
              ? [INDUSTRY_LABELS[industry], TEAM_LABELS[teamSize]].filter(Boolean).join(' · ') + ' · click exec to toggle'
              : 'AI-staffed organization · click any exec to toggle'}
          </p>
          {hasSetup && (
            <p className="text-xs text-green-400 mt-0.5 flex items-center gap-1">
              <CheckCircleIcon className="w-3 h-3" /> Setup complete · {activeExecIds.length + 1} active roles
            </p>
          )}
        </div>
        {orderedExecIds.length > 0 ? (
          <div className={`flex-shrink-0 flex flex-col items-end gap-0.5 border rounded-xl px-3 py-2 ${orgType.color}`}>
            <p className="text-xs font-black leading-none">
              <span className="mr-1">{orgType.icon}</span>{orgType.label}
            </p>
            <p className="text-[10px] opacity-70 leading-none text-right">{orgType.description}</p>
          </div>
        ) : (
          <span className="text-xs text-slate-600 italic">Run setup wizard to personalize</span>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {v: activeCount + workerCount, label:'AI Positions',  c:'text-orange-400'},
          {v: activeCount,               label:'Active Agents',  c:'text-green-400' },
          {v: inactiveExecIds.length > 0 ? inactiveExecIds.length : '—', label:'Inactive Roles', c:'text-slate-500'},
        ].map((s,i) => (
          <div key={s.label} className="apex-fade-up bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center"
            style={{animationDelay:`${i*0.07}s`}}>
            <p className={'text-xl font-black '+s.c}>{s.v}</p>
            <p className="text-xs text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Org tree */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 overflow-x-auto">
        <div className="flex items-center gap-4 mb-5 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-amber-400 to-amber-600" /><span className="text-xs text-slate-400">CEO</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-blue-400 to-purple-500" /><span className="text-xs text-slate-400">C-Suite</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-green-500 to-green-700" /><span className="text-xs text-slate-400">AI Workers</span></div>
          <div className="flex items-center gap-1.5"><div className="w-3.5 h-3.5 rounded bg-slate-700 opacity-40" /><span className="text-xs text-slate-500">Inactive</span></div>
        </div>

        <AnimatePresence mode="wait">
          {orderedExecIds.length === 0 ? (
            <motion.p key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="text-xs text-slate-500 py-8 text-center italic">
              No setup data · run the setup wizard to build your org
            </motion.p>
          ) : (
            <motion.div key="tree" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.15}}>
              <div className="min-w-max mx-auto">
                <div className="flex flex-col items-center">
                  {/* CEO */}
                  <div className="apex-pop-in flex flex-col items-center gap-1">
                    <div className="relative">
                      <div className="apex-pulse-ring absolute -inset-3 rounded-2xl bg-amber-500/25 blur-xl pointer-events-none" />
                      <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl border-2 border-amber-300/30">
                        <span className="text-white font-black text-lg z-10">A</span>
                      </div>
                    </div>
                    <p className="text-[12px] font-black text-amber-300 mt-0.5">CEO</p>
                    <p className="text-[9px] text-slate-400">Aria · {companyName || 'Strategic Vision AI'}</p>
                  </div>

                  <div className="w-px h-6 bg-slate-600" />
                  <div className="h-0.5 bg-slate-600 rounded origin-center"
                    style={{width: Math.max(orderedExecIds.length * 96, 96), animation:'apex-crossbar 0.45s 0.15s ease-out both'}} />

                  {/* Exec row */}
                  <div className="flex items-start gap-4 flex-nowrap">
                    {orderedExecIds.map((role, i) => (
                      <ExecCard
                        key={role} role={role}
                        active={activeExecs.includes(role)}
                        onToggle={() => toggleExec(role)}
                        industry={industry} execIndex={i}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="apex-fade-up bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4" style={{animationDelay:'0.4s'}}>
        <div className="flex items-start gap-3">
          <ZapIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-white mb-1">100% AI-Staffed Organization</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every position filled by a specialized AI agent trained for {INDUSTRY_LABELS[industry] ?? 'your industry'}.
              Toggle execs on/off — changes persist instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
