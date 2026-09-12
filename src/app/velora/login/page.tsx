'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Lock, Mail, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      router.push('/velora/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setDemoLoading(true);

    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize demo');
      }

      router.push('/velora/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
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
            Sign In to VELORA
          </h2>
          <p className="mt-2 text-xs text-gray-400 font-mono uppercase tracking-wider">
            TRANSFORM • AUTOMATE • ELEVATE
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-navy-deep py-8 px-6 shadow-2xl border border-white/10 rounded-2xl sm:px-10">
            {/* Quick Demo Access Bar */}
            <div className="mb-6 p-4 rounded-xl bg-gold/10 border border-gold/30">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-serif font-bold text-gold">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Investor &amp; Partner Review</span>
                  </div>
                  <p className="text-[11px] text-gray-300 font-light mt-0.5">
                    Launch pre-loaded demo business with full statutory findings.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  disabled={demoLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold hover:bg-gold-bright text-navy-deep text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 shrink-0"
                >
                  {demoLoading ? 'Loading...' : 'Explore Demo'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-navy-deep px-3 text-gray-400 font-mono text-[10px] uppercase">
                  Or enter credentials
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-gray-300 mb-1.5">
                  Corporate Email
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
                    placeholder="compliance.lead@company.com"
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
                className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
              Don&apos;t have an organization account?{' '}
              <Link href="/velora/signup" className="text-gold hover:underline font-semibold">
                Create Account
              </Link>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Footer */}
        <div className="mt-8 text-center text-[10px] text-gray-500 font-mono max-w-sm mx-auto">
          VELORA Compliance is a compliance-support and process-diagnostic platform and is not a substitute for legal advice.
        </div>
      </div>
    </div>
  );
}
