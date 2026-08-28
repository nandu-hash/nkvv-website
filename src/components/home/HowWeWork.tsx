import React from 'react';
import Link from 'next/link';
import { Search, Map, Compass, Cpu, GraduationCap, LineChart, PhoneCall, ArrowRight } from 'lucide-react';

interface EngagementStep {
  step: string;
  title: string;
  icon: React.ElementType;
  summary: string;
  deliverable: string;
}

const ENGAGEMENT_STEPS: EngagementStep[] = [
  {
    step: '01',
    title: 'Discovery',
    icon: Search,
    summary: 'Deep-dive conversation to understand business goals, workforce structure, and current operational friction.',
    deliverable: 'Initial Scoping & Transformation Objectives',
  },
  {
    step: '02',
    title: 'Audit',
    icon: Map,
    summary: 'Comprehensive audit mapping existing processes, software tools, shadow spreadsheets, and operational bottlenecks.',
    deliverable: 'Process Bottleneck & Tech Audit Report',
  },
  {
    step: '03',
    title: 'Blueprint',
    icon: Compass,
    summary: 'Design of future-state process architecture, revised SOPs, SLA definitions, and HR tech integration maps.',
    deliverable: 'Target Operating Model Blueprint & SOP Package',
  },
  {
    step: '04',
    title: 'Implement',
    icon: Cpu,
    summary: 'Deployment of structured workflows, software reconfiguration, data migration, and custom automation triggers.',
    deliverable: 'Configured HRIS & Automated Workflows',
  },
  {
    step: '05',
    title: 'Enable',
    icon: GraduationCap,
    summary: 'Hands-on team training, role-based responsibility handovers, and documentation to ensure internal ownership.',
    deliverable: 'Team Enablement & SOP Training Sessions',
  },
  {
    step: '06',
    title: 'Measure',
    icon: LineChart,
    summary: 'Establishment of executive dashboards, KPI tracking rhythms, and ongoing process optimization.',
    deliverable: 'Executive Dashboard & KPI Cadence',
  },
];

export const HowWeWork: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-navy-deep text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-surface border border-gold/40 text-gold-light text-xs font-mono font-bold uppercase tracking-wider">
            Consulting Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How We Work With You
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            A disciplined, 6-step consulting process ensuring predictable outcomes, clear deliverables, and smooth internal adoption.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENGAGEMENT_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-navy-primary/80 p-7 rounded-2xl border border-navy-light/60 hover:border-gold/60 transition-all duration-300 flex flex-col justify-between group hover:bg-navy-surface/80"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-gold px-2.5 py-1 bg-navy-deep rounded border border-gold/30">
                      STEP {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-navy-deep text-gold group-hover:bg-gold group-hover:text-navy-deep transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-gold-light transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-navy-light/40 text-xs font-mono text-gold-light flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span>Output: {item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-navy-deep font-bold text-base transition-all shadow-xl shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Start With a Discovery Conversation</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
