import { ThemeSwitcher } from "@/components";
import Link from "next/link";

const themes = [
  {
    id: "theme1",
    name: "StartupX",
    description: "Modern SaaS landing page with clean design",
    gradient: "from-blue-500 to-cyan-500",
    tags: ["SaaS", "Startup", "Minimal"],
  },
  {
    id: "theme2",
    name: "CreativeStudio",
    description: "Vibrant agency portfolio with bold gradients",
    gradient: "from-purple-500 to-pink-500",
    tags: ["Agency", "Creative", "Bold"],
  },
  {
    id: "theme3",
    name: "LUXE",
    description: "Elegant luxury brand with premium aesthetics",
    gradient: "from-amber-500 to-orange-600",
    tags: ["Luxury", "E-commerce", "Elegant"],
  },
  {
    id: "liquid-editorial",
    name: "Liquid Editorial",
    description: "Brutalist typography meets fluid WebGL distortion",
    gradient: "from-stone-400 to-red-400",
    tags: ["Editorial", "WebGL", "Brutalist"],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">
              Landing Page <span className="text-blue-600 dark:text-blue-400">Themes</span>
            </h1>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Beautiful Landing Pages
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore different landing page designs. Each theme is fully responsive with dark mode
            support. Click on any theme to preview it.
          </p>
        </div>
      </section>

      {/* Theme Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes.map((theme) => (
              <Link key={theme.id} href={`/themes/${theme.id}`} className="group block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Preview */}
                  <div
                    className={`aspect-video bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white font-medium px-6 py-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all">
                        View Theme →
                      </span>
                    </div>
                    {/* Mock browser chrome */}
                    <div className="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-sm flex items-center px-2 gap-1">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {theme.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {theme.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Add New Theme CTA */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Create Your Own Theme</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
              Add a new folder in{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/app/themes/</code>{" "}
              with a{" "}
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">page.tsx</code> file
              to create your own landing page.
            </p>
            <div className="inline-block bg-gray-200 dark:bg-gray-700 rounded-lg p-4 text-left font-mono text-sm">
              <p className="text-gray-500 dark:text-gray-400"># Create new theme</p>
              <p>mkdir src/app/themes/theme4</p>
              <p>touch src/app/themes/theme4/page.tsx</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>Built with Next.js + TypeScript + Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}
