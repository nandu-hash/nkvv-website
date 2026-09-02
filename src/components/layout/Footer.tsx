import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { FOOTER_NAV } from '@/config/navigation';
import { MapPin, ArrowUpRight } from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-dark text-white border-t border-border-subtle/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-border-subtle/20">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Logo variant="light" showTagline={false} />
            
            <div className="space-y-4 max-w-sm pt-2">
              <p className="text-gold font-bold text-xs uppercase tracking-widest">
                Transform. Automate. Elevate.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                NKVV helps growing businesses transform fragmented and manual operations into structured, technology-enabled and scalable systems.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-gray-400 pt-4">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span className="uppercase tracking-widest font-mono">Bengaluru, India</span>
            </div>

            <div className="pt-4">
              <a
                href="https://linkedin.com/company/nk-velora-ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2 border border-border-subtle/20 hover:border-gold/50 bg-navy-primary hover:bg-navy-dark text-gray-300 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-gold" />
                <span>Follow on LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-gray-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
              Services
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {FOOTER_NAV.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
              Solutions
            </h4>
            <ul className="space-y-3 text-sm font-light">
              {FOOTER_NAV.solutions.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Future Roadmap */}
          <div>
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm font-light mb-8">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-widest text-gray-500">
          <div>
            © 2026 NK Velora Ventures
          </div>

          <div className="flex items-center space-x-6">
            {FOOTER_NAV.legal.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
