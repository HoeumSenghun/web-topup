import { Suspense } from 'react'
import { getJsonLd } from '@/lib/seo'
import HeroCarousel from '@/components/home/HeroCarousel'
import TrendingGames from '@/components/home/TrendingGames'
import GamesGrid from '@/components/home/GamesGrid'

export default function HomePage() {
  const jsonLd = getJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={null}>
        <HeroCarousel />
        <TrendingGames />
        <GamesGrid />
      </Suspense>
    </>
  )
}
