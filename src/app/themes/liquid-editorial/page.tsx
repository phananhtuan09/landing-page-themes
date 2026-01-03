import type { Metadata } from "next";
import {
  HeroSection,
  FeaturesSection,
  TestimonialsSection,
  CTASection,
  Navbar,
  Footer,
  WebGLCanvas,
  StaticFallback,
} from "@/components/liquid-editorial";

export const metadata: Metadata = {
  title: "Liquid Editorial | Landing Page Themes",
  description:
    "Brutalist typography meets fluid WebGL distortion effects. Experience editorial design that breathes, flows, and responds to your every scroll.",
  openGraph: {
    title: "Liquid Editorial Theme",
    description: "Brutalist Typography + WebGL Distortion",
  },
};

export default function LiquidEditorialTheme() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundColor: "var(--liquid-bg)",
        color: "var(--liquid-text)",
      }}
    >
      {/* WebGL distortion overlay - renders on desktop only, respects reduced motion */}
      <WebGLCanvas />

      {/* Static fallback wrapper - adds CSS hover effects when WebGL is disabled */}
      <StaticFallback>
        {/* Main content - always visible and accessible */}
        <Navbar />
        <main className="relative z-0">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </StaticFallback>
    </div>
  );
}
