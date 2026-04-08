import { Check } from 'lucide-react'

const PLANS = [
  {
    key: 'starter',
    name: 'Starter',
    price: 'Free',
    period: '/mo',
    note: 'For trying it out',
    accent: '#CFE3F0',
    featured: false,
    cta: 'Get started',
    features: [
      'Unlimited prompt drafts',
      'Basic templates',
      'Export HTML + CSS',
      'Community support',
    ],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: '$25',
    period: '/mo',
    note: 'For teams and clients',
    accent: '#D7EAD9',
    featured: true,
    cta: 'Get in touch',
    features: [
      'Everything in Starter',
      'Premium templates',
      'Team workspaces',
      'Roles and permissions',
      'Priority support',
    ],
  },
]

function hexToRgba(hex, alpha) {
  const raw = hex.replace('#', '').trim()
  const full = raw.length === 3 ? raw.split('').map((c) => c + c).join('') : raw
  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function PricingSection() {
  return (
    <section
      id="plans"
      className="bg-[#111111] px-6 py-24"
      aria-label="Plans"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
            Plans
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B6B6B]">
            Simple plans that scale with what you’re building, from your first page to full-scale projects.
            <br />
            Choose a plan that fits the way you work.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.key}
              className={[
                'relative rounded-3xl bg-[#1A1A1A] p-7 ring-[0.5px] transition-transform duration-200 hover:-translate-y-0.5',
                plan.featured ? 'ring-[rgba(255,255,255,0.18)] md:translate-y-0.5' : 'ring-[rgba(255,255,255,0.10)]',
              ].join(' ')}
              style={{
                boxShadow: plan.featured ? `0 0 0 0.5px ${hexToRgba(plan.accent, 0.65)} inset` : undefined,
                backgroundColor: '#1A1A1A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0.5px ${hexToRgba(plan.accent, 0.70)} inset`
                e.currentTarget.style.backgroundColor = hexToRgba(plan.accent, 0.10)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1A1A'
                e.currentTarget.style.boxShadow = plan.featured
                  ? `0 0 0 0.5px ${hexToRgba(plan.accent, 0.65)} inset`
                  : ''
              }}
            >
              {plan.featured && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest"
                  style={{
                    backgroundColor: '#111111',
                    color: '#FFFFFF',
                    boxShadow: `0 0 0 0.5px ${hexToRgba(plan.accent, 0.55)}`,
                  }}
                >
                  Most popular
                </span>
              )}

              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{plan.name}</p>
                  <p className="mt-1 text-xs text-[#6B6B6B]">{plan.note}</p>
                </div>
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: hexToRgba(plan.accent, 0.14),
                    boxShadow: `inset 0 0 0 0.5px ${hexToRgba(plan.accent, 0.35)}`,
                  }}
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: plan.accent }} />
                </span>
              </header>

              <div className="mt-6 flex items-end gap-2">
                <p className="text-4xl font-bold tracking-tight text-white">
                  {plan.price}
                </p>
                <p className="pb-1 text-sm text-[#6B6B6B]">{plan.period}</p>
              </div>

              {plan.key === 'starter' ? (
                <div
                  className="mt-6 w-full rounded-full bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm font-semibold text-[#6B6B6B]"
                  aria-label="Current plan"
                >
                  Current plan
                </div>
              ) : (
                <button
                  type="button"
                  className={[
                    'mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold transition-colors',
                    plan.featured
                      ? 'bg-white text-[#111111] hover:bg-[#F5F5F3]'
                      : 'bg-[rgba(255,255,255,0.06)] text-white hover:bg-[rgba(255,255,255,0.10)]',
                  ].join(' ')}
                >
                  {plan.cta}
                </button>
              )}

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-[#6B6B6B]">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: hexToRgba(plan.accent, 0.12),
                        boxShadow: `inset 0 0 0 0.5px ${hexToRgba(plan.accent, 0.30)}`,
                      }}
                      aria-hidden="true"
                    >
                      <Check size={13} strokeWidth={2.4} color={plan.accent} />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

