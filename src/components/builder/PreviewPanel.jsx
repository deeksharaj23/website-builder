export default function PreviewPanel({ html, generationStep, phase }) {
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
        {phase !== 'completed' && (
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
            Updating…
          </div>
        )}
      </div>
    </div>
  )
}
