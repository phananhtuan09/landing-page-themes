"use client";

import { useState } from "react";
import Link from "next/link";

import { MagneticButton } from "./MagneticButton";
import { ElevatorLink } from "./ElevatorLink";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md transition-all"
      style={{ backgroundColor: "rgba(249, 247, 242, 0.9)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Back link + Logo */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-sm opacity-50 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              ← Back
            </Link>
            <span
              className="text-xl font-bold tracking-tighter"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              LIQUID
            </span>
          </div>

          {/* Center: Navigation links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <ElevatorLink key={link.href} href={link.href} label={link.label} />
            ))}
          </div>

          {/* Right: CTA button + Mobile menu toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton
              className="hidden sm:block px-6 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--liquid-text)",
                color: "var(--liquid-bg)",
              }}
              maxPull={12}
              radius={80}
            >
              Get Started
            </MagneticButton>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current transition-all duration-300 origin-center ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-64 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-current/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-lg py-2 opacity-70 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "var(--font-inter)" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              className="mt-4 w-full py-3 text-sm font-medium"
              style={{
                fontFamily: "var(--font-inter)",
                backgroundColor: "var(--liquid-text)",
                color: "var(--liquid-bg)",
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
