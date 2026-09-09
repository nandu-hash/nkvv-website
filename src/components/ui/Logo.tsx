import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', showTagline = false }) => {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3 group focus:outline-none select-none ${className}`}
      aria-label="NK Velora Ventures (NKVV) Home"
    >
      {/* Official Standard NKVV Circular Gold Emblem */}
      <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-md border border-gold/40 transition-all duration-300 group-hover:scale-105 group-hover:border-gold">
        <Image
          src="/nkvv-icon.png"
          alt="NK Velora Ventures Standard Logo"
          width={40}
          height={40}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div className="flex flex-col justify-center">
        <span className={`font-serif font-bold text-base sm:text-lg tracking-tight leading-tight transition-colors ${
          variant === 'light' ? 'text-white group-hover:text-gold-light' : 'text-navy-deep group-hover:text-gold'
        }`}>
          NK Velora Ventures
        </span>
        {showTagline && (
          <span
            className={`text-[8px] sm:text-[9px] tracking-[0.18em] uppercase font-semibold font-mono ${
              variant === 'light' ? 'text-gold-light' : 'text-gold'
            }`}
          >
            Process Intelligence &amp; Automation
          </span>
        )}
      </div>
    </Link>
  );
};

