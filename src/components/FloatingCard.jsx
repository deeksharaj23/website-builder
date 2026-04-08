/**
 * FloatingCard — pastel surface card for the hero flanks.
 *
 * Props:
 *   label    string   — small pill label (uppercase)
 *   title    string   — card headline
 *   desc     string   — supporting text
 *   bg       string   — pastel background hex (#CFE3F0 / #D7EAD9 / #F3D9C6 / #E6DDF2)
 *   labelBg  string   — slightly darker label tint hex
 *   floatClass string — CSS animation class (float-a / float-b / float-c / float-d)
 *   children ReactNode — optional visual slot (icon, mini-chart, etc.)
 */
export default function FloatingCard({
  label,
  title,
  desc,
  bg,
  labelBg,
  floatClass = 'float-a',
  children,
}) {
  return (
    <div
      className={`w-full rounded-3xl p-6 ${floatClass}`}
      style={{ backgroundColor: bg }}
    >
      {/* Label pill */}
      <span
        className="inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest"
        style={{ backgroundColor: labelBg, color: '#111111' }}
      >
        {label}
      </span>

      {/* Title */}
      <p className="mt-3 text-base font-semibold leading-snug text-[#111111]">
        {title}
      </p>

      {/* Description */}
      <p className="mt-1 text-sm leading-relaxed text-[#6B6B6B]">{desc}</p>

      {/* Optional visual */}
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
