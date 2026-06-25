'use client'

import { useEffect, useRef } from 'react'

export default function Preloader() {
  const rootRef  = useRef<HTMLDivElement>(null)
  const logoRef  = useRef<HTMLDivElement>(null)
  const fillRef  = useRef<HTMLDivElement>(null)
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root  = rootRef.current
    const logo  = logoRef.current
    const fill  = fillRef.current
    const count = countRef.current
    if (!root || !logo || !fill || !count) return

    // Animate logo in
    logo.style.transition = 'opacity .7s ease, transform .7s ease'
    setTimeout(() => {
      logo.style.opacity   = '1'
      logo.style.transform = 'translateY(0)'
    }, 80)

    // Count-up bar
    let pct = 0
    const ticker = setInterval(() => {
      pct += Math.random() * 18
      if (pct > 100) pct = 100
      fill.style.width     = pct + '%'
      count.textContent    = Math.round(pct) + '%'
      if (pct >= 100) clearInterval(ticker)
    }, 80)

    const hide = () => {
      setTimeout(() => {
        root.style.transition = 'opacity .7s ease, transform .75s cubic-bezier(0.76,0,0.24,1)'
        root.style.opacity    = '0'
        root.style.transform  = 'translateY(-100%)'
        setTimeout(() => { root.style.display = 'none' }, 750)
      }, 1800)
    }

    if (document.readyState === 'complete') hide()
    else window.addEventListener('load', hide, { once: true })

    return () => clearInterval(ticker)
  }, [])

  return (
    <div id="preloader" ref={rootRef}>
      <div className="pre-logo" ref={logoRef}>Immotec</div>
      <div className="pre-track">
        <div className="pre-fill" ref={fillRef} />
      </div>
      <div className="pre-count" ref={countRef}>0%</div>
    </div>
  )
}
