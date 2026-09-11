'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Search, FileText, Users, Settings, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldenSpiral } from '@/components/ui/GoldenSpiral';
import { BorderGlow } from '@/components/ui/BorderGlow';

const FLOW_STAGES = [
  { step: '01', title: 'DIAGNOSE', caption: 'Understand the current process', icon: Search },
  { step: '02', title: 'DESIGN', caption: 'Process architecture & SOPs', icon: FileText },
  { step: '03', title: 'ENABLE', caption: 'People, roles & systems', icon: Users },
  { step: '04', title: 'AUTOMATE', caption: 'Eliminate manual repetition', icon: Settings },
  { step: '05', title: 'SCALE', caption: 'Visibility & resilience', icon: TrendingUp },
];

export const NkvvFlowSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const handlePrev = () => {
    setActiveStage((prev) => (prev > 0 ? prev - 1 : FLOW_STAGES.length - 1));
  };

  const handleNext = () => {
    setActiveStage((prev) => (prev < FLOW_STAGES.length - 1 ? prev + 1 : 0));
  };

  const ActiveIcon = FLOW_STAGES[activeStage].icon;

  return (
    <section className="py-20 md:py-24 bg-white text-navy-deep border-b border-border-subtle relative overflow-hidden">
      {/* Background architectural watermark */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] select-none text-[260px] font-serif font-black text-navy-deep leading-none whitespace-nowrap"
      >
        THE NKVV FLOW
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Header Bar matching Reference Image 4 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-6 mb-10 md:mb-16 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-wider text-navy-deep uppercase">
              THE NKVV FLOW
            </h2>
          </div>
          <div className="hidden sm:flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-gray-500 uppercase tracking-widest">
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

        {/* Subtle Process Flow Curve Connector on Desktop */}
        <div className="hidden md:block mb-[-24px] text-gold/30">
          <GoldenSpiral variant="flow" />
        </div>

        {/* ========================================================= */}
        {/* MOBILE VIEW (< md): Compact Interactive Animated Pill & Stage Card */}
        {/* Solves the issue where 5 huge stacked boxes took up the entire screen */}
        {/* ========================================================= */}
        <div className="md:hidden space-y-4">
          {/* Horizontal Interactive Pill Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar px-0.5">
            {FLOW_STAGES.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`px-3.5 py-2 rounded-full text-xs font-mono transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gold text-navy-deep font-bold shadow-md shadow-gold/20 scale-[1.03]'
                      : 'bg-offwhite text-gray-600 hover:text-navy-deep border border-border-subtle'
                  }`}
                >
                  <span className={isActive ? 'text-navy-deep/70' : 'text-gray-400'}>{stage.step}</span>
                  <span>{stage.title}</span>
                </button>
              );
            })}
          </div>

          {/* Compact Active Stage Card */}
          <BorderGlow
            backgroundColor="#F8FAFC"
            borderRadius={20}
            glowRadius={30}
            className="shadow-md"
          >
            <div className="p-5 sm:p-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-gold uppercase tracking-widest bg-navy-deep px-2.5 py-1 rounded-full">
                    Stage {FLOW_STAGES[activeStage].step} of 05
                  </span>
                </div>
                {/* 5 Progress indicator dots */}
                <div className="flex items-center gap-1.5">
                  {FLOW_STAGES.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveStage(dotIdx)}
                      aria-label={`Go to stage ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStage === dotIdx
                          ? 'w-6 bg-gold'
                          : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Animated Content for Active Stage */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center gap-4 min-h-[85px]"
                >
                  {/* Compact Circular Icon */}
                  <div className="w-14 h-14 rounded-full bg-white border border-gold/40 shadow-xs flex items-center justify-center text-navy-deep shrink-0">
                    <ActiveIcon className="w-6 h-6 text-gold stroke-[1.5]" />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-serif font-bold tracking-wider uppercase text-navy-deep">
                      {FLOW_STAGES[activeStage].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                      {FLOW_STAGES[activeStage].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls: Prev & Next */}
              <div className="mt-4 pt-3 border-t border-border-subtle flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 text-xs font-mono font-semibold text-gray-600 hover:text-navy-deep py-1.5 px-3 rounded-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-gold" />
                  <span>Prev</span>
                </button>

                <div className="text-[11px] font-mono text-gray-400">
                  Step {activeStage + 1} / 5
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 text-xs font-mono font-semibold text-navy-deep hover:text-gold py-1.5 px-3 rounded-lg bg-white border border-border-subtle shadow-xs transition-colors"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4 text-gold" />
                </button>
              </div>

              {/* Bottom Progress Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <div 
                  className="h-full bg-gold transition-all duration-300"
                  style={{ width: `${((activeStage + 1) / 5) * 100}%` }}
                />
              </div>
            </div>
          </BorderGlow>
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VIEW (>= md): 5 Stages Side-by-Side Grid */}
        {/* ========================================================= */}
        <div className="hidden md:grid md:grid-cols-5 gap-4 items-stretch">
          {FLOW_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <BorderGlow
                key={stage.step}
                backgroundColor="#F8FAFC"
                borderRadius={20}
                glowRadius={32}
                className="h-full"
              >
                <div className="p-6 lg:p-7 rounded-2xl flex flex-col items-center text-center justify-between group h-full relative">
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
                    <div className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 bg-white p-1 rounded-full border border-border-subtle shadow-2xs">
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </div>
                  )}
                </div>
              </BorderGlow>
            );
          })}
        </div>

        {/* Bottom Editorial Callout matching Reference Image 4 */}
        <div className="mt-12 md:mt-14 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-gray-500">
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

export default NkvvFlowSection;
