import { useId, useRef, useState } from 'react'
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
      className="relative w-full max-w-2xl rounded-3xl bg-[hsl(var(--secondary))] p-3 pb-2.5 text-center ring-1 ring-[hsl(var(--border)/0.65)]"
      aria-label="AI prompt form"
    >
      {!value && (
        <div
          className="pointer-events-none absolute left-3 right-3 top-3 text-center text-sm leading-relaxed text-[hsl(var(--muted-foreground))]"
          aria-hidden="true"
        >
          {placeholder}
          <span className="cursor-blink ml-px inline-block h-[1em] w-px align-[-0.1em] bg-[hsl(var(--muted-foreground))]" />
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

      {images.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {images.map((file, idx) => (
            <span
              key={`${file.name}-${file.size}-${file.lastModified}-${idx}`}
              className="flex items-center gap-2 rounded-full bg-[hsl(var(--accent))] px-3 py-1 text-xs text-[hsl(var(--accent-foreground))]"
            >
              <span className="max-w-[180px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="flex h-5 w-5 items-center justify-center rounded-full text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
                aria-label={`Remove ${file.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mt-1 flex items-center justify-between">
        <button
          type="button"
          onClick={openFilePicker}
          className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]"
          aria-label="Attach images"
        >
          +
        </button>

        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary)/0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
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
