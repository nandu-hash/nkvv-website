'use client';

import React, { useState } from 'react';
import { Users, GitBranch, Cpu, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

interface SystemNode {
  id: string;
  stage: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  metric: string;
  color: string;
}

const NODES: SystemNode[] = [
  {
    id: 'people',
    stage: '01',
    label: 'People',
    subtitle: 'Talent & Organizational Roles',
    icon: Users,
    metric: 'Workforce Capability',
    color: '#E0B44C',
  },
  {
    id: 'process',
    stage: '02',
    label: 'Process',
    subtitle: 'Standard Operating Procedures',
    icon: GitBranch,
    metric: 'Structured SOPs',
    color: '#C9972B',
  },
  {
    id: 'technology',
    stage: '03',
    label: 'Technology',
    subtitle: 'Integrated HRMS & Tools',
    icon: Cpu,
    metric: 'Connected Data',
    color: '#60A5FA',
  },
  {
    id: 'automation',
    stage: '04',
    label: 'Automation',
    subtitle: 'Triggered Workflows & Bots',
    icon: Zap,
    metric: 'Zero Manual Repetition',
    color: '#34D399',
  },
  {
    id: 'impact',
    stage: '05',
    label: 'Business Impact',
    subtitle: 'Scalable HR Infrastructure',
    icon: TrendingUp,
    metric: 'Maximum Velocity',
    color: '#F59E0B',
  },
];

export const HeroVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('process');

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-br from-navy-primary/90 via-navy-deep to-navy-surface p-6 sm:p-8 border border-navy-light/60 shadow-2xl overflow-hidden">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C9972B_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative z-10 space-y-6">
        {/* Visual Title Header */}
        <div className="flex items-center justify-between border-b border-navy-light/50 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-gold-light">
              NKVV HR Operating Architecture
            </span>
          </div>
          <span className="text-[11px] font-mono text-gray-400 bg-navy-deep/80 px-2.5 py-1 rounded border border-navy-light/50">
            System Flow Status: Active
          </span>
        </div>

        {/* Nodes Flow Pipeline (Desktop + Mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
          {NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeNode === node.id;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={`relative group cursor-pointer p-4 rounded-xl transition-all duration-300 border ${
                  isSelected
                    ? 'bg-navy-surface/90 border-gold shadow-lg shadow-gold/10 scale-105 z-20'
                    : 'bg-navy-deep/60 border-navy-light/40 hover:border-gold/50 hover:bg-navy-surface/50'
                }`}
              >
                {/* Connecting arrow indicator for sm screens */}
                {idx < NODES.length - 1 && (
                  <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                    <div className="w-2 h-2 rotate-45 border-t-2 border-r-2 border-gold/70" />
                  </div>
                )}

                <div className="flex flex-col items-start space-y-2">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono text-gold-light font-bold">
                      {node.stage}
                    </span>
                    <div
                      className={`p-1.5 rounded-lg ${
                        isSelected ? 'bg-gold text-navy-deep' : 'bg-navy-primary text-gold'
                      } transition-colors`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {node.label}
                  </h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2 leading-tight">
                    {node.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Deep-Dive Card */}
        {activeNode && (
          <div className="mt-4 p-4 sm:p-5 rounded-xl bg-navy-deep/90 border border-gold/30 backdrop-blur transition-all duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center text-gold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-mono uppercase text-gold-light tracking-wider">
                    Core Focus: {NODES.find((n) => n.id === activeNode)?.label}
                  </h5>
                  <p className="text-sm font-semibold text-white">
                    {NODES.find((n) => n.id === activeNode)?.subtitle}
                  </p>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-lg bg-navy-surface border border-navy-light text-xs font-mono text-gold flex items-center gap-2">
                <span>Output:</span>
                <span className="text-white font-semibold">
                  {NODES.find((n) => n.id === activeNode)?.metric}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom system status bar */}
        <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Zero Shadow Spreadsheets
          </span>
          <span className="text-gray-400">Integrated Architecture</span>
        </div>
      </div>
    </div>
  );
};
