'use server'

import { verifyPlayerAccount } from '@/services/player.service'

export async function verifyPlayer({ gameId, serverId, playerId }) {
  return verifyPlayerAccount({ gameId, serverId, playerId })
}
