import React from 'react';
import Link from 'next/link';
import { Users, GitBranch, Cpu, ArrowRight, Shield, Layers, UserCheck } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';

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
      <section className="bg-navy-deep text-white py-20 md:py-28 border-b border-navy-surface relative overflow-hidden bg-grid-architectural-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-4 text-center max-w-4xl">
          <span className="text-xs font-mono font-bold text-gold uppercase tracking-[0.25em] bg-navy-primary px-4 py-1.5 border border-gold/30 rounded-full inline-block">
            About NK Velora Ventures
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white leading-[1.1]">
            A Practical Transformation Partner
            <span className="block italic font-serif font-normal text-gold text-3xl sm:text-4xl lg:text-5xl mt-2">
              For Scaling Enterprises
            </span>
          </h1>
          <div className="w-14 h-0.5 bg-gold mx-auto my-4 rounded-full" />
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            We exist to help ambitious organizations build disciplined operational foundations — transforming fragmented processes into structured, automated systems.
          </p>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BorderGlow
            backgroundColor="#ffffff"
            borderRadius={20}
            glowRadius={35}
            className="shadow-md"
          >
            <div className="p-8 sm:p-12 space-y-8">
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
                
                <div className="p-4 bg-offwhite border-l-2 border-gold text-sm font-serif text-navy-deep italic">
                  &ldquo;I started NKVV around a simple observation: growing businesses don&apos;t usually have an HR problem first. They have an operating-system problem.&rdquo;
                </div>
              </div>

              {/* 3 Pillars Visual */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <BorderGlow
                  backgroundColor="#ffffff"
                  borderRadius={14}
                  glowRadius={25}
                  className="h-full shadow-sm"
                >
                  <div className="p-6 space-y-3 h-full">
                    <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-deep">1. People</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Structuring clear roles, responsibilities, SLA expectations, and employee lifecycle touchpoints.
                    </p>
                  </div>
                </BorderGlow>

                <BorderGlow
                  backgroundColor="#ffffff"
                  borderRadius={14}
                  glowRadius={25}
                  className="h-full shadow-sm"
                >
                  <div className="p-6 space-y-3 h-full">
                    <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-deep">2. Process</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Eliminating manual drag by authoring documented SOPs, approval matrices, and standardized workflows.
                    </p>
                  </div>
                </BorderGlow>

                <BorderGlow
                  backgroundColor="#ffffff"
                  borderRadius={14}
                  glowRadius={25}
                  className="h-full shadow-sm"
                >
                  <div className="p-6 space-y-3 h-full">
                    <div className="w-10 h-10 rounded-lg bg-navy-deep text-gold flex items-center justify-center font-bold">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-deep">3. Technology</h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Implementing, configuring, and connecting HRIS and automation tools so data flows seamlessly.
                    </p>
                  </div>
                </BorderGlow>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BorderGlow
            backgroundColor="#0A2240"
            borderRadius={20}
            glowRadius={36}
            className="shadow-2xl"
          >
            <div className="p-8 sm:p-12 text-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-navy-primary border-2 border-gold flex items-center justify-center text-gold shadow-md">
                  <UserCheck className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                    Nandu Kumar
                  </h3>
                  <span className="text-xs font-mono font-semibold uppercase tracking-widest text-gold block mt-1">
                    Founder &amp; Principal Consultant
                  </span>
                  <span className="text-xs text-gray-400 block mt-0.5">
                    NK Velora Ventures
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5 border-t lg:border-t-0 lg:border-l border-navy-surface pt-6 lg:pt-0 lg:pl-8">
                <div className="inline-block px-3 py-1 rounded bg-navy-primary border border-gold/30 text-gold-light text-xs font-mono font-bold uppercase tracking-wider">
                  Founder Leadership
                </div>
                
                <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed font-light">
                  <p>
                    I work at the intersection of HR operations, business processes, technology and automation.
                  </p>
                  <p>
                    As the Founder &amp; Principal Consultant at NK Velora Ventures (NKVV), I am building a business focused on helping growing organizations transform fragmented HR operations into structured, technology-enabled systems.
                  </p>
                  <p>
                    My focus is on HR Operations Transformation, HR Technology &amp; HRIS, Process Design, Workflow Automation, and compliance-focused HR process diagnosis.
                  </p>
                  
                  {/* Method Framework Highlight */}
                  <div className="py-3 px-4 bg-navy-primary/90 border border-gold/30 rounded-lg space-y-1.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-widest text-gold block">
                      Practical Framework
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-white">
                      <span>Diagnose</span>
                      <span className="text-gold">→</span>
                      <span>Design</span>
                      <span className="text-gold">→</span>
                      <span>Enable</span>
                      <span className="text-gold">→</span>
                      <span>Automate</span>
                      <span className="text-gold">→</span>
                      <span>Scale</span>
                    </div>
                  </div>

                  <p>
                    The objective is simple: help businesses move from manual and fragmented HR processes to structured, connected and scalable operating systems.
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm pt-1 border-t border-navy-surface/80">
                    I am also developing <strong className="text-gold font-semibold">VELORA</strong> as NKVV&apos;s product direction for HR operations and compliance diagnosis.
                  </p>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-light pt-2">
                  NKVV is a founder-led consulting practice built on direct engagement, technical rigor, and practical business execution for startups and growing enterprises across India.
                </p>
              </div>

            </div>
          </BorderGlow>
        </div>
      </section>

      {/* Future Architecture Roadmap */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BorderGlow
            backgroundColor="#ffffff"
            borderRadius={20}
            glowRadius={35}
            className="shadow-md"
          >
            <div className="p-8 sm:p-12 space-y-8">
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
                  <BorderGlow
                    key={div.title}
                    backgroundColor="#ffffff"
                    borderRadius={14}
                    glowRadius={25}
                    className="h-full shadow-sm"
                  >
                    <div
                      className="p-6 flex flex-col justify-between space-y-4 h-full"
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
                  </BorderGlow>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BorderGlow
          backgroundColor="#0A2240"
          borderRadius={20}
          glowRadius={36}
          className="shadow-2xl"
        >
          <div className="p-8 text-white text-center space-y-4">
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
        </BorderGlow>
      </section>
    </main>
  );
}
