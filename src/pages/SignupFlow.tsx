import React, { useState, Fragment, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ZapIcon,
  SparklesIcon,
  TrendingUpIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  BuildingIcon,
  HeartPulseIcon,
  ScaleIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  TreesIcon,
  CalculatorIcon,
  HomeIcon,
  SmileIcon,
  XIcon,
  CheckIcon,
  UsersIcon,
  BriefcaseIcon,
  LinkedinIcon,
  TwitterIcon,
  ShareIcon,
  CopyIcon } from
'lucide-react';
import { Logo } from '../components/ui/Logo';
// ─── Types ─────────────────────────────────────────────────────────────────────
export type SignupPlan = 'free' | 'starter' | 'growth';
interface SignupFlowProps {
  plan?: SignupPlan;
}
interface FormData {
  fullName: string;
  email: string;
  password: string;
  company: string;
  industry: string;
  companySize: string;
  executives: string[];
  integrations: string[];
  socialConnected: string[];
}
// ─── Data ──────────────────────────────────────────────────────────────────────
const planDetails = {
  free: {
    name: 'Freemium',
    label: 'Start Free',
    icon: SparklesIcon,
    color: 'from-slate-500 to-slate-600',
    accent: 'text-slate-300',
    border: 'border-slate-500/30',
    bg: 'bg-slate-500/10',
    price: '$0',
    period: 'forever',
    execLimit: 1,
    features: [
    '1 AI Executive of your choice',
    'Basic reporting & analytics',
    '10 queries per day',
    'Standard integrations',
    'Community access']

  },
  starter: {
    name: 'Starter',
    label: '14-Day Free Trial',
    icon: TrendingUpIcon,
    color: 'from-blue-500 to-blue-600',
    accent: 'text-blue-400',
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    price: '$499',
    period: 'per executive/month after trial',
    execLimit: 3,
    features: [
    'Up to 3 AI Executives',
    'Performance-based compensation',
    'Real-time reporting & analytics',
    'Priority email support',
    'Unlimited queries',
    'Custom training on your data']

  },
  growth: {
    name: 'Growth',
    label: '14-Day Free Trial',
    icon: ZapIcon,
    color: 'from-orange-500 to-orange-600',
    accent: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/10',
    price: '$1,999',
    period: 'per month after trial',
    execLimit: 9,
    features: [
    'Up to 9 AI Executives',
    'Advanced analytics & forecasting',
    'Priority support + Slack channel',
    'SME expert training mode',
    'Video persona avatars',
    'Audit logs & compliance']

  }
};
const industries = [
{
  id: 'warehousing',
  name: 'Warehousing & Distribution',
  icon: PackageIcon,
  color: 'from-indigo-500 to-indigo-600'
},
{
  id: 'trades',
  name: 'Trades (HVAC/Plumbing/Electrical)',
  icon: WrenchIcon,
  color: 'from-yellow-500 to-yellow-600'
},
{
  id: 'logistics',
  name: 'Logistics & Freight',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-600'
},
{
  id: 'construction',
  name: 'Construction',
  icon: BuildingIcon,
  color: 'from-orange-500 to-orange-600'
},
{
  id: 'medical',
  name: 'Medical Practice',
  icon: HeartPulseIcon,
  color: 'from-rose-500 to-rose-600'
},
{
  id: 'dental',
  name: 'Dental Practice',
  icon: SmileIcon,
  color: 'from-sky-500 to-sky-600'
},
{
  id: 'lawfirm',
  name: 'Law Firm',
  icon: ScaleIcon,
  color: 'from-purple-500 to-purple-600'
},
{
  id: 'restaurant',
  name: 'Restaurant',
  icon: UtensilsIcon,
  color: 'from-red-500 to-red-600'
},
{
  id: 'ecommerce',
  name: 'E-commerce',
  icon: ShoppingBagIcon,
  color: 'from-cyan-500 to-cyan-600'
},
{
  id: 'landscaping',
  name: 'Landscaping',
  icon: TreesIcon,
  color: 'from-green-500 to-green-600'
},
{
  id: 'accounting',
  name: 'Accounting & CPA',
  icon: CalculatorIcon,
  color: 'from-blue-600 to-blue-700'
},
{
  id: 'realestate',
  name: 'Real Estate',
  icon: HomeIcon,
  color: 'from-amber-500 to-amber-600'
},
{
  id: 'financial',
  name: 'Financial Advisory',
  icon: TrendingUpIcon,
  color: 'from-emerald-500 to-emerald-600'
},
{
  id: 'staffing',
  name: 'Staffing Agency',
  icon: UsersIcon,
  color: 'from-violet-500 to-violet-600'
},
{
  id: 'other',
  name: 'Other',
  icon: BriefcaseIcon,
  color: 'from-slate-500 to-slate-600'
}];

