'use client';

import React from 'react';

interface GoldenSpiralProps {
  className?: string;
  variant?: 'hero' | 'flow' | 'subtle';
}

/**
 * GoldenSpiral: Lightweight, vector-based SVG Golden Ratio (φ ≈ 1.618) spiral and Fibonacci curve.
 * Strictly designed as an architectural, technical watermark.
 * Minimal, lightweight, zero runtime external libraries.
 */
export const GoldenSpiral: React.FC<GoldenSpiralProps> = ({
  className = '',
  variant = 'hero',
}) => {
  if (variant === 'subtle') {
    return (
      <svg
        viewBox="0 0 500 309"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`pointer-events-none select-none ${className}`}
      >
        {/* Fibonacci Subdivision Rectangles: 191 x 118, 118 x 73, 73 x 45, etc. */}
        <rect x="0.5" y="0.5" width="499" height="308" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4" />
        <line x1="309" y1="0" x2="309" y2="309" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="309" y1="191" x2="500" y2="191" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
        <line x1="427" y1="191" x2="427" y2="309" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />

        {/* Elegant Logarithmic Spiral Path */}
        <path
          d="M0,309 C170,309 309,170 309,0 C309,105 414,191 500,191 C460,191 427,243 427,272"
          stroke="currentColor"
          strokeWidth="1.25"
          opacity="0.6"
        />
      </svg>
    );
  }

  if (variant === 'flow') {
    return (
      <svg
        viewBox="0 0 1000 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={`pointer-events-none select-none w-full h-auto ${className}`}
      >
        <path
          d="M 50 60 Q 250 15, 500 60 T 950 60"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          opacity="0.35"
        />
        <circle cx="50" cy="60" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="275" cy="40" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="500" cy="60" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="725" cy="80" r="3" fill="currentColor" opacity="0.6" />
        <circle cx="950" cy="60" r="3" fill="currentColor" opacity="0.6" />
      </svg>
    );
  }

  // Default: Hero Architectural Watermark
  return (
    <div className={`pointer-events-none select-none relative ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 494"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        <defs>
          <linearGradient id="spiralGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9972B" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#C9972B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Proportional Grid Guides (1 : 1.618) */}
        <rect x="0.5" y="0.5" width="799" height="493" stroke="url(#spiralGoldGrad)" strokeWidth="0.75" />
        <line x1="494" y1="0" x2="494" y2="494" stroke="url(#spiralGoldGrad)" strokeWidth="0.75" strokeDasharray="2 4" />
        <line x1="494" y1="305" x2="800" y2="305" stroke="url(#spiralGoldGrad)" strokeWidth="0.75" strokeDasharray="2 4" />
        <line x1="683" y1="305" x2="683" y2="494" stroke="url(#spiralGoldGrad)" strokeWidth="0.75" strokeDasharray="2 4" />

        {/* Primary Logarithmic Golden Spiral Curve */}
        <path
          d="M 0 494 C 272 494 494 272 494 0 C 494 168 630 305 798 305 C 735 305 683 389 683 440 C 683 470 726 494 754 494"
          stroke="url(#spiralGoldGrad)"
          strokeWidth="1.5"
        />

        {/* Subtle Node Accents at Golden Intersections */}
        <circle cx="494" cy="305" r="3" fill="#C9972B" opacity="0.4" />
        <circle cx="683" cy="440" r="2.5" fill="#C9972B" opacity="0.3" />
      </svg>
    </div>
  );
};
