/** @type {import('next').NextConfig} */
const nextConfig = {
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
