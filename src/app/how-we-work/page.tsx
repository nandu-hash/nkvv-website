import React from 'react';
import Link from 'next/link';
import { Search, Map, Compass, Cpu, GraduationCap, LineChart, PhoneCall, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'How We Work | NK Velora Ventures',
  description: 'Our 6-step consulting engagement process: Discovery, Audit, Blueprint, Implement, Enable, Measure.',
};

const DETAILED_STEPS = [
  {
    step: 'Step 1',
    title: 'Discovery',
    icon: Search,
    objective: 'Understand the business, workforce structure, and core operational challenges.',
    activities: [
      'Foundational interviews with leadership & HR team',
      'Review of current headcount, org structure, and growth projections',
      'Identification of immediate operational pain points and priorities',
    ],
    deliverables: ['Discovery Brief', 'Project Roadmap & Scope Agreement'],
  },
  {
    step: 'Step 2',
    title: 'Audit',
    icon: Map,
    objective: 'Map current processes, systems, responsibilities, and operational bottlenecks.',
    activities: [
      'End-to-end mapping of candidate, employee, and exit journeys',
      'Software & shadow spreadsheet inventory audit',
      'Compliance and statutory vulnerability check',
    ],
    deliverables: ['HR Operations Audit Report', 'Process Bottleneck Matrix'],
  },
  {
    step: 'Step 3',
    title: 'Blueprint',
    icon: Compass,
    objective: 'Design the future-state process, SOP documentation, and technology architecture.',
    activities: [
      'Redesign of optimized employee lifecycle workflows',
      'Authoring of customized Standard Operating Procedures (SOPs)',
      'Definition of HR SLAs, approval hierarchies, and role permissions',
    ],
    deliverables: ['Target Operating Blueprint', 'Custom SOP Package'],
  },
  {
    step: 'Step 4',
    title: 'Implement',
    icon: Cpu,
    objective: 'Deploy processes, documentation, systems, and custom automation.',
    activities: [
      'HRIS module reconfiguration and data cleanup/migration',
      'Build automated email/WhatsApp notification triggers',
      'Integration setup connecting HR tools with payroll and Slack',
    ],
    deliverables: ['Configured Tech Stack', 'Live Automated Triggers'],
  },
  {
    step: 'Step 5',
    title: 'Enable',
    icon: GraduationCap,
    objective: 'Train internal teams and establish clear operating ownership.',
    activities: [
      'Interactive walkthroughs for HR team and managers',
      'User guides and video SOP documentation handoff',
      'Post-launch hypercare support period',
    ],
    deliverables: ['Enablement Workshops', 'User SOP Knowledgebase'],
  },
  {
    step: 'Step 6',
    title: 'Measure',
    icon: LineChart,
    objective: 'Track KPIs, establish executive dashboards, and continuously improve.',
    activities: [
      'Deployment of executive HR reporting dashboards',
      'Review of process SLAs and error rate reductions',
      'Quarterly operational health check-ins',
    ],
    deliverables: ['Executive HR Dashboard', 'Continuous Improvement Cadence'],
  },
];

export default function HowWeWorkPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-16 md:py-20 border-b border-navy-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            Consulting Delivery Lifecycle
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Our Structured Engagement Process
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            From initial diagnosis to long-term enablement, our methodology ensures seamless execution, clear accountability, and zero operational downtime.
          </p>
        </div>
      </section>

      {/* 6 Steps Detailed Breakdown */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {DETAILED_STEPS.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white rounded-2xl p-8 sm:p-10 border border-border-subtle shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-gold/50 transition-all"
              >
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-navy-deep text-gold flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-gold-muted uppercase block">
                        {st.step}
                      </span>
                      <h2 className="text-2xl font-bold text-navy-deep">
                        {st.title}
                      </h2>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    {st.objective}
                  </p>
                </div>

                <div className="lg:col-span-8 bg-offwhite p-6 rounded-xl border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase font-bold text-navy-primary tracking-wider mb-3">
                      Key Activities:
                    </h3>
                    <div className="space-y-2 text-xs text-gray-700">
                      {st.activities.map((act) => (
                        <div key={act} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-2">
                    <h3 className="text-xs font-mono uppercase font-bold text-emerald-800 tracking-wider mb-2">
                      Key Deliverables:
                    </h3>
                    {st.deliverables.map((deliv) => (
                      <div key={deliv} className="flex items-center gap-2 text-xs font-semibold text-navy-deep">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-navy-deep p-8 sm:p-12 rounded-2xl text-white text-center space-y-6 border border-navy-surface shadow-2xl">
          <h2 className="text-3xl font-extrabold text-white">
            Ready to structure your people operations?
          </h2>
          <p className="text-base text-gray-300 max-w-xl mx-auto">
            Take the first step with an initial discovery conversation. We&apos;ll assess your current bottlenecks and propose a structured project scope.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold hover:bg-gold-light text-navy-deep font-bold text-base transition-all shadow-lg"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Start With a Discovery Conversation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
