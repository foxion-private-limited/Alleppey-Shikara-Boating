import React from 'react';
import Image from 'next/image';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenBooking?: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Cinematic Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-shikara.jpg"
          alt="Traditional Shikara boat cruising calm village backwaters in Alleppey, Kerala"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02] transform transition-transform duration-1000"
          quality={90}
        />
        {/* Multilayered subtle gradient overlays for pristine readability while keeping natural colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/60" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20 sm:py-32">
        {/* Small Location Label */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-50/15 backdrop-blur-md border border-cream-100/25 mb-6 text-cream-100 text-xs sm:text-sm tracking-[0.22em] uppercase font-medium">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>ALAPPUZHA · KERALA</span>
        </div>

        {/* Main Heading (Only single H1 on page as required) */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-cream-50 font-normal leading-[1.15] sm:leading-[1.12] tracking-tight mb-6 max-w-3xl mx-auto drop-shadow-sm">
          Discover the Hidden Beauty of Kerala&apos;s Backwaters
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg md:text-xl text-cream-100/90 font-light leading-relaxed max-w-2xl mx-auto mb-10 text-balance">
          Cruise through peaceful village canals, lush paddy fields and palm-lined waterways aboard a traditional Shikara in Alleppey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href="#experiences"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-cream-100 text-forest-950 text-sm font-semibold tracking-wide hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <span>Explore Experiences</span>
            <ChevronRight className="w-4 h-4 ml-1.5 opacity-80" />
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-forest-800/80 hover:bg-forest-800 text-cream-50 text-sm font-semibold tracking-wide border border-cream-100/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            Book Your Ride
          </button>
        </div>
      </div>

      {/* Subtle "Scroll to explore" visual indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
        <span className="text-[11px] uppercase tracking-[0.25em] text-cream-200/80 mb-2 font-light">
          Scroll to explore
        </span>
        <div className="w-6 h-9 rounded-full border border-cream-100/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-gold-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
