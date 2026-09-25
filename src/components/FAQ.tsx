'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the best time for a Shikara ride in Alappuzha?',
    answer:
      'Early mornings (around 6:00 AM to 9:00 AM) and late afternoons (around 4:30 PM to 6:30 PM) offer the most pleasant weather, gentle light, and tranquil waters. Morning rides are ideal for bird watching, while afternoon rides provide golden sunset views across the backwaters.',
  },
  {
    question: 'How long does a typical boat ride take?',
    answer:
      'Most visitors choose between 2-hour and 4-hour rides. A 2-hour ride covers scenic village waterways, while a 3 or 4-hour cruise allows you to travel deeper into the quieter canals and rural farming communities of Kuttanad.',
  },
  {
    question: 'Can couples book a private Shikara?',
    answer:
      'Yes, private Shikara bookings are standard and popular for couples seeking a peaceful, romantic experience with comfortable cushioned seating and dedicated boatmen.',
  },
  {
    question: 'Is Shikara boating suitable for families with children?',
    answer:
      'Yes, Shikara boats are covered with a shaded canopy and offer comfortable seating, making them well-suited for families of all ages traveling together.',
  },
  {
    question: 'Where does the boat ride start?',
    answer:
      'Rides depart from our designated boarding point at Vazhichery Junction in Alappuzha (Alleppey), Kerala. Exact boarding directions are confirmed upon booking.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.22em] font-semibold text-forest-700 mb-3 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-forest-950 font-normal tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-forest-950 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-forest-800 text-cream-50 rotate-180'
                        : 'bg-forest-50 text-forest-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-earth-800 font-light text-sm sm:text-base leading-relaxed border-t border-forest-50">
                    <p className="mt-2">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
