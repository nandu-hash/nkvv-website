import React from 'react';
import { Target } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

interface AudienceCategory {
  title: string;
  stage: string;
  description: string;
  painPoint: string;
}

const AUDIENCE_CATEGORIES: AudienceCategory[] = [
  {
    title: 'Growing Startups',
    stage: 'Foundational Phase (30–75 employees)',
    description: 'Companies scaling rapidly that need to transition from founder-led HR to their first structured, automated people operations framework.',
    painPoint: 'Recruitment bottlenecks and inconsistent onboarding experience',
  },
  {
    title: 'Scaling SMEs',
    stage: 'Expansion Phase (75–150 employees)',
    description: 'Established businesses where spreadsheet tracking and manual email workflows have become a major operational drag on leadership.',
    painPoint: 'HRMS misconfiguration and spreadsheet clutter',
  },
  {
    title: 'Established Teams',
    stage: 'Modernization Phase (150–300+ employees)',
    description: 'Organizations looking to modernize legacy HR operations, introduce smart automation, and elevate management visibility.',
    painPoint: 'Lack of integrated analytics and high administrative costs',
  },
];

export const WhoWeServe: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50/70 text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-2">
            Target Client Profile
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-deep tracking-tight">
            Designed for Growing Businesses
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              Scaling Teams with 30 to 300+ People
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gold rounded-full my-3" />
          <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
            Tailored advisory for enterprises transitioning from ad-hoc operations to systematic clarity.
          </p>
        </div>

        {/* 3 Audience Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUDIENCE_CATEGORIES.map((aud) => (
            <BorderGlow
              key={aud.title}
              backgroundColor="#ffffff"
              borderRadius={16}
              glowRadius={30}
              className="h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-8 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold block">
                    {aud.stage}
                  </span>

                  <h3 className="text-2xl font-serif font-normal text-navy-deep">
                    {aud.title}
                  </h3>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {aud.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-start gap-2 text-xs text-gray-700">
                  <Target className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                  <span className="font-light">
                    <strong className="font-semibold text-navy-deep">Primary Bottleneck:</strong> {aud.painPoint}
                  </span>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
};
