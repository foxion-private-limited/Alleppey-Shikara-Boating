import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Elena & Marcus Weber',
    location: 'Munich, Germany',
    theme: 'Peaceful Village Routes',
    text: 'A truly magical experience away from the noisy tourist boats. We glided through tiny canals lined with coconut trees, seeing daily village life up close. The boat was spotless and comfortable.',
    stars: 5,
  },
  {
    name: 'David Jenkins',
    location: 'Bristol, United Kingdom',
    theme: 'Friendly Local Guide & Photography',
    text: 'Our boat captain was incredibly knowledgeable and friendly, pointing out kingfishers and helping us take stunning sunset photos. Easily the highlight of our 2-week trip in Kerala.',
    stars: 5,
  },
  {
    name: 'Pooja & Rohan Sharma',
    location: 'Mumbai, India',
    theme: 'Clean Boat & Serene Sunset',
    text: 'The sunset Shikara ride was peaceful, private, and so romantic. The boat cushions were plush and comfortable, and the evening breeze over the backwaters was unforgettable.',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
            Guest Reflections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight">
            Loved by Travelers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-forest-900/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 mb-4 text-gold-500">
                  {[...Array(review.stars)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <span className="text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2 block">
                  {review.theme}
                </span>

                <p className="text-sm sm:text-base text-earth-800 leading-relaxed font-light mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-forest-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-forest-950">{review.name}</h4>
                  <p className="text-xs text-earth-600">{review.location}</p>
                </div>
                <Quote className="w-6 h-6 text-forest-200 stroke-[1.5]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
