'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Target, 
  Workflow, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BorderGlow } from '@/components/ui/BorderGlow';

interface FlowStage {
  step: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  metric: string;
  icon: React.ElementType;
}

const FLOW_STAGES: FlowStage[] = [
  {
    step: '01',
    badge: 'STAGE 01',
    title: 'DIAGNOSE',
    tagline: 'Operational & Statutory Audit',
    description:
      'We map every undocumented workflow, shadow spreadsheet, and statutory liability before recommending or configuring software.',
    deliverables: [
      'Comprehensive Workflow Bottleneck Map',
      'Statutory & HR Compliance Risk Register',
      'Toolstack Utilization & Redundancy Audit',
    ],
    metric: '100% Operational Visibility',
    icon: Search,
  },
  {
    step: '02',
    badge: 'STAGE 02',
    title: 'DESIGN',
    tagline: 'Process Architecture & Policy Matrix',
    description:
      'We engineer standardized operating procedures (SOPs), decision matrices, and clean approval hierarchies for zero ambiguity.',
    deliverables: [
      'Standard Operating Procedures (SOPs)',
      'RACI Role & Decision Matrix',
      'Single-Source Data Governance Blueprint',
    ],
    metric: 'Zero Administrative Ambiguity',
    icon: Target,
  },
  {
    step: '03',
    badge: 'STAGE 03',
    title: 'ENABLE',
    tagline: 'People, Roles & Systems Integration',
    description:
      'We configure tools around your validated processes and train your internal teams to execute with friction-free discipline.',
    deliverables: [
      'Configured Operating Systems & HRIS',
      'Team Playbooks & Onboarding Training',
      'Cutoff Cadences & Checkpoint Schedules',
    ],
    metric: 'Immediate Adoption by Teams',
    icon: Workflow,
  },
  {
    step: '04',
    badge: 'STAGE 04',
    title: 'AUTOMATE',
    tagline: 'Eliminate Repetitive Fatigue',
    description:
      'We deploy intelligent workflow triggers, automated reconciliation, and notification bots so repetitive manual tasks run automatically.',
    deliverables: [
      'Automated Payroll & Reconciliation Bots',
      'Deadline Escalation & Exception Triggers',
      'Scheduled Multi-System Data Synchronization',
    ],
    metric: 'Up to 70% Manual Time Saved',
    icon: Cpu,
  },
  {
    step: '05',
    badge: 'STAGE 05',
    title: 'SCALE',
    tagline: 'Enterprise Resilience & Visibility',
    description:
      'Real-time executive health dashboards and regulatory audit trails ensure your operating engine remains resilient as headcount expands.',
    deliverables: [
      'Live Executive Operating Dashboards',
      'Continuous Compliance Inspection Readiness',
      'Quarterly Process Refinement Audits',
    ],
    metric: '10x Headcount Scalability',
    icon: Rocket,
  },
];

