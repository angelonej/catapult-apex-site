import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadioIcon,
  WifiIcon,
  WifiOffIcon,
  MapPinIcon,
  RefreshCwIcon,
  SettingsIcon,
  PlusIcon,
  ZapIcon,
  MicIcon,
  ScanIcon,
  ActivityIcon,
  BrainIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  LockIcon,
  PackageIcon,
  DollarSignIcon,
  UsersIcon,
  TrendingUpIcon,
  ShieldIcon,
  CpuIcon,
  TargetIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SendIcon } from
'lucide-react';
// ─── Types ─────────────────────────────────────────────────────────────────────
type HubTab = 'beacons' | 'offload' | 'flow' | 'activity';
type TriggerType = 'voice' | 'scan' | 'proximity' | 'sensor' | 'manual';
type Priority = 'critical' | 'high' | 'medium' | 'low';
type BeaconTask = {
  id: string;
  name: string;
  description: string;
  trigger: TriggerType;
  category: string;
  assignedExec: string;
  execRole: string;
  execColor: string;
  execBg: string;
  execBorder: string;
  priority: Priority;
  enabled: boolean;
  offloadCount: number;
  timeSaved: string;
};
type ActivityEvent = {
  id: string;
  beaconId: string;
  beaconName: string;
  task: string;
  exec: string;
  execColor: string;
  execBg: string;
  trigger: TriggerType;
  outcome: string;
  time: string;
  status: 'completed' | 'processing' | 'pending';
};
// ─── Beacon Data ───────────────────────────────────────────────────────────────
const beaconData = [
{
  id: 'GB-001',
  name: 'Main Warehouse Floor',
  location: 'Building A, Zone 1',
  status: 'online' as const,
  signal: 98,
  lastSync: '12 sec ago',
  packets: 847,
  battery: 94,
  tasksActive: 12,
  industry: 'warehousing'
},
{
  id: 'GB-002',
  name: 'Receiving Dock',
  location: 'Building A, Dock B',
  status: 'online' as const,
  signal: 91,
  lastSync: '28 sec ago',
  packets: 412,
  battery: 87,
  tasksActive: 8,
  industry: 'warehousing'
},
{
  id: 'GB-003',
  name: 'Cold Storage Unit',
  location: 'Building B, Level 1',
  status: 'online' as const,
  signal: 76,
  lastSync: '1 min ago',
  packets: 203,
  battery: 72,
  tasksActive: 5,
  industry: 'warehousing'
},
{
  id: 'GB-004',
  name: 'Executive Office',
  location: 'HQ, Floor 3',
  status: 'online' as const,
  signal: 99,
  lastSync: '8 sec ago',
  packets: 1204,
  battery: 100,
  tasksActive: 18,
  industry: 'executive'
},
{
  id: 'GB-005',
  name: 'Loading Bay 2',
  location: 'Building C, Bay 2',
  status: 'offline' as const,
  signal: 0,
  lastSync: '4 hrs ago',
  packets: 89,
  battery: 12,
  tasksActive: 0,
  industry: 'warehousing'
},
{
  id: 'GB-006',
  name: 'Dispatch Office',
  location: 'Building A, Office',
  status: 'online' as const,
  signal: 88,
  lastSync: '45 sec ago',
  packets: 631,
  battery: 81,
  tasksActive: 9,
  industry: 'logistics'
}];

