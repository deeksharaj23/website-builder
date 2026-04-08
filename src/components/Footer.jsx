const FOOTER_LINKS = [
  {
    heading: 'Product',
    links: [
      'Pricing',
      'Templates',
      'Changelog',
      'Roadmap',
      'Status',
    ],
  },
  {
    heading: 'Resources',
    links: [
      'Documentation',
      'Guides',
      'Blog',
      'Examples',
      'Support',
    ],
  },
  {
    heading: 'Company',
    links: [
      'About',
      'Careers',
      'Press',
      'Partners',
      'Security',
    ],
  },
  {
    heading: 'Legal',
    links: [
      'Privacy Policy',
      'Terms of Service',
      'Cookie Settings',
      'Report Abuse',
    ],
  },
  {
    heading: 'Community',
    links: [
      'Discord',
      'X / Twitter',
      'LinkedIn',
      'YouTube',
      'Affiliates',
    ],
  },
]

const SOCIAL = [
  {
    label: 'X / Twitter',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '#',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.10)] bg-[#111111] px-6 pb-10 pt-16">
      <div className="mx-auto max-w-screen-xl">

        {/* Top row: brand + link columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_repeat(5,1fr)]">

          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white" aria-hidden="true">
                <span className="text-xs font-bold text-[#111111]">W</span>
              </div>
              <span className="text-sm font-semibold text-white">Website Builder</span>
            </div>
            <p className="max-w-[200px] text-sm leading-relaxed text-[#6B6B6B]">
              Turn any idea into a launch-ready landing page in seconds.
            </p>

            {/* Social icons */}
            <div className="mt-2 flex items-center gap-3">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#6B6B6B] transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B6B6B]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#6B6B6B] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.10)] pt-6 sm:flex-row">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} Website Builder. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
            <a href="#" className="transition-colors hover:text-white">Privacy</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="transition-colors hover:text-white">Terms</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="transition-colors hover:text-white">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
