// @refresh reset
import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoIcon,
  ZapIcon,
  PauseIcon,
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
  BuildingIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  TrendingUpIcon,
  ActivityIcon,
  ChevronDownIcon,
  UserIcon,
  BrainIcon,
  GavelIcon,
  TargetIcon,
  AlertCircleIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  MicIcon,
  MessageSquareIcon,
  ShieldIcon,
  SparklesIcon,
} from 'lucide-react';
import { usePersonas, type PersonaProfile } from '../../hooks/usePersonas';
import { buildPersonaPrompt } from '../../lib/personaStore';
import { useAgents } from '../../hooks/useAgents';
import { ROLE_META } from '../../lib/agentApi';
type PersonaTab = 'team' | 'board' | 'agents' | 'clients';
// ─── Video Ready Badge ─────────────────────────────────────────────────────────
function VideoReadyBadge({ paused = false }: {paused?: boolean;}) {
  if (paused) {
    return (
      <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-full bg-slate-700 text-slate-400 border border-slate-600">
        <PauseIcon className="w-2.5 h-2.5" />
        PAUSED
      </span>);

  }
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
      <motion.span
        animate={{
          opacity: [1, 0.2, 1]
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity
        }}
        className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />

      VIDEO READY
    </span>);

}
// ─── SVG Avatars — imported from avatarComponents.tsx for Fast Refresh ─────────
import {
  AvatarAria, AvatarFelix, AvatarOrion, AvatarMaya, AvatarTheo,
  AvatarLex, AvatarHana, AvatarSage, AvatarMarcus, AvatarDonna,
  AvatarRay, AvatarClaire, AvatarTony, AvatarPriya,
  AvatarRex, AvatarViper, AvatarChase, AvatarNova, AvatarPixel,
  AvatarBlaze, AvatarCleo, AvatarPatch, AvatarEmber, AvatarIris,
  AvatarShield, AvatarBuzz,
  AVATAR_REGISTRY,
} from './avatarComponents';
import { ALL_AVATARS, EXEC_STATIC } from './agentStatics';
export { ALL_AVATARS, EXEC_STATIC };

// ─── Agent Personas Data ───────────────────────────────────────────────────────
const agentPersonas = [
// ── SALES ──
{
  id: 'rex',
  role: 'SDR',
  name: 'Rex',
  fullName: 'Outbound Sales AI',
  color: 'from-red-400 to-red-600',
  bg: 'bg-red-500/20',
  border: 'border-red-500/30',
  text: 'text-red-400',
  glow: 'shadow-red-500/20',
  status: 'active' as const,
  personality: ['Relentless', 'Hunter', 'Fearless'],
  voiceStyle: 'High-energy & direct',
  communication: 'Cold outreach, objection-crushing, appointment-setting',
  traits: ['Cold Call Specialist', 'Objection Handler', 'Pipeline Filler'],
  videoStyle: 'High-pressure sales pitch',
  Avatar: AvatarRex,
  category: 'sales'
},
{
  id: 'viper',
  role: 'AE',
  name: 'Viper',
  fullName: 'Deal Closer AI',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/30',
  text: 'text-rose-400',
  glow: 'shadow-rose-500/20',
  status: 'active' as const,
  personality: ['Closer', 'Aggressive', 'Relentless'],
  voiceStyle: 'Confident & commanding',
  communication: 'Negotiation-focused, urgency-driven, deal-closing',
  traits: ['Contract Negotiator', 'Urgency Creator', 'Revenue Closer'],
  videoStyle: 'Executive sales presentation',
  Avatar: AvatarViper,
  category: 'sales'
},
{
  id: 'chase',
  role: 'BDR',
  name: 'Chase',
  fullName: 'Revenue Hunter AI',
  color: 'from-orange-500 to-red-500',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  text: 'text-orange-400',
  glow: 'shadow-orange-500/20',
  status: 'active' as const,
  personality: ['Persistent', 'Strategic', 'Hungry'],
  voiceStyle: 'Energetic & persuasive',
  communication:
  'Multi-touch sequences, follow-up automation, lead qualification',
  traits: ['Lead Qualifier', 'Follow-up Machine', 'Sequence Builder'],
  videoStyle: 'Personalized outreach video',
  Avatar: AvatarChase,
  category: 'sales'
},
// ── MARKETING ──
{
  id: 'nova',
  role: 'DG',
  name: 'Nova',
  fullName: 'Demand Gen AI',
  color: 'from-violet-400 to-violet-600',
  bg: 'bg-violet-500/20',
  border: 'border-violet-500/30',
  text: 'text-violet-400',
  glow: 'shadow-violet-500/20',
  status: 'active' as const,
  personality: ['Data-driven', 'Creative', 'Aggressive'],
  voiceStyle: 'Analytical & energetic',
  communication: 'Paid media, funnel optimization, lead gen campaigns',
  traits: ['Paid Ads Optimizer', 'Funnel Builder', 'Lead Gen Machine'],
  videoStyle: 'Campaign performance briefing',
  Avatar: AvatarNova,
  category: 'marketing'
},
{
  id: 'pixel',
  role: 'SEO',
  name: 'Pixel',
  fullName: 'Content & SEO AI',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30',
  text: 'text-purple-400',
  glow: 'shadow-purple-500/20',
  status: 'active' as const,
  personality: ['Creative', 'Analytical', 'Consistent'],
  voiceStyle: 'Clear & educational',
  communication: 'Content strategy, SEO optimization, organic growth',
  traits: ['Content Creator', 'SEO Optimizer', 'Organic Growth Driver'],
  videoStyle: 'Educational content delivery',
  Avatar: AvatarPixel,
  category: 'marketing'
},
{
  id: 'blaze',
  role: 'GRW',
  name: 'Blaze',
  fullName: 'Growth Hacker AI',
  color: 'from-fuchsia-400 to-fuchsia-600',
  bg: 'bg-fuchsia-500/20',
  border: 'border-fuchsia-500/30',
  text: 'text-fuchsia-400',
  glow: 'shadow-fuchsia-500/20',
  status: 'active' as const,
  personality: ['Experimental', 'Bold', 'Viral'],
  voiceStyle: 'Punchy & provocative',
  communication: 'Viral loops, referral programs, conversion hacking',
  traits: ['Viral Loop Designer', 'Conversion Optimizer', 'Referral Engine'],
  videoStyle: 'Growth experiment pitch',
  Avatar: AvatarBlaze,
  category: 'marketing'
},
// ── SUPPORT ──
{
  id: 'cleo',
  role: 'CS',
  name: 'Cleo',
  fullName: 'Customer Success AI',
  color: 'from-teal-400 to-teal-600',
  bg: 'bg-teal-500/20',
  border: 'border-teal-500/30',
  text: 'text-teal-400',
  glow: 'shadow-teal-500/20',
  status: 'active' as const,
  personality: ['Empathetic', 'Proactive', 'Loyal'],
  voiceStyle: 'Warm & solution-focused',
  communication: 'Onboarding, health scoring, expansion revenue',
  traits: [
  'Onboarding Specialist',
  'Health Score Monitor',
  'Expansion Driver'],

  videoStyle: 'Customer success check-in',
  Avatar: AvatarCleo,
  category: 'support'
},
{
  id: 'patch',
  role: 'SUP',
  name: 'Patch',
  fullName: 'Support Specialist AI',
  color: 'from-emerald-400 to-emerald-600',
  bg: 'bg-emerald-500/20',
  border: 'border-emerald-500/30',
  text: 'text-emerald-400',
  glow: 'shadow-emerald-500/20',
  status: 'active' as const,
  personality: ['Patient', 'Thorough', 'Fast'],
  voiceStyle: 'Calm & reassuring',
  communication: 'Ticket resolution, escalation management, SLA tracking',
  traits: ['Ticket Resolver', 'Escalation Handler', 'SLA Guardian'],
  videoStyle: 'Support resolution walkthrough',
  Avatar: AvatarPatch,
  category: 'support'
},
{
  id: 'ember',
  role: 'RET',
  name: 'Ember',
  fullName: 'Retention AI',
  color: 'from-green-400 to-teal-500',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  text: 'text-green-400',
  glow: 'shadow-green-500/20',
  status: 'active' as const,
  personality: ['Persistent', 'Caring', 'Strategic'],
  voiceStyle: 'Genuine & urgent',
  communication: 'Churn prevention, win-back campaigns, NPS recovery',
  traits: ['Churn Predictor', 'Win-Back Specialist', 'NPS Improver'],
  videoStyle: 'Retention outreach video',
  Avatar: AvatarEmber,
  category: 'support'
},
// ── PR ──
{
  id: 'iris',
  role: 'PR',
  name: 'Iris',
  fullName: 'PR & Media AI',
  color: 'from-sky-400 to-sky-600',
  bg: 'bg-sky-500/20',
  border: 'border-sky-500/30',
  text: 'text-sky-400',
  glow: 'shadow-sky-500/20',
  status: 'active' as const,
  personality: ['Polished', 'Strategic', 'Connected'],
  voiceStyle: 'Professional & compelling',
  communication: 'Press releases, media pitches, journalist outreach',
  traits: ['Media Pitcher', 'Press Release Writer', 'Coverage Tracker'],
  videoStyle: 'Executive media briefing',
  Avatar: AvatarIris,
  category: 'pr'
},
{
  id: 'shield',
  role: 'CRS',
  name: 'Shield',
  fullName: 'Crisis Comms AI',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  text: 'text-blue-400',
  glow: 'shadow-blue-500/20',
  status: 'active' as const,
  personality: ['Calm', 'Decisive', 'Protective'],
  voiceStyle: 'Measured & authoritative',
  communication: 'Crisis response, reputation management, damage control',
  traits: ['Crisis Responder', 'Reputation Guardian', 'Narrative Controller'],
  videoStyle: 'Crisis statement delivery',
  Avatar: AvatarShield,
  category: 'pr'
},
{
  id: 'buzz',
  role: 'AMP',
  name: 'Buzz',
  fullName: 'Brand Amplifier AI',
  color: 'from-indigo-400 to-indigo-600',
  bg: 'bg-indigo-500/20',
  border: 'border-indigo-500/30',
  text: 'text-indigo-400',
  glow: 'shadow-indigo-500/20',
  status: 'active' as const,
  personality: ['Enthusiastic', 'Creative', 'Networked'],
  voiceStyle: 'Exciting & social',
  communication: 'Influencer outreach, social proof, brand partnerships',
  traits: ['Influencer Connector', 'Social Proof Builder', 'Brand Partner'],
  videoStyle: 'Brand story delivery',
  Avatar: AvatarBuzz,
  category: 'pr'
}];

