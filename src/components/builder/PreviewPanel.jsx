export default function PreviewPanel({ html, generationStep, phase }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 bg-[#FAFAFA] p-4">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(17,17,17,0.10)] bg-white shadow-sm">
          <div className="relative flex-1 bg-white">
            <iframe
              key={generationStep}
              title="Website preview"
              srcDoc={html || '<!doctype html><html><body></body></html>'}
              className="h-full w-full bg-white"
              sandbox="allow-forms allow-modals allow-popups allow-same-origin allow-scripts"
            />
            {phase !== 'completed' && (
              <div className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-[rgba(17,17,17,0.10)] bg-white px-3 py-1 text-xs text-[#6B6B6B]">
                Updating…
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
