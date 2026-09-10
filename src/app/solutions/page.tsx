import React from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/config/solutions';
import { CheckCircle2, ArrowRight, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

export const metadata = {
  title: 'Solutions | NK Velora Ventures',
  description: 'Problem-led solutions for fast-hiring startups, spreadsheet overload, manual payroll, and leadership visibility.',
};

export default function SolutionsPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-20 md:py-28 border-b border-navy-surface relative overflow-hidden bg-grid-architectural-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-4 text-center max-w-4xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-[0.25em] bg-navy-primary px-4 py-1.5 border border-gold/30 rounded-full inline-block">
            Problem-Led Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
            Targeted Solutions
            <span className="block italic font-serif font-normal text-gold text-3xl sm:text-4xl lg:text-5xl mt-2">
              Designed Around Real Bottlenecks
            </span>
          </h1>
          <div className="w-14 h-0.5 bg-gold mx-auto my-4 rounded-full" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            We don&apos;t talk in abstract HR jargon. We diagnose what is breaking in your operational machinery and design the system to fix it.
          </p>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {SOLUTIONS_DATA.map((sol, idx) => (
            <BorderGlow
              key={sol.id}
              backgroundColor="#ffffff"
              borderRadius={20}
              glowRadius={35}
              className="shadow-md"
            >
              <div
                id={sol.id}
                className="scroll-mt-32 p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Problem Left Col */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-navy-primary bg-navy-primary/10 px-2.5 py-1 rounded">
                      SCENARIO 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-navy-deep flex items-start gap-3">
                    <HelpCircle className="w-7 h-7 text-gold shrink-0 mt-1" />
                    <span>&quot;{sol.problemStatement}&quot;</span>
                  </h2>

                  <p className="text-sm text-muted leading-relaxed">
                    {sol.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs font-mono font-bold text-navy-deep uppercase block mb-2">
                      Target Transformation:
                    </span>
                    <div className="inline-block p-3 rounded-lg bg-navy-deep text-white text-sm font-semibold border border-navy-surface">
                      {sol.solutionTitle}
                    </div>
                  </div>
                </div>

                {/* Solution Right Col */}
                <div className="lg:col-span-7 bg-offwhite p-6 sm:p-8 rounded-xl border border-gray-200 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold text-navy-primary tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-gold" />
                      Key Interventions:
                    </h3>
                    <div className="space-y-2.5">
                      {sol.keyInterventions.map((interv) => (
                        <div key={interv} className="flex items-start gap-3 text-sm text-gray-800 bg-white p-3.5 rounded-lg border border-gray-200 shadow-sm">
                          <CheckCircle2 className="w-4 h-4 text-navy-primary shrink-0 mt-0.5" />
                          <span>{interv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold text-navy-deep tracking-wider mb-2">
                      Expected Outcomes:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sol.expectedImpact.map((impact) => (
                        <span
                          key={impact}
                          className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200"
                        >
                          ✓ {impact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </section>

      {/* Direct CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BorderGlow
          backgroundColor="#0A2240"
          borderRadius={20}
          glowRadius={36}
          className="shadow-2xl"
        >
          <div className="p-8 sm:p-12 text-white text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-white">
              Tell us what is breaking. We&apos;ll help design the system.
            </h2>
            <p className="text-base text-gray-300 max-w-2xl mx-auto">
              Book a 30-minute discovery call to discuss your current operational bottlenecks with our principal consultants.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-navy-deep font-bold text-base transition-all shadow-lg"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Start a Conversation</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </BorderGlow>
      </section>
    </main>
  );
}
