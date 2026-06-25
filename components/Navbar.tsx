'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { href: '#equipe',    label: "L'Équipe" },
  { href: '#avis',      label: 'Avis' },
  { href: '#avantages', label: 'Avantages' },
  { href: '#contact',   label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let lastY = 0
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      const y = window.scrollY
      nav.classList.toggle('scrolled', y > 60)
      nav.classList.toggle('nav-up', y > lastY && y > 220)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav id="nav" ref={navRef}>

        <a href="#" className="logo">
          <Image
            src="/images/logo.webp"
            alt="Immotec Paris"
            width={0} height={0}
            sizes="200px"
            style={{ height: '46px', width: 'auto' }}
            priority
          />
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
          <li>
            <a href="#contact" className="nav-cta">Estimation gratuite</a>
          </li>
        </ul>

        <button
          className="hamburger"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(true)}
        >
          <span /><span /><span />
        </button>

      </nav>

      <div id="nav-overlay" className={open ? 'open' : ''}>
        <button className="overlay-close" aria-label="Fermer" onClick={() => setOpen(false)}>✕</button>
        {NAV_LINKS.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>
    </>
  )
}
