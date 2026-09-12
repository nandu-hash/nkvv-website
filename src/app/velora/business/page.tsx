'use client';

import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Briefcase,
  Layers,
  Save,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldAlert,
  ArrowRight,
  Info,
} from 'lucide-react';
import Link from 'next/link';

interface BusinessData {
  id: string;
  name: string;
  code: string;
  isDemo: boolean;
  profile: {
    legalEntityType: string;
    industry: string;
    state: string;
    city: string;
    establishmentType: string;
    payrollSystem?: string;
    attendanceSystem?: string;
    hrisSystem?: string;
    currentHrProcess?: string;
    complianceResponsibility?: string;
    existingConsultant?: string;
  };
  workforce: {
    employeeCount: number;
    workerCount: number;
    contractWorkerCount: number;
    migrantWorkerStatus: boolean;
    factoryStatus: boolean;
    constructionActivity: boolean;
    hazardousActivity: boolean;
    shiftWork: boolean;
    workingHours: number;
    womenEmployees: number;
    contractLabourUsage: boolean;
  };
}

interface ApplicabilityItem {
  ruleId: string;
  lawId: string;
  ruleTitle: string;
  section: string;
  status: 'APPLICABLE' | 'NOT_APPLICABLE' | 'REQUIRES_REVIEW' | 'INSUFFICIENT_INFORMATION';
  explanation: string;
  riskLevel: string;
  thresholdComparison?: {
    parameter: string;
    statutoryThreshold: number;
    businessValue: number;
  };
}

