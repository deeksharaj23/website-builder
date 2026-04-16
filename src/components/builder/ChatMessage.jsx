import { Copy } from 'lucide-react'

function formatTimestamp(createdAt) {
  if (!createdAt) return ''
  const d = new Date(createdAt)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessage({ role, content, createdAt }) {
  const isUser = role === 'user'
  const timestamp = formatTimestamp(createdAt)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(content ?? ''))
    } catch {
      // ignore clipboard errors (permissions / insecure context)
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`group relative max-w-[85%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-2xl px-3 py-1.5 text-sm leading-[1.25] ${
          isUser
            ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
            : 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))]'
        }`}
      >
        <div
          className={[
            'pointer-events-none absolute top-full mt-1 flex items-center gap-3 text-[hsl(var(--muted-foreground))] opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100',
            isUser ? 'right-2 justify-end' : 'left-2 justify-start',
          ].join(' ')}
        >
          <button
            type="button"
            onClick={handleCopy}
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))]"
            aria-label="Copy message"
          >
            <Copy className="h-4 w-4" />
          </button>
          {timestamp && <span className="ml-1 whitespace-nowrap text-[11px]">{timestamp}</span>}
        </div>
        {content}
      </div>
    </div>
  )
}
