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

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-32 lg:py-48 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 lg:mb-32">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            VOICES
          </h2>
          <div className="mt-6 w-24 h-1" style={{ backgroundColor: "var(--liquid-accent)" }} />
        </div>

        {/* Testimonial grid with asymmetric placement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* First testimonial - spans more columns, offset down */}
          <div className="lg:col-span-7 lg:row-start-1 relative">
            <TestimonialCard testimonial={testimonials[0]} size="large" />
          </div>

          {/* Second testimonial - smaller, offset up */}
          <div className="lg:col-span-5 lg:row-start-1 lg:-mt-12 relative">
            <TestimonialCard testimonial={testimonials[1]} size="medium" />
          </div>

          {/* Third testimonial - full width bottom */}
          <div className="lg:col-span-8 lg:col-start-3 lg:-mt-8 relative">
            <TestimonialCard testimonial={testimonials[2]} size="medium" />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className="absolute top-1/3 left-8 hidden lg:block opacity-[0.03] pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "20rem",
          lineHeight: 0.8,
        }}
      >
        &ldquo;
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  size: "large" | "medium";
}

function TestimonialCard({ testimonial, size }: TestimonialCardProps) {
  const isLarge = size === "large";

  return (
    <div className="group relative">
      {/* Large decorative quote mark */}
      <span
        className="absolute -top-6 -left-2 lg:-top-8 lg:-left-4 opacity-10 pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: isLarge ? "8rem" : "6rem",
          lineHeight: 0.8,
          color: "var(--liquid-accent)",
        }}
      >
        &ldquo;
      </span>

      {/* Quote content */}
      <blockquote
        className={`relative z-10 leading-relaxed ${
          isLarge ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-2xl"
        }`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <div className="mt-8 lg:mt-12">
        <cite className="not-italic" style={{ fontFamily: "var(--font-inter)" }}>
          <span className="font-semibold text-base">{testimonial.author}</span>
          <div className="flex items-center gap-2 mt-1 text-sm opacity-60">
            <span>{testimonial.role}</span>
            <span className="w-1 h-1 rounded-full bg-current" />
            <span>{testimonial.company}</span>
          </div>
        </cite>
      </div>

      {/* Hover accent border */}
      <div
        className="absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full"
        style={{ backgroundColor: "var(--liquid-accent)" }}
      />
    </div>
  );
}
