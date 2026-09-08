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
    title: 'Manual Operations',
    description: 'Teams rely on spreadsheets, email chains and repetitive administrative work.',
    symptom: 'Prone to errors and latency during critical monthly cycles',
  },
  {
    icon: Unplug,
    title: 'Fragmented Tools',
    description: 'HR systems, spreadsheets and communication channels operate in silos.',
    symptom: 'Siloed data requiring duplicate manual entry',
  },
  {
    icon: BrainCircuit,
    title: 'Unclear Workflows',
    description: 'Critical processes depend on individual employees rather than documented systems.',
    symptom: 'Single point of failure when key personnel are absent',
  },
  {
    icon: Hourglass,
    title: 'Reactive Execution',
    description: 'Teams spend time resolving recurring operational issues instead of improving the system.',
    symptom: 'Bandwidth consumed by routine administrative firefighting',
  },
  {
    icon: EyeOff,
    title: 'Invisible Metrics',
    description: 'Leadership lacks reliable visibility into workforce operations and process performance.',
    symptom: 'Decisions guided by delayed or incomplete operational reports',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-24 bg-white text-dark border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 pb-8 border-b border-border-subtle">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold">
              Operational Reality
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-navy-deep tracking-tight">
              Growth creates complexity. We turn complexity into systems.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-8 text-sm text-gray-600 font-light leading-relaxed">
            As companies scale past 30 employees, informal practices break down. Without deliberate system architecture, friction compounds silently across teams.
          </div>
        </div>

        {/* 5 Problem Columns in Editorial Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROBLEMS.map((prob, idx) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="p-8 border border-border-subtle bg-white flex flex-col justify-between group hover:border-gold transition-colors duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
                      CHALLENGE 0{idx + 1}
                    </span>
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                  </div>

                  <h3 className="text-xl font-serif font-medium text-navy-deep">
                    {prob.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    {prob.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex items-start gap-2 text-[11px] font-mono text-gray-500">
                  <span className="text-gold font-bold">→</span>
                  <span>{prob.symptom}</span>
                </div>
              </div>
            );
          })}

          {/* Solution Highlight Box */}
          <div className="p-8 border border-navy-deep bg-navy-deep text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
                  THE NKVV MODEL
                </span>
                <Sparkles className="w-4 h-4 text-gold" />
              </div>

              <h3 className="text-xl font-serif font-medium text-white">
                Engineered Operational Resilience
              </h3>

              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Diagnose bottlenecks, design the operating model, implement the right systems and automate repeatable work.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-[10px] font-mono uppercase tracking-widest text-gold">
              Zero Generic Advice. Real Systems.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
