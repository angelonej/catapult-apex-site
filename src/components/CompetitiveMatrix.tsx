import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
  TrophyIcon,
  ZapIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  StarIcon } from
'lucide-react';
const competitors = [
{
  name: 'Catapult',
  logo: '⚡',
  highlight: true,
  tagline: 'AI Executive Team'
},
{
  name: 'Artisan AI',
  logo: '🎨',
  highlight: false,
  tagline: 'AI Employees (SDR)'
},
{
  name: '11x.ai',
  logo: '✕',
  highlight: false,
  tagline: 'AI Workers'
},
{
  name: 'Lindy AI',
  logo: '🔗',
  highlight: false,
  tagline: 'AI Chief of Staff'
},
{
  name: 'MS Copilot',
  logo: '🪟',
  highlight: false,
  tagline: 'Productivity AI'
}];

type Status = 'yes' | 'no' | 'partial';
interface Feature {
  category: string;
  name: string;
  tooltip: string;
  values: Status[];
}
const features: Feature[] = [
{
  category: 'Core',
  name: 'Full AI C-suite (CEO, COO, CFO, CMO)',
  tooltip:
  'Dedicated AI agents with executive-level decision authority across all functions',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Core',
  name: 'Autonomous Decision Execution',
  tooltip: 'Agents act without human prompting on every task',
  values: ['yes', 'partial', 'partial', 'partial', 'no']
},
{
  category: 'Core',
  name: 'Outcome-Based / Performance Pricing',
  tooltip: 'Pricing tied to measurable business outcomes delivered',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Hardware',
  name: 'Edge AI Hardware (on-site devices)',
  tooltip: 'Physical devices for offline, on-site AI execution',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Hardware',
  name: 'Offline / Air-Gap Operation',
  tooltip: 'Continues working without internet connection',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Trust',
  name: 'Blockchain-Verified Audit Trail',
  tooltip: 'Every agent action immutably recorded on-chain',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Trust',
  name: 'Human Feedback Training Loop',
  tooltip: 'Your ratings directly improve agent performance',
  values: ['yes', 'partial', 'partial', 'partial', 'no']
},
{
  category: 'Intelligence',
  name: 'Cross-Industry Learning Network',
  tooltip: 'Agents learn from businesses across industries simultaneously',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Intelligence',
  name: 'Industry-Specific Agent Training',
  tooltip: 'Pre-trained on landscaping, HVAC, medical, legal, etc.',
  values: ['yes', 'partial', 'partial', 'no', 'no']
},
{
  category: 'Future',
  name: 'Humanoid Robot Skill Transfer',
  tooltip: 'Behavioral data packaged for humanoid consumption',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Future',
  name: 'AI Exec Talking Head Avatar',
  tooltip: 'Persistent photorealistic avatar for each AI executive',
  values: ['yes', 'no', 'no', 'no', 'no']
},
{
  category: 'Value',
  name: '"Time Bought Back" Metric',
  tooltip: 'Tracks hours reclaimed as primary success metric',
  values: ['yes', 'no', 'no', 'partial', 'no']
},
{
  category: 'Value',
  name: 'SMB-Focused (5–500 employees)',
  tooltip: 'Purpose-built for small and mid-market businesses',
  values: ['yes', 'partial', 'partial', 'no', 'no']
}];

const categories = [
'Core',
'Hardware',
'Trust',
'Intelligence',
'Future',
'Value'];

