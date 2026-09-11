'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  logo?: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

export const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#071A33',
  pillColor = '#0A2240',
  hoveredPillTextColor = '#071A33',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? '#FFFFFF';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        if (w === 0 || h === 0) return;

        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 0.4, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 20), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 0.4, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logoEl = logoRef.current;
      const navItems = navItemsRef.current;

      if (logoEl) {
        gsap.set(logoEl, { scale: 0 });
        gsap.to(logoEl, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { opacity: 0, scale: 0.95 });
        gsap.to(navItems, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease,
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.4,
      ease,
      overwrite: 'auto',
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (lines.length >= 2) {
        if (newState) {
          gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
        } else {
          gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
          gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
        }
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center',
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href: string) => href && !isExternalLink(href);

  const cssVars = {
    ['--base' as any]: baseColor,
    ['--pill-bg' as any]: pillColor,
    ['--hover-text' as any]: hoveredPillTextColor,
    ['--pill-text' as any]: resolvedPillTextColor,
    ['--nav-h' as any]: '44px',
    ['--logo' as any]: '36px',
    ['--pill-pad-x' as any]: '16px',
    ['--pill-gap' as any]: '4px',
  } as React.CSSProperties;

  return (
    <div className={`relative z-[100] w-full md:w-auto ${className}`}>
      <nav
        className="w-full md:w-max flex items-center justify-between md:justify-start box-border"
        aria-label="Primary"
        style={cssVars}
      >
        {logo && (
          isRouterLink(items?.[0]?.href) ? (
            <Link
              href={items[0].href}
              aria-label={logoAlt}
              onMouseEnter={handleLogoEnter}
              role="menuitem"
              ref={logoRef}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden shrink-0"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)',
                background: 'var(--base, #071A33)',
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" />
            </Link>
          ) : (
            <a
              href={items?.[0]?.href || '#'}
              aria-label={logoAlt}
              onMouseEnter={handleLogoEnter}
              ref={logoRef}
              className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden shrink-0"
              style={{
                width: 'var(--nav-h)',
                height: 'var(--nav-h)',
                background: 'var(--base, #071A33)',
              }}
            >
              <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-contain block" />
            </a>
          )
        )}

        <div
          ref={navItemsRef}
          className="relative items-center rounded-full hidden md:flex ml-2 border border-gold/20 shadow-sm"
          style={{
            height: 'var(--nav-h)',
            background: 'var(--base, #071A33)',
          }}
        >
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-[3px] h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;

              const pillStyle: React.CSSProperties = {
                background: isActive ? '#C9972B' : 'var(--pill-bg, #0A2240)',
                color: isActive ? '#071A33' : 'var(--pill-text, #FFFFFF)',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)',
              };

              const PillContent = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                    style={{
                      background: '#C9972B',
                      willChange: 'transform',
                    }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative inline-block leading-[1] z-[2]">
                    <span
                      className="pill-label relative z-[2] inline-block leading-[1]"
                      style={{ willChange: 'transform' }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-block font-bold"
                      style={{
                        color: '#071A33',
                        willChange: 'transform, opacity',
                      }}
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[4px] -translate-x-1/2 w-1.5 h-1.5 rounded-full z-[4] bg-white shadow-xs"
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              const basePillClasses =
                'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full box-border font-medium text-[13px] tracking-wide whitespace-nowrap cursor-pointer transition-colors';

              return (
                <li key={item.href} role="none" className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={pillStyle}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {PillContent}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border border-gold/30 flex flex-col items-center justify-center gap-1.5 cursor-pointer p-0 relative shadow-md"
          style={{
            width: 'var(--nav-h)',
            height: 'var(--nav-h)',
            background: 'var(--base, #071A33)',
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-300 bg-gold"
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center transition-all duration-300 bg-gold"
          />
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[3.2em] left-0 right-0 rounded-2xl shadow-2xl z-[998] origin-top border border-gold/30 overflow-hidden"
        style={{
          ...cssVars,
          background: 'var(--base, #071A33)',
        }}
      >
        <ul className="list-none m-0 p-2 flex flex-col gap-1">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            const linkClasses = `block py-2.5 px-4 text-sm font-medium rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-gold text-navy-deep font-bold'
                : 'text-gray-200 hover:bg-navy-surface hover:text-gold'
            }`;

            return (
              <li key={item.href}>
                {isRouterLink(item.href) ? (
                  <Link
                    href={item.href}
                    className={linkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={linkClasses}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
