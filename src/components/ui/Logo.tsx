import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', showTagline = false }) => {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-3.5 group focus:outline-none select-none ${className}`}
      aria-label="NK Velora Ventures (NKVV) Home"
    >
      {/* Official NKVV Logo Artwork with fixed aspect ratio box */}
      <div className="relative h-9 sm:h-10 w-auto flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
        <Image
          src="/logo.jpg"
          alt="NKVV Brand Mark"
          width={100}
          height={40}
          style={{ height: 'auto', maxHeight: '40px', width: 'auto' }}
          className="object-contain rounded-xs"
          priority
        />
      </div>

      <div className="flex flex-col justify-center">
        {/* Visually prioritize NKVV with NK Velora Ventures as formal identity */}
        <div className="flex items-baseline gap-1.5 tracking-tight leading-tight">
          <span className={`font-serif font-black text-lg tracking-wider ${
            variant === 'light' ? 'text-white' : 'text-navy-deep'
          }`}>
            NKVV
          </span>
          <span className={`hidden sm:inline font-serif font-normal text-xs opacity-75 ${
            variant === 'light' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            • NK Velora Ventures
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold font-mono ${
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

