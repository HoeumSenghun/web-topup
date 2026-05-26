
const PAYMENT_IMAGES = {
  aba: '/payment/ABA_Logo.png',
  acleda: '/payment/ACLEDA_Logo.jpg',
  khqr: '/payment/bakong_khqr.png',
}

export default function PaymentIcon({ methodId, className = 'h-10 w-10' }) {

  const imageSrc = PAYMENT_IMAGES[methodId]
  if (imageSrc) {
    return (
      <img
        src={imageSrc}
        alt=""
        className={`${className} shrink-0 object-contain`}
        aria-hidden
      />
    )
  }

  const Icon = CreditCard
  return <Icon className={className} aria-hidden />
}
