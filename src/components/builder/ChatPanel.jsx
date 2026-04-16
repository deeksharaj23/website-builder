import { useEffect, useRef } from 'react'
import ChatMessage from '@/components/builder/ChatMessage'
import ChatInput from '@/components/builder/ChatInput'

const EXAMPLE_PROMPTS = [
  'A landing page for a yoga studio with class schedule and pricing.',
  'A portfolio for a product designer with case studies and a contact form.',
  'A waitlist page for my upcoming app with a bold hero and FAQ.',
  'An ecommerce homepage for a skincare brand with featured products.',
  'A simple restaurant website with menu, hours, and reservation CTA.',
]

export default function ChatPanel({
  messages,
  inputValue,
  onInputChange,
  onSend,
  phase,
  entryMode,
}) {
  const scrollerRef = useRef(null)
  const hasMessages = Boolean(messages?.length)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollerRef} className="flex-1 overflow-auto p-3">
        <div className="flex flex-col gap-2">
          {hasMessages ? (
            messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))
          ) : (
            entryMode === 'direct' ? null : (
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                {entryMode === 'signup'
                  ? 'Welcome in — start by describing what you want to build.'
                  : 'Enter a prompt on the homepage to start.'}
              </div>
            )
          )}
        </div>
      </div>

      {!hasMessages && entryMode === 'direct' && (
        <div className="px-3 py-3">
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollSnapType: 'x mandatory' }}
            aria-label="Example prompts"
          >
            {EXAMPLE_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => onInputChange?.(prompt)}
                className="flex-shrink-0 rounded-2xl bg-[hsl(var(--secondary)/0.75)] p-3 text-left text-[13px] text-[hsl(var(--foreground))] ring-1 ring-[hsl(var(--border)/0.65)] transition-colors hover:bg-[hsl(var(--secondary))]"
                style={{ scrollSnapAlign: 'start', width: 'min(360px, 80%)' }}
              >
                <span className="block leading-relaxed">
                  {prompt}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        disabled={phase !== 'completed'}
        placeholder={
          entryMode === 'signup'
            ? 'What do you want to build today?'
            : entryMode === 'direct'
              ? 'Describe what you want to build (audience, style, sections, CTA)…'
              : 'Tell the builder what to change...'
        }
      />
    </div>
  )
}
