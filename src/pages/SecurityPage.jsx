import { Link } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { Button } from '@/components/ui/button'

const SECURITY_PILLARS = [
  {
    title: 'Access & control',
    desc: 'Enforce who can view, edit, approve, and publish. Keep permissions least-privilege, and audit changes over time.',
  },
  {
    title: 'Publishing guardrails',
    desc: 'Separate editing from approval and production publishing to reduce accidental exposure while teams move fast.',
  },
  {
    title: 'Secrets handled safely',
    desc: 'Keep credentials encrypted at rest and scoped by environment so sensitive values stay out of logs and UI by default.',
  },
  {
    title: 'Data residency options',
    desc: 'Choose where customer data is hosted and keep data in-region by default based on your workspace configuration.',
  },
]

const SECURITY_DETAILS = [
  {
    heading: 'Your data stays yours',
    items: [
      {
        title: 'No training on your work',
        desc: 'Your prompts, projects, and generated code are treated as customer data and are not used to train Orqis models.',
      },
      {
        title: 'Workspace isolation',
        desc: 'Projects are logically separated so data can’t bleed across accounts or workspaces.',
      },
    ],
  },
  {
    heading: 'Defense in depth',
    items: [
      {
        title: 'Continuous monitoring',
        desc: 'We detect anomalous activity and abuse patterns, apply rate limits, and review high-risk events.',
      },
      {
        title: 'Automatic scanning',
        desc: 'Generated code and dependencies can be checked for known vulnerable patterns and unsafe configuration.',
      },
      {
        title: 'Protected infrastructure',
        desc: 'Security controls include encryption, network isolation, and platform guardrails designed for multi-tenant safety.',
      },
    ],
  },
  {
    heading: 'Compliance & readiness',
    items: [
      {
        title: 'Audit-friendly',
        desc: 'Security practices are designed to support common enterprise reviews and due diligence workflows.',
      },
      {
        title: 'Clear documentation',
        desc: 'We aim to be transparent about controls and expectations so teams can ship confidently.',
      },
    ],
  },
]

function Card({ title, desc }) {
  return (
    <div className="rounded-3xl bg-[hsl(var(--secondary))] p-6 ring-1 ring-[hsl(var(--border)/0.65)]">
      <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{desc}</p>
    </div>
  )
}

function DarkCard({ title, desc }) {
  return (
    <div className="rounded-3xl bg-[hsl(var(--surface-dark-elevated))] p-6 ring-1 ring-[hsl(var(--border)/0.12)]">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--surface-dark-muted))]">{desc}</p>
    </div>
  )
}

export default function SecurityPage() {
  useMeta({
    title:       'Security | Orqis',
    description: 'Learn how Orqis is designed to protect your data, control access, and reduce risk as you build and publish.',
    jsonLd:      webPageSchema({
      title:       'Security | Orqis',
      description: 'Learn how Orqis is designed to protect your data, control access, and reduce risk as you build and publish.',
      url:         `${SITE_URL}/security`,
    }),
  })

  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-10 pt-16">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
              Security
            </p>
            <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-[hsl(var(--foreground))]">
              Secure by design, from idea to publish.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]">
              Orqis is built with practical controls for teams: access management, publishing guardrails, and protections
              that help keep your projects and customer data safe.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="rounded-full px-6">
                <Link to="/signup">Get started</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6">
                <a href="#" aria-label="Report a security issue">Report an issue</a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-[hsl(var(--muted-foreground))]">
              Have a vulnerability to disclose? Use the report link above and we’ll triage quickly.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-tight text-[hsl(var(--foreground))]">
              Enterprise-minded controls, without the overhead
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              Use strong defaults for permissions, environments, and publishing so you can ship quickly while staying in
              control.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SECURITY_PILLARS.map((p) => (
              <Card key={p.title} title={p.title} desc={p.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* Details (dark, matches your existing dark section styling) */}
      <section className="bg-[hsl(var(--surface-dark))] px-6 py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-tight text-white">
              Built for trust across the full workflow
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--surface-dark-muted))]">
              From authentication and isolation to monitoring and scanning, security is designed as a system, not a
              checkbox.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {SECURITY_DETAILS.map((group) => (
              <div key={group.heading} className="flex flex-col gap-4">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--surface-dark-muted))]">
                  {group.heading}
                </h3>
                <div className="grid gap-4">
                  {group.items.map((item) => (
                    <DarkCard key={item.title} title={item.title} desc={item.desc} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl bg-[hsl(var(--surface-dark-elevated))] p-7 ring-1 ring-[hsl(var(--border)/0.12)] sm:flex-row">
            <div>
              <p className="text-sm font-semibold text-white">Need security details for a review?</p>
              <p className="mt-1 text-sm text-[hsl(var(--surface-dark-muted))]">
                We can share platform info suitable for vendor assessments and due diligence.
              </p>
            </div>
            <Button asChild className="rounded-full px-6">
              <a href="#" aria-label="Contact sales about security">Contact sales</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

