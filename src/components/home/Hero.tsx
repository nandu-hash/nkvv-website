import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-6 pt-36 pb-10 sm:pt-44 sm:pb-14 overflow-hidden bg-navy-deep">
      {/* Background Image: Alpine Mountain Peaks & Sea of Clouds */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="NK Velora Ventures Alpine Mountain Horizon"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />
        {/* Cinematic Vignette Overlay matching reference mood */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-navy-deep/45 to-navy-deep/85 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-navy-deep/30 pointer-events-none" />
      </div>

      {/* Top spacer to balance vertical layout */}
      <div className="w-full max-w-7xl mx-auto z-10" />

      {/* Center Main Stage Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Eyebrow: Uppercase Spaced Brand Tagline */}
        <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-white/80 font-semibold mb-6 drop-shadow-sm">
          NK VELORA VENTURES
        </p>

        {/* Primary Headline: Bold Serif + Italic Serif Contrast */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white tracking-tight leading-[1.05] drop-shadow-md">
          Transforming Operations
          <span className="block italic font-serif font-normal text-white drop-shadow-lg mt-1 sm:mt-2">
            Architecting Scale
          </span>
        </h1>

        {/* Gold Horizontal Divider Accent */}
        <div className="w-14 sm:w-16 h-[2px] bg-gold mx-auto my-7 rounded-full shadow-sm" />

        {/* Subtitle Paragraph */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-white/90 font-light leading-relaxed drop-shadow-sm mb-10 px-4">
          Fine art process architecture and HR workflow automation that transforms fragmented operations into structured, scalable systems.
        </p>

        {/* Pill CTA Button */}
        <Link
          href="/solutions"
          className="inline-flex items-center justify-center rounded-full border border-white/45 bg-white/10 hover:bg-white hover:text-navy-deep text-white px-8 sm:px-10 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase backdrop-blur-md transition-all duration-300 shadow-xl group"
        >
          <span>View Solutions</span>
        </Link>
      </div>

      {/* Bottom Scroll Indicator Arrow */}
      <div className="relative z-10 pt-8 pb-2 flex flex-col items-center">
        <a
          href="#business-flow"
          aria-label="Scroll down to explore operations"
          className="text-white/60 hover:text-white transition-colors duration-200 p-2 focus:outline-none"
        >
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
