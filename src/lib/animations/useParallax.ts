"use client";

import { useEffect, useState, useRef, RefObject, CSSProperties } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface UseParallaxOptions {
  /** Speed factor: 0.1 = 10% of scroll speed, negative = opposite direction */
  speed?: number;
  /** Whether to use will-change optimization. Default: true */
  willChange?: boolean;
}

interface UseParallaxResult {
  /** Style object to apply to the element */
  style: CSSProperties;
  /** Current parallax offset in pixels */
  offset: number;
}

/**
 * Hook for scroll-based parallax effect.
 * Creates depth by moving elements at different scroll speeds.
 *
 * @param ref - React ref to the target element
 * @param options - Configuration options
 * @returns { style, offset }
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { style } = useParallax(ref, { speed: 0.1 });
 *
 * return (
 *   <div ref={ref} style={style}>
 *     Parallax content
 *   </div>
 * );
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseParallaxOptions = {}
): UseParallaxResult {
  const { speed = 0.1, willChange = true } = options;

  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const boundHandleScroll = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Skip parallax for reduced motion preference
    if (prefersReducedMotion) {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how far element is from center of viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        const distanceFromCenter = elementCenter - viewportCenter;

        // Apply parallax offset
        const parallaxOffset = distanceFromCenter * speed * -1;

        setOffset(parallaxOffset);
      });
    };

    // Bind handler for cleanup
    boundHandleScroll.current = handleScroll;

    // Initial calculation
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (boundHandleScroll.current) {
        window.removeEventListener("scroll", boundHandleScroll.current);
      }
    };
  }, [ref, speed, prefersReducedMotion]);

  // Build style object
  const style: CSSProperties = prefersReducedMotion
    ? {}
    : {
        transform: `translateY(${offset}px)`,
        willChange: willChange ? "transform" : undefined,
      };

  return { style, offset };
}
