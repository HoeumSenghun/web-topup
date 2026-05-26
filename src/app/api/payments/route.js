import { getAllPaymentMethods } from '@/services/payment.service'

export async function GET() {
  return Response.json(getAllPaymentMethods())
}
