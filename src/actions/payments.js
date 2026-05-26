'use server'

import { cache } from 'react'
import { getAllPaymentMethods } from '@/services/payment.service'

export const getPayments = cache(async function getPayments() {
  return getAllPaymentMethods()
})
