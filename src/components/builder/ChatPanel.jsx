import { useEffect, useRef } from 'react'
import ChatMessage from '@/components/builder/ChatMessage'
import ChatInput from '@/components/builder/ChatInput'

export default function ChatPanel({
  messages,
  inputValue,
  onInputChange,
  onSend,
  phase,
}) {
  const scrollerRef = useRef(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollerRef} className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-3">
          {messages?.length ? (
            messages.map((m) => (
              <ChatMessage key={m.id} role={m.role} content={m.content} />
            ))
          ) : (
            <div className="text-sm text-[#6B6B6B]">
              Enter a prompt on the homepage to start.
            </div>
          )}
        </div>
      </div>

      <ChatInput
        value={inputValue}
        onChange={onInputChange}
        onSend={onSend}
        disabled={phase !== 'completed'}
      />
    </div>
  )
}
