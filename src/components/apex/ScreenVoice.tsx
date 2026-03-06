import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicIcon,
  MicOffIcon,
  ZapIcon,
  BrainIcon,
  ChevronRightIcon,
  Volume2Icon,
  RadioIcon } from
'lucide-react';
type VoiceState = 'idle' | 'listening' | 'processing' | 'responding';
const quickCommands = [
"What's my ROI today?",
'Show pending decisions',
'How is Orion performing?',
'Pause the CHRO agent',
'Approve all low-risk decisions',
'What did Felix flag this week?',
'Run a cash flow report',
'Who needs my attention?'];

const commandHistory = [
{
  id: 1,
  command: "What's my ROI today?",
  agent: 'CFO Felix',
  agentColor: 'text-blue-400',
  agentBg: 'bg-blue-500/20',
  response:
  'Total ROI today is $39,790 across all 7 active executives. CFO leads with $6,140. Up 23% from yesterday.',
  time: '2 min ago',
  status: 'done'
},
{
  id: 2,
  command: 'Show me pending decisions',
  agent: 'COO Orion',
  agentColor: 'text-green-400',
  agentBg: 'bg-green-500/20',
  response:
  '3 decisions need your approval: CFO flagged a net-60 invoice, CEO recommends Phoenix expansion, CFO recommends $50K credit buffer.',
  time: '14 min ago',
  status: 'done'
},
{
  id: 3,
  command: 'How is Lex performing?',
  agent: 'CLO Lex',
  agentColor: 'text-cyan-400',
  agentBg: 'bg-cyan-500/20',
  response:
  'Lex is performing at 99% — highest on the team. 12 decisions today, $9,800 ROI. OSHA compliance checklist is 100% complete.',
  time: '1 hr ago',
  status: 'done'
}];

