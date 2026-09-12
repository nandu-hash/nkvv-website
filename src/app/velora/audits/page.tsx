'use client';

import React, { useState, useEffect } from 'react';
import {
  History,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  User,
  Activity,
} from 'lucide-react';

export default function AuditsPage() {
  const [audits, setAudits] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAudits() {
      try {
        const res = await fetch('/api/audits');
        const data = await res.json();
        if (data.audits) setAudits(data.audits);
        if (data.events) setEvents(data.events);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadAudits();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400 font-mono text-xs">
        Loading governance audit sessions &amp; immutable event trails...
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
              Audit Engagements &amp; Governance Trails
            </h1>
            <span className="text-xs font-mono text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/30">
              SOC-2 / ISO Aligned
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            Track planned statutory reviews and inspect immutable system audit events for due diligence.
          </p>
        </div>
      </div>

      {/* Audit Engagements Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>Active &amp; Historical Audit Engagements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audits.map((a) => (
            <div
              key={a.id}
              className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-dark text-gold border border-gold/30">
                  {a.scope}
                </span>
                <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                  {a.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-white">
                  {a.auditName}
                </h3>
                <p className="text-xs text-gray-400 font-light mt-1">
                  Lead Auditor: {a.auditor}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-gray-400">
                  Started: {new Date(a.startDate).toLocaleDateString('en-IN')}
                </span>
                <span className="text-gold font-bold">
                  Score: {a.score ? `${a.score}/100` : 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Audit Events Log */}
      <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-gold" />
          <span>Immutable System Audit Trail (Last 20 Events)</span>
        </h2>

        <div className="space-y-2">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-xl bg-navy-dark border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-gold px-2 py-0.5 rounded bg-navy-deep border border-gold/30">
                  {ev.eventType}
                </span>
                <span className="text-gray-300 font-mono text-[11px] truncate max-w-md">
                  {ev.entityType}: {ev.details}
                </span>
              </div>
              <div className="text-right text-[10px] font-mono text-gray-500 shrink-0">
                <span>{ev.actorEmail || 'System'}</span> •{' '}
                <span>{new Date(ev.createdAt).toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
