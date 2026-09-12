'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Send,
  Clock,
  Building,
  User,
  Mail,
  Phone,
} from 'lucide-react';

const NKVV_SERVICES = [
  {
    title: 'HR Process Design',
    desc: 'Architect structured, scalable operating procedures for onboarding, exits, records, and approvals.',
  },
  {
    title: 'Compliance Implementation',
    desc: 'Hands-on execution of EPFO, ESIC, CLRA, and state statutory setups to eliminate immediate legal liabilities.',
  },
  {
    title: 'HR Documentation',
    desc: 'Formulate robust employment contracts, NDA agreements, POSH policy frameworks, and employee handbooks.',
  },
  {
    title: 'Payroll Process Review',
    desc: 'Audit wage registers, pre-payroll verification cut-offs, minimum wage adherence, and statutory deductions.',
  },
  {
    title: 'Compliance Calendar',
    desc: 'Establish automated tracking and governance controls for recurring monthly returns and annual filings.',
  },
  {
    title: 'HR Automation',
    desc: 'Integrate HRIS, biometric attendance, and payroll platforms to replace fragile manual spreadsheets.',
  },
  {
    title: 'HR Audit',
    desc: 'Independent due diligence audit for fundraising readiness, vendor management, or state inspections.',
  },
  {
    title: 'Process Standardisation',
    desc: 'Institutionalize clear roles, escalation triggers, and standard operating models across departments.',
  },
];

export default function NkvvConversionPage() {
  const [selectedService, setSelectedService] = useState('Compliance Implementation');
  const [priority, setPriority] = useState('HIGH');
  const [description, setDescription] = useState(
    'We need hands-on assistance addressing the CLRA Principal Employer registration and POSH committee formalization identified in our VELORA diagnostic.'
  );
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);
  const [pastRequests, setPastRequests] = useState<any[]>([]);

  const loadRequests = async () => {
    try {
      const res = await fetch('/api/nkvv/request');
      const data = await res.json();
      if (data.requests) setPastRequests(data.requests);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/nkvv/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedService: selectedService,
          priority,
          description,
          contactName,
          contactEmail,
          contactPhone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit service request');

      setSubmittedRequest(data.serviceRequest);
      loadRequests();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Conversion Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-navy-deep border border-gold/40 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[10px] font-mono uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSFORM • AUTOMATE • ELEVATE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
            Need Help Fixing These Compliance Gaps?
          </h1>

          <p className="text-sm text-gray-300 font-light leading-relaxed">
            VELORA identifies exposures — NKVV Ventures fixes them. From establishing missing statutory registrations and formulating POSH committees to engineering automated HR operating workflows, our practitioners turn diagnostic findings into scalable compliance governance.
          </p>
        </div>
      </div>

      {submittedRequest && (
        <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>NKVV Implementation Engagement Request Submitted</span>
          </div>
          <p className="text-xs text-emerald-300 font-light">
            Your request reference is <strong>{submittedRequest.requestNumber}</strong>. An NKVV Compliance Principal will review your diagnostic findings and contact you within 1 business day.
          </p>
        </div>
      )}

      {/* Services Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gold" />
          <span>Select NKVV Implementation Practice</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NKVV_SERVICES.map((s) => {
            const isSelected = selectedService === s.title;
            return (
              <div
                key={s.title}
                onClick={() => setSelectedService(s.title)}
                className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-navy-primary border-gold ring-1 ring-gold shadow-lg'
                    : 'bg-navy-deep border-white/10 hover:border-gold/40'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-serif font-bold text-white">
                      {s.title}
                    </h3>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-2 text-[10px] font-mono text-gold/80">
                  {isSelected ? '✓ Selected' : 'Click to select'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Conversion Form & Previous Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Request Form (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-6">
          <div className="pb-3 border-b border-white/10">
            <h3 className="text-base font-serif font-bold text-white">
              Request Implementation Scope: {selectedService}
            </h3>
            <p className="text-xs text-gray-400 font-light mt-0.5">
              Submit your project details to initiate an engineered implementation proposal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Urgency / Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                >
                  <option value="URGENT">URGENT (Inspection / Due Diligence)</option>
                  <option value="HIGH">HIGH (Standard 14-Day Sprint)</option>
                  <option value="MEDIUM">MEDIUM (Process Optimization)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Contact Person Name
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Founder / HR Lead"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Contact Work Email
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="lead@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-mono uppercase mb-1">
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-mono uppercase mb-1">
                Implementation Scope &amp; Target Timeline
              </label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white outline-none focus:border-gold"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-widest transition-all shadow-lg disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Submitting...' : 'Request NKVV Support'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Previous Requests & Service Guarantee (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>Active Service Requests ({pastRequests.length})</span>
            </h3>

            {pastRequests.length === 0 ? (
              <p className="text-xs text-gray-400 font-light">
                No previous implementation requests recorded. Submit above to engage NKVV practitioners.
              </p>
            ) : (
              <div className="space-y-3">
                {pastRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl bg-navy-dark border border-white/5 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-gold font-bold text-[11px]">
                        {req.requestNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-gold/15 text-gold uppercase font-bold">
                        {req.status}
                      </span>
                    </div>
                    <div className="text-white font-semibold">{req.requestedService}</div>
                    <p className="text-gray-400 text-[11px] font-light line-clamp-2">
                      {req.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-navy-dark border border-gold/30 space-y-3 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold block">
              The NKVV Delivery Commitment
            </span>
            <h4 className="text-sm font-serif font-bold text-white">
              Engineered Operating Models, Not Generic Advice
            </h4>
            <p className="text-gray-300 font-light leading-relaxed">
              We do not simply point out legal penal sections. Our team drafts the registers, formalizes the policies, configures your payroll cut-off rules, and trains your operations lead so compliance is permanent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
