'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Compass } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookClick = () => {
    setMobileMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-50/95 backdrop-blur-md shadow-sm border-b border-forest-900/10 py-3.5'
          : 'bg-gradient-to-b from-forest-950/80 via-forest-950/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <Link
            href="#"
            className="group flex items-center space-x-2.5 focus:outline-none"
            aria-label="Alleppey Village Shikara Boating Home"
          >
            <span
              className={`p-1.5 rounded-full transition-colors duration-300 ${
                isScrolled
                  ? 'bg-forest-800 text-cream-50'
                  : 'bg-white/15 text-cream-100 backdrop-blur-sm border border-white/20'
              }`}
            >
              <Compass className="w-5 h-5 stroke-[1.75]" />
            </span>
            <div className="flex flex-col">
              <span
                className={`font-serif text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-forest-900' : 'text-cream-50'
                }`}
              >
                Alleppey Village Shikara Boating
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-forest-700/80' : 'text-cream-200/80'
                }`}
              >
                Alappuzha · Kerala
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 relative group py-1 ${
                  isScrolled
                    ? 'text-forest-800 hover:text-forest-950'
                    : 'text-cream-100/90 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                    isScrolled ? 'bg-forest-800' : 'bg-gold-400'
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Action: Book Your Ride */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleBookClick}
              className={`inline-flex items-center justify-center px-5 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-300 shadow-sm ${
                isScrolled
                  ? 'bg-forest-800 text-cream-50 hover:bg-forest-900 hover:shadow-md'
                  : 'bg-cream-100 text-forest-950 hover:bg-white hover:shadow-lg'
              }`}
            >
              Book Your Ride
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                isScrolled
                  ? 'text-forest-900 hover:bg-forest-100/60'
                  : 'text-cream-50 hover:bg-white/10'
              }`}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-50/98 backdrop-blur-xl border-b border-forest-900/10 shadow-xl transition-all animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 pt-5 pb-6 space-y-4">
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-forest-900 hover:text-forest-700 py-2 border-b border-forest-100/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleBookClick}
                className="w-full inline-flex items-center justify-center px-5 py-3 text-sm font-semibold tracking-wider uppercase rounded-full bg-forest-800 text-cream-50 hover:bg-forest-900 shadow-md transition-colors"
              >
                Book Your Ride
              </button>
            </div>

            <div className="pt-2 text-center text-xs text-forest-700/80">
              <span>Alappuzha, Kerala · Authentic Shikara Cruises</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
