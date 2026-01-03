"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { ScrollVelocityTracker, getScrollVelocityTracker } from "@/lib/webgl/ScrollVelocityTracker";

interface UseScrollVelocityOptions {
  enabled?: boolean;
}

interface UseScrollVelocityResult {
  velocity: number;
  direction: number;
  isScrolling: boolean;
}

export function useScrollVelocity(options: UseScrollVelocityOptions = {}): UseScrollVelocityResult {
  const { enabled = true } = options;
  const [velocity, setVelocity] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackerRef = useRef<ScrollVelocityTracker | null>(null);

  const handleVelocityUpdate = useCallback((newVelocity: number) => {
    setVelocity(newVelocity);

    // Track scrolling state
    if (Math.abs(newVelocity) > 0.01) {
      setIsScrolling(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Get or create the velocity tracker
    trackerRef.current = getScrollVelocityTracker();
    const unsubscribe = trackerRef.current.subscribe(handleVelocityUpdate);

    return () => {
      unsubscribe();

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enabled, handleVelocityUpdate]);

  // Use useMemo to reset when disabled
  const result = useMemo<UseScrollVelocityResult>(() => {
    if (!enabled) {
      return { velocity: 0, direction: 0, isScrolling: false };
    }
    return { velocity, direction: Math.sign(velocity), isScrolling };
  }, [enabled, velocity, isScrolling]);

  return result;
}

export function useScrollVelocityRef(
  options: UseScrollVelocityOptions = {}
): React.MutableRefObject<number> {
  const { enabled = true } = options;
  const velocityRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      velocityRef.current = 0;
      return;
    }

    const tracker = getScrollVelocityTracker();
    const unsubscribe = tracker.subscribe((velocity) => {
      velocityRef.current = velocity;
    });

    return () => {
      unsubscribe();
    };
  }, [enabled]);

  return velocityRef;
}
