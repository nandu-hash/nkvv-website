'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Menu, X, Moon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'How We Work', href: '/how-we-work' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
        scrolled ? 'py-4 shadow-sm border-b border-gray-100' : 'py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Title */}
          <Logo variant="dark" showTagline={false} />

          {/* Centered Minimalist Editorial Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-navy-deep font-bold underline underline-offset-8 decoration-gold decoration-2'
                      : 'text-gray-600 hover:text-navy-deep'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Theme toggle + Pill button */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              type="button"
              aria-label="Toggle dark mode"
              className="p-2 text-gray-600 hover:text-navy-deep transition-colors focus:outline-none rounded-full hover:bg-gray-100"
            >
              <Moon className="w-4 h-4" />
            </button>

            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-navy-deep border border-navy-deep rounded-full hover:bg-navy-deep hover:text-white transition-all duration-300 shadow-2xs"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              type="button"
              aria-label="Toggle dark mode"
              className="p-1.5 text-gray-600 hover:text-navy-deep focus:outline-none sm:hidden"
            >
              <Moon className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-800 hover:text-navy-deep focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-lg">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-base font-medium transition-colors ${
                    isActive ? 'text-navy-deep font-bold underline decoration-gold' : 'text-gray-700 hover:text-navy-deep'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/contact"
              className="w-full flex items-center justify-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-navy-deep hover:bg-gold hover:text-navy-deep transition-colors rounded-full"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
