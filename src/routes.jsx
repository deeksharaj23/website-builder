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
  SecurityPage,
  EnterprisePage,
  BuilderPage,
  LoginPage,
  SignupPage,
  ProfilePage,
  NotFoundPage,
} from '@/pages/index.js'

const routes = [
  {
    path: '/',
    Page: HomePage,
    meta: {
      title:       'Orqis - Build your unique website in seconds',
      description: 'Turn your idea into a fully designed, ready-to-launch website, instantly. Powered by AI.',
    },
  },
  {
    path: '/templates',
    Page: TemplatesPage,
    meta: {
      title:       'Templates | Orqis',
      description: 'Pick a template, make it yours, and launch without the usual friction.',
    },
  },
  {
    path: '/security',
    Page: SecurityPage,
    meta: {
      title:       'Security | Orqis',
      description: 'Learn how Orqis is designed to protect your data, control access, and reduce risk as you build and publish.',
    },
  },
  {
    path: '/enterprise',
    Page: EnterprisePage,
    meta: {
      title:       'Enterprise | Orqis',
      description: 'Enterprise-ready controls and workflows for teams that need governance, visibility, and secure scale.',
    },
  },
  {
    path: '/builder',
    Page: BuilderPage,
    requiresAuth: true,
    meta: {
      title:       'Builder | Orqis',
      description: 'Describe your idea, generate instantly, refine with ease, and launch, all in one seamless flow.',
    },
  },
  {
    path: '/login',
    Page: LoginPage,
    meta: {
      title:       'Login | Orqis',
      description: 'Sign in to access the Orqis builder.',
    },
  },
  {
    path: '/signup',
    Page: SignupPage,
    meta: {
      title:       'Sign up | Orqis',
      description: 'Create your Orqis account and start building.',
    },
  },
  {
    path: '/profile',
    Page: ProfilePage,
    requiresAuth: true,
    meta: {
      title:       'Profile | Orqis',
      description: 'Manage your Orqis profile.',
    },
  },
  // Catch-all — must stay last
  {
    path: '*',
    Page: NotFoundPage,
    meta: {
      title:       '404 - Page Not Found | Orqis',
      description: 'The page you are looking for does not exist.',
      robots:      'noindex, nofollow',
    },
  },
]

export default routes
