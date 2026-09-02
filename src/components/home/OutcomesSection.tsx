import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Clock, Lock, Sparkles, Check } from 'lucide-react';

interface OutcomeShift {
  from: string;
  to: string;
  description: string;
  icon: React.ElementType;
}

const OUTCOME_SHIFTS: OutcomeShift[] = [
  {
    from: 'Manual Excel Tracking',
    to: 'Automated Workflows',
    description: 'Elimination of repetitive administrative data entry, document chasing, and spreadsheet calculations.',
    icon: Zap,
  },
  {
    from: 'Fragmented Silos',
    to: 'Connected Data',
    description: 'Seamless data flow connecting recruitment, HRIS, attendance registers, and payroll systems.',
    icon: ShieldCheck,
  },
  {
    from: 'Reactive Firefighting',
    to: 'Structured SOPs',
    description: 'Documented policies, clear SLA ownership, and predictable employee lifecycle processes.',
    icon: Clock,
  },
  {
    from: 'Founder Dependency',
    to: 'Scalable Systems',
    description: 'People operations that function reliably regardless of individual staff turnover or founder availability.',
    icon: Lock,
  },
];

const TARGET_OUTCOMES = [
  'Eliminated manual administration',
  'Accelerated onboarding velocity',
  '100% HR data fidelity & accuracy',
  'Clear process SLA accountability',
  'Bulletproof statutory compliance',
  'Elevated candidate experience',
  'Decentralized process ownership',
  'Real-time executive dashboards',
  'Infrastructure scaled for 300+ staff',
];

export const OutcomesSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-dark border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-light text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Transformation Impact
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight uppercase">
            Measurable Outcomes
          </h2>

          <p className="text-base text-muted leading-relaxed font-light">
            We measure success by the tangible operational shifts created within your organization.
          </p>
        </div>

        {/* 4 Shift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-border-subtle bg-border-subtle mb-16">
          {OUTCOME_SHIFTS.map((shift) => {
            const Icon = shift.icon;
            return (
              <div
                key={shift.from}
                className="bg-white p-8 group hover:bg-gray-light transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <span className="text-gray-400 line-through decoration-red-400/50">
                      {shift.from}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gold shrink-0 hidden sm:block" />
                    <span className="text-navy-deep decoration-gold underline-offset-4 border-b-2 border-gold pb-1 inline-block w-fit">
                      {shift.to}
                    </span>
                  </div>

                  <p className="text-sm text-muted leading-relaxed font-light">
                    {shift.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 9 Core Outcomes List Grid */}
        <div className="bg-navy-dark p-8 lg:p-12 text-white border border-border-subtle/20 space-y-10">
          <div className="flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-white">
              Systematic Advantages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_OUTCOMES.map((outc) => (
              <div
                key={outc}
                className="flex items-start gap-4 p-4 border border-border-subtle/10 bg-navy-primary text-sm text-gray-300"
              >
                <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="font-light">{outc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
