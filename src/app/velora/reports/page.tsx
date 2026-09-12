'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Printer,
  FileText,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  Briefcase,
  Layers,
  Info,
} from 'lucide-react';
import { STATUTORY_RULES } from '@/services/legal-knowledge/rules';

export default function ComplianceReportPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-gray-400 font-mono text-xs">
        Generating comprehensive executive compliance diagnostic report...
      </div>
    );
  }

  const { business, assessment, metrics, recentFindings } = data;
  const score = metrics.overallScore;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Action Bar (Hidden during print) */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-navy-deep border border-white/10 print:hidden">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
          <FileText className="w-4 h-4 text-gold" />
          <span>Statutory Due Diligence &amp; Diagnostic Executive Report</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow"
          >
            <Printer className="w-4 h-4" />
            <span>Download / Print PDF Report</span>
          </button>
          <Link
            href="/velora/nkvv"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white border border-white/15 font-medium"
          >
            <Briefcase className="w-3.5 h-3.5 text-gold" />
            <span>Request NKVV Support</span>
          </Link>
        </div>
      </div>

      {/* Printable Report Document Container */}
      <div className="bg-white text-navy-dark p-8 sm:p-12 rounded-2xl shadow-2xl space-y-8 border border-gray-200 print:p-0 print:border-none print:shadow-none">
        
        {/* Document Header */}
        <div className="border-b-2 border-navy-deep pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-gold uppercase font-bold">
              NKVV VENTURES • VELORA COMPLIANCE PLATFORM
            </div>
            <h1 className="text-3xl font-serif font-bold text-navy-deep mt-1">
              Statutory Compliance &amp; Process Diagnostic Report
            </h1>
            <p className="text-xs text-gray-600 font-sans mt-0.5">
              Confidential Operational Risk &amp; Governance Assessment
            </p>
          </div>

          <div className="text-right font-mono text-xs text-gray-600">
            <div>Report Ref: <strong className="text-navy-deep">VEL-REP-{new Date().getFullYear()}-01</strong></div>
            <div>Date Generated: <strong className="text-navy-deep">{new Date().toLocaleDateString('en-IN')}</strong></div>
            <div className="mt-1 inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
              {business.isDemo ? 'DEMO DATA ASSESSMENT' : 'ENTERPRISE AUDIT'}
            </div>
          </div>
        </div>

        {/* 1. EXECUTIVE SUMMARY */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wider border-b border-gray-200 pb-1 flex items-center gap-2">
            <span>1. Executive Summary</span>
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed font-light">
            VELORA Compliance conducted an automated statutory applicability analysis and process diagnostic for <strong>{business.name}</strong>. Based on an active workforce of <strong>{business.workforce?.employeeCount} direct employees</strong> and <strong>{business.workforce?.contractWorkerCount} contract workers</strong> in Bengaluru, Karnataka, the establishment falls under the regulatory purview of 8 key Central and State enactments.
          </p>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-600">Overall Diagnostic Verdict:</div>
              <div className="text-sm font-serif font-bold text-navy-deep mt-0.5">
                {score >= 80 ? 'Statutory Health Stable' : score >= 60 ? 'Remediation Required in High-Exposure Pillars' : 'High Statutory Liability: Immediate Remediation Required'}
              </div>
            </div>
            <div className="flex items-center gap-4 text-center shrink-0">
              <div className="px-4 py-2 rounded-lg bg-navy-deep text-gold">
                <span className="text-2xl font-serif font-bold block">{score}</span>
                <span className="text-[9px] font-mono uppercase text-gray-300">VELORA Score</span>
              </div>
              <div className="px-4 py-2 rounded-lg bg-red-100 text-red-900">
                <span className="text-2xl font-serif font-bold block">{metrics.criticalCount}</span>
                <span className="text-[9px] font-mono uppercase text-red-700">Critical Gaps</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. BUSINESS PROFILE & SCOPE */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wider border-b border-gray-200 pb-1">
            2. Business Profile &amp; Audit Scope
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">LEGAL ENTITY:</span>
              <strong className="text-navy-deep">{business.profile?.legalEntityType}</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">INDUSTRY:</span>
              <strong className="text-navy-deep">{business.profile?.industry}</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">JURISDICTION:</span>
              <strong className="text-navy-deep">{business.profile?.city}, {business.profile?.state}</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">ESTABLISHMENT:</span>
              <strong className="text-navy-deep">{business.profile?.establishmentType}</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">EMPLOYEES:</span>
              <strong className="text-navy-deep">{business.workforce?.employeeCount} ({business.workforce?.womenEmployees} Women)</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">CONTRACT WORKERS:</span>
              <strong className="text-navy-deep">{business.workforce?.contractWorkerCount} (CLRA Triggered)</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">PAYROLL &amp; HRIS:</span>
              <strong className="text-navy-deep">{business.profile?.payrollSystem} / {business.profile?.hrisSystem}</strong>
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-[10px] text-gray-500 font-mono block">GOVERNANCE:</span>
              <strong className="text-navy-deep">{business.profile?.complianceResponsibility}</strong>
            </div>
          </div>
        </section>

        {/* 3. VELORA COMPLIANCE SCORE BREAKDOWN */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wider border-b border-gray-200 pb-1">
            3. VELORA Compliance Score Dimensions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {metrics.dimensionScores &&
              Object.entries(metrics.dimensionScores)
                .filter(([k]) => k !== 'overall')
                .map(([dim, val]: any) => (
                  <div key={dim} className="p-3 rounded-lg bg-gray-50 border border-gray-100 space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                      <span>{dim.replace(/([A-Z])/g, ' $1')}</span>
                      <strong className="text-navy-deep">{val}/100</strong>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          val >= 75 ? 'bg-emerald-600' : val >= 50 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                  </div>
                ))}
          </div>
        </section>

        {/* 4. DETAILED FINDINGS & EXPOSURE GAPS */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wider border-b border-gray-200 pb-1">
            4. Detailed Statutory Findings &amp; Risk Classifications
          </h2>
          <div className="space-y-3">
            {recentFindings.map((f: any) => (
              <div
                key={f.id}
                className="p-4 rounded-xl border border-gray-200 bg-white space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-navy-deep">{f.findingCode} • {f.law}</span>
                  <span
                    className={`font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                      f.riskLevel === 'CRITICAL'
                        ? 'bg-red-100 text-red-800'
                        : f.riskLevel === 'HIGH'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {f.riskLevel} RISK
                  </span>
                </div>

                <h3 className="font-serif font-bold text-navy-deep text-sm">
                  {f.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 pt-1">
                  <div>
                    <span className="font-mono text-[10px] text-gray-500 uppercase block">Statutory Gap:</span>
                    <p className="font-light">{f.gapAnalysis}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-gray-500 uppercase block">Recommended Action:</span>
                    <p className="text-emerald-800 font-light">{f.recommendation}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span>Section: {f.section}</span>
                  <span>Owner: {f.owner || 'HR Lead'}</span>
                  <span>Status: {f.status.replace(/_/g, ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. STATUTORY SOURCE REGISTER */}
        <section className="space-y-3">
          <h2 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wider border-b border-gray-200 pb-1">
            5. Legal Source &amp; Enactment Register
          </h2>
          <div className="overflow-x-auto text-xs">
            <table className="w-full border border-gray-200 text-left">
              <thead className="bg-gray-100 font-mono text-[10px] text-gray-600">
                <tr>
                  <th className="p-2 border-b">Rule ID</th>
                  <th className="p-2 border-b">Statute</th>
                  <th className="p-2 border-b">Section</th>
                  <th className="p-2 border-b">Threshold</th>
                  <th className="p-2 border-b">Verification Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {STATUTORY_RULES.map((r) => (
                  <tr key={r.ruleId}>
                    <td className="p-2 font-mono text-[11px] text-navy-deep">{r.ruleId}</td>
                    <td className="p-2 font-light">{r.sourceTitle}</td>
                    <td className="p-2 font-mono text-[11px]">{r.section}</td>
                    <td className="p-2 font-mono text-[11px]">
                      {r.employeeThreshold ? `>= ${r.employeeThreshold} staff` : r.contractWorkerThreshold ? `>= ${r.contractWorkerThreshold} contractors` : 'General'}
                    </td>
                    <td className="p-2">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                          r.sourceVerificationStatus === 'VERIFIED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {r.sourceVerificationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 6. STATUTORY DISCLAIMER */}
        <section className="p-4 rounded-xl bg-gray-100 border border-gray-200 text-[10px] text-gray-600 font-light leading-relaxed space-y-1">
          <strong className="text-navy-deep font-serif uppercase tracking-wider block">
            Statutory Regulatory Disclaimer
          </strong>
          <p>
            VELORA Compliance is a proprietary compliance-support and business process diagnostic platform engineered by NK Velora Ventures. This diagnostic report is generated on the basis of inputs provided during the operational assessment and automated statutory rule matching. This report does not constitute a substitute for legal counsel or certification by government labour departments.
          </p>
        </section>

        {/* NKVV Callout Footer */}
        <div className="pt-6 border-t-2 border-navy-deep flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-navy-deep">
          <div>
            <strong>NK VELORA VENTURES</strong> • Bengaluru, Karnataka, India
            <div className="text-[10px] text-gray-500 font-sans">Business Process Intelligence • Labour Compliance • HR Systems</div>
          </div>
          <div className="text-right">
            business@nkvelora.co.in • https://nkvelora.co.in
          </div>
        </div>
      </div>
    </div>
  );
}
