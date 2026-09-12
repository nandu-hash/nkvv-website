'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  ShieldCheck,
  FolderLock,
  History,
  FileBarChart,
  Briefcase,
  Settings,
  LogOut,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

interface SessionData {
  userId: string;
  organizationId: string;
  role: string;
  email: string;
  name: string;
  orgName: string;
  isDemo: boolean;
}

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/velora/dashboard', icon: LayoutDashboard },
  { label: 'Business', href: '/velora/business', icon: Building2 },
  { label: 'Diagnostics', href: '/velora/diagnostics', icon: Stethoscope },
  { label: 'Compliance', href: '/velora/compliance', icon: ShieldCheck },
  { label: 'Evidence', href: '/velora/evidence', icon: FolderLock },
  { label: 'Audits', href: '/velora/audits', icon: History },
  { label: 'Reports', href: '/velora/reports', icon: FileBarChart },
  { label: 'NKVV', href: '/velora/nkvv', icon: Briefcase },
  { label: 'Settings', href: '/velora/settings', icon: Settings },
];

export function VeloraShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Exclude login and signup from the authenticated shell
  const isAuthPage = pathname.startsWith('/velora/login') || pathname.startsWith('/velora/signup');

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.authenticated) {
          // If no active session, auto-initialize demo session so investor can immediately explore
          const demoRes = await fetch('/api/auth/demo', { method: 'POST' });
          const demoData = await demoRes.json();
          if (demoData.success) {
            setSession({
              userId: demoData.user.id,
              organizationId: demoData.organization.id,
              role: demoData.role,
              email: demoData.user.email,
              name: demoData.user.name,
              orgName: demoData.organization.name,
              isDemo: true,
            });
          } else {
            router.push('/velora/login');
          }
        } else {
          setSession(data.session);
        }
      } catch (e) {
        console.error('Session check failed', e);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [isAuthPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/velora/login');
    router.refresh();
  };

  if (isAuthPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-dark flex items-center justify-center text-gold">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-widest uppercase">Initializing VELORA Compliance...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-dark text-white flex flex-col font-sans">
      {/* Top Banner for Demo State */}
      {session?.isDemo && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-1.5 flex items-center justify-between text-amber-200 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-amber-500 text-navy-dark font-bold text-[10px]">
              DEMO DATA
            </span>
            <span>You are viewing: <strong>VELORA Demo Technologies Pvt. Ltd.</strong> (120 Employees • Bengaluru, KA). Not a certified legal audit.</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden sm:inline text-amber-300/70">Investor Sandbox Mode</span>
            <button
              onClick={() => router.push('/velora/business')}
              className="text-amber-300 underline hover:text-white"
            >
              Inspect Profile
            </button>
          </div>
        </div>
      )}

      {/* Main App Navigation Header */}
      <header className="bg-navy-deep/90 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Tagline */}
          <div className="flex items-center gap-4">
            <Link href="/velora/dashboard" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-navy-primary border border-gold/40 flex items-center justify-center p-1 group-hover:border-gold transition-colors">
                <Image
                  src="/nkvv-icon.png"
                  alt="NKVV Emblem"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-white text-base tracking-tight">
                    VELORA
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-gold px-1.5 py-0.2 rounded border border-gold/30 bg-gold/10 uppercase">
                    Compliance
                  </span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-gray-400 uppercase hidden sm:block">
                  TRANSFORM • AUTOMATE • ELEVATE
                </p>
              </div>
            </Link>

            {/* Tenant Indicator */}
            {session && (
              <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10">
                <span className="text-[11px] text-gray-400 font-mono">Org:</span>
                <span className="text-xs font-semibold text-gray-200 max-w-[200px] truncate">
                  {session.orgName}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gold uppercase">
                  {session.role}
                </span>
              </div>
            )}
          </div>

          {/* Quick Actions & User Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/velora/nkvv"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold text-xs font-medium transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>NKVV Implementation</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-xs transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Horizontal Workspace Navigation Tabs */}
        <div className="border-t border-white/5 bg-navy-dark/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-navy-primary text-gold border border-gold/30 shadow-sm'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-gold' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Mandatory Statutory Disclaimer Footer */}
      <footer className="bg-navy-deep border-t border-white/10 py-6 text-center text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-gray-300">
            <span>NKVV VENTURES</span>
            <span>•</span>
            <span>VELORA COMPLIANCE PLATFORM</span>
            <span>•</span>
            <span className="text-gold font-semibold">TRANSFORM • AUTOMATE • ELEVATE</span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            <strong>LEGAL DISCLAIMER:</strong> VELORA Compliance is an operational diagnostic and compliance-support platform developed by NK Velora Ventures. It is designed to identify operational gaps, establish structured HR workflows, and maintain evidence readiness. It does not constitute formal legal counsel or statutory legal certification.
          </p>
        </div>
      </footer>
    </div>
  );
}