const executives = [
{
  id: 'ceo',
  role: 'CEO',
  name: 'Aria',
  desc: 'Growth, Coaching & Leadership',
  color: 'from-amber-400 to-amber-600'
},
{
  id: 'cfo',
  role: 'CFO',
  name: 'Felix',
  desc: 'Finance & Cash Flow',
  color: 'from-blue-400 to-blue-600'
},
{
  id: 'coo',
  role: 'COO',
  name: 'Orion',
  desc: 'Operations & Logistics',
  color: 'from-green-400 to-green-600'
},
{
  id: 'cmo',
  role: 'CMO',
  name: 'Maya',
  desc: 'Marketing & Acquisition',
  color: 'from-pink-400 to-pink-600'
},
{
  id: 'cto',
  role: 'CTO',
  name: 'Theo',
  desc: 'Tech & Automation',
  color: 'from-purple-400 to-purple-600'
},
{
  id: 'clo',
  role: 'CLO',
  name: 'Lex',
  desc: 'Compliance & Risk',
  color: 'from-cyan-400 to-cyan-600'
},
{
  id: 'chro',
  role: 'CHRO',
  name: 'Hana',
  desc: 'HR & People Ops',
  color: 'from-rose-400 to-rose-600'
},
{
  id: 'cso',
  role: 'CSO',
  name: 'Sage',
  desc: 'Sales & Revenue',
  color: 'from-orange-400 to-orange-600'
}];

const integrations = [
{
  id: 'quickbooks',
  name: 'QuickBooks Online',
  desc: 'Accounting & invoicing',
  icon: '💰',
  popular: true
},
{
  id: 'salesforce',
  name: 'Salesforce CRM',
  desc: 'Customer relationships',
  icon: '☁️',
  popular: true
},
{
  id: 'slack',
  name: 'Slack',
  desc: 'Team communication',
  icon: '💬',
  popular: true
},
{
  id: 'zello',
  name: 'Zello PTT',
  desc: 'Push-to-talk field voice bridge',
  icon: '📻',
  popular: true
},
{
  id: 'google',
  name: 'Google Workspace',
  desc: 'Docs, Drive & Calendar',
  icon: '🔵',
  popular: false
},
{
  id: 'hubspot',
  name: 'HubSpot',
  desc: 'Marketing & CRM',
  icon: '🟠',
  popular: false
},
{
  id: 'xero',
  name: 'Xero',
  desc: 'Accounting software',
  icon: '🔷',
  popular: false
}];

const companySizes = [
{
  id: 'solo',
  label: 'Solo / Micro',
  sub: '1–5 employees',
  icon: '👤'
},
{
  id: 'small',
  label: 'Small Business',
  sub: '6–50 employees',
  icon: '🏢'
},
{
  id: 'medium',
  label: 'Mid-Market',
  sub: '51–200 employees',
  icon: '🏗️'
},
{
  id: 'large',
  label: 'Enterprise',
  sub: '200+ employees',
  icon: '🌐'
}];

