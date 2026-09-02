'use client';

import React from 'react';
import { Users, GitBranch, Cpu, Zap, TrendingUp } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] bg-transparent border border-border-subtle/10 flex items-center justify-center overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center gap-12">
        {/* Top Node */}
        <div className="flex flex-col items-center gap-4 relative">
          <div className="w-16 h-16 border border-border-subtle/20 bg-navy-primary flex items-center justify-center z-10">
            <Users className="w-6 h-6 text-gold" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 absolute -bottom-8">People</span>
        </div>

        {/* Middle row */}
        <div className="flex items-center justify-between w-full relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-8 right-8 h-px bg-border-subtle/20 -translate-y-1/2" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-border-subtle/20 h-32 -translate-x-1/2 -translate-y-12 z-0" />
          <div className="absolute top-1/2 left-1/2 w-px bg-border-subtle/20 h-32 -translate-x-1/2 z-0" />
          
          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-16 h-16 border border-border-subtle/20 bg-navy-primary flex items-center justify-center z-10">
              <GitBranch className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 absolute -bottom-8">Process</span>
          </div>

          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-16 h-16 border border-border-subtle/20 bg-navy-primary flex items-center justify-center z-10 relative">
              <Cpu className="w-6 h-6 text-gold-bright" />
              <div className="absolute inset-0 border border-gold-bright animate-ping opacity-20" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold-bright absolute -bottom-8">Technology</span>
          </div>

          <div className="flex flex-col items-center gap-4 relative">
            <div className="w-16 h-16 border border-border-subtle/20 bg-navy-primary flex items-center justify-center z-10">
              <Zap className="w-6 h-6 text-gold" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 absolute -bottom-8">Automation</span>
          </div>
        </div>

        {/* Bottom Node */}
        <div className="flex flex-col items-center gap-4 relative mt-4">
          <div className="w-16 h-16 border border-gold/40 bg-gold/5 flex items-center justify-center z-10">
            <TrendingUp className="w-6 h-6 text-gold" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-gold absolute -bottom-8">Impact</span>
        </div>

        {/* Flow Indicators */}
        <div className="absolute top-[35%] left-1/2 w-2 h-2 border-r border-b border-gold/50 rotate-45 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[65%] left-1/2 w-2 h-2 border-r border-b border-gold/50 rotate-45 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* OS Decorators */}
      <div className="absolute top-4 left-4 flex gap-1">
        <div className="w-1 h-1 bg-border-subtle/30" />
        <div className="w-1 h-1 bg-border-subtle/30" />
        <div className="w-1 h-1 bg-border-subtle/30" />
      </div>
      <div className="absolute bottom-4 right-4 text-[9px] font-mono tracking-widest text-border-subtle/30 uppercase">
        SYS.ARCH.01
      </div>
    </div>
  );
};
