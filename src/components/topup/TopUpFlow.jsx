'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import {
  Check,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  ArrowRight,
  Package,
  UserCircle2,
  Download,
} from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t } from '@/lib/i18n'
import { verifyPlayer } from '@/actions/player'
import { submitOrder } from '@/actions/orders'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import GameIcon from '@/components/icons/GameIcon'
import PaymentIcon from '@/components/icons/PaymentIcon'
import { getGameAccountConfig, needsServerId } from '@/data/game-accounts'
import AccountFields from '@/components/topup/AccountFields'
import { downloadReceipt } from '@/lib/download-receipt'

const STEPS = ['account', 'package', 'payment', 'receipt']

function StepIndicator({ current, locale }) {
  return (
    <ol className="mb-8 flex flex-wrap gap-2 sm:justify-between sm:gap-0">
      {STEPS.map((step, i) => {
        const isActive = current === i
        const isDone = current > i
        return (
          <li
            key={step}
            className={`flex items-center gap-2 rounded-lg px-2 py-1 text-xs sm:flex-1 sm:flex-col sm:px-0 sm:text-center sm:text-sm ${
              isActive ? 'font-semibold text-brand' : isDone ? 'text-accent' : 'text-text-muted'
            }`}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isActive
                  ? 'bg-brand text-white'
                  : isDone
                    ? 'bg-accent/20 text-accent'
                    : 'border border-border bg-surface text-text-muted'
              }`}
            >
              {isDone ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
            </span>
            <span className="hidden sm:inline">{t(locale, `form.step.${step}`)}</span>
          </li>
        )
      })}
    </ol>
  )
}

export default function TopUpFlow({ game, paymentMethods }) {
  const { locale } = useApp()
  const accountConfig = getGameAccountConfig(game.id)
  const requiresServer = needsServerId(game.id)
  const i18nPrefix = accountConfig.i18nPrefix

  const [step, setStep] = useState(0)
  const [serverId, setServerId] = useState('')
  const [playerId, setPlayerId] = useState('')
  const [account, setAccount] = useState(null)
  const [idStatus, setIdStatus] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [order, setOrder] = useState(null)
  const [verifyPending, startVerify] = useTransition()
  const [orderPending, startOrder] = useTransition()

  function handleVerify() {
    setIdStatus(null)
    startVerify(async () => {
      const result = await verifyPlayer({
        gameId: game.id,
        serverId,
        playerId,
      })
      if (result.valid) {
        setAccount(result)
        setIdStatus('valid')
      } else {
        setAccount(null)
        setIdStatus('invalid')
      }
    })
  }

  function handleSubmitPayment() {
    startOrder(async () => {
      const data = await submitOrder({
        game: game.name,
        playerId: account.playerId,
        serverId: account.serverId,
        serverName: account.serverName,
        package: selectedPackage,
        paymentId: paymentMethod,
      })
      setOrder(data)
      setStep(3)
    })
  }

  function resetFlow() {
    setStep(0)
    setServerId('')
    setPlayerId('')
    setAccount(null)
    setIdStatus(null)
    setSelectedPackage(null)
    setPaymentMethod(null)
    setOrder(null)
  }

  function canNext() {
    if (step === 0) return idStatus === 'valid' && account
    if (step === 1) return !!selectedPackage
    if (step === 2) return !!paymentMethod
    return false
  }

  function canVerify() {
    if (!playerId.trim()) return false
    if (requiresServer && !serverId.trim()) return false
    return true
  }

  function accountLabel(field) {
    return t(locale, `form.account.${i18nPrefix}.${field}`)
  }

  function handleDownloadReceipt() {
    if (!order) return
    downloadReceipt({
      order: {
        ...order,
        serverLabel: requiresServer ? accountLabel('serverId') : t(locale, 'receipt.server'),
        serverDisplay: requiresServer ? order.serverId : order.serverName,
      },
      locale,
      labels: {
        title: t(locale, 'receipt.title'),
        orderId: t(locale, 'receipt.orderId'),
        game: t(locale, 'receipt.game'),
        playerId: accountLabel('playerId'),
        server: t(locale, 'receipt.server'),
        package: t(locale, 'receipt.package'),
        amount: t(locale, 'receipt.amount'),
        method: t(locale, 'receipt.method'),
        status: t(locale, 'receipt.status'),
        paid: t(locale, 'receipt.status.paid'),
      },
    })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { label: t(locale, 'nav.topup'), href: '/topup' },
          { label: game.name, href: `/topup/${game.id}` },
        ]}
      />

      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text sm:text-3xl">
            {t(locale, 'section.topup')}
          </h1>
          <p className="mt-1 text-text-muted">{t(locale, 'section.topup.sub')}</p>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${game.color}22`, color: game.color }}
          >
            <GameIcon gameId={game.id} className="h-7 w-7" />
          </span>
          <div>
            <p className="font-semibold text-text">{game.name}</p>
            <p className="text-xs capitalize text-text-muted">{game.category}</p>
          </div>
        </div>
      </header>

      <div
        className="rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
        style={{ boxShadow: 'var(--card-shadow)' }}
      >
        <StepIndicator current={step} locale={locale} />

        {step === 0 && (
          <div className="animate-fade-in mx-auto max-w-lg">
            <p className="mb-4 flex items-center gap-2 text-sm text-text-muted">
              <UserCircle2 className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              {t(locale, `form.account.${i18nPrefix}.hint`)}
            </p>

            <AccountFields
              game={game}
              locale={locale}
              playerId={playerId}
              serverId={serverId}
              onPlayerIdChange={(value) => {
                setPlayerId(value)
                setIdStatus(null)
                setAccount(null)
              }}
              onServerIdChange={(value) => {
                setServerId(value)
                setIdStatus(null)
                setAccount(null)
              }}
            />

            <button
              type="button"
              onClick={handleVerify}
              disabled={verifyPending || !canVerify()}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-light disabled:opacity-50"
            >
              {verifyPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  {t(locale, 'form.checking')}
                </>
              ) : (
                t(locale, 'form.checkId')
              )}
            </button>

            {idStatus === 'valid' && account && (
              <div
                className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-sm"
                role="status"
              >
                <p className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                  <CheckCircle2 className="h-4 w-4" aria-hidden />
                  {t(locale, 'form.idValid')}
                </p>
                <p className="mt-2 text-text-muted">
                  {accountLabel('playerId')}:{' '}
                  <span className="font-semibold text-text">{account.playerId}</span>
                </p>
                {(requiresServer || account.serverName) && account.serverId && (
                  <p className="text-text-muted">
                    {requiresServer
                      ? accountLabel('serverId')
                      : t(locale, 'receipt.server')}
                    :{' '}
                    <span className="font-semibold text-text">
                      {requiresServer ? account.serverId : account.serverName}
                    </span>
                  </p>
                )}
                <p className="text-text-muted">
                  {t(locale, 'receipt.nickname')}:{' '}
                  <span className="font-semibold text-text">{account.nickname}</span>
                </p>
              </div>
            )}
            {idStatus === 'invalid' && (
              <p className="mt-3 text-sm text-red-500" role="alert">
                {t(locale, 'form.idInvalid')}
              </p>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in">
            <p className="mb-4 flex items-center gap-2 text-sm font-medium text-text">
              <Package className="h-4 w-4 text-brand" aria-hidden />
              {t(locale, 'form.selectPackage')}
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {game.packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  className={`rounded-xl border p-4 text-left transition hover:border-brand/50 ${
                    selectedPackage?.id === pkg.id
                      ? 'border-brand bg-brand/10'
                      : 'border-border bg-surface'
                  }`}
                >
                  <p className="text-lg font-bold text-text">
                    {pkg.diamonds.toLocaleString()}
                    {pkg.bonus > 0 && (
                      <span className="ml-2 text-sm font-normal text-accent">
                        +{pkg.bonus} {t(locale, 'form.bonus')}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 font-semibold text-brand">
                    ${pkg.price.toFixed(2)} {pkg.currency}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <p className="mb-4 text-sm font-medium text-text">
              {t(locale, 'form.selectPayment')}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center rounded-xl border p-6 transition hover:border-brand/50 ${
                    paymentMethod === method.id
                      ? 'border-brand bg-brand/10'
                      : 'border-border bg-surface'
                  }`}
                >
                  <PaymentIcon methodId={method.id} className="h-10 w-10 text-brand" />
                  <span className="mt-2 font-semibold text-text">{method.name}</span>
                  <span className="mt-1 text-center text-xs text-text-muted">
                    {t(locale, method.descriptionKey)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && order && (
          <div className="animate-fade-in mx-auto max-w-md text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle2 className="h-10 w-10 text-green-500" aria-hidden />
            </div>
            <h2 className="text-xl font-bold text-text">{t(locale, 'receipt.title')}</h2>
            <dl className="mt-6 space-y-3 rounded-xl border border-border bg-surface p-6 text-left text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{t(locale, 'receipt.orderId')}</dt>
                <dd className="font-mono font-semibold text-text">{order.id}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{t(locale, 'receipt.game')}</dt>
                <dd className="font-semibold text-text">{order.game}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{accountLabel('playerId')}</dt>
                <dd className="font-semibold text-text">{order.playerId}</dd>
              </div>
              {(requiresServer || order.serverName) && order.serverId && (
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">
                    {requiresServer
                      ? accountLabel('serverId')
                      : t(locale, 'receipt.server')}
                  </dt>
                  <dd className="font-semibold text-text">
                    {requiresServer ? order.serverId : order.serverName}
                  </dd>
                </div>
              )}
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{t(locale, 'receipt.package')}</dt>
                <dd className="font-semibold text-text">
                  {order.package.diamonds} (+{order.package.bonus || 0})
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{t(locale, 'receipt.amount')}</dt>
                <dd className="font-semibold text-brand">
                  ${order.package.price.toFixed(2)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">{t(locale, 'receipt.method')}</dt>
                <dd className="font-semibold text-text">{order.payment?.name}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-border pt-3">
                <dt className="text-text-muted">{t(locale, 'receipt.status')}</dt>
                <dd className="font-semibold text-green-500">
                  {t(locale, 'receipt.status.paid')}
                </dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand bg-brand/10 py-3 text-sm font-bold text-brand transition hover:bg-brand/20"
              >
                <Download className="h-4 w-4" aria-hidden />
                {t(locale, 'receipt.download')}
              </button>
              <button
                type="button"
                onClick={resetFlow}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-light"
              >
                {t(locale, 'receipt.newOrder')}
              </button>
            </div>
          </div>
        )}

        {step < 3 && (
          <div className="mt-8 flex gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-text transition hover:bg-surface"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t(locale, 'form.back')}
              </button>
            ) : (
              <Link
                href="/topup"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold text-text transition hover:bg-surface"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {t(locale, 'form.back')}
              </Link>
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-light disabled:opacity-50"
              >
                {t(locale, 'form.next')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitPayment}
                disabled={!canNext() || orderPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-bold text-white transition hover:bg-brand-light disabled:opacity-50"
              >
                {orderPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    {t(locale, 'form.processing')}
                  </>
                ) : (
                  t(locale, 'form.submit')
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
