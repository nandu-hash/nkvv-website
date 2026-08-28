import React from 'react';
import Link from 'next/link';
import { PhoneCall, ArrowRight, CheckCircle2 } from 'lucide-react';

export const FinalCta: React.FC = () => {
  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-navy-primary via-navy-deep to-navy-deep text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/15 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-surface border border-gold/40 text-gold-light text-xs font-mono font-bold uppercase tracking-wider">
          Get Started Today
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Ready to build HR operations that scale?
        </h2>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          Schedule a discovery call with our principal team. We&apos;ll evaluate your current HR processes, technology utilization, and automation opportunities.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-navy-deep bg-gold hover:bg-gold-light transition-all shadow-xl shadow-gold/20 transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Book a Discovery Call</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-white bg-navy-surface hover:bg-navy-light border border-navy-light/60 transition-all"
          >
            <span>Explore Our Capabilities</span>
          </Link>
        </div>

        {/* Benefits bullets */}
        <div className="pt-6 border-t border-navy-surface flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            30-Minute Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            No-Obligation Operational Audit
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-gold" />
            Direct Founder & Principal Access
          </span>
        </div>

      </div>
    </section>
  );
};
