const navLinks = [
  { href: '#equipe',    label: "L'Équipe" },
  { href: '#avis',      label: 'Avis clients' },
  { href: '#avantages', label: 'Nos avantages' },
  { href: '#contact',   label: 'Contact' },
]

const serviceLinks = [
  { label: 'Vente' },
  { label: 'Achat' },
  { label: 'Estimation' },
  { label: 'Investissement' },
]

const legalLinks = [
  { label: 'Mentions légales' },
  { label: 'Politique de confidentialité' },
  { label: 'Carte professionnelle' },
  { label: 'Plan du site' },
]

import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="logo footer-logo">
            <Image src="/images/logo.webp" alt="Immotec Paris" width={0} height={0} sizes="200px" style={{ height: '58px', width: 'auto' }} />
          </a>
          <p className="footer-tag">L&apos;immobilier parisien, autrement.</p>
          <div className="socials">
            <a href="#" className="social-btn" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="social-btn" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="f-col">
          <h5>Navigation</h5>
          <ul className="f-links">
            {navLinks.map(l => (
              <li key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="f-col">
          <h5>Services</h5>
          <ul className="f-links">
            {serviceLinks.map(l => (
              <li key={l.label}><a href="#contact">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div className="f-col">
          <h5>Légal</h5>
          <ul className="f-links">
            {legalLinks.map(l => (
              <li key={l.label}><a href="#">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bot">
        <span>© 2025 Immotec SAS — Tous droits réservés. Carte T : CPI 7501 2024 000 000 000.</span>
        <span>Conçu avec soin à Paris <span className="heart">♥</span></span>
      </div>
    </footer>
  )
}