// ─── Task Offload Catalog ──────────────────────────────────────────────────────
const taskCatalog: BeaconTask[] = [
// ── OPERATIONS (COO - Orion) ──
{
  id: 'op-01',
  name: 'Inventory Cycle Count',
  description:
  'Scan barcode → COO auto-reconciles stock levels, flags discrepancies, updates WMS',
  trigger: 'scan',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 284,
  timeSaved: '4.2 hrs/day'
},
{
  id: 'op-02',
  name: 'Dock Arrival Alert',
  description:
  'Proximity trigger when truck arrives → COO schedules crew, opens dock, notifies receiving team',
  trigger: 'proximity',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 156,
  timeSaved: '1.8 hrs/day'
},
{
  id: 'op-03',
  name: 'Shift Handoff Report',
  description:
  'Voice command → COO generates shift summary, flags open issues, briefs incoming supervisor',
  trigger: 'voice',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 98,
  timeSaved: '45 min/day'
},
{
  id: 'op-04',
  name: 'Pick/Pack/Ship Confirmation',
  description:
  'Scan order barcode → COO verifies accuracy, triggers shipping label, updates customer',
  trigger: 'scan',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 512,
  timeSaved: '6.1 hrs/day'
},
{
  id: 'op-05',
  name: 'Labor Scheduling Request',
  description:
  'Voice request → COO analyzes workload, adjusts crew assignments, sends updated schedule',
  trigger: 'voice',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 67,
  timeSaved: '1.2 hrs/day'
},
{
  id: 'op-06',
  name: 'Equipment Downtime Alert',
  description:
  'Sensor detects equipment stop → COO logs downtime, dispatches maintenance, reroutes workflow',
  trigger: 'sensor',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 23,
  timeSaved: '2.4 hrs/event'
},
{
  id: 'op-07',
  name: 'Cross-Dock Coordination',
  description:
  'Scan inbound manifest → COO auto-routes freight to outbound dock, eliminates storage',
  trigger: 'scan',
  category: 'Operations',
  assignedExec: 'Orion',
  execRole: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  execBorder: 'border-green-500/30',
  priority: 'high',
  enabled: false,
  offloadCount: 0,
  timeSaved: '3.5 hrs/day'
},
// ── FINANCE (CFO - Felix) ──
{
  id: 'fi-01',
  name: 'Invoice Approval Request',
  description:
  'Voice command → CFO reviews invoice, checks budget, approves or flags for owner review',
  trigger: 'voice',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 189,
  timeSaved: '2.1 hrs/day'
},
{
  id: 'fi-02',
  name: 'Expense Receipt Capture',
  description:
  'Scan receipt → CFO categorizes expense, checks policy compliance, posts to accounting',
  trigger: 'scan',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 341,
  timeSaved: '1.5 hrs/day'
},
{
  id: 'fi-03',
  name: 'Cash Register Reconciliation',
  description:
  'End-of-day sensor trigger → CFO reconciles POS data, flags variances, posts journal entry',
  trigger: 'sensor',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 94,
  timeSaved: '45 min/day'
},
{
  id: 'fi-04',
  name: 'Purchase Order Approval',
  description:
  'Voice command → CFO checks budget availability, vendor terms, approves PO up to threshold',
  trigger: 'voice',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 127,
  timeSaved: '1.8 hrs/day'
},
{
  id: 'fi-05',
  name: 'Payroll Exception Flag',
  description:
  'Proximity clock-in anomaly → CFO/CHRO review overtime, missing punches, flags for correction',
  trigger: 'proximity',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 56,
  timeSaved: '30 min/day'
},
{
  id: 'fi-06',
  name: 'Vendor Payment Trigger',
  description:
  'Scan delivery confirmation → CFO verifies receipt, schedules payment, updates AP aging',
  trigger: 'scan',
  category: 'Finance',
  assignedExec: 'Felix',
  execRole: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  execBorder: 'border-blue-500/30',
  priority: 'medium',
  enabled: false,
  offloadCount: 0,
  timeSaved: '1.1 hrs/day'
},
// ── SALES (CSO - Sage) ──
{
  id: 'sa-01',
  name: 'Lead Capture from Business Card',
  description:
  'Scan business card → CSO creates CRM contact, scores lead, triggers follow-up sequence',
  trigger: 'scan',
  category: 'Sales',
  assignedExec: 'Sage',
  execRole: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  execBorder: 'border-orange-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 203,
  timeSaved: '2.8 hrs/day'
},
{
  id: 'sa-02',
  name: 'Deal Status Voice Update',
  description:
  'Voice note → CSO updates CRM opportunity, adjusts forecast, triggers next action',
  trigger: 'voice',
  category: 'Sales',
  assignedExec: 'Sage',
  execRole: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  execBorder: 'border-orange-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 178,
  timeSaved: '1.9 hrs/day'
},
{
  id: 'sa-03',
  name: 'At-Risk Account Alert',
  description:
  'Sensor detects low engagement → CSO initiates retention sequence, schedules check-in call',
  trigger: 'sensor',
  category: 'Sales',
  assignedExec: 'Sage',
  execRole: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  execBorder: 'border-orange-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 34,
  timeSaved: '3.2 hrs/event'
},
{
  id: 'sa-04',
  name: 'Quote Generation Request',
  description:
  'Voice command → CSO pulls pricing, applies discount rules, generates and sends quote',
  trigger: 'voice',
  category: 'Sales',
  assignedExec: 'Sage',
  execRole: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  execBorder: 'border-orange-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 89,
  timeSaved: '1.4 hrs/day'
},
{
  id: 'sa-05',
  name: 'Contract Renewal Trigger',
  description:
  'Proximity at client site → CSO reviews contract terms, prepares renewal proposal, alerts owner',
  trigger: 'proximity',
  category: 'Sales',
  assignedExec: 'Sage',
  execRole: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  execBorder: 'border-orange-500/30',
  priority: 'high',
  enabled: false,
  offloadCount: 0,
  timeSaved: '2.5 hrs/event'
},
// ── MARKETING (CMO - Maya) ──
{
  id: 'mk-01',
  name: 'Customer Feedback Capture',
  description:
  'Voice note at job site → CMO logs feedback, updates NPS, triggers review request if positive',
  trigger: 'voice',
  category: 'Marketing',
  assignedExec: 'Maya',
  execRole: 'CMO',
  execColor: 'text-pink-400',
  execBg: 'bg-pink-500/20',
  execBorder: 'border-pink-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 145,
  timeSaved: '1.2 hrs/day'
},
{
  id: 'mk-02',
  name: 'Event Attendance Tracking',
  description:
  'Proximity at trade show → CMO logs attendance, captures context, triggers follow-up campaign',
  trigger: 'proximity',
  category: 'Marketing',
  assignedExec: 'Maya',
  execRole: 'CMO',
  execColor: 'text-pink-400',
  execBg: 'bg-pink-500/20',
  execBorder: 'border-pink-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 67,
  timeSaved: '45 min/event'
},
{
  id: 'mk-03',
  name: 'Competitor Intel Note',
  description:
  'Voice note → CMO/CEO logs competitive intelligence, updates positioning, flags strategy review',
  trigger: 'voice',
  category: 'Marketing',
  assignedExec: 'Maya',
  execRole: 'CMO',
  execColor: 'text-pink-400',
  execBg: 'bg-pink-500/20',
  execBorder: 'border-pink-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 42,
  timeSaved: '30 min/day'
},
{
  id: 'mk-04',
  name: 'Campaign Performance Alert',
  description:
  'Sensor detects conversion drop → CMO pauses underperforming ads, reallocates budget',
  trigger: 'sensor',
  category: 'Marketing',
  assignedExec: 'Maya',
  execRole: 'CMO',
  execColor: 'text-pink-400',
  execBg: 'bg-pink-500/20',
  execBorder: 'border-pink-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 28,
  timeSaved: '2.1 hrs/event'
},
// ── LEGAL/COMPLIANCE (CLO - Lex) ──
{
  id: 'le-01',
  name: 'Safety Inspection Trigger',
  description:
  'Proximity in hazard zone → CLO initiates safety checklist, logs inspection, alerts supervisor',
  trigger: 'proximity',
  category: 'Compliance',
  assignedExec: 'Lex',
  execRole: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  execBorder: 'border-cyan-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 312,
  timeSaved: '3.8 hrs/day'
},
{
  id: 'le-02',
  name: 'Incident Documentation',
  description:
  'Voice report → CLO creates incident record, initiates investigation protocol, notifies insurance',
  trigger: 'voice',
  category: 'Compliance',
  assignedExec: 'Lex',
  execRole: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  execBorder: 'border-cyan-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 18,
  timeSaved: '4.5 hrs/event'
},
{
  id: 'le-03',
  name: 'Document Signing Request',
  description:
  'Scan document QR → CLO verifies parties, routes for e-signature, logs to compliance record',
  trigger: 'scan',
  category: 'Compliance',
  assignedExec: 'Lex',
  execRole: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  execBorder: 'border-cyan-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 94,
  timeSaved: '1.6 hrs/day'
},
{
  id: 'le-04',
  name: 'License/Permit Renewal Alert',
  description:
  'Sensor detects expiry approaching → CLO initiates renewal process, tracks status, alerts owner',
  trigger: 'sensor',
  category: 'Compliance',
  assignedExec: 'Lex',
  execRole: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  execBorder: 'border-cyan-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 47,
  timeSaved: '2.2 hrs/event'
},
{
  id: 'le-05',
  name: 'OSHA Compliance Check',
  description:
  'Proximity in work zone → CLO runs compliance checklist, flags violations, schedules corrections',
  trigger: 'proximity',
  category: 'Compliance',
  assignedExec: 'Lex',
  execRole: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  execBorder: 'border-cyan-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 156,
  timeSaved: '2.9 hrs/day'
},
// ── PEOPLE/HR (CHRO - Hana) ──
{
  id: 'hr-01',
  name: 'Employee Check-In',
  description:
  'Proximity clock-in → CHRO logs attendance, tracks hours, flags schedule deviations',
  trigger: 'proximity',
  category: 'People & HR',
  assignedExec: 'Hana',
  execRole: 'CHRO',
  execColor: 'text-rose-400',
  execBg: 'bg-rose-500/20',
  execBorder: 'border-rose-500/30',
  priority: 'medium',
  enabled: false,
  offloadCount: 0,
  timeSaved: '1.5 hrs/day'
},
{
  id: 'hr-02',
  name: 'Performance Note Capture',
  description:
  'Voice note → CHRO logs observation, updates employee record, flags for review cycle',
  trigger: 'voice',
  category: 'People & HR',
  assignedExec: 'Hana',
  execRole: 'CHRO',
  execColor: 'text-rose-400',
  execBg: 'bg-rose-500/20',
  execBorder: 'border-rose-500/30',
  priority: 'medium',
  enabled: false,
  offloadCount: 0,
  timeSaved: '30 min/day'
},
{
  id: 'hr-03',
  name: 'Training Completion Scan',
  description:
  'Scan training certificate → CHRO updates skills matrix, triggers next training module',
  trigger: 'scan',
  category: 'People & HR',
  assignedExec: 'Hana',
  execRole: 'CHRO',
  execColor: 'text-rose-400',
  execBg: 'bg-rose-500/20',
  execBorder: 'border-rose-500/30',
  priority: 'low',
  enabled: false,
  offloadCount: 0,
  timeSaved: '20 min/event'
},
// ── TECHNOLOGY (CTO - Theo) ──
{
  id: 'te-01',
  name: 'Equipment Maintenance Schedule',
  description:
  'Sensor detects wear pattern → CTO schedules preventive maintenance, orders parts, notifies tech',
  trigger: 'sensor',
  category: 'Technology',
  assignedExec: 'Theo',
  execRole: 'CTO',
  execColor: 'text-purple-400',
  execBg: 'bg-purple-500/20',
  execBorder: 'border-purple-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 89,
  timeSaved: '2.3 hrs/day'
},
{
  id: 'te-02',
  name: 'Network/System Alert',
  description:
  'Sensor detects connectivity issue → CTO diagnoses, reroutes traffic, escalates if needed',
  trigger: 'sensor',
  category: 'Technology',
  assignedExec: 'Theo',
  execRole: 'CTO',
  execColor: 'text-purple-400',
  execBg: 'bg-purple-500/20',
  execBorder: 'border-purple-500/30',
  priority: 'critical',
  enabled: true,
  offloadCount: 34,
  timeSaved: '3.1 hrs/event'
},
{
  id: 'te-03',
  name: 'Device Provisioning',
  description:
  'Scan new device → CTO configures, enrolls in MDM, assigns to user, sets security policy',
  trigger: 'scan',
  category: 'Technology',
  assignedExec: 'Theo',
  execRole: 'CTO',
  execColor: 'text-purple-400',
  execBg: 'bg-purple-500/20',
  execBorder: 'border-purple-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 28,
  timeSaved: '1.8 hrs/event'
},
{
  id: 'te-04',
  name: 'Software Update Approval',
  description:
  'Voice command → CTO reviews update, checks compatibility, schedules deployment window',
  trigger: 'voice',
  category: 'Technology',
  assignedExec: 'Theo',
  execRole: 'CTO',
  execColor: 'text-purple-400',
  execBg: 'bg-purple-500/20',
  execBorder: 'border-purple-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 45,
  timeSaved: '45 min/day'
},
// ── STRATEGY (CEO - Aria) ──
{
  id: 'st-01',
  name: 'Strategic Meeting Notes',
  description:
  'Voice capture → CEO transcribes, extracts action items, assigns owners, sets deadlines',
  trigger: 'voice',
  category: 'Strategy',
  assignedExec: 'Aria',
  execRole: 'CEO',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  execBorder: 'border-amber-500/30',
  priority: 'high',
  enabled: true,
  offloadCount: 67,
  timeSaved: '2.4 hrs/day'
},
{
  id: 'st-02',
  name: 'Market Intelligence Capture',
  description:
  'Voice note → CEO logs market signal, updates competitive analysis, flags strategic implications',
  trigger: 'voice',
  category: 'Strategy',
  assignedExec: 'Aria',
  execRole: 'CEO',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  execBorder: 'border-amber-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 43,
  timeSaved: '1.1 hrs/day'
},
{
  id: 'st-03',
  name: 'Expansion Site Survey',
  description:
  'Proximity at potential site → CEO logs location data, triggers market analysis, schedules review',
  trigger: 'proximity',
  category: 'Strategy',
  assignedExec: 'Aria',
  execRole: 'CEO',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  execBorder: 'border-amber-500/30',
  priority: 'medium',
  enabled: true,
  offloadCount: 12,
  timeSaved: '3.5 hrs/event'
}];

