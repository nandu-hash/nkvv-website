import React from 'react';
import Metadata from 'next';
import Link from 'next/link';
import { SERVICES_DATA } from '@/config/services';
import { CheckCircle2, ArrowRight, PhoneCall, ShieldCheck, Cpu, Zap, Compass } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

export const metadata = {
  title: 'Services | NK Velora Ventures',
  description: 'HR Operations Transformation, HR Technology & HRIS, HR Automation, and People & Process Consulting for growing businesses.',
};

const CATEGORY_ICONS = [ShieldCheck, Cpu, Zap, Compass];

export default function ServicesPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-20 md:py-28 border-b border-navy-surface relative overflow-hidden bg-grid-architectural-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-4 text-center max-w-4xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-[0.25em] bg-navy-primary px-4 py-1.5 border border-gold/30 rounded-full inline-block">
            NKVV Core Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
            Transformation Services
            <span className="block italic font-serif font-normal text-gold text-3xl sm:text-4xl lg:text-5xl mt-2">
              Built for Operational Impact
            </span>
          </h1>
          <div className="w-14 h-0.5 bg-gold mx-auto my-4 rounded-full" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            We structure our consulting interventions around explicit Problem → Intervention → Outcome matrices to ensure technology serves process.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {SERVICES_DATA.map((cat, catIdx) => {
            const Icon = CATEGORY_ICONS[catIdx];
            return (
              <BorderGlow
                key={cat.id}
                backgroundColor="#ffffff"
                borderRadius={20}
                glowRadius={35}
                className="shadow-md"
              >
                <div
                  id={cat.id}
                  className="scroll-mt-32 p-8 sm:p-10 space-y-8"
                >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-navy-deep text-gold flex items-center justify-center shadow-lg shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-gold-muted block uppercase">
                        CATEGORY 0{catIdx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-deep">
                        {cat.title}
                      </h2>
                      <p className="text-sm font-medium text-muted mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-primary hover:bg-navy-deep text-white text-xs font-bold transition-all shrink-0"
                  >
                    <PhoneCall className="w-4 h-4 text-gold" />
                    <span>Inquire About Scope</span>
                  </Link>
                </div>

                <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
                  {cat.description}
                </p>

                {/* Sub-services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {cat.items.map((item) => (
                    <div
                      key={item.title}
                      className="bg-offwhite p-6 rounded-xl border border-gray-200 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold text-navy-deep">
                          {item.title}
                        </h3>

                        {/* Problem -> Intervention -> Outcome Box */}
                        <div className="space-y-3 bg-white p-4 rounded-lg border border-gray-200 text-xs">
                          <div>
                            <span className="font-bold text-red-700 uppercase tracking-wider block mb-0.5">
                              Core Problem Addressed:
                            </span>
                            <p className="text-gray-700 leading-relaxed">
                              {item.problem}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-gray-100">
                            <span className="font-bold text-navy-primary uppercase tracking-wider block mb-0.5">
                              NKVV Intervention:
                            </span>
                            <p className="text-gray-700 leading-relaxed">
                              {item.intervention}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-gray-100">
                            <span className="font-bold text-emerald-700 uppercase tracking-wider block mb-0.5">
                              Business Outcome:
                            </span>
                            <p className="text-gray-900 font-semibold leading-relaxed">
                              {item.outcome}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Capabilities checklist */}
                      <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-[11px] font-mono uppercase font-bold text-navy-deep mb-2">
                          Scope & Capabilities Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.features.map((feat) => (
                            <div key={feat} className="flex items-center gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BorderGlow
          backgroundColor="#0A2240"
          borderRadius={20}
          glowRadius={36}
          className="shadow-2xl"
        >
          <div className="p-8 rounded-2xl text-white text-center space-y-4">
            <h3 className="text-2xl font-bold">
              Need a tailored service combination?
            </h3>
            <p className="text-sm text-gray-300 max-w-xl mx-auto">
              We build modular engagement scopes combining HR operations, HRIS implementation, and custom automation based on your exact business needs.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-navy-deep font-bold text-sm transition-all"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </BorderGlow>
      </section>
    </main>
  );
}
