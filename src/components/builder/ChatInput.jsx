import { useRef } from 'react'

export default function ChatInput({ value, onChange, onSend, disabled }) {
  const textareaRef = useRef(null)

  function submit() {
    const text = (value || '').trim()
    if (!text || disabled) return
    onSend(text)
    onChange?.('')
    textareaRef.current?.focus()
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
      className="flex items-end gap-2 border-t border-[rgba(255,255,255,0.16)] p-3"
      aria-label="Chat input"
    >
      <textarea
        ref={textareaRef}
        rows={2}
        value={value || ''}
        onChange={(e) => {
          onChange?.(e.target.value)
        }}
        onKeyDown={handleKeyDown}
        placeholder="Tell the builder what to change..."
        className="ds-hover min-h-[44px] flex-1 resize-none rounded-xl border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.10)] px-3 py-2 text-sm leading-[1.25] text-[hsl(var(--foreground))] outline-none placeholder:text-[rgba(17,24,39,0.55)] disabled:opacity-60"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !(value || '').trim()}
        className="ds-hover h-[44px] rounded-xl bg-[hsl(var(--primary)/0.88)] px-4 text-sm font-medium text-white shadow-[var(--ds-shadow-2),var(--ds-glow-blue)] hover:bg-[hsl(var(--primary)/0.80)] disabled:cursor-not-allowed disabled:opacity-35"
      >
        Send
      </button>
    </form>
  )
}
