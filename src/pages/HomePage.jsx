import { useMeta } from '@/hooks/useMeta'
import { websiteSchema } from '@/seo'
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import MeetSection from '@/components/MeetSection'
import TemplatesSection from '@/components/TemplatesSection'
import CtaSection from '@/components/CtaSection'

export default function HomePage() {
  useMeta({
    title:       'Website Builder — Build your unique website in seconds',
    description: 'Turn your idea into a fully designed, ready-to-launch landing page, instantly. Powered by AI.',
    jsonLd:      websiteSchema(),
  })
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MeetSection />
      <TemplatesSection />
      <CtaSection />
    </>
  )
}
