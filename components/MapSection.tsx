"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerTooltip,
  MapControls,
} from '@/components/ui/mapcn-marker-popup'

type Listing = {
  id: number
  photo: string
  photos: number
  agent: { name: string; photo: string; phone: string }
  status: 'vente' | 'location'
  price: string
  priceShort: string
  beds: number
  baths: number
  surface: number
  address: string
  listedBy: string
  lng: number
  lat: number
}

const listings: Listing[] = [
  {
    id: 1,
    photo: '/images/listing1.jpg',
    photos: 20,
    agent: { name: 'Julien Bensimon', photo: '/images/julien.webp', phone: '01 45 79 32 10' },
    status: 'vente',
    price: '750 000 €',
    priceShort: '750K€',
    beds: 3, baths: 2, surface: 78,
    address: '16 Av. Émile Zola, Paris 15e',
    listedBy: 'Immotec Paris',
    lng: 2.2948, lat: 48.8497,
  },
  {
    id: 2,
    photo: '/images/listing2.jpg',
    photos: 12,
    agent: { name: 'Clémence Garat', photo: '/images/clemence.webp', phone: '01 45 79 32 11' },
    status: 'location',
    price: '2 800 € / mois',
    priceShort: '2800€',
    beds: 2, baths: 1, surface: 55,
    address: '8 Rue de la Croix Nivert, Paris 15e',
    listedBy: 'Immotec Paris',
    lng: 2.2982, lat: 48.8481,
  },
  {
    id: 3,
    photo: '/images/listing3.jpg',
    photos: 17,
    agent: { name: 'Julien Bensimon', photo: '/images/julien.webp', phone: '01 45 79 32 10' },
    status: 'vente',
    price: '1 195 000 €',
    priceShort: '1,2M€',
    beds: 4, baths: 2, surface: 102,
    address: '42 Bd de Grenelle, Paris 15e',
    listedBy: 'Immotec Paris',
    lng: 2.2881, lat: 48.8505,
  },
  {
    id: 4,
    photo: '/images/listing4.jpg',
    photos: 15,
    agent: { name: 'Clémence Garat', photo: '/images/clemence.webp', phone: '01 45 79 32 11' },
    status: 'vente',
    price: '495 000 €',
    priceShort: '495K€',
    beds: 2, baths: 1, surface: 48,
    address: '25 Rue Lecourbe, Paris 15e',
    listedBy: 'Immotec Paris',
    lng: 2.3015, lat: 48.8465,
  },
]

// ── Icons ──────────────────────────────────────────────────────────────────────

function BedIcon({ s = 12 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8"/>
      <path d="M2 14h20"/>
      <path d="M6 14v-4a2 2 0 012-2h8a2 2 0 012 2v4"/>
    </svg>
  )
}

function BathIcon({ s = 12 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 000 2.121L9 8"/>
      <path d="M2 12h20v2a6 6 0 01-6 6H8a6 6 0 01-6-6v-2z"/>
      <path d="M5 12V7a3 3 0 016 0"/>
    </svg>
  )
}

function SqftIcon({ s = 12 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 15.2A3.2 3.2 0 1012 8.8 3.2 3.2 0 0012 15.2zm0 1.8a5 5 0 110-10 5 5 0 010 10zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z"/>
    </svg>
  )
}

function CheckBadge() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#1a73e8">
      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.01 2.2 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function HeartIcon({ s = 13 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  )
}

// ── Map price-pill marker ──────────────────────────────────────────────────────

function PriceMarker({ price, active }: { price: string; active: boolean }) {
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '6px 13px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      whiteSpace: 'nowrap',
      boxShadow: active
        ? '0 4px 20px rgba(139,29,27,.4), 0 2px 6px rgba(0,0,0,.15)'
        : '0 2px 10px rgba(0,0,0,.25)',
      background: active ? '#8B1D1B' : '#111111',
      color: '#ffffff',
      transform: active ? 'scale(1.12)' : 'scale(1)',
      transition: 'all 0.2s ease',
      position: 'relative',
      zIndex: active ? 10 : 1,
      userSelect: 'none',
    }}>
      {/* Small dot under the pill (like Housi's orange dot) */}
      {active && (
        <span style={{
          position: 'absolute',
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#8B1D1B',
          border: '2px solid #fff',
          boxShadow: '0 1px 4px rgba(0,0,0,.2)',
        }} />
      )}
      {price}
    </div>
  )
}

