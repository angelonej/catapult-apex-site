import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { OnboardingFlow } from '../components/OnboardingFlow';
import { GuideBeaconEcosystem } from '../components/GuideBeaconEcosystem';
import { ActionAgentEngine } from '../components/ActionAgentEngine';
import { AgentMarketplace } from '../components/AgentMarketplace';
import { BlockchainLayer } from '../components/BlockchainLayer';
import { SafeChainDashboard } from '../components/SafeChainDashboard';
import { SystemArchitecture } from '../components/SystemArchitecture';
import { OutcomeDashboard } from '../components/OutcomeDashboard';
import { FeedbackLoop } from '../components/FeedbackLoop';
import { SocialEngagementHub } from '../components/SocialEngagementHub';
import { AIPodcastHub } from '../components/AIPodcastHub';
import { RewardsSystem } from '../components/RewardsSystem';
import { EmployeeDividend } from '../components/EmployeeDividend';
import { TimeBoughtBack } from '../components/TimeBoughtBack';
import { CompetitiveMatrix } from '../components/CompetitiveMatrix';
import { MoatSection } from '../components/MoatSection';
import { HumanoidTransition } from '../components/HumanoidTransition';
import { QuantumLayer } from '../components/QuantumLayer';
import { SecurityDashboard } from '../components/SecurityDashboard';
import { IndustryFrames } from '../components/IndustryFrames';
import { Pricing } from '../components/Pricing';
import { TrustSection } from '../components/TrustSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { HumanTransitionEconomy } from '../components/HumanTransitionEconomy';
import { ElevenLabsVoiceLayer } from '../components/ElevenLabsVoiceLayer';
import { HeyGenAvatarStudio } from '../components/HeyGenAvatarStudio';
import { WhiteLabelAPI } from '../components/WhiteLabelAPI';
export function LandingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  return (
    <div className="w-full min-h-screen bg-slate-950">
      <Navigation />

      <Hero onStartOnboarding={() => setShowOnboarding(true)} />

      {/* Edge hardware */}
      <GuideBeaconEcosystem />

      {/* Blockchain + Security — moved up to establish trust early */}
      <BlockchainLayer />
      <SafeChainDashboard />

      {/* Core engine */}
      <ActionAgentEngine />

      {/* Agent hiring */}
      <div id="platform">
        <AgentMarketplace />
      </div>

      {/* Architecture */}
      <SystemArchitecture />

      {/* Outcomes */}
      <OutcomeDashboard />

      {/* Time = wealth */}
      <TimeBoughtBack />

      {/* Competitive analysis */}
      <CompetitiveMatrix />

      {/* Moat / barriers to entry */}
      <MoatSection />

      {/* Feedback + social */}
      <FeedbackLoop />

      {/* Social recognition engine */}
      <SocialEngagementHub />

      {/* AI Podcast — AI-produced, trend-driven, central content engine */}
      <AIPodcastHub />

      {/* ElevenLabs Voice Layer — voice infrastructure powering all APEX voice surfaces */}
      <ElevenLabsVoiceLayer />

      {/* HeyGen Avatar Studio — talking avatar system, QR → persona interaction */}
      <HeyGenAvatarStudio />

      {/* White Label & API — developer platform, reseller program, GitHub SDK */}
      <WhiteLabelAPI />

      {/* Rewards */}
      <RewardsSystem />

      {/* Employee Dividend — AI works for employees, path to UHI */}
      <EmployeeDividend />

      {/* Human Transition Economy — compensation models, UBI/UBH, entrepreneurship */}
      <HumanTransitionEconomy />

      {/* Future */}
      <HumanoidTransition />
      <QuantumLayer />
      <SecurityDashboard />

      {/* Industries + pricing */}
      <div id="industries">
        <IndustryFrames />
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <div id="about">
        <TrustSection />
      </div>

      <FinalCTA />
      <Footer />

      <AnimatePresence>
        {showOnboarding &&
        <OnboardingFlow onClose={() => setShowOnboarding(false)} />
        }
      </AnimatePresence>
    </div>);

}