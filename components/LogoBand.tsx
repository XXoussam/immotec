'use client'

import Image from 'next/image'

const LOGOS = [
  { src: '/images/logos/fnaim.webp',      alt: 'FNAIM' },
  { src: '/images/logos/seloger.webp',    alt: 'SeLoger' },
  { src: '/images/logos/logicimmo.webp',  alt: 'Logic Immo' },
  { src: '/images/logos/boncoin.webp',    alt: 'BonCoin' },
  { src: '/images/logos/lemonde.webp',    alt: 'Le Monde' },
  { src: '/images/logos/figaro.webp',     alt: 'Le Figaro' },
  { src: '/images/logos/matterport.webp', alt: 'Matterport' },
  { src: '/images/logos/lux-resi.webp',   alt: 'Lux Résidentiel' },
]

export default function LogoBand() {
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section id="diffusion" className="logo-band">

      <div className="logo-band-head">
        <div className="sec-eyebrow">
          <div className="sec-eye-line" />
          <span className="sec-eye-text">Diffusion multi-portails</span>
        </div>
        <h2 className="logo-band-title">
          Votre annonce sera vue par<br />
          <em>le plus grand nombre d&apos;acquéreurs</em>
        </h2>
      </div>

      <div className="logo-marquee-wrap">
        {/* fade edges */}
        <div className="logo-fade logo-fade--left"  aria-hidden="true" />
        <div className="logo-fade logo-fade--right" aria-hidden="true" />

        <div className="logo-track" aria-hidden="true">
          {doubled.map((logo, i) => (
            <div key={i} className="logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={110}
                height={56}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
