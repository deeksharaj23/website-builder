import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import HeroSection from '@/components/HeroSection'
import CtaSection from '@/components/CtaSection'

export default function BuilderPage() {
  useMeta({
    title:       'Builder | Website Builder',
    description: 'Describe your idea, generate instantly, refine with ease, and launch — all in one seamless flow.',
    jsonLd:      webPageSchema({
      title:       'Builder | Website Builder',
      description: 'Describe your idea, generate instantly, refine with ease, and launch — all in one seamless flow.',
      url:         `${SITE_URL}/builder`,
    }),
  })
  return (
    <>
      <HeroSection />
      <CtaSection />
    </>
  )
}