export const NkvvFlowSection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const activeData = FLOW_STAGES[activeStage];
  const ActiveIcon = activeData.icon;

  return (
    <section className="py-12 md:py-16 bg-white text-navy-deep border-b border-border-subtle relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025] select-none text-[200px] lg:text-[260px] font-serif font-black text-navy-deep leading-none whitespace-nowrap"
      >
        NKVV FLOW
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Compact Header with Aligned Pipeline Tracker */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border-subtle pb-4 mb-6 md:mb-8 gap-3">
          <div>
            <span className="text-[10px] font-mono tracking-[0.25em] text-gold uppercase font-bold block mb-1">
              End-to-End Delivery Model
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight text-navy-deep uppercase">
              The NKVV Flow
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-medium text-gray-500 uppercase tracking-widest bg-gray-50 px-3.5 py-1.5 rounded-full border border-gray-200">
            {FLOW_STAGES.map((s, idx) => (
              <React.Fragment key={s.step}>
                <button
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`transition-colors cursor-pointer hover:text-navy-deep ${
                    activeStage === idx ? 'text-gold font-bold underline decoration-gold underline-offset-4' : ''
                  }`}
                >
                  {s.title}
                </button>
                {idx < FLOW_STAGES.length - 1 && <span className="text-gold/60">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TECHIE PROCESS FLOW DIAGRAM PIPELINE (Reference Image 3 style) */}
        {/* ========================================================= */}
        <div className="relative mb-8">
          
          {/* Animated Connecting Beam Line behind cards on desktop */}
          <div className="hidden md:block absolute top-[52px] left-[8%] right-[8%] h-[2px] bg-gray-200 z-0 overflow-hidden">
            <motion.div
              className="h-full w-28 bg-gradient-to-r from-transparent via-gold to-transparent"
              animate={{
                x: ['-100%', '1000%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: 'linear',
              }}
            />
          </div>

          {/* 5 Process Step Badges in Horizontal Alignment */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 relative z-10">
            {FLOW_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = activeStage === idx;

              return (
                <button
                  key={stage.step}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`text-left rounded-2xl p-4 sm:p-5 transition-all duration-300 relative group cursor-pointer border flex flex-col items-center text-center ${
                    isActive
                      ? 'bg-navy-deep text-white border-gold/60 shadow-xl shadow-navy-deep/20 scale-[1.03] ring-2 ring-gold/40'
                      : 'bg-white hover:bg-gray-50 text-navy-deep border-gray-200 shadow-xs hover:border-gold/40'
                  }`}
                >
                  {/* Step Pill */}
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-3 px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-gold text-navy-deep'
                        : 'bg-gray-100 text-gray-500 group-hover:text-gold group-hover:bg-gold/10'
                    }`}
                  >
                    STEP {stage.step}
                  </span>

                  {/* Illustrated Tech Icon Badge (Ref: Image 3) */}
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 relative mb-3 ${
                      isActive
                        ? 'bg-gold/15 text-gold border border-gold/50 shadow-inner'
                        : 'bg-gray-50 text-navy-deep border border-gray-200 group-hover:border-gold group-hover:text-gold group-hover:scale-110'
                    }`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-ping" />
                    )}
                  </div>

                  {/* Title & Concise Subtitle */}
                  <h3
                    className={`text-sm sm:text-base font-serif font-bold uppercase tracking-wider ${
                      isActive ? 'text-white' : 'text-navy-deep group-hover:text-gold'
                    }`}
                  >
                    {stage.title}
                  </h3>
                  <p
                    className={`text-[11px] sm:text-xs font-light mt-1 line-clamp-2 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {stage.tagline}
                  </p>

                  {/* Directional Indicator */}
                  {idx < FLOW_STAGES.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-[52px] -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-gray-300 items-center justify-center z-20 shadow-xs text-gold">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* INTERACTIVE STAGE DETAILS: Selling the Product with Proof */}
        {/* ========================================================= */}
        <BorderGlow
          backgroundColor="#F8FAFC"
          borderRadius={20}
          glowRadius={35}
          className="shadow-md"
        >
          <div className="p-5 sm:p-7 md:p-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                {/* Left Column: Stage Core Narrative */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-gold bg-navy-deep px-3 py-1 rounded-full">
                      {activeData.badge} of 05
                    </span>
                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      {activeData.metric}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-navy-deep">
                      {activeData.title} &mdash; {activeData.tagline}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-light mt-2 leading-relaxed">
                      {activeData.description}
                    </p>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-navy-deep font-bold block mb-2">
                      Key Deliverables &amp; Outcomes:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeData.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-white p-2.5 rounded-lg border border-gray-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: High-Impact Visual Card */}
                <div className="lg:col-span-5 bg-navy-deep rounded-2xl p-6 text-white space-y-4 shadow-lg border border-gold/30 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <ActiveIcon className="w-28 h-28 text-gold" />
                  </div>

                  <div className="flex items-center gap-2 text-gold text-xs font-mono uppercase font-bold tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>NKVV Enterprise Guarantee</span>
                  </div>

                  <div className="space-y-1 relative z-10">
                    <div className="text-2xl font-serif font-bold text-gold">
                      {activeData.metric}
                    </div>
                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      Every process we implement is structured to be audit-ready, documented, and resilient without depending on individual memory.
                    </p>
                  </div>

                  {/* Stage Switcher Buttons */}
                  <div className="pt-3 border-t border-navy-surface flex items-center justify-between text-xs font-mono">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStage((prev) =>
                          prev > 0 ? prev - 1 : FLOW_STAGES.length - 1
                        )
                      }
                      className="text-gray-400 hover:text-gold transition-colors py-1 cursor-pointer"
                    >
                      &larr; Prev Stage
                    </button>
                    <span className="text-gray-500">
                      {activeStage + 1} of 5
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveStage((prev) =>
                          prev < FLOW_STAGES.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="text-gold hover:text-white font-semibold flex items-center gap-1 transition-colors py-1 cursor-pointer"
                    >
                      <span>Next Stage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </BorderGlow>

        {/* Bottom Core Philosophy Banner - Tight & Aligned */}
        <div className="mt-8 pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-gray-500">
          <div>
            <span className="text-gold font-bold">CORE PHILOSOPHY:</span> Understand before changing. Structure before automation.
          </div>
          <div className="text-navy-deep font-semibold">
            NKVV • Operating Architecture
          </div>
        </div>

      </div>
    </section>
  );
};

export default NkvvFlowSection;
