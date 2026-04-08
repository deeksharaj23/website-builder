import { useEffect, useState } from 'react'

function normalizeOptions(arg1, arg2, arg3) {
  // Back-compat:
  // - useTypewriter(phrases, typeSpeed, deleteSpeed, pauseMs)
  // - useTypewriter(phrases, { typeSpeed, deleteSpeed, pauseMs, mode })
  if (typeof arg1 === 'object' && arg1 !== null) {
    return {
      typeSpeed: arg1.typeSpeed ?? 46,
      deleteSpeed: arg1.deleteSpeed ?? 22,
      pauseMs: arg1.pauseMs ?? 1800,
      mode: arg1.mode ?? 'type-delete',
    }
  }
  return {
    typeSpeed: arg1 ?? 46,
    deleteSpeed: arg2 ?? 22,
    pauseMs: arg3 ?? 1800,
    mode: 'type-delete',
  }
}

export function useTypewriter(phrases, arg1, arg2, arg3) {
  const { typeSpeed, deleteSpeed, pauseMs, mode } = normalizeOptions(arg1, arg2, arg3)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const done = text === current
    const empty = text.length === 0
    const delay = done ? pauseMs : isDeleting ? deleteSpeed : typeSpeed

    const t = setTimeout(() => {
      if (mode === 'type-only') {
        if (!done) {
          setText(current.slice(0, text.length + 1))
          return
        }
        // After pause, jump to next prompt and re-type (no backspacing).
        setText('')
        setPhraseIndex((i) => (i + 1) % phrases.length)
        return
      }

      if (!isDeleting) {
        setText(current.slice(0, text.length + 1))
        if (done) setIsDeleting(true)
        return
      }
      setText(current.slice(0, text.length - 1))
      if (empty) {
        setIsDeleting(false)
        setPhraseIndex((i) => (i + 1) % phrases.length)
      }
    }, delay)

    return () => clearTimeout(t)
  }, [text, isDeleting, phraseIndex, phrases, typeSpeed, deleteSpeed, pauseMs, mode])

  return text
}
