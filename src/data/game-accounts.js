/**
 * Top-up account requirements per game (Cambodia reseller standard).
 *
 * | Game            | Fields              | Where to find                          |
 * |-----------------|---------------------|----------------------------------------|
 * | Mobile Legends  | User ID + Server ID | Profile → under nickname (Zone ID)     |
 * | Honor of Kings  | User ID + Server ID | Profile → Role ID + Server             |
 * | Free Fire       | Player ID           | Profile → copy Player ID               |
 * | PUBG Mobile     | Character ID        | Profile → Character ID                 |
 * | RoV / AoV       | Open ID             | Profile → Open ID (one number)         |
 * | Genshin Impact  | UID (9 digits)      | Paimon menu → Settings → Account       |
 * | CODM            | Player ID           | Profile → Player ID                    |
 * | Zepeto          | Username            | Profile → @username                    |
 */

export const ACCOUNT_TYPES = {
  USER_SERVER_ID: 'userServerId',
  PLAYER_ID: 'playerId',
  UID: 'uid',
  USERNAME: 'username',
}

/** @typedef {{ type: string, i18nPrefix: string, example?: Record<string, string> }} GameAccountConfig */

/** @type {Record<string, GameAccountConfig>} */
export const gameAccountConfig = {
  mlbb: {
    type: ACCOUNT_TYPES.USER_SERVER_ID,
    i18nPrefix: 'mlbb',
    example: { playerId: '123456789', serverId: '1234' },
  },
  hok: {
    type: ACCOUNT_TYPES.USER_SERVER_ID,
    i18nPrefix: 'hok',
    example: { playerId: '123456789', serverId: '1234' },
  },
  ff: {
    type: ACCOUNT_TYPES.PLAYER_ID,
    i18nPrefix: 'ff',
    example: { playerId: '1234567890' },
  },
  pubg: {
    type: ACCOUNT_TYPES.PLAYER_ID,
    i18nPrefix: 'pubg',
    example: { playerId: '5123456789' },
  },
  rov: {
    type: ACCOUNT_TYPES.PLAYER_ID,
    i18nPrefix: 'rov',
    example: { playerId: '1234567890123' },
  },
  genshin: {
    type: ACCOUNT_TYPES.UID,
    i18nPrefix: 'genshin',
    example: { playerId: '812345678' },
  },
  codm: {
    type: ACCOUNT_TYPES.PLAYER_ID,
    i18nPrefix: 'codm',
    example: { playerId: '123456789012' },
  },
  zepeto: {
    type: ACCOUNT_TYPES.USERNAME,
    i18nPrefix: 'zepeto',
    example: { playerId: 'my_zepeto_name' },
  },
}

export function getGameAccountConfig(gameId) {
  return gameAccountConfig[gameId] ?? {
    type: ACCOUNT_TYPES.PLAYER_ID,
    i18nPrefix: 'default',
    example: { playerId: '123456789' },
  }
}

export function needsServerId(gameId) {
  const cfg = getGameAccountConfig(gameId)
  return cfg.type === ACCOUNT_TYPES.USER_SERVER_ID
}

export function getAccountTypeLabel(type, locale = 'en') {
  const labels = {
    en: {
      [ACCOUNT_TYPES.USER_SERVER_ID]: 'User ID + Server ID',
      [ACCOUNT_TYPES.PLAYER_ID]: 'Player ID',
      [ACCOUNT_TYPES.UID]: 'UID',
      [ACCOUNT_TYPES.USERNAME]: 'Username',
    },
    km: {
      [ACCOUNT_TYPES.USER_SERVER_ID]: 'User ID + Server ID',
      [ACCOUNT_TYPES.PLAYER_ID]: 'Player ID',
      [ACCOUNT_TYPES.UID]: 'UID',
      [ACCOUNT_TYPES.USERNAME]: 'Username',
    },
  }
  return labels[locale]?.[type] ?? labels.en[type]
}
