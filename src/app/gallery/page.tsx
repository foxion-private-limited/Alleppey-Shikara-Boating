import type { Metadata } from 'next';
import GalleryView from './GalleryView';
import { getServerGalleryPhotos } from '@/lib/serverGallery';
import { getBaseUrl } from '@/lib/siteUrl';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Photo Gallery | Alleppey Village Shikara Boating',
  description:
    'Browse our curated photo moments from Alleppey Village Shikara Boating in Alappuzha, Kerala. Discover peaceful village canals, lush paddy fields, and golden sunsets.',
  keywords: [
    'Alleppey Shikara gallery',
    'Alappuzha boating photos',
    'Kerala backwater images',
    'Alleppey village canal photos',
    'Shikara boat ride pictures',
    'Vembanad Lake photos',
  ],
  alternates: {
    canonical: `${baseUrl}/gallery`,
  },
  openGraph: {
    title: 'Photo Gallery | Alleppey Village Shikara Boating',
    description:
      'Explore photographic glimpses of authentic Shikara boat cruises, tranquil backwater canals, and golden sunsets in Alappuzha, Kerala.',
    url: `${baseUrl}/gallery`,
    siteName: 'Alleppey Village Shikara Boating',
    images: [
      {
        url: '/images/hero-shikara.jpg',
        width: 1200,
        height: 675,
        alt: 'Alleppey Village Shikara Boating Photo Gallery',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery | Alleppey Village Shikara Boating',
    description:
      'Explore photographic glimpses of authentic Shikara boat cruises in Alappuzha, Kerala.',
    images: ['/images/hero-shikara.jpg'],
  },
};

export default function GalleryPage() {
  const photos = getServerGalleryPhotos();

  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Alleppey Village Shikara Boating Photo Gallery',
    description:
      'Photographic collection of authentic Shikara boating journeys through the village backwaters of Alappuzha, Kerala.',
    url: `${baseUrl}/gallery`,
    provider: {
      '@type': 'TouristAttraction',
      name: 'Alleppey Village Shikara Boating',
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Gallery',
        item: `${baseUrl}/gallery`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <GalleryView initialPhotos={photos} />
    </>
  );
}
