'use client';

import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from 'react';

export interface NodeItem {
  content?: ReactNode;
  label?: string;
  icon?: ReactNode;
}

export interface CenterFlowProps {
  nodeItems?: NodeItem[];
  centerContent?: ReactNode;
  centerSize?: number;
  nodeSize?: number;
  pulseDuration?: number;
  pulseInterval?: number;
  pulseLength?: number;
  lineWidth?: number;
  pulseWidth?: number;
  pulseSoftness?: number;
  lineColor?: string;
  lineColorLight?: string;
  pulseColor?: string;
  pulseColorLight?: string;
  glowColor?: string;
  glowColorLight?: string;
  maxGlowIntensity?: number;
  glowDecay?: number;
  borderRadius?: number;
  nodeDistance?: number;
  disableBlinking?: boolean;
  className?: string;
}

interface Point {
  x: number;
  y: number;
}

interface ActivePulse {
  id: string;
  pathIndex: number;
  startTime: number;
}

interface RenderedPulse {
  id: string;
  d: string;
  opacity: number;
  startPoint: Point;
  endPoint: Point;
}

const defaultNodeItems: NodeItem[] = Array(8).fill({});

const createCurvedPath = (start: Point, end: Point): string => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return `M ${start.x} ${start.y} C ${start.x + 0.4 * dx} ${start.y + 0.1 * dy}, ${start.x + 0.6 * dx} ${end.y - 0.1 * dy}, ${end.x} ${end.y}`;
};

