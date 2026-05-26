import { getAllGames } from '@/services/game.service'

export async function GET() {
  return Response.json(getAllGames())
}
