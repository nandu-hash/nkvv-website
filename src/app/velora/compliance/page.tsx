'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Filter,
  ArrowRight,
  Save,
  Check,
  Briefcase,
  HelpCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

interface Remediation {
  id: string;
  actionTitle: string;
  actionDescription: string;
  owner: string;
  priority: string;
  dueDate?: string;
  status: string;
  notes?: string;
}

interface Finding {
  id: string;
  findingCode: string;
  title: string;
  description: string;
  law: string;
  section: string;
  sourceText: string;
  applicabilityReason: string;
  evidenceSummary?: string;
  gapAnalysis: string;
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFORMATIONAL';
  recommendation: string;
  owner?: string;
  priority: string;
  dueDate?: string;
  status: string;
  confidence: string;
  remediationActions: Remediation[];
}

export default function ComplianceFindingsPage() {
  const searchParams = useSearchParams();
  const initialRisk = searchParams.get('risk') || 'ALL';
  const initialStatus = searchParams.get('status') || 'ALL';
  const focusId = searchParams.get('focus');

  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRisk, setSelectedRisk] = useState<string>(initialRisk);
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus);
  const [activeFinding, setActiveFinding] = useState<Finding | null>(null);

  // Remediation Form state
  const [remediationStatus, setRemediationStatus] = useState('OPEN');
  const [remediationOwner, setRemediationOwner] = useState('');
  const [remediationNotes, setRemediationNotes] = useState('');
  const [remediationActionTitle, setRemediationActionTitle] = useState('');
  const [savingRemediation, setSavingRemediation] = useState(false);
  const [remSuccess, setRemSuccess] = useState(false);

  useEffect(() => {
    async function loadFindings() {
      try {
        const res = await fetch('/api/compliance/findings');
        const data = await res.json();
        if (data.findings) {
          setFindings(data.findings);
          if (focusId) {
            const found = data.findings.find((f: Finding) => f.id === focusId);
            if (found) setActiveFinding(found);
          } else if (data.findings.length > 0) {
            setActiveFinding(data.findings[0]);
          }
        }
      } catch (err) {
        console.error('Failed to load findings', err);
      } finally {
        setLoading(false);
      }
    }
    loadFindings();
  }, [focusId]);

  useEffect(() => {
    if (activeFinding) {
      const existingRem = activeFinding.remediationActions?.[0];
      if (existingRem) {
        setRemediationStatus(existingRem.status || 'OPEN');
        setRemediationOwner(existingRem.owner || '');
        setRemediationNotes(existingRem.notes || '');
        setRemediationActionTitle(existingRem.actionTitle || `Remediate: ${activeFinding.title}`);
      } else {
        setRemediationStatus('OPEN');
        setRemediationOwner(activeFinding.owner || 'Compliance Lead');
        setRemediationNotes('');
        setRemediationActionTitle(`Remediate: ${activeFinding.title}`);
      }
    }
  }, [activeFinding]);

  const handleSaveRemediation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeFinding) return;
    setSavingRemediation(true);
    setRemSuccess(false);

    try {
      const existingRem = activeFinding.remediationActions?.[0];
      const res = await fetch('/api/compliance/remediation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: existingRem?.id,
          findingId: activeFinding.id,
          actionTitle: remediationActionTitle,
          actionDescription: activeFinding.recommendation,
          owner: remediationOwner,
          priority: activeFinding.priority,
          status: remediationStatus,
          notes: remediationNotes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save remediation');

      // Update local state
      setFindings((prev) =>
        prev.map((f) =>
          f.id === activeFinding.id
            ? { ...f, remediationActions: [data.action] }
            : f
        )
      );
      setRemSuccess(true);
      setTimeout(() => setRemSuccess(false), 3000);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSavingRemediation(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400 font-mono text-xs">
        Loading statutory compliance findings...
      </div>
    );
  }

  const filteredFindings = findings.filter((f) => {
    if (selectedRisk !== 'ALL' && f.riskLevel !== selectedRisk) return false;
    if (selectedStatus !== 'ALL' && f.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Compliance Findings &amp; Risk Register
            </h1>
            <span className="text-xs font-mono text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
              {filteredFindings.length} Records
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            Definitive gap analysis mapped to statutory citations, evidence records, and remediation roadmaps.
          </p>
        </div>

        <Link
          href="/velora/reports"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow"
        >
          <span>Generate Audit Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-navy-deep border border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mr-2">
          <Filter className="w-3.5 h-3.5 text-gold" />
          <span>Filters:</span>
        </div>

        {/* Risk Filter */}
        <div className="flex items-center gap-1.5">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedRisk(lvl)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors ${
                selectedRisk === lvl
                  ? 'bg-gold text-navy-deep font-bold'
                  : 'bg-navy-dark text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-white/10 mx-2 hidden sm:block" />

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {['ALL', 'NON_COMPLIANT', 'PARTIALLY_COMPLIANT', 'COMPLIANT', 'HUMAN_REVIEW_REQUIRED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-white/20 text-white font-bold border border-white/30'
                  : 'bg-navy-dark text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Split-Screen Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (5 cols): Findings List */}
        <div className="lg:col-span-5 space-y-3">
          {filteredFindings.length === 0 ? (
            <div className="p-8 text-center text-gray-400 font-mono text-xs rounded-2xl bg-navy-deep border border-white/10">
              No findings match current filter criteria.
            </div>
          ) : (
            filteredFindings.map((f) => {
              const isSelected = activeFinding?.id === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveFinding(f)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-navy-primary/90 border-gold shadow-lg ring-1 ring-gold'
                      : 'bg-navy-deep border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-400 font-semibold">
                      {f.findingCode}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                          f.riskLevel === 'CRITICAL'
                            ? 'bg-red-950 text-red-300 border border-red-500/40'
                            : f.riskLevel === 'HIGH'
                            ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                            : 'bg-navy-dark text-gold border border-gold/30'
                        }`}
                      >
                        {f.riskLevel}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase ${
                          f.status === 'COMPLIANT'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            : 'bg-white/5 text-gray-300 border border-white/10'
                        }`}
                      >
                        {f.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xs font-serif font-bold text-white line-clamp-1">
                    {f.title}
                  </h3>

                  <p className="text-[11px] text-gray-300 line-clamp-2 font-light leading-relaxed">
                    {f.gapAnalysis}
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
                    <span>{f.law}</span>
                    <span>{f.remediationActions?.length || 0} Action</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column (7 cols): Required Finding Details & Remediation Box */}
        <div className="lg:col-span-7 space-y-6">
          {activeFinding ? (
            <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-6">
              {/* Finding Title & Core Metadata */}
              <div className="pb-4 border-b border-white/10 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-dark text-gold border border-gold/30">
                    {activeFinding.findingCode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                        activeFinding.riskLevel === 'CRITICAL'
                          ? 'bg-red-950 text-red-300 border border-red-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      RISK: {activeFinding.riskLevel}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10 uppercase">
                      CONFIDENCE: {activeFinding.confidence}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-serif font-bold text-white">
                  {activeFinding.title}
                </h2>
              </div>

              {/* 11 Non-Negotiable Finding Fields */}
              <div className="space-y-4 text-xs">
                {/* 1. WHAT WE FOUND */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold mb-1">
                    WHAT WE FOUND
                  </h4>
                  <p className="text-gray-200 leading-relaxed font-light p-3 rounded-lg bg-navy-dark/70 border border-white/5">
                    {activeFinding.description}
                  </p>
                </div>

                {/* 2. WHY IT MATTERS */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold mb-1">
                    WHY IT MATTERS (RISK IMPACT)
                  </h4>
                  <p className="text-gray-200 leading-relaxed font-light p-3 rounded-lg bg-red-950/20 border border-red-500/20">
                    {activeFinding.gapAnalysis}
                  </p>
                </div>

                {/* 3 & 4. APPLICABLE REQUIREMENT & SOURCE */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-1">
                      APPLICABLE REQUIREMENT
                    </h4>
                    <div className="p-3 rounded-lg bg-navy-dark/70 border border-white/5 text-gray-300 font-mono text-[11px]">
                      {activeFinding.law} — {activeFinding.section}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-1">
                      STATUTORY SOURCE REFERENCE
                    </h4>
                    <div className="p-3 rounded-lg bg-navy-dark/70 border border-white/5 text-gray-300 font-mono text-[11px]">
                      {activeFinding.sourceText}
                    </div>
                  </div>
                </div>

                {/* 5. EVIDENCE REVIEWED */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold mb-1">
                    EVIDENCE REVIEWED
                  </h4>
                  <p className="text-gray-300 p-3 rounded-lg bg-navy-dark/70 border border-white/5 font-mono text-[11px]">
                    {activeFinding.evidenceSummary || 'No verified document currently linked in evidence vault.'}
                  </p>
                </div>

                {/* 6. GAP */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                    OPERATIONAL GAP
                  </h4>
                  <p className="text-gray-200 p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 font-light leading-relaxed">
                    {activeFinding.gapAnalysis}
                  </p>
                </div>

                {/* 7. RECOMMENDED ACTION */}
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                    RECOMMENDED ACTION
                  </h4>
                  <p className="text-emerald-200 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 font-light leading-relaxed">
                    {activeFinding.recommendation}
                  </p>
                </div>

                {/* 8, 9, 10, 11: METADATA ROW */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono">
                  <div>
                    <span className="text-gray-400 block">OWNER:</span>
                    <span className="text-white font-bold">{activeFinding.owner || 'HR Lead'}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">PRIORITY:</span>
                    <span className="text-gold font-bold">{activeFinding.priority}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">STATUS:</span>
                    <span className="text-white font-bold">{activeFinding.status.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block">CONFIDENCE:</span>
                    <span className="text-emerald-400 font-bold">{activeFinding.confidence}</span>
                  </div>
                </div>
              </div>

              {/* REMEDIATION ACTION CREATION & MANAGEMENT PANEL */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <span>Remediation Workflow Control</span>
                  </h3>
                  <span className="text-[10px] font-mono text-gray-400">
                    NKVV Operational SOP Execution
                  </span>
                </div>

                {remSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Remediation action recorded successfully.</span>
                  </div>
                )}

                <form onSubmit={handleSaveRemediation} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                      Remediation Action
                    </label>
                    <input
                      type="text"
                      required
                      value={remediationActionTitle}
                      onChange={(e) => setRemediationActionTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                        Responsible Owner
                      </label>
                      <input
                        type="text"
                        value={remediationOwner}
                        onChange={(e) => setRemediationOwner(e.target.value)}
                        placeholder="e.g. NKVV Specialist / HR Lead"
                        className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                        Remediation Status
                      </label>
                      <select
                        value={remediationStatus}
                        onChange={(e) => setRemediationStatus(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-gray-300 mb-1">
                      Remediation Notes / Evidence Link
                    </label>
                    <textarea
                      rows={2}
                      value={remediationNotes}
                      onChange={(e) => setRemediationNotes(e.target.value)}
                      placeholder="Enter operational steps taken or reference attached evidence document..."
                      className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href="/velora/nkvv"
                      className="text-xs font-mono text-gold hover:underline flex items-center gap-1"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Request NKVV Implementation Assistance</span>
                    </Link>

                    <button
                      type="submit"
                      disabled={savingRemediation}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{savingRemediation ? 'Saving...' : 'Update Remediation'}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400 font-mono text-xs rounded-2xl bg-navy-deep border border-white/10">
              Select a finding from the list to view comprehensive statutory details and remediation actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
