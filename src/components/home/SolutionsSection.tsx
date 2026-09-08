'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SOLUTIONS_DATA } from '@/config/solutions';
import { ArrowRight, Check, PhoneCall } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(SOLUTIONS_DATA[0].id);
  const currentSolution = SOLUTIONS_DATA.find((s) => s.id === selectedSolutionId) || SOLUTIONS_DATA[0];

  return (
    <section className="py-24 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-2">
            Problem-Led Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-deep tracking-tight">
            What is currently stalling operations?
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              Targeted System Solutions
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gold rounded-full my-3" />
          <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
            Select a critical operational friction point to inspect how NKVV architects and deploys a system-level solution.
          </p>
        </div>

        {/* 2-Column Split: Questions on Left, Solution on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-border-subtle divide-y lg:divide-y-0 lg:divide-x divide-border-subtle">
          {/* Left Column: List of Friction Statements */}
          <div className="lg:col-span-5 divide-y divide-border-subtle bg-gray-50/50">
            <div className="p-6 bg-white border-b border-border-subtle">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 font-bold">
                Select Common Challenge
              </span>
            </div>

            {SOLUTIONS_DATA.map((item) => {
              const isSelected = item.id === selectedSolutionId;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSolutionId(item.id)}
                  className={`w-full text-left p-6 transition-all duration-200 flex items-center justify-between group ${
                    isSelected ? 'bg-navy-deep text-white font-medium' : 'bg-white text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm font-serif pr-4 leading-snug">
                    &ldquo;{item.problemStatement}&rdquo;
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-gold translate-x-1' : 'text-gray-300 group-hover:text-gray-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Solution Details */}
          <div className="lg:col-span-7 p-8 lg:p-12 bg-white flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold">
                  Recommended Intervention Architecture
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-navy-deep">
                {currentSolution.solutionTitle}
              </h3>

              <p className="text-sm text-gray-600 font-light leading-relaxed">
                {currentSolution.description}
              </p>

              {/* Interventions */}
              <div className="pt-4 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold block">
                  Targeted System Interventions
                </span>
                <div className="space-y-2">
                  {currentSolution.keyInterventions.map((interv) => (
                    <div key={interv} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-100 text-xs text-gray-700">
                      <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{interv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Impact */}
              <div className="pt-4 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 font-bold block">
                  Measurable Operational Outcomes
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentSolution.expectedImpact.map((impact) => (
                    <span
                      key={impact}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-white border border-border-subtle text-navy-deep text-xs font-mono rounded-full"
                    >
                      <span className="text-gold font-bold">✓</span> {impact}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Consultation Link */}
            <div className="pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-gray-500 font-light">
                Experiencing a customized operational breakdown?
              </span>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-navy-deep text-xs font-semibold uppercase tracking-wider text-navy-deep hover:bg-navy-deep hover:text-white transition-all duration-300"
              >
                <PhoneCall className="w-3.5 h-3.5 text-gold" />
                <span>Discuss System Fix</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
