import React from 'react';
import { Hero } from '@/components/home/Hero';
import { BusinessFlowBar } from '@/components/home/BusinessFlowBar';
import { NkvvFlowSection } from '@/components/home/NkvvFlowSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { VeloraComplianceSection } from '@/components/home/VeloraComplianceSection';
import { WhyNKVV } from '@/components/home/WhyNKVV';
import { FinalCta } from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. 3-Second Business Flow Bar */}
      <BusinessFlowBar />

      {/* 3. Signature NKVV Flow (Diagnose → Design → Enable → Automate → Scale) */}
      <NkvvFlowSection />

      {/* 4. Core Capabilities & Practice Areas */}
      <ServicesSection />

      {/* 5. First Product Initiative: VELORA Compliance */}
      <VeloraComplianceSection />

      {/* 6. Guiding Principles & Why NKVV */}
      <WhyNKVV />

      {/* 7. Final Conversion CTA */}
      <FinalCta />
    </main>
  );
}
