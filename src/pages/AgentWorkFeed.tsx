import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  ShareIcon,
  FilterIcon,
  TrendingUpIcon,
  ZapIcon,
  DollarSignIcon,
  ClockIcon,
  StarIcon,
  ArrowLeftIcon,
  SendIcon,
  HeartIcon,
  CheckCircleIcon,
  ActivityIcon,
  BrainIcon } from
'lucide-react';
interface WorkPost {
  id: number;
  agent: string;
  agentColor: string;
  agentRole: string;
  business: string;
  industry: string;
  action: string;
  detail: string;
  outcome: string;
  impact: string;
  impactValue: string;
  confidence: number;
  time: string;
  likes: number;
  comments: Comment[];
  shares: number;
  userLiked: boolean;
  tags: string[];
}
interface Comment {
  id: number;
  author: string;
  text: string;
  time: string;
  isOwner?: boolean;
}
const initialPosts: WorkPost[] = [
{
  id: 1,
  agent: 'COO',
  agentColor: 'from-green-400 to-green-600',
  agentRole: 'Operations Excellence AI',
  business: 'Rivera Landscaping',
  industry: 'Landscaping',
  action: 'Rescheduled 3 crews around incoming storm',
  detail:
  'Detected weather alert 18 hours in advance. Automatically rescheduled 3 crews, notified 12 clients, and rerouted equipment to covered storage. Zero manual intervention required.',
  outcome: 'Prevented $4,200 in weather-related losses',
  impact: 'High',
  impactValue: '+$4,200',
  confidence: 96,
  time: '4 min ago',
  likes: 47,
  comments: [
  {
    id: 1,
    author: 'Maria R.',
    text: 'This is exactly why I hired the COO agent. Saved us last Tuesday too! 🙌',
    time: '2 min ago',
    isOwner: true
  },
  {
    id: 2,
    author: 'James T.',
    text: 'How does it detect weather that far in advance?',
    time: '1 min ago'
  }],

  shares: 12,
  userLiked: false,
  tags: ['weather', 'scheduling', 'operations']
},
{
  id: 5,
  agent: 'COO',
  agentColor: 'from-green-400 to-green-600',
  agentRole: 'Operations Excellence AI',
  business: 'Apex Warehouse Co.',
  industry: 'Warehousing',
  action: 'Zello PTT: Dock 3 crew rerouted in 90 seconds',
  detail:
  'Foreman Marcus spoke into Zello: "Dock 3 is backed up, need 2 more pickers ASAP." Guide Beacon GB-002 captured the transmission. APEX transcribed, classified as Operations/Urgent, and routed to COO Orion — who reassigned 2 pickers from Aisle 4, opened Dock 3, and notified the truck driver. Total time: 90 seconds. Zero phone calls.',
  outcome:
  '$2,400 overtime prevented · crew repositioned before truck arrived',
  impact: 'High',
  impactValue: '+$2,400',
  confidence: 98,
  time: '12 min ago',
  likes: 134,
  comments: [
  {
    id: 1,
    author: 'Marcus C.',
    text: 'I just talked into Zello like I always do. By the time I looked up, the crew was already moving. Wild.',
    time: '8 min ago',
    isOwner: true
  },
  {
    id: 2,
    author: 'Dispatch Lead',
    text: 'This is the Zello Bridge feature right? How do we get this?',
    time: '5 min ago'
  },
  {
    id: 3,
    author: 'Marcus C.',
    text: "@Dispatch it's in APEX under Zello Bridge. Took 5 min to set up.",
    time: '3 min ago',
    isOwner: true
  }],

  shares: 67,
  userLiked: false,
  tags: ['zello', 'ptt', 'beacon', 'warehousing']
},
{
  id: 2,
  agent: 'CFO',
  agentColor: 'from-blue-400 to-blue-600',
  agentRole: 'Financial Strategy AI',
  business: 'Apex HVAC Solutions',
  industry: 'HVAC',
  action: 'Recovered $8,100 in overdue invoices',
  detail:
  'Identified 7 invoices 30+ days overdue. Sent personalized follow-up sequences, escalated 2 accounts to collections protocol, and negotiated payment plans for 3 clients. All automated.',
  outcome: '$8,100 recovered in 48 hours',
  impact: 'High',
  impactValue: '+$8,100',
  confidence: 91,
  time: '22 min ago',
  likes: 89,
  comments: [
  {
    id: 1,
    author: 'Tom A.',
    text: 'Our CFO agent paid for itself in the first week. Unreal.',
    time: '15 min ago',
    isOwner: true
  },
  {
    id: 2,
    author: 'Sarah K.',
    text: 'Does it handle the awkward conversations automatically?',
    time: '10 min ago'
  },
  {
    id: 3,
    author: 'Tom A.',
    text: '@Sarah yes! It sends from your email address so it feels personal',
    time: '8 min ago',
    isOwner: true
  }],

  shares: 34,
  userLiked: true,
  tags: ['invoicing', 'collections', 'cash-flow']
},
{
  id: 6,
  agent: 'CLO',
  agentColor: 'from-cyan-400 to-cyan-600',
  agentRole: 'Legal & Compliance AI',
  business: 'Northside Construction',
  industry: 'Construction',
  action: 'Zello PTT: OSHA incident report filed in 2 minutes',
  detail:
  'Site super Kim spoke into Zello Safety Channel: "Near-miss at the crane, north side, everyone is okay but we need to document this." Beacon at Building C captured the transmission. APEX flagged CRITICAL, routed to CLO Lex — who generated a full OSHA-compliant incident report, notified insurance, and scheduled a safety review. Kim never left the site.',
  outcome: '$45K fine exposure avoided · full OSHA documentation in 2 min',
  impact: 'Critical',
  impactValue: '$45K saved',
  confidence: 99,
  time: '2 hrs ago',
  likes: 218,
  comments: [
  {
    id: 1,
    author: 'Kim N.',
    text: 'That one Zello call used to mean 4 hours of paperwork. Now I say it and walk away.',
    time: '1.5 hrs ago',
    isOwner: true
  },
  {
    id: 2,
    author: 'Safety Officer',
    text: 'The keyword detection on "near-miss" is what triggered the priority routing?',
    time: '1 hr ago'
  },
  {
    id: 3,
    author: 'Kim N.',
    text: '@Safety yes, APEX has trigger words configured. "near-miss", "emergency", "incident" all escalate immediately.',
    time: '45 min ago',
    isOwner: true
  }],

  shares: 94,
  userLiked: false,
  tags: ['zello', 'compliance', 'osha', 'construction']
},
{
  id: 3,
  agent: 'CMO',
  agentColor: 'from-pink-400 to-pink-600',
  agentRole: 'Growth Marketing AI',
  business: 'Summit Medical Practice',
  industry: 'Medical',
  action: 'Generated 6 new 5-star Google reviews',
  detail:
  'Identified 23 patients with recent positive outcomes. Sent personalized review request SMS at optimal timing (post-appointment, 2-hour window). 6 reviews received, 4 more pending.',
  outcome: 'Google rating improved from 4.2 to 4.6',
  impact: 'Medium',
  impactValue: '+4.6★',
  confidence: 88,
  time: '1 hr ago',
  likes: 124,
  comments: [
  {
    id: 1,
    author: 'Dr. Chen',
    text: "We've been trying to improve our rating for 2 years. CMO did it in a week.",
    time: '45 min ago',
    isOwner: true
  }],

  shares: 56,
  userLiked: false,
  tags: ['reviews', 'reputation', 'marketing']
},
{
  id: 4,
  agent: 'CEO',
  agentColor: 'from-amber-400 to-amber-600',
  agentRole: 'Growth & Leadership AI',
  business: 'Meridian Law Group',
  industry: 'Legal',
  action:
  'Coached partners on building a culture of growth — 3 promotions recommended',
  detail:
  'Analyzed 6 months of team performance data and identified 3 high-potential partners being underutilized. Prepared individual growth plans for each, recommended promotions, and drafted a firm-wide "culture of development" framework inspired by principle-based leadership. Also identified estate planning as an underserved opportunity and prepared a full market entry brief.',
  outcome:
  'New practice area launched + 3 growth plans delivered — $180K projected Year 1',
  impact: 'Critical',
  impactValue: '+$180K',
  confidence: 84,
  time: '3 hrs ago',
  likes: 203,
  comments: [
  {
    id: 1,
    author: 'Partner J.',
    text: "The CEO agent didn't just find a market opportunity — it told us we were underinvesting in our own people. That hit different.",
    time: '2 hrs ago',
    isOwner: true
  },
  {
    id: 2,
    author: 'Lisa M.',
    text: 'The growth plans it wrote for each partner were incredibly personal. How does it know this stuff?',
    time: '1 hr ago'
  },
  {
    id: 3,
    author: 'Partner J.',
    text: "@Lisa it analyzed communication patterns, case outcomes, and client feedback over 6 months. It sees what we don't.",
    time: '45 min ago',
    isOwner: true
  }],

  shares: 87,
  userLiked: false,
  tags: ['coaching', 'growth', 'leadership', 'people-development']
}];

