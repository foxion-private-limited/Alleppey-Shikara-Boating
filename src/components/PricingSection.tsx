'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Users, MessageCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface PricingData {
  name: string;
  currentPrice: number;
  originalPrice: number | null;
  offerActive: boolean;
  capacity: number;
  description: string;
}

interface TourPackage {
  _id?: string;
  name: string;
  duration: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  offerActive: boolean;
  maxPeople: number;
  recommended: boolean;
  active: boolean;
  route?: string;
}

interface PricingSectionProps {
  onOpenBooking?: (title?: string) => void;
}

export default function PricingSection({ onOpenBooking }: PricingSectionProps) {
  const [standardPricing, setStandardPricing] = useState<PricingData>({
    name: 'Standard Shikara',
    currentPrice: 600,
    originalPrice: 650,
    offerActive: true,
    capacity: 6,
    description:
      'One boat · Up to 6 people. Price may vary depending on the boat and group requirements.',
  });

  const [packages, setPackages] = useState<TourPackage[]>([]);

  // Dynamic data flow from MongoDB
  useEffect(() => {
    fetch('/api/pricing')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          setStandardPricing({
            name: data.name || 'Standard Shikara',
            currentPrice: data.currentPrice ?? 600,
            originalPrice: data.originalPrice ?? 650,
            offerActive: Boolean(data.offerActive),
            capacity: data.capacity ?? 6,
            description: data.description || '',
          });
        }
      })
      .catch(() => {});

    fetch('/api/packages')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data)) {
          setPackages(data.filter((p) => p.active));
        }
      })
      .catch(() => {});
  }, []);

  const handleWhatsAppBooking = (title: string, people: number) => {
    const text = `Hi, I would like to enquire about booking the "${title}" Shikara experience in Alappuzha (for up to ${people} people).`;
    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(
      text
    )}`;
    window.open(url, '_blank');
  };

  // Standard Shikara Offer Calculation
  const hasStandardOffer =
    standardPricing.offerActive &&
    standardPricing.originalPrice &&
    standardPricing.originalPrice > standardPricing.currentPrice;

  const standardDiscount = hasStandardOffer
    ? Math.round(
        ((standardPricing.originalPrice! - standardPricing.currentPrice) /
          standardPricing.originalPrice!) *
          100
      )
    : 0;

  return (
    <section id="pricing" className="py-24 bg-cream-50/60 border-b border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Tag className="w-3.5 h-3.5 text-forest-700" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Simple, Transparent Rates
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            All prices are for the entire private Shikara boat — never charged per person.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: Standard Shikara Base Hourly Rate */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-forest-800 shadow-lg ring-1 ring-forest-800/10 flex flex-col justify-between relative">
            <div className="absolute -top-3 left-6 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-forest-800 text-gold-300 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3 h-3" />
              <span>BASE RATE</span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-medium text-forest-950 mb-1 mt-1">
                {standardPricing.name}
              </h3>

              <div className="inline-flex items-center space-x-1.5 text-xs text-forest-700 font-semibold uppercase tracking-wider mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>Up to {standardPricing.capacity} people</span>
              </div>

              {/* Price display with dynamic offer calculation */}
              <div className="mb-4 pb-4 border-b border-forest-100">
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-forest-950">
                    ₹{standardPricing.currentPrice}
                  </span>
                  <span className="text-xs text-earth-700 font-medium">/ hour</span>
                </div>

                {/* Only show crossed-out price and discount badge when offer is active */}
                {hasStandardOffer && (
                  <div className="flex items-center space-x-2 mt-1.5">
                    <span className="text-sm text-earth-500 line-through">
                      ₹{standardPricing.originalPrice}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                      {standardDiscount}% OFF
                    </span>
                  </div>
                )}
              </div>

              <p className="text-xs text-earth-800 font-light leading-relaxed mb-6">
                {standardPricing.description}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() =>
                  handleWhatsAppBooking(standardPricing.name, standardPricing.capacity)
                }
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider bg-forest-800 hover:bg-forest-900 text-cream-50 shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp to Book</span>
              </button>

              <button
                onClick={() => onOpenBooking?.(standardPricing.name)}
                className="w-full text-center text-[11px] font-medium text-forest-700 hover:text-forest-900 transition-colors py-1"
              >
                Reserve Online →
              </button>
            </div>
          </div>

          {/* Cards 2+: Dynamic Packages from MongoDB */}
          {packages.map((pkg) => {
            const hasOffer =
              pkg.offerActive &&
              pkg.originalPrice &&
              pkg.originalPrice > pkg.price;

            const discount = hasOffer
              ? Math.round(((pkg.originalPrice! - pkg.price) / pkg.originalPrice!) * 100)
              : 0;

            const isHighlighted = pkg.recommended;

            return (
              <div
                key={pkg._id}
                className={`bg-white rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 relative ${
                  isHighlighted
                    ? 'border-forest-800 shadow-lg ring-1 ring-forest-800/10'
                    : 'border-forest-900/10 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-6 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-forest-800 text-gold-300 text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3 h-3" />
                    <span>RECOMMENDED</span>
                  </div>
                )}

                <div>
                  <h3 className="font-serif text-xl font-medium text-forest-950 mb-1 mt-1">
                    {pkg.name}
                  </h3>

                  <div className="inline-flex items-center space-x-1.5 text-xs text-forest-700 font-semibold uppercase tracking-wider mb-4">
                    <Users className="w-3.5 h-3.5" />
                    <span>Up to {pkg.maxPeople} people</span>
                  </div>

                  <div className="mb-4 pb-4 border-b border-forest-100">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-serif text-3xl sm:text-4xl font-semibold text-forest-950">
                        ₹{pkg.price}
                      </span>
                      <span className="text-xs text-earth-700 font-medium">
                        {pkg.duration.toLowerCase().includes('custom')
                          ? '/ hour'
                          : 'ride'}
                      </span>
                    </div>

                    {hasOffer && (
                      <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-sm text-earth-500 line-through">
                          ₹{pkg.originalPrice}
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                          {discount}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-earth-800 font-light leading-relaxed mb-6">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleWhatsAppBooking(pkg.name, pkg.maxPeople)}
                    className={`w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                      isHighlighted
                        ? 'bg-forest-800 hover:bg-forest-900 text-cream-50 shadow-sm'
                        : 'bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp to Book</span>
                  </button>

                  <button
                    onClick={() => onOpenBooking?.(pkg.name)}
                    className="w-full text-center text-[11px] font-medium text-forest-700 hover:text-forest-900 transition-colors py-1"
                  >
                    Reserve Online →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Foreign Tourist Friendly Clarification Box */}
        <div className="bg-white rounded-2xl p-6 border border-forest-900/10 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-forest-950">
                One Boat · Up to 6 People
              </h4>
              <p className="text-xs text-earth-700 font-light mt-0.5">
                Prices are for the private Shikara boat. Price may vary depending on the Shikara boat and group requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
