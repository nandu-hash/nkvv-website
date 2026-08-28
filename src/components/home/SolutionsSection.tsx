'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/config/solutions';
import { HelpCircle, CheckCircle2, ArrowRight, PhoneCall, Sparkles } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(SOLUTIONS_DATA[0].id);

  const currentSolution = SOLUTIONS_DATA.find((s) => s.id === selectedSolutionId) || SOLUTIONS_DATA[0];

  return (
    <section className="py-20 md:py-28 bg-offwhite text-dark border-t border-b border-border-subtle relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Problem-Led Solutions
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            What is currently stalling your people operations?
          </h2>

          <p className="text-base text-muted leading-relaxed">
            Select the operational challenge your business is currently facing to see how NKVV architects a solution.
          </p>
        </div>

        {/* Interactive Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Problem Buttons List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono font-bold text-muted uppercase tracking-wider mb-2">
              Common Leadership Pain Points:
            </h3>

            {SOLUTIONS_DATA.map((item) => {
              const isSelected = item.id === selectedSolutionId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSolutionId(item.id)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 border flex items-center justify-between group ${
                    isSelected
                      ? 'bg-navy-deep text-white border-gold shadow-lg shadow-navy-deep/20 font-bold'
                      : 'bg-white text-navy-deep border-border-subtle hover:border-gold/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isSelected ? 'text-gold' : 'text-muted'}`} />
                    <span className="text-sm font-semibold">
                      &quot;{item.problemStatement}&quot;
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-gold translate-x-1' : 'text-gray-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Solution Architecture Card */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-gold/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-navy-primary uppercase tracking-wider bg-navy-primary/10 px-3 py-1 rounded">
                Recommended Solution Architecture
              </span>
              <h3 className="text-2xl font-extrabold text-navy-deep pt-2">
                {currentSolution.solutionTitle}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {currentSolution.description}
              </p>
            </div>

            {/* Key Interventions */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-navy-deep uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold" />
                Targeted NKVV Interventions:
              </h4>

              <div className="space-y-2">
                {currentSolution.keyInterventions.map((interv) => (
                  <div key={interv} className="flex items-start gap-2.5 text-sm text-gray-800 bg-offwhite p-3 rounded-lg border border-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-navy-primary shrink-0 mt-0.5" />
                    <span>{interv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expected Impact */}
            <div className="pt-2">
              <h4 className="text-xs font-mono font-bold text-navy-deep uppercase tracking-wider mb-2">
                Expected Business Outcomes:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentSolution.expectedImpact.map((impact) => (
                  <span
                    key={impact}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200"
                  >
                    <span>✓ {impact}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Direct CTA */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-semibold text-navy-primary">
                Facing a customized operational bottleneck?
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-light text-navy-deep text-sm font-bold transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Tell us what is breaking</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
