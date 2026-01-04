"use client";

import { useEffect, useState, useRef, RefObject } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface UseScrollTriggerOptions {
  /** Intersection threshold (0-1). Default: 0.1 (10% visible) */
  threshold?: number;
  /** Root margin for early/late triggering. Default: "0px" */
  rootMargin?: string;
  /** Only trigger once. Default: true */
  triggerOnce?: boolean;
}

interface UseScrollTriggerResult {
  /** Whether element is currently in view */
  isInView: boolean;
  /** Whether animation has been triggered (for once-only animations) */
  hasAnimated: boolean;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer.
 * Respects reduced motion preference - returns immediate true if reduced motion is preferred.
 *
 * @param ref - React ref to the observed element
 * @param options - Configuration options
 * @returns { isInView, hasAnimated }
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { isInView, hasAnimated } = useScrollTrigger(ref, { threshold: 0.2 });
 *
 * return (
 *   <motion.div
 *     ref={ref}
 *     animate={isInView ? "visible" : "hidden"}
 *   />
 * );
 */
export function useScrollTrigger<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseScrollTriggerOptions = {}
): UseScrollTriggerResult {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Store observer ref for cleanup
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // If reduced motion is preferred, skip animations entirely
    if (prefersReducedMotion) {
      setIsInView(true);
      setHasAnimated(true);
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    // Cleanup previous observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const inView = entry.isIntersecting;

      setIsInView(inView);

      if (inView && !hasAnimated) {
        setHasAnimated(true);

        // If triggerOnce, disconnect after first trigger
        if (triggerOnce && observerRef.current) {
          observerRef.current.disconnect();
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, threshold, rootMargin, triggerOnce, hasAnimated, prefersReducedMotion]);

  return { isInView, hasAnimated };
}