const agentFilters = ['All', 'CEO', 'COO', 'CFO', 'CMO', 'CTO', 'Compliance'];
export function AgentWorkFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'top'>('recent');
  const filteredPosts = posts.filter(
    (p) => activeFilter === 'All' || p.agent === activeFilter
  );
  const handleLike = (id: number) => {
    setPosts((prev) =>
    prev.map((p) =>
    p.id === id ?
    {
      ...p,
      userLiked: !p.userLiked,
      likes: p.userLiked ? p.likes - 1 : p.likes + 1
    } :
    p
    )
    );
  };
  const handleComment = (postId: number) => {
    if (!newComment.trim()) return;
    setPosts((prev) =>
    prev.map((p) =>
    p.id === postId ?
    {
      ...p,
      comments: [
      ...p.comments,
      {
        id: Date.now(),
        author: 'You',
        text: newComment,
        time: 'just now'
      }]

    } :
    p
    )
    );
    setNewComment('');
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <a
                href="#"
                onClick={() => {
                  window.location.hash = '';
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">

                <ArrowLeftIcon className="w-4 h-4" />
              </a>
              <div>
                <h1 className="text-xl font-black text-white">
                  Agent Work Feed
                </h1>
                <p className="text-xs text-slate-400">
                  Public AI accomplishments — live
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  opacity: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
                className="w-2 h-2 bg-green-400 rounded-full" />

              <span className="text-xs text-green-400 font-semibold">Live</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {agentFilters.map((filter) =>
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${activeFilter === filter ? 'bg-accent-500/20 border-accent-500/50 text-accent-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>

                {filter}
              </button>
            )}
            <div className="flex-shrink-0 flex gap-1 ml-auto">
              {(['recent', 'top'] as const).map((s) =>
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border capitalize ${sortBy === s ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-white/5 text-slate-500'}`}>

                  {s}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-3xl mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
          {
            label: 'Total Impact Today',
            value: '$192,400',
            icon: DollarSignIcon,
            color: 'text-green-400'
          },
          {
            label: 'Hours Saved',
            value: '1,247',
            icon: ClockIcon,
            color: 'text-gold-400'
          },
          {
            label: 'Actions Completed',
            value: '3,891',
            icon: ZapIcon,
            color: 'text-accent-400'
          }].
          map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">

                <Icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                <p className={`text-lg font-black ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>);

          })}
        </div>

        {/* Posts */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredPosts.map((post, i) =>
            <motion.div
              key={post.id}
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
                delay: i * 0.08
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">

                {/* Post header */}
                <div className="p-5 pb-3">
                  <div className="flex items-start gap-3 mb-4">
                    <div
                    className={`w-12 h-12 bg-gradient-to-br ${post.agentColor} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                      <span className="text-white font-black">
                        {post.agent[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white">
                          {post.agent} Agent
                        </span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-400">
                          {post.agentRole}
                        </span>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-500">
                          {post.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400">
                          {post.business}
                        </span>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                          {post.industry}
                        </span>
                      </div>
                    </div>
                    <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${post.impact === 'Critical' ? 'bg-accent-500/20 text-accent-400 border border-accent-500/30' : post.impact === 'High' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>

                      {post.impactValue}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">
                    {post.action}
                  </h3>

                  <AnimatePresence>
                    {expandedPost === post.id ?
                  <motion.p
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    exit={{
                      opacity: 0,
                      height: 0
                    }}
                    className="text-sm text-slate-300 mb-3 leading-relaxed">

                        {post.detail}
                      </motion.p> :

                  <p className="text-sm text-slate-400 mb-3">
                        {post.outcome}
                      </p>
                  }
                  </AnimatePresence>

                  <button
                  onClick={() =>
                  setExpandedPost(expandedPost === post.id ? null : post.id)
                  }
                  className="text-xs text-accent-400 hover:text-accent-300 transition-colors">

                    {expandedPost === post.id ?
                  'Show less' :
                  'See full details →'}
                  </button>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) =>
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">

                        #{tag}
                      </span>
                  )}
                    <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full ml-auto">
                      {post.confidence}% confidence
                    </span>
                  </div>
                </div>

                {/* Action bar */}
                <div className="px-5 py-3 border-t border-white/10 flex items-center gap-3">
                  <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${post.userLiked ? 'bg-accent-500/20 border border-accent-500/40 text-accent-400' : 'text-slate-400 hover:text-accent-400 hover:bg-accent-500/10'}`}>

                    <HeartIcon
                    className={`w-4 h-4 ${post.userLiked ? 'fill-current' : ''}`} />

                    {post.likes}
                  </button>
                  <button
                  onClick={() =>
                  setExpandedPost(expandedPost === post.id ? null : post.id)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/10 transition-all">

                    <MessageSquareIcon className="w-4 h-4" />
                    {post.comments.length}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                    <ShareIcon className="w-4 h-4" />
                    Share
                  </button>
                  <div className="ml-auto flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) =>
                  <StarIcon
                    key={s}
                    className={`w-3.5 h-3.5 ${s <= 4 ? 'text-gold-400 fill-gold-400' : 'text-slate-600'}`} />

                  )}
                  </div>
                </div>

                {/* Comments */}
                <AnimatePresence>
                  {expandedPost === post.id &&
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0
                  }}
                  animate={{
                    opacity: 1,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  className="border-t border-white/10">

                      <div className="p-4 space-y-3">
                        {post.comments.map((comment) =>
                    <div
                      key={comment.id}
                      className={`flex gap-3 ${comment.isOwner ? 'flex-row-reverse' : ''}`}>

                            <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${comment.isOwner ? 'bg-accent-500/20 text-accent-400' : 'bg-white/10 text-slate-300'}`}>

                              {comment.author[0]}
                            </div>
                            <div
                        className={`flex-1 ${comment.isOwner ? 'text-right' : ''}`}>

                              <div
                          className={`inline-block px-3 py-2 rounded-2xl text-sm max-w-xs ${comment.isOwner ? 'bg-accent-500/10 border border-accent-500/20 text-slate-200' : 'bg-white/5 border border-white/10 text-slate-300'}`}>

                                {comment.text}
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                {comment.author} · {comment.time}
                              </p>
                            </div>
                          </div>
                    )}

                        {/* Comment input */}
                        <div className="flex gap-2 mt-4">
                          <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) =>
                        e.key === 'Enter' && handleComment(post.id)
                        }
                        placeholder="Praise this agent or ask a question..."
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-500/50" />

                          <button
                        onClick={() => handleComment(post.id)}
                        className="w-9 h-9 bg-accent-500 rounded-xl flex items-center justify-center hover:bg-accent-600 transition-colors">

                            <SendIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                }
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>);

}