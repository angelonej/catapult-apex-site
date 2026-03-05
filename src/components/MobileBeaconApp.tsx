import React, { useState } from 'react';
import {
  WifiIcon,
  CheckCircleIcon,
  ClipboardListIcon,
  ShieldCheckIcon,
  MessageSquareIcon,
  BarChart3Icon,
  SmartphoneIcon,
  MicIcon,
  ZapIcon } from
'lucide-react';
type AppScreen = 'checkin' | 'tasks' | 'safety' | 'comms' | 'stats';
interface AppScreenData {
  key: AppScreen;
  label: string;
  icon: typeof WifiIcon;
}
const screens: AppScreenData[] = [
{
  key: 'checkin',
  label: 'Check-In',
  icon: CheckCircleIcon
},
{
  key: 'tasks',
  label: 'My Tasks',
  icon: ClipboardListIcon
},
{
  key: 'safety',
  label: 'Safety',
  icon: ShieldCheckIcon
},
{
  key: 'comms',
  label: 'Comms',
  icon: MessageSquareIcon
},
{
  key: 'stats',
  label: 'My Stats',
  icon: BarChart3Icon
}];

function PhoneFrame({ children }: {children: React.ReactNode;}) {
  return (
    <div className="relative mx-auto w-56 sm:w-64">
      {/* Phone shell */}
      <div className="bg-gray-900 border-4 border-gray-700 rounded-[2.5rem] overflow-hidden shadow-2xl">
        {/* Status bar */}
        <div className="bg-gray-950 px-5 py-2 flex items-center justify-between">
          <span className="text-white text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <WifiIcon className="w-3 h-3 text-white" />
            <div className="w-4 h-2 border border-white rounded-sm relative">
              <div className="absolute inset-0.5 left-0.5 right-1 bg-white rounded-sm" />
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="bg-gray-900 min-h-[360px] sm:min-h-[400px]">
          {children}
        </div>
        {/* Home bar */}
        <div className="bg-gray-950 py-3 flex justify-center">
          <div className="w-16 h-1 bg-gray-600 rounded-full" />
        </div>
      </div>
    </div>);

}
export function MobileBeaconApp() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('checkin');
  return (
    <section className="w-full bg-gray-900 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4">
            <SmartphoneIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold tracking-wide uppercase">
              Companion App
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The GuideBeacon Companion App
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            For every worker wearing a beacon. Tasks, safety, comms, and rewards
            — all in one voice-first mobile app that syncs with your wearable
            device.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Phone Mockup */}
          <div className="order-2 lg:order-1">
            {/* Screen Selector */}
            <div className="flex gap-2 justify-center flex-wrap mb-6">
              {screens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <button
                    key={screen.key}
                    onClick={() => setActiveScreen(screen.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeScreen === screen.key ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'}`}>

                    <Icon className="w-3.5 h-3.5" />
                    {screen.label}
                  </button>);

              })}
            </div>

            <PhoneFrame>
              {/* Check-In Screen */}
              {activeScreen === 'checkin' &&
              <div className="p-4 text-center">
                  <div className="text-gray-400 text-xs mb-4">
                    Good morning, Maria 👋
                  </div>
                  <div className="w-20 h-20 bg-emerald-500/20 border-4 border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <WifiIcon className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="text-white font-bold text-sm mb-1">
                    Tap Your Beacon
                  </div>
                  <div className="text-gray-400 text-xs mb-4">
                    to clock in and load today's tasks
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-3">
                    <div className="text-emerald-400 text-xs font-semibold">
                      ✓ Beacon BKN-001 detected
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      Zone A — Sales Floor
                    </div>
                  </div>
                  <button className="w-full bg-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl">
                    Confirm Check-In
                  </button>
                  <div className="text-gray-500 text-xs mt-3">
                    8:02 AM · Shift starts in 3 min
                  </div>
                </div>
              }

              {/* Tasks Screen */}
              {activeScreen === 'tasks' &&
              <div className="p-4">
                  <div className="text-white font-bold text-sm mb-1">
                    My Tasks Today
                  </div>
                  <div className="text-gray-400 text-xs mb-4">
                    AI-assigned · 5 tasks
                  </div>
                  <div className="space-y-2">
                    {[
                  {
                    task: 'Greet VIP customer — John M.',
                    time: '9:00 AM',
                    priority: 'high',
                    done: true
                  },
                  {
                    task: 'Restock Zone B display',
                    time: '10:30 AM',
                    priority: 'medium',
                    done: false
                  },
                  {
                    task: 'Team safety check-in',
                    time: '12:00 PM',
                    priority: 'high',
                    done: false
                  },
                  {
                    task: 'Process 3 returns',
                    time: '2:00 PM',
                    priority: 'low',
                    done: false
                  }].
                  map((item, i) =>
                  <div
                    key={i}
                    className={`bg-gray-800 rounded-lg p-2.5 flex items-start gap-2 ${item.done ? 'opacity-50' : ''}`}>

                        <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${item.done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-600'}`} />

                        <div className="flex-1 min-w-0">
                          <div
                        className={`text-xs font-medium ${item.done ? 'line-through text-gray-500' : 'text-white'}`}>

                            {item.task}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {item.time}
                          </div>
                        </div>
                        <div
                      className={`text-xs px-1.5 py-0.5 rounded-full ${item.priority === 'high' ? 'bg-red-500/20 text-red-400' : item.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-700 text-gray-400'}`}>

                          {item.priority}
                        </div>
                      </div>
                  )}
                  </div>
                </div>
              }

              {/* Safety Screen */}
              {activeScreen === 'safety' &&
              <div className="p-4">
                  <div className="text-white font-bold text-sm mb-4">
                    Safety Status
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-center mb-4">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="text-emerald-400 font-bold text-sm">
                      Zone A — All Clear
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      No hazards detected
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Team nearby</span>
                      <span className="text-white">4 workers</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Last safety check</span>
                      <span className="text-white">12 min ago</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Beacon battery</span>
                      <span className="text-emerald-400">87%</span>
                    </div>
                  </div>
                  <button className="w-full bg-red-600 text-white text-sm font-bold py-3 rounded-xl">
                    🆘 SOS Emergency
                  </button>
                </div>
              }

              {/* Comms Screen */}
              {activeScreen === 'comms' &&
              <div className="p-4">
                  <div className="text-white font-bold text-sm mb-4">
                    Messages
                  </div>
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <ZapIcon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-blue-400 text-xs font-semibold">
                          Sales Agent
                        </span>
                      </div>
                      <div className="text-gray-300 text-xs">
                        VIP customer John M. is in Zone B. He's interested in
                        the new product line. Suggested approach: mention the
                        loyalty discount.
                      </div>
                      <div className="flex gap-2 mt-2">
                        <button className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg">
                          Got it
                        </button>
                        <button className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg">
                          Need help
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <MicIcon className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-400 text-xs">
                          Voice message from Manager
                        </span>
                      </div>
                      <div className="bg-gray-700 rounded-lg h-6 flex items-center px-2">
                        <div className="flex gap-0.5 items-center">
                          {[3, 5, 4, 6, 3, 5, 4, 3, 6, 4, 5, 3].map((h, i) =>
                        <div
                          key={i}
                          className="bg-blue-400 rounded-full w-0.5"
                          style={{
                            height: `${h * 2}px`
                          }} />

                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }

              {/* Stats Screen */}
              {activeScreen === 'stats' &&
              <div className="p-4">
                  <div className="text-white font-bold text-sm mb-4">
                    My Stats — This Week
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-white">38.5h</div>
                      <div className="text-gray-400 text-xs">Hours logged</div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-emerald-400">
                        94%
                      </div>
                      <div className="text-gray-400 text-xs">
                        Tasks completed
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-blue-400">4.9</div>
                      <div className="text-gray-400 text-xs">
                        Customer rating
                      </div>
                    </div>
                    <div className="bg-gray-800 rounded-xl p-3 text-center">
                      <div className="text-xl font-bold text-amber-400">
                        $42
                      </div>
                      <div className="text-gray-400 text-xs">
                        AI dividend earned
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
                    <div className="text-emerald-400 text-xs font-semibold">
                      🏆 Top performer this week!
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      You're in the top 10% of your team
                    </div>
                  </div>
                </div>
              }
            </PhoneFrame>
          </div>

          {/* Features List */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Everything a beacon wearer needs, in one app
            </h3>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    One-Tap Check-In
                  </div>
                  <div className="text-gray-400 text-sm">
                    Tap your beacon to clock in, confirm your location, and load
                    your AI-assigned tasks for the day.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ClipboardListIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    AI-Assigned Tasks
                  </div>
                  <div className="text-gray-400 text-sm">
                    Tasks are prioritized and assigned by AI based on your
                    location, skills, and current workload.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheckIcon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Safety Status & SOS
                  </div>
                  <div className="text-gray-400 text-sm">
                    Real-time zone safety status, team proximity, and a
                    one-press SOS button that alerts supervisors instantly.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MicIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Voice-First Interface
                  </div>
                  <div className="text-gray-400 text-sm">
                    Works offline. BLE beacon sync. Voice messages from AI
                    agents with quick-reply options — hands-free for field
                    workers.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">
                    Personal Stats & Rewards
                  </div>
                  <div className="text-gray-400 text-sm">
                    Track your hours, task completion, customer ratings, and AI
                    dividend earnings — all in one place.
                  </div>
                </div>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                <SmartphoneIcon className="w-5 h-5 text-white" />
                <div>
                  <div className="text-gray-400 text-xs">Download on the</div>
                  <div className="text-white font-semibold text-sm">
                    App Store
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3">
                <SmartphoneIcon className="w-5 h-5 text-white" />
                <div>
                  <div className="text-gray-400 text-xs">Get it on</div>
                  <div className="text-white font-semibold text-sm">
                    Google Play
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}