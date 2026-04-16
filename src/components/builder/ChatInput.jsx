import { useRef } from 'react'

export default function ChatInput({ value, onChange, onSend, disabled, placeholder }) {
  const textareaRef = useRef(null)

  function autoResizeTextarea() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = '0px'
    el.style.height = `${el.scrollHeight}px`
  }

  function submit() {
    const text = (value || '').trim()
    if (!text || disabled) return
    onSend(text)
    onChange?.('')
    textareaRef.current?.focus()
    requestAnimationFrame(autoResizeTextarea)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="p-3">
      <form
        onSubmit={(e) => { e.preventDefault(); submit() }}
        className="relative w-full rounded-3xl bg-[hsl(0_0%_92%)] p-2.5 pb-2 text-center ring-1 ring-[hsl(var(--border)/0.65)]"
        aria-label="Chat input"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value || ''}
          onChange={(e) => {
            onChange?.(e.target.value)
            requestAnimationFrame(autoResizeTextarea)
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Tell the builder what to change...'}
          className="min-h-12 w-full resize-none bg-transparent py-3 text-center text-sm leading-6 text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--foreground))] placeholder:opacity-65 outline-none disabled:opacity-60"
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
        />

        <div className="mt-1 flex items-center justify-between">
          <button
            type="button"
            disabled={disabled}
            className="flex h-8 w-8 items-center justify-center rounded-full text-xl leading-none text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent"
            aria-label="Attach images (coming soon)"
          >
            +
          </button>

          <button
            type="submit"
            disabled={disabled || !(value || '').trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] transition-colors hover:bg-[hsl(var(--primary)/0.85)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Submit prompt"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 13V3M3 8l5-5 5 5" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
