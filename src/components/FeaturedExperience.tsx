import React from 'react';
import Image from 'next/image';
import { Sailboat, Waves, Utensils, Anchor, Compass, ArrowRight } from 'lucide-react';

interface FeaturedExperienceProps {
  onOpenBooking?: () => void;
}

const features = [
  { name: 'Shikara Ride', icon: Sailboat, desc: 'Scenic shaded cruise through backwaters' },
  { name: 'Kayaking', icon: Waves, desc: 'Paddle through serene narrow canals' },
  { name: 'Canoeing', icon: Compass, desc: 'Traditional country canoe experience' },
  { name: 'Speed Boat', icon: Anchor, desc: 'Exhilarating open lake cruise' },
  { name: 'Traditional Lunch', icon: Utensils, desc: 'Authentic Kerala meals on banana leaf' },
];

export default function FeaturedExperience({ onOpenBooking }: FeaturedExperienceProps) {
  return (
    <section className="py-20 sm:py-28 bg-forest-950 text-cream-50 relative overflow-hidden">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text & Feature Elements */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-gold-400 mb-3 block">
              Signature Combination
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream-50 font-normal tracking-tight leading-[1.2] mb-6">
              The Complete Backwater Experience
            </h2>

            <p className="text-base sm:text-lg text-cream-100/90 font-light leading-relaxed mb-8">
              Spend a few hours exploring the waterways of Alappuzha with a combination of Shikara boating and optional activities such as kayaking, canoeing and speed boating.
            </p>

            {/* Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.name}
                    className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-forest-900/60 border border-forest-800/60 backdrop-blur-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-forest-800 flex items-center justify-center text-gold-400 flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-cream-50">{feature.name}</h4>
                      <p className="text-xs text-cream-200/70">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-full bg-cream-100 text-forest-950 font-semibold text-sm hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <span>View Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Visual Element */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[420px] sm:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-forest-800/80">
              <Image
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80"
                alt="Kerala backwaters in Alappuzha with boat cruising alongside lush tropical coconut groves"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-forest-950/80 backdrop-blur-md border border-white/10">
                <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-1">
                  Customizable Itinerary
                </p>
                <p className="text-sm text-cream-100/90 font-light">
                  Tailored specifically for your pace — from quiet canal rowing to scenic lakeside breaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
