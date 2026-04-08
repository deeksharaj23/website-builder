import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/**
 * RootLayout wraps every page with the shared Navbar and Footer.
 * Includes a skip-to-content link for keyboard / screen-reader users.
 */
export default function RootLayout() {
  return (
    <>
      {/* Skip-to-content — visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-[#111111] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </>
  )
}
