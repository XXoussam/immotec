import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import Preloader from '@/components/Preloader'
import Cursor from '@/components/Cursor'
import SmoothScroll from '@/components/SmoothScroll'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { cn } from "@/lib/utils";

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-barlow',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Immotec — Agence Immobilière à Paris 15e',
  description:
    'Spécialistes de l\'immobilier parisien depuis 15 ans. Vente, achat, estimation gratuite — 16 Avenue Emile Zola, 75015 Paris.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn(bebasNeue.variable, inter.variable, barlowCondensed.variable, "font-sans")}>
      <body>
        {/* Animated gradient — fixed behind all content */}
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(249, 244, 241)"
            gradientBackgroundEnd="rgb(243, 237, 232)"
            firstColor="248, 243, 239"
            secondColor="190, 68, 48"
            thirdColor="235, 218, 208"
            fourthColor="218, 200, 188"
            fifthColor="245, 241, 237"
            pointerColor="160, 44, 32"
            size="75%"
            blendingValue="soft-light"
            interactive={false}
            containerClassName="!h-full !w-full"
            className="hidden"
          />
        </div>
        <Preloader />
        <Cursor />
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
