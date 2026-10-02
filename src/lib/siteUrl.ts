/**
 * Centralized Site URL Helper
 *
 * Ensures canonical, OpenGraph, sitemap, robots, and structured data
 * resolve dynamically from SITE_URL without hardcoding a
 * temporary Vercel preview domain as permanent production identity.
 */

export function getBaseUrl(): string {
  // 1. Explicit public site URL configured via environment variable
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl && siteUrl.trim()) {
    return siteUrl.trim().replace(/\/+$/, '');
  }

  // 2. Fallback to production business domain
  return 'https://alleppeyvillageshikaraboating.com';
}
