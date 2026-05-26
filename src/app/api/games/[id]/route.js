import { getGameById } from '@/services/game.service'

export async function GET(_request, { params }) {
  const { id } = await params
  const game = getGameById(id)
  if (!game) {
    return Response.json({ error: 'Game not found' }, { status: 404 })
  }
  return Response.json(game)
}
