import React from 'react';
import { Rocket, Building2, ShieldCheck, Users, Target } from 'lucide-react';

interface AudienceCategory {
  icon: React.ElementType;
  title: string;
  stage: string;
  description: string;
  painPoint: string;
}

const AUDIENCE_CATEGORIES: AudienceCategory[] = [
  {
    icon: Rocket,
    title: 'Growing Startups',
    stage: 'Foundational Phase (30–75 employees)',
    description: 'Companies scaling rapidly that need to transition from founder-led HR to their first structured, automated people operations framework.',
    painPoint: 'Recruitment bottlenecks and inconsistent onboarding experience',
  },
  {
    icon: Building2,
    title: 'Scaling SMEs',
    stage: 'Expansion Phase (75–150 employees)',
    description: 'Established businesses where spreadsheet tracking and manual email workflows have become a major operational drag on leadership.',
    painPoint: 'HRMS misconfiguration and spreadsheet clutter',
  },
  {
    icon: ShieldCheck,
    title: 'Established Teams',
    stage: 'Modernization Phase (150–300+ employees)',
    description: 'Organizations looking to modernize legacy HR operations, introduce smart automation, and elevate management visibility.',
    painPoint: 'Lack of integrated analytics and high administrative costs',
  },
];

export const WhoWeServe: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Target Ideal Profile
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            Designed for Businesses Experiencing Operational Growth
          </h2>

          <div className="inline-block p-4 rounded-xl bg-offwhite border border-gold/40 text-navy-deep text-sm sm:text-base font-semibold">
            <span className="text-gold font-bold">Initial Focus: </span>
            Our initial focus is growing businesses with approximately{' '}
            <span className="underline decoration-gold underline-offset-4 font-bold">
              30–300 employees
            </span>.
          </div>
        </div>

        {/* 3 Audience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {AUDIENCE_CATEGORIES.map((aud) => {
            const Icon = aud.icon;
            return (
              <div
                key={aud.title}
                className="bg-offwhite p-8 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-gold/60"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono font-bold text-gold-muted block">
                    {aud.stage}
                  </span>

                  <h3 className="text-2xl font-bold text-navy-deep group-hover:text-navy-primary transition-colors">
                    {aud.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {aud.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 text-xs font-medium text-navy-primary flex items-center gap-2">
                  <Target className="w-4 h-4 text-gold shrink-0" />
                  <span>Key Challenge: {aud.painPoint}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scalability note */}
        <div className="mt-12 text-center text-xs text-muted max-w-xl mx-auto">
          While our methodology is tailored for fast-growing startups and SMEs, our process principles scale seamlessly to enterprise operational environments.
        </div>

      </div>
    </section>
  );
};