// ── Map hover popup — horizontal layout (matches reference exactly) ────────────

function MapHoverCard({ listing }: { listing: Listing }) {
  const isVente = listing.status === 'vente'
  const statusColor = '#8B1D1B'

  return (
    <div style={{
      display: 'flex',
      width: '340px',
      background: '#ffffff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 16px 48px rgba(0,0,0,.18), 0 4px 12px rgba(0,0,0,.08)',
      border: '1px solid rgba(0,0,0,.06)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Left: property image */}
      <div style={{
        width: '118px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Image
          src={listing.photo}
          alt={listing.address}
          fill
          sizes="118px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Right: details */}
      <div style={{ flex: 1, padding: '13px 14px 13px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Status + heart */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            fontSize: '10.5px', fontWeight: 600, color: statusColor,
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusColor, display: 'inline-block' }} />
            {isVente ? 'À vendre' : 'À louer'}
          </span>
          <div style={{ color: '#aaa', display: 'flex', alignItems: 'center' }}>
            <HeartIcon s={14} />
          </div>
        </div>

        {/* Price */}
        <p style={{ margin: '0 0 7px', fontWeight: 800, fontSize: '19px', color: '#0a0a0a', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          {listing.price}
        </p>

        {/* Specs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#555' }}>
            <BedIcon s={11} />{listing.beds} ch
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#555' }}>
            <BathIcon s={11} />{listing.baths} sdb
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: '#555' }}>
            <SqftIcon s={11} />{listing.surface} m²
          </span>
        </div>

        {/* Address */}
        <p style={{ margin: 0, fontSize: '10.5px', color: '#999', lineHeight: 1.35 }}>
          {listing.address}
        </p>
      </div>
    </div>
  )
}

// ── Left panel listing card — 2-column Housi grid ─────────────────────────────

function ListingCard({
  listing,
  active,
  onHover,
}: {
  listing: Listing
  active: boolean
  onHover: (id: number | null) => void
}) {
  const isVente = listing.status === 'vente'

  return (
    <div
      className={`lc${active ? ' lc-active' : ''}`}
      onMouseEnter={() => onHover(listing.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* ── Image area ── */}
      <div className="lc-img">
        <Image
          src={listing.photo}
          alt={listing.address}
          fill
          sizes="(max-width:768px) 50vw, 340px"
          style={{ objectFit: 'cover' }}
        />

        {/* Photo count badge */}
        <span className="lc-photo-count">
          <CameraIcon />
          {listing.photos}
        </span>

        {/* Agent strip — Housi-style, overlaid at bottom of image */}
        <div className="lc-agent">
          <div className="lc-agent-left">
            <div className="lc-agent-photo">
              <Image
                src={listing.agent.photo}
                alt={listing.agent.name}
                width={28}
                height={28}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
            <div className="lc-agent-info">
              <span className="lc-agent-name">
                {listing.agent.name.split(' ')[0]}
                <CheckBadge />
              </span>
              <span className="lc-agent-phone">
                <PhoneIcon />
                {listing.agent.phone}
              </span>
            </div>
          </div>
          <div className="lc-agent-actions">
            <button className="lc-action-btn" aria-label="Map">
              <MapPinIcon />
            </button>
            <button className="lc-action-btn" aria-label="Save">
              <HeartIcon />
            </button>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="lc-body">
        <span className={`lc-status ${listing.status}`}>
          <span className="lc-dot" />
          {isVente ? 'À vendre' : 'À louer'}
        </span>

        <p className="lc-price">{listing.price}</p>

        <div className="lc-specs">
          <span className="lc-spec"><BedIcon />{listing.beds} ch</span>
          <span className="lc-spec"><BathIcon />{listing.baths} sdb</span>
          <span className="lc-spec"><SqftIcon />{listing.surface} m²</span>
        </div>

        <p className="lc-address">{listing.address}</p>
        <p className="lc-listed">Proposé par {listing.listedBy}</p>
      </div>
    </div>
  )
}

// ── Filter tabs (Rent / Buy / Sell like Housi) ─────────────────────────────────

type FilterTab = 'acheter' | 'louer' | 'vendre'

function FilterBar({ active, onChange }: { active: FilterTab; onChange: (t: FilterTab) => void }) {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: 'louer',   label: 'Louer'   },
    { key: 'acheter', label: 'Acheter' },
    { key: 'vendre',  label: 'Vendre'  },
  ]
  return (
    <div className="ls-filter-bar">
      <div className="ls-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`ls-tab${active === t.key ? ' ls-tab-active' : ''}`}
            onClick={() => onChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="ls-search">
        <SearchIcon />
        <span>Paris 15e</span>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function MapSection() {
  const [activeId, setActiveId]   = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<FilterTab>('acheter')
  const [ctrlHeld, setCtrlHeld]   = useState(false)
  const mapRef = useRef<import('maplibre-gl').Map | null>(null)

  // Map is initialized with drag/scroll enabled (default). Once the instance is
  // available, disable both handlers. This lets MapLibre fully set up its
  // internal listeners first, so enable() works correctly later.
  useEffect(() => {
    let rafId: number
    const waitForMap = () => {
      const map = mapRef.current
      if (!map) { rafId = requestAnimationFrame(waitForMap); return }
      map.dragPan.disable()
      map.scrollZoom.disable()
    }
    rafId = requestAnimationFrame(waitForMap)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Control' && e.key !== 'Meta') return
      setCtrlHeld(true)
      const map = mapRef.current
      if (map) { map.dragPan.enable(); map.scrollZoom.enable() }
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key !== 'Control' && e.key !== 'Meta') return
      setCtrlHeld(false)
      const map = mapRef.current
      if (map) { map.dragPan.disable(); map.scrollZoom.disable() }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  return (
    <section id="listings">
      <div className="listings-wrap">

        {/* ── Left panel ── */}
        <div className="listings-panel">
          {/* Header */}
          <div className="listings-header">
            <div className="sec-eyebrow" style={{ marginBottom: '.6rem' }}>
              <div className="sec-eye-line" />
              <span className="sec-eye-text">Exclusivités</span>
            </div>
            <h2 className="listings-title">Biens disponibles</h2>
            <p className="listings-sub">{listings.length} biens · Paris 15e</p>
            <FilterBar active={activeTab} onChange={setActiveTab} />
          </div>

          {/* 2-column card grid */}
          <div className="listings-grid">
            {listings.map(l => (
              <ListingCard
                key={l.id}
                listing={l}
                active={activeId === l.id}
                onHover={setActiveId}
              />
            ))}
          </div>
        </div>

        {/* ── Right panel: MapLibre in a card ── */}
        <div className="listings-map">
          <div className="listings-map-card">
          <Map
            ref={mapRef as React.Ref<import('maplibre-gl').Map>}
            center={[2.2945, 48.8497] as [number, number]}
            zoom={14}
            theme="light"
            dragRotate={false}
            touchPitch={false}
          >
            {listings.map(l => (
              <MapMarker
                key={l.id}
                longitude={l.lng}
                latitude={l.lat}
                anchor="bottom"
                onMouseEnter={() => setActiveId(l.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <MarkerContent>
                  <PriceMarker price={l.priceShort} active={activeId === l.id} />
                </MarkerContent>

                <MarkerTooltip
                  offset={[0, -12] as unknown as number}
                  className="map-tooltip-card"
                >
                  <MapHoverCard listing={l} />
                </MarkerTooltip>
              </MapMarker>
            ))}

            <MapControls showZoom position="bottom-right" />
          </Map>

          {/* Blocking overlay — pointer-events:auto blocks map until Ctrl is held */}
          <div
            className="map-ctrl-overlay"
            style={{ pointerEvents: ctrlHeld ? 'none' : 'auto', opacity: ctrlHeld ? 0 : 1 }}
          >
            <span className="map-ctrl-hint">
              Maintenez <kbd>Ctrl</kbd> pour interagir avec la carte
            </span>
          </div>

          </div>
        </div>

      </div>
    </section>
  )
}
