'use client'

import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const TreeSeed = lazy(() => import('@/components/three/TreeSeed'))

// USD amounts for PayPal
const PAYPAL_AMOUNTS = [5, 10, 25, 50, 100]
// MNT amounts for QPay
const QPAY_AMOUNTS = [10000, 20000, 50000, 100000, 200000]
const MNT_PER_TREE = 17500

type Method = 'paypal' | 'qpay'
type QPayStep = 'idle' | 'loading' | 'qr' | 'checking' | 'paid'

interface QRData { invoice_id: string; qr_image: string; urls: { name: string; link: string; logo: string }[] }

interface DonationModalProps { open: boolean; onClose: () => void }

export default function DonationModal({ open, onClose }: DonationModalProps) {
  const { t, locale } = useLanguage()
  const isMn = locale === 'mn'

  const [method, setMethod]           = useState<Method>('paypal')
  const [ppAmount, setPpAmount]       = useState(10)
  const [qpAmount, setQpAmount]       = useState(20000)
  const [treeCount, setTreeCount]     = useState(8247)
  const [growing, setGrowing]         = useState(false)
  const [ppDone, setPpDone]           = useState(false)
  const [qpStep, setQpStep]           = useState<QPayStep>('idle')
  const [qrData, setQrData]           = useState<QRData | null>(null)
  const [qpError, setQpError]         = useState('')
  const pollRef                       = useRef<ReturnType<typeof setInterval> | null>(null)
  const qpExpireRef                   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ppTrees = Math.floor(ppAmount / 5)
  const qpTrees = Math.max(1, Math.floor(qpAmount / MNT_PER_TREE))

  // Reset on close
  useEffect(() => {
    if (!open) {
      clearInterval(pollRef.current ?? undefined)
      clearTimeout(qpExpireRef.current ?? undefined)
      setTimeout(() => {
        setMethod('paypal'); setPpAmount(10); setQpAmount(20000)
        setPpDone(false); setGrowing(false)
        setQpStep('idle'); setQrData(null); setQpError('')
      }, 300)
    }
  }, [open])

  // PayPal — open hosted donate button in new tab
  function handlePayPal() {
    const buttonId = process.env.NEXT_PUBLIC_PAYPAL_BUTTON_ID ?? 'W4TH5XGD5TVNL'
    window.open(`https://www.paypal.com/donate/?hosted_button_id=${buttonId}`, '_blank', 'noopener,noreferrer')
    setPpDone(true)
    setGrowing(true)
    setTimeout(() => { setTreeCount(c => c + ppTrees) }, 1200)
  }

  // QPay — create invoice, show QR
  async function handleQPay() {
    setQpStep('loading')
    setQpError('')
    try {
      const res = await fetch('/api/qpay/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: qpAmount }),
      })
      const data = await res.json() as QRData & { error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Failed')
      setQrData(data)
      setQpStep('qr')
      startPolling(data.invoice_id)
    } catch (err) {
      setQpError(err instanceof Error ? err.message : 'Could not generate QR code.')
      setQpStep('idle')
    }
  }

  function startPolling(invoiceId: string) {
    // Expire QR after 5 minutes
    qpExpireRef.current = setTimeout(() => {
      clearInterval(pollRef.current ?? undefined)
      setQpStep('idle')
      setQrData(null)
      setQpError(isMn ? 'QR кодны хугацаа дууссан. Дахин оролдоно уу.' : 'QR code expired. Please try again.')
    }, 5 * 60 * 1000)

    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/qpay/check/${invoiceId}`)
        const data = await res.json() as { paid: boolean }
        if (data.paid) {
          clearInterval(pollRef.current ?? undefined)
          clearTimeout(qpExpireRef.current ?? undefined)
          setQpStep('paid')
          setGrowing(true)
          setTimeout(() => { setTreeCount(c => c + qpTrees) }, 1200)
        }
      } catch { /* keep polling */ }
    }, 3000)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="relative z-10 w-full max-w-lg bg-slate rounded-3xl overflow-hidden border border-vermilion/20 shadow-2xl shadow-vermilion/10"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white text-xl z-10">✕</button>

            {/* 3D Tree */}
            <div className="h-44 bg-gradient-to-b from-obsidian to-slate relative">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-vermilion/40 text-sm">Loading…</div>}>
                <TreeSeed growing={growing} treeCount={treeCount} />
              </Suspense>
              <div className="absolute bottom-3 right-4 text-right">
                <p className="text-white/40 text-xs">{t('donate.impact')}</p>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-xl font-black text-white mb-0.5">{t('donate.title')}</h2>
                <p className="text-white/45 text-sm">{t('donate.subtitle')}</p>
              </div>

              {/* Success states */}
              {(ppDone || qpStep === 'paid') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4 space-y-3"
                >
                  <div className="text-4xl">🌳</div>
                  <p className="text-green-400 font-black text-lg">
                    {ppDone
                      ? (isMn ? `PayPal цонх нээгдлээ` : 'PayPal window opened')
                      : (isMn ? `Төлбөр амжилттай!` : 'Payment confirmed!')}
                  </p>
                  <p className="text-white/50 text-sm">
                    {isMn ? 'Цөлийг сэргээхэд тусалсанд баярлалаа.' : 'Thank you for helping revive the desert.'}
                  </p>
                  {ppDone && (
                    <p className="text-white/35 text-xs">
                      {isMn ? 'PayPal-д хандивыг дуусгана уу.' : 'Complete your donation in the PayPal tab.'}
                    </p>
                  )}
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full border border-vermilion/40 text-vermilion text-sm font-medium hover:bg-vermilion/10 transition-colors"
                  >
                    {isMn ? 'Үргэлжлүүлэх' : 'Continue Exploring'}
                  </button>
                </motion.div>
              )}

              {!ppDone && qpStep !== 'paid' && (
                <>
                  {/* Payment method tabs */}
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                    {(['paypal', 'qpay'] as Method[]).map(m => (
                      <button
                        key={m}
                        onClick={() => { setMethod(m); setQpStep('idle'); setQrData(null); setQpError('') }}
                        className={`flex-1 py-2 rounded-lg text-[11px] font-black tracking-widest uppercase transition-all duration-200 ${
                          method === m ? 'text-white' : 'text-white/35 hover:text-white/60'
                        }`}
                        style={method === m ? { background: '#E03D1E' } : undefined}
                      >
                        {m === 'paypal' ? '💳 PayPal' : '📱 QPay'}
                      </button>
                    ))}
                  </div>

                  {/* PayPal */}
                  {method === 'paypal' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {PAYPAL_AMOUNTS.map(a => (
                          <button
                            key={a}
                            onClick={() => setPpAmount(a)}
                            style={ppAmount === a ? { background: '#E03D1E' } : undefined}
                            className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all duration-200 ${
                              ppAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/70 border-white/10 hover:border-vermilion/40'
                            }`}
                          >
                            ${a}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-green-900/20 border border-green-800/30">
                        <span className="text-xl">🌱</span>
                        <p className="text-green-400 text-sm">
                          ${ppAmount} = <strong>{ppTrees} tree{ppTrees !== 1 ? 's' : ''}</strong>
                          {isMn ? ' тарина' : ' planted in degraded zones'}
                        </p>
                      </div>
                      {/* PayPal QR code */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-white/35 text-[10px] uppercase tracking-widest">
                      {isMn ? 'QR уншуулах эсвэл товч дарах' : 'Scan QR or click below'}
                    </p>
                    <div className="bg-white rounded-xl p-2.5">
                      <img src="/paypal-qr.png" alt="PayPal Donate QR" className="w-36 h-36" />
                    </div>
                  </div>

                  <motion.button
                        onClick={handlePayPal}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 rounded-xl font-black text-base text-white"
                        style={{ background: '#003087' }}
                      >
                        {isMn ? 'PayPal хуудас нээх' : 'Open PayPal Donate Page'}
                      </motion.button>
                    </div>
                  )}

                  {/* QPay */}
                  {method === 'qpay' && (
                    <div className="space-y-4">
                      {qpStep === 'idle' && (
                        <>
                          <div className="flex flex-wrap gap-2">
                            {QPAY_AMOUNTS.map(a => (
                              <button
                                key={a}
                                onClick={() => setQpAmount(a)}
                                style={qpAmount === a ? { background: '#E03D1E' } : undefined}
                                className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all duration-200 ${
                                  qpAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/70 border-white/10 hover:border-vermilion/40'
                                }`}
                              >
                                ₮{a.toLocaleString()}
                              </button>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 p-3 rounded-xl bg-green-900/20 border border-green-800/30">
                            <span className="text-xl">🌱</span>
                            <p className="text-green-400 text-sm">
                              ₮{qpAmount.toLocaleString()} = <strong>{qpTrees} мод</strong>
                              {isMn ? ' тарина' : ' planted in degraded zones'}
                            </p>
                          </div>
                          {qpError && <p className="text-red-400 text-xs text-center">{qpError}</p>}
                          <motion.button
                            onClick={handleQPay}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-3.5 rounded-xl font-black text-base text-white"
                            style={{ background: '#E03D1E' }}
                          >
                            {isMn ? `QPay-аар төлөх — ₮${qpAmount.toLocaleString()}` : `Pay with QPay — ₮${qpAmount.toLocaleString()}`}
                          </motion.button>
                        </>
                      )}

                      {qpStep === 'loading' && (
                        <div className="flex flex-col items-center py-8 gap-3">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-8 h-8 rounded-full border-2 border-vermilion/30 border-t-vermilion"
                          />
                          <p className="text-white/50 text-sm">{isMn ? 'QR код үүсгэж байна…' : 'Generating QR code…'}</p>
                        </div>
                      )}

                      {qpStep === 'qr' && qrData && (
                        <div className="flex flex-col items-center gap-4">
                          <p className="text-white/60 text-xs text-center">
                            {isMn ? 'Банкны аппаараа QR кодыг уншуулна уу' : 'Scan with your banking app to complete payment'}
                          </p>
                          <div className="bg-white rounded-2xl p-3">
                            <img
                              src={`data:image/png;base64,${qrData.qr_image}`}
                              alt="QPay QR Code"
                              className="w-48 h-48"
                            />
                          </div>
                          {/* Deep links for bank apps */}
                          {qrData.urls.length > 0 && (
                            <div className="w-full space-y-2">
                              <p className="text-white/35 text-[10px] text-center uppercase tracking-widest">
                                {isMn ? 'Аппаараа нээх' : 'Open in banking app'}
                              </p>
                              <div className="flex flex-wrap gap-2 justify-center">
                                {qrData.urls.slice(0, 6).map((u, i) => (
                                  <a
                                    key={i}
                                    href={u.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 hover:border-vermilion/40 transition-colors"
                                  >
                                    {u.logo && <img src={u.logo} alt={u.name} className="w-4 h-4 rounded-sm" />}
                                    <span className="text-white/60 text-[10px] font-semibold">{u.name}</span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-white/35 text-xs">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                              className="w-3 h-3 rounded-full border border-white/30 border-t-white/70"
                            />
                            {isMn ? 'Төлбөрийг хүлээж байна…' : 'Waiting for payment…'}
                          </div>
                          <button
                            onClick={() => { setQpStep('idle'); setQrData(null); clearInterval(pollRef.current ?? undefined) }}
                            className="text-white/30 text-xs hover:text-white/60 transition-colors"
                          >
                            {isMn ? 'Цуцлах' : 'Cancel'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
