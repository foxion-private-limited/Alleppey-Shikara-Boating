/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WHATSAPP_NUMBER: process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    SITE_URL: process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  },
  skipTrailingSlashRedirect: true,
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/favicon.ico',
        destination: '/logo.png',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/about-us/',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/packages-2',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/packages-2/',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/contact',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/contact/',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/gallery/',
        destination: '/gallery',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
