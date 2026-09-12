'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock, Mail, Building, User, AlertCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, organizationName }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      router.push('/velora/business');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-architectural-dark opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-navy-primary/40 blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-navy-primary/80 text-gold text-[10px] font-mono uppercase tracking-widest font-bold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span>NKVV VENTURES • VELORA COMPLIANCE</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white tracking-tight">
            Register Organization
          </h2>
          <p className="mt-2 text-xs text-gray-400 font-mono uppercase tracking-wider">
            TRANSFORM • AUTOMATE • ELEVATE
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-navy-deep py-8 px-6 shadow-2xl border border-white/10 rounded-2xl sm:px-10">
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                  Organization / Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="Acme Corp India Pvt. Ltd."
                    className="block w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-dark border border-white/10 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Compliance Lead / Founder"
                    className="block w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-dark border border-white/10 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="lead@acme.com"
                    className="block w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-dark border border-white/10 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="block w-full pl-9 pr-3 py-2.5 rounded-lg bg-navy-dark border border-white/10 text-white text-sm focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg"
              >
                {loading ? 'Creating Organization...' : 'Create Organization Account'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
              Already registered?{' '}
              <Link href="/velora/login" className="text-gold hover:underline font-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] text-gray-500 font-mono max-w-sm mx-auto">
          VELORA Compliance is a compliance-support and process-diagnostic platform and is not a substitute for legal advice.
        </div>
      </div>
    </div>
  );
}
