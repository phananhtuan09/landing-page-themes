const features = [
  {
    title: "Velocity Response",
    description:
      "Elements distort and stretch based on scroll velocity, creating a living, breathing canvas that reacts to your movement.",
    gridArea: "1 / 1 / 2 / 2",
    offset: "",
  },
  {
    title: "Elastic Recovery",
    description:
      "Watch as content oscillates and snaps back with gel-like elasticity when scrolling stops.",
    gridArea: "1 / 2 / 2 / 3",
    offset: "mt-12 lg:mt-24",
  },
  {
    title: "Accent Revelation",
    description:
      "Hidden colors emerge during motion, revealing depth and dimension beneath the surface.",
    gridArea: "2 / 1 / 3 / 3",
    offset: "-mt-8 lg:-mt-16",
  },
  {
    title: "Editorial Grid",
    description:
      "Intentionally broken layouts that challenge convention while maintaining perfect readability.",
    gridArea: "2 / 3 / 3 / 4",
    offset: "mt-8",
  },
  {
    title: "Performance First",
    description: "60 FPS guaranteed with adaptive quality that scales based on device capability.",
    gridArea: "3 / 1 / 4 / 2",
    offset: "-mt-4",
  },
  {
    title: "Accessible Design",
    description: "Respects reduced motion preferences and degrades gracefully for all users.",
    gridArea: "3 / 2 / 4 / 4",
    offset: "mt-16 lg:mt-20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 lg:py-48 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-4xl max-h-4xl opacity-[0.02] pointer-events-none"
        style={{
          border: "1px solid var(--liquid-text)",
          borderRadius: "50%",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header with asymmetric layout */}
        <div className="mb-20 lg:mb-32 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            CAPA
            <br className="hidden lg:block" />
            BILITIES
          </h2>
          <p
            className="text-lg max-w-md opacity-60 lg:text-right leading-relaxed"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Crafted with precision. Powered by intention. Built for those who refuse to settle.
          </p>
        </div>

        {/* Broken grid layout */}
        <div className="hidden lg:grid grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 lg:p-10 border transition-all duration-300 hover:bg-[var(--liquid-text)] hover:text-[var(--liquid-bg)] ${feature.offset}`}
              style={{
                borderColor: "var(--liquid-text)",
                gridArea: feature.gridArea,
              }}
            >
              {/* Index number */}
              <span
                className="absolute top-4 right-4 text-xs opacity-30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                0{index + 1}
              </span>

              <h3
                className="text-xl lg:text-2xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {feature.title}
              </h3>
              <p
                className="leading-relaxed opacity-70 group-hover:opacity-90"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feature.description}
              </p>

              {/* Hover accent line */}
              <div
                className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: "var(--liquid-accent)" }}
              />
            </div>
          ))}
        </div>

        {/* Mobile/tablet single column layout */}
        <div className="lg:hidden flex flex-col gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 border transition-all duration-300 active:bg-[var(--liquid-text)] active:text-[var(--liquid-bg)]"
              style={{ borderColor: "var(--liquid-text)" }}
            >
              <span
                className="absolute top-4 right-4 text-xs opacity-30"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                0{index + 1}
              </span>
              <h3
                className="text-xl font-bold mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {feature.title}
              </h3>
              <p
                className="leading-relaxed opacity-70"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative side text */}
      <div
        className="absolute bottom-32 -right-4 hidden xl:block opacity-5 pointer-events-none"
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "12rem",
          fontWeight: 900,
          lineHeight: 0.7,
          writingMode: "vertical-rl",
        }}
      >
        FEAT
      </div>
    </section>
  );
}
