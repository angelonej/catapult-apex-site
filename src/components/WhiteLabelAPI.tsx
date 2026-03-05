import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CodeIcon,
  GitBranchIcon,
  StarIcon,
  GitForkIcon,
  PackageIcon,
  KeyIcon,
  WebhookIcon,
  ZapIcon,
  CheckIcon,
  CopyIcon,
  TerminalIcon,
  GlobeIcon,
  PaletteIcon,
  BuildingIcon,
  ArrowRightIcon,
  ShieldIcon,
  LayersIcon,
  CpuIcon,
  BookOpenIcon,
  ChevronRightIcon,
  CircleIcon,
  FileCodeIcon,
  FolderIcon,
  ExternalLinkIcon } from
'lucide-react';
type ApiTab = 'rest' | 'webhooks' | 'sdk';
type CodeTab = 'javascript' | 'python' | 'curl';
const fileTree = [
{
  type: 'folder',
  name: 'src',
  depth: 0
},
{
  type: 'folder',
  name: 'clients',
  depth: 1
},
{
  type: 'file',
  name: 'CatapultClient.ts',
  depth: 2
},
{
  type: 'file',
  name: 'ExecutivesClient.ts',
  depth: 2
},
{
  type: 'file',
  name: 'DecisionsClient.ts',
  depth: 2
},
{
  type: 'folder',
  name: 'types',
  depth: 1
},
{
  type: 'file',
  name: 'index.ts',
  depth: 2
},
{
  type: 'folder',
  name: 'webhooks',
  depth: 1
},
{
  type: 'file',
  name: 'handler.ts',
  depth: 2
},
{
  type: 'file',
  name: 'index.ts',
  depth: 0
},
{
  type: 'file',
  name: 'package.json',
  depth: 0
},
{
  type: 'file',
  name: 'README.md',
  depth: 0
}];

const codeExamples: Record<CodeTab, string[]> = {
  javascript: [
  `import { CatapultClient } from '@catapult-ai/sdk'`,
  ``,
  `const client = new CatapultClient({`,
  `  apiKey: 'cat_live_sk_xxxxxxxxxxxx',`,
  `  workspace: 'your-workspace-id'`,
  `})`,
  ``,
  `// Deploy an AI Executive`,
  `const coo = await client.executives.deploy({`,
  `  role: 'COO',`,
  `  industry: 'trades',`,
  `  persona: 'Orion'`,
  `})`,
  ``,
  `// Fetch pending decisions`,
  `const decisions = await client.decisions.list({`,
  `  status: 'pending',`,
  `  limit: 10`,
  `})`,
  ``,
  `console.log(\`\${decisions.total} decisions awaiting review\`)`],

  python: [
  `from catapult_ai import CatapultClient`,
  ``,
  `client = CatapultClient(`,
  `    api_key="cat_live_sk_xxxxxxxxxxxx",`,
  `    workspace="your-workspace-id"`,
  `)`,
  ``,
  `# Deploy an AI Executive`,
  `coo = client.executives.deploy(`,
  `    role="COO",`,
  `    industry="trades",`,
  `    persona="Orion"`,
  `)`,
  ``,
  `# Fetch pending decisions`,
  `decisions = client.decisions.list(`,
  `    status="pending",`,
  `    limit=10`,
  `)`,
  ``,
  `print(f"{decisions.total} decisions awaiting review")`],

  curl: [
  `# Deploy an AI Executive`,
  `curl -X POST https://api.catapult.ai/v1/executives/deploy \\`,
  `  -H "Authorization: Bearer cat_live_sk_xxxx" \\`,
  `  -H "Content-Type: application/json" \\`,
  `  -d '{`,
  `    "role": "COO",`,
  `    "industry": "trades",`,
  `    "persona": "Orion"`,
  `  }'`,
  ``,
  `# List pending decisions`,
  `curl https://api.catapult.ai/v1/decisions?status=pending \\`,
  `  -H "Authorization: Bearer cat_live_sk_xxxx"`]

};
const apiEndpoints = [
{
  method: 'POST',
  path: '/v1/executives/deploy',
  desc: 'Deploy an AI executive to a workspace',
  color: 'bg-green-500/20 text-green-400 border-green-500/30'
},
{
  method: 'GET',
  path: '/v1/executives',
  desc: 'List all deployed executives',
  color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
},
{
  method: 'GET',
  path: '/v1/decisions',
  desc: 'Fetch decisions queue with filters',
  color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
},
{
  method: 'POST',
  path: '/v1/decisions/{id}/approve',
  desc: 'Approve a pending AI decision',
  color: 'bg-green-500/20 text-green-400 border-green-500/30'
},
{
  method: 'GET',
  path: '/v1/analytics/roi',
  desc: 'Pull ROI metrics and time savings',
  color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
},
{
  method: 'POST',
  path: '/v1/webhooks/subscribe',
  desc: 'Subscribe to real-time event streams',
  color: 'bg-green-500/20 text-green-400 border-green-500/30'
},
{
  method: 'DELETE',
  path: '/v1/executives/{id}',
  desc: 'Decommission an AI executive',
  color: 'bg-red-500/20 text-red-400 border-red-500/30'
},
{
  method: 'PATCH',
  path: '/v1/executives/{id}/config',
  desc: 'Update executive configuration',
  color: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
}];

