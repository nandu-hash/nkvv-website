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
    title: 'Discover',
    icon: Search,
    summary: 'Deep-dive conversation to understand business goals, workforce structure, and current operational friction.',
    deliverable: 'Initial Scoping & Objectives',
  },
  {
    step: '02',
    title: 'Audit',
    icon: Map,
    summary: 'Comprehensive audit mapping existing processes, software tools, shadow spreadsheets, and operational bottlenecks.',
    deliverable: 'Process & Tech Audit Report',
  },
  {
    step: '03',
    title: 'Architect',
    icon: Compass,
    summary: 'Design of future-state process architecture, revised SOPs, SLA definitions, and HR tech integration maps.',
    deliverable: 'Target Operating Model Blueprint',
  },
  {
    step: '04',
    title: 'Implement',
    icon: Cpu,
    summary: 'Deployment of structured workflows, software reconfiguration, data migration, and custom automation triggers.',
    deliverable: 'Configured HRIS & Workflows',
  },
  {
    step: '05',
    title: 'Enable',
    icon: GraduationCap,
    summary: 'Hands-on team training, role-based responsibility handovers, and documentation to ensure internal ownership.',
    deliverable: 'Team Enablement Training',
  },
  {
    step: '06',
    title: 'Measure',
    icon: LineChart,
    summary: 'Establishment of executive dashboards, KPI tracking rhythms, and ongoing process optimization.',
    deliverable: 'Executive Dashboard Cadence',
  },
];

export const HowWeWork: React.FC = () => {
  return (
    <section className="py-24 bg-navy-dark text-white border-t border-border-subtle/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-border-subtle/10 border border-border-subtle/20 text-gold-bright text-xs font-mono font-bold uppercase tracking-wider">
            Consulting Roadmap
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            How We Work With You
          </h2>

          <p className="text-base text-gray-400 font-light leading-relaxed">
            A disciplined, 6-step consulting process ensuring predictable outcomes, clear deliverables, and smooth internal adoption.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border-subtle/20">
          {ENGAGEMENT_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-navy-primary p-8 border border-border-subtle/10 hover:bg-navy-dark transition-colors duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest">
                      Phase {item.step}
                    </span>
                    <div className="w-10 h-10 border border-border-subtle/20 bg-navy-dark text-gold group-hover:border-gold transition-colors flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white uppercase tracking-widest">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle/20 flex flex-col gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold-bright">
                    Key Deliverable
                  </span>
                  <span className="text-sm text-gray-300 font-light">{item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold-light text-navy-deep font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Start With a Discovery Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};
