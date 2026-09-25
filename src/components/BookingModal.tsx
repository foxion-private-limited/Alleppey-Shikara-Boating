'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, MessageCircle, Mail, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_CONFIG } from '@/lib/constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCruiseTitle?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedCruiseTitle,
}: BookingModalProps) {
  const [cruiseType, setCruiseType] = useState(
    selectedCruiseTitle || 'Sunrise Cruise'
  );
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2 Guests (Couple)');
  const [specialNote, setSpecialNote] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedCruiseTitle) {
      setCruiseType(selectedCruiseTitle);
    }
  }, [selectedCruiseTitle]);

  // Handle smooth animation on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const frameId = requestAnimationFrame(() => setIsVisible(true));
      return () => {
        cancelAnimationFrame(frameId);
      };
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello! I would like to book a Shikara boat ride in Alleppey.%0A%0A*Cruise:* ${cruiseType}%0A*Date:* ${
      date || 'Flexible'
    }%0A*Group:* ${guests}%0A${specialNote ? `*Note:* ${specialNote}` : ''}`;

    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${message}`;
    window.open(url, '_blank');
    handleClose();
  };

  const emailSubject = `Shikara Cruise Reservation Inquiry - ${cruiseType}`;
  const emailBody = `Hello Alleppey Village Shikara Boating,\n\nI would like to inquire about booking a cruise:\n- Cruise: ${cruiseType}\n- Preferred Date: ${date || 'Flexible'}\n- Guests: ${guests}\n${specialNote ? `- Special Requests: ${specialNote}\n` : ''}\nPlease let me know availability and pricing.\n\nThank you!`;
  const mailtoUrl = `mailto:${BUSINESS_CONFIG.contact.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-forest-950/65 backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className={`relative w-full max-w-lg sm:max-w-xl bg-cream-50 rounded-2xl sm:rounded-3xl shadow-2xl border border-forest-900/10 overflow-hidden z-10 my-6 transition-all duration-200 ease-out ${
          isVisible
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2'
        }`}
      >
        {/* Subtle Top Luxury Sheen */}
        <div className="h-1.5 w-full bg-gradient-to-r from-forest-800 via-gold-400 to-forest-800" />

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="relative pb-6 border-b border-forest-900/10">
            <button
              onClick={handleClose}
              className="absolute -top-1 -right-1 sm:top-0 sm:right-0 p-2 rounded-full text-forest-800/60 hover:text-forest-950 hover:bg-forest-900/5 transition-colors focus:outline-none"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-900/5 border border-forest-900/10 text-forest-800 text-[11px] font-semibold uppercase tracking-widest mb-2.5">
              <Compass className="w-3.5 h-3.5 stroke-[2]" />
              <span>Direct Captain Reservation</span>
            </div>

            <h3
              id="booking-modal-title"
              className="font-serif text-2xl sm:text-3xl text-forest-950 font-normal tracking-tight leading-tight"
            >
              Reserve Your Shikara Cruise
            </h3>

            <p className="text-xs sm:text-sm text-earth-700 font-light mt-1.5 leading-relaxed pr-8">
              Personalized backwater itineraries in Alappuzha. Choose your details below for instant WhatsApp or email confirmation directly with the boat team.
            </p>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleWhatsAppInquiry} className="pt-6 space-y-4">
            {/* Experience Selection */}
            <div>
              <label
                htmlFor="modal-experience"
                className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5"
              >
                Selected Experience
              </label>
              <div className="relative">
                <select
                  id="modal-experience"
                  value={cruiseType}
                  onChange={(e) => setCruiseType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors appearance-none cursor-pointer pr-10 shadow-xs"
                >
                  <option value="Sunrise Cruise">Sunrise Cruise (6:00 AM – 9:00 AM)</option>
                  <option value="Village Backwater Cruise">Village Backwater Cruise (Flexible Day)</option>
                  <option value="Sunset Cruise">Sunset Cruise (4:30 PM – 6:30 PM)</option>
                  <option value="The Complete Backwater Experience">
                    The Complete Experience (Shikara + Canoe/Kayak + Open Boating)
                  </option>
                  <option value="Custom Private Cruise">Custom Private Route</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-forest-700/60">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date & Guests (Balanced Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="modal-date"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5 flex items-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-forest-700" />
                  <span>Preferred Date</span>
                </label>
                <input
                  id="modal-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors shadow-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="modal-guests"
                  className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5 flex items-center space-x-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-forest-700" />
                  <span>Number of Guests</span>
                </label>
                <div className="relative">
                  <select
                    id="modal-guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors appearance-none cursor-pointer pr-10 shadow-xs"
                  >
                    <option value="1 Guest (Solo)">1 Guest (Solo)</option>
                    <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                    <option value="3-4 Guests (Family/Small Group)">3-4 Guests (Family)</option>
                    <option value="5-8 Guests (Group)">5-8 Guests (Group)</option>
                    <option value="9+ Guests">9+ Guests</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-forest-700/60">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label
                htmlFor="modal-note"
                className="block text-[11px] font-semibold uppercase tracking-wider text-forest-900/80 mb-1.5"
              >
                Special Requests or Notes (Optional)
              </label>
              <textarea
                id="modal-note"
                rows={2}
                value={specialNote}
                onChange={(e) => setSpecialNote(e.target.value)}
                placeholder="e.g. Village lunch on banana leaf, hotel pickup, preferred route..."
                className="w-full px-3.5 py-2 rounded-xl border border-forest-900/15 bg-white text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-700/20 focus:border-forest-700 transition-colors resize-none placeholder:text-earth-400 shadow-xs"
              />
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full group inline-flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Inquire via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Hospitality Assurance & Alternative Email Link */}
            <div className="pt-3 border-t border-forest-900/10 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-700 font-light gap-2.5">
              <div className="flex items-center space-x-1.5 text-[11px] text-earth-600">
                <ShieldCheck className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
                <span>Direct Captain Connection · No Middlemen</span>
              </div>

              {/* Direct email option pulling from environment variable */}
              <a
                href={mailtoUrl}
                className="inline-flex items-center space-x-1.5 text-[11px] text-forest-800 hover:text-forest-950 font-medium transition-colors group"
                aria-label={`Send inquiry email to ${BUSINESS_CONFIG.contact.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-forest-700 group-hover:scale-110 transition-transform" />
                <span className="underline decoration-forest-700/40 hover:decoration-forest-950 underline-offset-2">
                  Prefer email? Contact us
                </span>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
