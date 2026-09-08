import React from 'react';
import Link from 'next/link';
import { Search, Map, Compass, Cpu, GraduationCap, LineChart, ArrowRight } from 'lucide-react';

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
    summary: 'Deep-dive conversation to understand business goals, workforce structure, and current friction.',
    deliverable: 'Initial Scoping & Objectives',
  },
  {
    step: '02',
    title: 'Audit',
    icon: Map,
    summary: 'Comprehensive audit mapping existing processes, software tools, spreadsheets, and bottlenecks.',
    deliverable: 'Process & Tech Audit Report',
  },
  {
    step: '03',
    title: 'Architect',
    icon: Compass,
    summary: 'Design of future-state process architecture, revised SOPs, SLA definitions, and tool integration maps.',
    deliverable: 'Target Operating Model Blueprint',
  },
  {
    step: '04',
    title: 'Implement',
    icon: Cpu,
    summary: 'Deployment of structured workflows, software configuration, data migration, and automated triggers.',
    deliverable: 'Configured HRIS & Workflows',
  },
  {
    step: '05',
    title: 'Enable',
    icon: GraduationCap,
    summary: 'Hands-on team training, role-based responsibility handovers, and clear documentation.',
    deliverable: 'Team Enablement Training',
  },
  {
    step: '06',
    title: 'Measure',
    icon: LineChart,
    summary: 'Establishment of executive dashboards, KPI tracking rhythms, and ongoing optimization.',
    deliverable: 'Executive Dashboard Cadence',
  },
];

export const HowWeWork: React.FC = () => {
  return (
    <section className="py-24 bg-white text-navy-deep border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="border-b border-border-subtle pb-8 mb-16 max-w-3xl">
          <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold">
            Consulting Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-navy-deep tracking-tight mt-3">
            How We Work With You
          </h2>
          <p className="text-sm text-gray-500 font-light mt-3 leading-relaxed">
            A disciplined, 6-step advisory framework ensuring predictable timelines, clear deliverables, and seamless organizational adoption.
          </p>
        </div>

        {/* 6 Steps in 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border-subtle divide-y md:divide-y-0 divide-border-subtle">
          {ENGAGEMENT_STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-8 bg-white border-b lg:border-b-0 border-border-subtle flex flex-col justify-between group hover:bg-gray-50/50 transition-colors duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-gold uppercase tracking-widest">
                      PHASE {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-gold transition-colors" />
                  </div>

                  <h3 className="text-xl font-serif font-medium text-navy-deep">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex flex-col gap-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400 font-semibold">
                    Key Deliverable
                  </span>
                  <span className="text-xs font-mono text-navy-deep">{item.deliverable}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-navy-deep hover:bg-gold text-white hover:text-navy-deep font-semibold text-xs uppercase tracking-[0.2em] transition-colors duration-300"
          >
            <span>Initiate Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