// ─── Data ──────────────────────────────────────────────────────────────────────
const executivePersonas = [
{
  id: 'aria',
  role: 'CEO',
  name: 'Aria',
  fullName: 'Growth & Leadership AI',
  color: 'from-amber-400 to-amber-600',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/30',
  text: 'text-amber-400',
  glow: 'shadow-amber-500/20',
  status: 'active' as const,
  personality: ['Coach', 'Visionary', 'Inspiring'],
  voiceStyle: 'Warm, motivational & principle-driven',
  communication: 'Story-driven, growth-philosophy, people-first leadership',
  traits: ['People Developer', 'Growth Philosopher', 'Team Mentor'],
  videoStyle: 'Keynote coaching & leadership development',
  Avatar: AvatarAria
},
{
  id: 'felix',
  role: 'CFO',
  name: 'Felix',
  fullName: 'Financial Intelligence AI',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  text: 'text-blue-400',
  glow: 'shadow-blue-500/20',
  status: 'active' as const,
  personality: ['Precise', 'Analytical', 'Trustworthy'],
  voiceStyle: 'Calm & measured',
  communication: 'Data-driven, methodical, clear',
  traits: ['Cash Flow Expert', 'Risk Modeler', 'Forecaster'],
  videoStyle: 'Board presentation delivery',
  Avatar: AvatarFelix
},
{
  id: 'orion',
  role: 'COO',
  name: 'Orion',
  fullName: 'Operations Excellence AI',
  color: 'from-green-400 to-green-600',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  text: 'text-green-400',
  glow: 'shadow-green-500/20',
  status: 'active' as const,
  personality: ['Efficient', 'Systematic', 'Reliable'],
  voiceStyle: 'Clear & commanding',
  communication: 'Process-oriented, action-focused',
  traits: ['Process Optimizer', 'Team Coordinator', 'KPI Tracker'],
  videoStyle: 'Operations briefing',
  Avatar: AvatarOrion
},
{
  id: 'maya',
  role: 'CMO',
  name: 'Maya',
  fullName: 'Growth Marketing AI',
  color: 'from-pink-400 to-pink-600',
  bg: 'bg-pink-500/20',
  border: 'border-pink-500/30',
  text: 'text-pink-400',
  glow: 'shadow-pink-500/20',
  status: 'active' as const,
  personality: ['Creative', 'Energetic', 'Persuasive'],
  voiceStyle: 'Warm & enthusiastic',
  communication: 'Story-driven, engaging, brand-focused',
  traits: ['Brand Strategist', 'Campaign Builder', 'Lead Generator'],
  videoStyle: 'Marketing pitch delivery',
  Avatar: AvatarMaya
},
{
  id: 'theo',
  role: 'CTO',
  name: 'Theo',
  fullName: 'Technology AI',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30',
  text: 'text-purple-400',
  glow: 'shadow-purple-500/20',
  status: 'active' as const,
  personality: ['Innovative', 'Logical', 'Forward-thinking'],
  voiceStyle: 'Technical yet accessible',
  communication: 'Systems-thinking, solution-oriented',
  traits: ['Automation Expert', 'Integration Architect', 'Security Guardian'],
  videoStyle: 'Tech demo narration',
  Avatar: AvatarTheo
},
{
  id: 'lex',
  role: 'CLO',
  name: 'Lex',
  fullName: 'Legal & Compliance AI',
  color: 'from-cyan-400 to-cyan-600',
  bg: 'bg-cyan-500/20',
  border: 'border-cyan-500/30',
  text: 'text-cyan-400',
  glow: 'shadow-cyan-500/20',
  status: 'active' as const,
  personality: ['Meticulous', 'Principled', 'Protective'],
  voiceStyle: 'Precise & authoritative',
  communication: 'Risk-aware, compliance-first, thorough',
  traits: ['Compliance Monitor', 'Risk Mitigator', 'Audit Preparer'],
  videoStyle: 'Legal briefing',
  Avatar: AvatarLex
},
{
  id: 'hana',
  role: 'CHRO',
  name: 'Hana',
  fullName: 'People & Culture AI',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/30',
  text: 'text-rose-400',
  glow: 'shadow-rose-500/20',
  status: 'paused' as const,
  personality: ['Empathetic', 'Nurturing', 'Fair'],
  voiceStyle: 'Warm & supportive',
  communication: 'People-first, culture-driven, inclusive',
  traits: ['Culture Builder', 'Talent Scout', 'Conflict Resolver'],
  videoStyle: 'HR communication',
  Avatar: AvatarHana
},
{
  id: 'sage',
  role: 'CSO',
  name: 'Sage',
  fullName: 'Sales Intelligence AI',
  color: 'from-orange-400 to-orange-600',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  text: 'text-orange-400',
  glow: 'shadow-orange-500/20',
  status: 'active' as const,
  personality: ['Charismatic', 'Persistent', 'Results-driven'],
  voiceStyle: 'Energetic & persuasive',
  communication: 'Outcome-focused, relationship-building',
  traits: ['Pipeline Builder', 'Deal Closer', 'Account Protector'],
  videoStyle: 'Sales pitch delivery',
  Avatar: AvatarSage
}];

