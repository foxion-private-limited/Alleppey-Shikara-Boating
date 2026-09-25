'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

export default function Location() {
  return (
    <section id="location" className="py-24 bg-white border-t border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Information Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
              Meeting Point & Boarding
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-6">
              Find Us in Alappuzha
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3.5 p-4 rounded-2xl bg-cream-50/70 border border-forest-100">
                <div className="w-10 h-10 rounded-xl bg-forest-800 text-cream-50 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forest-950 leading-snug">
                    {BUSINESS_CONFIG.location.exactAddress}
                  </h4>
                  <p className="text-xs text-earth-700 font-light mt-1">
                    Conveniently located in town with easy vehicle parking and rickshaw access.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 px-4 py-2">
                <div className="w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800 flex-shrink-0 mt-0.5">
                  <Compass className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-forest-950">
                    Direct Backwater Boarding
                  </h4>
                  <p className="text-xs text-earth-700 font-light mt-0.5">
                    Our boats depart directly from the canal jetty into the tranquil waterways of Punnamada and Vembanad.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <a
                href={BUSINESS_CONFIG.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2.5 px-7 py-3.5 rounded-full bg-forest-800 text-cream-50 font-semibold text-sm hover:bg-forest-900 transition-all shadow-md"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
              </a>
            </div>
          </div>

          {/* Embedded Responsive Google Map */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-forest-900/15 shadow-xl bg-slate-100 h-[380px] sm:h-[440px] w-full">
              <iframe
                title="Alleppey Village Shikara Boating Location Map"
                src={BUSINESS_CONFIG.location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
              />

              {/* Floating overlay card */}
              <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-forest-900/10 shadow-lg pointer-events-none">
                <p className="text-[11px] font-semibold text-forest-950 leading-tight">
                  Alleppey Village Shikara Boating
                </p>
                <p className="text-[10px] text-forest-700 mt-0.5 truncate">
                  Vazhichery Jn, Alappuzha, Kerala
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
