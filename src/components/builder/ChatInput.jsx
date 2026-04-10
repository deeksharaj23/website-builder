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
      className="flex items-end gap-2 border-t border-[rgba(17,17,17,0.08)] p-3"
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
        className="min-h-[44px] flex-1 resize-none rounded-xl bg-[#F3F3F3] px-3 py-2 text-sm text-[#111111] outline-none disabled:opacity-60"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !(value || '').trim()}
        className="h-[44px] rounded-xl bg-[#111111] px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-35"
      >
        Send
      </button>
    </form>
  )
}
