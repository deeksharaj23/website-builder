/**
 * Central route configuration.
 *
 * Each entry:
 *   path  — clean URL (BrowserRouter, no hash)
 *   Page  — lazy page component (exported from src/pages/index.js)
 *   meta  — per-page SEO passed directly to useMeta()
 *           All fields are optional; any omitted field falls back to
 *           DEFAULT_META in src/seo.js.
 *
 * To add a new page:
 *   1. Create src/pages/YourPage.jsx  (call useMeta() inside)
 *   2. Export it from src/pages/index.js
 *   3. Add one entry here
 */

import {
  HomePage,
  TemplatesPage,
  BuilderPage,
  NotFoundPage,
} from '@/pages/index.js'

const routes = [
  {
    path: '/',
    Page: HomePage,
    meta: {
      title:       'Website Builder - Build your unique website in seconds',
      description: 'Turn your idea into a fully designed, ready-to-launch website, instantly. Powered by AI.',
    },
  },
  {
    path: '/templates',
    Page: TemplatesPage,
    meta: {
      title:       'Templates | Website Builder',
      description: 'Pick a template, make it yours, and launch without the usual friction.',
    },
  },
  {
    path: '/builder',
    Page: BuilderPage,
    meta: {
      title:       'Builder | Website Builder',
      description: 'Describe your idea, generate instantly, refine with ease, and launch, all in one seamless flow.',
    },
  },
  // Catch-all — must stay last
  {
    path: '*',
    Page: NotFoundPage,
    meta: {
      title:       '404 - Page Not Found | Website Builder',
      description: 'The page you are looking for does not exist.',
      robots:      'noindex, nofollow',
    },
  },
]

export default routes
