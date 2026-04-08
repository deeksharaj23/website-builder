import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

/**
 * RootLayout wraps every page with the shared Navbar and Footer.
 * Includes a skip-to-content link for keyboard / screen-reader users.
 */
export default function RootLayout() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    // Let the route render first, then scroll.
    const id = hash
    requestAnimationFrame(() => {
      const el = document.querySelector(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Offset for sticky navbar (h-16) + a little breathing room.
      window.scrollBy({ top: -80, left: 0, behavior: 'smooth' })
    })
  }, [hash, pathname])

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
