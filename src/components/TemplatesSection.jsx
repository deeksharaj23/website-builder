/* ─────────────────────────────────────────────────────────────
   TemplatesSection — "Discover templates"
   Dark theme, same design system tokens as MeetSection.
   Each card preview is a CSS-only visual composition so
   no external images are needed.
───────────────────────────────────────────────────────────── */

const TEMPLATES = [
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    desc: 'Personal work showcase',
  },
  {
    id: 'slides',
    name: 'Slide Deck Builder',
    desc: 'Code-powered presentation builder',
  },
  {
    id: 'architecture',
    name: 'Architecture Studio',
    desc: 'Firm website & project showcase',
  },
  {
    id: 'fashion',
    name: 'Fashion Blog',
    desc: 'Minimal, playful design',
  },
  {
    id: 'event',
    name: 'Event Platform',
    desc: 'Promote, register, celebrate',
  },
  {
    id: 'blog',
    name: 'Personal Blog',
    desc: 'Muted, intimate writing space',
  },
  {
    id: 'lifestyle',
    name: 'Lifestyle Magazine',
    desc: 'Sophisticated editorial design',
  },
  {
    id: 'ecommerce',
    name: 'Ecommerce Store',
    desc: 'Premium design for webstore',
  },
]

/* ─── Per-template visual preview (CSS-only) ─── */
function TemplatePreview({ id }) {
  switch (id) {

    /* Dark editorial — name-card hero */
    case 'portfolio':
      return (
        <div className="flex h-full flex-col items-center justify-center bg-[#111111] p-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B]">Creative developer</p>
          <p className="font-display mt-2 text-2xl font-bold text-white">Alex Carter</p>
          <div className="mt-3 flex gap-1.5">
            <div className="h-1 w-10 rounded-full bg-[#CFE3F0]" />
            <div className="h-1 w-6 rounded-full bg-[#E6DDF2]" />
          </div>
        </div>
      )

    /* Presentation — design-system pastels only */
    case 'slides':
      return (
        <div className="flex h-full flex-col items-center justify-center bg-[#E6DDF2] p-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#6B6B6B]">
            Slide Deck
          </p>
          <p className="mt-2 text-lg font-semibold text-[#111111]">Make it Stick</p>
        </div>
      )

    /* Minimal grey — architecture */
    case 'architecture':
      return (
        <div className="flex h-full flex-col items-center justify-center bg-[#EFEFEF] p-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.36em] text-[#6B6B6B]">
            Minimal
          </p>
          <p className="mt-1 text-center text-xl font-bold uppercase tracking-wide text-[#111111]">
            Architecture
          </p>
          <div className="mt-4 h-px w-16 bg-[rgba(17,17,17,0.12)]" />
        </div>
      )

    /* Cream + lavender — fashion blog */
    case 'fashion':
      return (
        <div className="flex h-full flex-col bg-[#F5F5F3] p-5">
          {/* Top nav line */}
          <div className="flex items-center justify-between">
            <div className="h-2 w-12 rounded-full bg-[rgba(17,17,17,0.10)]" />
            <div className="h-5 w-16 rounded-full bg-[#E6DDF2]" />
          </div>
          <div className="mt-auto">
            <p className="text-[9px] uppercase tracking-[0.28em] text-[#6B6B6B]">Collection</p>
            <p className="font-display mt-1 text-2xl font-bold text-[#111111]">VESPER</p>
            <div className="mt-2 h-1.5 w-20 rounded-full bg-[#E6DDF2]" />
          </div>
        </div>
      )

    /* White + highlighted pill — event */
    case 'event':
      return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-white p-5">
          <p className="text-center text-base font-semibold leading-snug text-[#111111]">
            Discover{' '}
            <span className="rounded-full bg-[#CFE3F0] px-2 py-0.5 text-[#2A6080]">events</span>
          </p>
          <p className="text-center text-base font-semibold text-[#111111]">near you</p>
          <div className="mt-1 flex gap-1.5">
            {['#CFE3F0','#D7EAD9','#F3D9C6'].map((c) => (
              <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
      )

    /* Warm peach — personal blog */
    case 'blog':
      return (
        <div className="flex h-full flex-col bg-[#F3D9C6] p-5">
          <div className="flex items-center justify-between">
            <div className="h-2 w-14 rounded-full bg-[rgba(17,17,17,0.12)]" />
            <div className="h-2 w-8 rounded-full bg-[rgba(17,17,17,0.12)]" />
          </div>
          <div className="mt-auto space-y-2">
            <div className="h-2 w-3/4 rounded-full bg-[rgba(17,17,17,0.16)]" />
            <div className="h-2 w-full rounded-full bg-[rgba(17,17,17,0.12)]" />
            <div className="h-2 w-5/6 rounded-full bg-[rgba(17,17,17,0.12)]" />
          </div>
        </div>
      )

    /* Sage green — lifestyle magazine */
    case 'lifestyle':
      return (
        <div className="flex h-full flex-col bg-[#D7EAD9] p-5">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[rgba(17,17,17,0.14)]" />
            <div className="h-2 w-16 rounded-full bg-[rgba(17,17,17,0.14)]" />
          </div>
          <div className="mt-3 h-16 w-full rounded-xl bg-[rgba(17,17,17,0.10)]" />
          <div className="mt-3 space-y-1.5">
            <div className="h-2.5 w-2/3 rounded-full bg-[rgba(17,17,17,0.20)]" />
            <div className="h-1.5 w-full rounded-full bg-[rgba(17,17,17,0.12)]" />
            <div className="h-1.5 w-5/6 rounded-full bg-[rgba(17,17,17,0.12)]" />
          </div>
        </div>
      )

    /* Deep dark + shape — ecommerce */
    case 'ecommerce':
      return (
        <div className="flex h-full flex-col bg-[#111111] p-5">
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded-full bg-[rgba(255,255,255,0.12)]" />
            <div className="h-6 w-14 rounded-full bg-white" />
          </div>
          <div className="mt-auto flex items-end gap-3">
            <div className="h-20 w-1/2 rounded-2xl bg-[rgba(255,255,255,0.08)]" />
            <div className="h-14 flex-1 rounded-2xl bg-[rgba(255,255,255,0.06)]" />
          </div>
        </div>
      )

    default:
      return <div className="h-full bg-[rgba(255,255,255,0.06)]" />
  }
}

/* ─── Single template card ─── */
function TemplateCard({ template }) {
  return (
    <article className="group flex cursor-pointer flex-col gap-3">
      {/* Preview area */}
      <div className="aspect-[4/3] overflow-hidden rounded-3xl transition-transform duration-300 group-hover:scale-[1.02]">
        <TemplatePreview id={template.id} />
      </div>

      {/* Meta */}
      <div>
        <p className="text-sm font-semibold text-white">{template.name}</p>
        <p className="mt-0.5 text-sm text-[#6B6B6B]">{template.desc}</p>
      </div>
    </article>
  )
}

/* ─── Section ─── */
export default function TemplatesSection() {
  return (
    <section
      className="bg-[#111111] px-6 pb-24 pt-4"
      aria-label="Discover templates"
    >
      <div className="mx-auto max-w-screen-xl">

        {/* Header row */}
        <div className="mb-10 flex items-end justify-between">
          <div className="text-center flex-1">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
              Discover templates
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B6B6B]">
              Pick a template, make it yours,
              <br />
              and launch without the usual friction.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-full border border-[rgba(255,255,255,0.12)] px-4 py-2 text-sm font-medium text-[#6B6B6B] transition-colors hover:border-[rgba(255,255,255,0.22)] hover:text-white"
          >
            View all
          </button>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {TEMPLATES.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>

      </div>
    </section>
  )
}
