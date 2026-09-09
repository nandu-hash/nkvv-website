'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { GoldenSpiral } from '@/components/ui/GoldenSpiral';
import { ChevronDown, ArrowRight, ShieldCheck, Cpu, GitBranch } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden bg-navy-deep text-white border-b border-navy-primary">
      {/* Background Architectural Subtle Golden Spiral (Ultra-low opacity, non-distracting) */}
      <div className="absolute right-[-10%] top-[-5%] w-[85vw] max-w-[1100px] pointer-events-none opacity-[0.06] sm:opacity-[0.08] mix-blend-screen z-0">
        <GoldenSpiral variant="hero" />
      </div>

      {/* Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-grid-architectural-dark pointer-events-none opacity-40 z-0" />

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-transparent to-navy-deep pointer-events-none z-0" />

      {/* Main Golden Ratio Stage (Desktop ~61.8% content / ~38.2% visual system) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Primary Content Column (~61.8% proportional width: 7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-8 text-left">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gold/40 bg-navy-primary/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/90 font-semibold">
                {SITE_CONFIG.hero.eyebrow}
              </span>
            </div>

            {/* Main Headline: Bold Serif + Editorial Contrast */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.06]">
              Structure Before Automation.
              <span className="block italic font-serif font-normal text-gold text-3xl sm:text-5xl md:text-6xl mt-2">
                Scale with Intelligence.
              </span>
            </h1>

            {/* Golden Divider Accent */}
            <div className="w-16 h-[2px] bg-gold rounded-full" />

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed max-w-2xl">
              {SITE_CONFIG.hero.subheadline}
            </p>

            {/* Primary Process Flow Anchor */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-gray-300 pt-1">
              <span className="text-gold font-bold">FLOW:</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Diagnose</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Structure</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Improve</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded">Automate</span>
              <span>→</span>
              <span className="px-2.5 py-1 bg-gold/20 text-gold-light border border-gold/40 rounded font-semibold">Scale</span>
            </div>

            {/* CTA Group: Golden Ratio Proportions */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-gold hover:bg-gold-bright text-navy-deep px-8 sm:px-9 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl group hover:shadow-gold/20"
              >
                <span>{SITE_CONFIG.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-white px-7 sm:px-8 py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all duration-300 backdrop-blur-md"
              >
                <span>{SITE_CONFIG.hero.secondaryCta}</span>
              </Link>
            </div>
          </div>

          {/* Secondary Visual / System Column (~38.2% proportional width: 5 cols) */}
          <div className="lg:col-span-5 xl:col-span-5 relative mt-6 lg:mt-0">
            {/* System Blueprint Card with 1:1.618 Proportion Balance */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/15 bg-navy-primary/75 backdrop-blur-xl shadow-2xl relative space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold">
                  NKVV ARCHITECTURE MATRIX
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 uppercase">
                  φ ≈ 1.618 System
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-navy-deep/80 border border-white/10 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      01. Process & Labour Compliance
                    </h4>
                    <p className="text-xs text-gray-300 font-light mt-1 leading-relaxed">
                      Diagnose operational risks and formalize compliant workflows before touching technology.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-deep/80 border border-white/10 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <GitBranch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      02. Operating Model Structure
                    </h4>
                    <p className="text-xs text-gray-300 font-light mt-1 leading-relaxed">
                      Convert tacit memory and disconnected spreadsheets into documented SOPs and controls.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-deep/80 border border-white/10 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      03. Intelligent Workflow Automation
                    </h4>
                    <p className="text-xs text-gray-300 font-light mt-1 leading-relaxed">
                      Automate rules-based handoffs, API integrations, and real-time leadership visibility.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product Directive Teaser */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-300 text-[11px] font-mono">
                  Product Initiative:
                </span>
                <Link
                  href="#velora-compliance"
                  className="text-gold hover:text-gold-light font-mono font-bold text-[11px] uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                >
                  <span>VELORA Compliance</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
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

