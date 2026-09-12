'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Menu, X, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'How We Work', href: '/how-we-work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-navy-deep/95 backdrop-blur-md py-3 shadow-xl border-b border-navy-surface/80'
          : 'bg-navy-deep py-4 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Official NKVV Mark */}
          <Logo variant="light" showTagline={false} />

          {/* Desktop Navigation Links matching Image 2 */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white font-semibold border-b-2 border-gold pb-1.5'
                      : 'text-gray-300 hover:text-white hover:text-gold-light'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Book a Discovery Call matching Image 2 */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-deep bg-gold hover:bg-gold-light transition-all duration-200 shadow-md shadow-gold/10 hover:shadow-gold/20 active:scale-95"
            >
              Connect With Us
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-navy-surface/60 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-deep/98 border-b border-navy-surface/80 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col space-y-2">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-gold bg-navy-surface font-semibold border-l-4 border-gold'
                      : 'text-gray-200 hover:text-white hover:bg-navy-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 border-t border-navy-surface/60">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center px-5 py-3 text-sm font-semibold text-navy-deep bg-gold hover:bg-gold-light transition-colors rounded-lg shadow-md"
            >
              Connect With Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
