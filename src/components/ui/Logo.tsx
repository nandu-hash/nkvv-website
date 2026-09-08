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
    <Link href="/" className={`inline-flex items-center gap-3.5 group focus:outline-none ${className}`}>
      {/* Official NKVV Logo Artwork */}
      <div className="relative h-10 w-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo.jpg"
          alt="NK Velora Ventures Logo"
          width={120}
          height={48}
          className="object-contain h-10 w-auto"
          priority
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg leading-tight font-serif">
          <span className={variant === 'light' ? 'text-white' : 'text-navy-deep'}>
            NK Velora Ventures
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] tracking-[0.2em] uppercase font-semibold font-mono ${
              variant === 'light' ? 'text-gold-light' : 'text-gold'
            }`}
          >
            Transform • Automate • Elevate
          </span>
        )}
      </div>
    </Link>
  );
};
