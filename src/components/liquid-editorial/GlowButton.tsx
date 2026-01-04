"use client";

import { useRef, ReactNode } from "react";
import { motion } from "framer-motion";

import { useMagneticHover } from "@/lib/animations/useMagneticHover";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Secondary outlined button with magnetic hover and accent glow.
 * Tracks cursor slightly and gains red border/background on hover.
 */
export function GlowButton({ children, className = "", onClick }: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { style: magneticStyle, handlers } = useMagneticHover(buttonRef, {
    maxTranslate: 6,
    maxRotate: 3,
    enable3D: true,
  });

  return (
    <motion.button
      ref={buttonRef}
      className={`group relative border-2 transition-all duration-300 hover:border-[var(--liquid-accent)] ${className}`}
      style={{
        fontFamily: "var(--font-inter)",
        borderColor: "var(--liquid-text)",
        backgroundColor: "transparent",
        ...magneticStyle,
      }}
      onClick={onClick}
      onMouseMove={handlers.onMouseMove}
      onMouseLeave={handlers.onMouseLeave}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {/* Background glow on hover */}
      <span
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: "rgba(217, 83, 79, 0.05)" }}
      />

      {/* Text */}
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--liquid-accent)]">
        {children}
      </span>
    </motion.button>
  );
}