const webhookEvents = [
{
  event: 'decision.created',
  desc: 'AI executive created a new decision',
  color: 'text-orange-400'
},
{
  event: 'decision.approved',
  desc: 'Decision approved by operator',
  color: 'text-green-400'
},
{
  event: 'decision.auto_executed',
  desc: 'Decision auto-executed within threshold',
  color: 'text-blue-400'
},
{
  event: 'executive.deployed',
  desc: 'New AI executive went live',
  color: 'text-violet-400'
},
{
  event: 'roi.milestone',
  desc: 'ROI milestone reached',
  color: 'text-amber-400'
},
{
  event: 'alert.anomaly',
  desc: 'Anomaly detected in business metrics',
  color: 'text-red-400'
}];

const whiteLabelTiers = [
{
  name: 'Agency Partner',
  price: '$499',
  period: '/mo',
  color: 'from-blue-500 to-blue-700',
  border: 'border-blue-500/30',
  bg: 'bg-blue-500/10',
  text: 'text-blue-400',
  features: [
  'White-label dashboard for up to 25 clients',
  'Custom logo & color scheme',
  'Your domain (app.yourbrand.com)',
  'Reseller margin up to 40%',
  'Co-branded onboarding flows',
  'Partner support portal']

},
{
  name: 'Enterprise White Label',
  price: '$1,999',
  period: '/mo',
  color: 'from-orange-500 to-orange-700',
  border: 'border-orange-500/30',
  bg: 'bg-orange-500/10',
  text: 'text-orange-400',
  highlight: true,
  features: [
  'Unlimited white-label client seats',
  'Full brand replacement (no Catapult branding)',
  'Custom AI executive names & personas',
  'White-labeled mobile apps (iOS + Android)',
  'Custom domain + SSL + CDN',
  'Dedicated partner success manager',
  'Revenue share up to 60%',
  'API-first architecture access']

},
{
  name: 'Platform License',
  price: 'Custom',
  period: '',
  color: 'from-violet-500 to-purple-700',
  border: 'border-violet-500/30',
  bg: 'bg-violet-500/10',
  text: 'text-violet-400',
  features: [
  'Full source code license',
  'On-premise or private cloud deployment',
  'Custom AI model fine-tuning',
  'Dedicated infrastructure',
  'SLA with 99.99% uptime guarantee',
  'Enterprise support & training']

}];

