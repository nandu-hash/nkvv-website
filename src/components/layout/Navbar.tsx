'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV_ITEMS } from '@/config/navigation';
import { Logo } from '@/components/ui/Logo';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
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
          : 'bg-navy-deep py-4 border-b border-navy-surface/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Logo variant="light" showTagline={true} />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-gold bg-navy-surface font-semibold border-b-2 border-gold'
                      : 'text-gray-300 hover:text-white hover:bg-navy-primary/60'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-deep bg-gold hover:bg-gold-light transition-all duration-200 shadow-md shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book a Discovery Call</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-navy-primary focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gold" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-deep border-b border-navy-surface px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'text-gold bg-navy-surface font-semibold border-l-4 border-gold'
                      : 'text-gray-300 hover:text-white hover:bg-navy-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-3 border-t border-navy-surface/80">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-base font-semibold text-navy-deep bg-gold hover:bg-gold-light transition-all shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Book a Discovery Call</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