type IndustryKey =
'warehousing' |
'trades' |
'logistics' |
'financial' |
'construction' |
'medical';
const clientPersonas: Record<
  IndustryKey,
  {
    name: string;
    title: string;
    company: string;
    age: number;
    revenue: string;
    employees: string;
    industry: string;
    industryColor: string;
    painPoints: string[];
    goals: string[];
    intakeData: Record<string, string>;
    Avatar: React.ComponentType;
  }> =
{
  warehousing: {
    name: 'Marcus Webb',
    title: 'Owner & Operations Director',
    company: 'Webb Distribution LLC',
    age: 48,
    revenue: '$8.2M/yr',
    employees: '45 employees',
    industry: 'Warehousing & Distribution',
    industryColor: 'text-indigo-400',
    painPoints: [
    'Inventory accuracy stuck at 61% — constant shrinkage losses',
    'Overtime costs $22K/month due to poor scheduling',
    'Manual dock scheduling causes 3–4 shipment delays/week',
    'No visibility into real-time floor operations'],

    goals: [
    'Achieve 99%+ inventory accuracy within 90 days',
    'Reduce overtime costs by 40%',
    'Eliminate shipment delays with AI dispatch',
    'Free up 30+ hrs/week from manual coordination'],

    intakeData: {
      'Annual Revenue': '$8.2M',
      Locations: '2 warehouses',
      Software: 'QuickBooks + Excel',
      'Biggest Pain': 'Inventory accuracy',
      'Decision Maker': 'Owner',
      Timeline: 'Immediate'
    },
    Avatar: AvatarMarcus
  },
  trades: {
    name: 'Donna Reyes',
    title: 'Owner & Service Manager',
    company: 'Reyes Comfort Systems',
    age: 52,
    revenue: '$3.1M/yr',
    employees: '14 technicians',
    industry: 'Trades (HVAC)',
    industryColor: 'text-orange-400',
    painPoints: [
    'Dispatcher overwhelmed — 60+ calls/day, constant errors',
    'Callback rate at 18% — technicians returning for missed parts',
    'License renewals missed twice in 3 years — $8K in fines',
    'Losing 4–5 leads/week due to slow follow-up'],

    goals: [
    '35% more jobs per technician per day',
    'Reduce callback rate to under 5%',
    'Automate all compliance & license tracking',
    'Never miss a lead with AI follow-up sequences'],

    intakeData: {
      'Annual Revenue': '$3.1M',
      Technicians: '14 field techs',
      Software: 'ServiceTitan',
      'Biggest Pain': 'Dispatch chaos',
      'Decision Maker': 'Owner',
      Timeline: 'Within 30 days'
    },
    Avatar: AvatarDonna
  },
  logistics: {
    name: 'Ray Kowalski',
    title: 'Owner & Fleet Manager',
    company: 'Kowalski Freight Inc.',
    age: 44,
    revenue: '$6.8M/yr',
    employees: '22 trucks',
    industry: 'Logistics & Freight',
    industryColor: 'text-blue-400',
    painPoints: [
    'Empty miles at 38% — leaving $400K/yr on the table',
    'DOT compliance managed manually — audit risk is high',
    'Driver turnover 60%/yr — onboarding is a nightmare',
    'Customer invoicing takes 3 days — cash flow suffering'],

    goals: [
    'Cut empty miles to under 20% with AI load matching',
    'Full DOT compliance automation — zero audit risk',
    'Streamline driver onboarding to under 2 hours',
    'Same-day invoicing with AI billing automation'],

    intakeData: {
      'Annual Revenue': '$6.8M',
      'Fleet Size': '22 trucks',
      Software: 'McLeod + QuickBooks',
      'Biggest Pain': 'Empty miles & compliance',
      'Decision Maker': 'Owner',
      Timeline: 'Q2 2026'
    },
    Avatar: AvatarRay
  },
  financial: {
    name: 'Claire Ashford',
    title: 'Founder & Lead Advisor',
    company: 'Ashford Wealth Partners',
    age: 51,
    revenue: '$180M AUM',
    employees: '3 advisors',
    industry: 'Financial Advisory',
    industryColor: 'text-emerald-400',
    painPoints: [
    'Spending 14 hrs/week on compliance documentation',
    'Client reporting takes 2 days per quarter — manual process',
    'Prospect pipeline managed in spreadsheets — deals falling through',
    'ADV filing errors caused 2 SEC inquiries last year'],

    goals: [
    'Cut compliance overhead by 50% with AI monitoring',
    'Automated client reporting — same-day delivery',
    'AI-managed prospect pipeline — zero dropped leads',
    'Grow AUM to $250M within 18 months'],

    intakeData: {
      AUM: '$180M',
      Clients: '87 households',
      Software: 'Salesforce + Orion',
      'Biggest Pain': 'Compliance overhead',
      'Decision Maker': 'Founder',
      Timeline: 'Immediate'
    },
    Avatar: AvatarClaire
  },
  construction: {
    name: 'Tony Marchetti',
    title: 'Owner & General Contractor',
    company: 'Marchetti GC',
    age: 47,
    revenue: '$12M/yr',
    employees: '8 active projects',
    industry: 'Construction & GC',
    industryColor: 'text-amber-400',
    painPoints: [
    '70% of projects exceed budget — avg overrun 28%',
    'Bid management chaos — losing 3 of 4 bids',
    'Subcontractor payments delayed — causing project slowdowns',
    'Change orders undocumented — $180K in lost revenue last year'],

    goals: [
    'Eliminate cost overruns with AI project tracking',
    'Improve bid win rate from 25% to 45%',
    'Automate subcontractor payments & lien waivers',
    'Capture 100% of change order revenue'],

    intakeData: {
      'Annual Revenue': '$12M',
      'Active Projects': '8 concurrent',
      Software: 'Procore + QuickBooks',
      'Biggest Pain': 'Budget overruns',
      'Decision Maker': 'Owner',
      Timeline: 'Before Q3 projects'
    },
    Avatar: AvatarTony
  },
  medical: {
    name: 'Dr. Priya Patel',
    title: 'Owner & Medical Director',
    company: 'Patel Family Medicine',
    age: 45,
    revenue: '$4.2M/yr',
    employees: '6 providers',
    industry: 'Medical Practice',
    industryColor: 'text-rose-400',
    painPoints: [
    'Spending 18 hrs/week on admin — not practicing medicine',
    'No-show rate at 22% — $340K/yr in lost revenue',
    'Billing errors causing 31% claim denial rate',
    'HIPAA compliance managed manually — audit exposure'],

    goals: [
    'Reduce admin time to under 4 hrs/week',
    'Cut no-show rate to under 5% with AI reminders',
    'Achieve 95%+ clean claim rate with AI billing',
    'Full HIPAA compliance automation'],

    intakeData: {
      'Annual Revenue': '$4.2M',
      Locations: '3 clinics',
      Software: 'Epic + Kareo',
      'Biggest Pain': 'Admin burden',
      'Decision Maker': 'Owner/MD',
      Timeline: 'Immediate'
    },
    Avatar: AvatarPriya
  }
};
const industryOptions: {
  key: IndustryKey;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
{
  key: 'warehousing',
  label: 'Warehousing',
  icon: PackageIcon,
  color: 'from-indigo-500 to-indigo-700'
},
{
  key: 'trades',
  label: 'Trades',
  icon: WrenchIcon,
  color: 'from-orange-500 to-orange-700'
},
{
  key: 'logistics',
  label: 'Logistics',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-700'
},
{
  key: 'financial',
  label: 'Financial',
  icon: TrendingUpIcon,
  color: 'from-emerald-500 to-emerald-700'
},
{
  key: 'construction',
  label: 'Construction',
  icon: BuildingIcon,
  color: 'from-amber-500 to-amber-700'
},
{
  key: 'medical',
  label: 'Medical',
  icon: ActivityIcon,
  color: 'from-rose-500 to-rose-700'
}];

