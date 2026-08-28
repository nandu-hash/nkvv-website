import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ProblemSection } from '@/components/home/ProblemSection';
import { FrameworkSection } from '@/components/home/FrameworkSection';
import { ServicesSection } from '@/components/home/ServicesSection';
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

      {/* 2. Problem Section */}
      <ProblemSection />

      {/* 3. NKVV Framework */}
      <FrameworkSection />

      {/* 4. Services Overview */}
      <ServicesSection />

      {/* 5. Solutions Spotlight */}
      <SolutionsSection />

      {/* 6. Who We Serve */}
      <WhoWeServe />

      {/* 7. How We Work */}
      <HowWeWork />

      {/* 8. Target Outcomes */}
      <OutcomesSection />

      {/* 9. Why NKVV */}
      <WhyNKVV />

      {/* 10. Final CTA */}
      <FinalCta />
    </main>
  );
}
