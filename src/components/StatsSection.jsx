import { BadgeCheck, Sparkles, Timer } from 'lucide-react'

const STATS = [
  {
    key: 'generated',
    Icon: Sparkles,
    value: '12K+',
    label: 'pages generated this month',
    accent: '#CFE3F0',
  },
  {
    key: 'speed',
    Icon: Timer,
    value: '4 min',
    label: 'average time from prompt to live page',
    accent: '#D7EAD9',
  },
  {
    key: 'ship',
    Icon: BadgeCheck,
    value: '98%',
    label: 'of builders ship on the same day',
    accent: '#F3D9C6',
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

export default function StatsSection() {
  return (
    <section
      id="numbers"
      className="bg-[hsl(var(--surface-dark))] px-6 py-24"
      aria-label="Orqis in numbers"
    >
      <div className="mx-auto max-w-screen-xl text-center">

        {/* Header */}
        <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
          Orqis in numbers
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[hsl(var(--surface-dark-muted))]">
          Ideas are turning into live pages every second.
          <br />
          Explore the speed, scale, and momentum behind it.
        </p>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className="group relative flex min-h-[160px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl bg-[hsl(var(--surface-dark-elevated))] p-6 ring-1 ring-transparent transition-transform duration-200 hover:-translate-y-0.5 hover:ring-[color:var(--accent)]"
              style={{
                '--accent': stat.accent,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[color:var(--accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-10" aria-hidden="true" />

              {/* Icon */}
              <span
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  backgroundColor: hexToRgba(stat.accent, 0.18),
                  boxShadow: `inset 0 0 0 0.5px ${hexToRgba(stat.accent, 0.45)}`,
                }}
                aria-hidden="true"
              >
                <stat.Icon size={18} strokeWidth={2.2} color={stat.accent} />
              </span>

              {/* Large number */}
              <p className="relative text-[clamp(2.8rem,6vw,4rem)] font-bold leading-none tracking-tight text-[hsl(var(--surface-dark-foreground))]">
                {stat.value}
              </p>

              {/* Label */}
              <p className="relative text-[15px] leading-snug text-[hsl(var(--surface-dark-muted))] transition-colors duration-200 group-hover:text-[hsl(var(--surface-dark-foreground))]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
