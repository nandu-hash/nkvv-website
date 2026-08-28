import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { FOOTER_NAV } from '@/config/navigation';
import { MapPin, ArrowUpRight } from 'lucide-react';

// Custom crisp SVG for LinkedIn brand mark
const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-deep text-white border-t border-navy-surface pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-navy-surface/80">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={false} />
            
            <div className="space-y-2 max-w-md pt-2">
              <p className="text-gold font-medium text-sm tracking-wide">
                HR Operations & Automation Transformation
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                NKVV helps startups and growing businesses transform fragmented, manual HR operations into structured, technology-enabled and scalable systems.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 pt-2">
              <MapPin className="w-4 h-4 text-gold shrink-0" />
              <span>Bengaluru, Karnataka, India</span>
            </div>

            <div className="pt-2">
              <a
                href="https://linkedin.com/company/nk-velora-ventures"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-navy-primary hover:bg-navy-light text-gray-300 hover:text-white text-xs font-medium transition-colors border border-navy-surface"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-gold" />
                <span>Follow on LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.solutions.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Future Roadmap */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm mb-6">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Future Modules
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {FOOTER_NAV.futureRoadmap.slice(0, 4).map((mod) => (
                <span
                  key={mod.label}
                  className="inline-block px-2 py-0.5 rounded text-[10px] bg-navy-surface/60 text-gray-400 border border-navy-light/40"
                  title="Architected for future release"
                >
                  {mod.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2026 NK Velora Ventures. All rights reserved.
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
