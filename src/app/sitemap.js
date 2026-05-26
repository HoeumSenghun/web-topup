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

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...gameUrls,
  ]
}
