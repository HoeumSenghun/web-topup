import { Suspense } from 'react'
import Navbar from '@/components/layout/Navbar'
import ScrollToHash from '@/components/layout/ScrollToHash'
import SearchSync from '@/components/search/SearchSync'
import PromoTicker from '@/components/layout/PromoTicker'
import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingGames from '@/components/home/TrendingGames'
import GamesGrid from '@/components/home/GamesGrid'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <SearchSync />
      </Suspense>
      <ScrollToHash />
      <PromoTicker />
      <main>
        <HeroCarousel />
        <TrendingGames />
        <GamesGrid />
      </main>
      <Footer />
    </>
  )
}
