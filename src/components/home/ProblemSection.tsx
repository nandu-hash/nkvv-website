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
    title: 'Manual',
    description: 'HR teams rely on disconnected spreadsheets, endless email threads, and repetitive administrative data entry.',
    symptom: 'High risk of human error during monthly cycles',
  },
  {
    icon: Unplug,
    title: 'Fragmented',
    description: "HRMS, payroll, attendance, recruitment, and communication tools don't talk to each other effectively.",
    symptom: 'Siloed employee data requiring duplicate entries',
  },
  {
    icon: BrainCircuit,
    title: 'Unclear',
    description: "Core operational processes exist in team members' heads rather than documented SOPs and repeatable workflows.",
    symptom: 'Operational disruption whenever key staff are absent',
  },
  {
    icon: Hourglass,
    title: 'Reactive',
    description: 'HR teams spend up to 70% of their bandwidth executing manual tasks instead of improving employee experience.',
    symptom: 'Slow response times for routine employee queries',
  },
  {
    icon: EyeOff,
    title: 'Invisible',
    description: 'Leadership lacks accurate, real-time HR metrics, executive dashboards, and operational analytics.',
    symptom: 'Decision-making based on delayed or incomplete data',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-light text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Operational Reality
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            Growth creates complexity.<br/>
            <span className="text-gold">
              We turn complexity into systems.
            </span>
          </h2>
          
          <p className="text-base text-muted max-w-2xl font-light">
            As companies scale, informal practices break down. Without structured architecture, administrative friction compounds rapidly.
          </p>
        </div>

        {/* 5 Problem Cards Grid + 1 Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border-subtle bg-border-subtle">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="bg-white p-8 group hover:bg-gray-light transition-colors duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 border border-border-subtle bg-white text-navy-primary group-hover:border-gold flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-deep uppercase tracking-wider">
                    {prob.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed font-light">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border-subtle flex items-start gap-3 text-xs font-medium text-navy-primary">
                  <span className="w-1.5 h-1.5 rounded-none bg-gold shrink-0 mt-1" />
                  <span className="leading-tight text-gray-500 font-mono tracking-tight">{prob.symptom}</span>
                </div>
              </div>
            );
          })}

          {/* 6th Card: Solution Highlight Banner */}
          <div className="bg-navy-deep p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="w-10 h-10 border border-gold/30 bg-navy-primary text-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                The NKVV Approach
              </h3>

              <p className="text-sm text-gray-400 leading-relaxed font-light">
                We diagnose operational bottlenecks, redesign procedures, and build scalable systems. No generic templates.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-navy-primary relative z-10 text-[10px] uppercase font-mono tracking-widest text-gold">
              End-to-End Transformation
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
