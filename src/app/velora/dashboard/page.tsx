'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FolderLock,
  ArrowRight,
  TrendingUp,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  Briefcase,
  Check,
  FileText,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadDashboard() {
      try {
        const res = await fetch('/api/dashboard');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error('Failed to load dashboard data', e);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-gray-400 font-mono text-xs">
        Aggregating compliance intelligence &amp; audit metrics...
      </div>
    );
  }

  const { business, assessment, metrics, recentFindings, calendarItems, activeAudit } = data;
  const score = metrics.overallScore;

  // Chart data for 7 dimensions
  const dimensionChartData = metrics.dimensionScores
    ? [
        { name: 'Legal Compliance', score: metrics.dimensionScores.legalCompliance },
        { name: 'Documentation', score: metrics.dimensionScores.documentation },
        { name: 'Payroll & Wages', score: metrics.dimensionScores.payroll },
        { name: 'Statutory (PF/ESI)', score: metrics.dimensionScores.statutory },
        { name: 'HR Process', score: metrics.dimensionScores.hrProcess },
        { name: 'Evidence Readiness', score: metrics.dimensionScores.evidenceReadiness },
        { name: 'Audit Readiness', score: metrics.dimensionScores.auditReadiness },
      ]
    : [];

  return (
    <div className="space-y-8">
      {/* Top Welcome & Score Hero Banner */}
      <div className="p-8 rounded-3xl bg-navy-deep border border-gold/40 shadow-2xl relative overflow-hidden">
        <div className="absolute right-[-2%] top-[-10%] w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Business Overview & Score Breakdown */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-gold/15 text-gold border border-gold/40 uppercase font-bold">
                OPERATIONAL COMPLIANCE INTELLIGENCE
              </span>
              {business.isDemo && (
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                  DEMO DATA
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {business.name}
            </h1>

            <p className="text-xs text-gray-300 font-light max-w-2xl leading-relaxed">
              {business.profile?.legalEntityType} • {business.profile?.industry} • {business.profile?.city}, {business.profile?.state}
              <span className="block mt-1 text-gray-400 font-mono text-[11px]">
                Active Workforce: <strong>{business.workforce?.employeeCount} direct staff</strong> + <strong>{business.workforce?.contractWorkerCount} contract workmen</strong> ({business.workforce?.womenEmployees} women).
              </span>
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/velora/diagnostics"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <span>Re-run Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/velora/reports"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-gray-200 text-xs font-medium transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Executive Report</span>
              </Link>
              <Link
                href="/velora/nkvv"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-gold text-xs font-medium transition-colors"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Request NKVV Support</span>
              </Link>
            </div>
          </div>

          {/* Right Column: VELORA Score Indicator Dial */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-navy-dark/90 border border-gold/30">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">
              VELORA COMPLIANCE SCORE
            </span>
            <div className="relative flex items-center justify-center my-2">
              <div className="w-32 h-32 rounded-full border-4 border-white/10 flex flex-col items-center justify-center relative">
                <span className="text-4xl font-serif font-bold text-gold">
                  {score}
                </span>
                <span className="text-[10px] font-mono text-gray-400">/ 100</span>
              </div>
            </div>
            <div className="text-center mt-2">
              <span
                className={`text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded ${
                  score >= 80
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                    : score >= 60
                    ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                    : 'bg-red-950 text-red-300 border border-red-500/40'
                }`}
              >
                {score >= 80 ? 'AUDIT READY' : score >= 60 ? 'MODERATE RISK' : 'CRITICAL EXPOSURES'}
              </span>
              <p className="text-[11px] text-gray-400 font-light mt-1.5">
                Calculated across 7 operational dimensions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Counters Bar (Clickable Drill-Downs) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link
          href="/velora/compliance?risk=CRITICAL"
          className="p-4 rounded-xl bg-red-950/25 border border-red-500/30 hover:border-red-500 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-red-400">Critical Issues</span>
            <ShieldAlert className="w-4 h-4 text-red-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-red-300">
            {metrics.criticalCount}
          </div>
          <span className="text-[10px] text-gray-400">Immediate liability</span>
        </Link>

        <Link
          href="/velora/compliance?risk=HIGH"
          className="p-4 rounded-xl bg-amber-950/25 border border-amber-500/30 hover:border-amber-500 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-amber-400">High Risks</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-amber-300">
            {metrics.highCount}
          </div>
          <span className="text-[10px] text-gray-400">Requires remediation</span>
        </Link>

        <Link
          href="/velora/compliance?risk=MEDIUM"
          className="p-4 rounded-xl bg-navy-deep border border-white/10 hover:border-gold/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gray-400">Medium Risks</span>
            <Layers className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-gold">
            {metrics.mediumCount}
          </div>
          <span className="text-[10px] text-gray-400">Process gaps</span>
        </Link>

        <Link
          href="/velora/evidence"
          className="p-4 rounded-xl bg-navy-deep border border-white/10 hover:border-gold/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gray-400">Evidence Vault</span>
            <FolderLock className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-gold">
            {metrics.evidenceCount}
          </div>
          <span className="text-[10px] text-gray-400">Uploaded records</span>
        </Link>

        <Link
          href="/velora/compliance"
          className="p-4 rounded-xl bg-navy-deep border border-white/10 hover:border-gold/40 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gray-400">Remediations</span>
            <TrendingUp className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-gold">
            {metrics.openRemediations}
          </div>
          <span className="text-[10px] text-gray-400">Active action items</span>
        </Link>

        <Link
          href="/velora/compliance?status=COMPLIANT"
          className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-emerald-400">Compliant</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-serif font-bold text-white mt-1 group-hover:text-emerald-300">
            {metrics.compliantCount}
          </div>
          <span className="text-[10px] text-gray-400">Verified controls</span>
        </Link>
      </div>

      {/* 2-Column Section: 7 Dimension Analytics & Upcoming Compliance Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Dimensional Breakdown Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-serif font-bold text-white">
                Operational Compliance Dimensions
              </h2>
              <p className="text-xs text-gray-400 font-light">
                Transparent score distribution across 7 critical compliance pillars.
              </p>
            </div>
            <span className="text-xs font-mono text-gold font-bold">Max 100</span>
          </div>

          <div className="h-64 w-full pt-4">
            {mounted && dimensionChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dimensionChartData} layout="vertical" margin={{ left: 20, right: 30, top: 0, bottom: 0 }}>
                  <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" stroke="#cbd5e1" tick={{ fontSize: 11 }} width={120} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#071A33', borderColor: '#C9972B', borderRadius: 8, fontSize: 12 }}
                    formatter={(val: any) => [`${val} / 100`, 'Score']}
                  />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {dimensionChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.score >= 75 ? '#10b981' : entry.score >= 50 ? '#C9972B' : '#ef4444'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 font-mono text-xs">
                Rendering dimension graph...
              </div>
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Upcoming Compliance Deadlines */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold" />
                <span>Statutory Compliance Calendar</span>
              </h2>
              <p className="text-xs text-gray-400 font-light">
                Upcoming filing deadlines to prevent penalty accrual.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {calendarItems.map((item: any) => {
              const due = new Date(item.dueDate);
              const formattedDate = due.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-navy-dark border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-serif font-bold text-white block">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">
                      {item.law} • {item.statutoryAuthority}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-gold block">
                      {formattedDate}
                    </span>
                    <span className="text-[9px] font-mono uppercase text-gray-400">
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Critical Statutory Findings List */}
      <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>Priority Compliance Findings &amp; Exposure Gaps</span>
            </h2>
            <p className="text-xs text-gray-400 font-light">
              Identified exposures requiring operational intervention before formal labor audits.
            </p>
          </div>
          <Link
            href="/velora/compliance"
            className="text-xs font-mono text-gold hover:underline flex items-center gap-1"
          >
            <span>View All Findings ({recentFindings.length})</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {recentFindings.map((f: any) => (
            <div
              key={f.id}
              className="p-4 rounded-xl bg-navy-dark border border-white/10 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-gray-400">
                    {f.findingCode}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                      f.riskLevel === 'CRITICAL'
                        ? 'bg-red-950 text-red-300 border border-red-500/40'
                        : f.riskLevel === 'HIGH'
                        ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                        : 'bg-navy-primary text-gold border border-gold/30'
                    }`}
                  >
                    {f.riskLevel}
                  </span>
                </div>

                <h3 className="text-xs font-serif font-bold text-white line-clamp-2">
                  {f.title}
                </h3>

                <p className="text-[11px] text-gray-300 font-light line-clamp-3 leading-relaxed">
                  {f.gapAnalysis}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                <span className="text-gray-400">{f.law}</span>
                <Link
                  href={`/velora/compliance?focus=${f.id}`}
                  className="text-gold hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
