'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const curRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFine) return

    const cur  = curRef.current
    const ring = ringRef.current
    if (!cur || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`
    }

    const raf = () => {
      rx += (mx - rx) * 0.11
      ry += (my - ry) * 0.11
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`
      rafId = requestAnimationFrame(raf)
    }

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(raf)

    const hover = (el: Element) => {
      el.addEventListener('mouseenter', () => { cur.classList.add('h'); ring.classList.add('h') })
      el.addEventListener('mouseleave', () => { cur.classList.remove('h'); ring.classList.remove('h') })
    }
    document.querySelectorAll('a, button, .agent-card, .avis-card, .av-item').forEach(hover)

    const footer = document.getElementById('footer')
    if (footer) {
      footer.addEventListener('mouseenter', () => { cur.classList.add('dark-bg'); ring.classList.add('dark-bg') })
      footer.addEventListener('mouseleave', () => { cur.classList.remove('dark-bg'); ring.classList.remove('dark-bg') })
    }

    const mapCard = document.querySelector('.listings-map-card')
    if (mapCard) {
      mapCard.addEventListener('mouseenter', () => {
        cur.style.opacity = '0'
        ring.style.opacity = '0'
      })
      mapCard.addEventListener('mouseleave', () => {
        cur.style.opacity = ''
        ring.style.opacity = ''
      })
    }

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cur"      ref={curRef} />
      <div id="cur-ring" ref={ringRef} />
    </>
  )
}
