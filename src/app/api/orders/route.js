import { createOrder } from '@/services/order.service'

export async function POST(request) {
  const body = await request.json()
  const order = createOrder({
    game: body.game,
    playerId: body.playerId,
    serverId: body.serverId,
    serverName: body.serverName,
    package: body.package,
    paymentId: body.payment?.id ?? body.paymentId,
  })
  return Response.json(order)
}
