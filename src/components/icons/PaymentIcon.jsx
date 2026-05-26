import { Landmark, CreditCard, QrCode } from 'lucide-react'

const ICON_MAP = {
  aba: Landmark,
  acleda: CreditCard,
  khqr: QrCode,
}

export default function PaymentIcon({ methodId, className = 'h-10 w-10' }) {
  const Icon = ICON_MAP[methodId] ?? CreditCard
  return <Icon className={className} aria-hidden />
}