function CodeLine({ line, index }: {line: string;index: number;}) {
  const renderLine = (text: string) => {
    if (text.startsWith('#') || text.startsWith('//')) {
      return <span className="text-slate-500 italic">{text}</span>;
    }
    const parts: React.ReactNode[] = [];
    let remaining = text;
    const patterns = [
    {
      regex:
      /^(import|from|const|let|await|async|function|return|print|curl)\b/,
      color: 'text-violet-400'
    },
    {
      regex: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/,
      color: 'text-green-400'
    },
    {
      regex: /\b(POST|GET|DELETE|PATCH)\b/,
      color: 'text-amber-400'
    },
    {
      regex: /\b(true|false|null|undefined)\b/,
      color: 'text-orange-400'
    },
    {
      regex: /\b\d+\b/,
      color: 'text-blue-400'
    }];

    // Simple colorization
    if (
    text.includes('import ') ||
    text.includes('from ') ||
    text.includes('const ') ||
    text.includes('await '))
    {
      return (
        <span>
          {text.
          split(/\b(import|from|const|let|await|async|return)\b/).
          map((part, i) =>
          [
          'import',
          'from',
          'const',
          'let',
          'await',
          'async',
          'return'].
          includes(part) ?
          <span key={i} className="text-violet-400">
                  {part}
                </span> :
          part.includes("'") ||
          part.includes('"') ||
          part.includes('`') ?
          <span key={i}>
                  {part.split(/('.*?'|".*?"|`.*?`)/).map((p, j) =>
            p.startsWith("'") ||
            p.startsWith('"') ||
            p.startsWith('`') ?
            <span key={j} className="text-green-400">
                        {p}
                      </span> :

            <span key={j} className="text-slate-300">
                        {p}
                      </span>

            )}
                </span> :

          <span key={i} className="text-slate-300">
                  {part}
                </span>

          )}
        </span>);

    }
    if (
    text.includes('POST') ||
    text.includes('GET') ||
    text.includes('DELETE') ||
    text.includes('PATCH'))
    {
      return (
        <span>
          {text.split(/\b(POST|GET|DELETE|PATCH)\b/).map((part, i) =>
          ['POST', 'GET', 'DELETE', 'PATCH'].includes(part) ?
          <span key={i} className="text-amber-400 font-bold">
                {part}
              </span> :

          <span key={i} className="text-slate-300">
                {part}
              </span>

          )}
        </span>);

    }
    return <span className="text-slate-300">{text}</span>;
  };
  return (
    <div className="flex items-start group">
      <span className="w-8 text-right text-slate-600 text-xs select-none mr-4 pt-0.5 flex-shrink-0 font-mono">
        {index + 1}
      </span>
      <span className="font-mono text-xs leading-relaxed whitespace-pre">
        {line === '' ? <span>&nbsp;</span> : renderLine(line)}
      </span>
    </div>);

}
export function WhiteLabelAPI() {
  const [apiTab, setApiTab] = useState<ApiTab>('rest');
  const [codeTab, setCodeTab] = useState<CodeTab>('javascript');
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [selectedFile, setSelectedFile] = useState('CatapultClient.ts');
  const handleCopyInstall = () => {
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-80px'
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-20">

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
              delay: 0.1
            }}
            className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-5 py-2.5 mb-6">

            <CodeIcon className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-400 tracking-wide">
              White Label & API
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Build On Catapult.
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Ship Under Your Brand.
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Full white-label platform for agencies and enterprise partners.
            Complete REST API, webhooks, and SDKs for developers who want to
            build on top of the Catapult AI infrastructure.
          </p>
        </motion.div>

        {/* ── GITHUB FRAME ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 32
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-60px'
          }}
          transition={{
            duration: 0.6
          }}
          className="mb-20">

          {/* GitHub repo header */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-t-2xl px-5 py-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                {/* GitHub-style avatar */}
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-black text-xs">C</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-[#58a6ff] font-semibold hover:underline cursor-pointer">
                    catapult-ai
                  </span>
                  <span className="text-[#8b949e]">/</span>
                  <span className="text-[#58a6ff] font-bold hover:underline cursor-pointer">
                    catapult-sdk
                  </span>
                </div>
                <span className="text-[10px] font-semibold border border-[#30363d] text-[#8b949e] px-2 py-0.5 rounded-full">
                  Public
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#30363d] transition-colors">
                  <StarIcon className="w-3.5 h-3.5" />
                  Star
                  <span className="bg-[#30363d] px-1.5 py-0.5 rounded-full text-[10px] ml-1">
                    2.4k
                  </span>
                </button>
                <button className="flex items-center gap-1.5 bg-[#21262d] border border-[#30363d] text-[#c9d1d9] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[#30363d] transition-colors">
                  <GitForkIcon className="w-3.5 h-3.5" />
                  Fork
                  <span className="bg-[#30363d] px-1.5 py-0.5 rounded-full text-[10px] ml-1">
                    341
                  </span>
                </button>
              </div>
            </div>

            {/* Repo nav tabs */}
            <div className="flex items-center gap-1 mt-4 border-b border-[#21262d] -mx-5 px-5 overflow-x-auto">
              {['Code', 'Issues', 'Pull requests', 'Actions', 'Wiki'].map(
                (tab, i) =>
                <button
                  key={tab}
                  className={`flex items-center gap-1.5 text-xs px-3 py-2 border-b-2 transition-colors whitespace-nowrap ${i === 0 ? 'border-[#f78166] text-[#c9d1d9] font-semibold' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`}>

                    {i === 0 && <FileCodeIcon className="w-3.5 h-3.5" />}
                    {tab}
                    {i === 1 &&
                  <span className="bg-[#30363d] text-[#8b949e] text-[10px] px-1.5 py-0.5 rounded-full">
                        3
                      </span>
                  }
                  </button>

              )}
            </div>
          </div>

          {/* Repo body */}
          <div className="bg-[#0d1117] border-x border-[#30363d] flex flex-col lg:flex-row">
            {/* File tree */}
            <div className="lg:w-64 border-b lg:border-b-0 lg:border-r border-[#21262d] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GitBranchIcon className="w-3.5 h-3.5 text-[#8b949e]" />
                  <span className="text-xs font-semibold text-[#c9d1d9]">
                    main
                  </span>
                </div>
                <span className="text-[10px] text-[#8b949e]">47 commits</span>
              </div>
              <div className="space-y-0.5">
                {fileTree.map((item, i) =>
                <button
                  key={i}
                  onClick={() =>
                  item.type === 'file' && setSelectedFile(item.name)
                  }
                  className={`w-full flex items-center gap-2 px-2 py-1 rounded text-xs text-left transition-colors ${item.type === 'file' && selectedFile === item.name ? 'bg-[#1f6feb]/30 text-[#58a6ff]' : 'text-[#c9d1d9] hover:bg-[#21262d]'}`}
                  style={{
                    paddingLeft: `${8 + item.depth * 16}px`
                  }}>

                    {item.type === 'folder' ?
                  <FolderIcon className="w-3.5 h-3.5 text-[#58a6ff] flex-shrink-0" /> :

                  <FileCodeIcon className="w-3.5 h-3.5 text-[#8b949e] flex-shrink-0" />
                  }
                    <span className="truncate">{item.name}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Code viewer */}
            <div className="flex-1 min-w-0">
              {/* File header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#21262d]">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <FileCodeIcon className="w-3.5 h-3.5" />
                  <span>{selectedFile}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[#8b949e]">
                  <span>TypeScript</span>
                  <span>·</span>
                  <span>MIT License</span>
                </div>
              </div>

              {/* Code content */}
              <div className="p-4 overflow-x-auto">
                {/* Language tabs */}
                <div className="flex items-center gap-1 mb-4 bg-[#161b22] rounded-lg p-1 w-fit">
                  {(['javascript', 'python', 'curl'] as CodeTab[]).map(
                    (lang) =>
                    <button
                      key={lang}
                      onClick={() => setCodeTab(lang)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${codeTab === lang ? 'bg-[#21262d] text-[#c9d1d9]' : 'text-[#8b949e] hover:text-[#c9d1d9]'}`}>

                        {lang === 'javascript' ?
                      'JavaScript' :
                      lang === 'python' ?
                      'Python' :
                      'cURL'}
                      </button>

                  )}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={codeTab}
                    initial={{
                      opacity: 0,
                      y: 4
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
                    className="space-y-0.5">

                    {codeExamples[codeTab].map((line, i) =>
                    <CodeLine key={i} line={line} index={i} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* README section */}
          <div className="bg-[#0d1117] border border-[#30363d] rounded-b-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpenIcon className="w-4 h-4 text-[#8b949e]" />
              <span className="text-sm font-semibold text-[#c9d1d9]">
                README.md
              </span>
            </div>

            {/* Install command */}
            <div className="mb-4">
              <p className="text-xs text-[#8b949e] mb-2 font-semibold uppercase tracking-wide">
                Installation
              </p>
              <div className="flex items-center gap-3 bg-[#161b22] border border-[#30363d] rounded-xl px-4 py-3">
                <TerminalIcon className="w-4 h-4 text-[#8b949e] flex-shrink-0" />
                <code className="text-sm text-[#c9d1d9] font-mono flex-1">
                  npm install @catapult-ai/sdk
                </code>
                <button
                  onClick={handleCopyInstall}
                  className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors">

                  {copiedInstall ?
                  <>
                      <CheckIcon className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </> :

                  <>
                      <CopyIcon className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  }
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-[#238636]/20 border border-[#238636]/40 text-[#3fb950] px-2 py-1 rounded font-mono">
                v2.4.1 stable
              </span>
              <span className="text-[10px] bg-[#1f6feb]/20 border border-[#1f6feb]/40 text-[#58a6ff] px-2 py-1 rounded font-mono">
                TypeScript
              </span>
              <span className="text-[10px] bg-[#8957e5]/20 border border-[#8957e5]/40 text-[#bc8cff] px-2 py-1 rounded font-mono">
                MIT License
              </span>
              <span className="text-[10px] bg-[#da3633]/20 border border-[#da3633]/40 text-[#ff7b72] px-2 py-1 rounded font-mono">
                100% test coverage
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── API DOCUMENTATION ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-60px'
          }}
          transition={{
            duration: 0.5
          }}
          className="mb-20">

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <KeyIcon className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-400">
                API Reference
              </span>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              Everything You Need to Build
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              REST API, webhooks, and native SDKs for JavaScript and Python.
              Built for developers who move fast.
            </p>
          </div>

          {/* API tabs */}
          <div className="flex bg-slate-800/60 rounded-xl p-1 gap-1 w-fit mx-auto mb-8">
            {(['rest', 'webhooks', 'sdk'] as ApiTab[]).map((tab) =>
            <button
              key={tab}
              onClick={() => setApiTab(tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${apiTab === tab ? 'bg-orange-500 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}>

                {tab === 'rest' && <LayersIcon className="w-4 h-4" />}
                {tab === 'webhooks' && <WebhookIcon className="w-4 h-4" />}
                {tab === 'sdk' && <PackageIcon className="w-4 h-4" />}
                {tab === 'rest' ?
              'REST API' :
              tab === 'webhooks' ?
              'Webhooks' :
              'SDKs'}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {apiTab === 'rest' &&
            <motion.div
              key="rest"
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-800/40">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300">
                      Base URL
                    </span>
                    <code className="text-xs text-orange-400 font-mono bg-orange-500/10 px-2 py-0.5 rounded">
                      https://api.catapult.ai/v1
                    </code>
                  </div>
                  <span className="text-xs text-slate-500">
                    Bearer token auth
                  </span>
                </div>
                <div className="divide-y divide-slate-800">
                  {apiEndpoints.map((ep, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: -8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.04
                  }}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-800/30 transition-colors group">

                      <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded border font-mono flex-shrink-0 w-14 text-center ${ep.color}`}>

                        {ep.method}
                      </span>
                      <code className="text-sm text-slate-200 font-mono flex-1">
                        {ep.path}
                      </code>
                      <span className="text-xs text-slate-500 hidden sm:block">
                        {ep.desc}
                      </span>
                      <ChevronRightIcon className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                    </motion.div>
                )}
                </div>
              </motion.div>
            }

            {apiTab === 'webhooks' &&
            <motion.div
              key="webhooks"
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

                <div className="px-5 py-3 border-b border-slate-800 bg-slate-800/40">
                  <p className="text-xs text-slate-400">
                    Real-time event streams delivered to your endpoint via HTTPS
                    POST
                  </p>
                </div>
                <div className="divide-y divide-slate-800">
                  {webhookEvents.map((ev, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: -8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.06
                  }}
                  className="flex items-center gap-4 px-5 py-3.5">

                      <motion.span
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="w-2 h-2 rounded-full bg-current flex-shrink-0"
                    style={{
                      color: ev.color.replace('text-', '')
                    }} />

                      <code
                    className={`text-sm font-mono font-bold flex-1 ${ev.color}`}>

                        {ev.event}
                      </code>
                      <span className="text-xs text-slate-500 hidden sm:block">
                        {ev.desc}
                      </span>
                    </motion.div>
                )}
                </div>
                <div className="px-5 py-4 border-t border-slate-800 bg-slate-800/20">
                  <div className="flex items-center gap-3 bg-slate-800 rounded-xl px-4 py-3">
                    <TerminalIcon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <code className="text-xs text-slate-300 font-mono">
                      POST https://your-endpoint.com/catapult-webhooks
                    </code>
                  </div>
                </div>
              </motion.div>
            }

            {apiTab === 'sdk' &&
            <motion.div
              key="sdk"
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-yellow-400 font-black text-sm">
                      JS
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    JavaScript / TypeScript
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Full TypeScript support with auto-complete and type safety.
                  </p>
                  <code className="block text-xs text-green-400 font-mono bg-slate-800 rounded-lg px-3 py-2 mb-3">
                    npm i @catapult-ai/sdk
                  </code>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      v2.4.1
                    </span>
                    <span>·</span>
                    <span>Weekly downloads: 12.4k</span>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-blue-400 font-black text-sm">PY</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    Python
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Async-first Python SDK with Pydantic models and full type
                    hints.
                  </p>
                  <code className="block text-xs text-green-400 font-mono bg-slate-800 rounded-lg px-3 py-2 mb-3">
                    pip install catapult-ai
                  </code>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      v2.3.0
                    </span>
                    <span>·</span>
                    <span>Python 3.9+</span>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
                  <div className="w-10 h-10 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                    <TerminalIcon className="w-5 h-5 text-orange-400" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    REST / cURL
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Language-agnostic REST API. Works with any HTTP client.
                  </p>
                  <code className="block text-xs text-green-400 font-mono bg-slate-800 rounded-lg px-3 py-2 mb-3">
                    curl api.catapult.ai/v1
                  </code>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="bg-slate-800 px-2 py-0.5 rounded">
                      OpenAPI 3.1
                    </span>
                    <span>·</span>
                    <span>Postman collection</span>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </motion.div>

        {/* ── WHITE LABEL TIERS ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-60px'
          }}
          transition={{
            duration: 0.5
          }}>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 rounded-full px-4 py-2 mb-4">
              <PaletteIcon className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-bold text-violet-400">
                White Label Program
              </span>
            </div>
            <h3 className="text-3xl font-black text-white mb-3">
              Your Brand. Our Engine.
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Resell Catapult under your own brand. Keep the margin. Your
              clients never see us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {whiteLabelTiers.map((tier, i) =>
            <motion.div
              key={tier.name}
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
                delay: i * 0.1,
                duration: 0.4
              }}
              className={`relative bg-slate-900 border rounded-2xl p-6 ${tier.highlight ? 'border-orange-500/50 ring-1 ring-orange-500/20' : 'border-slate-700/50'}`}>

                {tier.highlight &&
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-black px-4 py-1 rounded-full shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
              }

                <div
                className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>

                  <BuildingIcon className="w-6 h-6 text-white" />
                </div>

                <h4 className="text-lg font-black text-white mb-1">
                  {tier.name}
                </h4>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className={`text-3xl font-black ${tier.text}`}>
                    {tier.price}
                  </span>
                  {tier.period &&
                <span className="text-slate-500 text-sm">
                      {tier.period}
                    </span>
                }
                </div>

                <div className="space-y-2.5 mb-6">
                  {tier.features.map((feature, fi) =>
                <div
                  key={fi}
                  className="flex items-start gap-2.5 text-sm text-slate-300">

                      <CheckIcon
                    className={`w-4 h-4 ${tier.text} flex-shrink-0 mt-0.5`} />

                      <span>{feature}</span>
                    </div>
                )}
                </div>

                <button
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${tier.highlight ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700' : `${tier.bg} border ${tier.border} ${tier.text} hover:opacity-80`}`}>

                  {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom trust strip */}
          <motion.div
            initial={{
              opacity: 0,
              y: 16
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.4,
              duration: 0.4
            }}
            className="mt-10 bg-slate-900/60 border border-slate-700/40 rounded-2xl px-6 py-5">

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-green-400" />
                <span>SOC 2 Type II Compliant</span>
              </div>
              <div className="w-px h-4 bg-slate-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <ZapIcon className="w-4 h-4 text-orange-400" />
                <span>99.99% API Uptime SLA</span>
              </div>
              <div className="w-px h-4 bg-slate-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-4 h-4 text-blue-400" />
                <span>Global CDN · 12 regions</span>
              </div>
              <div className="w-px h-4 bg-slate-700 hidden sm:block" />
              <div className="flex items-center gap-2">
                <CpuIcon className="w-4 h-4 text-violet-400" />
                <span>Rate limit: 10,000 req/min</span>
              </div>
              <div className="w-px h-4 bg-slate-700 hidden sm:block" />
              <button className="flex items-center gap-1.5 text-orange-400 font-semibold hover:text-orange-300 transition-colors">
                View full API docs
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}