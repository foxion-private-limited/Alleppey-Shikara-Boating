import React from 'react';
import Image from 'next/image';
import { ArrowRight, Clock, Users } from 'lucide-react';

export interface ExperienceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  timing: string;
  highlights: string[];
}

interface ExperienceCardProps {
  experience: ExperienceItem;
  onSelect: (experience: ExperienceItem) => void;
}

export default function ExperienceCard({ experience, onSelect }: ExperienceCardProps) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-forest-900/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Card Image */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={`${experience.title} - Shikara boating in Alleppey, Kerala`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-black/10" />

        {/* Timing Tag */}
        <div className="absolute top-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-950/70 backdrop-blur-md text-cream-100 text-xs font-medium border border-white/10">
          <Clock className="w-3.5 h-3.5 text-gold-400" />
          <span>{experience.timing}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-forest-700 mb-2">
          <span>{experience.duration}</span>
          <span>·</span>
          <span>Private Shikara</span>
        </div>

        <h3 className="font-serif text-2xl text-forest-950 font-medium mb-3 group-hover:text-forest-800 transition-colors">
          {experience.title}
        </h3>

        <p className="text-sm text-earth-800 leading-relaxed font-light mb-6 flex-grow">
          {experience.description}
        </p>

        {/* Highlights Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {experience.highlights.map((h) => (
            <span
              key={h}
              className="text-[11px] px-2.5 py-1 rounded-md bg-forest-50 text-forest-800 font-medium"
            >
              {h}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2 border-t border-forest-900/10">
          <button
            onClick={() => onSelect(experience)}
            className="w-full inline-flex items-center justify-between text-sm font-semibold text-forest-900 group-hover:text-forest-700 py-1 transition-colors"
          >
            <span>Explore Cruise</span>
            <div className="w-8 h-8 rounded-full bg-forest-50 group-hover:bg-forest-800 group-hover:text-cream-50 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </article>
  );
}
