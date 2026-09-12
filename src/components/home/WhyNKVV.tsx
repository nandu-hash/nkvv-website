import React from 'react';
import { BorderGlow } from '@/components/ui/BorderGlow';
import { Compass, Hammer, Cpu, Scaling } from 'lucide-react';

interface Differentiator {
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Process First',
    tagline: 'Technology follows operational clarity',
    description: 'We never automate broken workflows. We optimize and document underlying operating processes before configuring software tools.',
    icon: Compass,
  },
  {
    title: 'Practical Grounding',
    tagline: 'Systems designed around real operations',
    description: 'Systems are designed around real day-to-day operations that your teams can actually run without administrative friction.',
    icon: Hammer,
  },
  {
    title: 'Automation Mindset',
    tagline: 'Eliminating repetitive manual fatigue',
    description: 'Repetitive work is identified, simplified and automated where appropriate, freeing internal teams for strategic focus.',
    icon: Cpu,
  },
  {
    title: 'Built for Scale',
    tagline: "Designed for your organization's next stage",
    description: "Processes and data architectures are designed around the organization's next stage of growth, remaining resilient as headcount expands.",
    icon: Scaling,
  },
];

export const WhyNKVV: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-white text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header - Tight & Aligned */}
        <div className="border-b border-border-subtle pb-4 mb-6 md:mb-8 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-1">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-navy-deep tracking-tight">
            Why NKVV
            <span className="block italic font-serif font-normal text-gold text-xl sm:text-2xl lg:text-3xl mt-0.5">
              Process Clarity Before Technology
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-light mt-2 leading-relaxed">
            Strategy alone isn&apos;t enough. Software alone doesn&apos;t fix disorganization. We engineer the operational bridge.
          </p>
        </div>

        {/* 4 Differentiators in Minimalist, Aligned Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {DIFFERENTIATORS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <BorderGlow
                key={item.title}
                backgroundColor="#ffffff"
                borderRadius={18}
                glowRadius={28}
                className="h-full shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gold uppercase tracking-widest font-bold bg-gold/10 px-2.5 py-0.5 rounded-full">
                        0{idx + 1}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-navy-deep border border-gray-100">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-navy-deep">
                      {item.title}
                    </h3>

                    <span className="text-xs font-serif italic text-gold block">
                      {item.tagline}
                    </span>

                    <p className="text-xs text-gray-600 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyNKVV;