export const CenterFlow: React.FC<CenterFlowProps> = ({
  nodeItems = defaultNodeItems,
  centerContent,
  centerSize = 120,
  nodeSize = 60,
  pulseDuration = 5,
  pulseInterval = 6,
  pulseLength = 0.35,
  lineWidth = 2,
  pulseWidth = 2,
  pulseSoftness = 10,
  lineColor = 'rgba(212, 175, 55, 0.2)',
  lineColorLight = 'rgba(212, 175, 55, 0.3)',
  pulseColor = '#E5C07B',
  pulseColorLight = '#D4AF37',
  glowColor = '#D4AF37',
  glowColorLight = '#D4AF37',
  maxGlowIntensity = 25,
  glowDecay = 0.95,
  borderRadius = 32,
  nodeDistance = 0.72,
  disableBlinking = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerNodeRef = useRef<HTMLDivElement>(null);
  const glowIntensityRef = useRef<number>(0);
  const pathElementsMap = useRef<Map<number, SVGPathElement>>(new Map());

  // Detect dark/light mode
  const [isLight, setIsLight] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkClass = document.documentElement.classList.contains('dark');
      setIsLight(!isDarkClass);
    }
  }, []);

  const totalNodes = Math.max(2, Math.min(14, nodeItems.length));
  const activeLineColor = isLight ? lineColorLight : lineColor;
  const activePulseColor = isLight ? pulseColorLight : pulseColor;
  const activeGlowColor = isLight ? glowColorLight : glowColor;

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 800,
    height: 600,
  });

  const [activePulses, setActivePulses] = useState<ActivePulse[]>([]);
  const [renderedPulses, setRenderedPulses] = useState<RenderedPulse[]>([]);

  // Radial node relative layout (%)
  const radialCoords = useMemo(() => {
    const count = Math.max(2, Math.min(14, totalNodes));
    const coords: Point[] = new Array(count);
    const step = (2 * Math.PI) / count;
    const radius = 45 * nodeDistance;

    for (let i = 0; i < count; i++) {
      const angle = i * step - Math.PI / 2;
      coords[i] = {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius,
      };
    }
    return coords;
  }, [totalNodes, nodeDistance]);

  const centerPoint = useMemo<Point>(
    () => ({
      x: dimensions.width / 2,
      y: dimensions.height / 2,
    }),
    [dimensions]
  );

  const absoluteNodePoints = useMemo<Point[]>(
    () =>
      radialCoords.map((coord) => ({
        x: (coord.x / 100) * dimensions.width,
        y: (coord.y / 100) * dimensions.height,
      })),
    [radialCoords, dimensions]
  );

  const softnessFactor = pulseSoftness / 10;
  const gradStopMid1 = 30 * softnessFactor;
  const gradStopMid2 = 100 - 20 * softnessFactor;

  // Track container dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Center node glow trigger when a pulse reaches center
  const triggerCenterGlow = useCallback(() => {
    if (!disableBlinking) {
      glowIntensityRef.current = Math.min(
        glowIntensityRef.current + 0.6 * maxGlowIntensity,
        maxGlowIntensity
      );
    }
  }, [maxGlowIntensity, disableBlinking]);

  // Animate center glow decay
  useEffect(() => {
    let animFrame: number;
    const animateGlow = () => {
      if (centerNodeRef.current) {
        const curr = glowIntensityRef.current;
        const total = 35 + curr;
        const blurRadius = 0.8 * total;
        const spreadRadius = 1.4 * total;
        const hexAlpha = Math.min(255, Math.floor(4 * total))
          .toString(16)
          .padStart(2, '0');

        centerNodeRef.current.style.boxShadow = `0 0 ${spreadRadius}px ${blurRadius}px ${activeGlowColor}35, 0 0 ${
          2 * spreadRadius
        }px ${1.5 * blurRadius}px ${activeGlowColor}15, inset 0 0 ${0.5 * spreadRadius}px ${activeGlowColor}25`;
        centerNodeRef.current.style.borderColor = `${activeGlowColor}${hexAlpha}`;

        glowIntensityRef.current = curr > 0.5 ? curr * glowDecay : 0;
      }
      animFrame = requestAnimationFrame(animateGlow);
    };

    animFrame = requestAnimationFrame(animateGlow);
    return () => cancelAnimationFrame(animFrame);
  }, [activeGlowColor, glowDecay]);

  // Spawning pulses at intervals
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    const schedulePulse = (index: number) => {
      setActivePulses((prev) => [
        ...prev,
        {
          id: `${index}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
          pathIndex: index,
          startTime: Date.now(),
        },
      ]);

      const nextDelay = 1000 * pulseInterval * (0.65 + 0.7 * Math.random());
      const t = setTimeout(() => schedulePulse(index), nextDelay);
      timers.push(t);
    };

    absoluteNodePoints.forEach((_, idx) => {
      const initialDelay = Math.random() * pulseInterval * 800;
      const t = setTimeout(() => schedulePulse(idx), initialDelay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [absoluteNodePoints, pulseInterval]);

  // Clean expired pulses & trigger glow
  useEffect(() => {
    let animFrame: number;
    const durationMs = 1000 * pulseDuration;

    const tick = () => {
      const now = Date.now();
      setActivePulses((prev) =>
        prev.filter((pulse) => {
          const isComplete = (now - pulse.startTime) / durationMs >= 1;
          if (isComplete) {
            triggerCenterGlow();
            return false;
          }
          return true;
        })
      );
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
  }, [pulseDuration, triggerCenterGlow]);

  // Reset cached paths on points change
  useEffect(() => {
    pathElementsMap.current.clear();
  }, [absoluteNodePoints, centerPoint]);

  // Compute rendered pulse segments along curves
  useEffect(() => {
    let animFrame: number;
    const durationMs = 1000 * pulseDuration;

    const renderTick = () => {
      const now = Date.now();
      const nextRendered: RenderedPulse[] = [];

      for (const pulse of activePulses) {
        const startPt = absoluteNodePoints[pulse.pathIndex];
        if (!startPt) continue;

        let pathEl = pathElementsMap.current.get(pulse.pathIndex);
        if (!pathEl) {
          pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          pathEl.setAttribute('d', createCurvedPath(startPt, centerPoint));
          pathElementsMap.current.set(pulse.pathIndex, pathEl);
        }

        const progress = Math.min((now - pulse.startTime) / durationMs, 1);
        if (progress <= 0 || progress >= 1) continue;

        const totalLen = pathEl.getTotalLength();
        const startProgress = Math.max(0, progress - pulseLength);
        const samplePoints: Point[] = [];

        for (let step = 0; step <= 8; step++) {
          const pt = pathEl.getPointAtLength(
            totalLen * (startProgress + (step / 8) * (progress - startProgress))
          );
          samplePoints.push({ x: pt.x, y: pt.y });
        }

        if (samplePoints.length < 2) continue;

        const opacity =
          Math.min(1, progress / 0.15) * Math.min(1, (1 - progress) / 0.15);

        nextRendered.push({
          id: pulse.id,
          d:
            `M ${samplePoints[0].x} ${samplePoints[0].y}` +
            samplePoints
              .slice(1)
              .map((p) => ` L ${p.x} ${p.y}`)
              .join(''),
          opacity,
          startPoint: samplePoints[0],
          endPoint: samplePoints[samplePoints.length - 1],
        });
      }

      setRenderedPulses(nextRendered);
      animFrame = requestAnimationFrame(renderTick);
    };

    animFrame = requestAnimationFrame(renderTick);
    return () => cancelAnimationFrame(animFrame);
  }, [activePulses, absoluteNodePoints, centerPoint, pulseDuration, pulseLength]);

  const outerNodeStyle = useMemo(
    () => ({
      borderRadius: `${0.55 * borderRadius}px`,
      background: isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 26, 47, 0.9)',
      backdropFilter: 'blur(10px)',
      border: isLight
        ? '1px solid rgba(212, 175, 55, 0.35)'
        : '1px solid rgba(212, 175, 55, 0.25)',
      boxShadow: isLight
        ? '0 4px 16px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(212, 175, 55, 0.1)'
        : '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(212, 175, 55, 0.05)',
    }),
    [borderRadius, isLight]
  );

  const centerNodeStyle = useMemo(
    () => ({
      left: `${centerPoint.x}px`,
      top: `${centerPoint.y}px`,
      width: `${centerSize}px`,
      height: `${centerSize}px`,
      borderRadius: `${borderRadius}px`,
      background: isLight ? 'rgba(255, 255, 255, 0.98)' : 'rgba(7, 20, 38, 0.96)',
      backdropFilter: 'blur(14px)',
      border: `2px solid ${activeGlowColor}30`,
      boxShadow: `0 0 24px 6px ${activeGlowColor}15`,
    }),
    [centerPoint, centerSize, borderRadius, activeGlowColor, isLight]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] md:min-h-[520px] overflow-hidden ${className}`}
      style={{ background: 'transparent' }}
    >
      {/* Connecting SVG Flow Paths & Animated Pulses */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {renderedPulses.map((pulse) => (
            <linearGradient
              key={`grad-${pulse.id}`}
              id={`pulse-grad-${pulse.id}`}
              x1={pulse.startPoint.x}
              y1={pulse.startPoint.y}
              x2={pulse.endPoint.x}
              y2={pulse.endPoint.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={activePulseColor} stopOpacity="0" />
              <stop offset={`${gradStopMid1}%`} stopColor={activePulseColor} stopOpacity="1" />
              <stop offset={`${gradStopMid2}%`} stopColor={activePulseColor} stopOpacity="1" />
              <stop offset="100%" stopColor={activePulseColor} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Static Base Curved Connection Lines */}
        {absoluteNodePoints.map((pt, idx) => (
          <path
            key={idx}
            d={createCurvedPath(pt, centerPoint)}
            fill="none"
            stroke={activeLineColor}
            strokeWidth={lineWidth}
            strokeLinecap="round"
          />
        ))}

        {/* Traveling Light Pulses */}
        {renderedPulses.map((pulse) => (
          <g key={pulse.id}>
            {/* Glow halo path */}
            <path
              d={pulse.d}
              fill="none"
              stroke={`url(#pulse-grad-${pulse.id})`}
              strokeWidth={3 * pulseWidth}
              strokeLinecap="round"
              opacity={0.45 * pulse.opacity}
              filter="url(#pulseGlow)"
            />
            {/* Core sharp laser pulse */}
            <path
              d={pulse.d}
              fill="none"
              stroke={`url(#pulse-grad-${pulse.id})`}
              strokeWidth={pulseWidth}
              strokeLinecap="round"
              opacity={pulse.opacity}
            />
          </g>
        ))}
      </svg>

      {/* Surrounding Perimeter Nodes */}
      {absoluteNodePoints.map((pt, idx) => {
        const item = nodeItems[idx];
        return (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 cursor-pointer"
            style={{
              left: `${pt.x}px`,
              top: `${pt.y}px`,
              width: `${nodeSize}px`,
              height: `${nodeSize}px`,
              ...outerNodeStyle,
            }}
          >
            {item?.content ? (
              item.content
            ) : (
              <div
                className="w-3.5 h-3.5 rounded-full"
                style={{
                  background: `${activePulseColor}50`,
                  boxShadow: `0 0 10px ${activePulseColor}40`,
                }}
              />
            )}
          </div>
        );
      })}

      {/* Center Core Hub Node */}
      <div
        ref={centerNodeRef}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 z-20 cursor-default"
        style={centerNodeStyle}
      >
        <div
          className="flex items-center justify-center p-3 text-center"
          style={{ width: `${0.85 * centerSize}px`, height: `${0.85 * centerSize}px` }}
        >
          {centerContent !== undefined ? (
            centerContent
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-1">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-8 h-8 text-gold"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                VELORA
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CenterFlow;
