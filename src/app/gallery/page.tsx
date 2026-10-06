import type { Metadata } from 'next';
import GalleryView from './GalleryView';
import { getServerGalleryPhotos } from '@/lib/serverGallery';
import { getBaseUrl } from '@/lib/siteUrl';

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: 'Alleppey Shikara Boating Gallery | Alappuzha Backwaters',
  description:
    'Explore photos of Alleppey shikara boating, Kerala backwaters, village canals and scenic Alappuzha boat rides.',
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
    title: 'Alleppey Shikara Boating Gallery | Alappuzha Backwaters',
    description:
      'Explore photos of Alleppey shikara boating, Kerala backwaters, village canals and scenic Alappuzha boat rides.',
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
    title: 'Alleppey Shikara Boating Gallery | Alappuzha Backwaters',
    description:
      'Explore photos of Alleppey shikara boating, Kerala backwaters, village canals and scenic Alappuzha boat rides.',
    images: ['/images/hero-shikara.jpg'],
  },
};

export default function GalleryPage() {
  const photos = getServerGalleryPhotos();

  const galleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Alleppey Shikara Boating Gallery',
    description:
      'Explore photos of Alleppey shikara boating, Kerala backwaters, village canals and scenic Alappuzha boat rides.',
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
