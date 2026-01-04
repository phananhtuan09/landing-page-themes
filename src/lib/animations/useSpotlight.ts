"use client";

import { useRef, useState, useCallback, RefObject } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface SpotlightPosition {
  x: number;
  y: number;
}

interface UseSpotlightOptions {
  /** Spotlight color in rgba format */
  color?: string;
  /** Spotlight radius in pixels */
  radius?: number;
}

interface UseSpotlightReturn {
  ref: RefObject<HTMLDivElement | null>;
  spotlightStyle: React.CSSProperties;
  handlers: {
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };
}

export function useSpotlight(options: UseSpotlightOptions = {}): UseSpotlightReturn {
  const { color = "rgba(217, 83, 79, 0.08)", radius = 600 } = options;

  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState<SpotlightPosition>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) {
      setOpacity(1);
    }
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  const spotlightStyle: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        position: "absolute",
        inset: "-1px",
        pointerEvents: "none",
        opacity,
        background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${color}, transparent 40%)`,
        transition: "opacity 300ms ease",
      };

  return {
    ref,
    spotlightStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleMouseEnter,
      onBlur: handleMouseLeave,
    },
  };
}
