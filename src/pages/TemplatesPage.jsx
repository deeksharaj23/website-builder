import { useMeta } from '@/hooks/useMeta'
import { webPageSchema, SITE_URL } from '@/seo'
import TemplatesSection from '@/components/TemplatesSection'
import CtaSection from '@/components/CtaSection'

export default function TemplatesPage() {
  useMeta({
    title:       'Templates | Website Builder',
    description: 'Pick a template, make it yours, and launch without the usual friction.',
    jsonLd:      webPageSchema({
      title:       'Templates | Website Builder',
      description: 'Pick a template, make it yours, and launch without the usual friction.',
      url:         `${SITE_URL}/templates`,
    }),
  })
  return (
    <>
      <TemplatesSection />
      <CtaSection />
    </>
  )
}
