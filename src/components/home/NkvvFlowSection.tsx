'use client';

import React from 'react';
import { ArrowRight, ArrowDown, Search, FileText, Users, Settings, TrendingUp } from 'lucide-react';
import { GoldenSpiral } from '@/components/ui/GoldenSpiral';

const FLOW_STAGES = [
  { step: '01', title: 'DIAGNOSE', caption: 'Understand the current process', icon: Search },
  { step: '02', title: 'DESIGN', caption: 'Process architecture & SOPs', icon: FileText },
  { step: '03', title: 'ENABLE', caption: 'People, roles & systems', icon: Users },
  { step: '04', title: 'AUTOMATE', caption: 'Eliminate manual repetition', icon: Settings },
  { step: '05', title: 'SCALE', caption: 'Visibility & resilience', icon: TrendingUp },
];

export const NkvvFlowSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-navy-deep border-b border-border-subtle relative overflow-hidden">
      {/* Background architectural watermark */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] select-none text-[260px] font-serif font-black text-navy-deep leading-none whitespace-nowrap"
      >
        THE NKVV FLOW
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Header Bar matching Reference Image 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 mb-16 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-wider text-navy-deep uppercase">
              THE NKVV FLOW
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-gray-500 uppercase tracking-widest">
            <span>DIAGNOSE</span>
            <span className="text-gold">→</span>
            <span>DESIGN</span>
            <span className="text-gold">→</span>
            <span>ENABLE</span>
            <span className="text-gold">→</span>
            <span>AUTOMATE</span>
            <span className="text-gold">→</span>
            <span className="text-navy-deep font-bold">SCALE</span>
          </div>
        </div>

        {/* Subtle Process Flow Curve Connector */}
        <div className="hidden md:block mb-[-24px] text-gold/30">
          <GoldenSpiral variant="flow" />
        </div>

        {/* 5 Stages Grid with Circular Iconography from Image 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 items-stretch">
          {FLOW_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="p-6 md:p-7 rounded-2xl bg-offwhite border border-border-subtle hover:border-gold/60 transition-all duration-300 flex flex-col items-center text-center justify-between group shadow-2xs relative"
              >
                {/* Step number badge */}
                <span className="text-xs font-mono font-bold tracking-widest text-gray-400 group-hover:text-gold transition-colors mb-4">
                  {stage.step}
                </span>

                {/* Circular Icon container matching Reference Image 4 */}
                <div className="w-16 h-16 rounded-full bg-white border border-border-subtle group-hover:border-gold group-hover:shadow-md flex items-center justify-center text-navy-deep group-hover:text-gold transition-all duration-300 mb-5">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <div className="space-y-1.5 mb-2">
                  <h3 className="text-base font-serif font-bold tracking-wider uppercase text-navy-deep">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-light leading-relaxed">
                    {stage.caption}
                  </p>
                </div>

                {/* Directional Connector Arrow */}
                {idx < FLOW_STAGES.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 bg-white p-1 rounded-full border border-border-subtle shadow-2xs">
                    <ArrowRight className="w-3 h-3 text-gold" />
                  </div>
                )}
                {idx < FLOW_STAGES.length - 1 && (
                  <div className="md:hidden pt-4 text-gold">
                    <ArrowDown className="w-4 h-4 mx-auto" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Callout matching Reference Image 4 */}
        <div className="mt-14 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
          <div>
            <span className="text-gold font-bold">CORE PHILOSOPHY:</span> Understand before changing. Structure before automation.
          </div>
          <div className="text-navy-deep font-semibold">
            NKVV • Operating Architecture
          </div>
        </div>

      </div>
    </section>
  );
};


