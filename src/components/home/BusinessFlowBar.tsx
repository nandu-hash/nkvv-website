import React from 'react';
import { ArrowRight } from 'lucide-react';

const NODES = [
  { label: 'PROBLEM', desc: 'Friction identified' },
  { label: 'PROCESS', desc: 'SOPs & workflows' },
  { label: 'SYSTEM', desc: 'Tool architecture' },
  { label: 'AUTOMATION', desc: 'Triggers active' },
  { label: 'IMPACT', desc: 'Predictable scale' },
];

export const BusinessFlowBar: React.FC = () => {
  return (
    <section id="business-flow" className="bg-gray-50 border-b border-border-subtle py-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-navy-deep font-bold shrink-0">
            <span className="w-1.5 h-1.5 bg-gold inline-block" />
            <span>NKVV OPERATING TRANSFORMATION</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono font-semibold">
            {NODES.map((node, idx) => (
              <React.Fragment key={node.label}>
                <div className="px-3.5 py-1.5 bg-white border border-border-subtle text-navy-deep flex items-center gap-1.5 rounded-full shadow-2xs">
                  <span className="text-[10px] text-gold font-bold">0{idx + 1}</span>
                  <span className="tracking-widest">{node.label}</span>
                </div>
                {idx < NODES.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-gold shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
