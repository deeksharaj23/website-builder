import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_META, SITE_NAME, SITE_URL } from '@/seo'

/**
 * useMeta — declarative per-page SEO.
 *
 * Manages: <title>, meta description, Open Graph, Twitter Card, robots,
 *          canonical <link>, and an optional JSON-LD <script>.
 *
 * Any field not passed falls back to DEFAULT_META (src/seo.js).
 * On unmount the previous page's overrides are restored to defaults so
 * stale values never bleed into the next page.
 *
 * @param {Partial<typeof DEFAULT_META> & { jsonLd?: object }} meta
 *
 * Usage:
 *   useMeta({
 *     title:       'Templates | Website Builder',
 *     description: 'Pick a template and launch in minutes.',
 *     jsonLd:      webPageSchema({ ... }),
 *   })
 */
export function useMeta(meta = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const resolved  = { ...DEFAULT_META, ...meta }
    const canonical = resolved.canonical ?? `${SITE_URL}${pathname}`

    // ── Helpers ──────────────────────────────────────────────────────────────

    /** Upsert a <meta> tag by selector, setting `attr` to `value`. */
    function setMeta(selector, attr, value) {
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const m = selector.match(/\[(\w+[-\w]*)="([^"]+)"\]/)
        if (m) el.setAttribute(m[1], m[2])
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    /** Upsert a <link> tag by rel. */
    function setLink(rel, href) {
      let el = document.head.querySelector(`link[rel="${rel}"]`)
      if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', rel)
        document.head.appendChild(el)
      }
      el.setAttribute('href', href)
    }

    /** Upsert the JSON-LD <script> tag (id="jsonld"). */
    function setJsonLd(data) {
      let el = document.head.querySelector('script#jsonld')
      if (!el) {
        el = document.createElement('script')
        el.id   = 'jsonld'
        el.type = 'application/ld+json'
        document.head.appendChild(el)
      }
      el.textContent = JSON.stringify(data)
    }

    function removeJsonLd() {
      document.head.querySelector('script#jsonld')?.remove()
    }

    // ── Apply ─────────────────────────────────────────────────────────────────

    document.title = resolved.title

    // Primary
    setMeta('[name="description"]',  'content', resolved.description)
    setMeta('[name="robots"]',       'content', resolved.robots)

    // Open Graph — use SITE_NAME directly (never derive from title)
    setMeta('[property="og:title"]',        'content', resolved.title)
    setMeta('[property="og:description"]',  'content', resolved.description)
    setMeta('[property="og:type"]',         'content', resolved.ogType)
    setMeta('[property="og:url"]',          'content', canonical)
    setMeta('[property="og:image"]',        'content', resolved.ogImage)
    setMeta('[property="og:image:alt"]',    'content', resolved.ogImageAlt)
    setMeta('[property="og:site_name"]',    'content', SITE_NAME)

    // Twitter / X
    setMeta('[name="twitter:card"]',        'content', resolved.twitterCard)
    setMeta('[name="twitter:site"]',        'content', resolved.twitterSite)
    setMeta('[name="twitter:title"]',       'content', resolved.title)
    setMeta('[name="twitter:description"]', 'content', resolved.description)
    setMeta('[name="twitter:image"]',       'content', resolved.ogImage)

    // Canonical
    setLink('canonical', canonical)

    // JSON-LD
    if (resolved.jsonLd) setJsonLd(resolved.jsonLd)
    else removeJsonLd()

    // ── Cleanup: restore defaults when navigating away ────────────────────────
    return () => {
      const d   = DEFAULT_META
      const url = `${SITE_URL}${pathname}`
      document.title = d.title
      setMeta('[name="description"]',         'content', d.description)
      setMeta('[name="robots"]',              'content', d.robots)
      setMeta('[property="og:title"]',        'content', d.title)
      setMeta('[property="og:description"]',  'content', d.description)
      setMeta('[property="og:url"]',          'content', url)
      setMeta('[property="og:image"]',        'content', d.ogImage)
      setMeta('[property="og:image:alt"]',    'content', d.ogImageAlt)
      setMeta('[property="og:site_name"]',    'content', SITE_NAME)
      setMeta('[name="twitter:title"]',       'content', d.title)
      setMeta('[name="twitter:description"]', 'content', d.description)
      setMeta('[name="twitter:image"]',       'content', d.ogImage)
      setLink('canonical',                    url)
      removeJsonLd()
    }
  // All fields that affect the <head> are listed explicitly.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pathname,
    meta.title,
    meta.description,
    meta.ogType,
    meta.ogImage,
    meta.ogImageAlt,
    meta.twitterCard,
    meta.twitterSite,
    meta.robots,
    meta.canonical,
    meta.jsonLd,
  ])
}
