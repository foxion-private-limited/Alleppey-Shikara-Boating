'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG, NAV_LINKS } from '@/lib/constants';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}



export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const getHref = (href: string) => {
    if (isHome) return href;
    if (href === '#' || href === '') return '/';
    if (href.startsWith('#')) return `/${href}`;
    return href;
  };

  return (
    <footer id="contact" className="relative text-cream-50 overflow-hidden">
      {/* Warm Sunset Backwaters Background with subtle overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-sunset.jpg"
          alt="Warm golden sunset over Kerala backwaters in Alappuzha"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Warm golden-toned overlay to keep the sunset visible and text perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/85 to-forest-950/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-cream-100/15">
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2.5 sm:space-x-3 group w-fit focus:outline-none"
              aria-label="Alleppey Village Shikara Boating Home"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 overflow-hidden rounded-full border border-forest-700/50 bg-forest-900/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Alleppey Village Shikara Boating logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-serif text-xl font-semibold text-cream-50">
                Alleppey Village Shikara Boating
              </span>
            </Link>

            <p className="text-sm text-cream-100/90 font-light leading-relaxed max-w-sm">
              Discover the peaceful backwaters, authentic village canals, and timeless beauty of Alappuzha aboard traditional shaded Shikara boats.
            </p>

            {/* Social / Contact Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/alleppeyvillageshikaraboating"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram - Alleppey Village Shikara Boating"
                className="w-9 h-9 rounded-full bg-forest-900/80 border border-forest-700/60 flex items-center justify-center text-cream-100 hover:text-white hover:bg-forest-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919562627451"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp - Alleppey Village Shikara Boating"
                className="w-9 h-9 rounded-full bg-forest-900/80 border border-forest-700/60 flex items-center justify-center text-cream-100 hover:text-white hover:bg-forest-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:alleppeyvillageshikaraboating@gmail.com"
                aria-label="Email - Alleppey Village Shikara Boating"
                className="w-9 h-9 rounded-full bg-forest-900/80 border border-forest-700/60 flex items-center justify-center text-cream-100 hover:text-white hover:bg-forest-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={getHref(link.href)}
                    className="text-sm text-cream-200/80 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={getHref('#faq')}
                  className="text-sm text-cream-200/80 hover:text-cream-50 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Location details as specified in prompt */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-400">
              Find Us
            </h4>
            <div className="space-y-2 text-sm text-cream-100/90 font-light leading-relaxed">
              <p className="font-normal text-cream-50">
                Vazhichery Jn,
              </p>
              <p>
                near AG &amp; P Pratham Indian Oil and CNG Station,
              </p>
              <p>
                near Sea View Ward, Vazhicherry Ward,
              </p>
              <p>
                Alappuzha, Kerala 688001
              </p>
            </div>

            <div>
              <a
                href={BUSINESS_CONFIG.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gold-300 hover:text-gold-200 transition-colors pt-1"
              >
                <span>Get Directions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact */}
            <div className="pt-2 flex flex-col space-y-2 text-xs text-cream-200/80">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${encodeURIComponent(
                  BUSINESS_CONFIG.contact.whatsappMessagePlaceholder
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:text-white transition-colors group"
                aria-label={`Chat on WhatsApp with ${BUSINESS_CONFIG.contact.phone}`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>WhatsApp: {BUSINESS_CONFIG.contact.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_CONFIG.contact.email}`}
                className="flex items-center space-x-2 hover:text-white transition-colors"
                aria-label={`Send email to ${BUSINESS_CONFIG.contact.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-cream-300" />
                <span>{BUSINESS_CONFIG.contact.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Foxion Credit */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-200/70 font-light space-y-3 sm:space-y-0">
          <p>
            &copy; {currentYear} Alleppey Village Shikara Boating. All rights reserved.
          </p>

          {/* Foxion Credit as specifically required */}
          <div className="flex items-center space-x-1.5 text-xs text-cream-200/80">
            <span>Powered by</span>
            <a
              href="https://foxion.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-300 hover:text-gold-200 font-medium transition-colors underline decoration-gold-400/40 underline-offset-4"
            >
              Foxion
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
