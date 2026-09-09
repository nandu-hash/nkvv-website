import React from 'react';
import { Hero } from '@/components/home/Hero';
import { BusinessFlowBar } from '@/components/home/BusinessFlowBar';
import { ProblemSection } from '@/components/home/ProblemSection';
import { NkvvFlowSection } from '@/components/home/NkvvFlowSection';
import { FrameworkSection } from '@/components/home/FrameworkSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { VeloraComplianceSection } from '@/components/home/VeloraComplianceSection';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { WhoWeServe } from '@/components/home/WhoWeServe';
import { HowWeWork } from '@/components/home/HowWeWork';
import { OutcomesSection } from '@/components/home/OutcomesSection';
import { WhyNKVV } from '@/components/home/WhyNKVV';
import { FinalCta } from '@/components/home/FinalCta';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. 3-Second Business Flow Bar */}
      <BusinessFlowBar />

      {/* 3. Problem Section */}
      <ProblemSection />

      {/* 4. Signature NKVV Flow (Navy Visual Contrast) */}
      <NkvvFlowSection />

      {/* 5. Services Overview */}
      <ServicesSection />

      {/* 6. First Product Initiative: VELORA Compliance */}
      <VeloraComplianceSection />

      {/* 7. Solutions Spotlight */}
      <SolutionsSection />

      {/* 7. Detailed NKVV Operating System */}
      <FrameworkSection />

      {/* 8. How We Work */}
      <HowWeWork />

      {/* 9. Target Outcomes */}
      <OutcomesSection />

      {/* 10. Who We Serve */}
      <WhoWeServe />

      {/* 11. Why NKVV */}
      <WhyNKVV />

      {/* 12. Final Conversion CTA */}
      <FinalCta />
    </main>
  );
}
