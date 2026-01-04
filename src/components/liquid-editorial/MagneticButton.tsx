"use client";

import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/lib/animations/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Maximum magnetic pull distance in pixels. Default: 15 */
  maxPull?: number;
  /** Detection radius around the button in pixels. Default: 100 */
  radius?: number;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = "",
  style,
  maxPull = 15,
  radius = 100,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (prefersReducedMotion || !buttonRef.current) return;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        const rect = buttonRef.current!.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);

        if (distance < radius) {
          // Calculate pull strength (stronger when closer)
          const strength = 1 - distance / radius;
          const pullX = (distX / distance) * maxPull * strength;
          const pullY = (distY / distance) * maxPull * strength;

          setPosition({ x: pullX, y: pullY });
        } else {
          setPosition({ x: 0, y: 0 });
        }
      });
    },
    [prefersReducedMotion, maxPull, radius]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <button className={className} style={style} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      style={style}
      onClick={onClick}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.button>
  );
}
