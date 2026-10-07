import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { getBaseUrl } from '@/lib/siteUrl';
import { BUSINESS_CONFIG } from '@/lib/constants';

const baseUrl = getBaseUrl();

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
  metadataBase: new URL(baseUrl),
  title: 'Alleppey Shikara Boating | Alappuzha Backwater Tours',
  description:
    'Book Alleppey Shikara boating through peaceful backwaters and village canals. Private 2–3 hour rides on Punnamada and Vembanad Lake from ₹600/hr.',
  keywords: [
    'Alleppey Shikara Boating',
    'Shikara Boating Alleppey',
    'Alappuzha Shikara Boating',
    'Alleppey Shikara Boat',
    'Alleppey Backwater Boat Ride',
    'Shikara Boat Ride Alleppey',
    'Alleppey Shikara Boating Price',
    'Sunrise Shikara Ride Alleppey',
    'Sunset Shikara Ride Alleppey',
    'Village Shikara Ride Alleppey',
    'Alappuzha Backwater Tours',
    'Vembanad Lake boating',
    'Kerala backwaters',
  ],
  authors: [{ name: 'Alleppey Village Shikara Boating' }],
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Alleppey Shikara Boating | Alappuzha Backwater Tours',
    description:
      'Experience authentic Shikara boating through tranquil village canals, lush paddy fields, and serene backwaters in Alappuzha (Alleppey), Kerala. Private sunrise & sunset tours.',
    url: `${baseUrl}/`,
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
    title: 'Alleppey Shikara Boating | Alappuzha Backwater Tours',
    description:
      'Cruise peaceful village canals, lush paddy fields, and palm-lined waterways aboard a traditional Shikara in Alleppey, Kerala.',
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
  verification: {
    yandex: 'f6b32eaf7ad40810',
    other: {
      'p:domain_verify': 'c07d761692067a84eae8bbf0129f8aaf',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data (JSON-LD)
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LocalBusiness', 'TravelAgency'],
    '@id': `${baseUrl}/#business`,
    name: 'Alleppey Village Shikara Boating',
    alternateName: [
      'Alleppey Shikara Boating',
      'Alappuzha Shikara Boating',
      'Alleppey Village Shikara',
    ],
    description:
      'Authentic private Shikara boat cruises, village canal tours, and sunrise/sunset backwater rides in Alappuzha (Alleppey), Kerala, India.',
    url: `${baseUrl}/`,
    logo: `${baseUrl}/logo.png`,
    telephone: BUSINESS_CONFIG.contact.phone,
    email: BUSINESS_CONFIG.contact.email,
    priceRange: '₹600 - ₹3500',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    image: [
      `${baseUrl}/images/hero-shikara.jpg`,
      `${baseUrl}/images/village-canal.jpg`,
      `${baseUrl}/images/sunset-cruise.jpg`,
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress:
        'Vazhichery Jn, near AG & P Pratham Indian Oil and CNG Station, near Sea View Ward, Vazhicherry Ward',
      addressLocality: 'Alappuzha',
      addressRegion: 'Kerala',
      postalCode: '688001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.5001983,
      longitude: 76.3414791,
    },
    hasMap: BUSINESS_CONFIG.location.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '18:30',
      },
    ],
    touristType: ['Couples', 'Families', 'Foreign tourists', 'Solo travelers'],
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Alappuzha' },
      { '@type': 'AdministrativeArea', name: 'Alleppey' },
      { '@type': 'AdministrativeArea', name: 'Kerala' },
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        name: 'Standard Shikara Boating (Hourly)',
        description:
          'Private Shikara boat ride for up to 6 people through Alleppey backwaters',
        price: '600',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        validFrom: '2025-01-01',
      },
      {
        '@type': 'Offer',
        name: '3 Hour Backwater Experience',
        description:
          'Recommended 3-hour cruise covering Vembanad Lake, village walking, paddy fields, and narrow canals',
        price: '1800',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    ],
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Alleppey Village Shikara Boating',
    alternateName: 'Alleppey Shikara Boating',
    url: `${baseUrl}/`,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="bg-cream-50 text-forest-950 font-sans antialiased selection:bg-forest-800 selection:text-cream-100">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2Y4JVT2HBB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2Y4JVT2HBB');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
