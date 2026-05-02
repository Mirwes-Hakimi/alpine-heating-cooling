import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

/** Returns a ref + boolean that flips true once the element enters the viewport. */
export function useInView(threshold = 0.1, rootMargin = '0px 0px -40px 0px') {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}

/** Returns a container ref + a per-item style getter for staggered grid animations. */
export function useStaggerIn(staggerMs = 90) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const getStyle = (i: number): CSSProperties => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(32px)',
    transition: `opacity 0.55s ease ${i * staggerMs}ms, transform 0.6s cubic-bezier(0.22, 1.2, 0.4, 1) ${i * staggerMs}ms`,
  })

  return { containerRef: ref, inView, getStyle }
}

/** Returns a ref + style object for a single fade-in-up element. */
export function useFadeIn(delay = 0, direction: 'up' | 'left' | 'right' = 'up') {
  const { ref, inView } = useInView()

  const transforms: Record<typeof direction, string> = {
    up: 'translateY(32px)',
    left: 'translateX(-32px)',
    right: 'translateX(32px)',
  }

  const style: CSSProperties = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : transforms[direction],
    transition: `opacity 0.6s ease ${delay}ms, transform 0.65s cubic-bezier(0.22, 1.2, 0.4, 1) ${delay}ms`,
  }

  return { ref, style }
}

/** Counts from 0 to `end` once the returned ref enters the viewport. */
export function useCountUp(end: number, duration = 1800) {
  const { ref, inView } = useInView(0.3)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * end))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return { ref, count }
}
