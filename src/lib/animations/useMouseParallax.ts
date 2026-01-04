"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface ParallaxValues {
  x: number;
  y: number;
}

interface UseMouseParallaxOptions {
  /** Multiplier for the parallax effect (higher = more movement) */
  intensity?: number;
  /** Smoothing factor (0-1, higher = smoother but slower response) */
  smoothing?: number;
  /** Whether to invert the movement direction */
  inverted?: boolean;
}

/**
 * Hook for creating mouse-driven parallax effects.
 * Returns smoothed x,y values based on mouse position relative to viewport center.
 *
 * @example
 * const { x, y } = useMouseParallax({ intensity: 0.02 });
 * <motion.div style={{ x, y }}>Content</motion.div>
 */
export function useMouseParallax(options: UseMouseParallaxOptions = {}): ParallaxValues {
  const { intensity = 0.05, smoothing = 0.1, inverted = false } = options;
  const prefersReducedMotion = useReducedMotion();

  const [position, setPosition] = useState<ParallaxValues>({ x: 0, y: 0 });
  const targetRef = useRef<ParallaxValues>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Smooth interpolation loop
  const animate = useCallback(() => {
    setPosition((prev) => {
      const dx = (targetRef.current.x - prev.x) * smoothing;
      const dy = (targetRef.current.y - prev.y) * smoothing;

      // Stop animating when close enough
      if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
        return targetRef.current;
      }

      return {
        x: prev.x + dx,
        y: prev.y + dy,
      };
    });

    rafRef.current = requestAnimationFrame(animate);
  }, [smoothing]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const offsetX = (e.clientX - centerX) * intensity;
      const offsetY = (e.clientY - centerY) * intensity;

      targetRef.current = {
        x: inverted ? -offsetX : offsetX,
        y: inverted ? -offsetY : offsetY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [intensity, inverted, prefersReducedMotion, animate]);

  // Return zero values if reduced motion is preferred
  if (prefersReducedMotion) {
    return { x: 0, y: 0 };
  }

  return position;
}
