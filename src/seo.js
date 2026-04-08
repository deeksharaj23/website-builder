/**
 * Shared SEO defaults & JSON-LD schema helpers.
 *
 * SITE_URL / SITE_NAME are the single source of truth for all meta values.
 * Update them here when you deploy to a real domain.
 */

export const SITE_NAME = 'Website Builder'
export const SITE_URL  = 'https://websitebuilder.app'   // update on deploy

export const DEFAULT_META = {
  title:       `${SITE_NAME} - Build your unique website in seconds`,
  description: 'Turn your idea into a fully designed, ready-to-launch website, instantly. Powered by AI.',
  ogType:      'website',
  ogImage:     `${SITE_URL}/og-image.png`,
  ogImageAlt:  `${SITE_NAME} - AI-powered website builder`,
  twitterCard: 'summary_large_image',
  twitterSite: '@websitebuilder',
  robots:      'index, follow',
  canonical:   null,   // derived from location.pathname at runtime
}

// ── JSON-LD schema factories ──────────────────────────────────────────────────

/**
 * WebSite + SoftwareApplication schema — used on the homepage.
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: DEFAULT_META.description,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/builder?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: 'WebApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: DEFAULT_META.description,
      },
    ],
  }
}

/**
 * WebPage schema — used on all non-home pages.
 * @param {{ title: string, description: string, url: string }} opts
 */
export function webPageSchema({ title, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}
