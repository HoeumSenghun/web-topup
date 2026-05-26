import { games } from '@/data/mock'

export function getAllGames() {
  return games
}

export function getGameById(gameId) {
  return games.find((g) => g.id === gameId) ?? null
}

export function getGameIds() {
  return games.map((g) => g.id)
}
