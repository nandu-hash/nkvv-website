'use client';

import React from 'react';
import { Users, GitBranch, Cpu, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const NODES = [
  { id: 'diagnose', stage: '01', title: 'Diagnose', desc: 'Find the operational friction.', icon: Users },
  { id: 'design', stage: '02', title: 'Design', desc: 'Build the process architecture.', icon: GitBranch },
  { id: 'enable', stage: '03', title: 'Enable', desc: 'Put people, roles & systems in place.', icon: Cpu },
  { id: 'automate', stage: '04', title: 'Automate', desc: 'Remove repetitive manual work.', icon: Zap },
  { id: 'scale', stage: '05', title: 'Scale', desc: 'Create visibility & operational resilience.', icon: TrendingUp },
];

export const HeroVisual: React.FC = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
        {NODES.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              className="bg-white p-6 border border-border-subtle flex flex-col justify-between group hover:border-gold transition-colors duration-300 relative shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-widest text-gold font-bold">
                    STAGE {node.stage}
                  </span>
                  <div className="w-8 h-8 rounded-none border border-border-subtle flex items-center justify-center text-navy-deep group-hover:bg-gold group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-serif font-bold text-navy-deep uppercase tracking-wide mb-1">
                  {node.title}
                </h3>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  {node.desc}
                </p>
              </div>

              {idx < NODES.length - 1 && (
                <div className="hidden lg:flex items-center justify-end pt-4 mt-4 border-t border-gray-100 text-gray-400">
                  <ArrowRight className="w-3.5 h-3.5 text-gold" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
