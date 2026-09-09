'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { GoldenSpiral } from '@/components/ui/GoldenSpiral';

const FLOW_STAGES = [
  { step: '01', title: 'DIAGNOSE', caption: 'Understand current process' },
  { step: '02', title: 'IDENTIFY', caption: 'Find gaps & compliance exposures' },
  { step: '03', title: 'STRUCTURE', caption: 'Design controls, SOPs & roles' },
  { step: '04', title: 'AUTOMATE', caption: 'Eliminate manual repetition' },
  { step: '05', title: 'IMPROVE', caption: 'Measure, monitor & scale' },
];

export const NkvvFlowSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-navy-deep text-white border-b border-navy-primary relative overflow-hidden bg-grid-architectural-dark">
      {/* Background architectural watermark */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none text-[280px] font-serif font-black text-white leading-none whitespace-nowrap"
      >
        OPERATING FLOW
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold font-bold">
            Methodology in Motion
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            The NKVV Operating Flow
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              From Process Reality to Autonomous Scale
            </span>
          </h2>
          <div className="w-14 h-0.5 bg-gold mx-auto my-4 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-300 font-light tracking-wide max-w-xl mx-auto leading-relaxed">
            Automation is not the starting point. The starting point is understanding, diagnosing, and structuring the process.
          </p>
        </div>

        {/* Subtle Fibonacci Flow Curve Connector (Desktop) */}
        <div className="hidden md:block mb-[-20px] text-gold/30">
          <GoldenSpiral variant="flow" />
        </div>

        {/* 5 Stages Grid with Golden Ratio Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 relative border border-white/15 bg-navy-primary/70 backdrop-blur-md shadow-2xl">
          {FLOW_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="relative p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gold">
                    STAGE {stage.step}
                  </span>
                  {idx < FLOW_STAGES.length - 1 && (
                    <ArrowRight className="hidden md:block w-3.5 h-3.5 text-gray-500 group-hover:text-gold transition-colors" />
                  )}
                  {idx < FLOW_STAGES.length - 1 && (
                    <ArrowDown className="md:hidden w-3.5 h-3.5 text-gold" />
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-medium tracking-wide text-white mb-2">
                  {stage.title}
                </h3>
              </div>

              <p className="text-xs text-gray-400 font-mono tracking-wider pt-3 uppercase">
                {stage.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Operating Principle */}
        <div className="mt-10 text-center">
          <p className="text-xs font-mono tracking-widest text-gray-300 uppercase">
            <span className="text-gold font-bold">CORE PRINCIPLE:</span> Understand the process before changing the process. Structure before automation.
          </p>
        </div>
      </div>
    </section>
  );
};

