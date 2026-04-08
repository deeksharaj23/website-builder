import { Button } from '@/components/ui/button'

const NAV_LINKS = [
  'Solutions',
  'Resources',
  'Enterprise',
  'Pricing',
  'Community',
  'Security',
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#F5F5F3]">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">

        {/* Left — logo + product name */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#111111]"
            aria-hidden="true"
          >
            <span className="text-xs font-bold text-white">W</span>
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#111111]">
            Website Builder
          </span>
        </div>

        {/* Center — nav links */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-0.5 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6B6B6B] transition-colors hover:bg-[#EAEAE8] hover:text-[#111111]"
            >
              {link}
            </a>
          ))}
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
