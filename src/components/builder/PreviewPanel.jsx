export default function PreviewPanel({ html, generationStep, phase, settings }) {
  const showGuides = Boolean(settings?.showGuides)
  const snapToGrid = Boolean(settings?.snapToGrid)

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 bg-[hsl(var(--background))]">
        <iframe
          key={generationStep}
          title="Website preview"
          srcDoc={html || '<!doctype html><html><body></body></html>'}
          className="h-full w-full bg-[hsl(var(--background))]"
          sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
        />

        {(showGuides || snapToGrid) && (
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: [
                showGuides
                  ? 'linear-gradient(to right, rgba(0,0,0,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.10) 1px, transparent 1px)'
                  : null,
                snapToGrid
                  ? 'linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)'
                  : null,
              ].filter(Boolean).join(', '),
              backgroundSize: [
                showGuides ? '96px 96px, 96px 96px' : null,
                snapToGrid ? '24px 24px, 24px 24px' : null,
              ].filter(Boolean).join(', '),
              backgroundPosition: '0 0',
              mixBlendMode: 'multiply',
              opacity: snapToGrid && showGuides ? 1 : 0.9,
            }}
          />
        )}

        {phase !== 'completed' && (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
            Updating…
          </div>
        )}
        {snapToGrid && (
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
            Snap to grid on
          </div>
        )}
      </div>
    </div>
  )
}
