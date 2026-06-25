'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    let lenis: import('lenis').default | null = null

    const init = async () => {
      const { default: Lenis }  = await import('lenis')
      const { gsap }            = await import('gsap')
      const { ScrollTrigger }   = await import('gsap/ScrollTrigger')

      gsap.registerPlugin(ScrollTrigger)

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.addEventListener('refresh', () => lenis!.resize())

      const tick = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)

      // Smooth anchor links
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
          const target = document.querySelector(a.getAttribute('href') ?? '')
          if (!target) return
          e.preventDefault()
          lenis!.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
        })
      })

      return () => {
        gsap.ticker.remove(tick)
        lenis?.destroy()
      }
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })

    return () => { cleanup?.() }
  }, [])

  return null
}
