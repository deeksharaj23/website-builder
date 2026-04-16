const FAQS = [
  {
    q: 'What do I need to start?',
    a: 'Start with an idea. Share what you’re building, your audience, and any preferences like style, tone, or features. Orqis will turn your input into a fully designed, launch-ready site that you can easily refine and customize.',
  },
  {
    q: 'Can I edit the website after it’s generated?',
    a: 'Yes. Once your site is generated, you can easily customize sections, edit content, adjust layouts, and fine-tune the design to match your brand before going live.',
  },
  {
    q: 'Do I need to code?',
    a: 'Not at all. You can build and launch your site without any coding. And if you ever want to go deeper, you have the option to export and customize.',
  },
  {
    q: 'How can I ship my generated website?',
    a: 'When you’re ready, you can either publish your site instantly from Orqis or export it to GitHub if you want more control and continue building there.',
  },
  {
    q: 'Can I use a template instead?',
    a: 'Absolutely. Templates give you a solid starting point. You can shape them however you like and make them your own.',
  },
]

function FaqItem({ item }) {
  return (
    <details className="group rounded-2xl bg-[hsl(var(--surface-dark-elevated))] p-5 ring-1 ring-[hsl(var(--border)/0.12)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-sm font-semibold text-white">{item.q}</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)] text-white transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--surface-dark-muted))]">
        {item.a}
      </p>
    </details>
  )
}

export default function FaqsSection() {
  return (
    <section
      id="faqs"
      className="bg-[hsl(var(--surface-dark))] px-6 py-24"
      aria-label="Frequently asked questions"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] font-bold leading-tight text-white">
            FAQs
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[hsl(var(--surface-dark-muted))]">
            Everything you need to know to go from idea to launch—fast.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          {FAQS.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

