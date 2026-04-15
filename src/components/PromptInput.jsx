import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTypewriter } from '@/hooks/useTypewriter'

const PROMPTS = [
  'A website for a fitness coach with pricing and testimonials...',
  'A personal portfolio showcasing my design work and case studies...',
  'A SaaS website for a project management tool with a free trial...',
  'A newsletter website with a minimalist dark design...',
  'An event website for a design conference in San Francisco...',
]

export default function PromptInput() {
  const [value, setValue] = useState('')
  const [images, setImages] = useState([])
  const textareaRef = useRef(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const placeholder = useTypewriter(PROMPTS, { mode: 'type-only', typeSpeed: 42, pauseMs: 1400 })
  const attachId = useId()

  const imagePreviews = useMemo(() => {
    return images.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))
  }, [images])

  useEffect(() => {
    return () => {
      for (const p of imagePreviews) URL.revokeObjectURL(p.url)
    }
  }, [imagePreviews])

  function submit() {
    const prompt = value.trim()
    if (!prompt) return
    navigate(`/builder?prompt=${encodeURIComponent(prompt)}`)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  function openFilePicker() {
    fileInputRef.current?.click()
  }

  function onFilesSelected(e) {
    const files = Array.from(e.target.files || []).filter((f) => f.type?.startsWith('image/'))
    if (files.length) setImages((prev) => [...prev, ...files])
    // allow re-selecting the same file(s)
    e.target.value = ''
  }

  function removeImage(idx) {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); submit() }}
      className="ds-glass ds-blur ds-glass-edge relative w-full max-w-2xl rounded-[1.75rem] p-3 pb-2.5 text-center ring-1 ring-[rgba(255,255,255,0.18)]"
      aria-label="AI prompt form"
    >
      {!value && (
        <div
          className="pointer-events-none absolute left-3 right-3 top-3 text-center text-sm leading-relaxed text-[rgba(17,24,39,0.62)]"
          aria-hidden="true"
        >
          {placeholder}
          <span className="cursor-blink ml-px inline-block h-[1em] w-px align-[-0.1em] bg-[rgba(17,24,39,0.55)]" />
        </div>
      )}

      <label htmlFor="prompt-hero" className="sr-only">Describe your website idea</label>
      <textarea
        ref={textareaRef}
        id="prompt-hero"
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full resize-none bg-transparent text-center text-sm leading-relaxed text-[hsl(var(--foreground))] outline-none"
        aria-label="Website prompt"
        autoComplete="off"
        spellCheck={false}
      />

      <input
        ref={fileInputRef}
        id={attachId}
        type="file"
        accept="image/*"
        multiple
        onChange={onFilesSelected}
        className="sr-only"
      />

      {imagePreviews.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {imagePreviews.map((p, idx) => (
            <div
              key={`${p.file.name}-${p.file.size}-${p.file.lastModified}-${idx}`}
              className="relative h-12 w-12 overflow-hidden rounded-xl ring-1 ring-[rgba(255,255,255,0.22)] shadow-[var(--ds-shadow-2)]"
              title={p.file.name}
            >
              <img
                src={p.url}
                alt={p.file.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="ds-hover absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(17,17,17,0.55)] text-xs text-white hover:bg-[rgba(17,17,17,0.70)]"
                aria-label={`Remove ${p.file.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={openFilePicker}
          className="ds-hover flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-[rgba(17,24,39,0.62)] hover:bg-[rgba(255,255,255,0.22)] hover:text-[hsl(var(--foreground))]"
          aria-label="Attach images"
        >
          +
        </button>

        <button
          type="submit"
          disabled={!value.trim()}
          className="ds-hover ds-focus-ring flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary)/0.88)] text-white shadow-[var(--ds-shadow-2),var(--ds-glow-blue)] hover:bg-[hsl(var(--primary)/0.80)] disabled:cursor-not-allowed disabled:opacity-35"
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
