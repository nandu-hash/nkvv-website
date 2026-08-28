'use client';

import React, { useState } from 'react';
import { NKVV_FRAMEWORK } from '@/config/framework';
import { Stethoscope, Compass, Workflow, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

const STAGE_ICONS = [Stethoscope, Compass, Workflow, TrendingUp];

export const FrameworkSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-20 md:py-28 bg-navy-deep text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-gold/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-surface border border-gold/40 text-gold-light text-xs font-mono font-bold uppercase tracking-wider">
            Methodology
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The NKVV Transformation Framework
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            A structured, 4-stage operating journey connecting People, Process, and Technology for sustainable business scale.
          </p>
        </div>

        {/* Connected Stage Timeline (Desktop / Tablet) */}
        <div className="relative mb-12">
          {/* Horizontal Connecting Pipeline Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-navy-surface -translate-y-1/2 z-0" />
          <div
            className="hidden md:block absolute top-1/2 left-0 h-1 bg-gold -translate-y-1/2 transition-all duration-500 z-0"
            style={{ width: `${((activeStep + 1) / NKVV_FRAMEWORK.length) * 100}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {NKVV_FRAMEWORK.map((step, idx) => {
              const Icon = STAGE_ICONS[idx];
              const isActive = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`cursor-pointer p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                    isActive
                      ? 'bg-navy-surface border-gold shadow-xl shadow-gold/10 scale-105'
                      : isPassed
                      ? 'bg-navy-primary/90 border-navy-light text-gray-200 hover:border-gold/50'
                      : 'bg-navy-primary/50 border-navy-surface text-gray-400 hover:bg-navy-primary/80'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-mono font-bold ${isActive ? 'text-gold' : 'text-gray-400'}`}>
                        STAGE {step.number}
                      </span>
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-gold text-navy-deep' : 'bg-navy-deep text-gold'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-300 leading-relaxed font-medium">
                      {step.tagline}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-navy-light/40 flex items-center justify-between text-xs font-mono">
                    <span className={isActive ? 'text-gold font-bold' : 'text-gray-400'}>
                      {isActive ? 'Active Stage' : 'Click to inspect'}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-1 text-gold' : 'text-gray-500'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Breakdown Box */}
        <div className="p-8 rounded-2xl bg-navy-surface/90 border border-gold/30 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-navy-deep bg-gold px-3 py-1 rounded">
                  STAGE {NKVV_FRAMEWORK[activeStep].number}
                </span>
                <h4 className="text-2xl font-bold text-white">
                  {NKVV_FRAMEWORK[activeStep].title} Phase
                </h4>
              </div>

              <p className="text-gray-300 text-base leading-relaxed">
                {NKVV_FRAMEWORK[activeStep].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-navy-deep p-6 rounded-xl border border-navy-light space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-gold font-bold">
                Stage Key Deliverables:
              </h5>

              <div className="space-y-2">
                {NKVV_FRAMEWORK[activeStep].keyOutputs.map((output) => (
                  <div key={output} className="flex items-center gap-3 text-sm text-gray-200">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    <span>{output}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
