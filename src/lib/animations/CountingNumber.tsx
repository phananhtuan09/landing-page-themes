"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

import { useReducedMotion } from "@/lib/animations/useReducedMotion";

interface CountingNumberProps {
  value: string;
  /** Animation duration in seconds. Default: 2 */
  duration?: number;
  /** Delay before animation starts in seconds. Default: 0 */
  delay?: number;
  /** Whether to trigger the animation. Default: true */
  isActive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Animated counting number component.
 * Parses numeric value from string (e.g., "500+", "98%", "24h")
 * and animates from 0 to the target value.
 */
export function CountingNumber({
  value,
  duration = 2,
  delay = 0,
  isActive = true,
  className = "",
  style,
}: CountingNumberProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);
  const hasTriggered = useRef(false);

  // Parse numeric value and suffix from string
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = value.replace(/^\d+/, "");

  // Spring animation for smooth counting
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) => Math.round(latest));
  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    const unsubscribe = displayValue.on("change", (v) => {
      setDisplayNumber(v);
    });
    return unsubscribe;
  }, [displayValue]);

  useEffect(() => {
    if (!isActive || hasTriggered.current || prefersReducedMotion) return;

    const timer = setTimeout(() => {
      hasTriggered.current = true;
      setHasStarted(true);
      springValue.set(numericValue);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isActive, delay, numericValue, springValue, prefersReducedMotion]);

  // Show final value immediately for reduced motion
  if (prefersReducedMotion) {
    return (
      <span className={className} style={style}>
        {value}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      {hasStarted ? displayNumber : 0}
      {suffix}
    </motion.span>
  );
}
