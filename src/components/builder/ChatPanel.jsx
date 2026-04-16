import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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
  const promptsScrollerRef = useRef(null)
  const hasMessages = Boolean(messages?.length)
  const [canScrollPromptsLeft, setCanScrollPromptsLeft] = useState(false)
  const [canScrollPromptsRight, setCanScrollPromptsRight] = useState(false)

  const showExamplePrompts = useMemo(() => !hasMessages && entryMode === 'direct', [hasMessages, entryMode])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!showExamplePrompts) return
    const el = promptsScrollerRef.current
    if (!el) return

    const update = () => {
      const maxLeft = el.scrollWidth - el.clientWidth
      const left = el.scrollLeft
      setCanScrollPromptsLeft(left > 1)
      setCanScrollPromptsRight(left < maxLeft - 1)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [showExamplePrompts])

  function scrollPromptsBy(direction) {
    const el = promptsScrollerRef.current
    if (!el) return
    const delta = Math.max(240, Math.floor(el.clientWidth * 0.75))
    el.scrollBy({ left: direction === 'left' ? -delta : delta, behavior: 'smooth' })
  }

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

      {showExamplePrompts && (
        <div className="px-3 py-3">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2" aria-label="Example prompts">
            {/* Left arrow (no overlap; hidden on mobile) */}
            <div className="hidden sm:flex">
              {canScrollPromptsLeft ? (
                <button
                  type="button"
                  onClick={() => scrollPromptsBy('left')}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-colors hover:bg-[hsl(var(--secondary))]"
                  aria-label="Scroll example prompts left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              ) : (
                <div className="h-8 w-8" aria-hidden="true" />
              )}
            </div>

            {/* Scroll row */}
            <div className="px-1">
              <div
                ref={promptsScrollerRef}
                className="flex gap-2 overflow-x-auto pb-1"
                aria-label="Example prompts"
              >
                {EXAMPLE_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onInputChange?.(prompt)}
                    className="flex-shrink-0 rounded-2xl bg-[hsl(48_30%_92%)] p-3 text-left text-[13px] text-[hsl(var(--foreground))] ring-1 ring-[hsl(48_18%_84%)] transition-colors hover:bg-[hsl(48_34%_90%)]"
                    style={{ width: 'min(360px, 80%)' }}
                  >
                    <span className="block leading-relaxed">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right arrow (no overlap; hidden on mobile) */}
            <div className="hidden sm:flex justify-end">
              {canScrollPromptsRight ? (
                <button
                  type="button"
                  onClick={() => scrollPromptsBy('right')}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-colors hover:bg-[hsl(var(--secondary))]"
                  aria-label="Scroll example prompts right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <div className="h-8 w-8" aria-hidden="true" />
              )}
            </div>
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
