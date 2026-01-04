"use client";

import { useCallback, useState, useRef, RefObject, CSSProperties, MouseEvent } from "react";

import { useReducedMotion } from "./useReducedMotion";

interface UseMagneticHoverOptions {
  /** Maximum translation in pixels. Default: 10 */
  maxTranslate?: number;
  /** Maximum rotation in degrees. Default: 8 */
  maxRotate?: number;
  /** Spring stiffness (higher = snappier). Default: 0.15 */
  stiffness?: number;
  /** Whether to apply 3D tilt effect. Default: true */
  enable3D?: boolean;
}

interface UseMagneticHoverResult {
  /** Style object to apply to the element */
  style: CSSProperties;
  /** Event handlers to attach to the element */
  handlers: {
    onMouseMove: (e: MouseEvent<HTMLElement>) => void;
    onMouseLeave: () => void;
  };
}

/**
 * Hook for magnetic hover effect with optional 3D tilt.
 * Creates a magnetic pull toward the cursor with subtle rotation.
 *
 * @param ref - React ref to the target element
 * @param options - Configuration options
 * @returns { style, handlers }
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { style, handlers } = useMagneticHover(ref, { maxRotate: 5 });
 *
 * return (
 *   <div ref={ref} style={style} {...handlers}>
 *     Magnetic content
 *   </div>
 * );
 */
export function useMagneticHover<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: UseMagneticHoverOptions = {}
): UseMagneticHoverResult {
  const { maxTranslate = 10, maxRotate = 8, enable3D = true } = options;

  const [transform, setTransform] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);

  // Detect touch device
  const isTouchDevice = useRef<boolean | null>(null);
  if (isTouchDevice.current === null && typeof window !== "undefined") {
    isTouchDevice.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      // Skip on touch devices or reduced motion
      if (isTouchDevice.current || prefersReducedMotion) {
        return;
      }

      const element = ref.current;
      if (!element) {
        return;
      }

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate normalized position (-1 to 1)
        const normalizedX = (e.clientX - centerX) / (rect.width / 2);
        const normalizedY = (e.clientY - centerY) / (rect.height / 2);

        // Clamp to -1 to 1 range
        const clampedX = Math.max(-1, Math.min(1, normalizedX));
        const clampedY = Math.max(-1, Math.min(1, normalizedY));

        // Calculate translation (pull toward cursor)
        const translateX = clampedX * maxTranslate;
        const translateY = clampedY * maxTranslate;

        // Calculate rotation (tilt away from cursor for 3D depth)
        const rotateY = enable3D ? clampedX * maxRotate : 0;
        const rotateX = enable3D ? -clampedY * maxRotate : 0;

        setTransform({
          x: translateX,
          y: translateY,
          rotateX,
          rotateY,
        });
      });
    },
    [ref, maxTranslate, maxRotate, enable3D, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    // Reset to neutral position
    setTransform({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  }, []);

  // Build style object
  const style: CSSProperties = {
    transform: `perspective(1000px) translateX(${transform.x}px) translateY(${transform.y}px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
    transition:
      transform.x === 0 && transform.y === 0
        ? "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)" // Spring ease on leave
        : "transform 0.1s ease-out", // Quick follow on move
    willChange: "transform",
  };

  // Skip effect entirely for touch/reduced motion
  if (isTouchDevice.current || prefersReducedMotion) {
    return {
      style: {},
      handlers: {
        onMouseMove: () => {},
        onMouseLeave: () => {},
      },
    };
  }

  return {
    style,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
