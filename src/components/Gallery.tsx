'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { GALLERY_PHOTOS, GalleryPhoto } from '@/lib/galleryData';

// Curated selection of 4 standout photographs for the Homepage
// Row 1: Large landscape (1.5 ratio) + Tall portrait (0.75 ratio) — natural height alignment
// Row 2: Two cinematic wide perspectives (1.5 ratio) — balanced symmetry
const CURATED_HOMEPAGE_PHOTOS: (GalleryPhoto & { homeSpan: string })[] = [
  {
    ...GALLERY_PHOTOS[0], // id: 1 - Golden Sunset Bow Cruise (1600x1066, ratio 1.5)
    homeSpan: 'lg:col-span-8',
  },
  {
    ...GALLERY_PHOTOS[1], // id: 2 - Family Moments on the Lake (768x1024, ratio 0.75)
    homeSpan: 'lg:col-span-4',
  },
  {
    ...GALLERY_PHOTOS[3], // id: 4 - Watching Houseboats in Golden Light (1024x683, ratio 1.5)
    homeSpan: 'lg:col-span-6',
  },
  {
    ...GALLERY_PHOTOS[2], // id: 3 - Romantic Evening on the Waters (1024x683, ratio 1.5)
    homeSpan: 'lg:col-span-6',
  },
];

export default function Gallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null
        ? prev === 0
          ? CURATED_HOMEPAGE_PHOTOS.length - 1
          : prev - 1
        : null
    );
  }, [activePhotoIndex]);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null
        ? prev === CURATED_HOMEPAGE_PHOTOS.length - 1
          ? 0
          : prev + 1
        : null
    );
  }, [activePhotoIndex]);

  // Touch Swipe for mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (deltaX > 45) {
      handleNextPhoto();
    } else if (deltaX < -45) {
      handlePrevPhoto();
    }
    touchStartXRef.current = null;
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleCloseLightbox, handlePrevPhoto, handleNextPhoto]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (activePhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activePhotoIndex]);

  const activePhoto =
    activePhotoIndex !== null ? CURATED_HOMEPAGE_PHOTOS[activePhotoIndex] : null;

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white border-t border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-forest-900/5 border border-forest-900/10 text-forest-800 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-forest-700" />
            <span>Curated Preview</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Moments From the Backwaters
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            A carefully selected visual preview of tranquil canals, golden hour cruises, and authentic backwater life in Alappuzha.
          </p>
        </div>

        {/* Editorial Grid: Asymmetrical, natural aspect ratios, no fixed heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {CURATED_HOMEPAGE_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden bg-forest-950/5 border border-forest-900/10 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${photo.homeSpan}`}
            >
              {/* Natural Aspect Ratio Wrapper */}
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: `${photo.width} / ${photo.height}`,
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes={
                    photo.homeSpan.includes('col-span-8')
                      ? '(max-width: 1024px) 100vw, 66vw'
                      : photo.homeSpan.includes('col-span-6')
                      ? '(max-width: 640px) 100vw, 50vw'
                      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />

                {/* Architectural Minimal Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md text-[10px] uppercase tracking-widest font-semibold text-gold-400 border border-gold-400/20">
                      <span>{photo.category}</span>
                    </span>
                    <span className="font-mono text-xs text-cream-200/80 tracking-wider">
                      {String(photo.id).padStart(2, '0')}
                    </span>
                  </div>

                  <div>
                    {photo.location && (
                      <p className="text-[11px] text-cream-200/90 tracking-wider uppercase flex items-center space-x-1.5 mb-1.5 font-light">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                        <span>{photo.location}</span>
                      </p>
                    )}
                    <h3 className="font-serif text-lg sm:text-xl text-cream-50 font-medium leading-snug">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Photos CTA Button */}
        <div className="mt-16 sm:mt-20 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center space-x-2.5 px-8 py-4 rounded-full bg-forest-800 text-cream-50 hover:bg-forest-900 transition-all duration-300 text-sm font-semibold tracking-wide shadow-sm hover:shadow-md group"
          >
            <span>View All Photos</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <p className="text-xs text-earth-700/70 mt-3 font-light">
            Explore authentic moments from our Alleppey shikara cruises
          </p>
        </div>
      </div>

      {/* Interactive Lightbox for Homepage Preview */}
      {activePhoto && activePhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-950/98 backdrop-blur-xl p-4 sm:p-6"
          onClick={handleCloseLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Counter and Close Button */}
          <div
            className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between z-20 text-cream-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 text-xs sm:text-sm font-light text-cream-200">
              <span className="font-semibold text-gold-400 font-mono">
                {String(activePhotoIndex + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span className="font-mono">
                {String(CURATED_HOMEPAGE_PHOTOS.length).padStart(2, '0')}
              </span>
              <span className="hidden sm:inline-block text-cream-300/40">|</span>
              <span className="hidden sm:inline-block uppercase tracking-widest text-[10px] text-cream-200/80">
                {activePhoto.category}
              </span>
            </div>

            <button
              onClick={handleCloseLightbox}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-cream-100 hover:text-white transition-colors focus:outline-none"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPhoto();
            }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-cream-100 hover:text-white transition-all focus:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextPhoto();
            }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-cream-100 hover:text-white transition-all focus:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {/* Main Photo Container */}
          <div
            className="relative w-full max-w-5xl h-[65vh] sm:h-[75vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Bottom Photo Caption & Direct Action */}
          <div
            className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-cream-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center sm:text-left">
              <h3 className="font-serif text-lg sm:text-xl font-medium text-cream-50">
                {activePhoto.title}
              </h3>
              {activePhoto.location && (
                <p className="text-xs text-cream-200/80 flex items-center justify-center sm:justify-start space-x-1.5 mt-0.5 font-light">
                  <MapPin className="w-3.5 h-3.5 text-gold-400" />
                  <span>{activePhoto.location}</span>
                </p>
              )}
            </div>

            <Link
              href="/gallery"
              onClick={handleCloseLightbox}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-100 hover:bg-white text-forest-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <span>View All Photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
