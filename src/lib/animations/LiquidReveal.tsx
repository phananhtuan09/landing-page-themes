"use client";

import { ReactNode, useId, useRef } from "react";
import { motion } from "framer-motion";

import { useScrollTrigger } from "./useScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

interface LiquidRevealProps {
  /** Content to reveal with liquid animation */
  children: ReactNode;
  /** Delay before animation starts (s). Default: 0 */
  delay?: number;
  /** Duration of the reveal animation (s). Default: 1.2 */
  duration?: number;
  /** Number of wave oscillations. Default: 3 */
  waveCount?: number;
  /** Wave amplitude as percentage of height. Default: 8 */
  waveAmplitude?: number;
  /** Direction of reveal. Default: "up" */
  direction?: "up" | "down";
  /** Additional class name */
  className?: string;
  /** Whether to trigger on scroll into view. Default: true */
  triggerOnView?: boolean;
}

/**
 * LiquidReveal component for liquid mask reveal animations.
 * Creates a wavy SVG clipPath that animates to reveal content.
 *
 * @example
 * <LiquidReveal delay={0.3} duration={1.0}>
 *   <span className="text-8xl font-black">FLOW</span>
 * </LiquidReveal>
 */
export function LiquidReveal({
  children,
  delay = 0,
  duration = 1.2,
  waveCount = 3,
  waveAmplitude = 8,
  direction = "up",
  className = "",
  triggerOnView = true,
}: LiquidRevealProps): ReactNode {
  const id = useId();
  const clipId = `liquid-reveal-${id.replace(/:/g, "")}`;
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { isInView } = useScrollTrigger(containerRef, {
    threshold: 0.3,
    triggerOnce: true,
  });

  const shouldAnimate = triggerOnView ? isInView : true;

  // For reduced motion, show content immediately
  if (prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  // Generate wavy path for the clip mask
  // The path creates a sine wave at the top edge that moves up to reveal content
  const generateWavePath = (progress: number): string => {
    const width = 100;
    const height = 100;

    // Calculate y position based on progress and direction
    const baseY = direction === "up" ? height * (1 - progress) : height * progress;

    // Wave amplitude decreases as reveal completes
    const currentAmplitude = waveAmplitude * (1 - progress * 0.8);

    // Build the wavy top edge path
    const points: string[] = [];
    const segments = 20;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const waveOffset = Math.sin((i / segments) * Math.PI * 2 * waveCount) * currentAmplitude;
      const y = baseY + waveOffset;
      points.push(`${x},${y}`);
    }

    // Complete the clip path
    if (direction === "up") {
      // Start from bottom-left, go along wavy top, then down right side
      return `M0,${height} L${points.join(" L")} L${width},${height} Z`;
    } else {
      // Start from top-left, go along wavy bottom, then up right side
      return `M0,0 L${points.join(" L")} L${width},0 Z`;
    }
  };

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* SVG filter definitions - hidden */}
      <svg
        className="absolute w-0 h-0 overflow-hidden"
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0 }}
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <motion.path
              initial={{ d: generateWavePath(0) }}
              animate={shouldAnimate ? { d: generateWavePath(1) } : { d: generateWavePath(0) }}
              transition={{
                delay,
                duration,
                ease: [0.16, 1, 0.3, 1], // ease-out-expo
              }}
              // Transform to 0-1 coordinate system for objectBoundingBox
              style={{ transform: "scale(0.01)" }}
            />
          </clipPath>
        </defs>
      </svg>

      {/* Content with clip path applied */}
      <span
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
