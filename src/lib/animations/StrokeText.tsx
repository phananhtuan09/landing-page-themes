"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface StrokeTextProps {
  /** Text to display with stroke animation */
  children: string;
  /** Delay before animation starts (s) */
  delay?: number;
  /** Duration for the full drawing animation (s) */
  duration?: number;
  /** Additional class name */
  className?: string;
}

/**
 * StrokeText - Animates outlined text with a horizontal reveal effect.
 * The text "draws" itself from left to right, simulating a pen stroke.
 * On hover, the text fills with color.
 *
 * @example
 * <StrokeText delay={0.3} duration={1.5}>
 *   DYNAMICS
 * </StrokeText>
 */
export function StrokeText({
  children,
  delay = 0,
  duration = 1.5,
  className = "",
}: StrokeTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // For reduced motion, show text immediately
  if (prefersReducedMotion) {
    return (
      <span className={`accent-text-outlined ${className}`}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-block relative ${className}`}
      aria-label={children}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "default",
        paddingRight: "0.05em", // Extra space for stroke width
      }}
    >
      {/* Hidden text for screen readers */}
      <span className="sr-only">{children}</span>

      {/* Base text - provides layout with stroke width */}
      <span
        aria-hidden="true"
        className="accent-text-outlined"
        style={{
          display: "inline-block",
          opacity: 0,
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>

      {/* Outlined text layer - always visible */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0 accent-text-outlined"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
        initial={{
          clipPath: "inset(0 100% 0 0)",
        }}
        animate={{
          clipPath: "inset(0 -5% 0 0)", // Slight overflow to ensure full text shows
        }}
        transition={{
          delay: delay,
          duration: duration,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {children}
      </motion.span>

      {/* Filled text layer - appears on hover with left-to-right reveal */}
      <motion.span
        aria-hidden="true"
        className="absolute left-0 top-0"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          color: "var(--liquid-accent)",
          WebkitTextStroke: "0px transparent",
        }}
        initial={{
          clipPath: "inset(0 100% 0 0)",
        }}
        animate={{
          clipPath: isHovered ? "inset(0 -5% 0 0)" : "inset(0 100% 0 0)",
        }}
        transition={{
          duration: 0.4,
          ease: [0.65, 0, 0.35, 1],
        }}
      >
        {children}
      </motion.span>

      {/* Cursor/pen indicator for initial draw animation */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-[3px]"
        style={{
          backgroundColor: "var(--liquid-accent)",
          opacity: 0.8,
        }}
        initial={{
          left: "0%",
          opacity: 0,
        }}
        animate={{
          left: "100%",
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          delay: delay,
          duration: duration,
          ease: [0.65, 0, 0.35, 1],
          opacity: {
            delay: delay,
            duration: duration,
            times: [0, 0.05, 0.9, 1],
          },
        }}
      />
    </span>
  );
}
