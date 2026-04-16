import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthContext'

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()

  const [name, setName] = useState(user?.name || '')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSaving, setIsSaving] = useState(false)

  useMeta({
    title:       'Profile | Orqis',
    description: 'Manage your Orqis profile.',
    jsonLd:      webPageSchema({
      title:       'Profile | Orqis',
      description: 'Manage your Orqis profile.',
      url:         `${SITE_URL}/profile`,
    }),
  })

  useEffect(() => {
    setName(user?.name || '')
  }, [user?.name])

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSaving) return
    setIsSaving(true)
    setStatus({ type: 'idle', message: '' })
    try {
      const res = updateProfile({ name })
      if (!res.ok) {
        setStatus({ type: 'error', message: res.error || 'Could not save profile.' })
        return
      }
      setStatus({ type: 'success', message: 'Saved.' })
      window.setTimeout(() => setStatus({ type: 'idle', message: '' }), 1200)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="px-6 py-14" aria-label="Profile">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Profile
        </h1>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          Update your name. Your email is currently tied to this demo session.
        </p>

        <form
          className="mt-6 rounded-3xl bg-[hsl(var(--secondary))] p-4 ring-1 ring-[hsl(var(--border)/0.65)] sm:p-5"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium text-[hsl(var(--foreground))]">
                Name
              </label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-2xl bg-[hsl(var(--card))]"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--foreground))]">
                Email
              </label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={user?.email || ''}
                readOnly
                className="h-11 rounded-2xl bg-[hsl(var(--card))] opacity-80"
              />
            </div>

            {status.type === 'error' && (
              <p className="rounded-2xl border border-[hsl(var(--destructive)/0.25)] bg-[hsl(var(--destructive)/0.06)] px-3 py-2 text-sm text-[hsl(var(--destructive))]">
                {status.message}
              </p>
            )}
            {status.type === 'success' && (
              <p className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-2 text-sm text-[hsl(var(--foreground))]">
                {status.message}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="submit"
                className="rounded-full bg-[hsl(var(--primary))] px-5 text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
                disabled={isSaving}
              >
                {isSaving ? 'Saving…' : 'Save'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full"
                onClick={() => navigate('/builder')}
              >
                Back to builder
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

