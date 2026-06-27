'use client'

import Image from 'next/image'

const LOGOS = [
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/01/FNAIM-2048x2048.png.webp',    alt: 'FNAIM' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/01/SELOGER-2048x2048.png.webp',  alt: 'SeLoger' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/01/LOGICIMMO-2048x2048.png.webp',alt: 'Logic Immo' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/05/BD_ok.jpg.webp',              alt: 'BonCoin' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/05/Lemonde_logo.jpg.webp',       alt: 'Le Monde' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/05/figaro.jpg.webp',             alt: 'Le Figaro' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/05/Matterport_Site.jpg.webp',    alt: 'Matterport' },
  { src: 'https://agence-immotec.com/wp-content/uploads/2022/05/lux_resi.jpg.webp',           alt: 'Lux Résidentiel' },
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
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
