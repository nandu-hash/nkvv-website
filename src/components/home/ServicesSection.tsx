import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/config/services';
import { Layers, ArrowRight, ShieldCheck, Zap, Cpu, Compass } from 'lucide-react';

const CATEGORY_ICONS = [ShieldCheck, Cpu, Zap, Compass];

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-light text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
              Core Expertise
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep uppercase tracking-tight">
              Transformative HR Consulting & Automation
            </h2>

            <p className="text-base text-muted font-light leading-relaxed max-w-2xl">
              We structure every intervention around measurable business outcomes, building operational infrastructure that scales with you.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy-dark hover:bg-gold text-white hover:text-navy-dark text-sm font-bold uppercase tracking-widest transition-all duration-300 shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border-subtle bg-border-subtle">
          {SERVICES_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[idx];
            return (
              <div
                key={cat.id}
                className="bg-white p-10 group hover:bg-gray-light transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 border border-border-subtle bg-white text-navy-primary group-hover:border-gold group-hover:text-gold flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-navy-deep uppercase tracking-widest mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  {/* Primary Service Sample Problem -> Intervention -> Outcome */}
                  <div className="bg-gray-light/50 p-6 border border-border-subtle space-y-4">
                    <div className="text-[10px] font-mono font-bold text-navy-primary uppercase tracking-[0.2em] mb-4">
                      Scope: {cat.items[0].title}
                    </div>

                    <div className="space-y-3 text-sm font-light">
                      <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-navy-dark uppercase tracking-wider text-[11px] mt-0.5">Problem</span>
                        <span className="text-muted leading-relaxed">{cat.items[0].problem}</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-navy-dark uppercase tracking-wider text-[11px] mt-0.5">Intervention</span>
                        <span className="text-muted leading-relaxed">{cat.items[0].intervention}</span>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-4">
                        <span className="font-bold text-gold-bright uppercase tracking-wider text-[11px] mt-0.5">Outcome</span>
                        <span className="text-dark font-medium leading-relaxed">{cat.items[0].outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-mono tracking-widest uppercase">
                    {cat.items[0].features.length}+ Capabilities
                  </span>
                  <Link
                    href={`/services#${cat.id}`}
                    className="text-[11px] font-bold text-navy-primary uppercase tracking-widest hover:text-gold flex items-center gap-2 transition-colors"
                  >
                    <span>View Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
