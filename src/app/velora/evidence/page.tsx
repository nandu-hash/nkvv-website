'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderLock,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';

interface EvidenceItem {
  id: string;
  title: string;
  category: string;
  status: 'VERIFIED' | 'UNVERIFIED' | 'MISSING' | 'CONTRADICTORY' | 'EXPIRED' | 'NOT_APPLICABLE';
  notes?: string;
  createdAt: string;
  documents: Array<{
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
  }>;
  mappings: Array<{
    id: string;
    legalRule?: {
      ruleId: string;
      requirement: string;
    };
  }>;
}

export default function EvidenceVaultPage() {
  const [evidences, setEvidences] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Statutory Registration');
  const [status, setStatus] = useState<any>('UNVERIFIED');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);

  const fetchEvidence = async () => {
    try {
      const res = await fetch('/api/evidence');
      const data = await res.json();
      if (data.evidences) {
        setEvidences(data.evidences);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await fetch('/api/evidence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          status,
          fileName: fileName || `${title.replace(/[^a-zA-Z0-9]/g, '_')}.${fileType.toLowerCase()}`,
          fileType,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to register evidence');

      setShowUploadModal(false);
      setTitle('');
      setFileName('');
      setNotes('');
      fetchEvidence();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400 font-mono text-xs">
        Loading statutory evidence vault...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Evidence Vault &amp; Traceability
            </h1>
            <span className="text-xs font-mono text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
              {evidences.length} Documents
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            Auditable digital records mapped directly to statutory rules and compliance test assertions.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Evidence Record</span>
        </button>
      </div>

      {/* Non-Negotiable Traceability Architecture Banner */}
      <div className="p-6 rounded-2xl bg-navy-deep border border-gold/30 space-y-3">
        <div className="flex items-center gap-2 text-xs font-serif font-bold text-gold">
          <Layers className="w-4 h-4 text-gold" />
          <span>VELORA Statutory Traceability Pipeline</span>
        </div>

        <p className="text-xs text-gray-300 font-light leading-relaxed">
          An uploaded document does <strong>not</strong> automatically equal legal compliance. Every document moves through an objective multi-stage audit pipeline:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2 text-center text-[10px] font-mono">
          {[
            { step: '1. Document', desc: 'Secure S3 ingest (PDF/DOCX/XLSX)' },
            { step: '2. Extraction', desc: 'Metadata & validity parsing' },
            { step: '3. Evidence', desc: 'Status classification' },
            { step: '4. Legal Mapping', desc: 'Mapped to section requirement' },
            { step: '5. Compliance Test', desc: 'Objective threshold validation' },
            { step: '6. Assessment', desc: 'Transparent score & findings' },
          ].map((s, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-navy-dark border border-white/10 flex flex-col justify-between space-y-1"
            >
              <span className="text-gold font-bold">{s.step}</span>
              <span className="text-gray-400 text-[9px] font-sans font-light leading-tight">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {evidences.map((ev) => (
          <div
            key={ev.id}
            className="p-5 rounded-2xl bg-navy-deep border border-white/10 flex flex-col justify-between space-y-4 hover:border-gold/30 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-dark text-gray-300 border border-white/5">
                  {ev.category}
                </span>
                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
                    ev.status === 'VERIFIED'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : ev.status === 'EXPIRED'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : ev.status === 'CONTRADICTORY'
                      ? 'bg-red-950 text-red-300 border border-red-500/40'
                      : 'bg-white/5 text-gray-300 border border-white/10'
                  }`}
                >
                  {ev.status}
                </span>
              </div>

              <h3 className="text-sm font-serif font-bold text-white">
                {ev.title}
              </h3>

              {ev.documents?.[0] && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-navy-dark/60 border border-white/5 text-xs text-gray-300 font-mono text-[11px]">
                  <FileText className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span className="truncate">{ev.documents[0].fileName}</span>
                  <span className="text-[10px] text-gray-500 uppercase shrink-0">
                    ({ev.documents[0].fileType})
                  </span>
                </div>
              )}

              {ev.notes && (
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {ev.notes}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>Added: {new Date(ev.createdAt).toLocaleDateString('en-IN')}</span>
              <span className="text-gold">
                {ev.mappings?.length ? `${ev.mappings.length} Legal Mapping` : 'Direct Attachment'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload & Index Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-navy-deep border border-gold/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-gold" />
                <span>Upload &amp; Index Compliance Evidence</span>
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300">
              Supported Formats: PDF, DOCX, XLSX, CSV, JPG, PNG. Document intelligence creates structured evidence assertions.
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Evidence Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. EPFO Registration Letter Form 5A"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">
                    Document Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                  >
                    <option value="Statutory Registration">Statutory Registration</option>
                    <option value="Monthly Return">Monthly Return (ECR/ESIC)</option>
                    <option value="Statutory Register">Statutory Register</option>
                    <option value="Policy">HR / POSH Policy</option>
                    <option value="Agreement">Contractor Agreement / License</option>
                    <option value="Nomination">Employee Form F Nomination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">
                    Initial Verification State
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                  >
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="UNVERIFIED">UNVERIFIED</option>
                    <option value="EXPIRED">EXPIRED</option>
                    <option value="CONTRADICTORY">CONTRADICTORY</option>
                    <option value="MISSING">MISSING</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="e.g. PF_ECR_Challan_Aug2026.pdf"
                    className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-mono uppercase mb-1">
                    Format
                  </label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="DOCX">DOCX Word Document</option>
                    <option value="XLSX">XLSX Excel Spreadsheet</option>
                    <option value="CSV">CSV Data File</option>
                    <option value="PNG">PNG Image Scan</option>
                    <option value="JPG">JPG Image Scan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Audit Notes / Scope
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes regarding validity, issuing authority, or observation..."
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider"
                >
                  {uploading ? 'Registering...' : 'Index Document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
