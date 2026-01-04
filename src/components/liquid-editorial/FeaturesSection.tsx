"use client";

import { useRef, useState, useCallback } from "react";
import { motion, Variants } from "framer-motion";

import { useScrollTrigger } from "@/lib/animations/useScrollTrigger";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

const features = [
  {
    title: "Velocity Response",
    description:
      "Elements distort and stretch based on scroll velocity, creating a living, breathing canvas that reacts to your movement.",
  },
  {
    title: "Elastic Recovery",
    description:
      "Watch as content oscillates and snaps back with gel-like elasticity when scrolling stops.",
  },
  {
    title: "Accent Revelation",
    description:
      "Hidden colors emerge during motion, revealing depth and dimension beneath the surface.",
  },
  {
    title: "Editorial Grid",
    description:
      "Intentionally broken layouts that challenge convention while maintaining perfect readability.",
  },
  {
    title: "Performance First",
    description: "60 FPS guaranteed with adaptive quality that scales based on device capability.",
  },
  {
    title: "Accessible Design",
    description: "Respects reduced motion preferences and degrades gracefully for all users.",
  },
];

// Container variants for staggered children
const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Item variants for individual cards
const itemVariants: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
    },
  },
};

// Calculate diagonal stagger order (top-left first, bottom-right last)
function getDiagonalOrder(index: number, columns: number): number {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return row * 0.5 + col;
}

interface FeatureCardProps {
  feature: { title: string; description: string };
  index: number;
  diagonalOrder: number;
}

function FeatureCard({ feature, index, diagonalOrder }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Spotlight effect state
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      setSpotlightPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      custom={diagonalOrder}
      className="group relative p-8 lg:p-10 rounded-sm overflow-hidden transition-[border-color] duration-300"
      style={{
        // Frosted glass effect
        backgroundColor: "rgba(250, 249, 246, 0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        // Subtle border that darkens on hover
        border: `1px solid ${isHovered ? "rgba(28, 28, 28, 0.3)" : "rgba(28, 28, 28, 0.12)"}`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight overlay - follows cursor */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(217, 83, 79, 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Index number - positioned top right with proper spacing */}
      <motion.span
        className="absolute top-6 right-6 font-mono text-xs tracking-wider transition-all duration-300 z-10"
        style={{
          fontFamily: "var(--font-inter)",
          color: isHovered ? "var(--liquid-accent)" : "var(--liquid-text-tertiary)",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        0{index + 1}
      </motion.span>

      {/* Content container with proper spacing from number */}
      <div className="relative z-10 pt-2">
        <h3
          className="text-xl lg:text-2xl font-bold mb-4 tracking-tight variable-font-hover"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {feature.title}
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ fontFamily: "var(--font-playfair)", color: "var(--liquid-text-secondary)" }}
        >
          {feature.description}
        </p>
      </div>

      {/* Removed: Red bottom border - replaced by spotlight effect */}
    </motion.div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isInView } = useScrollTrigger(sectionRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="features" className="py-24 lg:py-32 px-4 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            CAPABILITIES
          </h2>
          <p
            className="text-base max-w-md lg:text-right leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--liquid-text-secondary)" }}
          >
            Crafted with precision. Powered by intention. Built for those who refuse to settle.
          </p>
        </motion.div>

        {/* Animated grid layout - 1 column mobile, 2 tablet, 3 desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              diagonalOrder={getDiagonalOrder(index, 3)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
