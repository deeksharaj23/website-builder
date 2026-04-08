import { useRef, useState } from 'react'
import { useTypewriter } from '@/hooks/useTypewriter'

const CTA_PROMPTS = [
  'Ask AI to create a dashboard to track my sales...',
  'Ask AI to build a waitlist page for my new product...',
  'Ask AI to design a portfolio for a UX designer...',
  'Ask AI to generate a startup landing page with a bold hero...',
]

function DarkPromptInput() {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)
  const placeholder = useTypewriter(CTA_PROMPTS, { mode: 'type-only', typeSpeed: 42, pauseMs: 1400 })

  function submit() {
    if (!value.trim()) return
    console.log('CTA prompt submitted:', value)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); submit() }}
      className="relative w-full max-w-xl rounded-3xl bg-[rgba(255,255,255,0.06)] p-4 pb-3"
      aria-label="CTA prompt form"
    >
      {/* Typewriter overlay */}
      {!value && (
        <div
          className="pointer-events-none absolute left-4 right-4 top-4 text-sm leading-relaxed text-[#6B6B6B]"
          aria-hidden="true"
        >
          {placeholder}
          <span className="cursor-blink ml-px inline-block h-[1em] w-px align-[-0.1em] bg-[#6B6B6B]" />
        </div>
      )}

      <label htmlFor="prompt-cta" className="sr-only">Describe your landing page idea</label>
      <textarea
        ref={textareaRef}
        id="prompt-cta"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full resize-none bg-transparent text-sm leading-relaxed text-white outline-none"
        aria-label="Landing page CTA prompt"
        autoComplete="off"
        spellCheck={false}
      />

      {/* Bottom action bar */}
      <div className="mt-1 flex items-center justify-between">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-[#6B6B6B] transition-colors hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
          aria-label="Attach images"
        >
          +
        </button>

        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#111111] transition-colors hover:bg-[#F5F5F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] disabled:cursor-not-allowed disabled:opacity-35"
          aria-label="Submit prompt"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 13V3M3 8l5-5 5 5" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden px-6 py-28"
      aria-label="Ready to build"
      style={{ background: '#111111' }}
    >
      <div className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-8 text-center">

        {/* Eyebrow */}
        <p className="text-sm font-medium text-[#6B6B6B]">AI Page Builder</p>

        {/* Headline */}
        <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight tracking-tight text-white">
          Ready to build?
        </h2>

        {/* Dark prompt input */}
        <DarkPromptInput />

      </div>
    </section>
  )
}
