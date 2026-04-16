import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthContext'
import AuthHeroLayout from '@/components/auth/AuthHeroLayout'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const redirectTo = useMemo(() => {
    const from = location.state?.from
    if (from && typeof from === 'object' && typeof from.pathname === 'string') return from.pathname + (from.search || '') + (from.hash || '')
    return '/builder'
  }, [location.state])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useMeta({
    title:       'Login | Orqis',
    description: 'Sign in to access the Orqis builder.',
    jsonLd:      webPageSchema({
      title:       'Login | Orqis',
      description: 'Sign in to access the Orqis builder.',
      url:         `${SITE_URL}/login`,
    }),
  })

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const res = await login({ email, password })
      if (!res.ok) {
        setStatus({ type: 'error', message: res.error || 'Login failed.' })
        return
      }
      navigate(redirectTo, { replace: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthHeroLayout
      title={(
        <>
          <span className="block whitespace-nowrap">Welcome back</span>
          <span className="block whitespace-nowrap">Let’s keep building</span>
        </>
      )}
      subtitle="Sign in to continue to the Orqis builder."
      footer={(
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          This demo login stores a session locally in your browser.
        </p>
      )}
    >
      <form
        className="w-full max-w-2xl rounded-3xl bg-[hsl(var(--secondary))] p-4 text-left ring-1 ring-[hsl(var(--border)/0.65)] sm:p-5"
        onSubmit={handleSubmit}
        aria-label="Login form"
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-[hsl(var(--foreground))]">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-2xl bg-[hsl(var(--card))]"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium text-[hsl(var(--foreground))]">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-2xl bg-[hsl(var(--card))]"
            />
          </div>

          {status.type === 'error' && (
            <p className="rounded-2xl border border-[hsl(var(--destructive)/0.25)] bg-[hsl(var(--destructive)/0.06)] px-3 py-2 text-sm text-[hsl(var(--destructive))]">
              {status.message}
            </p>
          )}

          <Button
            type="submit"
            className="h-12 w-full rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>

          <div className="flex items-center justify-between pt-1 text-sm">
            <Link to="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:underline">
              Back to home
            </Link>
            <span className="text-[hsl(var(--muted-foreground))]">
              New here?{' '}
              <Link to="/signup" className="text-[hsl(var(--foreground))] hover:underline">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </form>
    </AuthHeroLayout>
  )
}