const aiResponses: Record<
  string,
  {
    agent: string;
    agentColor: string;
    agentBg: string;
    response: string;
  }> =
{
  "What's my ROI today?": {
    agent: 'CFO Felix',
    agentColor: 'text-blue-400',
    agentBg: 'bg-blue-500/20',
    response:
    'Total ROI today is $39,790 across all 7 active executives. CFO leads with $6,140. Up 23% from yesterday.'
  },
  'Show pending decisions': {
    agent: 'COO Orion',
    agentColor: 'text-green-400',
    agentBg: 'bg-green-500/20',
    response:
    "3 decisions need your approval. I've routed them by priority — CFO's cash flow recommendation is most time-sensitive."
  },
  'How is Orion performing?': {
    agent: 'COO Orion',
    agentColor: 'text-green-400',
    agentBg: 'bg-green-500/20',
    response:
    'Orion is at 91% performance. 156 decisions today, $8,320 ROI. Just rerouted 3 crews to Dock B — saved $4,200 in overtime.'
  },
  'Pause the CHRO agent': {
    agent: 'CHRO Hana',
    agentColor: 'text-rose-400',
    agentBg: 'bg-rose-500/20',
    response:
    'CHRO Hana has been paused. All pending HR tasks have been queued. Resume anytime from the Team screen.'
  },
  'Approve all low-risk decisions': {
    agent: 'CEO Aria',
    agentColor: 'text-amber-400',
    agentBg: 'bg-amber-500/20',
    response:
    'Approved 5 low-risk decisions (confidence >90%, impact Medium or below). 2 Critical decisions still require your manual review.'
  },
  'What did Felix flag this week?': {
    agent: 'CFO Felix',
    agentColor: 'text-blue-400',
    agentBg: 'bg-blue-500/20',
    response:
    'Felix flagged 3 items: Acme Corp net-60 invoice ($8,200 risk), Q1 cash flow gap ($50K buffer recommended), and 2 overdue receivables totaling $14,400.'
  },
  'Run a cash flow report': {
    agent: 'CFO Felix',
    agentColor: 'text-blue-400',
    agentBg: 'bg-blue-500/20',
    response:
    'Cash flow report generated. Current runway: 4.2 months. Receivables: $127K outstanding. Payables due this week: $34K. Recommendation: draw $50K credit buffer.'
  },
  'Who needs my attention?': {
    agent: 'CEO Aria',
    agentColor: 'text-amber-400',
    agentBg: 'bg-amber-500/20',
    response:
    '3 items need you: Phoenix expansion decision (CEO, Critical), $50K credit line approval (CFO, High), and Beacon GB-005 is offline in Loading Bay 2.'
  }
};
export function ScreenVoice() {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [currentResponse, setCurrentResponse] = useState<
    (typeof commandHistory)[0] | null>(
    null);
  const [history, setHistory] = useState(commandHistory);
  const [isMuted, setIsMuted] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleMicClick = () => {
    if (voiceState === 'listening') {
      setVoiceState('idle');
      setTranscript('');
      return;
    }
    setVoiceState('listening');
    setTranscript('');
    setCurrentResponse(null);
  };
  const handleQuickCommand = (cmd: string) => {
    if (voiceState !== 'idle') return;
    setTranscript(cmd);
    setVoiceState('processing');
    setCurrentResponse(null);
    timeoutRef.current = setTimeout(() => {
      const resp = aiResponses[cmd] || {
        agent: 'CEO Aria',
        agentColor: 'text-amber-400',
        agentBg: 'bg-amber-500/20',
        response: 'Processing your request. Your AI team is on it.'
      };
      const newEntry = {
        id: Date.now(),
        command: cmd,
        ...resp,
        time: 'just now',
        status: 'done' as const
      };
      setCurrentResponse(newEntry);
      setHistory((prev) => [newEntry, ...prev.slice(0, 4)]);
      setVoiceState('responding');
      timeoutRef.current = setTimeout(() => {
        setVoiceState('idle');
      }, 3000);
    }, 1800);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  const micColors = {
    idle: 'bg-slate-800 border-slate-700 text-slate-400',
    listening: 'bg-orange-500/20 border-orange-500 text-orange-400',
    processing: 'bg-blue-500/20 border-blue-500 text-blue-400',
    responding: 'bg-green-500/20 border-green-500 text-green-400'
  };
  const statusLabels = {
    idle: 'Tap to speak',
    listening: 'Listening...',
    processing: 'Processing...',
    responding: 'Responding'
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Speak to your AI C-Suite · Voice-first platform</p>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500/20 border-red-500/40 text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'}`}>

          {isMuted ?
          <MicOffIcon className="w-4 h-4" /> :

          <Volume2Icon className="w-4 h-4" />
          }
        </button>
      </div>

      {/* Main mic interface */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center gap-6">
        {/* Mic button */}
        <div className="relative">
          {voiceState === 'listening' &&
          <>
              <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 rounded-full bg-orange-500/20" />

              <motion.div
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.3
              }}
              className="absolute inset-0 rounded-full bg-orange-500/10" />

            </>
          }
          <motion.button
            whileTap={{
              scale: 0.95
            }}
            onClick={handleMicClick}
            className={`relative w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${micColors[voiceState]}`}>

            {voiceState === 'processing' ?
            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }}>

                <BrainIcon className="w-10 h-10" />
              </motion.div> :

            <MicIcon className="w-10 h-10" />
            }
          </motion.button>
        </div>

        {/* Status label */}
        <div className="text-center">
          <p
            className={`text-sm font-bold transition-colors ${voiceState === 'idle' ? 'text-slate-500' : voiceState === 'listening' ? 'text-orange-400' : voiceState === 'processing' ? 'text-blue-400' : 'text-green-400'}`}>

            {statusLabels[voiceState]}
          </p>
          {transcript &&
          <motion.p
            initial={{
              opacity: 0,
              y: 5
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-white font-semibold mt-1 text-sm">

              "{transcript}"
            </motion.p>
          }
        </div>

        {/* Live response */}
        <AnimatePresence>
          {currentResponse && voiceState === 'responding' &&
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.97
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            className="w-full bg-green-500/10 border border-green-500/30 rounded-xl p-4">

              <div className="flex items-center gap-2 mb-2">
                <span
                className={`text-xs font-black px-2 py-1 rounded-lg ${currentResponse.agentBg} ${currentResponse.agentColor}`}>

                  {currentResponse.agent}
                </span>
                <span className="text-xs text-slate-500">responding</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {currentResponse.response}
              </p>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      {/* Quick commands */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">Quick Commands</p>
        <div className="flex flex-wrap gap-2">
          {quickCommands.map((cmd) =>
          <motion.button
            key={cmd}
            whileTap={{
              scale: 0.97
            }}
            onClick={() => handleQuickCommand(cmd)}
            disabled={voiceState !== 'idle'}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 bg-slate-800 border border-slate-700 hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-300 text-slate-300 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed">

              <ZapIcon className="w-3 h-3 text-orange-400" />
              {cmd}
            </motion.button>
          )}
        </div>
      </div>

      {/* Command history */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">Recent Commands</p>
        <div className="space-y-3">
          {history.map((item, i) =>
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.05
            }}
            className="border-b border-slate-800 last:border-0 pb-3 last:pb-0">

              <div className="flex items-start gap-2 mb-1.5">
                <MicIcon className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white font-semibold">
                  "{item.command}"
                </p>
                <span className="text-xs text-slate-600 ml-auto flex-shrink-0">
                  {item.time}
                </span>
              </div>
              <div className="flex items-start gap-2 pl-5">
                <span
                className={`text-xs font-black px-1.5 py-0.5 rounded-lg ${item.agentBg} ${item.agentColor} flex-shrink-0`}>

                  {item.agent.split(' ')[0]}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.response}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Zello Bridge callout */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <RadioIcon className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Zello PTT Bridge</p>
            <p className="text-xs text-slate-500">
              Field voice → Beacon capture → APEX Engine
            </p>
          </div>
          <span className="ml-auto flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full flex-shrink-0">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Active
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          Workers speak into Zello channels in the field. Guide Beacons capture
          the transmission and route it to your AI executives — no app
          switching, no manual entry.
        </p>
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          {[
          {
            label: 'Channels',
            value: '5',
            color: 'text-emerald-400'
          },
          {
            label: 'Today',
            value: '1,550',
            color: 'text-orange-400'
          },
          {
            label: 'Avg Response',
            value: '1.2s',
            color: 'text-blue-400'
          }].
          map((m) =>
          <div key={m.label} className="bg-slate-900/60 rounded-xl p-2">
              <p className={`text-base font-black ${m.color}`}>{m.value}</p>
              <p className="text-[10px] text-slate-500">{m.label}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            // Navigate to Zello screen — dispatch custom event for parent to handle
            const event = new CustomEvent('apex-navigate', {
              detail: 'zello'
            });
            window.dispatchEvent(event);
          }}
          className="w-full text-xs font-bold py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 rounded-xl transition-all">

          Open Zello Bridge →
        </button>
      </div>

      {/* Voice tips */}
      <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Voice Tips
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
          'Say an executive name to direct questions: "Felix, what\'s our cash position?"',
          'Use "approve" or "reject" followed by a decision category',
          'Ask for reports: "Run a weekly performance summary"',
          'Set thresholds: "Auto-approve decisions under $500"'].
          map((tip, i) =>
          <div
            key={i}
            className="flex items-start gap-2 text-xs text-slate-400">

              <ChevronRightIcon className="w-3 h-3 text-orange-400 flex-shrink-0 mt-0.5" />
              {tip}
            </div>
          )}
        </div>
      </div>
    </div>);

}