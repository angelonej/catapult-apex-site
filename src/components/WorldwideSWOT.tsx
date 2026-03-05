import React from 'react';
import {
  TrendingUpIcon,
  AlertTriangleIcon,
  ShieldCheckIcon,
  TargetIcon,
  CheckIcon,
  XIcon,
  MinusIcon,
  GlobeIcon } from
'lucide-react';
export function WorldwideSWOT() {
  return (
    <section className="w-full bg-gray-950 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
            <GlobeIcon className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-blue-400 text-xs font-semibold tracking-wide uppercase">
              Global Competitive Landscape
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How APEX Positions Worldwide
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive analysis of APEX against global competition — and
            where the market is headed by 2028.
          </p>
        </div>

        {/* SWOT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-16">
          {/* Strengths */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <TrendingUpIcon className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-emerald-400 font-bold text-lg">Strengths</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Integrated beacon + AI platform — unique in market
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Human-worn wearable device ecosystem (no competitor has this)
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  White-label capability for resellers and agencies
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Employee dividend model — workers share in AI-generated value
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Multi-persona AI agents with SME knowledge pre-loaded
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Real-time field intelligence from beacon-wearing workers
                </span>
              </li>
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-amber-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangleIcon className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-amber-400 font-bold text-lg">Weaknesses</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MinusIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Complex initial setup requires dedicated onboarding time
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MinusIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Hardware dependency — beacon procurement adds friction
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MinusIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Premium pricing vs. DIY tools like Zapier or Make
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MinusIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Early market — requires customer education on beacon value
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MinusIcon className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  No freemium tier to capture SMB self-serve segment
                </span>
              </li>
            </ul>
          </div>

          {/* Opportunities */}
          <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <TargetIcon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-blue-400 font-bold text-lg">Opportunities</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  $47B AI workforce market projected by 2028 — early mover
                  advantage
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  SMBs massively underserved by enterprise AI platforms
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Beacon-enabled safety regulations growing globally (OSHA, ISO)
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  White-label reseller channel — agencies, MSPs, VARs
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Emerging markets: LATAM, SEA, Africa, Middle East digitization
                  wave
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckIcon className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Manufacturing + logistics beacon use cases in APAC
                </span>
              </li>
            </ul>
          </div>

          {/* Threats */}
          <div className="bg-red-950/40 border border-red-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-red-500/20 rounded-xl flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-red-400 font-bold text-lg">Threats</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <AlertTriangleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Microsoft Copilot — enterprise bundling with Office 365
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Salesforce Einstein — CRM-native AI with massive install base
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  ServiceNow AI — operations-native with enterprise contracts
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Zapier AI + OpenAI GPT Actions — DIY automation at low cost
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <AlertTriangleIcon className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  EU AI Act compliance costs — regulatory overhead in Europe
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Competitor Comparison Table */}
        <div className="mb-16">
          <h3 className="text-white font-bold text-xl sm:text-2xl text-center mb-8">
            Competitor Comparison
          </h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-700">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  <th className="text-left text-gray-400 text-xs font-semibold uppercase tracking-wide px-4 py-3">
                    Competitor
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    AI Agents
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    Wearable Beacons
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    White Label
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    SMB Friendly
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    Employee Equity
                  </th>
                  <th className="text-center text-gray-400 text-xs font-semibold uppercase tracking-wide px-3 py-3">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                {
                  name: 'APEX',
                  highlight: true,
                  agents: true,
                  beacons: true,
                  whiteLabel: true,
                  smb: true,
                  equity: true,
                  price: '$$'
                },
                {
                  name: 'Salesforce Einstein',
                  highlight: false,
                  agents: true,
                  beacons: false,
                  whiteLabel: false,
                  smb: false,
                  equity: false,
                  price: '$$$$'
                },
                {
                  name: 'Microsoft Copilot',
                  highlight: false,
                  agents: true,
                  beacons: false,
                  whiteLabel: false,
                  smb: false,
                  equity: false,
                  price: '$$$'
                },
                {
                  name: 'Intercom Fin',
                  highlight: false,
                  agents: 'partial',
                  beacons: false,
                  whiteLabel: true,
                  smb: true,
                  equity: false,
                  price: '$$'
                },
                {
                  name: 'Zapier AI',
                  highlight: false,
                  agents: 'partial',
                  beacons: false,
                  whiteLabel: false,
                  smb: true,
                  equity: false,
                  price: '$'
                },
                {
                  name: 'Relevance AI',
                  highlight: false,
                  agents: true,
                  beacons: false,
                  whiteLabel: true,
                  smb: 'partial',
                  equity: false,
                  price: '$$'
                },
                {
                  name: '11x.ai',
                  highlight: false,
                  agents: 'partial',
                  beacons: false,
                  whiteLabel: false,
                  smb: false,
                  equity: false,
                  price: '$$$'
                }].
                map((row) =>
                <tr
                  key={row.name}
                  className={`border-b border-gray-800 ${row.highlight ? 'bg-blue-900/20' : 'bg-gray-900 hover:bg-gray-800/50'} transition-colors`}>

                    <td className="px-4 py-3">
                      <span
                      className={`font-semibold text-sm ${row.highlight ? 'text-blue-300' : 'text-gray-300'}`}>

                        {row.name}
                        {row.highlight &&
                      <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">
                            You
                          </span>
                      }
                      </span>
                    </td>
                    {[
                  row.agents,
                  row.beacons,
                  row.whiteLabel,
                  row.smb,
                  row.equity].
                  map((val, i) =>
                  <td key={i} className="px-3 py-3 text-center">
                        {val === true ?
                    <CheckIcon className="w-4 h-4 text-emerald-400 mx-auto" /> :
                    val === 'partial' ?
                    <MinusIcon className="w-4 h-4 text-amber-400 mx-auto" /> :

                    <XIcon className="w-4 h-4 text-red-400/60 mx-auto" />
                    }
                      </td>
                  )}
                    <td className="px-3 py-3 text-center">
                      <span
                      className={`text-sm font-mono ${row.highlight ? 'text-blue-300' : 'text-gray-400'}`}>

                        {row.price}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 px-1">
            <div className="flex items-center gap-1">
              <CheckIcon className="w-3 h-3 text-emerald-400" /> Full support
            </div>
            <div className="flex items-center gap-1">
              <MinusIcon className="w-3 h-3 text-amber-400" /> Partial
            </div>
            <div className="flex items-center gap-1">
              <XIcon className="w-3 h-3 text-red-400/60" /> Not available
            </div>
          </div>
        </div>

        {/* Missing From Market */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8 mb-16">
          <h3 className="text-white font-bold text-xl mb-2">
            What's Missing From the Market
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Gaps APEX is uniquely positioned to fill — or should prioritize
            building next.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Beacon Hardware Marketplace
              </div>
              <div className="text-gray-400 text-xs">
                Buy, manage, and replace beacon devices directly in-platform. No
                third-party procurement.
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Field Worker Mobile App
              </div>
              <div className="text-gray-400 text-xs">
                Companion app for beacon wearers — tasks, safety status, comms,
                and rewards in one place.
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Compliance & Safety Dashboard
              </div>
              <div className="text-gray-400 text-xs">
                OSHA and ISO compliance tracking built into the platform —
                automated reporting for audits.
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Integration Directory
              </div>
              <div className="text-gray-400 text-xs">
                200+ pre-built connectors to popular tools — one-click
                integrations, no code required.
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Partner & Reseller Portal
              </div>
              <div className="text-gray-400 text-xs">
                Dedicated portal for white-label partners — co-branded
                dashboards, revenue sharing, support.
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-amber-400 font-semibold text-sm mb-1">
                Freemium SMB Tier
              </div>
              <div className="text-gray-400 text-xs">
                Free entry tier for small businesses — limited agents and
                beacons to drive adoption and upsell.
              </div>
            </div>
          </div>
        </div>

        {/* Regional Opportunities */}
        <div>
          <h3 className="text-white font-bold text-xl sm:text-2xl text-center mb-8">
            Regional Market Opportunities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇺🇸</span>
                <div className="text-white font-semibold">North America</div>
              </div>
              <p className="text-gray-400 text-sm">
                Enterprise + SMB market. Safety regulations driving beacon
                adoption. Strong AI investment culture.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🇪🇺</span>
                <div className="text-white font-semibold">Europe</div>
              </div>
              <p className="text-gray-400 text-sm">
                GDPR-compliant AI is a differentiator. Strong SMB market in
                Germany, France, Nordics. Worker rights focus aligns with
                dividend model.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌎</span>
                <div className="text-white font-semibold">Latin America</div>
              </div>
              <p className="text-gray-400 text-sm">
                Rapid digitization wave. Mobile-first workforce. Retail and
                logistics sectors primed for beacon deployment.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌏</span>
                <div className="text-white font-semibold">SEA / APAC</div>
              </div>
              <p className="text-gray-400 text-sm">
                Manufacturing and logistics beacon use cases. High mobile
                penetration. Fast-growing tech adoption in Singapore, Indonesia,
                Vietnam.
              </p>
            </div>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌍</span>
                <div className="text-white font-semibold">
                  Middle East & Africa
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Smart city and workforce modernization initiatives. UAE and
                Saudi Arabia leading AI investment. Africa's mobile-first
                economy emerging.
              </p>
            </div>
            <div className="bg-gray-800 border border-blue-500/30 rounded-xl p-5">
              <div className="text-blue-400 font-bold text-2xl mb-1">$47B</div>
              <div className="text-white font-semibold mb-2">
                Total Addressable Market by 2028
              </div>
              <p className="text-gray-400 text-sm">
                AI workforce automation market growing at 38% CAGR.
                Beacon-enabled workforce intelligence is an emerging
                sub-category with no dominant player.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}