import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const serifFont = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Alleppey Village Shikara Boating | Alappuzha Backwater Tours',
  description:
    'Experience authentic Shikara boating through peaceful village canals, lush paddy fields, and serene backwaters in Alappuzha (Alleppey), Kerala. Private and small-group scenic tours.',
  keywords: [
    'Alleppey Shikara boating',
    'Alappuzha Shikara boating',
    'Alleppey backwater tour',
    'Kerala village backwater experience',
    'Alappuzha boating',
    'Shikara boat ride Alleppey',
    'Alleppey village boating',
    'private Shikara Alappuzha',
    'Kerala backwaters',
  ],
  authors: [{ name: 'Alleppey Village Shikara Boating' }],
  metadataBase: new URL('https://alleppeyvillageshikaraboating.com'),
  alternates: {
    canonical: 'https://alleppeyvillageshikaraboating.com/',
  },
  openGraph: {
    title: 'Alleppey Village Shikara Boating | Authentic Kerala Backwater Tours',
    description:
      'Glide through peaceful village canals, lush paddy fields, and palm-lined waterways aboard a traditional Shikara in Alappuzha (Alleppey), Kerala.',
    url: 'https://alleppeyvillageshikaraboating.com/',
    siteName: 'Alleppey Village Shikara Boating',
    images: [
      {
        url: '/images/hero-shikara.jpg',
        width: 1200,
        height: 675,
        alt: 'Traditional Shikara Boat cruising through peaceful village canals in Alleppey, Kerala',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alleppey Village Shikara Boating | Alappuzha Backwater Tours',
    description:
      'Cruise peaceful village canals and palm-lined waterways aboard a traditional Shikara in Alleppey, Kerala.',
    images: ['/images/hero-shikara.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD)
  // LocalBusiness, BreadcrumbList & FAQPage
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: 'Alleppey Village Shikara Boating',
    alternateName: 'Alappuzha Village Shikara Boating',
    description:
      'Authentic Shikara boat cruises and village backwater experiences in Alappuzha (Alleppey), Kerala, India.',
    url: 'https://alleppeyvillageshikaraboating.com/',
    image: 'https://alleppeyvillageshikaraboating.com/images/hero-shikara.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Vazhichery Jn, near AG & P Pratham Indian Oil and CNG Station, Vazhicherry Ward',
      addressLocality: 'Alappuzha',
      addressRegion: 'Kerala',
      postalCode: '688005',
      addressCountry: 'IN',
    },
    touristType: ['Foreign tourists', 'Couples', 'Families', 'Solo travelers'],
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://alleppeyvillageshikaraboating.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Routes',
        item: 'https://alleppeyvillageshikaraboating.com/#routes',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pricing',
        item: 'https://alleppeyvillageshikaraboating.com/#pricing',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Food',
        item: 'https://alleppeyvillageshikaraboating.com/#food',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Location',
        item: 'https://alleppeyvillageshikaraboating.com/#location',
      },
    ],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the best time for a Shikara ride in Alappuzha?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Early mornings (around 6:00 AM to 9:00 AM) and late afternoons (around 4:30 PM to 6:30 PM) offer the most pleasant weather, gentle light, and tranquil waters.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a typical boat ride take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most visitors choose between 2-hour and 3-hour rides. We especially recommend the 3-hour voyage for a balanced experience of lakes, village walks, and narrow canals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can couples book a private Shikara?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, private Shikara bookings are standard and popular for couples seeking a peaceful, romantic experience with comfortable cushioned seating.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Shikara boating suitable for families with children?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Shikara boats are covered with a shaded canopy and offer comfortable seating, making them well-suited for families of all ages.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where does the boat ride start?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rides depart from our designated boarding point at Vazhichery Jn, near AG & P Pratham Indian Oil and CNG Station, Vazhicherry Ward, Alappuzha, Kerala, 688005.',
        },
      },
    ],
  };

  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="bg-cream-50 text-forest-950 font-sans antialiased selection:bg-forest-800 selection:text-cream-100">
        {children}
      </body>
    </html>
  );
}
