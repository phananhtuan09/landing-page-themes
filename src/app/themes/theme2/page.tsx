import { ThemeSwitcher } from "@/components";
import Link from "next/link";

export default function Theme2() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-600 to-pink-600 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-white/80 hover:text-white">
                ← Back
              </Link>
              <span className="text-xl font-bold text-white">CreativeStudio</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#work" className="text-white/80 hover:text-white">
                Work
              </a>
              <a href="#services" className="text-white/80 hover:text-white">
                Services
              </a>
              <a href="#about" className="text-white/80 hover:text-white">
                About
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-full font-medium transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 min-h-screen flex items-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <p className="text-lg sm:text-xl mb-4 opacity-90">Digital Design Agency</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            We Create
            <br />
            Digital Experiences
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 opacity-90">
            Transform your brand with stunning designs and seamless user experiences that captivate
            your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-medium transition-colors">
              View Our Work
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full text-lg font-medium transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">WHAT WE DO</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "UI/UX Design", icon: "🎨", color: "from-purple-500 to-pink-500" },
              { title: "Web Development", icon: "💻", color: "from-blue-500 to-cyan-500" },
              { title: "Brand Identity", icon: "✨", color: "from-orange-500 to-yellow-500" },
              { title: "Mobile Apps", icon: "📱", color: "from-green-500 to-teal-500" },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Creating beautiful and functional solutions tailored to your needs.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section id="work" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-purple-600 dark:text-purple-400 font-medium mb-2">PORTFOLIO</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Recent Work</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] bg-gradient-to-br from-purple-400 to-pink-400"
              >
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-4">CreativeStudio</p>
          <p className="text-gray-400">© 2024 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