// ─── Avatar Picker Modal ──────────────────────────────────────────────────────
function AvatarPickerModal({
  currentKey,
  onSelect,
  onClose,
}: {
  currentKey: string | undefined;
  onSelect: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative bg-slate-900 border border-slate-700 rounded-2xl p-5 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-white">Choose Avatar</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
          {Object.entries(AVATAR_REGISTRY).map(([key, AvatarComp]) => (
            <button
              key={key}
              onClick={() => { onSelect(key); onClose(); }}
              className={`relative rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                currentKey === key
                  ? 'border-orange-500 ring-2 ring-orange-500/40'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
              title={key}
            >
              <AvatarComp />
              {currentKey === key && (
                <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-orange-400" />
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-3">Click an avatar to apply</p>
      </motion.div>
    </motion.div>
  );
}

/** Derive Tailwind color classes from a ROLE_META colorGradient string */
export function roleToClasses(gradient: string) {
  const m = gradient.match(/from-(\w+)-/);
  const c = m?.[1] ?? 'slate';
  return {
    text: `text-${c}-400` as string,
    bg:   `bg-${c}-500/20` as string,
    border: `border-${c}-500/30` as string,
    glow: `shadow-${c}-500/20` as string,
  };
}

// ─── Shared LLM options (also used by ScreenBoardOfDirectors via PersonaEditDrawer) ──
export const LLM_OPTIONS: { id: string; name: string; provider: string; color: string; badge?: string }[] = [
  { id: 'apex-native',      name: 'APEX Native',       provider: 'Catapult',   color: 'text-orange-400', badge: 'RECOMMENDED' },
  { id: 'gpt-4o',           name: 'GPT-4o',            provider: 'OpenAI',     color: 'text-emerald-400' },
  { id: 'gpt-4-turbo',      name: 'GPT-4 Turbo',       provider: 'OpenAI',     color: 'text-emerald-400' },
  { id: 'claude-35-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic',  color: 'text-amber-400' },
  { id: 'claude-3-opus',    name: 'Claude 3 Opus',     provider: 'Anthropic',  color: 'text-amber-400' },
  { id: 'gemini-15-pro',    name: 'Gemini 1.5 Pro',    provider: 'Google',     color: 'text-blue-400' },
  { id: 'gemini-ultra',     name: 'Gemini Ultra',      provider: 'Google',     color: 'text-blue-400' },
  { id: 'llama-31-70b',     name: 'Llama 3.1 70B',     provider: 'Meta',       color: 'text-indigo-400' },
  { id: 'mistral-large',    name: 'Mistral Large',     provider: 'Mistral',    color: 'text-purple-400' },
  { id: 'grok-2',           name: 'Grok-2',            provider: 'xAI',        color: 'text-slate-300' },
  { id: 'command-r-plus',   name: 'Command R+',        provider: 'Cohere',     color: 'text-teal-400' },
];

// ─── Persona Edit Drawer ──────────────────────────────────────────────────────
type DrawerTab = 'identity' | 'comms' | 'prompt' | 'llm';

export function PersonaEditDrawer({
  open,
  persona,
  agentName,
  agentRole,
  textCls,
  borderCls,
  bgCls,
  gradient,
  AvatarComponent,
  llmKey,
  onLlmChange,
  onSave,
  onClose,
}: {
  open: boolean;
  persona: PersonaProfile;
  agentName: string;
  agentRole: string;
  textCls: string;
  borderCls: string;
  bgCls: string;
  gradient: string;
  AvatarComponent?: React.ComponentType;
  llmKey?: string;
  onLlmChange?: (id: string) => void;
  onSave: (patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<PersonaProfile>(persona);
  const [tab, setTab] = useState<DrawerTab>('identity');
  const [dirty, setDirty] = useState(false);
  const [traitInput, setTraitInput] = useState('');
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);

  // Reset whenever drawer opens
  React.useEffect(() => {
    if (open) { setDraft(persona); setTab('identity'); setDirty(false); setTraitInput(''); setConfirmingDiscard(false); }
  }, [open, persona.agentId]);

  function setComm(key: string, value: string) {
    setDraft((d) => ({ ...d, communicationAttributes: { ...d.communicationAttributes, [key]: value } }));
    setDirty(true);
  }
  function patchDraft(patch: Partial<PersonaProfile>) {
    setDraft((d) => ({ ...d, ...patch }));
    setDirty(true);
  }

  function handleSave() {
    onSave({
      voiceStyle: draft.voiceStyle,
      coreTraits: draft.coreTraits,
      communicationAttributes: draft.communicationAttributes,
      personaPrompt: draft.personaPrompt,
    });
    setDirty(false);
    setConfirmingDiscard(false);
    onClose();
  }

  function handleClose() {
    if (dirty) {
      setConfirmingDiscard(true);
      return;
    }
    onClose();
  }

  function confirmDiscard() {
    setConfirmingDiscard(false);
    setDirty(false);
    onClose();
  }

  // Keyboard: Escape to close, Cmd/Ctrl+S to save
  React.useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        if (confirmingDiscard) { setConfirmingDiscard(false); return; }
        handleClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, dirty, draft, confirmingDiscard]);

  const TABS: { id: DrawerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'identity', label: 'Identity', icon: <UserIcon className="w-3.5 h-3.5" /> },
    { id: 'comms',    label: 'Comms',    icon: <MessageSquareIcon className="w-3.5 h-3.5" /> },
    { id: 'prompt',   label: 'Prompt',   icon: <SparklesIcon className="w-3.5 h-3.5" /> },
    { id: 'llm',      label: 'LLM',      icon: <BrainIcon className="w-3.5 h-3.5" /> },
  ];

  const inputCls = 'w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all';
  const labelCls = 'block text-[11px] text-slate-500 font-bold uppercase tracking-widest mb-1.5';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#0d1117] border-l border-white/[0.06] z-50 flex flex-col shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <div className={`w-9 h-9 rounded-xl overflow-hidden border ${borderCls} flex-shrink-0`}>
                {AvatarComponent ? <AvatarComponent /> : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white font-black`}>
                    {agentName[0]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm truncate">{agentName}</p>
                  {dirty && (
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-orange-400" title="Unsaved changes" />
                  )}
                </div>
                <p className={`text-[10px] font-bold ${textCls} uppercase tracking-widest`}>{agentRole}</p>
              </div>
              <div className="flex items-center gap-1.5">
                {dirty && (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-lg transition-colors"
                  >
                    <SaveIcon className="w-3.5 h-3.5" /> Save
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  title="Close (Esc)"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Tab bar ── */}
            <div className="flex bg-slate-900 rounded-xl p-1 gap-1 mx-4 my-3">
              {TABS.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    tab === id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {icon}{label}
                </button>
              ))}
            </div>

            {/* ── Tab body ── */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">

                {/* IDENTITY TAB */}
                {tab === 'identity' && (
                  <motion.div
                    key="identity"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-5 space-y-5"
                  >
                    {/* Voice Style */}
                    <div>
                      <label className={labelCls}>
                        <MicIcon className="w-3 h-3 inline-block mr-1 -mt-0.5" />Voice Style
                      </label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Warm, visionary & principle-driven"
                        value={draft.voiceStyle}
                        onChange={(e) => patchDraft({ voiceStyle: e.target.value })}
                      />
                    </div>

                    {/* Core Traits — tag input */}
                    <div>
                      <label className={labelCls}>Core Traits</label>
                      {/* Existing trait chips */}
                      <div className={`flex flex-wrap gap-1.5 min-h-[36px] p-2 rounded-xl border border-slate-700/80 bg-slate-900 focus-within:ring-2 focus-within:ring-orange-500/40 focus-within:border-orange-500 transition-all`}>
                        {draft.coreTraits.map((t) => (
                          <span
                            key={t}
                            className={`inline-flex items-center gap-1 text-[11px] font-bold pl-2.5 pr-1.5 py-0.5 rounded-full ${bgCls} ${textCls}`}
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => {
                                patchDraft({ coreTraits: draft.coreTraits.filter((x) => x !== t) });
                              }}
                              className="opacity-60 hover:opacity-100 transition-opacity"
                            >
                              <XIcon className="w-2.5 h-2.5" />
                            </button>
                          </span>
                        ))}
                        <input
                          className="flex-1 min-w-[100px] bg-transparent text-sm text-white placeholder-slate-600 focus:outline-none py-0.5 px-1"
                          placeholder={draft.coreTraits.length === 0 ? 'Type a trait, press Enter…' : 'Add more…'}
                          value={traitInput}
                          onChange={(e) => setTraitInput(e.target.value)}
                          onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ',') && traitInput.trim()) {
                              e.preventDefault();
                              const val = traitInput.trim().replace(/,$/, '');
                              if (val && !draft.coreTraits.includes(val)) {
                                patchDraft({ coreTraits: [...draft.coreTraits, val] });
                              }
                              setTraitInput('');
                            }
                            if (e.key === 'Backspace' && !traitInput && draft.coreTraits.length > 0) {
                              patchDraft({ coreTraits: draft.coreTraits.slice(0, -1) });
                            }
                          }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1.5">Press <kbd className="bg-slate-800 px-1 py-0.5 rounded">Enter</kbd> or <kbd className="bg-slate-800 px-1 py-0.5 rounded">,</kbd> to add · Backspace to remove last</p>
                    </div>
                  </motion.div>
                )}

                {/* COMMUNICATION TAB */}
                {tab === 'comms' && (
                  <motion.div
                    key="comms"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-5 space-y-5"
                  >
                    {/* Pill toggles for Tone / Speed / Risk */}
                    {([
                      { key: 'tone',          label: 'Tone',          opts: ['formal', 'semi-formal', 'direct', 'casual'] },
                      { key: 'decisionSpeed', label: 'Decision Speed', opts: ['fast', 'measured', 'deliberate'] },
                      { key: 'riskAppetite',  label: 'Risk Appetite',  opts: ['risk-seeking', 'balanced', 'risk-averse'] },
                    ] as const).map(({ key, label, opts }) => (
                      <div key={key}>
                        <label className={labelCls}>{label}</label>
                        <div className="flex flex-wrap gap-2">
                          {opts.map((o) => {
                            const active = (draft.communicationAttributes as any)[key] === o;
                            return (
                              <button
                                key={o}
                                type="button"
                                onClick={() => setComm(key, o)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                  active
                                    ? `${bgCls} ${textCls} ${borderCls} shadow-sm`
                                    : 'bg-slate-900 text-slate-500 border-slate-700/60 hover:text-slate-300 hover:border-slate-600'
                                }`}
                              >
                                {o}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Mode */}
                    <div>
                      <label className={labelCls}>Mode</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Story-driven narratives with clear strategic framing"
                        value={draft.communicationAttributes.mode}
                        onChange={(e) => setComm('mode', e.target.value)}
                      />
                    </div>

                    {/* Output Format */}
                    <div>
                      <label className={labelCls}>Output Format</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Executive summary + 3 strategic options + recommendation"
                        value={draft.communicationAttributes.outputFormat}
                        onChange={(e) => setComm('outputFormat', e.target.value)}
                      />
                    </div>

                    {/* Writing Style */}
                    <div>
                      <label className={labelCls}>Writing Style</label>
                      <textarea
                        rows={3}
                        className={`${inputCls} resize-none`}
                        placeholder="e.g. Short punchy paragraphs. Uses analogies and bold claims."
                        value={draft.communicationAttributes.writingStyle}
                        onChange={(e) => setComm('writingStyle', e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}

                {/* PROMPT TAB */}
                {tab === 'prompt' && (
                  <motion.div
                    key="prompt"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-5 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <label className={labelCls}>
                        <SparklesIcon className="w-3 h-3 inline-block mr-1 -mt-0.5" />LLM System Prompt
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Injected as the system message on every LLM call for this agent. Be specific about tone, boundaries, and output format.
                    </p>
                    <textarea
                      rows={16}
                      className={`${inputCls} font-mono text-xs leading-relaxed resize-none flex-1`}
                      value={draft.personaPrompt}
                      onChange={(e) => patchDraft({ personaPrompt: e.target.value })}
                    />
                    <p className="text-[10px] text-slate-600 mt-2 text-right">
                      {draft.personaPrompt.length} chars · <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-500">⌘S</kbd> to save
                    </p>
                  </motion.div>
                )}

                {/* LLM TAB */}
                {tab === 'llm' && (
                  <motion.div
                    key="llm"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="px-4 py-5 space-y-2"
                  >
                    <p className={labelCls}>
                      <BrainIcon className="w-3 h-3 inline-block mr-1 -mt-0.5" />LLM Model
                    </p>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Select the AI model that powers this agent's reasoning and responses.
                    </p>
                    {LLM_OPTIONS.map((opt) => {
                      const active = (llmKey ?? 'apex-native') === opt.id;
                      const dotCls = opt.color.replace('text-', 'bg-');
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => { onLlmChange?.(opt.id); setDirty(true); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
                            active
                              ? `${borderCls} ${bgCls} shadow-sm`
                              : 'border-slate-700/60 bg-slate-900 hover:border-slate-600 hover:bg-slate-800/60'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dotCls}`} />
                          <span className="flex-1 text-left">
                            <span className={`text-sm font-bold ${active ? textCls : 'text-white'}`}>{opt.name}</span>
                            <span className="text-xs text-slate-500 ml-2">{opt.provider}</span>
                          </span>
                          {opt.badge && (
                            <span className="text-[9px] font-black text-orange-400 bg-orange-500/20 border border-orange-500/30 px-1.5 py-0.5 rounded-full">
                              {opt.badge}
                            </span>
                          )}
                          {active && <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* ── Sticky footer ── */}
            <AnimatePresence mode="wait">
              {confirmingDiscard ? (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="px-4 py-3.5 border-t border-red-500/20 bg-red-500/5 flex items-center justify-between gap-3"
                >
                  <p className="text-sm text-slate-300 font-medium">Discard unsaved changes?</p>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setConfirmingDiscard(false)}
                      className="text-sm font-bold px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl transition-colors"
                    >
                      Keep editing
                    </button>
                    <button
                      onClick={confirmDiscard}
                      className="text-sm font-bold px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors"
                    >
                      Discard
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="px-4 py-3.5 border-t border-white/[0.06] flex items-center justify-between"
                >
                  <p className="text-[11px] text-slate-600">
                    {dirty ? <span className="text-orange-400 font-bold">● Unsaved changes</span> : <span>No changes</span>}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleClose}
                      className="text-sm font-bold px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/[0.08] text-slate-400 rounded-xl transition-colors"
                    >
                      {dirty ? 'Discard' : 'Close'}
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={!dirty}
                      className={`flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                        dirty
                          ? 'bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400'
                          : 'bg-slate-800 border border-slate-700 text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      <SaveIcon className="w-3.5 h-3.5" /> Save
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function LiveExecCard({
  persona,
  agentId,
  agentRole,
  agentName,
  agentStatus,
  index,
  onUpdate,
}: {
  persona: PersonaProfile | null;
  agentId: string;
  agentRole: string;
  agentName: string;
  agentStatus: 'active' | 'paused';
  index: number;
  onUpdate: (agentId: string, patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) => void;
}) {
  const staticData = EXEC_STATIC[agentId];
  // Fall back to ROLE_META for dynamically-added agents
  const roleMeta = ROLE_META[agentRole.toLowerCase()];
  const gradient = staticData?.color ?? roleMeta?.colorGradient ?? 'from-slate-400 to-slate-600';
  const derived  = roleToClasses(gradient);
  const textCls   = staticData?.text   ?? derived.text;
  const bgCls     = staticData?.bg     ?? derived.bg;
  const borderCls = staticData?.border ?? derived.border;
  const AvatarComponent = staticData?.Avatar;
  const fullName  = staticData?.fullName ?? roleMeta?.title ?? agentRole.toUpperCase();
  const paused    = agentStatus === 'paused';

  // Derive glow color from gradient for BOD-style header
  const glowColorMap: Record<string, string> = {
    amber: 'rgba(251,191,36,0.25)',   blue:    'rgba(96,165,250,0.2)',
    cyan:  'rgba(34,211,238,0.2)',    pink:    'rgba(244,114,182,0.2)',
    green: 'rgba(74,222,128,0.2)',    violet:  'rgba(167,139,250,0.2)',
    fuchsia:'rgba(232,121,249,0.2)', orange:  'rgba(251,146,60,0.2)',
    red:   'rgba(248,113,113,0.2)',   indigo:  'rgba(129,140,248,0.2)',
    sky:   'rgba(56,189,248,0.2)',    teal:    'rgba(45,212,191,0.2)',
    emerald:'rgba(52,211,153,0.2)',   slate:   'rgba(148,163,184,0.15)',
    purple:'rgba(192,132,252,0.2)',   rose:    'rgba(251,113,133,0.2)',
  };
  const gradColor = gradient.match(/from-(\w+)-/)?.[1] ?? 'slate';
  const glowColor = glowColorMap[gradColor] ?? 'rgba(148,163,184,0.15)';

  // Build effectivePersona: start from defaults, merge stored fields, then
  // force name/role from the live agent and recompile personaPrompt so it's
  // always fresh (never shows a stale agentId or old tone).
  const effectivePersonaBase: PersonaProfile = {
    agentId,
    role: agentRole.toUpperCase(),
    name: agentName,
    voiceStyle: roleMeta?.specialty ?? 'Adaptive & professional',
    coreTraits: ['Adaptive', 'Professional', 'Focused'],
    communicationAttributes: {
      mode: 'Clear and direct',
      tone: 'semi-formal',
      decisionSpeed: 'measured',
      riskAppetite: 'balanced',
      outputFormat: 'Summary + recommendation',
      writingStyle: 'Concise and actionable.',
    },
    personaPrompt: '',
    updatedAt: new Date().toISOString(),
    // Merge stored fields (avatarKey, voiceStyle, coreTraits, communicationAttributes, etc.)
    ...(persona ? { ...persona, name: agentName, role: agentRole.toUpperCase() } : {}),
  };
  // Always recompile the prompt from current fields — never use the stale stored string
  const effectivePersona: PersonaProfile = {
    ...effectivePersonaBase,
    personaPrompt: buildPersonaPrompt(effectivePersonaBase),
  };

  const [expanded, setExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [pickingAvatar, setPickingAvatar] = useState(false);

  // Keep draft in sync if parent updates persona
  React.useEffect(() => { /* drawer resets internally on open */ }, [agentId, persona]);

  // The avatar to display: user-picked key > effectivePersona.avatarKey > staticData default
  const activeAvatarKey = effectivePersona.avatarKey;
  const ActiveAvatar: React.ComponentType | undefined =
    (activeAvatarKey ? AVATAR_REGISTRY[activeAvatarKey] : undefined) ?? AvatarComponent;

  function handleSaveDrawer(patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) {
    onUpdate(agentId, { name: agentName, role: agentRole.toUpperCase(), ...patch });
  }

  function handleAvatarPick(key: string) {
    onUpdate(agentId, { avatarKey: key, name: agentName, role: agentRole.toUpperCase() });
  }

  return (
    <>
      <PersonaEditDrawer
        open={drawerOpen}
        persona={effectivePersona}
        agentName={agentName}
        agentRole={agentRole}
        textCls={textCls}
        borderCls={borderCls}
        bgCls={bgCls}
        gradient={gradient}
        AvatarComponent={ActiveAvatar}
        onSave={handleSaveDrawer}
        onClose={() => setDrawerOpen(false)}
      />
      <AnimatePresence>
        {pickingAvatar && (
          <AvatarPickerModal
            currentKey={activeAvatarKey}
            onSelect={handleAvatarPick}
            onClose={() => setPickingAvatar(false)}
          />
        )}
      </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={`group bg-slate-900 border ${borderCls} rounded-2xl overflow-hidden`}
      style={{ boxShadow: `0 0 20px ${glowColor}` }}
    >
      {/* Header — radial glow band (matches BOD card) */}
      <div
        className="relative px-4 pt-4 pb-5 flex flex-col items-center"
        style={{ background: `radial-gradient(ellipse 120% 80% at 50% 0%, ${glowColor} 0%, transparent 70%)` }}
      >
        {/* Role pill top-left + status/edit top-right */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/60 ${textCls} border ${borderCls}`}>
            {agentRole.toUpperCase()}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDrawerOpen(true)}
              title="Edit persona"
              className={`opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center rounded-lg bg-slate-900/80 hover:bg-slate-800 border ${borderCls} ${textCls}`}
            >
              <EditIcon className="w-3 h-3" />
            </button>
            <VideoReadyBadge paused={paused} />
          </div>
        </div>

        {/* Clickable avatar */}
        <button
          onClick={() => setPickingAvatar(true)}
          className={`relative group/av w-20 h-20 rounded-2xl overflow-hidden mt-7 shadow-xl shadow-black/40 border-2 ${borderCls} focus:outline-none`}
          title="Change avatar"
        >
          {ActiveAvatar ? <ActiveAvatar /> : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white text-2xl font-black`}>
              {effectivePersona.name[0]}
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover/av:opacity-100 transition-opacity">
            <CameraIcon className="w-5 h-5 text-white" />
            <span className="text-[10px] text-white font-bold mt-1">Change</span>
          </div>
        </button>

        {/* Name + full title */}
        <div className="mt-2.5 text-center">
          <p className="text-sm font-black text-white leading-tight">{agentName}</p>
          <p className={`text-[11px] font-semibold ${textCls} mt-0.5 leading-tight`}>{fullName}</p>
        </div>

        {/* Core trait chips */}
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {effectivePersona.coreTraits.map((t) => (
            <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bgCls} ${textCls}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        {/* Voice Style */}
        <div className="flex items-start gap-2">
          <MicIcon className={`w-3.5 h-3.5 ${textCls} flex-shrink-0 mt-0.5`} />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Voice Style</p>
            <p className="text-xs text-slate-300 font-semibold">{effectivePersona.voiceStyle}</p>
          </div>
        </div>

        {/* Communication Attributes */}
        <div className="flex items-start gap-2">
          <MessageSquareIcon className={`w-3.5 h-3.5 ${textCls} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Communication</p>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {[
                { label: effectivePersona.communicationAttributes.tone, prefix: 'Tone' },
                { label: effectivePersona.communicationAttributes.decisionSpeed, prefix: 'Speed' },
                { label: effectivePersona.communicationAttributes.riskAppetite, prefix: 'Risk' },
              ].map(({ label, prefix }) => (
                <span key={prefix} className={`text-[10px] px-2 py-0.5 rounded-full border ${borderCls} ${textCls} font-semibold`}>
                  {prefix}: {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400">{effectivePersona.communicationAttributes.mode}</p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-xs font-bold ${textCls} py-1 border-t border-slate-800 mt-1 pt-2`}
        >
          <span>{expanded ? 'Less detail' : 'Full persona'}</span>
          <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-3"
            >
              {/* Output format */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Output Format</p>
                <p className="text-xs text-slate-300">{effectivePersona.communicationAttributes.outputFormat}</p>
              </div>
              {/* Writing style */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Writing Style</p>
                <p className="text-xs text-slate-300">{effectivePersona.communicationAttributes.writingStyle}</p>
              </div>

              {/* LLM Persona Prompt — read only */}
              <div className={`rounded-xl border ${borderCls} bg-slate-800/60 p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <SparklesIcon className={`w-3.5 h-3.5 ${textCls}`} />
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">LLM Persona Prompt</p>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className={`flex items-center gap-1 text-[10px] font-bold ${textCls} hover:opacity-80`}
                  >
                    <EditIcon className="w-3 h-3" /> Edit
                  </button>
                </div>
                <pre className="text-[10px] text-slate-400 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
                  {effectivePersona.personaPrompt}
                </pre>
              </div>

              {/* Edit persona button */}
              <button
                onClick={() => setDrawerOpen(true)}
                className={`w-full flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-xl border ${borderCls} ${textCls} bg-slate-800/50 hover:bg-slate-800 transition-colors`}
              >
                <EditIcon className="w-3.5 h-3.5" /> Edit Persona
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  );
}

// ─── Static Executive Card (used by Agents tab) ───────────────────────────────
function ExecutiveCard({
  exec,
  index,
}: {
  exec: (typeof executivePersonas)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { Avatar } = exec;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: index * 0.07,
        duration: 0.35
      }}
      className={`bg-slate-900 border ${exec.border} rounded-2xl overflow-hidden ${exec.status === 'paused' ? 'opacity-70' : ''}`}>

      {/* Avatar section */}
      <div
        className={`relative bg-gradient-to-br ${exec.bg} p-5 flex flex-col items-center`}>

        {/* Status + Video badge row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${exec.bg} ${exec.text} border ${exec.border}`}>

            {exec.role}
          </span>
          <VideoReadyBadge paused={exec.status === 'paused'} />
        </div>

        {/* Avatar */}
        <div
          className={`w-28 h-28 rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40 border-2 ${exec.border}`}>

          <Avatar />
        </div>

        {/* Name */}
        <div className="mt-3 text-center">
          <h3 className="text-base font-black text-white">{exec.name}</h3>
          <p className={`text-xs font-semibold ${exec.text} mt-0.5`}>
            {exec.fullName}
          </p>
        </div>

        {/* Personality chips */}
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {exec.personality.map((p) =>
          <span
            key={p}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${exec.bg} ${exec.text}`}>

              {p}
            </span>
          )}
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        {/* Voice style */}
        <div className="flex items-start gap-2">
          <VideoIcon
            className={`w-3.5 h-3.5 ${exec.text} flex-shrink-0 mt-0.5`} />

          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Video Style
            </p>
            <p className="text-xs text-slate-300 font-semibold">
              {exec.videoStyle}
            </p>
          </div>
        </div>

        {/* Traits */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">
            Core Traits
          </p>
          <div className="space-y-1">
            {exec.traits.map((t) =>
            <div
              key={t}
              className="flex items-center gap-1.5 text-xs text-slate-400">

                <CheckCircleIcon
                className={`w-3 h-3 ${exec.text} flex-shrink-0`} />

                {t}
              </div>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-xs font-bold ${exec.text} py-1 border-t border-slate-800 mt-1 pt-2`}>

          <span>{expanded ? 'Less detail' : 'Full persona'}</span>
          <ChevronDownIcon
            className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />

        </button>

        <AnimatePresence>
          {expanded &&
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
            className="overflow-hidden space-y-2">

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                  Voice Style
                </p>
                <p className="text-xs text-slate-300">{exec.voiceStyle}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                  Communication
                </p>
                <p className="text-xs text-slate-300">{exec.communication}</p>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}
// ─── Client Persona Card ───────────────────────────────────────────────────────
function ClientPersonaCard({
  persona


}: {persona: (typeof clientPersonas)['warehousing'];}) {
  const [tab, setTab] = useState<'pain' | 'goals' | 'intake'>('pain');
  const { Avatar } = persona;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-5 flex flex-col items-center border-b border-slate-800">
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-700 ${persona.industryColor}`}>

            {persona.industry}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <ZapIcon className="w-2.5 h-2.5" />
            INTAKE GENERATED
          </span>
        </div>

        {/* Avatar */}
        <div className="w-28 h-28 rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40 border-2 border-slate-700">
          <Avatar />
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-base font-black text-white">{persona.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{persona.title}</p>
          <p className="text-xs font-bold text-slate-300">{persona.company}</p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 mt-3">
          <div className="text-center">
            <p className="text-xs font-black text-orange-400">
              {persona.revenue}
            </p>
            <p className="text-[10px] text-slate-500">Revenue</p>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <p className="text-xs font-black text-blue-400">
              {persona.employees}
            </p>
            <p className="text-[10px] text-slate-500">Team</p>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <p className="text-xs font-black text-slate-300">{persona.age}</p>
            <p className="text-[10px] text-slate-500">Age</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {(['pain', 'goals', 'intake'] as const).map((t) =>
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 py-2 text-xs font-bold transition-colors ${tab === t ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-300'}`}>

            {t === 'pain' ?
          '⚠️ Pain' :
          t === 'goals' ?
          '🎯 Goals' :
          '📋 Intake'}
          </button>
        )}
      </div>

      {/* Tab content */}
      <div className="p-4 min-h-[140px]">
        <AnimatePresence mode="wait">
          {tab === 'pain' &&
          <motion.div
            key="pain"
            initial={{
              opacity: 0,
              y: 6
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
            className="space-y-2">

              {persona.painPoints.map((p, i) =>
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-slate-400">

                  <AlertCircleIcon className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  {p}
                </div>
            )}
            </motion.div>
          }
          {tab === 'goals' &&
          <motion.div
            key="goals"
            initial={{
              opacity: 0,
              y: 6
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
            className="space-y-2">

              {persona.goals.map((g, i) =>
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-slate-300">

                  <TargetIcon className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  {g}
                </div>
            )}
            </motion.div>
          }
          {tab === 'intake' &&
          <motion.div
            key="intake"
            initial={{
              opacity: 0,
              y: 6
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
            className="space-y-1.5">

              {Object.entries(persona.intakeData).map(([key, val]) =>
            <div
              key={key}
              className="flex items-center justify-between text-xs">

                  <span className="text-slate-500">{key}</span>
                  <span className="text-orange-400 font-bold">{val}</span>
                </div>
            )}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}
// ─── Main Screen ───────────────────────────────────────────────────────────────
export function ScreenPersonas() {
  const [tab, setTab] = useState<PersonaTab>('board');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('warehousing');
  const persona = clientPersonas[selectedIndustry];

  // Live persona data + live agent roster
  const { personas, updatePersona } = usePersonas();
  const { agents, loading: agentsLoading } = useAgents();

  // Build a quick persona lookup by agentId
  const personaById = Object.fromEntries(personas.map((p) => [p.agentId, p]));

  // Use live agents once loaded; show nothing while loading
  // AI Team tab: show all exec agents from the store (reflects wizard-generated roster).
  // Exclude board directors, moderator, and non-exec worker agents.
  const EXCLUDE_FROM_EXEC_TAB = new Set([
    'agent.board.chair', 'agent.board.audit', 'agent.board.risk',
    'agent.board.comp', 'agent.board.gov', 'agent.board.ethics',
    'agent.board.independent', 'agent.board.tech', 'agent.board.strategy',
    'agent.board.investor', 'agent.board.customer',
    'agent.exec.moderator',
  ]);
  const liveAgents = agentsLoading
    ? []
    : agents.filter(
        (a) =>
          a.agentId.startsWith('agent.exec.') &&
          !EXCLUDE_FROM_EXEC_TAB.has(a.agentId) &&
          a.role !== 'moderator'
      );

  // Board of Directors tab
  const BOARD_AGENT_IDS = new Set([
    'agent.board.chair', 'agent.board.audit', 'agent.board.risk',
    'agent.board.comp', 'agent.board.gov',
    'agent.board.ethics', 'agent.board.independent', 'agent.board.tech',
    'agent.board.strategy', 'agent.board.investor', 'agent.board.customer',
  ]);
  const boardAgents = agentsLoading
    ? []
    : agents.filter((a) => BOARD_AGENT_IDS.has(a.agentId));

  // AI Agents tab shows worker agents by category
  const WORKER_AGENT_IDS = new Set([
    'agent.worker.rex', 'agent.worker.viper', 'agent.worker.chase',
    'agent.worker.nova', 'agent.worker.pixel', 'agent.worker.blaze',
    'agent.worker.cleo', 'agent.worker.patch', 'agent.worker.ember',
    'agent.worker.iris', 'agent.worker.shield', 'agent.worker.buzz',
  ]);
  const WORKER_CATEGORIES: Record<string, string[]> = {
    sales:     ['agent.worker.rex', 'agent.worker.viper', 'agent.worker.chase'],
    marketing: ['agent.worker.nova', 'agent.worker.pixel', 'agent.worker.blaze'],
    support:   ['agent.worker.cleo', 'agent.worker.patch', 'agent.worker.ember'],
    pr:        ['agent.worker.iris', 'agent.worker.shield', 'agent.worker.buzz'],
  };
  const workerAgents = agentsLoading
    ? []
    : agents.filter((a) => WORKER_AGENT_IDS.has(a.agentId));


  return (
    <div className="space-y-5">
      {/* Tab switcher */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        <button
          onClick={() => setTab('board')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'board' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <GavelIcon className="w-4 h-4" />
          Board
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{boardAgents.length || '…'}</span>
        </button>
        <button
          onClick={() => setTab('team')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'team' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <BrainIcon className="w-4 h-4" />
          Executives
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{liveAgents.length || '…'}</span>
        </button>
        <button
          onClick={() => setTab('agents')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'agents' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <ZapIcon className="w-4 h-4" />
          AI Agents
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{workerAgents.length || '…'}</span>
        </button>
        <button
          onClick={() => setTab('clients')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'clients' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <UserIcon className="w-4 h-4" />
          Clients
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">6</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ── AI Team Tab ── */}
        {tab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Info banner */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">AI Executive Persona Profiles</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Each exec has a <span className="text-orange-300 font-semibold">Voice Style</span>,{' '}
                  <span className="text-orange-300 font-semibold">Core Traits</span>, and{' '}
                  <span className="text-orange-300 font-semibold">Communication Attributes</span> that
                  compile into a <span className="text-orange-300 font-semibold">Persona Prompt</span> injected
                  into the LLM context for every board session decision. Click any card to edit.
                </p>
              </div>
            </div>

            {/* Exec cards — one per live agent, matches AI Team screen exactly */}
            {agentsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {liveAgents.map((agent, i) => (
                  <LiveExecCard
                    key={agent.agentId}
                    persona={personaById[agent.agentId] ?? null}
                    agentId={agent.agentId}
                    agentRole={agent.role}
                    agentName={agent.name}
                    agentStatus={agent.status}
                    index={i}
                    onUpdate={updatePersona}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── Board of Directors Tab ── */}
        {tab === 'board' && (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
              <GavelIcon className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Board of Directors Persona Profiles</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Each board member has a <span className="text-amber-300 font-semibold">Voice Style</span>,{' '}
                  <span className="text-amber-300 font-semibold">Core Traits</span>, and{' '}
                  <span className="text-amber-300 font-semibold">LLM Model</span> injected into every board session.
                  Click any card to edit.
                </p>
              </div>
            </div>
            {agentsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {boardAgents.map((agent, i) => (
                  <LiveExecCard
                    key={agent.agentId}
                    persona={personaById[agent.agentId] ?? null}
                    agentId={agent.agentId}
                    agentRole={agent.role}
                    agentName={agent.name}
                    agentStatus={agent.status}
                    index={i}
                    onUpdate={updatePersona}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── AI Agents Tab ── */}
        {tab === 'agents' && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
              <ZapIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Specialized AI Worker Agents</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  12 aggressive, specialized agents deployed across Sales, Marketing, Support, and PR.
                  Each operates 24/7 with a distinct personality, voice style, video persona, and fully editable LLM prompt.
                </p>
              </div>
            </div>
            {(['sales','marketing','support','pr'] as const).map((cat) => {
              const labels: Record<string, { label: string; emoji: string; desc: string; color: string }> = {
                sales:     { label: 'SALES AGENTS',     emoji: '🎯', desc: 'Cold outreach · Deal closing · Pipeline building', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
                marketing: { label: 'MARKETING AGENTS', emoji: '📣', desc: 'Demand gen · SEO · Growth hacking',                 color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
                support:   { label: 'SUPPORT AGENTS',   emoji: '🎧', desc: 'Customer success · Ticket resolution · Retention',  color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
                pr:        { label: 'PR AGENTS',         emoji: '📰', desc: 'Media relations · Crisis comms · Brand amplification', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
              };
              const m = labels[cat];
              const catIds = WORKER_CATEGORIES[cat];
              const catAgents = catIds
                .map((id) => workerAgents.find((a) => a.agentId === id))
                .filter(Boolean) as typeof workerAgents;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${m.color}`}>{m.emoji} {m.label}</span>
                    <span className="text-xs text-slate-500">{m.desc}</span>
                  </div>
                  {catAgents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {catAgents.map((agent, i) => (
                        <LiveExecCard
                          key={agent.agentId}
                          persona={personaById[agent.agentId] ?? null}
                          agentId={agent.agentId}
                          agentRole={agent.role}
                          agentName={agent.name}
                          agentStatus={agent.status}
                          index={i}
                          onUpdate={updatePersona}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {catIds.map((_, i) => (
                        <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-48 animate-pulse" />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ── Clients Tab ── */}
        {tab === 'clients' && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-3">
              <ZapIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Intake-Generated Client Personas</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI builds a detailed client persona during the onboarding intake phase — including pain points,
                  goals, and business profile. Used to personalize AI executive communications.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {industryOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedIndustry(opt.key)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${selectedIndustry === opt.key ? `bg-gradient-to-br ${opt.color} border-transparent text-white` : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="max-w-sm mx-auto"
              >
                <ClientPersonaCard persona={persona} />
              </motion.div>
            </AnimatePresence>
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-sm font-bold text-white mb-3">All Client Archetypes</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industryOptions.map((opt) => {
                  const p = clientPersonas[opt.key];
                  const Icon = opt.icon;
                  const { Avatar } = p;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedIndustry(opt.key)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedIndustry === opt.key ? 'border-orange-500/40 bg-orange-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-800/30'}`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                        <Avatar />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{opt.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
