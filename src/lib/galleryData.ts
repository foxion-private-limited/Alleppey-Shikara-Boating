/**
 * Curated Gallery Configuration & Editorial Layout Definition
 * Art-directed presentation of authentic Alleppey Village Shikara Boating moments.
 */

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: string;
  location?: string;
  width: number;
  height: number;
  aspectRatio: number;
  span: string; // Tailored 12-column responsive grid span
}

export const GALLERY_CATEGORIES = [
  'All Photos',
  'Shikara Cruises',
  'Couples & Romance',
  'Family & Friends',
  'Village Canals',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

/**
 * The 16 Authentic Photographs with Art-Directed Editorial Grid Spans
 * Each row in the 12-column layout balances wide landscapes and tall portraits
 * preserving 100% natural aspect ratios with zero arbitrary fixed heights.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  // --- ROW 1: Hero Setting Sail (8 + 4 = 12 cols) ---
  {
    id: 1,
    src: '/gallery/1.jpg',
    width: 1600,
    height: 1066,
    aspectRatio: 1.5,
    title: 'Golden Sunset Bow Cruise',
    category: 'Shikara Cruises',
    location: 'Punnamada Lake, Alappuzha',
    alt: 'Traveler relaxing on the front bow of traditional Shikara boat at golden hour in Alleppey',
    span: 'col-span-1 sm:col-span-2 lg:col-span-8',
  },
  {
    id: 2,
    src: '/gallery/2.jpg',
    width: 768,
    height: 1024,
    aspectRatio: 0.75,
    title: 'Family Moments on the Lake',
    category: 'Family & Friends',
    location: 'Open Lake Waters',
    alt: 'Smiling family with child enjoying cushioned front deck of Shikara boat in Alappuzha',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },

  // --- ROW 2: Cinematic Duo Across the Open Waters (6 + 6 = 12 cols) ---
  {
    id: 3,
    src: '/gallery/3.jpg',
    width: 1024,
    height: 683,
    aspectRatio: 1.5,
    title: 'Romantic Evening on the Waters',
    category: 'Couples & Romance',
    location: 'Vembanad Lake Horizon',
    alt: 'Couple relaxing together on Shikara front deck under evening sky in Alleppey',
    span: 'col-span-1 sm:col-span-1 lg:col-span-6',
  },
  {
    id: 4,
    src: '/gallery/4.jpg',
    width: 1024,
    height: 683,
    aspectRatio: 1.5,
    title: 'Watching Houseboats in Golden Light',
    category: 'Couples & Romance',
    location: 'Punnamada Backwaters',
    alt: 'Couple pointing at traditional kettuvallam houseboat passing by in golden afternoon sunlight',
    span: 'col-span-1 sm:col-span-1 lg:col-span-6',
  },

  // --- ROW 3: Group Joy & Intimate Detail (8 + 4 = 12 cols) ---
  {
    id: 5,
    src: '/gallery/5.jpg',
    width: 1024,
    height: 683,
    aspectRatio: 1.5,
    title: 'Friends on a Backwater Voyage',
    category: 'Family & Friends',
    location: 'Alleppey Waterways',
    alt: 'Group of four happy friends enjoying private Shikara boat ride with decorative dreamcatchers',
    span: 'col-span-1 sm:col-span-2 lg:col-span-8',
  },
  {
    id: 8,
    src: '/gallery/8.jpg',
    width: 768,
    height: 1024,
    aspectRatio: 0.75,
    title: 'Joy on the Sun Deck',
    category: 'Family & Friends',
    location: 'Village Canal Route',
    alt: 'Little toddler smiling while seated on comfortable yellow sun deck cushions',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },

  // --- ROW 4: Canal Exploration & Relaxation (6 + 6 = 12 cols) ---
  {
    id: 7,
    src: '/gallery/7.jpg',
    width: 1024,
    height: 683,
    aspectRatio: 1.5,
    title: 'Canal Walking Tour',
    category: 'Village Canals',
    location: 'Kainakary Village Walk',
    alt: 'Tourists taking guided village walk along stone canal bank during Shikara tour',
    span: 'col-span-1 sm:col-span-1 lg:col-span-6',
  },
  {
    id: 9,
    src: '/gallery/9.jpg',
    width: 800,
    height: 534,
    aspectRatio: 1.5,
    title: 'Relaxing on the Sun Deck',
    category: 'Shikara Cruises',
    location: 'Vazhicherry Waterways',
    alt: 'Guest lounging on the spacious sun deck cushion of Shikara boat',
    span: 'col-span-1 sm:col-span-1 lg:col-span-6',
  },

  // --- ROW 5: Architectural Perspective & Detail (8 + 4 = 12 cols) ---
  {
    id: 15,
    src: '/gallery/15.jpg',
    width: 800,
    height: 601,
    aspectRatio: 1.33,
    title: 'View Through the Shaded Cabin',
    category: 'Shikara Cruises',
    location: 'Private Shikara Interior',
    alt: 'Interior perspective through bamboo thatch ceiling and rattan chairs towards couple on bow',
    span: 'col-span-1 sm:col-span-2 lg:col-span-8',
  },
  {
    id: 10,
    src: '/gallery/10.jpg',
    width: 768,
    height: 1024,
    aspectRatio: 0.75,
    title: 'Curious Wonder',
    category: 'Family & Friends',
    location: 'Canal Crossing',
    alt: 'Close-up portrait of baby girl on boat deck looking across the water',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },

  // --- ROW 6: Trio of Kerala Portraits (4 + 4 + 4 = 12 cols) ---
  {
    id: 13,
    src: '/gallery/13.jpg',
    width: 576,
    height: 1024,
    aspectRatio: 0.56,
    title: 'Traditional Kasavu Saree Elegance',
    category: 'Village Canals',
    location: 'Nedumudi Canals',
    alt: 'Lady in traditional Kerala Kasavu saree seated inside authentic bamboo-roofed Shikara boat',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },
  {
    id: 11,
    src: '/gallery/11.jpg',
    width: 768,
    height: 1024,
    aspectRatio: 0.75,
    title: 'Mother & Child on the Waterways',
    category: 'Family & Friends',
    location: 'Alappuzha Backwaters',
    alt: 'Mother and child smiling together while seated on the boat bow',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },
  {
    id: 12,
    src: '/gallery/12.jpg',
    width: 768,
    height: 1024,
    aspectRatio: 0.75,
    title: 'Gliding Past Coconut Groves',
    category: 'Shikara Cruises',
    location: 'Champakulam Waters',
    alt: 'Lady in blue dress smiling on Shikara boat with coconut groves and blue sky in background',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },
  {
    id: 6,
    src: '/gallery/6.jpg',
    width: 1024,
    height: 683,
    aspectRatio: 1.5,
    title: 'Under Handcrafted Dreamcatchers',
    category: 'Couples & Romance',
    location: 'Vembanad Sunset Viewpoint',
    alt: 'Couple smiling on Shikara boat deck framed by colorful handcrafted hanging dreamcatchers',
    span: 'col-span-1 sm:col-span-2 lg:col-span-8',
  },
  {
    id: 14,
    src: '/gallery/14.jpg',
    width: 576,
    height: 1024,
    aspectRatio: 0.56,
    title: 'Romantic Kiss on the Lake',
    category: 'Couples & Romance',
    location: 'Quiet Village Stretch',
    alt: 'Couple enjoying a romantic moment on the front of Shikara boat under bright blue skies',
    span: 'col-span-1 sm:col-span-1 lg:col-span-4',
  },
];