// ─── Activity Feed Data ────────────────────────────────────────────────────────
const activityFeed: ActivityEvent[] = [
{
  id: 'a1',
  beaconId: 'GB-001',
  beaconName: 'Main Warehouse Floor',
  task: 'Inventory Cycle Count — Aisle 7B',
  exec: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  trigger: 'scan',
  outcome:
  'Discrepancy found: 14 units. COO flagged for recount. WMS updated.',
  time: '2 min ago',
  status: 'completed'
},
{
  id: 'a2',
  beaconId: 'GB-002',
  beaconName: 'Receiving Dock',
  task: 'Dock Arrival Alert — Truck #TRK-4821',
  exec: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  trigger: 'proximity',
  outcome: 'Crew rerouted to Dock B. Forklift dispatched. ETA 8 min.',
  time: '7 min ago',
  status: 'completed'
},
{
  id: 'a3',
  beaconId: 'GB-004',
  beaconName: 'Executive Office',
  task: 'Invoice Approval — Acme Supplies $4,200',
  exec: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  trigger: 'voice',
  outcome: 'Invoice approved. Payment scheduled net-30. QuickBooks updated.',
  time: '14 min ago',
  status: 'completed'
},
{
  id: 'a4',
  beaconId: 'GB-001',
  beaconName: 'Main Warehouse Floor',
  task: 'OSHA Compliance Check — Zone 1',
  exec: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  trigger: 'proximity',
  outcome:
  '12-point checklist initiated. 1 violation flagged. Correction scheduled.',
  time: '22 min ago',
  status: 'completed'
},
{
  id: 'a5',
  beaconId: 'GB-006',
  beaconName: 'Dispatch Office',
  task: 'Deal Status Update — Riverside Logistics',
  exec: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  trigger: 'voice',
  outcome: 'CRM updated. Follow-up email sent. Deal moved to Proposal stage.',
  time: '31 min ago',
  status: 'completed'
},
{
  id: 'a6',
  beaconId: 'GB-003',
  beaconName: 'Cold Storage Unit',
  task: 'Equipment Maintenance Alert — Compressor Unit 3',
  exec: 'CTO',
  execColor: 'text-purple-400',
  execBg: 'bg-purple-500/20',
  trigger: 'sensor',
  outcome: 'Preventive maintenance scheduled. Parts ordered. Tech notified.',
  time: '48 min ago',
  status: 'completed'
},
{
  id: 'a7',
  beaconId: 'GB-004',
  beaconName: 'Executive Office',
  task: 'Strategic Meeting Notes — Q2 Planning',
  exec: 'CEO',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  trigger: 'voice',
  outcome:
  '7 action items extracted. Owners assigned. Calendar invites sent.',
  time: '1 hr ago',
  status: 'completed'
},
{
  id: 'a8',
  beaconId: 'GB-002',
  beaconName: 'Receiving Dock',
  task: 'Expense Receipt — Fuel $284',
  exec: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  trigger: 'scan',
  outcome:
  'Categorized as Fleet Expense. Policy compliant. Posted to QuickBooks.',
  time: '1.5 hrs ago',
  status: 'completed'
}];

