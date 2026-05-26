'use server'

import { cache } from 'react'
import { getAllGames, getGameById } from '@/services/game.service'

export const getGames = cache(async function getGames() {
  return getAllGames()
})

export const getGame = cache(async function getGame(gameId) {
  return getGameById(gameId)
})