export default function BusinessProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [legalEntityType, setLegalEntityType] = useState('Private Limited Company');
  const [industry, setIndustry] = useState('IT / ITES');
  const [state, setState] = useState('Karnataka');
  const [city, setCity] = useState('Bengaluru');
  const [establishmentType, setEstablishmentType] = useState('Commercial Establishment');

  const [employeeCount, setEmployeeCount] = useState(120);
  const [workerCount, setWorkerCount] = useState(95);
  const [contractWorkerCount, setContractWorkerCount] = useState(25);
  const [womenEmployees, setWomenEmployees] = useState(42);
  const [workingHours, setWorkingHours] = useState(8.5);
  const [shiftWork, setShiftWork] = useState(true);
  const [contractLabourUsage, setContractLabourUsage] = useState(true);
  const [migrantWorkerStatus, setMigrantWorkerStatus] = useState(false);
  const [factoryStatus, setFactoryStatus] = useState(false);
  const [constructionActivity, setConstructionActivity] = useState(false);
  const [hazardousActivity, setHazardousActivity] = useState(false);

  const [payrollSystem, setPayrollSystem] = useState('RazorpayX');
  const [attendanceSystem, setAttendanceSystem] = useState('Biometric + Mobile App');
  const [hrisSystem, setHrisSystem] = useState('Keka HR');
  const [currentHrProcess, setCurrentHrProcess] = useState('Semi-Automated');
  const [complianceResponsibility, setComplianceResponsibility] = useState('In-House HR Lead');
  const [existingConsultant, setExistingConsultant] = useState('Local CA/CS (Ad-hoc)');

  const [applicability, setApplicability] = useState<ApplicabilityItem[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const res = await fetch('/api/business');
        const data = await res.json();
        if (data.business) {
          const b = data.business;
          setName(b.name || '');
          setIsDemo(b.isDemo || false);

          if (b.profile) {
            setLegalEntityType(b.profile.legalEntityType || 'Private Limited Company');
            setIndustry(b.profile.industry || 'IT / ITES');
            setState(b.profile.state || 'Karnataka');
            setCity(b.profile.city || 'Bengaluru');
            setEstablishmentType(b.profile.establishmentType || 'Commercial Establishment');
            setPayrollSystem(b.profile.payrollSystem || '');
            setAttendanceSystem(b.profile.attendanceSystem || '');
            setHrisSystem(b.profile.hrisSystem || '');
            setCurrentHrProcess(b.profile.currentHrProcess || 'Semi-Automated');
            setComplianceResponsibility(b.profile.complianceResponsibility || 'In-House HR');
            setExistingConsultant(b.profile.existingConsultant || 'None');
          }

          if (b.workforce) {
            setEmployeeCount(b.workforce.employeeCount ?? 0);
            setWorkerCount(b.workforce.workerCount ?? 0);
            setContractWorkerCount(b.workforce.contractWorkerCount ?? 0);
            setWomenEmployees(b.workforce.womenEmployees ?? 0);
            setWorkingHours(b.workforce.workingHours ?? 8);
            setShiftWork(b.workforce.shiftWork ?? false);
            setContractLabourUsage(b.workforce.contractLabourUsage ?? false);
            setMigrantWorkerStatus(b.workforce.migrantWorkerStatus ?? false);
            setFactoryStatus(b.workforce.factoryStatus ?? false);
            setConstructionActivity(b.workforce.constructionActivity ?? false);
            setHazardousActivity(b.workforce.hazardousActivity ?? false);
          }
        }
        if (data.applicability) {
          setApplicability(data.applicability);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBusiness();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch('/api/business', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          legalEntityType,
          industry,
          state,
          city,
          establishmentType,
          payrollSystem,
          attendanceSystem,
          hrisSystem,
          currentHrProcess,
          complianceResponsibility,
          existingConsultant,
          employeeCount,
          workerCount,
          contractWorkerCount,
          womenEmployees,
          workingHours,
          shiftWork,
          contractLabourUsage,
          migrantWorkerStatus,
          factoryStatus,
          constructionActivity,
          hazardousActivity,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      if (data.applicability) {
        setApplicability(data.applicability);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400 font-mono text-xs">
        Loading business and workforce intelligence profile...
      </div>
    );
  }

  const applicableRules = applicability.filter((a) => a.status === 'APPLICABLE');
  const reviewRules = applicability.filter((a) => a.status === 'REQUIRES_REVIEW');

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
              Business &amp; Workforce Profile
            </h1>
            {isDemo && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase font-bold">
                Demo Data
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            VELORA calculates statutory applicability and risk exposure strictly based on this enterprise operational profile.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/velora/diagnostics"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-colors"
          >
            <span>Proceed to Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Profile updated successfully. Statutory applicability recalculations applied across {applicability.length} legal rules.</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid Form Layout */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): The 3 Pillars of Business Intelligence */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Legal Entity & Establishment */}
          <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-gold">
              <Building2 className="w-5 h-5" />
              <h2 className="text-base font-serif font-bold text-white">
                1. Legal Entity &amp; Establishment Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Company Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Legal Entity Type
                </label>
                <select
                  value={legalEntityType}
                  onChange={(e) => setLegalEntityType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                >
                  <option value="Private Limited Company">Private Limited Company</option>
                  <option value="Public Limited Company">Public Limited Company</option>
                  <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                  <option value="Partnership Firm">Partnership Firm</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Industry Sector
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                >
                  <option value="IT / ITES">IT / ITES</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail & Commerce">Retail &amp; Commerce</option>
                  <option value="Healthcare & Pharma">Healthcare &amp; Pharma</option>
                  <option value="Logistics & Warehousing">Logistics &amp; Warehousing</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Hospitality">Hospitality</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Establishment Type
                </label>
                <select
                  value={establishmentType}
                  onChange={(e) => setEstablishmentType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                >
                  <option value="Commercial Establishment">Commercial Establishment</option>
                  <option value="Factory / Industrial Plant">Factory / Industrial Plant</option>
                  <option value="Shop / Retail Outlet">Shop / Retail Outlet</option>
                  <option value="Branch / Representative Office">Branch / Representative Office</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  State (Jurisdiction)
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Workforce Breakdown & Thresholds */}
          <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-gold">
              <Users className="w-5 h-5" />
              <h2 className="text-base font-serif font-bold text-white">
                2. Workforce Headcount &amp; Statutory Triggers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Total Employees
                </label>
                <input
                  type="number"
                  min="0"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-sm font-mono focus:border-gold outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Triggers EPF (&gt;=20), POSH (&gt;=10), Gratuity (&gt;=10), Creche (&gt;=50).
                </span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Direct Workers
                </label>
                <input
                  type="number"
                  min="0"
                  value={workerCount}
                  onChange={(e) => setWorkerCount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-sm font-mono focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Contract Workers
                </label>
                <input
                  type="number"
                  min="0"
                  value={contractWorkerCount}
                  onChange={(e) => setContractWorkerCount(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-sm font-mono focus:border-gold outline-none"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Triggers CLRA Principal Employer registration (&gt;=20).
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Women Employees Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={womenEmployees}
                  onChange={(e) => setWomenEmployees(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-sm font-mono focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Standard Daily Working Hours
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(parseFloat(e.target.value) || 8)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-sm font-mono focus:border-gold outline-none"
                />
              </div>
            </div>

            {/* Checkbox Triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Contract Labour Usage', val: contractLabourUsage, set: setContractLabourUsage },
                { label: 'Rotational Shift Work', val: shiftWork, set: setShiftWork },
                { label: 'Interstate Migrant Workers', val: migrantWorkerStatus, set: setMigrantWorkerStatus },
                { label: 'Industrial Factory Status', val: factoryStatus, set: setFactoryStatus },
                { label: 'Construction Activity', val: constructionActivity, set: setConstructionActivity },
                { label: 'Hazardous Operations', val: hazardousActivity, set: setHazardousActivity },
              ].map((item, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-navy-dark/60 border border-white/5 cursor-pointer hover:border-gold/30 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.val}
                    onChange={(e) => item.set(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 text-gold focus:ring-gold"
                  />
                  <span className="text-xs text-gray-200">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: Operating Tools & Process Maturity */}
          <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 text-gold">
              <Layers className="w-5 h-5" />
              <h2 className="text-base font-serif font-bold text-white">
                3. Operational Tools &amp; Governance Structure
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Payroll Processing System
                </label>
                <input
                  type="text"
                  value={payrollSystem}
                  onChange={(e) => setPayrollSystem(e.target.value)}
                  placeholder="e.g. RazorpayX, GreytHR, Zoho, Excel"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Attendance &amp; Leave System
                </label>
                <input
                  type="text"
                  value={attendanceSystem}
                  onChange={(e) => setAttendanceSystem(e.target.value)}
                  placeholder="e.g. Biometric Swipe, Geo-fenced App"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  HRIS Platform
                </label>
                <input
                  type="text"
                  value={hrisSystem}
                  onChange={(e) => setHrisSystem(e.target.value)}
                  placeholder="e.g. Keka, Darwinbox, Zoho People"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Current HR Process Maturity
                </label>
                <select
                  value={currentHrProcess}
                  onChange={(e) => setCurrentHrProcess(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                >
                  <option value="Manual & Ad-Hoc">Manual &amp; Ad-Hoc</option>
                  <option value="Semi-Automated">Semi-Automated (Tools + Manual)</option>
                  <option value="Standardized SOPs">Standardized SOPs &amp; Systems</option>
                  <option value="Fully Engineered & Scalable">Fully Engineered &amp; Scalable</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Compliance Responsibility
                </label>
                <input
                  type="text"
                  value={complianceResponsibility}
                  onChange={(e) => setComplianceResponsibility(e.target.value)}
                  placeholder="e.g. In-House HR, Finance Lead, Founder"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1">
                  Existing Compliance Consultant
                </label>
                <input
                  type="text"
                  value={existingConsultant}
                  onChange={(e) => setExistingConsultant(e.target.value)}
                  placeholder="e.g. Local CA, Labour Consultant, None"
                  className="w-full px-3 py-2 rounded-lg bg-navy-dark border border-white/10 text-white text-xs focus:border-gold outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Live Applicability Intelligence Feed */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="p-6 rounded-2xl bg-navy-deep border border-gold/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                Applicability Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-gold/15 text-gold border border-gold/40">
                {applicableRules.length} Mandatory Statutes
              </span>
            </div>

            <h3 className="text-base font-serif font-bold text-white">
              Statutory Exposure Scope
            </h3>

            <p className="text-xs text-gray-300 font-light leading-relaxed">
              Based on <strong>{employeeCount}</strong> total employees and <strong>{contractWorkerCount}</strong> contract workers in <strong>{state}</strong>, VELORA has computed the following statutory mandates:
            </p>

            <div className="space-y-3 pt-2">
              {applicableRules.map((rule) => (
                <div
                  key={rule.ruleId}
                  className="p-3 rounded-xl bg-navy-dark/80 border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{rule.lawId}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                        rule.riskLevel === 'CRITICAL'
                          ? 'bg-red-950 text-red-300 border border-red-500/40'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      }`}
                    >
                      {rule.riskLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-snug font-light">
                    {rule.ruleTitle} ({rule.section})
                  </p>
                  <p className="text-[10px] font-mono text-gold/80">
                    {rule.explanation}
                  </p>
                </div>
              ))}

              {reviewRules.map((rule) => (
                <div
                  key={rule.ruleId}
                  className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-200">{rule.lawId}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-900/50 text-purple-300 border border-purple-500/40 uppercase">
                      REVIEW REQD
                    </span>
                  </div>
                  <p className="text-[10px] text-purple-300/80 font-mono">
                    {rule.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/velora/diagnostics"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gold hover:bg-gold-bright text-navy-deep font-semibold text-xs uppercase tracking-wider transition-all shadow"
              >
                <span>Run Diagnostic Test</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
