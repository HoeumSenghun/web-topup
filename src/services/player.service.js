import { getGameById } from '@/services/game.service'
import { getGameAccountConfig, ACCOUNT_TYPES } from '@/data/game-accounts'

function verifyUserServerId(playerId, serverId, nicknamePrefix = 'Player') {
  const userId = String(playerId ?? '').trim()
  const zoneId = String(serverId ?? '').trim()

  if (!/^\d+$/.test(userId) || userId.length < 6) {
    return { valid: false, error: 'INVALID_PLAYER_ID' }
  }

  if (!/^\d+$/.test(zoneId) || zoneId.length < 1 || zoneId.length > 5) {
    return { valid: false, error: 'INVALID_SERVER_ID' }
  }

  return {
    valid: true,
    playerId: userId,
    serverId: zoneId,
    serverName: zoneId,
    nickname: `${nicknamePrefix}_${userId.slice(-4)}`,
  }
}

function verifyPlayerIdOnly(playerId, { min = 6, max = 15, numeric = true } = {}) {
  const id = String(playerId ?? '').trim()

  if (numeric) {
    if (!/^\d+$/.test(id) || id.length < min || id.length > max) {
      return { valid: false, error: 'INVALID_PLAYER_ID' }
    }
  } else if (id.length < min || id.length > max) {
    return { valid: false, error: 'INVALID_PLAYER_ID' }
  }

  return {
    valid: true,
    playerId: id,
    serverId: null,
    serverName: null,
    nickname: `Player_${id.slice(-4)}`,
  }
}

function verifyGenshinUid(playerId) {
  const uid = String(playerId ?? '').trim()
  if (!/^\d{9}$/.test(uid)) {
    return { valid: false, error: 'INVALID_UID' }
  }

  const serverDigit = uid[0]
  const serverNames = {
    '1': 'America',
    '2': 'Europe',
    '5': 'Asia',
    '6': 'Asia (TW/HK/MO)',
    '7': 'Europe',
    '8': 'Asia',
    '9': 'Asia (SEA)',
  }

  return {
    valid: true,
    playerId: uid,
    serverId: serverDigit,
    serverName: serverNames[serverDigit] ?? `Server ${serverDigit}`,
    nickname: `Traveler_${uid.slice(-4)}`,
  }
}

function verifyUsername(playerId) {
  const name = String(playerId ?? '').trim()
  if (!/^[a-zA-Z0-9._-]{3,20}$/.test(name)) {
    return { valid: false, error: 'INVALID_USERNAME' }
  }

  return {
    valid: true,
    playerId: name,
    serverId: null,
    serverName: null,
    nickname: name,
  }
}

export function verifyPlayerAccount({ gameId, serverId, playerId }) {
  const game = getGameById(gameId)
  if (!game) {
    return { valid: false, error: 'GAME_NOT_FOUND' }
  }

  const config = getGameAccountConfig(gameId)

  switch (config.type) {
    case ACCOUNT_TYPES.USER_SERVER_ID:
      return verifyUserServerId(playerId, serverId, game.id.toUpperCase())
    case ACCOUNT_TYPES.UID:
      return verifyGenshinUid(playerId)
    case ACCOUNT_TYPES.USERNAME:
      return verifyUsername(playerId)
    case ACCOUNT_TYPES.PLAYER_ID:
    default: {
      const rules = {
        ff: { min: 6, max: 12 },
        pubg: { min: 8, max: 12 },
        rov: { min: 10, max: 15 },
        codm: { min: 8, max: 15 },
      }
      return verifyPlayerIdOnly(playerId, rules[gameId] ?? { min: 6, max: 15 })
    }
  }
}
