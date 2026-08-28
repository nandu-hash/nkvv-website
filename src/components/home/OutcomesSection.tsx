import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, BarChart3, Clock, Lock, Sparkles } from 'lucide-react';

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
    from: 'Fragmented Tools & Silos',
    to: 'Connected Single Source',
    description: 'Seamless data flow connecting recruitment, HRIS, attendance registers, and payroll systems.',
    icon: ShieldCheck,
  },
  {
    from: 'Reactive Firefighting',
    to: 'Structured SOP Framework',
    description: 'Documented policies, clear SLA ownership, and predictable employee lifecycle processes.',
    icon: Clock,
  },
  {
    from: 'Operational Dependency',
    to: 'Scalable Systems',
    description: 'People operations that function reliably regardless of individual staff turnover or founder availability.',
    icon: Lock,
  },
];

const TARGET_OUTCOMES = [
  'Less manual work & reduced administrative friction',
  'Faster employee lifecycle & onboarding velocity',
  'Higher HR data fidelity & single-source accuracy',
  'Clear process ownership & SLA accountability',
  'Stronger statutory & internal policy compliance',
  'Elevated employee experience & candidate satisfaction',
  'Reduced dependency on founder intervention',
  'Real-time management visibility & executive dashboards',
  'Scalable HR infrastructure built for 30 to 300+ headcount',
];

export const OutcomesSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-offwhite text-dark border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Transformation Impact
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            Target Outcomes of NKVV Interventions
          </h2>

          <p className="text-base text-muted leading-relaxed">
            We measure success by the tangible operational shifts created within your organization.
          </p>
        </div>

        {/* 4 Shift Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {OUTCOME_SHIFTS.map((shift) => {
            const Icon = shift.icon;
            return (
              <div
                key={shift.from}
                className="bg-white p-7 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-primary/10 text-navy-primary flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <span className="text-muted line-through decoration-red-400">
                        {shift.from}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gold shrink-0" />
                      <span className="text-navy-deep text-base underline decoration-gold underline-offset-4">
                        {shift.to}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed pl-13">
                    {shift.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 9 Core Outcomes List Grid */}
        <div className="bg-navy-deep p-8 sm:p-10 rounded-2xl text-white border border-navy-surface shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-gold" />
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              What Changes When You Build Systems With NKVV
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {TARGET_OUTCOMES.map((outc) => (
              <div
                key={outc}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-navy-primary/60 border border-navy-light/40 text-sm text-gray-200"
              >
                <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>{outc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
