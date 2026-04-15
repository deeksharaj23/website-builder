export default function PreviewPanel({ html, generationStep, phase }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 p-0">
        <div className="ds-glass ds-blur ds-glass-edge flex h-full flex-col overflow-hidden rounded-[var(--ds-radius-lg)]">
          <div className="relative flex-1">
            <iframe
              key={generationStep}
              title="Website preview"
              srcDoc={html || '<!doctype html><html><body></body></html>'}
              className="h-full w-full bg-white"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            />
            {phase !== 'completed' && (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[rgba(255,255,255,0.22)] bg-[rgba(255,255,255,0.14)] px-3 py-1 text-xs text-[rgba(17,24,39,0.60)] shadow-[var(--ds-shadow-2)]">
                Updating…
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
