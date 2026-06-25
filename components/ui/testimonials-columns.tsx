'use client'

import React from 'react'
import { motion } from 'motion/react'

export type Review = {
  name: string
  date: string
  text: string
}

const AVATAR_COLORS = [
  '#EA4335', '#4285F4', '#34A853', '#FBBC05',
  '#9C27B0', '#00ACC1', '#FF7043', '#43A047',
  '#E91E63', '#FF5722', '#607D8B', '#795548',
]

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.charAt(0).toUpperCase()
  const color = getAvatarColor(review.name)
  const truncated = review.text.length > 180

  return (
    <div className="bg-white rounded-2xl border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.07)] p-4 mb-3 w-[300px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[0.85rem] font-medium flex-shrink-0"
            style={{ background: color }}
          >
            {initial}
          </div>
          <div>
            <p className="text-[0.82rem] font-semibold text-[#202124] leading-tight">{review.name}</p>
            <p className="text-[0.72rem] text-[#70757a] mt-0.5">{review.date}</p>
          </div>
        </div>
        <GoogleIcon />
      </div>

      {/* Stars + verified checkmark */}
      <div className="flex items-center gap-0.5 mb-2.5">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBC05">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
        <svg className="ml-1" width="14" height="14" viewBox="0 0 24 24" fill="#4285F4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>

      {/* Review text */}
      {review.text && (
        <>
          <p className="text-[0.8rem] text-[#3c4043] leading-relaxed line-clamp-4">
            {review.text}
          </p>
          {truncated && (
            <span className="text-[0.78rem] text-[#1a73e8] mt-1 inline-block cursor-pointer hover:underline">
              Lire la suite
            </span>
          )}
        </>
      )}
    </div>
  )
}

export function TestimonialsColumn({
  reviews,
  duration = 25,
  className,
}: {
  reviews: Review[]
  duration?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{ duration, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
        className="flex flex-col"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </motion.div>
    </div>
  )
}
