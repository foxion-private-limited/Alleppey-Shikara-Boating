import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Introduction() {
  return (
    <section id="about" className="py-20 sm:py-28 overflow-hidden bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Side */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden shadow-2xl border border-forest-900/10">
                <Image
                  src="/images/village-canal.jpg"
                  alt="Authentic Kerala village canal with quiet waterway and lush coconut trees in Alappuzha"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Decorative Subtle Accent Tag */}
              <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-forest-900/10 rounded-xl p-4 shadow-lg flex items-center space-x-3 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-800 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-forest-950 uppercase tracking-wider">
                    Village Immersion
                  </p>
                  <p className="text-xs text-forest-700/80">
                    Quiet narrow canals inaccessible to large houseboats
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
            <div className="inline-flex items-center space-x-2 text-forest-700 text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              <span className="w-6 h-[1.5px] bg-forest-600" />
              <span>Authentic Kerala</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-[1.2] mb-6">
              Experience Alappuzha Beyond the Ordinary
            </h2>

            <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed mb-6">
              Leave the busy tourist routes behind and discover the quieter side of Kerala&apos;s backwaters. Glide through narrow canals, watch village life unfold along the waterways and enjoy the peaceful beauty of coconut palms and paddy fields.
            </p>

            <p className="text-sm sm:text-base text-earth-700 font-light leading-relaxed mb-8">
              Unlike massive commercial houseboats that stay on wide open lakes, our traditional wooden Shikara boats are nimble enough to navigate the serene inner waterways of Kuttanad, giving you an intimate window into daily village routines, bird sanctuaries, and tranquil shores.
            </p>

            <div>
              <a
                href="#experiences"
                className="group inline-flex items-center space-x-2 text-forest-900 font-semibold text-sm hover:text-forest-700 transition-colors"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
