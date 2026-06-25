'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { target: 15,  suffix: '+',  label: "Années d'expertise",   decimal: 0 },
  { target: 850, suffix: '+',  label: 'Transactions réalisées', decimal: 0 },
  { target: 4.9, suffix: '★', label: 'Note Google',            decimal: 1 },
  { target: 97,  suffix: '%',  label: 'Clients satisfaits',    decimal: 0 },
]

export default function TrustBar() {
  const numRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    let ctx: import('gsap').Context | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        numRefs.current.forEach((el, i) => {
          if (!el) return
          const { target, decimal } = stats[i]   // suffix intentionally omitted
          const obj = { val: 0 }
          ScrollTrigger.create({
            trigger: el,
            start: 'top 88%',
            onEnter: () => gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = decimal
                  ? obj.val.toFixed(decimal)
                  : String(Math.round(obj.val))
              },
            }),
          })
        })
      })
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return (
    <div id="trust">
      <div className="trust-grid">
        {stats.map((s, i) => (
          <div className="trust-item" key={i}>
            <div className="trust-num">
              {/* number span — updated by GSAP, never contains suffix */}
              <span ref={el => { numRefs.current[i] = el }}>0</span>
              {/* suffix span — static, star gets yellow */}
              <span style={s.suffix === '★' ? { color: '#F59E0B' } : undefined}>
                {s.suffix}
              </span>
            </div>
            <div className="trust-lbl">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
