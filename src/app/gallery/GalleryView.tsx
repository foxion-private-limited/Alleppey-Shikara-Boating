'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Sparkles,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import {
  GALLERY_CATEGORIES,
  GalleryPhoto,
  GalleryCategory,
} from '@/lib/galleryData';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface GalleryViewProps {
  initialPhotos?: GalleryPhoto[];
}

export default function GalleryView({ initialPhotos = [] }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All Photos');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCruiseTitle, setSelectedCruiseTitle] = useState('Shikara Boating Experience');
  const touchStartXRef = useRef<number | null>(null);

  // Filtered photos based on selected category
  const filteredPhotos =
    selectedCategory === 'All Photos'
      ? initialPhotos
      : initialPhotos.filter((p) => p.category === selectedCategory);

  // Open Lightbox
  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  // Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    setActivePhotoIndex(null);
  }, []);

  // Navigate Lightbox
  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev === 0 ? filteredPhotos.length - 1 : prev - 1) : null
    );
  }, [activePhotoIndex, filteredPhotos.length]);

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) =>
      prev !== null ? (prev === filteredPhotos.length - 1 ? 0 : prev + 1) : null
    );
  }, [activePhotoIndex, filteredPhotos.length]);

  // Touch Swipe for mobile Lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartXRef.current - touchEndX;
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

  const handleBookNow = (title?: string) => {
    if (title) setSelectedCruiseTitle(title);
    setIsBookingOpen(true);
  };

  const activePhoto =
    activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-forest-800 selection:text-cream-100">
      {/* 1. Header Navigation */}
      <Navbar onOpenBooking={() => handleBookNow()} />

      <main className="flex-grow">
        {/* 2. Page Header Banner */}
        <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 bg-gradient-to-b from-forest-950 via-forest-900 to-forest-950 text-cream-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-800/30 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb & Back Link */}
            <div className="flex items-center space-x-2 text-xs text-cream-200/80 mb-6">
              <Link
                href="/"
                className="inline-flex items-center space-x-1.5 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
              <span>/</span>
              <span className="text-gold-400 font-medium">Gallery</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cream-50/10 border border-cream-100/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Photographic Collection · {initialPhotos.length} Moments</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.14] text-cream-50 mb-5">
                  Moments From the Backwaters
                </h1>
                <p className="text-base sm:text-lg text-cream-100/90 font-light leading-relaxed max-w-2xl">
                  An art-directed photographic collection of authentic guest voyages, quiet village canal crossings, and serene waterways in Alappuzha, Kerala.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden border border-cream-100/15 shadow-2xl bg-forest-900/60 aspect-[16/10]">
                  <Image
                    src="/gallery/1.jpg"
                    alt="Traditional Shikara Boat cruising through Punnamada Lake, Alappuzha"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-cream-200/90 font-light pointer-events-none">
                    <span className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span>Punnamada Lake, Alappuzha</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-gold-400 font-medium">Featured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-2 pt-10 no-scrollbar">
              {GALLERY_CATEGORIES.map((cat) => {
                const count =
                  cat === 'All Photos'
                    ? initialPhotos.length
                    : initialPhotos.filter((p) => p.category === cat).length;
                if (count === 0 && cat !== 'All Photos') return null;
                const isActive = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? 'bg-cream-100 text-forest-950 shadow-md font-semibold'
                        : 'bg-white/10 text-cream-100/90 hover:bg-white/20 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-forest-900/10 text-forest-900 font-bold'
                          : 'bg-white/10 text-cream-200'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. Art-Directed Editorial Grid Section */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {filteredPhotos.map((photo, index) => {
                const spanClass = photo.span || 'col-span-1 sm:col-span-1 lg:col-span-6';

                return (
                  <div
                    key={`${photo.id}-${index}`}
                    onClick={() => handleOpenLightbox(index)}
                    className={`group relative rounded-2xl overflow-hidden bg-forest-950/5 border border-forest-900/10 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer ${spanClass}`}
                  >
                    {/* Natural Aspect Ratio Wrapper: preserves 100% of photo's uncropped proportions */}
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
                          spanClass.includes('col-span-12')
                            ? '100vw'
                            : spanClass.includes('col-span-8')
                            ? '(max-width: 1024px) 100vw, 66vw'
                            : spanClass.includes('col-span-6')
                            ? '(max-width: 640px) 100vw, 50vw'
                            : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        }
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        loading={index < 4 ? 'eager' : 'lazy'}
                        priority={index < 2}
                      />

                      {/* Subtle Architectural Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 sm:p-6 pointer-events-none">
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-forest-900/10 p-8">
              <Compass className="w-12 h-12 text-forest-700 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-forest-950 mb-2">No photos found</h3>
              <p className="text-sm text-earth-700 max-w-md mx-auto">
                No photos match the selected category. Choose another category or select &quot;All Photos&quot;.
              </p>
            </div>
          )}

          {/* 4. Bottom Booking CTA Card */}
          <div className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-br from-forest-900 via-forest-950 to-forest-900 text-cream-50 p-8 sm:p-12 relative overflow-hidden border border-forest-800 shadow-xl text-center sm:text-left">
            <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-forest-800/30 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2 block">
                  Experience It in Person
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-cream-50 mb-3">
                  Ready to Cruise These Waters?
                </h2>
                <p className="text-sm sm:text-base text-cream-100/90 font-light leading-relaxed">
                  Book your private Shikara boat ride through the tranquil canals and lakes shown above. Transparent pricing from ₹600/hr for the entire boat.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
                <button
                  onClick={() => handleBookNow('Custom Shikara Cruise')}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-cream-100 text-forest-950 hover:bg-white text-sm font-semibold tracking-wide shadow-md transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Book Your Ride</span>
                </button>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(
                    'Hi, I was browsing your photo gallery and would like to enquire about booking a Shikara boat ride in Alleppey.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Full-Screen Interactive Lightbox Modal */}
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
              <span className="font-mono">{String(filteredPhotos.length).padStart(2, '0')}</span>
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

          {/* Navigation Controls: Previous */}
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

          {/* Navigation Controls: Next */}
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

          {/* Main Photo Container: Exact natural aspect ratio presentation */}
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

            <button
              onClick={() => {
                handleCloseLightbox();
                handleBookNow(activePhoto.title);
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-cream-100 hover:bg-white text-forest-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Experience</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. Footer */}
      <Footer />

      {/* 7. Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedCruiseTitle={selectedCruiseTitle}
      />
    </div>
  );
}
