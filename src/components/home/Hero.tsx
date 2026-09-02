import React from 'react';
import Link from 'next/link';
import { HeroVisual } from './HeroVisual';
import { SITE_CONFIG } from '@/config/site';
import { ArrowRight, PhoneCall, Layers } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-navy-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-gold/30 bg-transparent text-gold-bright text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-sm bg-gold" />
              {SITE_CONFIG.tagline}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-sans">
              Transform Operations.<br/>
              <span className="text-gold-bright">
                Automate the Work.
              </span><br/>
              Build for Scale.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-lg font-light tracking-wide">
              {SITE_CONFIG.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-wider text-navy-deep bg-gold hover:bg-gold-light transition-all duration-300"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{SITE_CONFIG.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-wider text-white bg-transparent border border-border-subtle/20 hover:border-gold/50 transition-all duration-300"
              >
                <Layers className="w-4 h-4 text-gold-bright" />
                <span>{SITE_CONFIG.hero.secondaryCta}</span>
              </Link>
            </div>

            {/* Credibility Statement Bar */}
            <div className="pt-8 mt-8 border-t border-border-subtle/10">
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-gray-500">
                {SITE_CONFIG.hero.credibilityBar}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive System Architecture Visual */}
          <div className="lg:col-span-6 w-full">
            <HeroVisual />
          </div>

        </div>
      </div>
    </section>
  );
};
