import { useEffect, useState } from 'react'

/* ─── Step data ─── */
const STEPS = [
  {
    label: '01',
    labelBg: '#CFE3F0',   // blue pastel
    labelText: '#2A6080',
    title: 'Start with an idea',
    desc: 'Describe the page you want to create. Plain English is all you need — no specs, no wireframes.',
  },
  {
    label: '02',
    labelBg: '#D7EAD9',   // green pastel
    labelText: '#2A6040',
    title: 'Watch it come to life',
    desc: 'See your page take shape in real-time as AI assembles the layout, copy, and structure for you.',
  },
  {
    label: '03',
    labelBg: '#F3D9C6',   // peach pastel
    labelText: '#80402A',
    title: 'Refine and ship',
    desc: 'Iterate with simple feedback. When it feels right, deploy to the world with one click.',
  },
]

/* ─── Left panel: visual mockup per step ─── */
// All three panels are always in the DOM and stacked via absolute positioning.
// Opacity cross-fade means the container never changes height — no layout shift.
function StepPanel({ activeStep }) {
  return (
    <div className="relative h-[460px] overflow-hidden rounded-3xl bg-[rgba(255,255,255,0.06)]">

      {/* Step 1 — prompt input mockup */}
      <div
        className={[
          'absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500',
          activeStep === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="w-full max-w-sm">
          <div className="rounded-2xl bg-[#F5F5F3] p-4 pb-3">
            <p className="text-sm leading-relaxed text-[#111111]">
              Create a{' '}
              <span className="rounded bg-[#CFE3F0] px-1 font-medium text-[#2A6080]">
                landing page
              </span>
              <span className="ml-px inline-block h-[1em] w-px align-[-0.1em] bg-[#111111] opacity-80 cursor-blink" />
            </p>
            <div className="mt-3 h-8" />
            <div className="mt-2 flex items-center justify-between">
              <span className="flex h-7 w-7 items-center justify-center rounded-full text-base text-[#6B6B6B]">+</span>
              <div className="flex items-center gap-2">
                <span className="rounded-full px-2 py-1 text-[11px] text-[#6B6B6B]">Build ▾</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-white">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 13V3M3 8l5-5 5 5" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2 — building state */}
      <div
        className={[
          'absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500',
          activeStep === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="w-full max-w-sm space-y-3">
          <div className="rounded-2xl bg-[rgba(255,255,255,0.06)] p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#D7EAD9]" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-[#6B6B6B]">Building your page</span>
            </div>
            <div className="h-3 w-3/4 rounded-full bg-[rgba(255,255,255,0.12)]" />
            <div className="h-2 w-full rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="h-2 w-5/6 rounded-full bg-[rgba(255,255,255,0.08)]" />
          </div>
          {[
            { label: 'Composing hero section', pct: '100%', done: true },
            { label: 'Writing copy & CTA', pct: '72%', done: false },
            { label: 'Styling layout', pct: '38%', done: false },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl bg-[rgba(255,255,255,0.06)] px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#6B6B6B]">{item.label}</span>
                <span className={`text-[10px] font-medium ${item.done ? 'text-[#D7EAD9]' : 'text-[#6B6B6B]'}`}>
                  {item.done ? 'done' : 'building'}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.12)]">
                <div className="h-full rounded-full bg-[#D7EAD9]" style={{ width: item.pct }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3 — shipped state */}
      <div
        className={[
          'absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500',
          activeStep === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        <div className="w-full max-w-sm space-y-3">
          <div className="overflow-hidden rounded-2xl bg-[#F5F5F3]">
            <div className="flex items-center justify-between border-b border-[rgba(17,17,17,0.10)] px-4 py-2.5">
              <div className="h-2 w-16 rounded-full bg-[rgba(17,17,17,0.10)]" />
              <div className="h-6 w-16 rounded-full bg-[#111111]" />
            </div>
            <div className="px-4 py-5 space-y-2">
              <div className="h-4 w-2/3 rounded-full bg-[rgba(17,17,17,0.14)]" />
              <div className="h-3 w-full rounded-full bg-[rgba(17,17,17,0.10)]" />
              <div className="h-3 w-5/6 rounded-full bg-[rgba(17,17,17,0.10)]" />
              <div className="mt-3 flex gap-2">
                <div className="h-8 w-24 rounded-full bg-[#111111]" />
                <div className="h-8 w-20 rounded-full bg-[#EFEFEF]" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-4 pb-5">
              <div className="h-14 rounded-xl bg-[#CFE3F0]" />
              <div className="h-14 rounded-xl bg-[#D7EAD9]" />
              <div className="h-14 rounded-xl bg-[#F3D9C6]" />
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-[rgba(255,255,255,0.06)] px-4 py-3">
            <span className="h-2 w-2 rounded-full bg-[#D7EAD9]" />
            <span className="text-xs text-[#6B6B6B]">yourpage.builder.app</span>
            <span className="ml-auto rounded-full bg-[rgba(215,234,217,0.16)] px-2.5 py-1 text-[10px] font-semibold text-[#D7EAD9]">
              Live
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

/* ─── Main section ─── */
export default function MeetSection() {
  const [activeStep, setActiveStep] = useState(0)

  // Auto-cycle through steps every 3.5s; clicking a step resets the timer
  useEffect(() => {
    const id = setInterval(() => {
      setActiveStep((s) => (s + 1) % STEPS.length)
    }, 3500)
    return () => clearInterval(id)
  }, [activeStep])

  return (
    <section
      className="bg-[#111111] px-6 py-20"
      aria-label="Meet your web builder"
    >
      <div className="mx-auto max-w-screen-xl">

        {/* Section heading */}
        <h2 className="font-display mb-12 text-center text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
          Meet your web builder
        </h2>
        <p className="-mt-8 mb-12 mx-auto max-w-2xl text-center text-sm text-[#6B6B6B]">
          Describe your idea, generate instantly,
          <br />
          refine with ease, and launch, all in one seamless flow.
        </p>

        {/* Two-column layout — items-start keeps each column's height independent */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* Left — animated visual panel (fixed h-[460px], no height shift) */}
          <StepPanel activeStep={activeStep} />

          {/* Right — step list; self-center keeps it vertically centered within the 460px row */}
          <div className="flex flex-col gap-1 self-center">
            {STEPS.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={[
                    'group flex w-full flex-col gap-2 rounded-2xl px-5 py-5 text-left transition-colors duration-200',
                    isActive ? 'bg-[rgba(255,255,255,0.06)]' : 'hover:bg-[rgba(255,255,255,0.04)]',
                  ].join(' ')}
                >
                  {/* Step number pill */}
                  <span
                    className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? step.labelBg : 'rgba(255,255,255,0.10)',
                      color: isActive ? step.labelText : '#6B6B6B',
                    }}
                  >
                    {step.label}
                  </span>

                  {/* Step title */}
                  <span
                    className={[
                      'text-xl font-semibold leading-snug transition-colors duration-300',
                      isActive ? 'text-white' : '#6B6B6B',
                    ].join(' ')}
                  >
                    {step.title}
                  </span>

                  {/*
                    Description — uses CSS grid-rows trick (0fr ↔ 1fr) so the
                    animation is smooth but the outer section never reflows.
                    The inner <span> with overflow-hidden is required for the trick.
                  */}
                  <span
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: isActive ? '1fr' : '0fr' }}
                  >
                    <span className="overflow-hidden text-sm leading-relaxed text-[#6B6B6B]">
                      {step.desc}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
