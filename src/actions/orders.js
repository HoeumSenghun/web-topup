'use server'

import { createOrder } from '@/services/order.service'

export async function submitOrder(payload) {
  return createOrder(payload)
}
