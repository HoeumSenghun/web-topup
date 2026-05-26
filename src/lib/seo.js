import { siteConfig } from '@/data/mock'

export const defaultMetadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.name,
  description:
    'Fast, secure game diamond top-up in Cambodia. Pay with ABA, ACLEDA, or KHQR. Instant delivery for Mobile Legends, Free Fire, PUBG, and more.',
  keywords: [
    'game top up cambodia',
    'mlbb diamonds',
    'free fire top up',
    'pubg uc cambodia',
    'aba pay game',
    'khqr top up',
    'diamond shop cambodia',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'km_KH',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Cambodia No.1 Game Top-Up`,
    description:
      'Instant game top-up with ABA, ACLEDA & KHQR. Trusted by gamers across Cambodia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: 'Cambodia game top-up — fast, secure, instant delivery.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export function getJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
