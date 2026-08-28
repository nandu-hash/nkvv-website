import React from 'react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';
import { SITE_CONFIG } from '@/config/site';
import { ArrowRight, PhoneCall, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-navy-deep via-navy-primary to-navy-deep text-white overflow-hidden">
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-surface/80 border border-gold/40 text-gold-light text-xs font-mono font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              {SITE_CONFIG.tagline}
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Transform HR Operations.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-amber-200">
                Automate the Work.
              </span>{' '}
              Build for Scale.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-normal">
              {SITE_CONFIG.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-navy-deep bg-gold hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20 transform hover:-translate-y-0.5"
              >
                <PhoneCall className="w-5 h-5" />
                <span>{SITE_CONFIG.hero.primaryCta}</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-navy-surface/80 hover:bg-navy-light border border-navy-light/60 hover:border-gold/50 transition-all duration-200"
              >
                <Layers className="w-5 h-5 text-gold" />
                <span>{SITE_CONFIG.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Credibility Statement Bar */}
            <div className="pt-6 border-t border-navy-surface/80">
              <p className="text-xs font-mono tracking-wider uppercase text-gray-400">
                {SITE_CONFIG.hero.credibilityBar}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive System Architecture Visual */}
          <div className="lg:col-span-5 w-full">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
