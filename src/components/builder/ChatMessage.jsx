export default function ChatMessage({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-1.5 text-sm leading-[1.25] ds-hover ${
          isUser
            ? 'bg-[hsl(var(--primary)/0.88)] text-white shadow-[var(--ds-shadow-2),var(--ds-glow-blue)]'
            : 'bg-[rgba(255,255,255,0.14)] text-[hsl(var(--foreground))] ring-1 ring-[rgba(255,255,255,0.18)] shadow-[var(--ds-shadow-2)]'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
