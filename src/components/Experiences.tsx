import React from 'react';
import ExperienceCard, { ExperienceItem } from './ExperienceCard';

const experiencesData: ExperienceItem[] = [
  {
    id: 'sunrise-cruise',
    title: 'Sunrise Cruise',
    description:
      'Start your day on calm backwaters, surrounded by village life, birds and golden morning light.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    duration: '2 to 3 Hours',
    timing: '6:00 AM – 9:00 AM',
    highlights: ['Morning Mist', 'Bird Watching', 'Quiet Waters', 'Chai on Boat'],
  },
  {
    id: 'village-cruise',
    title: 'Village Backwater Cruise',
    description:
      'Travel through peaceful canals, paddy fields and authentic Kerala villages.',
    image: '/images/village-canal.jpg',
    duration: '3 to 4 Hours',
    timing: 'Flexible Day Slots',
    highlights: ['Narrow Canals', 'Village Temples', 'Kuttanad Fields', 'Local Culture'],
  },
  {
    id: 'sunset-cruise',
    title: 'Sunset Cruise',
    description:
      'Watch the backwaters turn golden as the sun slowly disappears over Kerala’s palm-lined horizon.',
    image: '/images/sunset-cruise.jpg',
    duration: '2 to 3 Hours',
    timing: '4:30 PM – 6:30 PM',
    highlights: ['Golden Reflections', 'Cool Breeze', 'Evening Tranquility', 'Stunning Views'],
  },
];

interface ExperiencesProps {
  onSelectExperience?: (exp: ExperienceItem) => void;
}

export default function Experiences({ onSelectExperience }: ExperiencesProps) {
  const handleSelect = (exp: ExperienceItem) => {
    if (onSelectExperience) {
      onSelectExperience(exp);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="experiences" className="py-24 bg-white border-y border-forest-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
            Curated Journeys
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight mb-4">
            Choose Your Backwater Experience
          </h2>
          <p className="text-base sm:text-lg text-earth-800 font-light leading-relaxed">
            Whether you want a peaceful morning cruise or a magical sunset on the water, choose the experience that suits your journey.
          </p>
        </div>

        {/* 3 Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {experiencesData.map((exp) => (
            <ExperienceCard
              key={exp.id}
              experience={exp}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Small note regarding custom options */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-earth-600 font-normal">
            Looking for custom durations or specific departure points? Contact our local team directly.
          </p>
        </div>
      </div>
    </section>
  );
}
