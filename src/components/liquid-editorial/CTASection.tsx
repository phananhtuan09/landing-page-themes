export function CTASection() {
  return (
    <section id="contact" className="py-32 lg:py-48 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, var(--liquid-accent) 0%, transparent 50%),
                            radial-gradient(circle at 80% 50%, var(--liquid-text) 0%, transparent 50%)`,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main CTA content with asymmetric layout */}
        <div className="text-center lg:text-left lg:grid lg:grid-cols-12 lg:gap-12 lg:items-end">
          {/* Headline */}
          <div className="lg:col-span-8">
            <h2
              className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight leading-[0.9]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              READY
              <br />
              TO{" "}
              <span className="relative inline-block">
                <span style={{ color: "var(--liquid-accent)" }}>FLOW</span>
                <span
                  className="absolute -bottom-2 left-0 w-full h-2 opacity-30"
                  style={{ backgroundColor: "var(--liquid-accent)" }}
                />
              </span>
              ?
            </h2>
          </div>

          {/* Decorative number */}
          <div
            className="hidden lg:block lg:col-span-4 text-right opacity-10"
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "10rem",
              fontWeight: 900,
              lineHeight: 0.8,
            }}
          >
            ∞
          </div>
        </div>

        {/* Supporting text */}
        <div className="mt-12 lg:mt-16 max-w-2xl mx-auto lg:mx-0">
          <p
            className="text-xl md:text-2xl leading-relaxed opacity-70 text-center lg:text-left"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Join the movement. Create experiences that defy static expectations and embrace the
            liquid nature of digital design.
          </p>
        </div>

        {/* CTA buttons */}
        <div className="mt-12 lg:mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
          <button
            className="group relative px-10 py-5 text-lg font-medium overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-inter)",
              backgroundColor: "var(--liquid-text)",
              color: "var(--liquid-bg)",
            }}
          >
            <span className="relative z-10">Start Your Journey</span>
            {/* Hover accent reveal */}
            <div
              className="absolute inset-0 w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: "var(--liquid-accent)" }}
            />
          </button>

          <button
            className="group px-10 py-5 text-lg font-medium border-2 transition-all hover:bg-[var(--liquid-text)] hover:text-[var(--liquid-bg)] hover:border-[var(--liquid-text)]"
            style={{
              fontFamily: "var(--font-inter)",
              borderColor: "var(--liquid-text)",
            }}
          >
            View Case Studies
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-current/10">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 justify-center lg:justify-start items-center">
            <div className="text-center lg:text-left">
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                500+
              </div>
              <div className="text-sm opacity-60 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                Projects launched
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                98%
              </div>
              <div className="text-sm opacity-60 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                Client satisfaction
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                24h
              </div>
              <div className="text-sm opacity-60 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
                Response time
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
