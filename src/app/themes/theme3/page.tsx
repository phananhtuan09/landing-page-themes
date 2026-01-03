import { ThemeSwitcher } from "@/components";
import Link from "next/link";

export default function Theme3() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-400 hover:text-white">
                ← Back
              </Link>
              <span className="text-2xl font-light tracking-widest text-white">LUXE</span>
            </div>
            <div className="hidden md:flex items-center space-x-12">
              <a
                href="#collection"
                className="text-gray-300 hover:text-white text-sm tracking-wider uppercase"
              >
                Collection
              </a>
              <a
                href="#story"
                className="text-gray-300 hover:text-white text-sm tracking-wider uppercase"
              >
                Story
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-white text-sm tracking-wider uppercase"
              >
                Contact
              </a>
            </div>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <button className="border border-white text-white hover:bg-white hover:text-black px-6 py-2 text-sm tracking-wider uppercase transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0wIDBoNjB2NjBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-amber-500 tracking-[0.3em] uppercase mb-4">New Collection</p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 leading-tight">
              Timeless
              <br />
              <span className="font-serif italic">Elegance</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md mb-8 leading-relaxed">
              Discover our curated collection of luxury pieces crafted with precision and designed
              for those who appreciate the finer things in life.
            </p>
            <div className="flex gap-6">
              <button className="bg-amber-500 text-black hover:bg-amber-400 px-8 py-4 text-sm tracking-wider uppercase transition-colors">
                Explore Collection
              </button>
              <button className="border border-gray-600 text-white hover:border-white px-8 py-4 text-sm tracking-wider uppercase transition-colors">
                Our Story
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-sm relative">
              <div className="absolute inset-4 border border-amber-500/30" />
              <div className="absolute bottom-8 left-8 right-8 text-center">
                <p className="text-amber-500 text-sm tracking-widest">PREMIUM QUALITY</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              {
                title: "Handcrafted",
                desc: "Each piece made with meticulous attention to detail",
                icon: "◇",
              },
              {
                title: "Sustainable",
                desc: "Ethically sourced materials from around the world",
                icon: "◇",
              },
              { title: "Timeless", desc: "Designs that transcend seasons and trends", icon: "◇" },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="text-amber-500 text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl tracking-wider uppercase mb-4">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection Preview */}
      <section id="collection" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-amber-500 tracking-[0.3em] uppercase mb-2">Featured</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-wider">The Collection</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "The Classic", price: "$2,450" },
              { name: "The Modern", price: "$1,890" },
              { name: "The Heritage", price: "$3,200" },
            ].map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-700 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="text-lg tracking-wider mb-2">{item.name}</h3>
                <p className="text-amber-600 dark:text-amber-500">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light tracking-wider mb-4">Join the List</h2>
          <p className="text-gray-400 mb-8">
            Be the first to know about new collections and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent border border-gray-700 px-6 py-3 focus:border-amber-500 outline-none transition-colors"
            />
            <button className="bg-amber-500 text-black px-8 py-3 tracking-wider uppercase hover:bg-amber-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-light tracking-widest mb-4">LUXE</p>
          <p className="text-gray-500 text-sm">© 2024 LUXE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
