'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { 
  ShieldCheck, 
  FileText, 
  Calculator, 
  Clock, 
  Users, 
  Bell, 
  Zap, 
  BarChart3,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { BorderGlow } from '@/components/ui/BorderGlow';
import { CenterFlow, NodeItem } from '@/components/ui/CenterFlow';
import { WebThreads } from '@/components/ui/WebThreads';

// 8 Surrounding Compliance Modules for CenterFlow
const COMPLIANCE_NODES: { title: string; subtitle: string; icon: React.ElementType }[] = [
  { title: 'Statutory Filings', subtitle: 'PF, ESI, PT, LWF Returns', icon: FileText },
  { title: 'Payroll Reconcile', subtitle: 'Zero-Discrepancy Cutoffs', icon: Calculator },
  { title: 'Attendance Sync', subtitle: 'Biometric & Shift Logs', icon: Clock },
  { title: 'Contractor Audit', subtitle: 'Vendor Compliance Governance', icon: Users },
  { title: 'Statutory Registers', subtitle: 'Inspection-Ready Records', icon: ShieldCheck },
  { title: 'Deadline Alerts', subtitle: 'Automated Penalty Prevention', icon: Bell },
  { title: 'Workflow Bots', subtitle: 'Touchless Multi-System Triggers', icon: Zap },
  { title: 'Executive Dash', subtitle: 'Real-time Risk Metrics', icon: BarChart3 },
];

export const VeloraComplianceSection: React.FC = () => {
  // Construct NodeItems with custom styled icons for CenterFlow
  const centerFlowNodes: NodeItem[] = COMPLIANCE_NODES.map((node) => {
    const Icon = node.icon;
    return {
      label: node.title,
      content: (
        <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center group">
          <Icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
          <span className="text-[8px] sm:text-[9px] font-mono font-medium text-gray-200 mt-1 leading-none line-clamp-1">
            {node.title}
          </span>
        </div>
      ),
    };
  });

  return (
    <section id="velora-compliance" className="py-12 md:py-16 bg-navy-dark text-white border-b border-navy-primary relative overflow-hidden">
      {/* Interactive WebThreads WebGL Canvas in Background */}
      <div className="absolute inset-0 pointer-events-auto opacity-20 z-0 overflow-hidden">
        <WebThreads />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header - Tight, Aligned */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-navy-primary/80 pb-4 mb-6 md:mb-8 gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-navy-primary/70 text-gold text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span>{SITE_CONFIG.product.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              VELORA Compliance
              <span className="block italic font-serif font-normal text-gold text-xl sm:text-2xl lg:text-3xl mt-0.5">
                Centralized HR &amp; Labour Compliance Architecture
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-2xl">
              {SITE_CONFIG.product.description}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold text-navy-deep font-semibold text-xs uppercase tracking-wider hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 w-fit shrink-0 cursor-pointer"
          >
            <span>Request Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5 text-navy-deep" />
          </Link>
        </div>

        {/* ========================================================= */}
        {/* CENTER FLOW INTERACTIVE ARCHITECTURE SYSTEM */}
        {/* Shows VELORA as the central core hub connected to all modules */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Main Column (7 cols): CenterFlow Radial Visualization */}
          <div className="lg:col-span-7 bg-navy-deep/80 rounded-3xl border border-gold/30 p-2 sm:p-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Top Indicator */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-2 bg-navy-dark/90 px-3 py-1 rounded-full border border-gold/30 text-[10px] font-mono text-gold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Compliance Engine Flow</span>
            </div>

            {/* The CenterFlow Component */}
            <CenterFlow
              nodeItems={centerFlowNodes}
              centerSize={130}
              nodeSize={68}
              pulseDuration={4}
              pulseInterval={5}
              pulseLength={0.35}
              pulseWidth={2}
              lineWidth={1.5}
              lineColor="rgba(212, 175, 55, 0.2)"
              pulseColor="#E5C07B"
              glowColor="#D4AF37"
              maxGlowIntensity={30}
              nodeDistance={0.74}
              className="w-full h-[400px] sm:h-[460px] md:h-[500px]"
              centerContent={
                <div className="flex flex-col items-center justify-center text-center space-y-1 select-none">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50">
                    <ShieldCheck className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-[11px] font-mono font-bold tracking-widest text-gold uppercase">
                    VELORA
                  </span>
                  <span className="text-[8px] font-mono text-gray-300 uppercase tracking-tight">
                    Operating Core
                  </span>
                </div>
              }
            />

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-4 right-4 z-30 flex items-center justify-between text-[10px] font-mono text-gray-400 border-t border-navy-primary/60 pt-2">
              <span>8 Synchronized Compliance Nodes</span>
              <span className="text-gold font-semibold">Zero-Friction Audit Flow</span>
            </div>
          </div>

          {/* Right Column (5 cols): What Velora Solves & Guarantees */}
          <div className="lg:col-span-5 space-y-4">
            
            <BorderGlow
              backgroundColor="#0A2240"
              borderRadius={18}
              glowRadius={25}
              className="h-full"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gold font-bold">
                  <span>How Velora Operates</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Technology Backed by Human Process Architecture
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  Software tools alone fail when inputs are disorganized. VELORA maps your company&apos;s unique operational rhythm, sets cutoffs, and synchronizes statutory filing with zero manual fatigue.
                </p>

                {/* Bullet Proof Points */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span><strong>Continuous Statutory Vigilance:</strong> PF, ESI, Gratuity, Bonus &amp; State Labour Law compliance monitored in real time.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span><strong>Pre-Payroll Validation:</strong> Discrepancies flagged 72 hours before salary processing to prevent post-facto corrections.</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span><strong>Inspection Readiness:</strong> All registers and challans digitally archived and immediately retrievable for statutory visits.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/solutions/velora"
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold hover:text-white transition-colors"
                  >
                    <span>View Complete Product Scope</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

export default VeloraComplianceSection;
