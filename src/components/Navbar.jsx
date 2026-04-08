import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

/**
 * Nav links that map to real routes get a <Link> (React Router).
 * Nav links that are placeholders for future pages use <a href="#">
 * so they don't generate broken fragment URLs.
 */
const NAV_LINKS = [
  { label: 'Templates',  to: '/templates' },
  { label: 'Builder',    to: '/builder' },
  { label: 'Pricing',    to: '#' },
  { label: 'Resources',  to: '#' },
  { label: 'Enterprise', to: '#' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F5F3]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

        {/* Left — logo + product name */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Website Builder home">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#111111]"
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-white">W</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#111111]">
            Website Builder
          </span>
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map(({ label, to }) =>
            to === '#' ? (
              <a
                key={label}
                href="#"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6B6B6B] transition-colors hover:bg-[#EAEAE8] hover:text-[#111111]"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6B6B6B] transition-colors hover:bg-[#EAEAE8] hover:text-[#111111]"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Right — auth actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full px-4 text-sm font-medium text-[#6B6B6B] hover:bg-[#EAEAE8] hover:text-[#111111]"
          >
            Log in
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-[#111111] px-5 text-sm font-medium text-white hover:bg-[rgba(17,17,17,0.85)]"
          >
            Get started
          </Button>
        </div>

      </div>
    </header>
  )
}
