'use client';

import React, { useState } from 'react';
import { NKVV_FRAMEWORK } from '@/config/framework';
import { Search, PenTool, Users, Zap, TrendingUp, Check, ArrowRight } from 'lucide-react';

const STAGE_ICONS = [Search, PenTool, Users, Zap, TrendingUp];

export const FrameworkSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-navy-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-border-subtle/10 border border-border-subtle/20 text-gold-bright text-xs font-mono font-bold uppercase tracking-wider">
            Methodology
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Transformation Framework
          </h2>
          
          <p className="text-base text-gray-400 font-light max-w-2xl leading-relaxed">
            A structured, 5-stage operating journey connecting People, Process, and Technology for sustainable business scale.
          </p>
        </div>

        {/* Connected Stage Timeline (Desktop / Tablet) */}
        <div className="relative mb-16">
          {/* Thin Gold Line */}
          <div className="hidden lg:block absolute top-[44px] left-10 right-10 h-px bg-border-subtle/20 z-0" />
          <div
            className="hidden lg:block absolute top-[44px] left-10 h-px bg-gold transition-all duration-700 ease-in-out z-0"
            style={{ width: `calc(${((activeStep) / (NKVV_FRAMEWORK.length - 1)) * 100}% - 20px)` }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {NKVV_FRAMEWORK.map((step, idx) => {
              const Icon = STAGE_ICONS[idx];
              const isActive = activeStep === idx;
              const isPassed = activeStep >= idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`group cursor-pointer bg-navy-primary p-6 transition-all duration-300 border flex flex-col items-start ${
                    isActive
                      ? 'border-gold bg-navy-primary'
                      : isPassed
                      ? 'border-gold/30 hover:border-gold/60'
                      : 'border-border-subtle/10 hover:border-border-subtle/30'
                  }`}
                >
                  <div className={`w-10 h-10 mb-6 flex items-center justify-center border transition-colors duration-300 ${isActive ? 'bg-gold border-gold text-navy-dark' : 'bg-navy-dark border-border-subtle/20 text-gold'}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <span className={`text-[10px] font-mono uppercase tracking-[0.2em] mb-2 ${isActive ? 'text-gold-bright' : 'text-gray-500'}`}>
                    Stage {step.number}
                  </span>

                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {step.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Stage Breakdown Box */}
        <div className="bg-navy-primary border border-border-subtle/20 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-mono tracking-widest text-navy-dark bg-gold px-2 py-1 uppercase">
                  Stage {NKVV_FRAMEWORK[activeStep].number}
                </span>
                <h4 className="text-2xl font-bold text-white uppercase tracking-widest">
                  {NKVV_FRAMEWORK[activeStep].title}
                </h4>
              </div>

              <p className="text-gray-400 text-base font-light leading-relaxed">
                {NKVV_FRAMEWORK[activeStep].description}
              </p>
            </div>

            <div className="lg:col-span-5 bg-navy-dark p-8 border border-border-subtle/10 space-y-6">
              <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-bright">
                Deliverables
              </h5>

              <div className="space-y-4">
                {NKVV_FRAMEWORK[activeStep].keyOutputs.map((output) => (
                  <div key={output} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span className="text-sm font-light text-gray-300">{output}</span>
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
