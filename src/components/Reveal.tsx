import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

type Phase = 'static' | 'animate' | 'visible'

/**
 * Scroll reveal that is safe for static pre-rendering.
 *
 * The server-rendered markup and first client paint render the content fully
 * visible, so the HTML is crawlable and there is no flash of hidden content.
 * After hydration, only elements that are still below the fold get a gentle
 * fade-and-rise as they scroll into view. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('static')

  useEffect(() => {
    if (reduce) {
      setPhase('visible')
      return
    }
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight && rect.bottom > 0
    setPhase(inView ? 'visible' : 'animate')
  }, [reduce])

  if (phase === 'animate') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
