"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface FillButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Fill direction. Default: "up" */
  direction?: "up" | "down";
}

/**
 * Primary button with vertical fill hover effect.
 * A layer fills from bottom to top, inverting text color.
 */
export function FillButton({
  children,
  className = "",
  onClick,
  direction = "up",
}: FillButtonProps) {
  return (
    <motion.button
      className={`group relative overflow-hidden ${className}`}
      style={{
        fontFamily: "var(--font-inter)",
        backgroundColor: "var(--liquid-text)",
        color: "var(--liquid-bg)",
      }}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {/* Text layer - changes color on hover via mix-blend-mode */}
      <span className="relative z-10 block transition-colors duration-300 group-hover:text-[var(--liquid-text)]">
        {children}
      </span>

      {/* Fill layer - rises from bottom on hover */}
      <span
        className={`absolute inset-0 transition-transform duration-500 ${
          direction === "up" ? "translate-y-full group-hover:translate-y-0" : "-translate-y-full group-hover:translate-y-0"
        }`}
        style={{
          backgroundColor: "var(--liquid-bg)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* Accent border that appears on hover */}
      <span
        className="absolute inset-0 border-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ borderColor: "var(--liquid-text)" }}
      />
    </motion.button>
  );
}
