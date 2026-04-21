import { lazy } from 'react'

// Lazy-loaded page components — one chunk per route for optimal code-splitting.
export const HomePage      = lazy(() => import('./HomePage'))
export const TemplatesPage = lazy(() => import('./TemplatesPage'))
export const SecurityPage  = lazy(() => import('./SecurityPage'))
export const EnterprisePage = lazy(() => import('./EnterprisePage'))
export const BuilderPage   = lazy(() => import('./BuilderPage'))
export const LoginPage     = lazy(() => import('./LoginPage'))
export const SignupPage    = lazy(() => import('./SignupPage'))
export const ProfilePage   = lazy(() => import('./ProfilePage'))
export const NotFoundPage  = lazy(() => import('./NotFoundPage'))
