import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import {
  TreesIcon,
  WrenchIcon,
  UtensilsIcon,
  ScaleIcon,
  HeartPulseIcon,
  ShoppingBagIcon,
  CheckIcon,
  TrendingUpIcon,
  CalculatorIcon,
  BriefcaseIcon,
  HomeIcon,
  HardHatIcon,
  SmileIcon,
  BuildingIcon,
  TruckIcon,
  PackageIcon,
  ZapIcon,
  WindIcon,
  DropletsIcon,
  LightbulbIcon,
  PaletteIcon,
  LayersIcon,
  KeyIcon,
  WavesIcon,
  BugIcon,
  TriangleIcon,
  HammerIcon,
  FlameIcon,
  ShieldIcon } from
'lucide-react';
const industries = {
  // ── Specific Trades ─────────────────────────────────────────────────────────
  hvac: {
    name: 'HVAC',
    icon: WindIcon,
    color: 'from-cyan-500 to-cyan-700',
    sizes: {
      solo: {
        label: 'Solo Tech',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Job scheduling, dispatch, and customer follow-up'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for multi-tech HVAC operations'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for multi-trade HVAC operations'
      }
    },
    smeExpertise: [
    'EPA 608 certification tracking & renewal automation',
    'Seasonal tune-up scheduling & demand forecasting',
    'Refrigerant inventory management & EPA compliance',
    'Load calculation & equipment sizing automation',
    'Service agreement & maintenance contract management',
    'Warranty tracking & manufacturer claim processing'],

    outcomes: [
    '94% first-time fix rate (up from 71%) — ACCA 2024',
    '+35% jobs per technician per day',
    '50% reduction in callback/rework rate',
    '+28% revenue per truck through service agreements']

  },
  plumbing: {
    name: 'Plumbing',
    icon: DropletsIcon,
    color: 'from-blue-500 to-blue-700',
    sizes: {
      solo: {
        label: 'Solo Plumber',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Emergency dispatch and customer communication'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for residential & commercial plumbing'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for multi-crew plumbing operations'
      }
    },
    smeExpertise: [
    'Emergency dispatch routing & priority triage',
    'Permit & inspection scheduling (UPC/IPC compliance)',
    'Parts inventory management (fittings, fixtures, pipe)',
    'Water heater warranty & service agreement tracking',
    'Backflow certification & annual testing scheduling',
    'Drain camera job documentation & upsell workflows'],

    outcomes: [
    '40% faster emergency response time',
    '92% first-time fix rate (up from 68%)',
    '+30% revenue per technician through upsells',
    '60% reduction in parts delays & truck rolls']

  },
  roofing: {
    name: 'Roofing',
    icon: TriangleIcon,
    color: 'from-red-600 to-red-800',
    sizes: {
      solo: {
        label: 'Solo Contractor',
        employees: '1–5',
        team: ['AI COO', 'AI CFO'],
        description: 'Job scheduling and materials management'
      },
      small: {
        label: 'Small Crew',
        employees: '6–25',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for residential & commercial roofing'
      },
      medium: {
        label: 'Regional Company',
        employees: '26–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description:
        'Enterprise management for storm restoration & new construction'
      }
    },
    smeExpertise: [
    'Storm damage assessment & insurance claim documentation',
    'Material takeoff & waste calculation automation',
    'Subcontractor crew scheduling & payment management',
    'Manufacturer warranty registration & documentation',
    'OSHA fall protection compliance & safety monitoring',
    'Seasonal demand forecasting & crew capacity planning'],

    outcomes: [
    '+25% bid win rate through faster, accurate estimates',
    '35% faster insurance claim processing',
    '40% reduction in material waste & over-ordering',
    '+20% crew utilization through AI scheduling']

  },
  electrical: {
    name: 'Electrical',
    icon: LightbulbIcon,
    color: 'from-yellow-400 to-yellow-600',
    sizes: {
      solo: {
        label: 'Solo Electrician',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Job scheduling and permit tracking'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for residential & commercial electrical'
      },
      medium: {
        label: 'Regional Contractor',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description:
        'Enterprise management for commercial & industrial electrical'
      }
    },
    smeExpertise: [
    'NEC code compliance tracking & inspection scheduling',
    'Permit application & AHJ coordination automation',
    'Load calculation & panel sizing documentation',
    'Apprentice certification & journeyman hour tracking',
    'Material cost estimation & procurement automation',
    'Service upgrade & EV charger installation workflows'],

    outcomes: [
    '99% NEC code compliance rate on first inspection',
    '+30% jobs per electrician per day',
    '45% reduction in permit delays',
    '+25% revenue per crew through service upgrades']

  },
  generalcontracting: {
    name: 'General Contracting',
    icon: HardHatIcon,
    color: 'from-stone-500 to-stone-700',
    sizes: {
      solo: {
        label: 'Solo GC',
        employees: '1–5',
        team: ['AI COO', 'AI CFO'],
        description: 'Project scheduling and subcontractor management'
      },
      small: {
        label: 'Small GC',
        employees: '6–30',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for multi-project general contracting'
      },
      medium: {
        label: 'Regional Builder',
        employees: '31–150',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description:
        'Enterprise C-suite for complex commercial project portfolios'
      }
    },
    smeExpertise: [
    'Multi-trade subcontractor coordination & scheduling',
    'Critical path scheduling & milestone tracking',
    'Lien waiver management & payment application processing',
    'RFI, submittal & shop drawing tracking',
    'Change order documentation, pricing & approval workflows',
    'OSHA safety plan management & incident reporting'],

    outcomes: [
    '30% reduction in project cost overruns (AGC 2024)',
    '+20% bid win rate through faster, accurate estimates',
    '25% faster project completion through AI scheduling',
    '40% reduction in change order disputes']

  },
  painting: {
    name: 'Painting & Coatings',
    icon: PaletteIcon,
    color: 'from-pink-500 to-pink-700',
    sizes: {
      solo: {
        label: 'Solo Painter',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Job scheduling and customer acquisition'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO'],
        description: 'Full leadership for residential & commercial painting'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–75',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CHRO', 'AI CTO'],
        description: 'Enterprise management for multi-crew painting operations'
      }
    },
    smeExpertise: [
    'Color consultation & material estimation automation',
    'Crew scheduling & route optimization',
    'Surface prep quality control & documentation',
    'Paint inventory management & supplier pricing',
    'Weather-based scheduling & rescheduling automation',
    'Customer follow-up & referral campaign management'],

    outcomes: [
    '+35% jobs per crew through AI scheduling',
    '50% reduction in material waste & over-ordering',
    '+40% customer referral rate through follow-up automation',
    '25% faster project completion']

  },
  flooring: {
    name: 'Flooring Installation',
    icon: LayersIcon,
    color: 'from-amber-600 to-amber-800',
    sizes: {
      solo: {
        label: 'Solo Installer',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Job scheduling and material ordering'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO'],
        description: 'Full leadership for residential & commercial flooring'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–75',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CHRO', 'AI CTO'],
        description: 'Enterprise management for multi-crew flooring operations'
      }
    },
    smeExpertise: [
    'Material estimation & waste factor calculation',
    'Subfloor assessment & moisture testing documentation',
    'Installation scheduling & crew management',
    'Warranty registration & defect tracking',
    'Supplier pricing, procurement & lead time management',
    'Customer satisfaction follow-up & referral campaigns'],

    outcomes: [
    '40% reduction in material waste through AI estimation',
    '+30% installation speed through optimized scheduling',
    '95% customer satisfaction score',
    '+25% referral rate through automated follow-up']

  },
  pestcontrol: {
    name: 'Pest Control',
    icon: BugIcon,
    color: 'from-green-600 to-green-800',
    sizes: {
      solo: {
        label: 'Solo Operator',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Route optimization and recurring service management'
      },
      small: {
        label: 'Small Company',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description:
        'Full leadership for residential & commercial pest control'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description:
        'Enterprise management for multi-route pest control operations'
      }
    },
    smeExpertise: [
    'Route optimization for recurring service stops',
    'Chemical inventory management & EPA compliance tracking',
    'Treatment documentation & warranty management',
    'Seasonal pest activity forecasting & staffing',
    'Technician certification & pesticide license tracking',
    'Customer communication & recurring service automation'],

    outcomes: [
    '+40% service stops per route through AI optimization',
    '95% customer retention on recurring contracts',
    '100% EPA compliance rate — zero violations',
    '+30% recurring revenue through service agreement upsells']

  },
  poolspa: {
    name: 'Pool & Spa Services',
    icon: WavesIcon,
    color: 'from-teal-500 to-teal-700',
    sizes: {
      solo: {
        label: 'Solo Technician',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Route management and chemical tracking'
      },
      small: {
        label: 'Small Company',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO'],
        description: 'Full leadership for pool service & repair operations'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–75',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CHRO', 'AI CTO'],
        description:
        'Enterprise management for multi-route pool service operations'
      }
    },
    smeExpertise: [
    'Chemical inventory management & dosing automation',
    'Seasonal opening/closing scheduling & crew management',
    'Equipment maintenance & repair tracking',
    'Water quality documentation & health code compliance',
    'Route optimization for weekly service stops',
    'Service agreement management & renewal automation'],

    outcomes: [
    '+35% service stops per day through route optimization',
    '90% chemical accuracy reducing rework',
    '+25% service agreement renewals through automation',
    '40% reduction in equipment repair callbacks']

  },
  locksmith: {
    name: 'Locksmith & Security',
    icon: KeyIcon,
    color: 'from-slate-500 to-slate-700',
    sizes: {
      solo: {
        label: 'Solo Locksmith',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Emergency dispatch and job management'
      },
      small: {
        label: 'Small Company',
        employees: '4–15',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO'],
        description: 'Full leadership for residential & commercial locksmith'
      },
      medium: {
        label: 'Regional Company',
        employees: '16–50',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO', 'AI CTO'],
        description:
        'Enterprise management for security systems & access control'
      }
    },
    smeExpertise: [
    'Emergency dispatch routing & 24/7 call management',
    'Key & hardware inventory management',
    'Security system documentation & access control records',
    'Commercial contract management & recurring service',
    'Technician certification & bonding compliance tracking',
    'Insurance work billing & documentation workflows'],

    outcomes: [
    '30-minute average emergency response time',
    '+40% jobs per technician per day',
    '95% customer satisfaction on emergency calls',
    '+20% commercial contract revenue through follow-up']

  },
  // ── Warehousing & Trades ────────────────────────────────────────────────────
  warehousing: {
    name: 'Warehousing & Distribution',
    icon: PackageIcon,
    color: 'from-indigo-500 to-indigo-700',
    sizes: {
      solo: {
        label: 'Small Warehouse',
        employees: '5–25',
        team: ['AI COO', 'AI CFO'],
        description: 'Inventory management and labor scheduling'
      },
      small: {
        label: 'Mid-Size DC',
        employees: '26–150',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CLO', 'AI CHRO'],
        description: 'Full leadership for distribution center operations'
      },
      medium: {
        label: 'Regional 3PL',
        employees: '151–500',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise C-suite for multi-site logistics operations'
      }
    },
    smeExpertise: [
    'Inventory accuracy & cycle counting (WMS integration)',
    'Inbound/outbound dock scheduling & cross-docking',
    'Pick/pack/ship optimization & labor planning',
    'Carrier management & freight cost reduction',
    'OSHA & safety compliance monitoring',
    'Demand forecasting & safety stock management'],

    outcomes: [
    'Inventory accuracy: 99.9% vs 63% industry avg (WERC 2024)',
    'Labor cost reduction: 40% through AI scheduling',
    'Order fulfillment speed: +55%',
    'Shrinkage & loss reduction: 78%']

  },
  trades: {
    name: 'Trades (All)',
    icon: WrenchIcon,
    color: 'from-yellow-500 to-yellow-700',
    sizes: {
      solo: {
        label: 'Solo Tradesperson',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Job scheduling and customer acquisition'
      },
      small: {
        label: 'Small Crew',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for multi-crew trade business'
      },
      medium: {
        label: 'Regional Company',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for multi-trade operations'
      }
    },
    smeExpertise: [
    'Dispatch optimization & technician routing',
    'Parts inventory & procurement automation',
    'Service agreement & warranty management',
    'Seasonal demand forecasting & staffing',
    'Permit & code compliance tracking (OSHA, NEC, UPC)',
    'Customer communication & follow-up sequences'],

    outcomes: [
    '35% more jobs per technician per day (ACCA 2024)',
    '50% reduction in callback/rework rate',
    'Parts availability: 94% first-time fix rate',
    'Revenue per truck: +28%']

  },
  // ── Financial Services ──────────────────────────────────────────────────────
  financial: {
    name: 'Financial Advisory',
    icon: TrendingUpIcon,
    color: 'from-emerald-500 to-emerald-700',
    sizes: {
      solo: {
        label: 'Solo RIA',
        employees: '1–3',
        team: ['AI COO', 'AI CMO', 'AI CFO'],
        description: 'Compliance, client reporting, and prospect pipeline'
      },
      small: {
        label: 'Small Practice',
        employees: '4–15',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for growing AUM and client base'
      },
      medium: {
        label: 'Mid-Size RIA',
        employees: '16–75',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise C-suite for multi-advisor operations'
      }
    },
    smeExpertise: [
    'AUM tracking and portfolio rebalancing alerts',
    'SEC/FINRA compliance monitoring',
    'Client reporting automation (quarterly/annual)',
    'Fee billing and invoice management',
    'Prospect pipeline and CRM workflows',
    'Risk tolerance profiling and suitability'],

    outcomes: [
    'Increase AUM by 30% through better prospecting',
    'Reduce compliance overhead by 50%',
    'Improve client retention to 95%',
    'Cut reporting preparation time by 60%']

  },
  accounting: {
    name: 'Accounting & CPA',
    icon: CalculatorIcon,
    color: 'from-blue-600 to-blue-800',
    sizes: {
      solo: {
        label: 'Solo CPA',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Client management and deadline tracking'
      },
      small: {
        label: 'Small Firm',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for tax season and advisory growth'
      },
      medium: {
        label: 'Regional Firm',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for multi-service practice'
      }
    },
    smeExpertise: [
    'Tax deadline management and client reminders',
    'Document collection and e-signature workflows',
    'Billing, AR, and collections automation',
    'Staff utilization and capacity planning',
    'IRS correspondence tracking',
    'Audit scheduling and workpaper management'],

    outcomes: [
    'Reduce tax season overtime by 40%',
    'Increase billable utilization to 85%',
    'Improve client retention to 92%',
    'Cut document chase time by 70%']

  },
  investment: {
    name: 'Investment Banking',
    icon: BriefcaseIcon,
    color: 'from-slate-600 to-slate-800',
    sizes: {
      solo: {
        label: 'Boutique (3–10)',
        employees: '3–10',
        team: ['AI COO', 'AI CFO', 'AI CLO'],
        description: 'Deal pipeline, compliance, and investor reporting'
      },
      small: {
        label: 'Small Bank',
        employees: '11–30',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full C-suite for deal origination and execution'
      },
      medium: {
        label: 'Mid-Market',
        employees: '31–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for complex deal operations'
      }
    },
    smeExpertise: [
    'Deal pipeline management and CRM',
    'Due diligence workflow coordination',
    'LP and investor reporting automation',
    'Regulatory compliance (SEC, FINRA, CFTC)',
    'Pitch deck and materials management',
    'Fee tracking and carried interest calculations'],

    outcomes: [
    'Accelerate deal cycle by 35%',
    'Improve LP reporting efficiency by 60%',
    'Reduce compliance overhead by 45%',
    'Increase deal flow by 25%']

  },
  realestate: {
    name: 'Real Estate',
    icon: HomeIcon,
    color: 'from-amber-500 to-amber-700',
    sizes: {
      solo: {
        label: 'Solo Agent',
        employees: '1–2',
        team: ['AI COO', 'AI CMO'],
        description: 'Lead nurturing and transaction coordination'
      },
      small: {
        label: 'Small Team',
        employees: '3–15',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO'],
        description: 'Full leadership for team growth and listings'
      },
      medium: {
        label: 'Regional Brokerage',
        employees: '16–100',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CHRO', 'AI CTO'],
        description: 'Enterprise management for multi-office operations'
      }
    },
    smeExpertise: [
    'Listing management and MLS automation',
    'Lead scoring and follow-up sequences',
    'Transaction coordination and deadline tracking',
    'Commission tracking and splits',
    'Market analysis and pricing reports',
    'Client relationship and referral management'],

    outcomes: [
    'Increase listings by 40%',
    'Reduce transaction cycle time by 25%',
    'Improve lead-to-close conversion by 35%',
    'Boost referral rate by 50%']

  },
  construction: {
    name: 'Construction',
    icon: HammerIcon,
    color: 'from-orange-500 to-orange-700',
    sizes: {
      solo: {
        label: 'Solo Contractor',
        employees: '1–5',
        team: ['AI COO', 'AI CFO'],
        description: 'Job scheduling and cash flow management'
      },
      small: {
        label: 'Small GC',
        employees: '6–25',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CLO'],
        description: 'Full leadership for multi-project operations'
      },
      medium: {
        label: 'Regional Builder',
        employees: '26–150',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise C-suite for complex project portfolios'
      }
    },
    smeExpertise: [
    'Project scheduling and milestone tracking',
    'Subcontractor management and payments',
    'Materials procurement and cost tracking',
    'Change order documentation and approval',
    'OSHA safety compliance monitoring',
    'Bid management and win/loss analysis'],

    outcomes: [
    'Reduce project cost overruns by 30%',
    'Improve bid win rate by 20%',
    'Cut materials waste by 25%',
    'Increase crew utilization by 35%']

  },
  dental: {
    name: 'Dental Practice',
    icon: SmileIcon,
    color: 'from-sky-500 to-sky-700',
    sizes: {
      solo: {
        label: 'Solo Dentist',
        employees: '2–5',
        team: ['AI COO', 'AI CFO'],
        description: 'Scheduling, billing, and patient recall'
      },
      small: {
        label: 'Group Practice',
        employees: '6–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO', 'AI CHRO'],
        description: 'Full leadership for multi-provider growth'
      },
      medium: {
        label: 'DSO Group',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CHRO',
        'AI CLO',
        'AI CTO'],

        description: 'Enterprise management for dental group operations'
      }
    },
    smeExpertise: [
    'Patient scheduling and chair utilization',
    'Insurance verification and pre-authorization',
    'Treatment plan follow-up and case acceptance',
    'Recall campaign automation',
    'HIPAA compliance and audit readiness',
    'Revenue cycle and collections management'],

    outcomes: [
    'Reduce no-shows by 45%',
    'Increase case acceptance by 30%',
    'Improve collections rate by 25%',
    'Boost patient retention to 90%']

  },
  landscaping: {
    name: 'Landscaping',
    icon: TreesIcon,
    color: 'from-green-500 to-green-600',
    sizes: {
      solo: {
        label: 'Solo Operator',
        employees: '1–2',
        team: ['AI COO', 'AI CMO'],
        description: 'Focus on operations and customer acquisition'
      },
      small: {
        label: 'Small Crew',
        employees: '3–10',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO'],
        description: 'Full leadership for scaling operations'
      },
      medium: {
        label: 'Regional Company',
        employees: '11–50',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CHRO', 'AI PM'],
        description: 'Complete management team for multi-crew operations'
      }
    },
    smeExpertise: [
    'Seasonal demand forecasting',
    'Equipment maintenance scheduling',
    'Route optimization for crews',
    'Weather-based planning',
    'Customer retention strategies',
    'Pricing for residential vs commercial'],

    outcomes: [
    'Optimize crew schedules by 40%',
    'Increase customer retention to 85%',
    'Reduce equipment downtime by 60%',
    'Boost seasonal revenue by 35%']

  },
  autobody: {
    name: 'Auto Body Shop',
    icon: WrenchIcon,
    color: 'from-blue-500 to-blue-600',
    sizes: {
      solo: {
        label: 'Single Bay',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Streamline operations and marketing'
      },
      small: {
        label: 'Multi-Bay Shop',
        employees: '4–15',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO'],
        description: 'Full leadership for growth'
      },
      medium: {
        label: 'Multi-Location',
        employees: '16–75',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CHRO', 'AI CXO'],
        description: 'Enterprise management across locations'
      }
    },
    smeExpertise: [
    'Insurance claim processing',
    'Parts inventory management',
    'Technician scheduling',
    'Quality control workflows',
    'Customer communication automation',
    'Warranty tracking'],

    outcomes: [
    'Reduce claim processing time by 50%',
    'Increase bay utilization to 90%',
    'Improve customer satisfaction to 4.8/5',
    'Cut parts waste by 30%']

  },
  restaurant: {
    name: 'Restaurant',
    icon: UtensilsIcon,
    color: 'from-red-500 to-red-600',
    sizes: {
      solo: {
        label: 'Single Location',
        employees: '5–20',
        team: ['AI COO', 'AI CMO', 'AI CFO'],
        description: 'Operations, marketing, and finances'
      },
      small: {
        label: 'Small Chain',
        employees: '21–100',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CHRO'],
        description: 'Full leadership for multi-location growth'
      },
      medium: {
        label: 'Regional Chain',
        employees: '101–500',
        team: [
        'AI CEO',
        'AI COO',
        'AI CMO',
        'AI CFO',
        'AI CHRO',
        'AI CXO',
        'AI CTO'],

        description: 'Complete C-suite for regional operations'
      }
    },
    smeExpertise: [
    'Menu pricing optimization',
    'Inventory & food cost management',
    'Staff scheduling & labor costs',
    'Customer experience tracking',
    'Health & safety compliance',
    'Delivery & online ordering'],

    outcomes: [
    'Reduce food waste by 25%',
    'Optimize labor costs by 20%',
    'Increase table turnover by 15%',
    'Boost online orders by 45%']

  },
  lawfirm: {
    name: 'Law Firm',
    icon: ScaleIcon,
    color: 'from-purple-500 to-purple-600',
    sizes: {
      solo: {
        label: 'Solo Practice',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Case management and client acquisition'
      },
      small: {
        label: 'Small Firm',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO'],
        description: 'Full leadership for growing practice'
      },
      medium: {
        label: 'Mid-Size Firm',
        employees: '21–100',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CHRO', 'AI CTO'],
        description: 'Enterprise management for complex operations'
      }
    },
    smeExpertise: [
    'Case intake & qualification',
    'Billable hours tracking',
    'Client communication workflows',
    'Document management',
    'Compliance & ethics tracking',
    'Practice area analytics'],

    outcomes: [
    'Increase billable hours by 30%',
    'Improve case win rate by 15%',
    'Reduce admin time by 50%',
    'Boost client satisfaction to 95%']

  },
  medical: {
    name: 'Medical Practice',
    icon: HeartPulseIcon,
    color: 'from-rose-500 to-rose-600',
    sizes: {
      solo: {
        label: 'Solo Practitioner',
        employees: '2–5',
        team: ['AI COO', 'AI CFO'],
        description: 'Operations and billing optimization'
      },
      small: {
        label: 'Group Practice',
        employees: '6–25',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CHRO'],
        description: 'Full leadership for multi-provider practice'
      },
      medium: {
        label: 'Medical Group',
        employees: '26–150',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CHRO', 'AI CXO', 'AI CTO'],
        description: 'Complete C-suite for healthcare organization'
      }
    },
    smeExpertise: [
    'Patient scheduling optimization',
    'Insurance billing & coding',
    'HIPAA compliance tracking',
    'Provider credentialing',
    'Patient experience management',
    'Revenue cycle management'],

    outcomes: [
    'Reduce no-shows by 40%',
    'Increase collections by 25%',
    'Improve patient satisfaction to 4.9/5',
    'Cut admin overhead by 35%']

  },
  ecommerce: {
    name: 'E-commerce',
    icon: ShoppingBagIcon,
    color: 'from-cyan-500 to-cyan-600',
    sizes: {
      solo: {
        label: 'Solopreneur',
        employees: '1–2',
        team: ['AI CMO', 'AI COO'],
        description: 'Marketing and fulfillment focus'
      },
      small: {
        label: 'Growing Store',
        employees: '3–15',
        team: ['AI CEO', 'AI CMO', 'AI COO', 'AI CFO'],
        description: 'Full leadership for scaling'
      },
      medium: {
        label: 'Multi-Channel Brand',
        employees: '16–100',
        team: ['AI CEO', 'AI CMO', 'AI COO', 'AI CFO', 'AI CTO', 'AI Product'],
        description: 'Complete team for omnichannel growth'
      }
    },
    smeExpertise: [
    'Conversion rate optimization',
    'Inventory forecasting',
    'Customer acquisition costs',
    'Email & SMS marketing',
    'Fulfillment & logistics',
    'Product pricing strategy'],

    outcomes: [
    'Increase conversion rate by 35%',
    'Reduce CAC by 40%',
    'Boost LTV by 60%',
    'Improve fulfillment speed by 50%']

  },
  logistics: {
    name: 'Logistics & Freight',
    icon: TruckIcon,
    color: 'from-indigo-500 to-indigo-700',
    sizes: {
      solo: {
        label: 'Owner-Operator',
        employees: '1–3',
        team: ['AI COO', 'AI CFO'],
        description: 'Route optimization and load management'
      },
      small: {
        label: 'Small Fleet',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CFO', 'AI CMO'],
        description: 'Full leadership for fleet and customer growth'
      },
      medium: {
        label: 'Regional Carrier',
        employees: '21–150',
        team: [
        'AI CEO',
        'AI COO',
        'AI CFO',
        'AI CMO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise C-suite for complex logistics operations'
      }
    },
    smeExpertise: [
    'Route optimization and fuel cost reduction',
    'Load board management and freight matching',
    'Driver scheduling and HOS compliance',
    'Customer invoicing and collections',
    'DOT compliance and safety monitoring',
    'Fleet maintenance scheduling'],

    outcomes: [
    'Reduce fuel costs by 18%',
    'Improve on-time delivery to 97%',
    'Cut empty miles by 30%',
    'Increase revenue per truck by 25%']

  },
  staffing: {
    name: 'Staffing Agency',
    icon: BuildingIcon,
    color: 'from-violet-500 to-violet-700',
    sizes: {
      solo: {
        label: 'Boutique Recruiter',
        employees: '1–3',
        team: ['AI COO', 'AI CMO'],
        description: 'Candidate pipeline and client acquisition'
      },
      small: {
        label: 'Small Agency',
        employees: '4–20',
        team: ['AI CEO', 'AI COO', 'AI CMO', 'AI CFO', 'AI CLO'],
        description: 'Full leadership for placement volume growth'
      },
      medium: {
        label: 'Regional Agency',
        employees: '21–100',
        team: [
        'AI CEO',
        'AI COO',
        'AI CMO',
        'AI CFO',
        'AI CLO',
        'AI CHRO',
        'AI CTO'],

        description: 'Enterprise management for multi-vertical staffing'
      }
    },
    smeExpertise: [
    'Candidate sourcing and ATS management',
    'Client relationship and job order tracking',
    'Payroll and contractor billing',
    'Compliance (I-9, E-Verify, workers comp)',
    'Placement fee tracking and forecasting',
    'Recruiter performance analytics'],

    outcomes: [
    'Increase placement rate by 35%',
    'Reduce time-to-fill by 40%',
    'Improve client retention to 88%',
    'Boost revenue per recruiter by 30%']

  }
};
type IndustryKey = keyof typeof industries;
type SizeKey = 'solo' | 'small' | 'medium';
// Group industries for display
const industryGroups = [
{
  label: 'Specific Trades',
  keys: [
  'hvac',
  'plumbing',
  'electrical',
  'roofing',
  'generalcontracting',
  'painting',
  'flooring',
  'pestcontrol',
  'poolspa',
  'locksmith'] as
  IndustryKey[],
  color: 'text-orange-600'
},
{
  label: 'Field Services & Construction',
  keys: [
  'trades',
  'construction',
  'landscaping',
  'autobody',
  'warehousing'] as
  IndustryKey[],
  color: 'text-amber-600'
},
{
  label: 'Financial Services',
  keys: ['financial', 'accounting', 'investment'] as IndustryKey[],
  color: 'text-emerald-600'
},
{
  label: 'Healthcare',
  keys: ['medical', 'dental'] as IndustryKey[],
  color: 'text-rose-600'
},
{
  label: 'Professional Services',
  keys: ['lawfirm', 'staffing'] as IndustryKey[],
  color: 'text-purple-600'
},
{
  label: 'Commerce & Logistics',
  keys: [
  'restaurant',
  'ecommerce',
  'realestate',
  'logistics'] as
  IndustryKey[],
  color: 'text-blue-600'
}];

