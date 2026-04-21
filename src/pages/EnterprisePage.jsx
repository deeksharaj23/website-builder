import { useMemo, useState } from 'react'
import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-sm font-medium text-[hsl(var(--foreground))]">{label}</span>
      {children}
    </label>
  )
}

export default function EnterprisePage() {
  useMeta({
    title:       'Enterprise | Orqis',
    description: 'Enterprise-ready controls and workflows for teams that need governance, visibility, and secure scale.',
    jsonLd:      webPageSchema({
      title:       'Enterprise | Orqis',
      description: 'Enterprise-ready controls and workflows for teams that need governance, visibility, and secure scale.',
      url:         `${SITE_URL}/enterprise`,
    }),
  })

  const [form, setForm] = useState({
    name: '',
    workEmail: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const mailtoHref = useMemo(() => {
    const subject = `Enterprise inquiry — ${form.company || 'Orqis'}`
    const body = [
      `Name: ${form.name || '-'}`,
      `Work email: ${form.workEmail || '-'}`,
      `Company: ${form.company || '-'}`,
      '',
      form.message || '',
    ].join('\n')

    return `mailto:ceo@ellenox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [form])

  function update(key) {
    return (e) => setForm((s) => ({ ...s, [key]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setStatus('')

    try {
      const res = await fetch('/api/enterprise/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setStatus(data?.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('Thanks — we’ll reach out shortly.')
      setForm({ name: '', workEmail: '', company: '', message: '' })
    } catch {
      setStatus('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
      window.setTimeout(() => setStatus(''), 2500)
    }
  }

  return (
    <section className="px-6 pb-16 pt-16">
      <div className="mx-auto grid max-w-screen-xl items-start gap-10 lg:grid-cols-2 lg:gap-12">
        {/* Left: copy */}
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--muted-foreground))]">
            Enterprise
          </p>
          <h1 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-tight text-[hsl(var(--foreground))]">
            Governed building for teams that ship fast.
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[hsl(var(--muted-foreground))]">
            Orqis helps teams turn ideas into working websites with the controls enterprises expect: role-based access,
            review-friendly workflows, and clear separation between building and publishing.
          </p>

          <div className="mt-8 grid gap-3 rounded-3xl bg-[hsl(var(--secondary))] p-4 ring-1 ring-[hsl(var(--border)/0.65)] sm:p-5">
            <p className="text-sm font-semibold text-[hsl(var(--foreground))]">What you can expect</p>
            <ul className="grid gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <li>Role-based access and least-privilege defaults</li>
              <li>Guardrails for publishing and approvals</li>
              <li>Workspace visibility for multi-team collaboration</li>
            </ul>
          </div>
        </div>

        {/* Right: contact form */}
        <div className="lg:pl-6">
          <div className="rounded-3xl bg-[hsl(var(--secondary))] p-4 ring-1 ring-[hsl(var(--border)/0.65)] sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-[hsl(var(--foreground))]">Contact sales</p>
                <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                  Tell us a bit about your team and what you’re building.
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full">
                <a href={mailtoHref} aria-label="Email sales">
                  Email
                </a>
              </Button>
            </div>

            <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
              <Field label="Name">
                <Input
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  className="h-11 rounded-2xl bg-[hsl(var(--card))]"
                />
              </Field>
              <Field label="Work email">
                <Input
                  type="email"
                  value={form.workEmail}
                  onChange={update('workEmail')}
                  placeholder="jane@company.com"
                  required
                  className="h-11 rounded-2xl bg-[hsl(var(--card))]"
                />
              </Field>
              <Field label="Company">
                <Input
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Company Inc."
                  className="h-11 rounded-2xl bg-[hsl(var(--card))]"
                />
              </Field>
              <Field label="Message">
                <Textarea
                  value={form.message}
                  onChange={update('message')}
                  placeholder="What are you looking to build? Any requirements (SSO, approvals, data residency)?"
                  className="rounded-2xl bg-[hsl(var(--card))]"
                />
              </Field>

              <div className="flex items-center justify-between gap-4 pt-2">
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {status || 'We’ll respond within 1–2 business days.'}
                </p>
                <Button
                  type="submit"
                  className="h-11 rounded-full bg-[hsl(var(--primary))] px-6 text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.85)]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending…' : 'Contact'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

