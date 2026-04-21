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

const PROMPT_CARD_COLORS = ['#CFE3F0', '#D7EAD9', '#F3D9C6', '#E6DDF2', '#F6E7B5']

export default function ChatPanel({
  messages,
  inputValue,
  onInputChange,
  onSend,
  promptPills,
  onPromptPillSelect,
  onMessageAction,
  phase,
  entryMode,
  hidePromptArrows,
}) {
  const scrollerRef = useRef(null)
  const promptsScrollerRef = useRef(null)
  const hasMessages = Boolean(messages?.length)
  const [canScrollPromptsLeft, setCanScrollPromptsLeft] = useState(false)
  const [canScrollPromptsRight, setCanScrollPromptsRight] = useState(false)

  const showExamplePrompts = useMemo(() => (
    !hasMessages && (entryMode === 'direct' || entryMode === 'signup')
  ), [hasMessages, entryMode])
  const showPromptPills = Array.isArray(promptPills) && promptPills.length > 0

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  useEffect(() => {
    if (!showExamplePrompts && !showPromptPills) return
    const el = promptsScrollerRef.current
    if (!el) return

    const update = () => {
      const left = Math.round(el.scrollLeft)
      const maxLeft = Math.max(0, Math.round(el.scrollWidth - el.clientWidth))

      // Enable arrows whenever there is any remaining scrollable distance.
      // Keep the thresholds small so arrows don't disable while pills are still clipped.
      const epsilon = 1
      setCanScrollPromptsLeft(left > epsilon)
      setCanScrollPromptsRight(maxLeft > 0 && left < maxLeft - epsilon)
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [showExamplePrompts, showPromptPills])

  function scrollPromptsBy(direction) {
    const el = promptsScrollerRef.current
    if (!el) return
    const delta = Math.max(240, Math.floor(el.clientWidth * 0.75))
    el.scrollBy({ left: direction === 'left' ? -delta : delta, behavior: 'smooth' })
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollerRef} className="flex-1 overflow-auto p-3">
        <div className="flex flex-col gap-4">
          {hasMessages ? (
            messages.map((m) => (
              <ChatMessage
                key={m.id}
                messageId={m.id}
                role={m.role}
                content={m.content}
                kind={m.kind}
                createdAt={m.createdAt}
                actions={m.actions}
                onAction={onMessageAction}
              />
            ))
          ) : (
            (entryMode === 'direct' || entryMode === 'signup') ? null : (
              <div className="text-sm text-[hsl(var(--muted-foreground))]">
                Enter a prompt on the homepage to start.
              </div>
            )
          )}
        </div>
      </div>

      {(showExamplePrompts || showPromptPills) && (
        <div className="px-3 py-3">
          <div
            className={hidePromptArrows ? 'grid grid-cols-1 items-center' : 'grid grid-cols-[auto_1fr_auto] items-center gap-2'}
            aria-label="Prompt pills"
          >
            {/* Left arrow (no overlap; hidden on mobile) */}
            {!hidePromptArrows && (
              <div className="hidden sm:flex relative z-10">
                <button
                  type="button"
                  onClick={() => scrollPromptsBy('left')}
                  disabled={!canScrollPromptsLeft}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--secondary))] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[hsl(var(--card))]"
                  aria-label="Scroll prompt pills left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Scroll row */}
            <div className="min-w-0 overflow-hidden">
              <div
                ref={promptsScrollerRef}
                className={[
                  // Always allow horizontal scrolling so pills never get clipped.
                  // When arrows are visible, we hide the scrollbar and rely on the buttons.
                  hidePromptArrows ? 'thin-scrollbar' : 'no-scrollbar',
                  'flex gap-2 overflow-x-auto p-1 justify-start',
                ].join(' ')}
                style={{ touchAction: 'pan-y' }}
                aria-label="Prompt pills"
              >
                {(showPromptPills ? promptPills : EXAMPLE_PROMPTS).map((prompt, idx) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      if (showPromptPills) onPromptPillSelect?.(prompt)
                      else onInputChange?.(prompt)
                    }}
                    className={[
                      'flex-shrink-0 text-left text-[13px] text-[hsl(var(--foreground))] ring-1 ring-[hsl(var(--border)/0.7)] transition-[filter] hover:brightness-[0.97]',
                      showPromptPills ? 'rounded-full px-4 py-2 font-medium' : 'rounded-2xl p-3',
                    ].join(' ')}
                    style={{
                      width: showPromptPills ? 'auto' : 'min(297px, 66%)',
                      backgroundColor: PROMPT_CARD_COLORS[idx % PROMPT_CARD_COLORS.length],
                    }}
                  >
                    <span className="block leading-relaxed">{prompt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right arrow (no overlap; hidden on mobile) */}
            {!hidePromptArrows && (
              <div className="hidden sm:flex justify-end relative z-10">
                <button
                  type="button"
                  onClick={() => scrollPromptsBy('right')}
                  disabled={!canScrollPromptsRight}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-colors hover:bg-[hsl(var(--secondary))] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[hsl(var(--card))]"
                  aria-label="Scroll prompt pills right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
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
