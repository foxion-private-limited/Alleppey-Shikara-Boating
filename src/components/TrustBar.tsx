import React from 'react';
import { Award, Compass, Users, Waves } from 'lucide-react';

const trustItems = [
  {
    icon: Award,
    title: '5+ Years Experience',
    subtitle: 'Trusted local boat operators',
  },
  {
    icon: Compass,
    title: 'Authentic Village Routes',
    subtitle: 'Quiet canals away from crowds',
  },
  {
    icon: Users,
    title: 'Private & Small Groups',
    subtitle: 'Personalized serene journeys',
  },
  {
    icon: Waves,
    title: 'Alappuzha Backwaters',
    subtitle: 'Heart of Kerala waterways',
  },
];

export default function TrustBar() {
  return (
    <section className="relative z-20 -mt-8 sm:-mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-forest-950/5 border border-forest-900/10 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-forest-900/10">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start space-x-3.5 ${
                  index > 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                  <Icon className="w-5 h-5 stroke-[1.75]" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm sm:text-base font-semibold text-forest-950 tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-xs text-forest-700/80 font-normal mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
