import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'light', className = '', showTagline = true }) => {
  return (
    <Link href="/" className={`flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Official NKVV Logo Image */}
      <div className="relative h-10 w-10 overflow-hidden rounded bg-white p-0.5 shadow-sm border border-gold/30 transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo.jpg"
          alt="NK Velora Ventures Logo"
          width={80}
          height={80}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight text-lg leading-none">
          <span className={variant === 'light' ? 'text-white' : 'text-navy-deep'}>
            NK VELORA
          </span>
          <span className="text-gold">VENTURES</span>
        </div>
        {showTagline && (
          <span
            className={`text-[10px] tracking-widest uppercase font-semibold mt-1 transition-colors ${
              variant === 'light' ? 'text-gold-light/90' : 'text-gold'
            }`}
          >
            Transform • Automate • Elevate
          </span>
        )}
      </div>
    </Link>
  );
};
