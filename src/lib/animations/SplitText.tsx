"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

import { useReducedMotion } from "./useReducedMotion";

type SplitType = "chars" | "words";
type AnimationStyle = "default" | "heavy" | "light";

interface SplitTextProps {
  /** Text content to animate */
  children: string;
  /** How to split the text */
  type?: SplitType;
  /** Delay between each animated unit (ms). Default: 40 for chars, 100 for words */
  stagger?: number;
  /** Initial delay before animation starts (s). Default: 0 */
  delay?: number;
  /** Duration for each unit's animation (s). Default: 0.6 */
  duration?: number;
  /** Additional class name for the container */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
  /** Animation style: heavy for block-settling, light for subtle */
  animationStyle?: AnimationStyle;
}

const charVariants: Variants = {
  hidden: {
    y: 20,
    opacity: 0,
    rotateX: -15,
  },
  visible: (custom: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: custom,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
    },
  }),
};

/**
 * SplitText component for character or word-level entrance animations.
 * Characters/words slide up with rotation and snap into place.
 *
 * @example
 * <SplitText type="chars" stagger={40} className="text-8xl font-black">
 *   FLUID
 * </SplitText>
 */
// Animation presets based on style
const getAnimationConfig = (style: AnimationStyle) => {
  switch (style) {
    case "heavy":
      return {
        yOffset: 100, // Characters rise from further below like heavy blocks
        rotateX: -40, // More dramatic rotation
        scale: 0.9, // Slight scale for weight feel
      };
    case "light":
      return {
        yOffset: 10,
        rotateX: -5,
        scale: 1,
      };
    default:
      return {
        yOffset: 20,
        rotateX: -15,
        scale: 1,
      };
  }
};

export function SplitText({
  children,
  type = "chars",
  stagger,
  delay = 0,
  duration = 0.6,
  className = "",
  ariaLabel,
  animationStyle = "default",
}: SplitTextProps): ReactNode {
  const prefersReducedMotion = useReducedMotion();

  // Default stagger based on type and style
  const defaultStagger = animationStyle === "heavy" ? 80 : type === "chars" ? 40 : 100;
  const staggerDelay = stagger ?? defaultStagger;
  const staggerSeconds = staggerDelay / 1000;

  // Get animation config based on style
  const animConfig = getAnimationConfig(animationStyle);

  // Split text into units
  const units = type === "chars" ? children.split("") : children.split(/(\s+)/);

  // For reduced motion, render text immediately without animation
  if (prefersReducedMotion) {
    return (
      <span className={className} aria-label={ariaLabel}>
        {children}
      </span>
    );
  }

  return (
    <span
      className={`inline-block ${className}`}
      aria-label={ariaLabel || children}
      style={{ perspective: "1000px" }}
    >
      {/* Hidden text for screen readers */}
      <span className="sr-only">{children}</span>

      {/* Animated text (aria-hidden to prevent double reading) */}
      <span aria-hidden="true" className="inline-block">
        {units.map((unit, index) => {
          // Preserve whitespace
          if (unit.match(/^\s+$/)) {
            return (
              <span key={`space-${index}`} className="inline-block">
                &nbsp;
              </span>
            );
          }

          const customDelay = delay + index * staggerSeconds;

          return (
            <motion.span
              key={`${unit}-${index}`}
              className="inline-block origin-bottom"
              style={{
                transformStyle: "preserve-3d",
                display: "inline-block",
              }}
              initial="hidden"
              animate="visible"
              custom={customDelay}
              variants={{
                hidden: {
                  y: animConfig.yOffset,
                  opacity: 0,
                  rotateX: animConfig.rotateX,
                  scale: animConfig.scale,
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  scale: 1,
                  transition: {
                    delay: customDelay,
                    duration: animationStyle === "heavy" ? duration * 1.2 : duration,
                    ease: animationStyle === "heavy"
                      ? [0.22, 1, 0.36, 1] // Dramatic ease-out for heavy blocks
                      : [0.16, 1, 0.3, 1], // ease-out-expo
                  },
                },
              }}
            >
              {unit}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
