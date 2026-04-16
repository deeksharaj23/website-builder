import { useRef } from 'react'

export default function ChatInput({ value, onChange, onSend, disabled, placeholder }) {
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
      className="flex items-end gap-2 border-t border-[hsl(var(--border))] p-3"
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
        placeholder={placeholder || 'Tell the builder what to change...'}
        className="min-h-[44px] flex-1 resize-none rounded-xl bg-[hsl(var(--secondary))] px-3 py-2 text-sm leading-[1.25] text-[hsl(var(--foreground))] outline-none disabled:opacity-60"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !(value || '').trim()}
        className="h-[44px] rounded-xl bg-[hsl(var(--primary))] px-4 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)] disabled:cursor-not-allowed disabled:opacity-35"
      >
        Send
      </button>
    </form>
  )
}
