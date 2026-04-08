import { Link } from 'react-router-dom'
import { useMeta } from '@/hooks/useMeta'

export default function NotFoundPage() {
  useMeta({
    title:       '404 — Page Not Found | Website Builder',
    description: 'The page you are looking for does not exist.',
    robots:      'noindex, nofollow',
  })
  return (
    <section
      className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center"
      aria-label="Page not found"
    >
      <p
        className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-none text-[#111111]"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl font-semibold text-[#111111]">
        Page not found
      </h1>
      <p className="max-w-sm text-[#6B6B6B]">
        This page doesn&apos;t exist — yet.
      </p>
      <Link
        to="/"
        className="rounded-full bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[rgba(17,17,17,0.85)]"
      >
        Back to home →
      </Link>
    </section>
  )
}
