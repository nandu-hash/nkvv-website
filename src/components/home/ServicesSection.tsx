import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/config/services';
import { Layers, ArrowRight, ShieldCheck, Zap, Cpu, Compass } from 'lucide-react';

const CATEGORY_ICONS = [ShieldCheck, Cpu, Zap, Compass];

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
              Core Expertise
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
              Transformative HR Consulting & Automation Capabilities
            </h2>

            <p className="text-base text-muted leading-relaxed">
              We structure every intervention around measurable business outcomes, moving beyond standard advice to build operational infrastructure.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy-primary hover:bg-navy-deep text-white text-sm font-semibold transition-all shadow-md shrink-0"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 text-gold" />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[idx];
            return (
              <div
                key={cat.id}
                className="bg-offwhite p-8 rounded-2xl border border-border-subtle shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:border-gold/60"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-navy-deep group-hover:text-navy-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-gold-muted font-medium mt-1">
                      {cat.subtitle}
                    </p>
                    <p className="text-sm text-muted mt-3 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Primary Service Sample Problem -> Intervention -> Outcome */}
                  <div className="bg-white p-5 rounded-xl border border-gray-200 space-y-3">
                    <div className="text-xs font-mono font-bold text-navy-primary uppercase tracking-wider">
                      Featured Scope: {cat.items[0].title}
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="font-bold text-red-700">Problem: </span>
                        <span className="text-muted">{cat.items[0].problem}</span>
                      </div>
                      <div>
                        <span className="font-bold text-navy-primary">Intervention: </span>
                        <span className="text-muted">{cat.items[0].intervention}</span>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-700">Outcome: </span>
                        <span className="text-dark font-medium">{cat.items[0].outcome}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-xs text-muted font-mono">
                    {cat.items[0].features.length}+ Core Capabilities
                  </span>
                  <Link
                    href={`/services#${cat.id}`}
                    className="text-xs font-bold text-navy-primary hover:text-gold flex items-center gap-1 transition-colors"
                  >
                    <span>View Specifications</span>
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
