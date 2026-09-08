import React from 'react';

interface Differentiator {
  title: string;
  tagline: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Process First',
    tagline: 'Technology follows operational clarity',
    description: 'We never automate broken workflows. We optimize and document underlying operating processes before configuring software tools.',
  },
  {
    title: 'Practical Grounding',
    tagline: 'Systems designed around real operations',
    description: 'Systems are designed around real day-to-day operations that your teams can actually run without administrative friction.',
  },
  {
    title: 'Automation Mindset',
    tagline: 'Eliminating repetitive manual fatigue',
    description: 'Repetitive work is identified, simplified and automated where appropriate, freeing internal teams for strategic focus.',
  },
  {
    title: 'Built for Scale',
    tagline: "Designed for your organization's next stage",
    description: "Processes and data architectures are designed around the organization's next stage of growth, remaining resilient as headcount expands.",
  },
];

export const WhyNKVV: React.FC = () => {
  return (
    <section className="py-24 bg-white text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-2">
            Guiding Principles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-navy-deep tracking-tight">
            Why NKVV
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              Process Clarity Before Technology
            </span>
          </h2>
          <div className="w-12 h-0.5 bg-gold rounded-full my-3" />
          <p className="text-sm text-gray-500 font-light mt-2 leading-relaxed">
            Strategy alone isn&apos;t enough. Software alone doesn&apos;t fix disorganization. We build the operating bridge.
          </p>
        </div>

        {/* 4 Differentiators in Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border-subtle divide-y md:divide-y-0 md:divide-x divide-border-subtle">
          {DIFFERENTIATORS.map((item, idx) => (
            <div
              key={item.title}
              className="p-8 bg-white flex flex-col justify-between hover:bg-gray-50/50 transition-colors duration-200"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-mono text-gold uppercase tracking-widest font-bold">
                  0{idx + 1}
                </span>

                <h3 className="text-xl font-serif font-medium text-navy-deep">
                  {item.title}
                </h3>

                <span className="text-xs font-serif italic text-gray-400 block">
                  {item.tagline}
                </span>

                <p className="text-xs text-gray-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
