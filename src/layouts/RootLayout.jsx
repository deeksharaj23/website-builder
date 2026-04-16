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
  const isBuilder = pathname.startsWith('/builder')

  useEffect(() => {
    if (!hash) return

    // Navigating between routes can mean the hash target isn't mounted yet
    // (lazy routes + Suspense). Retry briefly until it exists.
    const id = decodeURIComponent(hash)
    const NAV_OFFSET_PX = 80 // sticky navbar (h-16) + breathing room
    const MAX_TRIES = 30 // ~0.5s at 60fps
    let tries = 0
    let rafId = null

    const tryScroll = () => {
      tries += 1
      const el = document.querySelector(id)
      if (el) {
        const top = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET_PX
        window.scrollTo({ top, left: 0, behavior: 'smooth' })
        return
      }
      if (tries < MAX_TRIES) rafId = requestAnimationFrame(tryScroll)
    }

    rafId = requestAnimationFrame(tryScroll)
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId)
    }
  }, [hash, pathname])

  return (
    <>
      {/* Skip-to-content — visually hidden until focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-[hsl(var(--primary))] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[hsl(var(--primary-foreground))] focus:outline-none"
      >
        Skip to main content
      </a>

      {!isBuilder && <Navbar />}

      <main id="main-content">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>

      {!isBuilder && <Footer />}
    </>
  )
}
