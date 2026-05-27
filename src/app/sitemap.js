import { siteConfig } from '@/data/mock'
import { getAllGames } from '@/services/game.service'

export default function sitemap() {
  const games = getAllGames()
  const gameUrls = games.map((game) => ({
    url: `${siteConfig.url}/topup/${game.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const staticPages = ['', '/games', '/topup', '/promo', '/contact'].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.9,
  }))

  return [...staticPages, ...gameUrls]
}