// ─── Utility ───────────────────────────────────────────────────────────────────
function StatusDot({ status }: {status: 'online' | 'offline';}) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === 'online' &&
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
      }
      <span
        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'online' ? 'bg-green-400' : 'bg-slate-600'}`} />

    </span>);

}
const triggerConfig: Record<
  TriggerType,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ElementType;
  }> =
{
  voice: {
    label: 'Voice',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    icon: MicIcon
  },
  scan: {
    label: 'Scan',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    icon: ScanIcon
  },
  proximity: {
    label: 'Proximity',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    icon: RadioIcon
  },
  sensor: {
    label: 'Sensor',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    icon: ActivityIcon
  },
  manual: {
    label: 'Manual',
    color: 'text-slate-400',
    bg: 'bg-slate-500/20',
    icon: ZapIcon
  }
};
const priorityConfig: Record<
  Priority,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
  }> =
{
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
    border: 'border-slate-500/30'
  }
};
const categoryOrder = [
'Operations',
'Finance',
'Sales',
'Marketing',
'Compliance',
'People & HR',
'Technology',
'Strategy'];

const categoryMeta: Record<
  string,
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
  }> =
{
  Operations: {
    icon: PackageIcon,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30'
  },
  Finance: {
    icon: DollarSignIcon,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30'
  },
  Sales: {
    icon: TargetIcon,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/30'
  },
  Marketing: {
    icon: TrendingUpIcon,
    color: 'text-pink-400',
    bg: 'bg-pink-500/20',
    border: 'border-pink-500/30'
  },
  Compliance: {
    icon: ShieldIcon,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/30'
  },
  'People & HR': {
    icon: UsersIcon,
    color: 'text-rose-400',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/30'
  },
  Technology: {
    icon: CpuIcon,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30'
  },
  Strategy: {
    icon: BrainIcon,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30'
  }
};
// ─── Sub-screens ───────────────────────────────────────────────────────────────
function BeaconsTab() {
  const [selected, setSelected] = useState<string | null>(null);
  const beacon = selected ? beaconData.find((b) => b.id === selected) : null;
  const online = beaconData.filter((b) => b.status === 'online').length;
  const totalPackets = beaconData.reduce((s, b) => s + b.packets, 0);
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-green-400">{online}</p>
          <p className="text-xs text-slate-400 mt-1">Online</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-orange-400">
            {totalPackets.toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">Skill Packets</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-red-400">
            {beaconData.filter((b) => b.status === 'offline').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">Offline</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {beacon ?
        <motion.div
          key="detail"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          transition={{
            duration: 0.22
          }}>

            <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4">

              <ArrowRightIcon className="w-4 h-4 rotate-180" /> Back to beacons
            </button>
            <div
            className={`bg-slate-900 border ${beacon.status === 'online' ? 'border-green-500/30' : 'border-red-500/30'} rounded-2xl p-5 mb-4`}>

              <div className="flex items-start gap-4">
                <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${beacon.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>

                  {beacon.status === 'online' ?
                <WifiIcon className="w-7 h-7 text-green-400" /> :

                <WifiOffIcon className="w-7 h-7 text-red-400" />
                }
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-black text-white">
                      {beacon.name}
                    </h3>
                    <StatusDot status={beacon.status} />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                    <MapPinIcon className="w-3 h-3" />
                    {beacon.location}
                  </div>
                  <p className="text-xs text-slate-500">{beacon.id}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
            {
              label: 'Signal',
              value: `${beacon.signal}%`,
              color:
              beacon.signal > 80 ?
              'text-green-400' :
              beacon.signal > 50 ?
              'text-yellow-400' :
              'text-red-400'
            },
            {
              label: 'Battery',
              value: `${beacon.battery}%`,
              color:
              beacon.battery > 50 ?
              'text-green-400' :
              beacon.battery > 20 ?
              'text-yellow-400' :
              'text-red-400'
            },
            {
              label: 'Skill Packets',
              value: beacon.packets.toLocaleString(),
              color: 'text-orange-400'
            },
            {
              label: 'Active Tasks',
              value: beacon.tasksActive.toString(),
              color: 'text-blue-400'
            }].
            map((m) =>
            <div
              key={m.label}
              className="bg-slate-900 border border-slate-700/50 rounded-xl p-3">

                  <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                  <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                </div>
            )}
            </div>
            {/* Signal bar */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-white">Signal Strength</p>
                <span
                className={
                beacon.signal > 80 ?
                'text-green-400 text-sm font-bold' :
                'text-yellow-400 text-sm font-bold'
                }>

                  {beacon.signal}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5">
                <motion.div
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${beacon.signal}%`
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut'
                }}
                className={`h-2.5 rounded-full ${beacon.signal > 80 ? 'bg-green-400' : beacon.signal > 50 ? 'bg-yellow-400' : 'bg-red-400'}`} />

              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors">
                <RefreshCwIcon className="w-4 h-4" /> Force Sync
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 text-sm font-bold py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors">
                <SettingsIcon className="w-4 h-4" /> Configure
              </button>
            </div>
          </motion.div> :

        <motion.div
          key="grid"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {beaconData.map((b, i) =>
            <motion.button
              key={b.id}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.07
              }}
              onClick={() => setSelected(b.id)}
              className={`bg-slate-900 border rounded-2xl p-4 text-left transition-all group ${b.status === 'online' ? 'border-slate-700/50 hover:border-slate-600' : 'border-red-500/30 opacity-75'}`}>

                  <div className="flex items-start justify-between mb-3">
                    <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>

                      {b.status === 'online' ?
                  <WifiIcon className="w-5 h-5 text-green-400" /> :

                  <WifiOffIcon className="w-5 h-5 text-red-400" />
                  }
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono">
                        {b.tasksActive} tasks
                      </span>
                      <StatusDot status={b.status} />
                    </div>
                  </div>
                  <p className="text-sm font-bold text-white mb-0.5">
                    {b.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                    <MapPinIcon className="w-3 h-3" />
                    {b.location}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Signal</span>
                      <span
                    className={
                    b.signal > 80 ?
                    'text-green-400' :
                    b.signal > 50 ?
                    'text-yellow-400' :
                    'text-red-400'
                    }>

                        {b.signal}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Battery</span>
                      <span
                    className={
                    b.battery > 50 ?
                    'text-green-400' :
                    b.battery > 20 ?
                    'text-yellow-400' :
                    'text-red-400'
                    }>

                        {b.battery}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Packets</span>
                      <span className="text-orange-400 font-bold">
                        {b.packets.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
                    <div
                  className={`h-1.5 rounded-full ${b.signal > 80 ? 'bg-green-400' : b.signal > 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                  style={{
                    width: `${b.signal}%`
                  }} />

                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-slate-600">
                      Last sync: {b.lastSync}
                    </span>
                    <ChevronRightIcon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  </div>
                </motion.button>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Blockchain status */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon className="w-4 h-4 text-green-400" />
          <p className="text-sm font-bold text-white">
            Blockchain Audit Status
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
          {[
          {
            label: 'Decisions On-Chain',
            value: '1,847',
            color: 'text-orange-400'
          },
          {
            label: 'Last Block',
            value: '#4,291,847',
            color: 'text-blue-400'
          },
          {
            label: 'Chain Status',
            value: 'Verified',
            color: 'text-green-400'
          },
          {
            label: 'Skill Packets',
            value: '3,386',
            color: 'text-purple-400'
          }].
          map((s) =>
          <div key={s.label}>
              <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>);

}
function OffloadTab() {
  const [tasks, setTasks] = useState<BeaconTask[]>(taskCatalog);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Operations', 'Finance', 'Compliance'])
  );
  const [filterTrigger, setFilterTrigger] = useState<TriggerType | 'all'>('all');
  const toggleTask = (id: string) => {
    setTasks((prev) =>
    prev.map((t) =>
    t.id === id ?
    {
      ...t,
      enabled: !t.enabled
    } :
    t
    )
    );
  };
  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };
  const enabledCount = tasks.filter((t) => t.enabled).length;
  const totalTimeSaved = tasks.
  filter((t) => t.enabled).
  reduce((s, t) => {
    const hrs = parseFloat(t.timeSaved.replace(/[^0-9.]/g, ''));
    return s + (isNaN(hrs) ? 0 : hrs);
  }, 0);
  const grouped = categoryOrder.reduce<Record<string, BeaconTask[]>>(
    (acc, cat) => {
      const filtered = tasks.filter(
        (t) =>
        t.category === cat && (
        filterTrigger === 'all' || t.trigger === filterTrigger)
      );
      if (filtered.length > 0) acc[cat] = filtered;
      return acc;
    },
    {}
  );
  return (
    <div className="space-y-4">
      {/* Stats banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-1">
              Task Offload Engine
            </p>
            <p className="text-sm text-white font-bold">
              <span className="text-orange-400 text-lg font-black">
                {enabledCount}
              </span>{' '}
              of {tasks.length} tasks active
              <span className="text-slate-400 font-normal"> · </span>
              <span className="text-green-400">
                {totalTimeSaved.toFixed(1)} hrs/day
              </span>
              <span className="text-slate-400 font-normal"> saved</span>
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Each task routes through your nearest beacon → APEX Engine →
              assigned AI executive
            </p>
          </div>
          <ZapIcon className="w-8 h-8 text-orange-400 flex-shrink-0" />
        </div>
      </div>

      {/* Trigger filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'voice', 'scan', 'proximity', 'sensor'] as const).map((t) => {
          const cfg = t === 'all' ? null : triggerConfig[t];
          const Icon = cfg?.icon;
          return (
            <button
              key={t}
              onClick={() => setFilterTrigger(t)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterTrigger === t ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}>

              {Icon && <Icon className="w-3 h-3" />}
              {t === 'all' ?
              'All Triggers' :
              t.charAt(0).toUpperCase() + t.slice(1)}
            </button>);

        })}
      </div>

      {/* Category groups */}
      <div className="space-y-3">
        {Object.entries(grouped).map(([category, catTasks]) => {
          const meta = categoryMeta[category];
          const CatIcon = meta.icon;
          const isExpanded = expandedCategories.has(category);
          const enabledInCat = catTasks.filter((t) => t.enabled).length;
          return (
            <div
              key={category}
              className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors">

                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${meta.bg}`}>

                    <CatIcon className={`w-4 h-4 ${meta.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white">{category}</p>
                    <p className="text-xs text-slate-500">
                      {enabledInCat}/{catTasks.length} active
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}>

                    {catTasks.
                    filter((t) => t.enabled).
                    reduce((s, t) => s + t.offloadCount, 0).
                    toLocaleString()}{' '}
                    offloads
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />

                </div>
              </button>

              <AnimatePresence>
                {isExpanded &&
                <motion.div
                  initial={{
                    height: 0
                  }}
                  animate={{
                    height: 'auto'
                  }}
                  exit={{
                    height: 0
                  }}
                  transition={{
                    duration: 0.2
                  }}
                  className="overflow-hidden">

                    <div className="border-t border-slate-800 divide-y divide-slate-800">
                      {catTasks.map((task, i) => {
                      const trig = triggerConfig[task.trigger];
                      const TrigIcon = trig.icon;
                      const pri = priorityConfig[task.priority];
                      return (
                        <motion.div
                          key={task.id}
                          initial={{
                            opacity: 0
                          }}
                          animate={{
                            opacity: 1
                          }}
                          transition={{
                            delay: i * 0.04
                          }}
                          className={`p-4 ${!task.enabled ? 'opacity-50' : ''}`}>

                            <div className="flex items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <p className="text-sm font-bold text-white">
                                    {task.name}
                                  </p>
                                  <span
                                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full border ${pri.bg} ${pri.color} ${pri.border}`}>

                                    {pri.label}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                                  {task.description}
                                </p>
                                <div className="flex items-center gap-3 flex-wrap">
                                  <span
                                  className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${trig.bg} ${trig.color}`}>

                                    <TrigIcon className="w-2.5 h-2.5" />
                                    {trig.label}
                                  </span>
                                  <span
                                  className={`text-[10px] font-black px-2 py-0.5 rounded-full ${task.execBg} ${task.execColor}`}>

                                    {task.execRole} · {task.assignedExec}
                                  </span>
                                  {task.enabled &&
                                <>
                                      <span className="text-[10px] text-slate-500">
                                        {task.offloadCount.toLocaleString()}{' '}
                                        offloads
                                      </span>
                                      <span className="text-[10px] text-green-400 font-bold">
                                        {task.timeSaved} saved
                                      </span>
                                    </>
                                }
                                </div>
                              </div>
                              <button
                              onClick={() => toggleTask(task.id)}
                              className="flex-shrink-0 mt-0.5">

                                {task.enabled ?
                              <ToggleRightIcon className="w-7 h-7 text-orange-400" /> :

                              <ToggleLeftIcon className="w-7 h-7 text-slate-600" />
                              }
                              </button>
                            </div>
                          </motion.div>);

                    })}
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>);

        })}
      </div>
    </div>);

}
function FlowTab() {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % 6), 1800);
    return () => clearInterval(t);
  }, []);
  const flowSteps = [
  {
    id: 0,
    label: 'Physical Trigger',
    sub: 'Voice / Scan / Proximity / Sensor',
    icon: RadioIcon,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40'
  },
  {
    id: 1,
    label: 'Guide Beacon',
    sub: 'Edge AI processing · Local encryption',
    icon: WifiIcon,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40'
  },
  {
    id: 2,
    label: 'APEX Engine',
    sub: 'Task classification · Exec routing',
    icon: ZapIcon,
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40'
  },
  {
    id: 3,
    label: 'AI Executive',
    sub: 'Decision made · Action taken',
    icon: BrainIcon,
    color: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/40'
  },
  {
    id: 4,
    label: 'Outcome',
    sub: 'Result delivered · Owner notified',
    icon: CheckCircleIcon,
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40'
  },
  {
    id: 5,
    label: 'Blockchain Log',
    sub: 'Immutable audit trail · On-chain',
    icon: LockIcon,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/40'
  }];

  const exampleFlows = [
  {
    trigger: 'Voice: "Approve invoice from Acme $4,200"',
    beacon: 'GB-004 · Executive Office',
    engine: 'Classified: Finance · Routed to CFO Felix',
    exec: 'CFO Felix: Checks budget, verifies vendor, approves',
    outcome: 'Invoice approved. QuickBooks updated. Email sent.',
    chain: '0x8f2a...c91b · Block #4,291,848',
    triggerColor: 'text-purple-400'
  },
  {
    trigger: 'Scan: Barcode on incoming pallet',
    beacon: 'GB-002 · Receiving Dock',
    engine: 'Classified: Operations · Routed to COO Orion',
    exec: 'COO Orion: Verifies PO, updates inventory, assigns crew',
    outcome: 'Pallet logged. Crew dispatched. WMS updated.',
    chain: '0x3c7d...f82a · Block #4,291,849',
    triggerColor: 'text-blue-400'
  },
  {
    trigger: 'Proximity: Hazard zone entry detected',
    beacon: 'GB-001 · Main Warehouse Floor',
    engine: 'Classified: Compliance · Routed to CLO Lex',
    exec: 'CLO Lex: Initiates safety checklist, logs entry, alerts supervisor',
    outcome:
    'Checklist complete. 1 violation flagged. Corrective action scheduled.',
    chain: '0x1a9e...d45c · Block #4,291,850',
    triggerColor: 'text-green-400'
  }];

  const [activeExample, setActiveExample] = useState(0);
  return (
    <div className="space-y-5">
      {/* Animated flow diagram */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
        <p className="text-sm font-bold text-white mb-4">
          Beacon → APEX Engine Flow
        </p>
        <div className="space-y-2">
          {flowSteps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;
            const isPast = activeStep > i;
            return (
              <div key={step.id}>
                <motion.div
                  animate={
                  isActive ?
                  {
                    scale: [1, 1.01, 1]
                  } :
                  {}
                  }
                  transition={{
                    duration: 0.4
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive ? `${step.bg} ${step.border}` : isPast ? 'bg-slate-800/30 border-slate-700/30' : 'bg-slate-800/10 border-slate-800/50'}`}>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? step.bg : 'bg-slate-800'}`}>

                    <Icon
                      className={`w-4.5 h-4.5 ${isActive ? step.color : isPast ? 'text-slate-400' : 'text-slate-600'}`} />

                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-bold ${isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-600'}`}>

                      {step.label}
                    </p>
                    <p
                      className={`text-xs ${isActive ? 'text-slate-400' : 'text-slate-600'}`}>

                      {step.sub}
                    </p>
                  </div>
                  {isActive &&
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity
                    }}
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${step.color.replace('text-', 'bg-')}`} />

                  }
                  {isPast &&
                  <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                  }
                </motion.div>
                {i < flowSteps.length - 1 &&
                <div className="flex justify-center py-1">
                    <motion.div
                    animate={
                    activeStep > i ?
                    {
                      opacity: [0.3, 1, 0.3]
                    } :
                    {
                      opacity: 0.2
                    }
                    }
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}>

                      <ArrowRightIcon className="w-3.5 h-3.5 text-slate-600 rotate-90" />
                    </motion.div>
                  </div>
                }
              </div>);

          })}
        </div>
      </div>

      {/* Example flows */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-white">Example Flows</p>
          <div className="flex gap-1">
            {exampleFlows.map((_, i) =>
            <button
              key={i}
              onClick={() => setActiveExample(i)}
              className={`w-2 h-2 rounded-full transition-all ${activeExample === i ? 'bg-orange-400 w-4' : 'bg-slate-600'}`} />

            )}
          </div>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExample}
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -8
            }}
            transition={{
              duration: 0.2
            }}>

            {(() => {
              const ex = exampleFlows[activeExample];
              return (
                <div className="space-y-2">
                  {[
                  {
                    label: '① Trigger',
                    value: ex.trigger,
                    color: ex.triggerColor,
                    icon: RadioIcon
                  },
                  {
                    label: '② Beacon',
                    value: ex.beacon,
                    color: 'text-blue-400',
                    icon: WifiIcon
                  },
                  {
                    label: '③ APEX Engine',
                    value: ex.engine,
                    color: 'text-orange-400',
                    icon: ZapIcon
                  },
                  {
                    label: '④ AI Executive',
                    value: ex.exec,
                    color: 'text-purple-400',
                    icon: BrainIcon
                  },
                  {
                    label: '⑤ Outcome',
                    value: ex.outcome,
                    color: 'text-green-400',
                    icon: CheckCircleIcon
                  },
                  {
                    label: '⑥ On-Chain',
                    value: ex.chain,
                    color: 'text-cyan-400',
                    icon: LockIcon
                  }].
                  map((row) => {
                    const Icon = row.icon;
                    return (
                      <div
                        key={row.label}
                        className="flex items-start gap-2 text-xs">

                        <span className="text-slate-500 w-28 flex-shrink-0 font-bold pt-0.5">
                          {row.label}
                        </span>
                        <span
                          className={`${row.color} font-semibold leading-relaxed`}>

                          {row.value}
                        </span>
                      </div>);

                  })}
                </div>);

            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Task routing map */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">
          Task → AI Executive Routing
        </p>
        <div className="space-y-2">
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat];
            const CatIcon = meta.icon;
            const catTasks = taskCatalog.filter((t) => t.category === cat);
            const exec = catTasks[0];
            if (!exec) return null;
            return (
              <div
                key={cat}
                className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.bg}`}>

                  <CatIcon className={`w-3.5 h-3.5 ${meta.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white">{cat}</p>
                  <p className="text-[10px] text-slate-500">
                    {catTasks.length} offloadable tasks
                  </p>
                </div>
                <ArrowRightIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-lg ${exec.execBg} ${exec.execColor} flex-shrink-0`}>

                  {exec.execRole} · {exec.assignedExec}
                </span>
              </div>);

          })}
        </div>
      </div>
    </div>);

}
function ActivityTab() {
  const [liveCount, setLiveCount] = useState(activityFeed.length);
  useEffect(() => {
    const t = setInterval(
      () => setLiveCount((p) => p + Math.floor(Math.random() * 2)),
      3500
    );
    return () => clearInterval(t);
  }, []);
  const triggerIcons: Record<TriggerType, React.ElementType> = {
    voice: MicIcon,
    scan: ScanIcon,
    proximity: RadioIcon,
    sensor: ActivityIcon,
    manual: ZapIcon
  };
  return (
    <div className="space-y-4">
      {/* Live stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <motion.p
            key={liveCount}
            initial={{
              scale: 1.2
            }}
            animate={{
              scale: 1
            }}
            className="text-xl font-black text-orange-400">

            {liveCount}
          </motion.p>
          <p className="text-[10px] text-slate-500 mt-0.5">Events Today</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-green-400">98%</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Success Rate</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-blue-400">1.4s</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Avg Response</p>
        </div>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 px-1">
        <motion.span
          animate={{
            opacity: [1, 0.3, 1]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity
          }}
          className="w-2 h-2 rounded-full bg-green-400 inline-block" />

        <span className="text-xs font-bold text-green-400">Live Feed</span>
        <span className="text-xs text-slate-500">
          · Beacon-triggered events
        </span>
      </div>

      {/* Activity list */}
      <div className="space-y-3">
        {activityFeed.map((event, i) => {
          const TrigIcon = triggerIcons[event.trigger];
          const trig = triggerConfig[event.trigger];
          return (
            <motion.div
              key={event.id}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.06
              }}
              className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

              <div className="flex items-start gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${trig.bg}`}>

                  <TrigIcon className={`w-4 h-4 ${trig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-lg ${event.execBg} ${event.execColor}`}>

                      {event.exec}
                    </span>
                    <span className="text-xs text-slate-500">
                      {event.beaconName}
                    </span>
                    <span className="text-xs text-slate-600 ml-auto">
                      {event.time}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {event.task}
                  </p>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-3 py-2 flex items-start gap-2">
                <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-300">{event.outcome}</p>
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] text-slate-600">
                <span className="flex items-center gap-1">
                  <LockIcon className="w-2.5 h-2.5 text-green-500" />
                  On-chain verified
                </span>
                <span className={`flex items-center gap-1 ${trig.color}`}>
                  <TrigIcon className="w-2.5 h-2.5" />
                  {trig.label} trigger
                </span>
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}
// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenBeaconHub() {
  const [tab, setTab] = useState<HubTab>('beacons');
  const tabs: {
    id: HubTab;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[] = [
  {
    id: 'beacons',
    label: 'Beacons',
    icon: RadioIcon,
    badge: `${beaconData.filter((b) => b.status === 'online').length}`
  },
  {
    id: 'offload',
    label: 'Offload',
    icon: SendIcon,
    badge: `${taskCatalog.filter((t) => t.enabled).length}`
  },
  {
    id: 'flow',
    label: 'Flow',
    icon: ArrowRightIcon
  },
  {
    id: 'activity',
    label: 'Activity',
    icon: ActivityIcon
  }];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-400">
          Edge AI hardware · Task offload engine · {taskCatalog.filter((t) => t.enabled).length} active offloads
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors">
            <PlusIcon className="w-3.5 h-3.5" /> Add Beacon
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
              {t.badge &&
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${tab === t.id ? 'bg-white/20 text-white' : 'bg-orange-500/20 text-orange-400'}`}>

                  {t.badge}
                </span>
              }
            </button>);

        })}
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

          {tab === 'beacons' && <BeaconsTab />}
          {tab === 'offload' && <OffloadTab />}
          {tab === 'flow' && <FlowTab />}
          {tab === 'activity' && <ActivityTab />}
        </motion.div>
      </AnimatePresence>
    </div>);

}