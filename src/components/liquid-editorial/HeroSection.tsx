"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { SplitText, useMouseParallax, StrokeText } from "@/lib/animations";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation timing constants
  const dynamicsDelay = 0.6; // Delay after FLUID finishes (FLUID ~5 chars * 80ms = 0.4s)
  const subtextDelay = 1.8; // After DYNAMICS animation
  const scrollIndicatorDelay = 2.2;

  // Mouse parallax for depth effect - FLUID moves slow, DYNAMICS moves opposite
  const fluidParallax = useMouseParallax({ intensity: 0.015, smoothing: 0.08 });
  const dynamicsParallax = useMouseParallax({
    intensity: 0.025,
    smoothing: 0.06,
    inverted: true,
  });

  // Scroll-based text distortion (subtle wave effect)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to subtle skew for liquid feel
  const textSkewX = useTransform(scrollYProgress, [0, 0.5], [0, -2]);
  const textSkewY = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden"
    >
      {/* Gradient mask at bottom - blends hero into content below */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
        style={{
          background:
            "linear-gradient(to top, var(--liquid-bg) 0%, var(--liquid-bg) 20%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Massive brutalist headline with parallax depth */}
        <h1
          className="font-black leading-[0.85] tracking-tighter"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(4rem, 18vw, 14rem)",
          }}
          aria-label="Fluid Dynamics"
        >
          {/* FLUID - Heavy solid text with block-settling animation */}
          <motion.span
            className="inline-block relative"
            style={
              prefersReducedMotion
                ? {}
                : {
                    x: fluidParallax.x,
                    y: fluidParallax.y,
                    skewX: textSkewX,
                  }
            }
          >
            <SplitText
              type="chars"
              stagger={80}
              duration={0.8}
              animationStyle="heavy"
            >
              FLUID
            </SplitText>
          </motion.span>

          <br />

          {/* DYNAMICS - Outline text with SVG stroke draw + opposite parallax */}
          <motion.span
            className="relative inline-block"
            style={
              prefersReducedMotion
                ? {}
                : {
                    x: dynamicsParallax.x,
                    y: dynamicsParallax.y,
                    skewY: textSkewY,
                  }
            }
          >
            <StrokeText
              delay={dynamicsDelay}
              duration={1.2}
            >
              DYNAMICS
            </StrokeText>

            {/* Decorative underline - animated in after DYNAMICS */}
            <motion.span
              className="absolute -bottom-2 left-0 w-full h-2 opacity-30"
              style={{ backgroundColor: "var(--liquid-accent)" }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: dynamicsDelay + 1.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          </motion.span>
        </h1>

        {/* Editorial subtext with Playfair */}
        <motion.div
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: subtextDelay,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p
            className="text-lg md:text-xl leading-relaxed"
            style={{
              fontFamily: "var(--font-playfair)",
              color: "var(--liquid-text-secondary)",
            }}
          >
            Where brutalist typography meets liquid motion. Experience editorial
            design that breathes, flows, and responds to your every scroll.
          </p>
          <div className="flex flex-col justify-end">
            <p
              className="text-sm uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--liquid-text-tertiary)",
              }}
            >
              Scroll-driven distortion
            </p>
            <p
              className="text-sm uppercase tracking-widest mt-1"
              style={{
                fontFamily: "var(--font-inter)",
                color: "var(--liquid-text-tertiary)",
              }}
            >
              Mouse-reactive parallax
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - centered at bottom */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30"
        style={{ color: "var(--liquid-text-secondary)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: scrollIndicatorDelay,
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Scroll to explore
        </span>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
