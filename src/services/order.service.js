import { getPaymentById } from '@/services/payment.service'

export function createOrder(payload) {
  const payment = getPaymentById(payload.paymentId)

  return {
    id: `DS-${Date.now().toString(36).toUpperCase()}`,
    game: payload.game,
    playerId: payload.playerId,
    serverId: payload.serverId,
    serverName: payload.serverName,
    package: payload.package,
    payment,
    createdAt: new Date().toISOString(),
    status: 'paid',
  }
}
