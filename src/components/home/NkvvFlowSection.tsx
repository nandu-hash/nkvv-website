'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

const FLOW_STAGES = [
  { step: '01', title: 'DIAGNOSE', caption: 'Find the friction' },
  { step: '02', title: 'DESIGN', caption: 'Process architecture' },
  { step: '03', title: 'ENABLE', caption: 'People & systems' },
  { step: '04', title: 'AUTOMATE', caption: 'Remove manual work' },
  { step: '05', title: 'SCALE', caption: 'Operational resilience' },
];

export const NkvvFlowSection: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-navy-deep text-white border-b border-navy-primary relative overflow-hidden bg-grid-architectural-dark">
      {/* Background architectural watermark */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none text-[320px] font-serif font-black text-white leading-none whitespace-nowrap"
      >
        OPERATING FLOW
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold font-bold">
            Methodology in Motion
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white tracking-tight">
            THE NKVV FLOW
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-light tracking-wide">
            Movement from operational friction to autonomous system scale.
          </p>
        </div>

        {/* Horizontal Process on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 relative border border-white/10 bg-navy-primary/60 backdrop-blur-sm">
          {FLOW_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="relative p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 group hover:bg-white/5 transition-colors duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-gold">
                    {stage.step}
                  </span>
                  {/* Directional arrow connecting stages on desktop */}
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

              <p className="text-xs text-gray-400 font-mono tracking-wider pt-2 uppercase">
                {stage.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Operating Principle */}
        <div className="mt-8 text-center">
          <p className="text-xs font-mono tracking-widest text-gray-400 uppercase">
            <span className="text-gold font-bold">CORE PRINCIPLE:</span> We don&apos;t automate broken processes. We fix the operating model first.
          </p>
        </div>
      </div>
    </section>
  );
};
