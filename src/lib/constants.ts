/**
 * Centralized business configuration and placeholders
 * Designed to easily update with real contact & booking information.
 */

const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+916282995964';
const cleanWhatsappDigits = rawWhatsapp.replace(/\D/g, '');
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
  process.env.ADMIN_EMAIL ||
  'alleppeyvillageshikaraboating@gmail.com';

export const BUSINESS_CONFIG = {
  name: 'Alleppey Village Shikara Boating',
  shortName: 'Alleppey Shikara',
  tagline: 'Authentic Kerala Backwater Experiences',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://alleppeyvillageshikaraboating.com',
  location: {
    exactAddress: 'Vazhichery Jn, near AG & P Pratham Indian Oil and CNG Station, Vazhicherry Ward, Alappuzha, Kerala, 688005',
    street: 'Vazhichery Jn, near AG & P Pratham Indian Oil and CNG Station, Vazhicherry Ward',
    city: 'Alappuzha (Alleppey)',
    state: 'Kerala',
    postalCode: '688005',
    country: 'India',
    mapsUrl: 'https://maps.google.com/?q=Vazhichery+Jn,+near+AG+%26+P+Pratham+Indian+Oil+and+CNG+Station,+Vazhicherry+Ward,+Alappuzha,+Kerala+688005',
    embedUrl: 'https://maps.google.com/maps?q=Vazhichery+Jn,+near+AG+%26+P+Pratham+Indian+Oil+and+CNG+Station,+Vazhicherry+Ward,+Alappuzha,+Kerala+688005&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  contact: {
    phone: rawWhatsapp,
    phonePlaceholder: rawWhatsapp,
    whatsappNumber: rawWhatsapp,
    whatsappNumberPlaceholder: cleanWhatsappDigits,
    whatsappCleanDigits: cleanWhatsappDigits,
    whatsappMessagePlaceholder: 'Hi, I would like to enquire about a Shikara boating experience in Alappuzha.',
    email: contactEmail,
    emailPlaceholder: contactEmail,
  },
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    foxion: 'https://foxion.in/',
  },
};

export const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Routes', href: '#routes' },
  { label: 'Food', href: '#food' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
];
