export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Decorative overlapping elements */}
      <div
        className="absolute top-1/4 -right-20 w-64 h-64 opacity-5 pointer-events-none"
        style={{
          backgroundColor: "var(--liquid-text)",
          transform: "rotate(12deg)",
        }}
      />
      <div
        className="absolute bottom-1/4 -left-16 w-48 h-48 opacity-5 pointer-events-none"
        style={{
          backgroundColor: "var(--liquid-accent)",
          transform: "rotate(-8deg)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Massive brutalist headline */}
        <h1
          className="font-black leading-[0.85] tracking-tighter"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(4rem, 18vw, 14rem)",
          }}
        >
          FLUID
          <br />
          <span className="relative inline-block" style={{ color: "var(--liquid-accent)" }}>
            DYNAMICS
            {/* Decorative underline */}
            <span
              className="absolute -bottom-2 left-0 w-full h-2 opacity-30"
              style={{ backgroundColor: "var(--liquid-accent)" }}
            />
          </span>
        </h1>

        {/* Editorial subtext with Playfair */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <p
            className="text-lg md:text-xl leading-relaxed opacity-80"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Where brutalist typography meets liquid motion. Experience editorial design that
            breathes, flows, and responds to your every scroll.
          </p>
          <div className="flex flex-col justify-end">
            <p
              className="text-sm uppercase tracking-widest opacity-40"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Scroll-driven distortion
            </p>
            <p
              className="text-sm uppercase tracking-widest opacity-40 mt-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              WebGL powered
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-4 md:left-0 flex items-center gap-3 opacity-40">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-current opacity-40" />
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Asymmetric decorative text */}
      <div
        className="absolute bottom-24 right-8 hidden lg:block opacity-10 pointer-events-none"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "8rem",
          fontWeight: 900,
          lineHeight: 0.8,
          writingMode: "vertical-rl",
        }}
      >
        001
      </div>
    </section>
  );
}
