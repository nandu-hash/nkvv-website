import React from 'react';
import Link from 'next/link';
import { SERVICES_DATA } from '@/config/services';
import { ArrowRight } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header - Tight & Aligned */}
        <div className="border-b border-border-subtle pb-4 mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-1">
              Capabilities &amp; Practice Areas
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy-deep tracking-tight">
              Core Consulting Services
              <span className="block italic font-serif font-normal text-gold text-xl sm:text-2xl lg:text-3xl mt-0.5">
                Engineered for Scale
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-light mt-2 max-w-2xl">
              Comprehensive operational infrastructure designed to scale alongside your organization.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-navy-deep text-xs font-semibold uppercase tracking-wider text-navy-deep hover:bg-navy-deep hover:text-white transition-all duration-300 w-fit shrink-0 cursor-pointer"
          >
            <span>All Capabilities</span>
            <ArrowRight className="w-3.5 h-3.5 text-gold" />
          </Link>
        </div>

        {/* Editorial Rows matching Reference */}
        <div className="divide-y divide-border-subtle border-b border-border-subtle">
          {SERVICES_DATA.map((cat, idx) => (
            <div
              key={cat.id}
              className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-gray-50/50 transition-colors duration-200 px-3 -mx-3 rounded-xl"
            >
              {/* Category Title */}
              <div className="md:col-span-4 space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold">
                  Pillar 0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-navy-deep group-hover:text-gold transition-colors">
                  {cat.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5 space-y-2">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                  {cat.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.items[0]?.features.slice(0, 3).map((feat) => (
                    <span
                      key={feat}
                      className="text-[10px] font-mono uppercase tracking-wider text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <div className="md:col-span-3 flex md:justify-end items-center pt-2">
                <Link
                  href={`/services#${cat.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy-deep hover:text-gold transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                >
                  <span>Explore Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
