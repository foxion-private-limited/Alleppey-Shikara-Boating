'use client';

import React from 'react';
import {
  Waves,
  Home,
  Trees,
  Navigation,
  Coffee,
  Footprints,
  Compass,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface JourneySectionProps {
  onOpenBooking?: (title?: string) => void;
}

export default function JourneySection({ onOpenBooking }: JourneySectionProps) {
  const twoHourStops = [
    {
      name: 'Punnamada Lake',
      desc: 'Start your journey across the beautiful waters of Punnamada.',
      icon: Waves,
    },
    {
      name: 'Kerala Villages',
      desc: 'Pass through peaceful villages and experience everyday life along the backwaters.',
      icon: Home,
    },
    {
      name: 'Paddy Fields',
      desc: 'See Kerala’s famous green paddy fields from the water.',
      icon: Trees,
    },
    {
      name: 'Narrow Canals',
      desc: 'Enter quieter canals surrounded by coconut trees and village homes.',
      icon: Navigation,
    },
    {
      name: 'Refreshment Area',
      desc: 'Take a short break and enjoy local refreshments.',
      icon: Coffee,
    },
  ];

  const threeHourStops = [
    {
      name: 'Vembanad Lake',
      desc: 'Begin with the beautiful open waters of Vembanad Lake.',
      icon: Compass,
    },
    {
      name: 'Village + Walking Experience',
      desc: 'Experience the local side of Kerala with a short village walking experience.',
      icon: Footprints,
    },
    {
      name: 'Paddy Fields',
      desc: 'Cruise alongside the iconic paddy fields of Alappuzha.',
      icon: Trees,
    },
    {
      name: 'Canals',
      desc: 'Continue through peaceful narrow canals and waterways.',
      icon: Navigation,
    },
    {
      name: 'Refreshment Area',
      desc: 'Relax and enjoy local refreshments before completing your journey.',
      icon: Coffee,
    },
  ];

  const handleCustomInquiry = () => {
    const text = 'Hi, I would like to inquire about a custom duration Shikara boating trip in Alappuzha.';
    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="routes" className="py-24 bg-cream-50/70 border-b border-forest-900/10 relative overflow-hidden">
      {/* Decorative subtle water flow background wave */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-gradient-to-b from-forest-100/30 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Curated Boating Routes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Your Journey Through the Backwaters
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            Every route takes you deeper into the peaceful side of Alappuzha.
          </p>
        </div>

        {/* Routes Container */}
        <div className="space-y-14">
          {/* 1. 3-HOUR ROUTE (FEATURED & RECOMMENDED) */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-forest-800/20 shadow-xl shadow-forest-950/5 relative">
            {/* Recommended Badge */}
            <div className="absolute -top-3.5 left-8 inline-flex items-center space-x-1.5 px-4 py-1 rounded-full bg-forest-800 text-gold-300 text-xs font-semibold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RECOMMENDED</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pt-2">
              <div>
                <div className="flex items-center space-x-2 text-forest-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>3 Hours · Most Popular Experience</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-medium">
                  3 Hour Backwater Experience
                </h3>
              </div>

              <button
                onClick={() => onOpenBooking?.('3 Hour Backwater Experience')}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
              >
                <span>Book This Route</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Travel Journey Timeline */}
            <div className="relative mb-8">
              {/* Desktop horizontal flow */}
              <div className="hidden lg:grid grid-cols-5 gap-4 relative">
                {/* Connecting track line */}
                <div className="absolute top-7 left-10 right-10 h-0.5 bg-forest-100 -z-0" />

                {threeHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  return (
                    <div key={stop.name} className="flex flex-col items-center text-center relative z-10 px-2">
                      <div className="w-14 h-14 rounded-2xl bg-forest-800 text-gold-300 shadow-md flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 mb-1">
                        Stop 0{i + 1}
                      </span>
                      <h4 className="font-serif text-base font-semibold text-forest-950 mb-1.5 leading-snug">
                        {stop.name}
                      </h4>
                      <p className="text-xs text-earth-700 font-light leading-relaxed">
                        {stop.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile vertical timeline */}
              <div className="lg:hidden space-y-6 relative pl-6 border-l-2 border-forest-200">
                {threeHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  return (
                    <div key={stop.name} className="relative">
                      {/* Node point */}
                      <div className="absolute -left-[35px] top-1.5 w-8 h-8 rounded-xl bg-forest-800 text-gold-300 flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="bg-cream-50/70 p-4 rounded-xl border border-forest-100">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-forest-700">
                          Stop 0{i + 1}
                        </span>
                        <h4 className="font-serif text-base font-semibold text-forest-950 mt-0.5 mb-1">
                          {stop.name}
                        </h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">
                          {stop.desc}
                        </p>
                      </div>
                      {i < threeHourStops.length - 1 && (
                        <div className="flex justify-center -my-1 text-forest-300">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Why we recommend 3 hours highlight box */}
            <div className="bg-forest-50/80 rounded-2xl p-5 sm:p-6 border border-forest-100 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="w-10 h-10 rounded-full bg-forest-800 text-gold-300 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs uppercase tracking-wider font-semibold text-forest-900 mb-1">
                  Why We Recommend 3 Hours
                </h5>
                <p className="text-sm text-forest-800/90 font-light leading-relaxed italic">
                  &ldquo;Three hours gives you enough time to experience the lake, villages, paddy fields and canals without making the journey feel unnecessarily long.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* 2. 2-HOUR ROUTE */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-forest-900/10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center space-x-2 text-forest-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2 Hours · Classic Route</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-medium">
                  2 Hour Shikara Experience
                </h3>
              </div>

              <button
                onClick={() => onOpenBooking?.('2 Hour Shikara Experience')}
                className="inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <span>Book 2 Hour Route</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Travel Journey Timeline */}
            <div className="relative">
              {/* Desktop horizontal flow */}
              <div className="hidden lg:grid grid-cols-5 gap-4 relative">
                {/* Connecting track line */}
                <div className="absolute top-7 left-10 right-10 h-0.5 bg-forest-100 -z-0" />

                {twoHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  return (
                    <div key={stop.name} className="flex flex-col items-center text-center relative z-10 px-2">
                      <div className="w-14 h-14 rounded-2xl bg-forest-100 text-forest-800 border border-forest-200 shadow-sm flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110">
                        <Icon className="w-6 h-6 stroke-[1.75]" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-forest-700 mb-1">
                        Stop 0{i + 1}
                      </span>
                      <h4 className="font-serif text-base font-semibold text-forest-950 mb-1.5 leading-snug">
                        {stop.name}
                      </h4>
                      <p className="text-xs text-earth-700 font-light leading-relaxed">
                        {stop.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile vertical timeline */}
              <div className="lg:hidden space-y-6 relative pl-6 border-l-2 border-forest-200">
                {twoHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  return (
                    <div key={stop.name} className="relative">
                      {/* Node point */}
                      <div className="absolute -left-[35px] top-1.5 w-8 h-8 rounded-xl bg-forest-100 border border-forest-200 text-forest-800 flex items-center justify-center shadow-sm">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="bg-cream-50/70 p-4 rounded-xl border border-forest-100">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-forest-700">
                          Stop 0{i + 1}
                        </span>
                        <h4 className="font-serif text-base font-semibold text-forest-950 mt-0.5 mb-1">
                          {stop.name}
                        </h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">
                          {stop.desc}
                        </p>
                      </div>
                      {i < twoHourStops.length - 1 && (
                        <div className="flex justify-center -my-1 text-forest-300">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. CUSTOM HOURS CARD */}
          <div className="bg-forest-900 text-cream-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-forest-800 shadow-lg">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 mb-1.5 block">
                Tailored Itineraries
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-cream-50 font-normal mb-2">
                Want More Time?
              </h4>
              <p className="text-sm text-cream-100/90 font-light leading-relaxed">
                Custom durations are also available for guests who want to explore at their own pace. Trips longer than 3 hours can be arranged on request. While 3 hours remains our recommended option for a balanced experience, we are happy to craft a flexible schedule for your group.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={handleCustomInquiry}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-cream-100 text-forest-950 text-xs font-semibold uppercase tracking-wider hover:bg-white hover:shadow-xl transition-all"
              >
                <span>Ask About Custom Trips</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
