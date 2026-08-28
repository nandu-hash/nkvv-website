import React from 'react';
import { FileSpreadsheet, Unplug, BrainCircuit, Hourglass, EyeOff, Sparkles } from 'lucide-react';

interface ProblemCard {
  icon: React.ElementType;
  title: string;
  description: string;
  symptom: string;
}

const PROBLEMS: ProblemCard[] = [
  {
    icon: FileSpreadsheet,
    title: 'Manual Processes',
    description: 'HR teams rely on disconnected spreadsheets, endless email threads, and repetitive administrative data entry.',
    symptom: 'High risk of human error during monthly cycles',
  },
  {
    icon: Unplug,
    title: 'Disconnected Systems',
    description: "HRMS, payroll, attendance, recruitment, and communication tools don't talk to each other effectively.",
    symptom: 'Siloed employee data requiring duplicate entries',
  },
  {
    icon: BrainCircuit,
    title: 'Process Gaps',
    description: "Core operational processes exist in team members' heads rather than documented SOPs and repeatable workflows.",
    symptom: 'Operational disruption whenever key staff are absent',
  },
  {
    icon: Hourglass,
    title: 'Operational Bottlenecks',
    description: 'HR teams spend up to 70% of their bandwidth executing manual tasks instead of improving employee experience.',
    symptom: 'Slow response times for routine employee queries',
  },
  {
    icon: EyeOff,
    title: 'Lack of Visibility',
    description: 'Leadership lacks accurate, real-time HR metrics, executive dashboards, and operational analytics.',
    symptom: 'Decision-making based on delayed or incomplete data',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-offwhite text-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Operational Reality
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            Growth creates complexity.{' '}
            <span className="text-gold-muted font-bold">
              We turn complexity into systems.
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            As companies scale past 30 employees, informal practices break down. Without structured architecture, administrative friction compounds rapidly.
          </p>
        </div>

        {/* 5 Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="bg-white p-7 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-gold/50"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy-primary/10 text-navy-primary group-hover:bg-gold group-hover:text-navy-deep flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono text-muted font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-deep group-hover:text-navy-primary transition-colors">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-navy-primary">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>Impact: {prob.symptom}</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Solution Highlight Banner */}
          <div className="bg-navy-deep p-7 rounded-2xl text-white flex flex-col justify-between border border-navy-surface shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gold text-navy-deep flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight">
                The NKVV Approach
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                We don&apos;t sell generic templates or mandate software change. We diagnose operational bottlenecks, redesign procedures, and build scalable systems.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-navy-surface relative z-10 text-xs font-mono text-gold-light">
              End-to-End Operational Transformation
            </div>
          </div>
        </div>

        {/* Section Ending Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-navy-primary text-white text-center shadow-xl border border-gold/30 max-w-4xl mx-auto">
          <p className="text-lg sm:text-xl font-bold tracking-tight text-white">
            NKVV connects{' '}
            <span className="text-gold">People</span> +{' '}
            <span className="text-gold">Process</span> +{' '}
            <span className="text-gold">Technology</span> to create scalable HR operations.
          </p>
        </div>

      </div>
    </section>
  );
};
