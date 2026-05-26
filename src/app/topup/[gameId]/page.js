import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TopUpFlow from '@/components/topup/TopUpFlow'
import { getGame } from '@/actions/games'
import { getPayments } from '@/actions/payments'
import { getGameIds } from '@/services/game.service'
import { siteConfig } from '@/data/mock'

export async function generateStaticParams() {
  return getGameIds().map((gameId) => ({ gameId }))
}

export async function generateMetadata({ params }) {
  const { gameId } = await params
  const game = await getGame(gameId)
  if (!game) return { title: siteConfig.name }

  return {
    title: siteConfig.name,
    description: `Top up ${game.name} diamonds instantly in Cambodia. Pay with ABA, ACLEDA, or KHQR.`,
    alternates: { canonical: `${siteConfig.url}/topup/${game.id}` },
  }
}

export default async function TopUpPage({ params }) {
  const { gameId } = await params
  const [game, paymentMethods] = await Promise.all([
    getGame(gameId),
    getPayments(),
  ])

  if (!game) notFound()

  return (
    <>
      <Navbar />
      <main>
        <TopUpFlow game={game} paymentMethods={paymentMethods} />
      </main>
      <Footer />
    </>
  )
}
