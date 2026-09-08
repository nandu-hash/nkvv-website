'use client';

import React, { useState } from 'react';
import { NKVV_FRAMEWORK } from '@/config/framework';
import { Search, PenTool, Users, Zap, TrendingUp, Check } from 'lucide-react';

const STAGE_ICONS = [Search, PenTool, Users, Zap, TrendingUp];

export const FrameworkSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="py-24 bg-white text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-4xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-2">
            Signature Operating Model
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-deep tracking-tight">
            The NKVV Operating System
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              From Diagnosis to Scalable Automation
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gold rounded-full my-3" />
          <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
            From operational diagnosis to scalable automation.
          </p>
          <div className="mt-6 p-4 bg-gray-50 border-l-2 border-gold text-sm font-serif text-navy-deep italic">
            &ldquo;We don&apos;t automate broken processes. We fix the operating model first.&rdquo;
          </div>
        </div>

        {/* 5 Stages Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-border-subtle divide-y sm:divide-y-0 sm:divide-x divide-border-subtle mb-12">
          {NKVV_FRAMEWORK.map((step, idx) => {
            const Icon = STAGE_ICONS[idx];
            const isActive = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-6 text-left transition-all duration-200 flex flex-col justify-between group ${
                  isActive ? 'bg-navy-deep text-white' : 'bg-white hover:bg-gray-50 text-navy-deep'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold tracking-widest ${isActive ? 'text-gold' : 'text-gray-400'}`}>
                      STAGE {step.number}
                    </span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-gold'}`} />
                  </div>
                  <h3 className="text-lg font-serif font-medium uppercase tracking-wide mb-1">
                    {step.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-light ${isActive ? 'text-gray-300' : 'text-gray-500'}`}>
                    {step.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Detail Panel */}
        <div className="p-8 lg:p-12 border border-border-subtle bg-gray-50/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold">
              Stage {NKVV_FRAMEWORK[activeStep].number} Detail
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif font-normal text-navy-deep">
              {NKVV_FRAMEWORK[activeStep].title} Phase
            </h4>
            <p className="text-sm text-gray-600 font-light leading-relaxed">
              {NKVV_FRAMEWORK[activeStep].description}
            </p>
          </div>

          <div className="lg:col-span-5 p-6 bg-white border border-border-subtle space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-navy-deep font-bold block">
              Core Deliverables
            </span>
            <div className="space-y-3">
              {NKVV_FRAMEWORK[activeStep].keyOutputs.map((output) => (
                <div key={output} className="flex items-start gap-3 text-xs text-gray-700">
                  <Check className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <span className="font-light">{output}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
