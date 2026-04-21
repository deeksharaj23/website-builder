import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const push = useCallback((toast) => {
    const id = crypto.randomUUID()
    const next = {
      id,
      title: toast?.title || '',
      description: toast?.description || '',
      variant: toast?.variant || 'default', // default | success | error
      durationMs: Number.isFinite(toast?.durationMs) ? toast.durationMs : 3200,
    }

    setToasts((prev) => [...prev, next])

    const durationMs = Math.max(800, next.durationMs || 0)
    window.setTimeout(() => dismiss(id), durationMs)
    return id
  }, [dismiss])

  const api = useMemo(() => ({
    push,
    success: (title, opts) => push({ ...(opts || {}), title, variant: 'success' }),
    error: (title, opts) => push({ ...(opts || {}), title, variant: 'error' }),
    dismiss,
    toasts,
  }), [dismiss, push, toasts])

  return (
    <ToastContext.Provider value={api}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider />')
  return ctx
}

export function ToastViewport({ placement = 'top-right', className = '' }) {
  const ctx = useToast()
  const toasts = ctx?.toasts || []

  if (!toasts.length) return null

  const placementClass = placement === 'center'
    ? 'absolute inset-0 flex items-center justify-center'
    : 'fixed right-4 top-4 flex'

  const stackClass = 'flex w-[min(420px,calc(100vw-2rem))] flex-col gap-2'

  return (
    <div
      className={[placementClass, 'z-[9999]', className].join(' ')}
      aria-live="polite"
      aria-relevant="additions"
    >
      <div className={stackClass}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => ctx.dismiss(t.id)} />
        ))}
      </div>
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  const variantStyles = toast.variant === 'success'
    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
    : toast.variant === 'error'
      ? 'border-red-200 bg-red-50 text-red-950'
      : 'border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))]'

  return (
    <div
      className={[
        'flex items-start justify-between gap-3 rounded-2xl border px-4 py-3 shadow-sm',
        variantStyles,
      ].join(' ')}
      role="status"
    >
      <div className="min-w-0">
        {toast.title && <div className="text-sm font-medium leading-snug">{toast.title}</div>}
        {toast.description && (
          <div className="mt-0.5 text-xs leading-relaxed opacity-80">{toast.description}</div>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm opacity-60 transition hover:opacity-100 hover:bg-black/5"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}