const StatusIcon = ({
  status,
  isHighlight



}: {status: Status;isHighlight: boolean;}) => {
  if (status === 'yes')
  return (
    <div
      className={`flex items-center justify-center ${isHighlight ? '' : ''}`}>

        <CheckCircleIcon
        className={`w-5 h-5 ${isHighlight ? 'text-green-400' : 'text-green-500/60'}`} />

      </div>);

  if (status === 'no')
  return (
    <div className="flex items-center justify-center">
        <XCircleIcon className="w-5 h-5 text-red-500/40" />
      </div>);

  return (
    <div className="flex items-center justify-center">
      <MinusCircleIcon className="w-5 h-5 text-yellow-500/60" />
    </div>);

};
export function CompetitiveMatrix() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const filteredFeatures = activeCategory ?
  features.filter((f) => f.category === activeCategory) :
  features;
  const catapultWins = features.filter((f) => f.values[0] === 'yes').length;
  const salesforceWins = features.filter((f) => f.values[1] === 'yes').length;
  return (
    <section className="w-full bg-gradient-to-b from-slate-900 to-slate-950 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/40 rounded-full px-5 py-2 mb-6">

            <TrophyIcon className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-bold text-accent-300 uppercase tracking-wide">
              Competitive Analysis
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            The Competitive
            <br />
            <span className="text-accent-400">Landscape Is Real.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            AI employee companies are being funded — Artisan AI, 11x.ai, Lindy
            AI. None combine edge hardware, a full C-suite, blockchain audit,
            and SMB-specific deployment in one platform.
          </p>

          {/* Score callout */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-3 text-center">
              <p className="text-3xl font-black text-green-400">
                {catapultWins}/{features.length}
              </p>
              <p className="text-xs text-slate-400">Catapult features</p>
            </div>
            <div className="text-slate-600 text-2xl font-bold">vs</div>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-3 text-center">
              <p className="text-3xl font-black text-slate-400">
                {salesforceWins}/{features.length}
              </p>
              <p className="text-xs text-slate-500">Best competitor</p>
            </div>
          </div>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${!activeCategory ? 'bg-accent-500/20 border-accent-500/40 text-accent-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>

            All Features
          </button>
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() =>
            setActiveCategory(activeCategory === cat ? null : cat)
            }
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${activeCategory === cat ? 'bg-accent-500/20 border-accent-500/40 text-accent-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>

              {cat}
            </button>
          )}
        </div>

        {/* Matrix Table */}
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
            delay: 0.2
          }}
          className="overflow-x-auto">

          <div className="min-w-[700px]">
            {/* Column headers */}
            <div className="grid grid-cols-6 gap-2 mb-3 px-4">
              <div className="col-span-1" />
              {competitors.map((comp, i) =>
              <div
                key={comp.name}
                className={`text-center p-3 rounded-2xl ${comp.highlight ? 'bg-gradient-to-b from-accent-500/20 to-accent-600/10 border-2 border-accent-500/50' : 'bg-white/5 border border-white/10'}`}>

                  <div className="text-xl mb-1">{comp.logo}</div>
                  <p
                  className={`text-xs font-bold leading-tight ${comp.highlight ? 'text-accent-300' : 'text-slate-300'}`}>

                    {comp.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {comp.tagline}
                  </p>
                  {comp.highlight &&
                <div className="mt-2 flex items-center justify-center gap-1">
                      <StarIcon className="w-3 h-3 text-gold-400 fill-gold-400" />
                      <span className="text-xs text-gold-400 font-bold">
                        Best
                      </span>
                    </div>
                }
                </div>
              )}
            </div>

            {/* Feature rows */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory || 'all'}
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
                }}
                className="space-y-1">

                {filteredFeatures.map((feature, i) =>
                <motion.div
                  key={feature.name}
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.03
                  }}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`grid grid-cols-6 gap-2 px-4 py-2 rounded-xl transition-colors ${hoveredRow === i ? 'bg-white/5' : ''}`}>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 bg-white/5 px-1.5 py-0.5 rounded text-center w-12 flex-shrink-0">
                        {feature.category}
                      </span>
                      <span className="text-sm text-slate-200 leading-tight">
                        {feature.name}
                      </span>
                    </div>
                    {feature.values.map((val, vi) =>
                  <div
                    key={vi}
                    className={`flex items-center justify-center ${vi === 0 ? 'bg-accent-500/5 rounded-lg' : ''}`}>

                        <StatusIcon status={val} isHighlight={vi === 0} />
                      </div>
                  )}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6 px-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-green-400" /> Full
                support
              </div>
              <div className="flex items-center gap-1.5">
                <MinusCircleIcon className="w-4 h-4 text-yellow-500/60" />{' '}
                Partial / add-on
              </div>
              <div className="flex items-center gap-1.5">
                <XCircleIcon className="w-4 h-4 text-red-500/40" /> Not
                available
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
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
          className="mt-12 text-center">

          <p className="text-slate-400 mb-6">
            The only platform built from the ground up for{' '}
            <span className="text-white font-semibold">
              AI-first business management
            </span>{' '}
            — not retrofitted onto existing software.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el)
              el.scrollIntoView({
                behavior: 'smooth'
              });
            }}>

            <ZapIcon className="mr-2 w-5 h-5" />
            Start Free — No Credit Card
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>);

}