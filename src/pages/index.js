import { lazy } from 'react'

// Lazy-loaded page components — one chunk per route for optimal code-splitting.
export const HomePage      = lazy(() => import('./HomePage'))
export const TemplatesPage = lazy(() => import('./TemplatesPage'))
export const BuilderPage   = lazy(() => import('./BuilderPage'))
export const NotFoundPage  = lazy(() => import('./NotFoundPage'))
