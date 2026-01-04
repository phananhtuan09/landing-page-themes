"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

import { useScrollTrigger } from "@/lib/animations/useScrollTrigger";
import { WordCycler } from "@/lib/animations/WordCycler";
import { CountingNumber } from "@/lib/animations/CountingNumber";
import { FillButton } from "./FillButton";
import { GlowButton } from "./GlowButton";

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { isInView } = useScrollTrigger(sectionRef, {
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      id="contact"
      className="py-32 lg:py-48 px-4 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background Atmosphere - Huge Rotating Infinity Symbol */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(300px, 50vw, 600px)",
          fontWeight: 900,
          lineHeight: 1,
          color: "var(--liquid-text)",
          opacity: 0.04,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 0.04, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.span
          className="inline-block"
          animate={{ rotate: 360 }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          ∞
        </motion.span>
      </motion.div>

      {/* Main content - Centered */}
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            READY TO{" "}
            <span className="relative inline-block">
              <WordCycler
                words={["ADAPT", "EVOLVE", "CREATE"]}
                finalWord="FLOW"
                startDelay={800}
                wordDuration={1000}
                finalClassName="accent-text-elevated"
                isActive={isInView}
              />
              {/* Animated underline - thin, expands from center */}
              <motion.span
                className="absolute -bottom-1 left-1/2 h-[2px]"
                style={{
                  backgroundColor: "var(--liquid-accent)",
                  translateX: "-50%",
                }}
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 3.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
            {/* Animated floating question mark */}
            <motion.span
              className="inline-block ml-1"
              animate={{
                y: [0, -8, 0],
                rotateZ: [0, 3, -3, 0],
              }}
              transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              ?
            </motion.span>
          </h2>
        </motion.div>

        {/* Supporting text */}
        <motion.div
          className="mt-8 lg:mt-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xl md:text-2xl leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)", color: "var(--liquid-text-secondary)" }}
          >
            Join the movement. Create experiences that defy static expectations and embrace the
            liquid nature of digital design.
          </p>
        </motion.div>

        {/* CTA buttons - centered */}
        <motion.div
          className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <FillButton className="px-10 py-5 text-lg font-medium">
            Start Your Journey
          </FillButton>

          <GlowButton className="px-10 py-5 text-lg font-medium">
            View Case Studies
          </GlowButton>
        </motion.div>

        {/* Trust indicators with dividers */}
        <motion.div
          className="mt-20 lg:mt-28 w-full max-w-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {/* Top border */}
          <motion.div
            className="w-full h-px mb-10"
            style={{ backgroundColor: "var(--liquid-text)", opacity: 0.15 }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Stats with vertical dividers */}
          <div className="flex justify-between items-center">
            {[
              { value: "500+", label: "Projects launched" },
              { value: "98%", label: "Client satisfaction" },
              { value: "24h", label: "Response time" },
            ].map((stat, index, arr) => (
              <motion.div
                key={stat.label}
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  delay: 0.9 + index * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Stat content */}
                <div className="text-center px-4 sm:px-8">
                  <CountingNumber
                    value={stat.value}
                    duration={2}
                    delay={1.2 + index * 0.2}
                    isActive={isInView}
                    className="text-3xl sm:text-4xl font-black"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  />
                  <div
                    className="text-xs sm:text-sm mt-2 uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-inter)", color: "var(--liquid-text-secondary)" }}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Vertical divider (not on last item) */}
                {index < arr.length - 1 && (
                  <div
                    className="w-px h-12 sm:h-16"
                    style={{ backgroundColor: "var(--liquid-text)", opacity: 0.15 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
