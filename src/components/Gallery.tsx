import React from 'react';
import Image from 'next/image';

const galleryImages = [
  {
    src: '/images/hero-shikara.jpg',
    alt: 'Tourists enjoying a traditional Shikara boat ride through Alleppey village backwaters',
    title: 'Village Waterways',
    tag: 'Shikara Boating',
    className: 'md:col-span-2 md:row-span-2 h-[380px] md:h-[500px]',
  },
  {
    src: '/images/sunset-cruise.jpg',
    alt: 'Golden sunset reflecting across the Kerala backwaters in Alappuzha',
    title: 'Twilight Reflections',
    tag: 'Sunset Cruise',
    className: 'col-span-1 h-[240px] md:h-[238px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80',
    alt: 'Coconut palms and serene waters of Kerala backwaters',
    title: 'Palm-fringed Banks',
    tag: 'Flora & Nature',
    className: 'col-span-1 h-[240px] md:h-[238px]',
  },
  {
    src: '/images/village-canal.jpg',
    alt: 'Quiet village canals with traditional canoes and tiled heritage homes',
    title: 'Authentic Village Life',
    tag: 'Local Culture',
    className: 'col-span-1 md:col-span-1 h-[260px] md:h-[300px]',
  },
  {
    src: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    alt: 'Lush green paddy fields and tranquil backwater channels of Kuttanad, Alleppey',
    title: 'Paddy Fields of Kuttanad',
    tag: 'Green Landscapes',
    className: 'col-span-1 md:col-span-2 h-[260px] md:h-[300px]',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-white border-t border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
            Visual Stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Moments From the Backwaters
          </h2>
          <p className="text-base text-earth-800 font-light leading-relaxed">
            Snapshots of calm canals, golden sunsets, and the quiet rhythms of life along the Kerala waterways.
          </p>
        </div>

        {/* Asymmetric / Travel Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl overflow-hidden border border-forest-900/10 shadow-sm ${img.className}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle hover gradient and caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400 mb-1">
                  {img.tag}
                </span>
                <h3 className="font-serif text-xl text-cream-50 font-medium">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
