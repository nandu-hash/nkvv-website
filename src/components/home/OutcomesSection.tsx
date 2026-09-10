import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

interface OutcomeShift {
  from: string;
  to: string;
  description: string;
}

const OUTCOME_SHIFTS: OutcomeShift[] = [
  {
    from: 'Manual Excel Tracking',
    to: 'Automated Workflows',
    description: 'Elimination of repetitive data entry, offline attendance registers, and manual document chasing.',
  },
  {
    from: 'Fragmented Silos',
    to: 'Connected Single Source',
    description: 'Unified employee data connecting recruitment, HRIS platforms, leaves, and payroll.',
  },
  {
    from: 'Reactive Firefighting',
    to: 'Structured SOPs',
    description: 'Clearly documented policies, transparent SLA ownership, and predictable operating cadences.',
  },
  {
    from: 'Founder Dependency',
    to: 'Autonomous Systems',
    description: 'People operations that function reliably without requiring founder intervention for routine decisions.',
  },
];

const TARGET_OUTCOMES = [
  'Eliminated manual administrative tasks',
  'Accelerated onboarding velocity & conversion',
  'Higher data integrity & compliance audit readiness',
  'Clear process SLA ownership across leadership',
  'Real-time executive metrics and workforce dashboards',
  'Scalable infrastructure engineered for 30 to 300+ staff',
];

export const OutcomesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-2">
            Transformation Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-deep tracking-tight">
            Measurable Operational Shifts
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              From Friction to Fluency
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gold rounded-full my-3" />
          <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
            We measure value by the tangible organizational transitions created inside your day-to-day operations.
          </p>
        </div>

        {/* 4 Shift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {OUTCOME_SHIFTS.map((shift) => (
            <BorderGlow
              key={shift.from}
              backgroundColor="#ffffff"
              borderRadius={16}
              glowRadius={30}
              className="h-full shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-8 flex flex-col justify-between space-y-4 h-full">
                <div className="flex items-center gap-4 text-sm font-serif">
                  <span className="text-gray-400 line-through decoration-red-400/60">
                    {shift.from}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                  <span className="text-navy-deep font-semibold border-b border-gold pb-0.5">
                    {shift.to}
                  </span>
                </div>

                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {shift.description}
                </p>
              </div>
            </BorderGlow>
          ))}
        </div>

        {/* Outcomes Checklist in Minimalist Banner wrapped in BorderGlow */}
        <BorderGlow
          backgroundColor="#ffffff"
          borderRadius={20}
          glowRadius={35}
          className="shadow-md"
        >
          <div className="p-8 lg:p-12">
            <span className="text-[10px] font-mono tracking-widest uppercase text-gold font-bold mb-4 block">
              Systemic Advantages
            </span>
            <h3 className="text-2xl font-serif font-normal text-navy-deep mb-8">
              What Changes When You Build Systems With NKVV
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {TARGET_OUTCOMES.map((outc) => (
                <div key={outc} className="flex items-start gap-3 text-xs text-gray-700">
                  <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                  <span className="font-light">{outc}</span>
                </div>
              ))}
            </div>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
};
