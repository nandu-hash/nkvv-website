'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { ChevronDown, ArrowRight, Users, GitBranch, Cpu, Zap, TrendingUp } from 'lucide-react';
import { WebThreads } from '@/components/ui/WebThreads';
import { BorderGlow } from '@/components/ui/BorderGlow';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden bg-navy-deep text-white border-b border-navy-primary">
      {/* Interactive WebThreads WebGL Canvas in Hero Background */}
      <div className="absolute inset-0 pointer-events-auto opacity-35 z-0 overflow-hidden">
        <WebThreads
          color1="#C9972B"
          color2="#DFB15B"
          color3="#FFFFFF"
          speed={0.18}
          threadCount={6}
          frequency={4.5}
          spread={0.2}
          taper={0.9}
          position={0.5}
          fanMode="center"
          glow={0.02}
          falloff={0.6}
          thickness={1.1}
          brightness={0.65}
          opacity={0.7}
          mirror={true}
          grain={true}
          grainIntensity={0.04}
          mouseInteraction={true}
          mouseStrength={0.3}
          backgroundColor="#071A33"
        />
      </div>

      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-architectural-dark pointer-events-none opacity-20 z-0" />

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-deep/40 to-navy-deep pointer-events-none z-0" />

      {/* Main Proportional Stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Primary Content Column (Proportional ~61.8% width) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold/30 bg-navy-primary/70 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/90 font-medium">
                PEOPLE • PROCESS • TECHNOLOGY • AUTOMATION • SCALE
              </span>
            </div>

            {/* Main Headline: Large Editorial Scale matching Reference Image 4 */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.06]">
              Transform
              <span className="block text-white font-serif">HR Operations.</span>
              <span className="block italic font-serif font-normal text-gold text-3xl sm:text-5xl md:text-6xl mt-1">
                Automate the Work.
              </span>
              <span className="block font-serif font-bold text-white text-3xl sm:text-5xl md:text-6xl mt-1">
                Build for Scale.
              </span>
            </h1>

            {/* Golden Divider Accent */}
            <div className="w-16 h-[2px] bg-gold rounded-full" />

            {/* Subheadline Paragraph */}
            <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed max-w-2xl">
              NKVV helps growing businesses transform fragmented, manual HR operations into structured, technology-enabled systems that are easier to manage, measure and scale.
            </p>

            {/* CTA Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gold hover:bg-gold-bright text-navy-deep px-8 sm:px-9 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 shadow-lg shadow-gold/10 group"
              >
                <span>CONNECT WITH OUR TEAM</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white px-7 sm:px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 backdrop-blur-md"
              >
                <span>EXPLORE SOLUTIONS</span>
              </Link>
            </div>
          </div>

          {/* Secondary Visual System Column (Proportional ~38.2% width) */}
          <div className="lg:col-span-5 xl:col-span-5 relative mt-6 lg:mt-0">
            {/* Architectural Operating Model Card wrapped in interactive BorderGlow */}
            <BorderGlow
              edgeSensitivity={35}
              glowColor="43 75 60"
              backgroundColor="#0A2240"
              borderRadius={20}
              glowRadius={36}
              glowIntensity={1.1}
              coneSpread={28}
              animated={true}
              colors={['#C9972B', '#E5B842', '#38bdf8']}
              className="shadow-2xl"
            >
              <div className="p-6 sm:p-8 relative space-y-6">
                
                {/* Top Card Bar */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold">
                    OPERATING ARCHITECTURE
                  </span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 uppercase tracking-widest">
                    STRUCTURE • SYSTEMS • SCALE
                  </span>
                </div>

                {/* 5 Operating Transformation Nodes with Upward Progression */}
                <div className="relative space-y-3.5 pt-2">
                  {/* Visual upward connecting line */}
                  <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-white/10 via-gold/40 to-gold pointer-events-none" />

                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-navy-deep/70 border border-white/10 group hover:border-gold/40 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0 z-10">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold block">01 • PEOPLE</span>
                      <p className="text-xs text-white font-medium">Human Potential &amp; Roles</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-navy-deep/70 border border-white/10 group hover:border-gold/40 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0 z-10">
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold block">02 • PROCESS</span>
                      <p className="text-xs text-white font-medium">Structured Operating Model</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-navy-deep/70 border border-white/10 group hover:border-gold/40 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0 z-10">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold block">03 • TECHNOLOGY</span>
                      <p className="text-xs text-white font-medium">HRIS &amp; Tool Architecture</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-navy-deep/70 border border-white/10 group hover:border-gold/40 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0 z-10">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold block">04 • AUTOMATION</span>
                      <p className="text-xs text-white font-medium">Rules-Based Workflow Execution</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-4 p-3 rounded-xl bg-gold/15 border border-gold/50 group">
                    <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-navy-deep shrink-0 z-10 shadow-sm">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold-bright font-bold block">05 • IMPACT</span>
                      <p className="text-xs text-white font-bold">Predictable, Autonomous Scale</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Subtle Brand Mark Integration */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>EXECUTION FRAMEWORK</span>
                  <span className="text-gold">NKVV • ARCHITECTURE</span>
                </div>
              </div>
            </BorderGlow>
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator Arrow */}
      <div className="relative z-10 pt-4 pb-1 flex flex-col items-center">
        <a
          href="#business-flow"
          aria-label="Scroll down to explore operations"
          className="text-white/60 hover:text-white transition-colors duration-200 p-2 focus:outline-none"
        >
          <ChevronDown className="w-5 h-5 animate-bounce text-gold/80" />
        </a>
      </div>
    </section>
  );
};


