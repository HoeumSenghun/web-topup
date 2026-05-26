import { verifyPlayerAccount } from '@/services/player.service'

export async function POST(request) {
  const body = await request.json()
  const result = verifyPlayerAccount({
    gameId: body.gameId,
    serverId: body.serverId,
    playerId: body.playerId,
  })
  return Response.json(result)
}
