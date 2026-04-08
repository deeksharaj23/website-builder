const STATS = [
  {
    value: '12K+',
    label: 'pages generated this month',
    accent: '#CFE3F0',
  },
  {
    value: '4 min',
    label: 'average time from prompt to live page',
    accent: '#D7EAD9',
  },
  {
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
      className="bg-[#111111] px-6 py-16"
      aria-label="Website Builder in numbers"
    >
      <div className="mx-auto max-w-screen-xl text-center">

        {/* Header */}
        <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
          Website Builder in numbers
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B6B6B]">
          Ideas are turning into live pages every second.
          <br />
          Explore the speed, scale, and momentum behind it.
        </p>

        {/* Stat cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.value}
              className="group flex min-h-[160px] flex-col items-center justify-center gap-4 rounded-3xl bg-[#1A1A1A] p-6 transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                boxShadow: 'inset 0 0 0 0.5px transparent',
                backgroundColor: '#1A1A1A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `inset 0 0 0 0.5px ${stat.accent}`
                e.currentTarget.style.backgroundColor = hexToRgba(stat.accent, 0.15)
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 0 0 0 0.5px transparent'
                e.currentTarget.style.backgroundColor = '#1A1A1A'
              }}
            >
              {/* Large number */}
              <p className="text-[clamp(2.8rem,6vw,4rem)] font-bold leading-none tracking-tight text-white transition-colors duration-200 group-hover:text-white">
                {stat.value}
              </p>

              {/* Label */}
              <p className="text-[15px] leading-snug text-[#6B6B6B] transition-colors duration-200 group-hover:text-white">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