export function IndustryFrames() {
  const [activeIndustry, setActiveIndustry] = useState<IndustryKey>('financial');
  const [activeSize, setActiveSize] = useState<SizeKey>('small');
  const industry = industries[activeIndustry];
  const size = industry.sizes[activeSize];
  const Icon = industry.icon;
  return (
    <section className="w-full bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-16">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="inline-flex items-center gap-2 bg-electric-50 border border-electric-200 rounded-full px-4 py-2 mb-6">

            <span className="text-sm font-bold text-electric-700">
              26+ Verticals · Industry-Specific AI Teams
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Built for Your Industry,
            <br />
            <span className="text-accent-600">Not Generic AI</span>
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            From investment banking to landscaping — each AI executive team is
            pre-trained on your industry's workflows, compliance requirements,
            and success metrics.
          </p>
        </motion.div>

        {/* Grouped Industry Selector */}
        <div className="space-y-4 mb-10">
          {industryGroups.map((group, gi) =>
          <motion.div
            key={group.label}
            initial={{
              opacity: 0,
              y: 10
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: gi * 0.08
            }}>

              <p
              className={`text-xs font-bold uppercase tracking-widest mb-2 ${group.color}`}>

                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.keys.map((key) => {
                const ind = industries[key];
                const IndIcon = ind.icon;
                const isActive = activeIndustry === key;
                return (
                  <motion.button
                    key={key}
                    whileTap={{
                      scale: 0.95
                    }}
                    onClick={() => {
                      setActiveIndustry(key);
                      setActiveSize('small');
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${isActive ? `bg-gradient-to-br ${ind.color} text-white shadow-md border-transparent` : 'bg-white border-primary-200 text-primary-700 hover:border-accent-300 hover:bg-accent-50'}`}>

                      <IndIcon className="w-4 h-4 flex-shrink-0" />
                      <span>{ind.name}</span>
                    </motion.button>);

              })}
              </div>
            </motion.div>
          )}
        </div>

        {/* Size Selector */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-primary-100 rounded-xl p-1.5 relative shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-lg shadow-md"
              initial={false}
              animate={{
                left:
                activeSize === 'solo' ?
                '6px' :
                activeSize === 'small' ?
                '33.33%' :
                '66.66%',
                right:
                activeSize === 'solo' ?
                '66.66%' :
                activeSize === 'small' ?
                '33.33%' :
                '6px'
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
              }} />

            {(['solo', 'small', 'medium'] as SizeKey[]).map((sizeKey) =>
            <button
              key={sizeKey}
              onClick={() => setActiveSize(sizeKey)}
              className={`relative z-10 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${activeSize === sizeKey ? 'text-primary-900' : 'text-primary-600 hover:text-primary-900'}`}>

                {industry.sizes[sizeKey].label}
              </button>
            )}
          </div>
        </div>

        {/* Industry Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeIndustry}-${activeSize}`}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -20
            }}
            transition={{
              duration: 0.4
            }}>

            {/* Header */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.1,
                duration: 0.3
              }}
              className="mb-8 flex items-center justify-center gap-4">

              <div
                className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center shadow-lg`}>

                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary-900">
                  {industry.name}
                </h3>
                <p className="text-primary-600">
                  {size.label} · {size.employees} employees
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* AI Leadership Team */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4
                }}>

                <Card className="h-full border-2 border-accent-200 bg-gradient-to-br from-white to-accent-50/30 shadow-lg">
                  <h4 className="text-lg font-bold text-primary-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-500 rounded-full" />
                    Your AI Leadership Team
                  </h4>
                  <p className="text-sm text-primary-600 mb-4">
                    {size.description}
                  </p>
                  <div className="space-y-3">
                    {size.team.map((exec, index) =>
                    <motion.div
                      key={exec}
                      initial={{
                        opacity: 0,
                        x: -10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: 0.3
                      }}
                      className="flex items-center gap-2 text-primary-700 font-medium">

                        <CheckIcon className="w-4 h-4 text-accent-600 flex-shrink-0" />
                        <span>{exec}</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* SME Expertise */}
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
                  delay: 0.3,
                  duration: 0.4
                }}>

                <Card className="h-full border border-primary-200 bg-gradient-to-br from-white to-electric-50/30">
                  <h4 className="text-lg font-bold text-primary-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-electric-500 rounded-full" />
                    Industry SME Expertise
                  </h4>
                  <p className="text-sm text-primary-600 mb-4">
                    Specialized knowledge for {industry.name.toLowerCase()}
                  </p>
                  <div className="space-y-2">
                    {industry.smeExpertise.map((expertise, index) =>
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        scale: 0.9
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.3
                      }}
                      className="flex items-start gap-2 text-sm text-primary-700">

                        <div className="w-1.5 h-1.5 bg-electric-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span>{expertise}</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Expected Outcomes */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.4
                }}>

                <Card className="h-full bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200">
                  <h4 className="text-lg font-bold text-primary-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full" />
                    Expected Outcomes
                  </h4>
                  <p className="text-sm text-primary-600 mb-4">
                    Measurable results for your business
                  </p>
                  <div className="space-y-3">
                    {industry.outcomes.map((outcome, index) =>
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: 10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.5 + index * 0.05,
                        duration: 0.3
                      }}
                      className="flex items-start gap-2 text-primary-700">

                        <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{outcome}</span>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* TAM callout */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6,
            delay: 0.4
          }}
          className="mt-12">

          <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200 shadow-depth-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-primary-900 mb-2">
                26 Industries at Launch. 47 Verticals by 2027.
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto">
                Financial services, healthcare, professional services, trades,
                and commerce — each vertical pre-trained with industry-specific
                SME knowledge and compliance frameworks.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {industryGroups.map((group) =>
              <div
                key={group.label}
                className="text-center bg-white rounded-xl p-3 border border-primary-100">

                  <p className={`text-xs font-bold ${group.color} mb-1`}>
                    {group.label}
                  </p>
                  <p className="text-sm font-semibold text-primary-700">
                    {group.keys.length} verticals
                  </p>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}