// ─── Step animations ────────────────────────────────────────────────────────
const stepVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 40 : -40
  }),
  center: {
    opacity: 1,
    x: 0
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -40 : 40
  })
};
const stepTransition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1]
};
// ─── Dark Input ─────────────────────────────────────────────────────────────
function DarkInput({
  label,
  error,
  ...props



}: React.InputHTMLAttributes<HTMLInputElement> & {label?: string;error?: string;}) {
  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      }
      <input
        className={`w-full bg-slate-800/80 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-colors ${error ? 'border-red-500/60' : 'border-slate-700 hover:border-slate-600'}`}
        {...props} />

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>);

}
// ─── Step Components ────────────────────────────────────────────────────────
function StepPlan({ plan, onNext }: {plan: SignupPlan;onNext: () => void;}) {
  const p = planDetails[plan];
  const PlanIcon = p.icon;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          {plan === 'free' ? 'Start for free' : 'Start your free trial'}
        </h2>
        <p className="text-slate-400">
          {plan === 'free' ?
          'No credit card required. Upgrade anytime.' :
          '14 days free, no credit card required. Cancel anytime.'}
        </p>
      </div>
      <div className={`${p.bg} border ${p.border} rounded-2xl p-5`}>
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${p.color} rounded-xl flex items-center justify-center flex-shrink-0`}>

            <PlanIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-lg font-black text-white">{p.name}</h3>
              {plan !== 'free' &&
              <span className="text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  14-Day Trial
                </span>
              }
            </div>
            <p className={`text-sm font-bold ${p.accent}`}>
              {p.price}
              <span className="text-slate-500 font-normal"> / {p.period}</span>
            </p>
          </div>
        </div>
        <ul className="space-y-2">
          {p.features.map((f, i) =>
          <li
            key={i}
            className="flex items-center gap-2 text-sm text-slate-300">

              <CheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
              {f}
            </li>
          )}
        </ul>
      </div>
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">

        {p.label} <ArrowRightIcon className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          window.location.hash = '#/landing';
        }}
        className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 text-sm font-semibold transition-colors py-2">

        <ArrowLeftIcon className="w-4 h-4" />
        Back to pricing
      </button>
      <p className="text-center text-xs text-slate-600">
        By continuing, you agree to our{' '}
        <a
          href="#"
          className="text-slate-400 hover:text-white transition-colors underline">

          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="#"
          className="text-slate-400 hover:text-white transition-colors underline">

          Privacy Policy
        </a>
      </p>
    </div>);

}
function StepAccount({
  data,
  onChange,
  onNext




}: {data: FormData;onChange: (k: keyof FormData, v: string) => void;onNext: () => void;}) {
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!data.fullName.trim()) e.fullName = 'Full name is required';
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email))
    e.email = 'Valid email required';
    if (!data.password || data.password.length < 8)
    e.password = 'Password must be at least 8 characters';
    if (!data.company.trim()) e.company = 'Company name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          Create your account
        </h2>
        <p className="text-slate-400">
          You're seconds away from your AI C-Suite.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DarkInput
          label="Full Name"
          placeholder="Jane Smith"
          value={data.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
          error={errors.fullName} />

        <DarkInput
          label="Company Name"
          placeholder="Acme Corp"
          value={data.company}
          onChange={(e) => onChange('company', e.target.value)}
          error={errors.company} />

      </div>
      <DarkInput
        label="Work Email"
        type="email"
        placeholder="jane@acmecorp.com"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        error={errors.email} />

      <DarkInput
        label="Password"
        type="password"
        placeholder="Minimum 8 characters"
        value={data.password}
        onChange={(e) => onChange('password', e.target.value)}
        error={errors.password} />

      <button
        onClick={() => validate() && onNext()}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors">

        Continue <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>);

}
function StepIndustry({
  selected,
  onSelect,
  onNext




}: {selected: string;onSelect: (id: string) => void;onNext: () => void;}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          What's your industry?
        </h2>
        <p className="text-slate-400">
          We'll pre-train your AI team with industry-specific expertise.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
        {industries.map((ind) => {
          const Icon = ind.icon;
          const isSelected = selected === ind.id;
          return (
            <motion.button
              key={ind.id}
              whileTap={{
                scale: 0.97
              }}
              onClick={() => onSelect(ind.id)}
              className={`relative flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${isSelected ? 'bg-orange-500/15 border-orange-500/50 text-white' : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:border-slate-600 hover:text-white'}`}>

              <div
                className={`w-8 h-8 bg-gradient-to-br ${ind.color} rounded-lg flex items-center justify-center flex-shrink-0`}>

                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold leading-tight">
                {ind.name}
              </span>
              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">

                  <CheckIcon className="w-2.5 h-2.5 text-white" />
                </motion.div>
              }
            </motion.button>);

        })}
      </div>
      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors">

        Continue <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>);

}
function StepSize({
  selected,
  onSelect,
  onNext




}: {selected: string;onSelect: (id: string) => void;onNext: () => void;}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          How big is your team?
        </h2>
        <p className="text-slate-400">
          We'll recommend the right AI executive configuration.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {companySizes.map((size) => {
          const isSelected = selected === size.id;
          return (
            <motion.button
              key={size.id}
              whileTap={{
                scale: 0.97
              }}
              onClick={() => onSelect(size.id)}
              className={`flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all min-h-[100px] ${isSelected ? 'bg-orange-500/15 border-orange-500/50' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}>

              <span className="text-2xl">{size.icon}</span>
              <div>
                <p
                  className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>

                  {size.label}
                </p>
                <p className="text-xs text-slate-500">{size.sub}</p>
              </div>
            </motion.button>);

        })}
      </div>
      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors">

        Continue <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>);

}
function StepExecutives({
  selected,
  onToggle,
  limit,
  onNext





}: {selected: string[];onToggle: (id: string) => void;limit: number;onNext: () => void;}) {
  const atLimit = selected.length >= limit;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          Choose your AI executives
        </h2>
        <p className="text-slate-400">
          Select up to{' '}
          <span className="text-orange-400 font-bold">
            {limit} executive{limit > 1 ? 's' : ''}
          </span>{' '}
          for your plan.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-slate-800 rounded-full h-2">
          <motion.div
            animate={{
              width: `${selected.length / limit * 100}%`
            }}
            className="h-2 bg-orange-500 rounded-full transition-all" />

        </div>
        <span className="text-sm font-bold text-slate-400 flex-shrink-0">
          {selected.length}/{limit}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {executives.map((exec) => {
          const isSelected = selected.includes(exec.id);
          const isDisabled = !isSelected && atLimit;
          return (
            <motion.button
              key={exec.id}
              whileTap={
              !isDisabled ?
              {
                scale: 0.97
              } :
              undefined
              }
              onClick={() => !isDisabled && onToggle(exec.id)}
              className={`relative flex items-center gap-3 p-3.5 rounded-xl border transition-all ${isSelected ? 'bg-orange-500/15 border-orange-500/50' : isDisabled ? 'bg-slate-800/30 border-slate-800 opacity-40 cursor-not-allowed' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}>

              <div
                className={`w-10 h-10 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center flex-shrink-0`}>

                <span className="text-white font-black text-sm">
                  {exec.role[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p
                  className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>

                  {exec.role}
                </p>
                <p className="text-xs text-slate-500 truncate">{exec.desc}</p>
              </div>
              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">

                  <CheckIcon className="w-3 h-3 text-white" />
                </motion.div>
              }
            </motion.button>);

        })}
      </div>
      <button
        onClick={onNext}
        disabled={selected.length === 0}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors">

        Continue with {selected.length} executive
        {selected.length !== 1 ? 's' : ''}{' '}
        <ArrowRightIcon className="w-4 h-4" />
      </button>
    </div>);

}
function StepIntegrations({
  selected,
  onToggle,
  onNext,
  onSkip





}: {selected: string[];onToggle: (id: string) => void;onNext: () => void;onSkip: () => void;}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">
          Connect your tools
        </h2>
        <p className="text-slate-400">
          Your AI team works best with your existing software.
        </p>
      </div>
      <div className="space-y-2.5">
        {integrations.map((intg) => {
          const isSelected = selected.includes(intg.id);
          return (
            <motion.button
              key={intg.id}
              whileTap={{
                scale: 0.99
              }}
              onClick={() => onToggle(intg.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${isSelected ? 'bg-orange-500/10 border-orange-500/40' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600'}`}>

              <span className="text-2xl flex-shrink-0">{intg.icon}</span>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{intg.name}</p>
                  {intg.popular &&
                  <span className="text-xs text-orange-400 font-bold bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
                      Popular
                    </span>
                  }
                </div>
                <p className="text-xs text-slate-500">{intg.desc}</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-slate-600'}`}>

                {isSelected && <CheckIcon className="w-3.5 h-3.5 text-white" />}
              </div>
            </motion.button>);

        })}
      </div>
      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 font-semibold transition-colors text-sm">

          Skip for now
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">

          {selected.length > 0 ? `Connect ${selected.length}` : 'Continue'}{' '}
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>);

}
// ─── NEW: StepSocial ─────────────────────────────────────────────────────────
function StepSocial({
  connected,
  onToggle,
  onNext,
  onSkip





}: {connected: string[];onToggle: (platform: string) => void;onNext: () => void;onSkip: () => void;}) {
  const linkedinConnected = connected.includes('linkedin');
  const twitterConnected = connected.includes('twitter');
  const bothConnected = linkedinConnected && twitterConnected;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white mb-1">Connect & Share</h2>
        <p className="text-slate-400">
          Share wins automatically and earn recognition points. Your
          achievements build social proof for the whole community.
        </p>
      </div>

      {/* Bonus incentive */}
      <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3">
        <span className="text-xl">🎁</span>
        <div>
          <p className="text-sm font-bold text-yellow-400">
            200 bonus recognition points
          </p>
          <p className="text-xs text-slate-400">for connecting both accounts</p>
        </div>
      </div>

      {/* LinkedIn */}
      <motion.button
        whileTap={{
          scale: 0.99
        }}
        onClick={() => onToggle('linkedin')}
        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${linkedinConnected ? 'bg-blue-600/15 border-blue-600/50' : 'bg-slate-800/50 border-slate-700/50 hover:border-blue-600/30'}`}>

        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <LinkedinIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-white">LinkedIn</p>
          <p className="text-xs text-slate-400">
            Share achievements with your professional network
          </p>
        </div>
        <AnimatePresence mode="wait">
          {linkedinConnected ?
          <motion.div
            key="connected"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            className="flex items-center gap-1.5 text-blue-400 text-sm font-bold">

              <CheckCircleIcon className="w-5 h-5" />
              Connected
            </motion.div> :

          <motion.span
            key="connect"
            className="text-sm font-bold text-blue-400">

              Connect →
            </motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* Twitter / X */}
      <motion.button
        whileTap={{
          scale: 0.99
        }}
        onClick={() => onToggle('twitter')}
        className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${twitterConnected ? 'bg-white/10 border-white/30' : 'bg-slate-800/50 border-slate-700/50 hover:border-white/20'}`}>

        <div className="w-12 h-12 bg-slate-800 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <TwitterIcon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-bold text-white">X (Twitter)</p>
          <p className="text-xs text-slate-400">
            Broadcast wins to your followers in real-time
          </p>
        </div>
        <AnimatePresence mode="wait">
          {twitterConnected ?
          <motion.div
            key="connected"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            className="flex items-center gap-1.5 text-white text-sm font-bold">

              <CheckCircleIcon className="w-5 h-5" />
              Connected
            </motion.div> :

          <motion.span
            key="connect"
            className="text-sm font-bold text-slate-300">

              Connect →
            </motion.span>
          }
        </AnimatePresence>
      </motion.button>

      {/* What gets shared */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          What gets shared (you control)
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            AI-generated win summaries (you approve before posting)
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            Badge achievements and tier upgrades
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
            Leaderboard milestones (opt-in per post)
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <XIcon className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            Never: financial details, customer data, or private metrics
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="flex-1 py-3.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 font-semibold transition-colors text-sm">

          Skip for now
        </button>
        <button
          onClick={onNext}
          className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-colors text-sm">

          {bothConnected ?
          '🎁 Claim 200 pts' :
          connected.length > 0 ?
          `Continue (${connected.length} connected)` :
          'Continue'}
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>);

}
function StepLaunch({ data, plan }: {data: FormData;plan: SignupPlan;}) {
  const p = planDetails[plan];
  const selectedExecs = executives.filter((e) => data.executives.includes(e.id));
  const [copied, setCopied] = useState<'linkedin' | 'twitter' | null>(null);
  const linkedinPost = `Just deployed my AI C-Suite with @CatapultCompany — ${selectedExecs.map((e) => e.role).join(', ')} are live and running 24/7. No salaries, no interviews, just results. #AIManagement #SmallBusiness #CatapultCompany`;
  const twitterPost = `My AI ${selectedExecs[0]?.role || 'executive'} just went live. @CatapultAI is wild — deployed in 5 minutes, already working. #AIManagement #CatapultCompany`;
  const handleCopy = (type: 'linkedin' | 'twitter') => {
    const text = type === 'linkedin' ? linkedinPost : twitterPost;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };
  return (
    <div className="space-y-6 text-center">
      {/* Success animation */}
      <motion.div
        initial={{
          scale: 0
        }}
        animate={{
          scale: 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
        className="w-20 h-20 bg-green-500/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto">

        <CheckCircleIcon className="w-10 h-10 text-green-400" />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.25
        }}>

        <h2 className="text-2xl font-black text-white mb-2">
          Your AI C-Suite is ready, {data.fullName.split(' ')[0]}!
        </h2>
        <p className="text-slate-400">
          {plan === 'free' ?
          'Your free account is set up and your AI executive is standing by.' :
          'Your 14-day trial has started. No charge until your trial ends.'}
        </p>
      </motion.div>

      {/* Team preview */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.35
        }}
        className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4">

        <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
          Your AI Team
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {selectedExecs.map((exec, i) =>
          <motion.div
            key={exec.id}
            initial={{
              opacity: 0,
              scale: 0.8
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.4 + i * 0.07
            }}
            className="flex flex-col items-center gap-1">

              <div
              className={`w-12 h-12 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center shadow-lg`}>

                <span className="text-white font-black">{exec.role[0]}</span>
              </div>
              <span className="text-xs text-slate-400">{exec.role}</span>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.5
        }}
        className="grid grid-cols-3 gap-3">

        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
          <p className="text-lg font-black text-orange-400">
            {selectedExecs.length}
          </p>
          <p className="text-xs text-slate-500">AI Executives</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
          <p className="text-lg font-black text-green-400">24/7</p>
          <p className="text-xs text-slate-500">Always On</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
          <p className="text-lg font-black text-blue-400">$0</p>
          <p className="text-xs text-slate-500">Due Today</p>
        </div>
      </motion.div>

      {/* Share Your Launch */}
      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.55
        }}
        className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">

        <div className="flex items-center gap-2 mb-3">
          <ShareIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">Share Your Launch</p>
          <span className="text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full ml-auto">
            +100 pts
          </span>
        </div>

        {/* LinkedIn post */}
        <div className="bg-blue-600/10 border border-blue-600/30 rounded-xl p-3 mb-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold">
              <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
            </div>
            <button
              onClick={() => handleCopy('linkedin')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">

              {copied === 'linkedin' ?
              <CheckIcon className="w-3 h-3 text-green-400" /> :

              <CopyIcon className="w-3 h-3" />
              }
              {copied === 'linkedin' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
            {linkedinPost}
          </p>
        </div>

        {/* Twitter post */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold">
              <TwitterIcon className="w-3.5 h-3.5" /> X (Twitter)
            </div>
            <button
              onClick={() => handleCopy('twitter')}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors">

              {copied === 'twitter' ?
              <CheckIcon className="w-3 h-3 text-green-400" /> :

              <CopyIcon className="w-3 h-3" />
              }
              {copied === 'twitter' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {twitterPost}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-600/20 border border-blue-600/40 text-blue-400 text-sm font-bold hover:bg-blue-600/30 transition-all">
            <LinkedinIcon className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-bold hover:bg-white/15 transition-all">
            <TwitterIcon className="w-4 h-4" /> Share on X
          </button>
        </div>
      </motion.div>

      <motion.button
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.6
        }}
        whileHover={{
          scale: 1.02
        }}
        whileTap={{
          scale: 0.98
        }}
        onClick={() => {
          window.location.hash = '#/apex';
        }}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-colors text-lg">

        <ZapIcon className="w-5 h-5" />
        Launch APEX Platform
      </motion.button>

      <p className="text-xs text-slate-600">
        You'll receive a confirmation at{' '}
        <span className="text-slate-400">{data.email}</span>
      </p>
    </div>);

}
// ─── Main Component ─────────────────────────────────────────────────────────
export function SignupFlow({ plan = 'starter' }: SignupFlowProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    company: '',
    industry: '',
    companySize: '',
    executives: [],
    integrations: [],
    socialConnected: []
  });
  const totalSteps = 8;
  const p = planDetails[plan];
  const updateField = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value
    }));
  };
  const toggleExec = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      executives: prev.executives.includes(id) ?
      prev.executives.filter((e) => e !== id) :
      [...prev.executives, id]
    }));
  };
  const toggleIntegration = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      integrations: prev.integrations.includes(id) ?
      prev.integrations.filter((i) => i !== id) :
      [...prev.integrations, id]
    }));
  };
  const toggleSocial = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      socialConnected: prev.socialConnected.includes(platform) ?
      prev.socialConnected.filter((s) => s !== platform) :
      [...prev.socialConnected, platform]
    }));
  };
  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };
  const stepLabels = [
  'Plan',
  'Account',
  'Industry',
  'Size',
  'Team',
  'Integrations',
  'Social',
  'Launch'];

  const isLastStep = step === totalSteps;
  return (
    <div
      className="fixed inset-0 bg-slate-950 text-white flex flex-col overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }}>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 50% 35% at 50% 30%, rgba(249,115,22,0.06) 0%, transparent 70%)'
        }} />


      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800/80 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Logo size="sm" animated={false} variant="light" />
          <div>
            <p className="text-sm font-black text-white leading-none">APEX</p>
            <p className="text-xs text-slate-500 leading-none">
              Catapult Company
            </p>
          </div>
        </div>

        {/* Progress steps — desktop */}
        <div className="hidden sm:flex items-center gap-1">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isDone = stepNum < step;
            const isActive = stepNum === step;
            return (
              <Fragment key={label}>
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${isDone ? 'bg-orange-500 text-white' : isActive ? 'bg-orange-500/20 border border-orange-500/60 text-orange-400' : 'bg-slate-800 text-slate-600'}`}>

                    {isDone ? <CheckIcon className="w-3.5 h-3.5" /> : stepNum}
                  </div>
                  <span
                    className={`text-xs transition-colors ${isActive ? 'text-orange-400' : isDone ? 'text-slate-400' : 'text-slate-700'}`}>

                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 &&
                <div
                  className={`w-4 h-px mb-4 transition-colors ${isDone ? 'bg-orange-500/50' : 'bg-slate-800'}`} />

                }
              </Fragment>);

          })}
        </div>

        {/* Plan badge */}
        <div
          className={`flex items-center gap-1.5 ${p.bg} border ${p.border} rounded-full px-3 py-1.5`}>

          <span className={`text-xs font-bold ${p.accent}`}>{p.name}</span>
        </div>
      </header>

      {/* Mobile progress bar */}
      <div className="sm:hidden h-1 bg-slate-800 flex-shrink-0">
        <motion.div
          animate={{
            width: `${(step - 1) / (totalSteps - 1) * 100}%`
          }}
          className="h-full bg-orange-500"
          transition={{
            duration: 0.3
          }} />

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-8">
          {step > 1 && !isLastStep &&
          <motion.button
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors mb-6">

              <ArrowLeftIcon className="w-4 h-4" /> Back
            </motion.button>
          }

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}>

              {step === 1 && <StepPlan plan={plan} onNext={goNext} />}
              {step === 2 &&
              <StepAccount
                data={formData}
                onChange={updateField}
                onNext={goNext} />

              }
              {step === 3 &&
              <StepIndustry
                selected={formData.industry}
                onSelect={(v) => updateField('industry', v)}
                onNext={goNext} />

              }
              {step === 4 &&
              <StepSize
                selected={formData.companySize}
                onSelect={(v) => updateField('companySize', v)}
                onNext={goNext} />

              }
              {step === 5 &&
              <StepExecutives
                selected={formData.executives}
                onToggle={toggleExec}
                limit={p.execLimit}
                onNext={goNext} />

              }
              {step === 6 &&
              <StepIntegrations
                selected={formData.integrations}
                onToggle={toggleIntegration}
                onNext={goNext}
                onSkip={goNext} />

              }
              {step === 7 &&
              <StepSocial
                connected={formData.socialConnected}
                onToggle={toggleSocial}
                onNext={goNext}
                onSkip={goNext} />

              }
              {step === 8 && <StepLaunch data={formData} plan={plan} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-center gap-4 py-3 border-t border-slate-800/60 flex-shrink-0">
        <span className="text-xs text-slate-700">
          Step {step} of {totalSteps}
        </span>
        <span className="text-slate-800 text-xs">·</span>
        <a
          href="mailto:partnerships@catapultcompany.ai"
          className="text-xs text-slate-700 hover:text-slate-400 transition-colors">

          Need help?
        </a>
      </footer>
    </div>);

}