'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { GoldenSpiral } from '@/components/ui/GoldenSpiral';
import { ShieldCheck, FileCheck, Layers, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';
import { WebThreads } from '@/components/ui/WebThreads';

export const VeloraComplianceSection: React.FC = () => {
  return (
    <section id="velora-compliance" className="py-24 bg-navy-dark text-white border-b border-navy-primary relative overflow-hidden">
      {/* Interactive WebThreads WebGL Canvas in Background */}
      <div className="absolute inset-0 pointer-events-auto opacity-25 z-0 overflow-hidden">
        <WebThreads />
      </div>

      {/* Subtle Background Golden Spiral Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[60vw] max-w-[800px] pointer-events-none opacity-[0.05] mix-blend-screen">
        <GoldenSpiral variant="subtle" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header: Golden Ratio Hierarchy */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-navy-primary/70 text-gold text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>{SITE_CONFIG.product.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
            VELORA Compliance
            <span className="block italic font-serif font-normal text-gold text-2xl sm:text-3xl lg:text-4xl mt-1">
              HR &amp; Labour Compliance Process Management
            </span>
          </h2>

          <div className="w-14 h-0.5 bg-gold rounded-full my-3" />

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {SITE_CONFIG.product.description}
          </p>
        </div>

        {/* 61.8% / 38.2% Golden Ratio Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column (61.8% / 7 cols): Diagnostic Framework & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <BorderGlow
                backgroundColor="#0A2240"
                borderRadius={14}
                glowRadius={25}
                className="h-full"
              >
                <div className="p-6 space-y-3 h-full group">
                  <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">
                    Compliance Assessment
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Systematic operational audit of employment agreements, statutory registrations, wage structures, and state labour rules.
                  </p>
                </div>
              </BorderGlow>

              <BorderGlow
                backgroundColor="#0A2240"
                borderRadius={14}
                glowRadius={25}
                className="h-full"
              >
                <div className="p-6 space-y-3 h-full group">
                  <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">
                    Process Diagnosis
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Inspect manual touchpoints, payroll cutoff gaps, and attendance records where non-compliance silently manifests.
                  </p>
                </div>
              </BorderGlow>

              <BorderGlow
                backgroundColor="#0A2240"
                borderRadius={14}
                glowRadius={25}
                className="h-full"
              >
                <div className="p-6 space-y-3 h-full group">
                  <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">
                    Workflow Structuring
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Establish documented Standard Operating Procedures (SOPs), registers, and policy frameworks so compliance is repeatable.
                  </p>
                </div>
              </BorderGlow>

              <BorderGlow
                backgroundColor="#0A2240"
                borderRadius={14}
                glowRadius={25}
                className="h-full"
              >
                <div className="p-6 space-y-3 h-full group">
                  <div className="w-9 h-9 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center text-gold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white">
                    Governance &amp; Controls
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    Introduce automated reminders for filings, threshold changes, and periodic internal review controls.
                  </p>
                </div>
              </BorderGlow>

            </div>

            {/* Responsible Positioning Disclaimer Banner */}
            <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-400 flex items-start gap-2.5">
              <span className="text-gold font-bold">NOTE:</span>
              <span>
                VELORA Compliance is an operational diagnostic and process management platform. We provide structured workflows, gap assessments, and operational controls to support compliance governance without substituting formal legal counsel.
              </span>
            </div>
          </div>

          {/* Right Column (38.2% / 5 cols): Transformation Pathway Card wrapped in BorderGlow */}
          <div className="lg:col-span-5">
            <BorderGlow
              backgroundColor="#071A33"
              borderRadius={20}
              glowRadius={36}
              animated={true}
              className="h-full shadow-2xl"
            >
              <div className="p-8 flex flex-col justify-between space-y-6 h-full">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold block">
                    The Pathway to Compliance Automation
                  </span>

                  <h3 className="text-2xl font-serif font-normal text-white">
                    From Reactive Audits to Structured Oversight
                  </h3>

                  <div className="space-y-3 pt-2">
                    {[
                      'Identify statutory exposures across contracts and payroll',
                      'Standardize employee registers and state-specific records',
                      'Configure pre-payroll statutory verification checklists',
                      'Build escalation triggers for license renewals and returns',
                    ].map((point) => (
                      <div key={point} className="flex items-start gap-3 text-xs text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="font-light leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <Link
                    href="/velora/dashboard"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gold hover:bg-gold-bright text-navy-deep font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md group"
                  >
                    <span>Launch Diagnostic Platform</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/velora/login"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-gold font-mono text-[11px] uppercase tracking-wider transition-all"
                  >
                    <span>Explore Investor Demo Mode</span>
                  </Link>
                </div>
              </div>
            </BorderGlow>
          </div>

        </div>

      </div>
    </section>
  );
};
