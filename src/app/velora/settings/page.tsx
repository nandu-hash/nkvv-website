'use client';

import React, { useState, useEffect } from 'react';
import { Settings, ShieldCheck, Users, Building, Lock, Save, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [session, setSession] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadMe() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (data.session) setSession(data.session);
      } catch (e) {
        console.error(e);
      }
    }
    loadMe();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-serif font-bold text-white tracking-tight">
          Organization &amp; Access Settings
        </h1>
        <p className="text-xs text-gray-400 font-light mt-1">
          Manage organization credentials, tenant isolation parameters, and team roles.
        </p>
      </div>

      <div className="space-y-6">
        {/* Organization Details */}
        <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-4">
          <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-gold" />
            <span>Organization Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Organization Name:</span>
              <div className="p-3 rounded-lg bg-navy-dark border border-white/10 text-white font-medium">
                {session?.orgName || 'VELORA Demo Technologies'}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Tenant ID:</span>
              <div className="p-3 rounded-lg bg-navy-dark border border-white/10 text-gray-300 font-mono text-[11px] truncate">
                {session?.organizationId || 'demo-tenant-uuid'}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Active User:</span>
              <div className="p-3 rounded-lg bg-navy-dark border border-white/10 text-white font-medium">
                {session?.name} ({session?.email})
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Assigned Role:</span>
              <div className="p-3 rounded-lg bg-navy-dark border border-white/10 text-gold font-mono font-bold">
                {session?.role} (Full Governance Authority)
              </div>
            </div>
          </div>
        </div>

        {/* Security & Multi-Tenant Isolation */}
        <div className="p-6 rounded-2xl bg-navy-deep border border-white/10 space-y-3 text-xs">
          <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-gold" />
            <span>Security &amp; Tenant Isolation Protocol</span>
          </h2>
          <p className="text-gray-300 font-light leading-relaxed">
            All customer data, business profiles, evidence records, and compliance findings are enforced with hard server-side tenant scoping. Cross-organization access attempts are strictly rejected at the database query layer.
          </p>
          <div className="pt-2 flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Tenant Isolation Mode: STRICT_ISOLATION_ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
