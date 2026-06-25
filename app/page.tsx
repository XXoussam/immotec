import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Equipe from '@/components/Equipe'
import AvisClients from '@/components/AvisClients'
import Avantages from '@/components/Avantages'
import Contact from '@/components/Contact'
import MapSection from '@/components/MapSection'
import Footer from '@/components/Footer'
import ChatAI from '@/components/ChatAI'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TrustBar />
      <Equipe />
      <AvisClients />
      <Avantages />
      <Contact />
      <MapSection />
      <Footer />
      <ChatAI />
    </main>
  )
}
