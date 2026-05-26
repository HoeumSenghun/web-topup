/**
 * Filter games by query (name, id, slug, category).
 * @param {import('@/data/mock').games[number][]} games
 * @param {string} query
 */
export function searchGames(games, query) {
  const q = String(query ?? '').trim().toLowerCase()
  if (!q) return games

  return games.filter((game) => {
    const haystack = [
      game.name,
      game.id,
      game.slug,
      game.category,
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
}

export function hasSearchQuery(query) {
  return String(query ?? '').trim().length > 0
}
