"use client";

import React from "react";
import Image from "next/image";
import { Utensils, MessageCircle, Info } from "lucide-react";
import { BUSINESS_CONFIG } from "@/lib/constants";

const foodExperiences = [
  {
    title: "Idli & Sambar",
    category: "Breakfast",
    description:
      "Start your day with a simple and authentic Kerala-style breakfast of soft idli served with delicious sambar.",
    image: "/images/food-idli.jpg",
  },
  {
    title: "Kerala Meals",
    category: "Traditional Lunch",
    description:
      "Enjoy an authentic Kerala meal served traditionally on a banana leaf, with a selection of local flavours and dishes.",
    image: "/images/food-sadya.jpg",
  },
  {
    title: "Prawns — Karimeen Pollichathu",
    category: "Kerala Specialities",
    description:
      "Taste the flavours of Kerala with fresh seafood prepared in traditional local style, including prawns and Karimeen Pollichathu.",
    image: "/images/food-seafood.jpg",
  },
  {
    title: "Tapioca & Toddy",
    category: "Traditional Kerala Experience",
    description:
      "Experience a traditional Kerala combination of soft tapioca with locally enjoyed toddy.",
    image: "/images/food-tapioca.png",
  },
];

export default function FoodSection() {
  const handleFoodInquiry = () => {
    const text =
      "Hi, I would like to enquire about authentic Kerala food options with our Shikara boat ride in Alappuzha.";
    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(
      text,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section id="food" className="py-24 bg-white border-b border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-forest-800 text-xs uppercase tracking-widest font-semibold mb-3">
            <Utensils className="w-3.5 h-3.5 text-forest-700" />
            <span>Local Cuisine</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Taste the Flavours of Kerala
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            Make your backwater journey even more memorable with authentic local
            food.
          </p>
        </div>

        {/* Exactly 4 Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {foodExperiences.map((item, index) => (
            <div
              key={index}
              className="group bg-cream-50/50 rounded-2xl overflow-hidden border border-forest-900/10 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-forest-950/75 backdrop-blur-sm text-gold-300 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-serif text-lg font-medium text-forest-950 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-earth-800 font-light leading-relaxed flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Small subtle note & inquiry CTA */}
        <div className="max-w-2xl mx-auto text-center bg-cream-50/80 p-6 rounded-2xl border border-forest-100 shadow-sm">
          <div className="inline-flex items-center justify-center space-x-2 text-xs text-forest-800 font-medium mb-4">
            <Info className="w-4 h-4 text-forest-700 flex-shrink-0" />
            <span>
              Food options can be arranged depending on the selected experience
              and availability.
            </span>
          </div>

          <div>
            <button
              onClick={handleFoodInquiry}
              className="inline-flex items-center space-x-2 px-7 py-3 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 text-xs font-semibold uppercase tracking-wider shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Ask About Food Options</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
