'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/config/solutions';
import { HelpCircle, Check, ArrowRight, PhoneCall, LayoutGrid } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(SOLUTIONS_DATA[0].id);
  const currentSolution = SOLUTIONS_DATA.find((s) => s.id === selectedSolutionId) || SOLUTIONS_DATA[0];

  return (
    <section className="py-24 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-light text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Problem-Led Architecture
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight uppercase">
            What is stalling your operations?
          </h2>

          <p className="text-base text-muted font-light leading-relaxed max-w-2xl">
            Select the specific operational challenge your business is facing to see the corresponding NKVV system architecture.
          </p>
        </div>

        {/* Interactive Selector Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-border-subtle bg-border-subtle">
          
          {/* Left Column: Problem Buttons List */}
          <div className="lg:col-span-5 bg-gray-light/30">
            <div className="p-6 border-b border-border-subtle bg-white">
              <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                Business Problems
              </h3>
            </div>

            <div className="flex flex-col">
              {SOLUTIONS_DATA.map((item) => {
                const isSelected = item.id === selectedSolutionId;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSolutionId(item.id)}
                    className={`w-full text-left p-6 transition-all duration-300 border-b border-border-subtle flex items-center justify-between group ${
                      isSelected
                        ? 'bg-navy-dark text-white'
                        : 'bg-white text-navy-deep hover:bg-gray-light'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <HelpCircle className={`w-4 h-4 shrink-0 ${isSelected ? 'text-gold' : 'text-gray-400'}`} />
                      <span className="text-sm font-semibold tracking-wide">
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
          </div>

          {/* Right Column: Solution Architecture Card */}
          <div className="lg:col-span-7 bg-white p-8 lg:p-12 flex flex-col justify-between">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-gold-bright" />
                  <span className="text-[10px] font-mono font-bold text-navy-primary uppercase tracking-[0.2em]">
                    Solution Architecture
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-navy-deep uppercase tracking-widest">
                  {currentSolution.solutionTitle}
                </h3>
                <p className="text-sm text-muted leading-relaxed font-light">
                  {currentSolution.description}
                </p>
              </div>

              {/* Key Interventions */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                  System Interventions
                </h4>

                <div className="space-y-3">
                  {currentSolution.keyInterventions.map((interv) => (
                    <div key={interv} className="flex items-start gap-3 text-sm text-dark bg-white border border-border-subtle p-4">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span className="font-light">{interv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Impact */}
              <div className="pt-2">
                <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Expected Impact
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentSolution.expectedImpact.map((impact) => (
                    <span
                      key={impact}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-light border border-border-subtle text-dark text-xs font-semibold"
                    >
                      <span className="text-gold-bright text-[10px]">■</span> {impact}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                Facing a unique bottleneck?
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 border border-border-subtle hover:border-gold bg-white hover:bg-gray-light text-navy-deep text-xs font-bold uppercase tracking-widest transition-all"
              >
                <PhoneCall className="w-4 h-4 text-gold" />
                <span>Tell us what's breaking</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
