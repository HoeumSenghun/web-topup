import { paymentMethods } from '@/data/mock'

export function getAllPaymentMethods() {
  return paymentMethods
}

export function getPaymentById(id) {
  return paymentMethods.find((p) => p.id === id) ?? null
}
