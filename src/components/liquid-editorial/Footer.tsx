const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Documentation", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies"],
  },
];

export function Footer() {
  return (
    <footer
      className="py-16 lg:py-24 px-4 border-t"
      style={{ borderColor: "rgba(28, 28, 28, 0.1)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <span
              className="text-2xl font-bold tracking-tighter"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              LIQUID
            </span>
            <p
              className="mt-4 text-sm leading-relaxed opacity-60 max-w-xs"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Where brutalist typography meets fluid dynamics. Crafted for those who refuse to
              settle for static.
            </p>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-6 grid grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4
                  className="text-xs uppercase tracking-widest opacity-40 mb-4"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter section */}
          <div className="lg:col-span-2">
            <h4
              className="text-xs uppercase tracking-widest opacity-40 mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Stay updated
            </h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-3 py-2 text-sm border-b-2 bg-transparent focus:outline-none focus:border-[var(--liquid-accent)] transition-colors"
                style={{
                  fontFamily: "var(--font-inter)",
                  borderColor: "var(--liquid-text)",
                }}
              />
              <button
                className="px-3 py-2 text-sm transition-opacity hover:opacity-70"
                style={{ fontFamily: "var(--font-inter)" }}
                aria-label="Subscribe"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-current/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40" style={{ fontFamily: "var(--font-inter)" }}>
            © {new Date().getFullYear()} Liquid Editorial. Crafted with intention.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "var(--font-inter)" }}
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "var(--font-inter)" }}
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-xs opacity-40 hover:opacity-100 transition-opacity"
              style={{ fontFamily: "var(--font-inter)" }}
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
