import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export const FinalCta: React.FC = () => {
  return (
    <section className="py-24 bg-navy-deep text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-8">
        <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block">
          Advisory &amp; Systems Implementation
        </span>

        <h2 className="text-4xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-tight">
          Let&apos;s diagnose the problem before we automate it.
        </h2>

        <p className="text-base text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
          Tell us where your HR operations are slowing the business down. We&apos;ll identify the friction, map the underlying process and determine what should be redesigned, enabled or automated.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gold hover:bg-gold-light text-navy-deep font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-md"
          >
            <span>Start a Discovery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border border-white/30 hover:bg-white hover:text-navy-deep text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300"
          >
            <span>Explore Solutions</span>
          </Link>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-gray-400 font-light">
          <span className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-gold" />
            30-Minute Architecture Review
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-gold" />
            Clear Operational Diagnostic
          </span>
          <span className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-gold" />
            Zero Software Sales Pressure
          </span>
        </div>
      </div>
    </section>
  );
};
