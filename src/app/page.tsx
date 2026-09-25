'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Introduction from '@/components/Introduction';
import JourneySection from '@/components/JourneySection';
import FoodSection from '@/components/FoodSection';
import Experiences from '@/components/Experiences';
import FeaturedExperience from '@/components/FeaturedExperience';
import PricingSection from '@/components/PricingSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Location from '@/components/Location';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import { ExperienceItem } from '@/components/ExperienceCard';

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCruiseTitle, setSelectedCruiseTitle] = useState<string>(
    '3 Hour Backwater Experience'
  );

  const handleOpenBooking = (cruiseTitle?: string) => {
    if (cruiseTitle) {
      setSelectedCruiseTitle(cruiseTitle);
    }
    setIsBookingOpen(true);
  };

  const handleSelectExperience = (exp: ExperienceItem) => {
    setSelectedCruiseTitle(exp.title);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-forest-950 font-sans selection:bg-forest-800 selection:text-cream-100">
      {/* Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* 2. Trust Bar */}
        <TrustBar />

        {/* 3. Introduction Section */}
        <Introduction />

        {/* 4. Journey Through the Backwaters (2-Hour & 3-Hour Recommended Route) */}
        <JourneySection onOpenBooking={handleOpenBooking} />

        {/* 5. Food Experience Section (4 Authentic Items) */}
        <FoodSection />

        {/* 6. Experiences Packages (Sunrise, Village, Sunset) */}
        <Experiences onSelectExperience={handleSelectExperience} />

        {/* 7. Featured Signature Combination */}
        <FeaturedExperience
          onOpenBooking={() => handleOpenBooking('The Complete Backwater Experience')}
        />

        {/* 8. Pricing & Dynamic Offer Section (Connected to MongoDB) */}
        <PricingSection onOpenBooking={handleOpenBooking} />

        {/* 9. Why Choose Us */}
        <WhyChooseUs />

        {/* 10. Visual Gallery Section */}
        <Gallery />

        {/* 11. Guest Reviews */}
        <Testimonials />

        {/* 12. Location & Interactive Map */}
        <Location />

        {/* 13. Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* 14. Warm Sunset Footer with Exact Address & Foxion Credit */}
      <Footer />

      {/* Booking Inquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedCruiseTitle={selectedCruiseTitle}
      />
    </div>
  );
}
