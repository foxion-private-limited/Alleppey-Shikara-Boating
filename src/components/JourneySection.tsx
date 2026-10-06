"use client";

import React from "react";
import {
  Waves,
  Navigation,
  Landmark,
  Home,
  Trees,
  Compass,
  ArrowRight,
  ArrowDown,
  Sparkles,
  Clock,
  CheckCircle,
  RotateCcw,
} from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/constants";

interface JourneySectionProps {
  onOpenBooking?: (title?: string) => void;
}

export default function JourneySection({ onOpenBooking }: JourneySectionProps) {
  const twoHourStops = [
    {
      name: "Punnamada Lake",
      badge: "Start / Origin",
      desc: "Embark from Punnamada Lake, starting point of our island-circling loop.",
      icon: Waves,
    },
    {
      name: "Vilakkumaram Canal",
      desc: "Cruise into peaceful Vilakkumaram Canal shaded by coconut palms.",
      icon: Navigation,
    },
    {
      name: "Kavungal Devi Temple",
      desc: "Glide past the historic Kavungal Devi Temple on the water’s edge.",
      icon: Landmark,
    },
    {
      name: "Azheekal Kanal",
      desc: "Navigate through scenic, serene waterways of Azheekal Kanal.",
      icon: Navigation,
    },
    {
      name: "Kuppappuram Village",
      desc: "Experience quiet village life and traditional waterside homes.",
      icon: Home,
    },
    {
      name: "Azheekal Village",
      desc: "Pass traditional village waterways circling around the island.",
      icon: Trees,
    },
    {
      name: "Returns to Punnamada Lake",
      badge: "Circuit Complete",
      desc: "Complete the scenic loop, returning smoothly to Punnamada Lake.",
      icon: RotateCcw,
      isLoopReturn: true,
    },
  ];

  // Exact 3-Hour Route: Extended journey ending at Vembanad Lake
  const threeHourStops = [
    {
      name: "Punnamada Lake",
      badge: "Departure Point",
      desc: "Begin your extended backwater journey from Punnamada Lake.",
      icon: Waves,
    },
    {
      name: "Vilakkumaram Canal",
      desc: "Cruise through the serene waters of Vilakkumaram Canal.",
      icon: Navigation,
    },
    {
      name: "Kavungal Devi Temple",
      desc: "Pass the revered Kavungal Devi Temple on the canal edge.",
      icon: Landmark,
    },
    {
      name: "Kuppappuram Village",
      desc: "Observe everyday village life and culture in Kuppappuram.",
      icon: Home,
    },
    {
      name: "Azheekal Canal & Village",
      desc: "Journey onward along scenic Azheekal Canal and village shores.",
      icon: Trees,
    },
    {
      name: "Naduthuruth Canal",
      desc: "Navigate through Naduthuruth Canal toward the vast lake horizon.",
      icon: Navigation,
    },
    {
      name: "Vembanad Lake",
      badge: "Final Destination",
      desc: "Emerge into the majestic open waters of Vembanad Lake.",
      icon: Compass,
      isDestination: true,
    },
  ];

  const handleCustomInquiry = () => {
    const text =
      "Hi, I would like to inquire about a custom duration Shikara boating trip in Alappuzha.";
    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="routes"
      className="py-20 sm:py-24 bg-cream-50/70 border-b border-forest-900/10 relative overflow-hidden"
    >
      {/* Decorative subtle water flow background wave */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-gradient-to-b from-forest-100/30 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-18">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-100/80 border border-forest-200 text-forest-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-forest-700" />
            <span>Curated Boating Routes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Your Journey Through the Backwaters
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            Every route takes you deeper into the peaceful side of Alappuzha —
            from tranquil village canals to expansive open lakes.
          </p>
        </div>

        {/* Routes Container */}
        <div className="space-y-12 sm:space-y-16">
          {/* ========================================================================= */}
          {/* 1. 3-HOUR ROUTE (FEATURED & RECOMMENDED) - FORWARD JOURNEY */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border-2 border-forest-800/25 shadow-xl shadow-forest-950/5 relative">
            {/* Recommended Badge */}
            <div className="absolute -top-3.5 left-6 sm:left-8 inline-flex items-center space-x-1.5 px-4 py-1 rounded-full bg-forest-800 text-gold-300 text-xs font-semibold uppercase tracking-wider shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>RECOMMENDED</span>
            </div>

            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pt-2">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 text-forest-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    3 Hours · Most Popular Experience · Forward Cruise
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-medium">
                  3 Hour Backwater Experience
                </h3>
                <p className="text-sm text-earth-800 font-light mt-2 leading-relaxed">
                  Our recommended longer journey takes you from Punnamada Lake
                  through village canals and local sights before continuing
                  through Naduthuruth Canal to the open waters of Vembanad Lake.
                </p>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => onOpenBooking?.("3 Hour Backwater Experience")}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Book This Route</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Route Sequence Breadcrumb Bar */}
            <div className="mb-8 p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-forest-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-forest-900">
              <span className="font-semibold text-[10px] uppercase tracking-wider text-forest-700 bg-forest-100/90 px-2 py-0.5 rounded-md mr-1">
                Route
              </span>
              <span className="font-medium text-forest-950">
                Punnamada Lake
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Vilakkumaram Canal
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Kavungal Devi Temple
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Kuppappuram Village
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Azheekal Canal &amp; Village
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Naduthuruth Canal
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-semibold text-gold-800 bg-gold-100/90 px-2 py-0.5 rounded-md">
                Vembanad Lake
              </span>
            </div>

            {/* Travel Journey Timeline */}
            <div className="relative mb-8">
              {/* Desktop horizontal flow (7 stops in forward line) */}
              <div className="hidden lg:grid grid-cols-7 gap-2.5 xl:gap-3 relative">
                {/* Connecting track line */}
                <div className="absolute top-6 left-8 right-8 h-0.5 bg-gradient-to-r from-forest-200 via-forest-300 to-gold-400 -z-0" />

                {threeHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  const isLast = i === threeHourStops.length - 1;
                  return (
                    <div
                      key={stop.name}
                      className="flex flex-col items-center text-center relative z-10 px-1"
                    >
                      {/* Node Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-md transition-transform duration-300 hover:scale-110 ${
                          isLast
                            ? "bg-gradient-to-br from-gold-500 to-forest-800 text-cream-50 ring-2 ring-gold-400/40"
                            : "bg-forest-800 text-gold-300"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>

                      {/* Stop Number or Tag */}
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded ${
                          isLast
                            ? "text-gold-900 bg-gold-100/90 font-bold"
                            : "text-forest-700 bg-forest-50"
                        }`}
                      >
                        {isLast ? "Destination" : `Stop 0${i + 1}`}
                      </span>

                      {/* Stop Name */}
                      <h4 className="font-serif text-[13px] xl:text-sm font-semibold text-forest-950 mb-1 leading-snug break-words">
                        {stop.name}
                      </h4>

                      {/* Description */}
                      <p className="text-[11px] text-earth-700 font-light leading-relaxed">
                        {stop.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Mobile / Tablet vertical timeline */}
              <div className="lg:hidden space-y-5 relative pl-7 sm:pl-8 border-l-2 border-forest-200">
                {threeHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  const isLast = i === threeHourStops.length - 1;
                  return (
                    <div key={stop.name} className="relative">
                      {/* Node point */}
                      <div
                        className={`absolute -left-[39px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                          isLast
                            ? "bg-gradient-to-br from-gold-500 to-forest-800 text-cream-50 ring-2 ring-gold-400/50"
                            : "bg-forest-800 text-gold-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Card Content */}
                      <div
                        className={`p-4 rounded-xl border ${
                          isLast
                            ? "bg-gold-50/40 border-gold-200 shadow-sm"
                            : "bg-cream-50/70 border-forest-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-widest ${
                              isLast ? "text-gold-900" : "text-forest-700"
                            }`}
                          >
                            {isLast
                              ? "Final Destination · Stop 07"
                              : `Stop 0${i + 1}`}
                          </span>
                          {stop.badge && (
                            <span className="text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-forest-100 text-forest-800">
                              {stop.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-forest-950 mt-0.5 mb-1 break-words">
                          {stop.name}
                        </h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">
                          {stop.desc}
                        </p>
                      </div>

                      {/* Down arrow connector (between stops) */}
                      {!isLast && (
                        <div className="flex justify-center -my-1 text-forest-300">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Forward Journey Destination Bar */}
            <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-forest-50/50 border border-forest-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center space-x-2 text-forest-900 font-medium">
                <Compass className="w-4 h-4 text-forest-700 flex-shrink-0" />
                <span>
                  <strong>Forward Route:</strong> Departs Punnamada Lake,
                  voyages through village canals, and finishes at the open
                  waters of <strong>Vembanad Lake</strong>.
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-forest-700 bg-white px-2.5 py-1 rounded-full border border-forest-200">
                Open Water Finale
              </span>
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
                  &ldquo;Three hours gives you ample time to cruise the tranquil
                  village canals, pass local landmarks, and continue outward
                  into the breathtaking expanse of Vembanad Lake without feeling
                  rushed.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. 2-HOUR ROUTE - ISLAND-CIRCLING LOOP */}
          {/* ========================================================================= */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 lg:p-10 border border-forest-900/10 shadow-sm relative">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div className="max-w-3xl">
                <div className="flex items-center space-x-2 text-forest-700 text-xs font-semibold uppercase tracking-wider mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2 Hours · Classic Route · Island-Circling Loop</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-forest-950 font-medium">
                  2 Hour Shikara Experience
                </h3>
                <p className="text-sm text-earth-800 font-light mt-2 leading-relaxed">
                  A scenic island-circling journey through peaceful canals and
                  villages, starting and ending at Punnamada Lake. Cruise
                  through Vilakkumaram Canal, pass Kavungal Devi Temple, explore
                  Azheekal Kanal, Kuppappuram Village and Azheekal Village
                  before returning to Punnamada Lake.
                </p>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => onOpenBooking?.("2 Hour Shikara Experience")}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-full bg-forest-50 hover:bg-forest-100 text-forest-900 border border-forest-200 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Book 2 Hour Route</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Route Sequence Breadcrumb Bar (Circuit representation) */}
            <div className="mb-8 p-3 sm:p-3.5 rounded-2xl bg-cream-50/80 border border-forest-100 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-forest-900">
              <span className="font-semibold text-[10px] uppercase tracking-wider text-forest-700 bg-forest-100/90 px-2 py-0.5 rounded-md mr-1">
                Loop Circuit
              </span>
              <span className="font-medium text-forest-950">
                Punnamada Lake
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Vilakkumaram Canal
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Kavungal Devi Temple
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Azheekal Kanal
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Kuppappuram Village
              </span>
              <span className="text-forest-400">→</span>
              <span className="font-medium text-forest-950">
                Azheekal Village
              </span>
              <span className="text-emerald-600 font-bold">↺</span>
              <span className="font-semibold text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                Returns to Punnamada Lake
              </span>
            </div>

            {/* Travel Journey Timeline */}
            <div className="relative mb-6">
              {/* Desktop horizontal flow (7 stops with circuit return visual) */}
              <div className="hidden lg:grid grid-cols-7 gap-2.5 xl:gap-3 relative">
                {/* Connecting track line */}
                <div className="absolute top-6 left-8 right-8 h-0.5 bg-forest-200 -z-0" />

                {twoHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  const isLast = i === twoHourStops.length - 1;
                  return (
                    <div
                      key={stop.name}
                      className="flex flex-col items-center text-center relative z-10 px-1"
                    >
                      {/* Node Icon */}
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm transition-transform duration-300 hover:scale-110 ${
                          isLast
                            ? "bg-emerald-800 text-gold-300 ring-2 ring-emerald-600/30"
                            : "bg-forest-100 text-forest-800 border border-forest-200"
                        }`}
                      >
                        <Icon className="w-5 h-5 stroke-[1.75]" />
                      </div>

                      {/* Stop Number or Tag */}
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded ${
                          isLast
                            ? "text-emerald-900 bg-emerald-100 font-bold"
                            : "text-forest-700 bg-forest-50"
                        }`}
                      >
                        {isLast ? "Complete" : `Stop 0${i + 1}`}
                      </span>

                      {/* Stop Name */}
                      <h4 className="font-serif text-[13px] xl:text-sm font-semibold text-forest-950 mb-1 leading-snug break-words">
                        {stop.name}
                      </h4>

                      {/* Description */}
                      <p className="text-[11px] text-earth-700 font-light leading-relaxed">
                        {stop.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Visual Loop-Back Connector Banner (Clearly showing the loop back to Punnamada) */}
              <div className="hidden lg:flex items-center justify-between mt-8 p-4 rounded-2xl bg-forest-50/70 border border-dashed border-forest-300">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-forest-800 text-gold-300 flex items-center justify-center flex-shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-forest-950 block">
                      Island-Circling Circuit · Completes Full Loop
                    </span>
                    <p className="text-[11px] text-earth-700 font-light">
                      The boat circles around the island canals and finishes by
                      gently returning to the initial boarding point at{" "}
                      <strong>Punnamada Lake</strong>.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white text-forest-800 text-[11px] font-semibold border border-forest-200 shadow-sm">
                  <span>Punnamada Lake</span>
                  <RotateCcw className="w-3.5 h-3.5 text-forest-600" />
                  <span>Punnamada Lake</span>
                </div>
              </div>

              {/* Mobile / Tablet vertical timeline */}
              <div className="lg:hidden space-y-5 relative pl-7 sm:pl-8 border-l-2 border-forest-200">
                {twoHourStops.map((stop, i) => {
                  const Icon = stop.icon;
                  const isLast = i === twoHourStops.length - 1;
                  return (
                    <div key={stop.name} className="relative">
                      {/* Node point */}
                      <div
                        className={`absolute -left-[39px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-xl flex items-center justify-center shadow-sm ${
                          isLast
                            ? "bg-emerald-800 text-gold-300 ring-2 ring-emerald-500/40"
                            : "bg-forest-100 border border-forest-200 text-forest-800"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {/* Card Content */}
                      <div
                        className={`p-4 rounded-xl border ${
                          isLast
                            ? "bg-emerald-50/60 border-emerald-300 shadow-sm"
                            : "bg-cream-50/70 border-forest-100"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-widest ${
                              isLast
                                ? "text-emerald-900 font-bold"
                                : "text-forest-700"
                            }`}
                          >
                            {isLast
                              ? "Stop 07 · Loop Completed"
                              : `Stop 0${i + 1}`}
                          </span>
                          {stop.badge && (
                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                isLast
                                  ? "bg-emerald-200/80 text-emerald-950"
                                  : "bg-forest-100 text-forest-800"
                              }`}
                            >
                              {stop.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif text-base font-semibold text-forest-950 mt-0.5 mb-1 break-words">
                          {stop.name}
                        </h4>
                        <p className="text-xs text-earth-700 font-light leading-relaxed">
                          {stop.desc}
                        </p>
                      </div>

                      {/* Down arrow connector (between stops) */}
                      {!isLast && (
                        <div className="flex justify-center -my-1 text-forest-300">
                          <ArrowDown className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Mobile Loop-back visual confirmation badge */}
                <div className="mt-3 p-3.5 rounded-xl bg-forest-100/80 border border-dashed border-forest-300 flex items-center justify-between text-xs text-forest-900">
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4 text-forest-700 flex-shrink-0" />
                    <span className="font-medium text-[11px] sm:text-xs">
                      Circles island and returns to Punnamada Lake
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-forest-800 bg-white px-2 py-0.5 rounded border border-forest-200">
                    Loop Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. CUSTOM HOURS CARD */}
          {/* ========================================================================= */}
          <div className="bg-forest-900 text-cream-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-forest-800 shadow-lg">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-gold-400 mb-1.5 block">
                Tailored Itineraries
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-normal mb-2">
                Want More Time?
              </h3>
              <p className="text-sm text-cream-100/90 font-light leading-relaxed">
                Custom durations are also available for guests who want to
                explore at their own pace. Trips longer than 3 hours can be
                arranged on request. While 3 hours remains our recommended
                option for a balanced experience, we are happy to craft a
                flexible schedule for your group.
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
