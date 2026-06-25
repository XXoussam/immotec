'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const items = [
  {
    num:   '01',
    title: 'Expertise locale exclusive',
    body:  'Spécialistes des 7e, 15e et 16e arrondissements — nous connaissons chaque rue, chaque immeuble, chaque micro-marché.',
  },
  {
    num:   '02',
    title: 'Réseau off-market privilégié',
    body:  'Accès à des biens exclusifs non publiés, issus de notre réseau de propriétaires fidèles et de notaires partenaires.',
  },
  {
    num:   '03',
    title: 'Estimation précise & gratuite',
    body:  'Valorisation fondée sur les transactions récentes, fournie par un expert dédié — sans engagement, sans délai.',
  },
  {
    num:   '04',
    title: 'Accompagnement de A à Z',
    body:  'De la première visite à la remise des clés, un seul interlocuteur, une seule responsabilité, zéro mauvaise surprise.',
  },
]

export default function Avantages() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: import('gsap').Context | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        sectionRef.current?.querySelectorAll<HTMLElement>('.rl').forEach(el => {
          gsap.fromTo(el, { opacity: 0, x: -44 }, { opacity: 1, x: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } })
        })
        sectionRef.current?.querySelectorAll<HTMLElement>('.rr').forEach(el => {
          gsap.fromTo(el, { opacity: 0, x: 44 }, { opacity: 1, x: 0, duration: .85, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 87%' } })
        })
        sectionRef.current?.querySelectorAll<HTMLElement>('.av-item').forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, x: -28 }, { opacity: 1, x: 0, duration: .7, ease: 'power3.out', delay: i * 0.07, scrollTrigger: { trigger: el, start: 'top 88%' } })
        })
      }, sectionRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return (
    <section id="avantages" className="section" ref={sectionRef}>
      <div className="avantages-wrap">
        <div>
          <div className="sec-eyebrow rl">
            <div className="sec-eye-line" />
            <span className="sec-eye-text">Pourquoi nous choisir</span>
          </div>
          <h2 className="sec-title rl">Les avantages <em>immotec</em></h2>

          <div className="av-list" style={{ marginTop: '2.5rem' }}>
            {items.map(item => (
              <div className="av-item" key={item.num}>
                <div className="av-num">{item.num}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="av-visual rr">
          <div className="av-img">
            <Image
              src="/images/salon.png"
              alt="Appartement parisien — Immotec"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </div>
          <div className="av-badge">
            <strong>15+</strong>
            <span>ans de présence</span>
          </div>
        </div>
      </div>
    </section>
  )
}
