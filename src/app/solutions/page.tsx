import React from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/config/solutions';
import { CheckCircle2, ArrowRight, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Solutions | NK Velora Ventures',
  description: 'Problem-led solutions for fast-hiring startups, spreadsheet overload, manual payroll, and leadership visibility.',
};

export default function SolutionsPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-16 md:py-20 border-b border-navy-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            Problem-Led Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Solutions Designed Around Real Business Bottlenecks
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We don&apos;t talk in abstract HR jargon. We diagnose what is breaking in your operational machinery and design the system to fix it.
          </p>
        </div>
      </section>

      {/* Solutions List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {SOLUTIONS_DATA.map((sol, idx) => (
            <div
              key={sol.id}
              id={sol.id}
              className="scroll-mt-32 bg-white rounded-2xl p-8 sm:p-10 border border-border-subtle shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-gold/50 transition-all"
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
          ))}
        </div>
      </section>

      {/* Direct CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-navy-deep p-8 sm:p-12 rounded-2xl text-white text-center space-y-6 border border-gold/40 shadow-2xl">
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
      </section>
    </main>
  );
}
