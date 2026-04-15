import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

/**
 * Nav links that map to real routes get a <Link> (React Router).
 * Nav links that are placeholders for future pages use <a href="#">
 * so they don't generate broken fragment URLs.
 */
const NAV_LINKS = [
  { label: 'Templates',  to: '/#templates' },
  { label: 'Plans',      to: '/#plans' },
  { label: 'Enterprise', to: '/#plans' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-screen-xl px-4 pt-3 sm:px-6">
        <div className="ds-glass ds-blur ds-glass-edge flex h-14 items-center justify-between rounded-[999px] px-4">

        {/* Left — logo + product name */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Website Builder home">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[hsl(var(--primary)/0.92)] shadow-[var(--ds-shadow-2),var(--ds-glow-purple)]"
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-white">W</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Website Builder
          </span>
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map(({ label, to }) =>
            to.startsWith('#') ? (
              <a
                key={label}
                href={to}
                className="ds-hover rounded-full px-3.5 py-1.5 text-sm font-medium text-[rgba(17,24,39,0.66)] hover:bg-[rgba(255,255,255,0.14)] hover:text-[hsl(var(--foreground))]"
              >
                {label}
              </a>
            ) : to === '#' ? (
              <a
                key={label}
                href="#"
                className="ds-hover rounded-full px-3.5 py-1.5 text-sm font-medium text-[rgba(17,24,39,0.66)] hover:bg-[rgba(255,255,255,0.14)] hover:text-[hsl(var(--foreground))]"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                className="ds-hover rounded-full px-3.5 py-1.5 text-sm font-medium text-[rgba(17,24,39,0.66)] hover:bg-[rgba(255,255,255,0.14)] hover:text-[hsl(var(--foreground))]"
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
            className="rounded-full px-4 text-sm font-medium text-[rgba(17,24,39,0.68)] hover:bg-[rgba(255,255,255,0.16)] hover:text-[hsl(var(--foreground))]"
          >
            Get started
          </Button>
          <Button
            size="sm"
            className="rounded-full px-5 text-sm font-medium"
          >
            Get in touch
          </Button>
        </div>

        </div>
      </div>
    </header>
  )
}
