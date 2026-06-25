'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const agents = [
  {
    image:    '/images/julien.webp',
    imgPos:   '38% top',
    badge:    'Fondateur',
    name:     'Julien Mercier',
    role:     'Directeur & NÃ©gociateur Senior',
    phone:    '+33 (0)1 45 79 00 11',
    email:    'j.mercier@immotec.com',
  },
  {
    image:    '/images/estelle.jpg',
    imgPos:   '42% top',
    badge:    '15e Â· 7e',
    name:     'Estelle Chauvet',
    role:     'NÃ©gociatrice â€” 15e & 7e arrondissement',
    phone:    '+33 (0)1 45 79 00 12',
    email:    'e.chauvet@immotec.com',
  },
  {
    image:    '/images/clemence.webp',
    imgPos:   '40% top',
    badge:    'Luxe',
    name:     'ClÃ©mence Delorme',
    role:     "Consultante â€” Biens d'exception",
    phone:    '+33 (0)1 45 79 00 13',
    email:    'c.delorme@immotec.com',
  },
]

export default function Equipe() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: { revert\(\): void } | null = null

    const init = async () => {
      const { gsap }          = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const d = { ease: 'power3.out', duration: .85 }
        sectionRef.current?.querySelectorAll<HTMLElement>('.rl').forEach(el =>
          gsap.fromTo(el, { opacity: 0, x: -44 }, { opacity: 1, x: 0, ...d, scrollTrigger: { trigger: el, start: 'top 87%' } }))
        sectionRef.current?.querySelectorAll<HTMLElement>('.rr').forEach(el =>
          gsap.fromTo(el, { opacity: 0, x: 44 }, { opacity: 1, x: 0, ...d, scrollTrigger: { trigger: el, start: 'top 87%' } }))
        sectionRef.current?.querySelectorAll<HTMLElement>('.rv').forEach((el, i) =>
          gsap.fromTo(el, { opacity: 0, y: 44 }, { opacity: 1, y: 0, ...d, delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 87%' } }))
      }, sectionRef)
    }

    init()
    return () => { ctx?.revert() }
  }, [])

  return (
    <section id="equipe" className="section" ref={sectionRef}>
      <div className="equipe-head">
        <div className="rl">
          <div className="sec-eyebrow">
            <div className="sec-eye-line" />
            <span className="sec-eye-text">Notre Ã©quipe</span>
          </div>
          <h2 className="sec-title">Des experts <em>Ã  votre service</em></h2>
        </div>
        <p className="sec-sub rr">
          Chaque conseiller immotec est un spÃ©cialiste du marchÃ© parisien, formÃ© en continu
          et entiÃ¨rement dÃ©diÃ© Ã  votre rÃ©ussite.
        </p>
      </div>

      <div className="equipe-grid">
        {agents.map((agent, i) => (
          <Card
            key={i}
            className="rv agent-card rounded-xl overflow-hidden ring-0 border-0 gap-0 py-0"
          >
            {/* Photo area */}
            <CardContent className="agent-photo p-0 relative">
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-cover"
                style={{ objectPosition: agent.imgPos }}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <Badge
                className="agent-badge absolute top-5 left-5 z-10 rounded-none bg-[var(--red)] text-[var(--offwhite)] border-0 text-[0.6rem] tracking-[0.16em] uppercase h-auto py-0.5 px-2.5"
              >
                {agent.badge}
              </Badge>
            </CardContent>

            {/* Info area */}
            <CardFooter className="agent-info flex-col items-start gap-0 border-t-0 p-6">
              <CardTitle className="agent-name font-normal mb-1 text-2xl">
                {agent.name}
              </CardTitle>
              <CardDescription className="agent-role text-[var(--grey)] text-[0.7rem] tracking-[0.1em] uppercase mb-3.5">
                {agent.role}
              </CardDescription>
              <div className="agent-contact">
                <span>{agent.phone}</span>
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
