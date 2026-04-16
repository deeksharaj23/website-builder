import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

function formatTimestamp(createdAt) {
  if (!createdAt) return ''
  const d = new Date(createdAt)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessage({ role, content, kind, createdAt, actions, onAction, messageId }) {
  const isUser = role === 'user'
  const timestamp = formatTimestamp(createdAt)
  const hasActions = Array.isArray(actions) && actions.length > 0
  const isLoader = kind === 'loader'

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(String(content ?? ''))
    } catch {
      // ignore clipboard errors (permissions / insecure context)
    }
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className="max-w-[85%]">
        <div
          className={`group relative whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-2xl px-4 py-3 text-sm leading-[1.25] ${
            isUser
              ? 'bg-[hsl(0_0%_86%)] text-[hsl(var(--foreground))]'
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
        {isLoader ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent opacity-70"
              aria-hidden="true"
            />
            <span>{content}</span>
          </span>
        ) : (
          content
        )}
        </div>

        {hasActions && (
          <div className={`mt-3 flex flex-wrap gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {actions.map((a) => (
              <Button
                key={a.id}
                type="button"
                size="sm"
                variant={a.variant || 'outline'}
                className={a.className}
                style={a.style}
                onClick={() => onAction?.({ messageId, actionId: a.id, payload: a.payload })}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
