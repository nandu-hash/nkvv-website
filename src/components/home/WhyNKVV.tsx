import React from 'react';
import { Wrench, GitPullRequest, Bot, TrendingUp } from 'lucide-react';

interface Differentiator {
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Wrench,
    title: 'Practical',
    tagline: 'Built for actual daily operation',
    description: 'We focus on pragmatic solutions that your HR team and employees can actually operate without excessive overhead or complex training.',
  },
  {
    icon: GitPullRequest,
    title: 'Process First',
    tagline: 'Software serves the process, not vice versa',
    description: 'Technology follows process — never the other way around. We optimize workflows before selecting or reconfiguring software tools.',
  },
  {
    icon: Bot,
    title: 'Automation Mindset',
    tagline: 'Eliminating manual administrative fatigue',
    description: 'We proactively identify repetitive work across your employee lifecycle that can be eliminated, simplified, or completely automated.',
  },
  {
    icon: TrendingUp,
    title: 'Built for Scale',
    tagline: 'Architected for your next growth milestone',
    description: 'Our solutions are designed around your organization’s next stage of growth, ensuring systems remain resilient as headcount expands.',
  },
];

export const WhyNKVV: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white text-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-primary/10 text-navy-primary text-xs font-mono font-bold uppercase tracking-wider">
            Our Differentiators
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-deep tracking-tight">
            Why NK Velora Ventures?
          </h2>

          <p className="text-base text-muted leading-relaxed">
            We operate as a practical transformation partner, combining deep HR operations knowledge with modern technology engineering.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-offwhite p-7 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:border-gold/60"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-muted">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-deep group-hover:text-navy-primary transition-colors">
                    {item.title}
                  </h3>

                  <span className="text-xs font-semibold text-gold-muted block">
                    {item.tagline}
                  </span>

                  <p className="text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
