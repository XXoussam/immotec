'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronRight } from 'lucide-react'

export default function Hero() {
  const sectionRef    = useRef<HTMLElement>(null)
  const bigTitleRef   = useRef<HTMLDivElement>(null)
  const linesRef      = useRef<HTMLSpanElement[]>([])
  const bodyRef       = useRef<HTMLParagraphElement>(null)
  const btnsRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert(): void } | null = null

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const init = async () => {
      const { gsap } = await import('gsap')

      ctx = gsap.context(() => {

        /* parent owns scaleY + gentle y-rise; letters own their own fade */
        gsap.set(bigTitleRef.current, {
          scaleY: 1.4,
          transformOrigin: 'top center',
          y: 28,
          opacity: 1,
        })

        const letters = bigTitleRef.current!.querySelectorAll<HTMLElement>('.btl')
        gsap.set(letters, { opacity: 0, y: 14, filter: 'blur(10px)' })

        /* ── Entrance animation ── */
        const tl = gsap.timeline({ delay: 2.1 })

        /* parent drifts up */
        tl.to(bigTitleRef.current, { y: 0, duration: 3, ease: 'power2.out' }, 0)

        /* letters stagger in left→right, multiple mid-flight at once */
        tl.to(letters, {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            stagger: { each: 0.12, from: 'start' },
          }, 0)
          .to(linesRef.current, { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.11 }, 0.35)
          .to(bodyRef.current,  { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.65')
          .to(btnsRef.current,  { opacity: 1, y: 0, duration: .85, ease: 'power3.out' }, '-=.7')

      }, sectionRef)
    }

    if (reducedMotion) {
      const show = [bodyRef.current, btnsRef.current]
      show.forEach(el => { if (el) { el.style.opacity = '1'; el.style.transform = 'none' } })
      linesRef.current.forEach(el => { el.style.transform = 'none' })

      if (bigTitleRef.current) {
        bigTitleRef.current.style.opacity = '1'
        bigTitleRef.current.style.transform = 'scaleY(1.4)'
        bigTitleRef.current.style.transformOrigin = 'top center'
        bigTitleRef.current.querySelectorAll<HTMLElement>('.btl').forEach(el => {
          el.style.opacity = '1'
          el.style.filter = 'none'
        })
      }
    } else {
      init()
    }

    return () => { ctx?.revert() }
  }, [])

  const setLineRef = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) linesRef.current[i] = el
  }

  return (
    <section id="hero" ref={sectionRef}>

      {/* Layer 1: full image (sky + building) */}
      <div className="layer-bg" aria-hidden="true" />

      {/* Layer 2: decorative title — sandwiched between image layers */}
      <div className="big-title" ref={bigTitleRef} aria-hidden="true">
        {'IMMOTEC'.split('').map((l, i) => (
          <span key={i} className="btl">{l}</span>
        ))}
      </div>

      {/* Layer 3: same image clipped to building roofline — sits in front of title */}
      <div className="layer-fg" aria-hidden="true" />

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="line"><span ref={setLineRef(0)}>L&apos;immobilier</span></span>
          <span className="line"><span ref={setLineRef(1)}>parisien,</span></span>
          <span className="line"><span ref={setLineRef(2)}><em>autrement.</em></span></span>
        </h1>

        <p className="hero-body" ref={bodyRef}>
          15 ans d&apos;expertise parisienne — un accompagnement sur-mesure, confidentiel et humain.
        </p>

        <div className="hero-btns" ref={btnsRef}>
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            className="rounded-sm bg-[var(--red)] hover:bg-[var(--red-dark)] text-[var(--offwhite)] border-0 text-[0.75rem] font-medium tracking-[0.1em] uppercase h-auto px-7 py-3.5 gap-2 transition-transform hover:-translate-y-0.5"
          >
            Estimation gratuite
            <ArrowRight data-icon="inline-end" className="size-3.5" />
          </Button>

          <Button
            variant="link"
            render={<a href="#avantages" />}
            nativeButton={false}
            className="text-white/65 hover:text-white text-[0.75rem] font-medium tracking-[0.1em] uppercase gap-2 p-0 no-underline hover:no-underline border-b border-transparent hover:border-white/40 rounded-none h-auto"
          >
            Nos services
            <ChevronRight data-icon="inline-end" className="size-3.5" />
          </Button>
        </div>
      </div>

    </section>
  )
}
