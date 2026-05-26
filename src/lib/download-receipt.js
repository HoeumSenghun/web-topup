import { siteConfig } from '@/data/mock'

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function downloadReceipt({ order, labels, locale = 'en' }) {
  const date = new Date(order.createdAt).toLocaleString(
    locale === 'km' ? 'km-KH' : 'en-US',
    { dateStyle: 'medium', timeStyle: 'short' }
  )

  const rows = [
    [labels.orderId, order.id],
    [labels.game, order.game],
    [labels.playerId, order.playerId],
  ]

  if (order.serverId) {
    rows.push([
      order.serverLabel ?? labels.server,
      order.serverDisplay ?? order.serverId,
    ])
  }

  rows.push(
    [labels.package, `${order.package.diamonds} (+${order.package.bonus || 0})`],
    [labels.amount, `$${order.package.price.toFixed(2)}`],
    [labels.method, order.payment?.name ?? '—'],
    [labels.status, labels.paid]
  )

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #e2e8f0;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;text-align:right;font-weight:600;border-bottom:1px solid #e2e8f0;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('')

  const html = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(labels.title)} - ${escapeHtml(order.id)}</title>
  <style>
    body { font-family: Arial, sans-serif; background:#f8fafc; color:#0f172a; margin:0; padding:32px; }
    .card { max-width:480px; margin:0 auto; background:#fff; border-radius:16px; padding:32px; box-shadow:0 10px 30px rgba(15,23,42,.08); }
    h1 { margin:0 0 8px; font-size:24px; color:#6366f1; }
    .meta { color:#64748b; font-size:14px; margin-bottom:24px; }
    table { width:100%; border-collapse:collapse; font-size:14px; }
    .paid { color:#16a34a; font-weight:700; }
    .footer { margin-top:24px; text-align:center; font-size:12px; color:#94a3b8; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(siteConfig.name)}</h1>
    <p class="meta">${escapeHtml(labels.title)} · ${escapeHtml(date)}</p>
    <table>${tableRows}</table>
    <p class="footer">${escapeHtml(siteConfig.tagline)}<br/>${escapeHtml(siteConfig.email)} · ${escapeHtml(siteConfig.phone)}</p>
  </div>
</body>
</html>`

  const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `receipt-${order.id}.html`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
