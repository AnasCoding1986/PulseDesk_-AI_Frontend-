import React from 'react';
import { LandingNavbar } from '../../components/landing/LandingNavbar';
import { HeroSection } from '../../components/landing/HeroSection';
import { FeaturesSection } from '../../components/landing/FeaturesSection';
import { AnalyticsPreviewSection } from '../../components/landing/AnalyticsPreviewSection';
import { AIInsightsSection } from '../../components/landing/AIInsightsSection';
import { PricingSection } from '../../components/landing/PricingSection';
import { FAQSection } from '../../components/landing/FAQSection';
import { CTASection, LandingFooter } from '../../components/landing/CTASection';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#070B14]">
      <LandingNavbar />
      <main className="relative flex flex-col items-center overflow-hidden w-full">
        {/* Global dot grid to connect all sections visually */}
        <div className="fixed inset-0 dot-grid opacity-[0.15] pointer-events-none z-0" />
        
        {/* Cinematic glow background for the entire landing page hero area */}
        <div className="cinematic-glow opacity-80 mix-blend-screen pointer-events-none z-0"></div>
        
        <div className="w-full flex flex-col items-center relative z-10">
          <HeroSection />
          <FeaturesSection />
          <AnalyticsPreviewSection />
          <AIInsightsSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
