import FloatingCard from '@/components/FloatingCard'
import PromptInput from '@/components/PromptInput'

/* ─── Floating card data ─── */
const LEFT_CARDS = [
  {
    label: 'Growth',
    title: '10x your reach',
    desc: 'Turn first-time visitors into loyal customers automatically.',
    bg: '#CFE3F0',
    labelBg: '#B8D5E8',
    floatClass: 'float-a',
    mt: 'mt-0',
  },
  {
    label: 'Speed',
    title: 'Launch in 60 seconds',
    desc: 'From raw idea to live page, no waiting, no friction.',
    bg: '#D7EAD9',
    labelBg: '#C2DCCA',
    floatClass: 'float-b',
    mt: 'mt-6',
  },
]

const RIGHT_CARDS = [
  {
    label: 'Convert',
    title: '3× more leads',
    desc: 'Pages built to capture attention and drive action by default.',
    bg: '#F3D9C6',
    labelBg: '#E8C9B2',
    floatClass: 'float-c',
    mt: 'mt-10',
  },
  {
    label: 'Scale',
    title: '1M+ people reached',
    desc: 'Built for ambitious goals, no engineers required.',
    bg: '#E6DDF2',
    labelBg: '#D6CCE6',
    floatClass: 'float-d',
    mt: 'mt-4',
  },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6 py-12"
      aria-label="Hero"
    >
      <div className="mx-auto flex w-full max-w-screen-xl items-center gap-8">

        {/* ── Left floating cards ── */}
        <aside
          className="hidden w-56 shrink-0 flex-col gap-4 lg:flex xl:w-64"
          aria-hidden="true"
        >
          {LEFT_CARDS.map((card) => (
            <div key={card.label} className={card.mt}>
              <FloatingCard {...card} />
            </div>
          ))}
        </aside>

        {/* ── Center content ── */}
        <div className="flex flex-1 flex-col items-center gap-6 text-center">

          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E0E0DE] bg-white px-4 py-1.5 text-xs font-medium text-[#6B6B6B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
            AI-powered website builder
          </span>

          {/* Headline — handwritten display font */}
          <h1 className="font-display max-w-lg text-[clamp(3.1rem,7vw,5.2rem)] font-bold leading-[0.94] tracking-tight text-[#111111]">
            Build your unique
            <br />
            website in seconds
          </h1>

          {/* Subtext */}
          <p className="max-w-[28rem] text-[17px] leading-relaxed text-[#6B6B6B]">
            Turn your idea into a fully designed, ready-to-launch website, instantly.
          </p>

          {/* Prompt input + CTA */}
          <PromptInput />

          {/* Social proof nudge */}
          <p className="text-xs text-[#6B6B6B]">
            No account needed &nbsp;·&nbsp; Free to start
          </p>

        </div>

        {/* ── Right floating cards ── */}
        <aside
          className="hidden w-56 shrink-0 flex-col gap-4 lg:flex xl:w-64"
          aria-hidden="true"
        >
          {RIGHT_CARDS.map((card) => (
            <div key={card.label} className={card.mt}>
              <FloatingCard {...card} />
            </div>
          ))}
        </aside>

      </div>
    </section>
  )
}
