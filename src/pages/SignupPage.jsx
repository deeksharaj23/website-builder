import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/auth/AuthContext'
import AuthHeroLayout from '@/components/auth/AuthHeroLayout'

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signup } = useAuth()

  const redirectTo = useMemo(() => {
    const from = location.state?.from
    if (from && typeof from === 'object' && typeof from.pathname === 'string') return from.pathname + (from.search || '') + (from.hash || '')
    return '/builder'
  }, [location.state])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useMeta({
    title:       'Sign up | Orqis',
    description: 'Create your Orqis account and start building.',
    jsonLd:      webPageSchema({
      title:       'Sign up | Orqis',
      description: 'Create your Orqis account and start building.',
      url:         `${SITE_URL}/signup`,
    }),
  })

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const nextName = name.trim()
      if (password !== confirmPassword) {
        setStatus({ type: 'error', message: 'Passwords do not match.' })
        return
      }

      const res = await signup({ name: nextName, email, password })
      if (!res.ok) {
        setStatus({ type: 'error', message: res.error || 'Sign up failed.' })
        return
      }

      navigate(redirectTo, { replace: true, state: { source: 'signup' } })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthHeroLayout
      title={(
        <>
          <span className="block whitespace-nowrap">Create your account</span>
          <span className="block whitespace-nowrap">Start building fast</span>
        </>
      )}
      subtitle="Turn your idea into a launch-ready website, instantly."
      footer={(
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          Demo sign-up stores a session locally in your browser.
        </p>
      )}
    >
      <form
        className="w-full max-w-2xl rounded-3xl bg-[hsl(var(--secondary))] p-4 text-left ring-1 ring-[hsl(var(--border)/0.65)] sm:p-5"
        onSubmit={handleSubmit}
        aria-label="Sign up form"
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
              placeholder="Alex"
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
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-2xl bg-[hsl(var(--card))]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="password" className="text-sm font-medium text-[hsl(var(--foreground))]">
                Password
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-2xl bg-[hsl(var(--card))]"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-[hsl(var(--foreground))]">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 rounded-2xl bg-[hsl(var(--card))]"
              />
            </div>
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
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>

          <div className="flex items-center justify-between pt-1 text-sm">
            <Link to="/" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:underline">
              Back to home
            </Link>
            <span className="text-[hsl(var(--muted-foreground))]">
              Already have an account?{' '}
              <Link to="/login" className="text-[hsl(var(--foreground))] hover:underline">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </form>
    </AuthHeroLayout>
  )
}

