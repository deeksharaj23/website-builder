import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/auth/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/**
 * Nav links that map to real routes get a <Link> (React Router).
 * Nav links that are placeholders for future pages use <a href="#">
 * so they don't generate broken fragment URLs.
 */
const NAV_LINKS = [
  { label: 'Templates',  to: '/#templates' },
  { label: 'Plans',      to: '/#plans' },
  { label: 'Security',   to: '/#plans' },
  { label: 'FAQs',       to: '/#faqs' },
  { label: 'Enterprise', to: '#' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const { isAuthenticated, logout, user } = useAuth()

  const displayName = (user?.name || '').trim() || (user?.email || '').split('@')[0] || 'Account'
  const initials = getInitials(displayName)

  return (
    <header className="sticky top-0 z-50 w-full bg-[hsl(var(--surface))]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

        {/* Left — logo + product name */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Orqis home">
          <img
            src="/logo-symbol.png"
            alt=""
            className="h-7 w-7 rounded-lg object-contain"
            aria-hidden="true"
          />
          <span className="text-base font-semibold leading-none tracking-tight text-[hsl(var(--surface-foreground))]">
            Orqis
          </span>
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 md:flex">
          {NAV_LINKS.map(({ label, to }) =>
            to.startsWith('#') ? (
              <a
                key={label}
                href={to}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[hsl(var(--surface-muted))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--surface-foreground))]"
              >
                {label}
              </a>
            ) : to === '#' ? (
              <a
                key={label}
                href="#"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[hsl(var(--surface-muted))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--surface-foreground))]"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                to={to}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[hsl(var(--surface-muted))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--surface-foreground))]"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Right — auth actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-[hsl(var(--surface-foreground))] transition-colors hover:bg-[hsl(var(--secondary))]"
                    aria-label="Open profile menu"
                  >
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--secondary))] text-[12px] font-semibold tracking-wide text-[hsl(var(--foreground))] ring-1 ring-[hsl(var(--border)/0.65)]"
                      aria-hidden="true"
                    >
                      {initials}
                    </span>
                    <span className="hidden max-w-[160px] truncate text-[hsl(var(--surface-foreground))] md:inline">
                      {displayName}
                    </span>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="py-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{displayName}</span>
                      <span className="text-xs text-[hsl(var(--muted-foreground))]">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={(e) => { e.preventDefault(); navigate('/profile') }}>
                    Edit profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault()
                      logout()
                      navigate('/')
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                asChild
                size="sm"
                className="rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
              >
                <Link to="/builder">Open builder</Link>
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="rounded-full px-4 text-sm font-medium text-[hsl(var(--surface-muted))] hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--surface-foreground))]"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-[hsl(var(--primary))] px-5 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
              >
                <Link to="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>

      </div>
    </header>
  )
}

function getInitials(name) {
  const cleaned = String(name || '').trim()
  if (!cleaned) return '?'
  const parts = cleaned.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}
