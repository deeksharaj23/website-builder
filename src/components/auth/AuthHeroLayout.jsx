export default function AuthHeroLayout({ title, subtitle, children, footer }) {
  return (
    <section
      className="flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-6 py-12"
      aria-label="Authentication"
    >
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center">
        <div className="flex flex-1 flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo-symbol.png"
              alt=""
              className="h-10 w-10 rounded-2xl object-contain"
              aria-hidden="true"
            />
            <span className="font-display text-base font-semibold tracking-tight text-[hsl(var(--foreground))]">
              Orqis
            </span>
          </div>

          <h1 className="font-display max-w-none text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[0.98] tracking-tight text-[hsl(var(--foreground))]">
            {title}
          </h1>

          <p className="max-w-[34rem] text-[17px] leading-relaxed text-[hsl(var(--muted-foreground))]">
            {subtitle}
          </p>

          {children}

          {footer}
        </div>
      </div>
    </section>
  )
}
