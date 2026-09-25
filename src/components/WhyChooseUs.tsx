import React from 'react';
import { MapPin, Sparkles, Armchair, HeartHandshake } from 'lucide-react';

const reasons = [
  {
    icon: MapPin,
    title: 'Local Knowledge',
    description:
      'Explore the backwaters with people who know the villages, canals and hidden routes.',
  },
  {
    icon: Sparkles,
    title: 'Authentic Experience',
    description:
      'See a quieter and more authentic side of Kerala away from crowded tourist routes.',
  },
  {
    icon: Armchair,
    title: 'Comfortable Boats',
    description:
      'Relax and enjoy unobstructed views of the backwaters.',
  },
  {
    icon: HeartHandshake,
    title: 'Personal Experience',
    description:
      'Perfect for couples, families and small groups looking for a peaceful experience.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
            Our Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight">
            Why Explore Alappuzha With Us?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-white p-8 rounded-2xl border border-forest-900/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 mb-6">
                  <Icon className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h3 className="font-serif text-xl font-medium text-forest-950 mb-3">
                  {reason.title}
                </h3>
                <p className="text-sm text-earth-800 leading-relaxed font-light">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
