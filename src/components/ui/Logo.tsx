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
      {/* Official NKVV Logo Artwork with upward arrow */}
      <div className="relative h-8 sm:h-9 w-auto flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src={variant === 'light' ? '/nkvv-logo-light.png' : '/nkvv-logo-dark.png'}
          alt="NKVV Brand Mark"
          width={96}
          height={36}
          style={{ height: '32px', width: 'auto', maxHeight: '36px' }}
          className="object-contain"
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

