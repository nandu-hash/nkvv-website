import React from 'react';
import Link from 'next/link';
import { Users, GitBranch, Cpu, ArrowRight, Shield, Layers, UserCheck } from 'lucide-react';

export const metadata = {
  title: 'About Us | NK Velora Ventures',
  description: 'A practical transformation partner sitting at the intersection of People + Process + Technology.',
};

const FUTURE_DIVISIONS = [
  {
    title: 'NKVV Consulting',
    description: 'HR operations transformation, process auditing, target operating model design, and strategic advisory.',
    badge: 'Core Division',
  },
  {
    title: 'NKVV Automation',
    description: 'Implementation, custom workflow engineering, API integrations, and multi-channel notification bots.',
    badge: 'Core Division',
  },
  {
    title: 'NKVV Technology',
    description: 'HR technology evaluation, HRIS configuration, data architecture, and software optimization.',
    badge: 'Future Division',
  },
  {
    title: 'NKVV Labs',
    description: 'Internal automation products, specialized tools, and micro-SaaS solutions for common HR bottlenecks.',
    badge: 'Future Division',
  },
];

export default function AboutPage() {
  return (
    <main className="pt-28 pb-20 bg-offwhite min-h-screen">
      {/* Page Header */}
      <section className="bg-navy-deep text-white py-16 md:py-20 border-b border-navy-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center max-w-3xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-wider bg-navy-surface px-3.5 py-1.5 rounded-full border border-gold/30">
            About NK Velora Ventures
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            A Practical Transformation Partner for Growing Businesses
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            We help organizations that have outgrown fragmented HR operations build structured, automated, and scalable people operating systems.
          </p>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border-subtle shadow-md space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold text-navy-primary uppercase tracking-wider">
                Our Core Philosophy
              </span>
              <h2 className="text-3xl font-extrabold text-navy-deep">
                At the Intersection of People + Process + Technology
              </h2>
              <p className="text-gray-700 leading-relaxed">
                NKVV does not simply recommend software. Software alone cannot fix a flawed operating model. We understand the underlying business process, redesign it for clarity and compliance, select or optimize the technology stack, and then build a resilient operating system around it.
              </p>
            </div>

            {/* 3 Pillars Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="p-6 rounded-xl bg-offwhite border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-deep">1. People</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Structuring clear roles, responsibilities, SLA expectations, and employee lifecycle touchpoints.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-offwhite border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                  <GitBranch className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-deep">2. Process</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Eliminating manual drag by authoring documented SOPs, approval matrices, and standardized workflows.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-offwhite border border-gray-200 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-navy-deep">3. Technology</h3>
                <p className="text-xs text-muted leading-relaxed">
                  Implementing, configuring, and connecting HRIS and automation tools so data flows seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-deep rounded-2xl p-8 sm:p-12 text-white border border-navy-surface shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-navy-surface border-2 border-gold flex items-center justify-center text-gold shadow-inner">
                <UserCheck className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Founder & Principal Consultant
                </h3>
                <span className="text-xs font-mono text-gold block mt-1">
                  NK Velora Ventures
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 border-t lg:border-t-0 lg:border-l border-navy-surface pt-6 lg:pt-0 lg:pl-8">
              <div className="inline-block px-3 py-1 rounded bg-navy-surface border border-gold/30 text-gold-light text-xs font-mono font-bold">
                Founder Leadership
              </div>
              
              <div className="p-6 rounded-xl bg-navy-primary/70 border border-navy-light/50 text-gray-300 italic text-sm leading-relaxed">
                [Founder biography to be added]
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                NKVV is a founder-led consulting practice built on direct engagement, technical rigor, and practical business execution for startups and growing enterprises across India.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Future Architecture Roadmap */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border-subtle shadow-md space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-navy-primary uppercase tracking-wider">
                Future Business Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-deep">
                The Evolving NKVV Ecosystem
              </h2>
              <p className="text-sm text-muted">
                Architected to grow beyond consulting into comprehensive HR technology and automation products.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FUTURE_DIVISIONS.map((div) => (
                <div
                  key={div.title}
                  className="p-6 rounded-xl bg-offwhite border border-gray-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-navy-primary/10 text-navy-primary">
                      {div.badge}
                    </span>
                    <h3 className="text-lg font-bold text-navy-deep">
                      {div.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {div.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-navy-primary p-8 rounded-2xl text-white text-center space-y-4 border border-gold/30">
          <h3 className="text-2xl font-bold">
            Ready to partner with NKVV?
          </h3>
          <p className="text-sm text-gray-300 max-w-xl mx-auto">
            Book a discovery call directly with our principal team to explore how we can transform your HR operations.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-light text-navy-deep font-bold text-sm transition-all"
            >
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
