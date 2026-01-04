"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { useScrollTrigger } from "@/lib/animations/useScrollTrigger";
import { useParallax } from "@/lib/animations/useParallax";
import { useReducedMotion } from "@/lib/animations/useReducedMotion";

const testimonials = [
  {
    quote:
      "This redefined what I thought was possible with web design. The fluidity is absolutely mesmerizing — every scroll feels intentional.",
    author: "Sarah Chen",
    role: "Creative Director",
    company: "Studio Flux",
  },
  {
    quote:
      "Finally, a theme that matches the ambition of our brand. Bold, unapologetic, alive. Our conversion rate increased 40% after launch.",
    author: "Marcus Webb",
    role: "Founder & CEO",
    company: "Kinetic Labs",
  },
  {
    quote:
      "The attention to detail is remarkable. From the typography to the micro-interactions, everything feels considered and purposeful.",
    author: "Elena Rodriguez",
    role: "Head of Design",
    company: "Vertex Studio",
  },
];

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  parallaxSpeed?: number;
  delay?: number;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
}

function TestimonialCard({
  testimonial,
  parallaxSpeed = 0,
  delay = 0,
  index,
  hoveredIndex,
  onHover,
}: TestimonialCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { style: parallaxStyle } = useParallax(cardRef, { speed: parallaxSpeed });

  // Calculate focus state
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      ref={cardRef}
      className="group relative pl-8 lg:pl-10 transition-all duration-500"
      style={{
        ...parallaxStyle,
        // Apply blur and grayscale when other cards are hovered
        filter: isOtherHovered ? "blur(2px) grayscale(0.3)" : "blur(0px) grayscale(0)",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      animate={{
        opacity: isOtherHovered ? 0.4 : 1,
        scale: isHovered ? 1.02 : 1,
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Animated growing red line */}
      <motion.div
        className="absolute left-0 top-0 w-[2px]"
        style={{ backgroundColor: "var(--liquid-accent)" }}
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.8,
          ease: [0.33, 1, 0.68, 1], // ease-out-circ
        }}
      />

      {/* Large decorative quote mark - faint background element */}
      <div
        className="absolute -left-2 -top-4 text-[8rem] leading-none pointer-events-none select-none opacity-[0.06]"
        style={{
          fontFamily: "var(--font-playfair)",
          color: "var(--liquid-accent)",
        }}
        aria-hidden="true"
      >
        "
      </div>

      {/* Quote content with hanging punctuation */}
      <blockquote
        className="relative text-xl md:text-2xl leading-relaxed"
        style={{
          fontFamily: "var(--font-playfair)",
          // Hanging punctuation - negative indent for opening quote
          textIndent: "-0.4em",
        }}
      >
        <span className="text-[var(--liquid-accent)]">"</span>
        {testimonial.quote}
        <span className="text-[var(--liquid-accent)]">"</span>
      </blockquote>

      {/* Attribution */}
      <div className="mt-6 lg:mt-8">
        <cite className="not-italic" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="font-semibold text-base">{testimonial.author}</span>
          <div
            className="flex items-center gap-2 mt-1 text-sm"
            style={{ color: "var(--liquid-text-secondary)" }}
          >
            <span>{testimonial.role}</span>
            <span className="w-1 h-1 rounded-full bg-current" />
            <span>{testimonial.company}</span>
          </div>
        </cite>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isInView } = useScrollTrigger(sectionRef, {
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="testimonials" className="py-24 lg:py-32 px-4 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            VOICES
          </h2>
          <motion.div
            className="mt-6 w-24 h-1"
            style={{ backgroundColor: "var(--liquid-accent)" }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Clean grid layout with parallax - 1 column mobile, 2 columns desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* First testimonial - slower parallax (left) */}
          <TestimonialCard
            testimonial={testimonials[0]}
            parallaxSpeed={0.1}
            delay={0}
            index={0}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
          />
          {/* Second testimonial - counter parallax (right) */}
          <TestimonialCard
            testimonial={testimonials[1]}
            parallaxSpeed={-0.05}
            delay={0.15}
            index={1}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
          />
        </div>

        {/* Third testimonial full width below - focal depth parallax (center) */}
        <div className="mt-12 lg:mt-16 lg:max-w-3xl lg:mx-auto">
          <TestimonialCard
            testimonial={testimonials[2]}
            parallaxSpeed={0.15}
            delay={0.3}
            index={2}
            hoveredIndex={hoveredIndex}
            onHover={setHoveredIndex}
          />
        </div>
      </div>
    </section>
  );
}
