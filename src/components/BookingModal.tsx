'use client';

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Clock, MessageCircle, Phone, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    if (selectedCruiseTitle) {
      setCruiseType(selectedCruiseTitle);
    }
  }, [selectedCruiseTitle]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleWhatsAppInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello! I would like to book a Shikara boat ride in Alleppey.%0A%0A*Cruise:* ${cruiseType}%0A*Date:* ${
      date || 'Flexible'
    }%0A*Group:* ${guests}%0A${specialNote ? `*Note:* ${specialNote}` : ''}`;

    const url = `https://wa.me/${BUSINESS_CONFIG.contact.whatsappCleanDigits}?text=${message}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-forest-900/10 overflow-hidden z-10 my-8">
        {/* Header */}
        <div className="bg-forest-900 text-cream-50 p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-cream-200/80 hover:text-white hover:bg-forest-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center space-x-1.5 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alappuzha Backwater Booking</span>
          </div>
          <h3 className="font-serif text-2xl text-cream-50 font-medium">
            Reserve Your Shikara Ride
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 font-light mt-1">
            Fill in your preferred details. You will connect directly with the local boat team.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleWhatsAppInquiry} className="p-6 sm:p-7 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest-900 mb-1.5">
              Experience Type
            </label>
            <select
              value={cruiseType}
              onChange={(e) => setCruiseType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-forest-200 bg-cream-50/50 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
            >
              <option value="Sunrise Cruise">Sunrise Cruise (6:00 AM – 9:00 AM)</option>
              <option value="Village Backwater Cruise">Village Backwater Cruise (Flexible Day)</option>
              <option value="Sunset Cruise">Sunset Cruise (4:30 PM – 6:30 PM)</option>
              <option value="The Complete Backwater Experience">The Complete Experience (Shikara + Canoe/Kayak)</option>
              <option value="Custom Private Cruise">Custom Private Route</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-900 mb-1.5">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-forest-200 bg-cream-50/50 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-forest-900 mb-1.5">
                Number of Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-forest-200 bg-cream-50/50 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600"
              >
                <option value="1 Guest (Solo)">1 Guest (Solo)</option>
                <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                <option value="3-4 Guests (Family/Small Group)">3-4 Guests (Family)</option>
                <option value="5-8 Guests (Group)">5-8 Guests (Group)</option>
                <option value="9+ Guests">9+ Guests</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-forest-900 mb-1.5">
              Special Requests or Questions
            </label>
            <textarea
              rows={2}
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Traditional Kerala breakfast request, hotel pick-up questions..."
              className="w-full px-4 py-2 rounded-xl border border-forest-200 bg-cream-50/50 text-forest-950 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-forest-800 hover:bg-forest-900 text-cream-50 font-semibold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Inquire via WhatsApp</span>
            </button>
          </div>

          <div className="text-center pt-1">
            <p className="text-[11px] text-earth-600 font-light">
              Sample prototype booking inquiry · Direct connection to boat captain
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
