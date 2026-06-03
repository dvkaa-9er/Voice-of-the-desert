'use client'

import { useState, useEffect, useRef, lazy, Suspense, Component, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const TreeSeed = lazy(() => import('@/components/three/TreeSeed'))

class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed
      ? <div className="w-full h-full flex items-center justify-center text-white/20 text-2xl">🌵</div>
      : this.props.children
  }
}

const USD_AMOUNTS  = [5, 10, 25, 50, 100]
const QPAY_AMOUNTS = [10000, 20000, 50000, 100000, 200000]
const MNT_AMOUNTS  = [10000, 20000, 50000, 100000]
const MNT_PER_TREE = 17500

type Method   = 'card' | 'paypal' | 'qpay' | 'apps' | 'bank'
type QPayStep = 'idle' | 'loading' | 'qr' | 'paid'
interface QRData { invoice_id: string; qr_image: string; urls: { name: string; link: string; logo: string }[] }
interface Props  { open: boolean; onClose: () => void }

const BANK_ACCOUNTS = [
  {
    bank:    'Худалдаа хөгжлийн банк',
    bankEn:  'Trade and Development Bank',
    iban:    '27000 4000',
    account: '416130346',
    currency:'₮ Төгрөг',
    holder:  'Цөлийн дуу хоолой НҮТББ',
    ref:     'Хандив, Компаний нэр, РД',
    refEn:   'Donation, Company name, Registration No.',
  },
]

const TABS: { id: Method; labelEn: string; labelMn: string; icon: string }[] = [
  { id: 'card',   labelEn: 'Card',     labelMn: 'Карт',      icon: '💳' },
  { id: 'paypal', labelEn: 'PayPal',   labelMn: 'PayPal',    icon: '🅿' },
  { id: 'qpay',   labelEn: 'QPay',     labelMn: 'QPay',      icon: '📱' },
  { id: 'apps',   labelEn: 'MN Apps',  labelMn: 'МН Апп',    icon: '📲' },
  { id: 'bank',   labelEn: 'Bank',     labelMn: 'Банк',      icon: '🏦' },
]

export default function DonationModal({ open, onClose }: Props) {
  const { t, locale } = useLanguage()
  const isMn = locale === 'mn'

  const [method,     setMethod]     = useState<Method>('card')
  const [usdAmount,  setUsdAmount]  = useState(10)
  const [ppAmount,   setPpAmount]   = useState(10)
  const [qpAmount,   setQpAmount]   = useState(20000)
  const [mntAmount,  setMntAmount]  = useState(20000)
  const [treeCount,  setTreeCount]  = useState(8247)
  const [growing,    setGrowing]    = useState(false)
  const [done,       setDone]       = useState(false)
  const [doneMethod, setDoneMethod] = useState<Method>('card')
  const [qpStep,     setQpStep]     = useState<QPayStep>('idle')
  const [qrData,     setQrData]     = useState<QRData | null>(null)
  const [qpError,    setQpError]    = useState('')
  const [copied,     setCopied]     = useState<string | null>(null)
  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const expireRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const ppTrees  = Math.max(1, Math.floor(ppAmount / 5))
  const qpTrees  = Math.max(1, Math.floor(qpAmount / MNT_PER_TREE))
  const mntTrees = Math.max(1, Math.floor(mntAmount / MNT_PER_TREE))
  const usdTrees = Math.max(1, Math.floor(usdAmount / 5))

  useEffect(() => {
    if (!open) {
      clearInterval(pollRef.current ?? undefined)
      clearTimeout(expireRef.current ?? undefined)
      setTimeout(() => {
        setMethod('card'); setUsdAmount(10); setPpAmount(10); setQpAmount(20000); setMntAmount(20000)
        setDone(false); setGrowing(false)
        setQpStep('idle'); setQrData(null); setQpError(''); setCopied(null)
      }, 300)
    }
  }, [open])

  function switchMethod(m: Method) {
    setMethod(m); setQpStep('idle'); setQrData(null); setQpError('')
  }

  function handleStripe() {
    const link = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? ''
    if (link) {
      window.open(`${link}?amount=${usdAmount * 100}`, '_blank', 'noopener,noreferrer')
    } else {
      window.open(`https://buy.stripe.com/placeholder?amount=${usdAmount}`, '_blank', 'noopener,noreferrer')
    }
    setDoneMethod('card'); setDone(true); setGrowing(true)
    setTimeout(() => setTreeCount(c => c + usdTrees), 1200)
  }

  function handlePayPal() {
    const id = process.env.NEXT_PUBLIC_PAYPAL_BUTTON_ID ?? 'W4TH5XGD5TVNL'
    window.open(`https://www.paypal.com/donate/?hosted_button_id=${id}&amount=${ppAmount}`, '_blank', 'noopener,noreferrer')
    setDoneMethod('paypal'); setDone(true); setGrowing(true)
    setTimeout(() => setTreeCount(c => c + ppTrees), 1200)
  }

  function handleSocialPay() {
    const merchantCode = process.env.NEXT_PUBLIC_SOCIALPAY_MERCHANT ?? 'VOICEOFDESERT'
    const desc = encodeURIComponent('Voice of the Desert donation')
    window.open(`https://socialpay.mn/pay?merchant=${merchantCode}&amount=${mntAmount}&description=${desc}`, '_blank', 'noopener,noreferrer')
    setDoneMethod('apps'); setDone(true); setGrowing(true)
    setTimeout(() => setTreeCount(c => c + mntTrees), 1200)
  }

  function handleMonPay() {
    const merchant = process.env.NEXT_PUBLIC_MONPAY_MERCHANT ?? 'VOICEOFDESERT'
    window.open(`https://app.monpay.mn/donate/${merchant}?amount=${mntAmount}`, '_blank', 'noopener,noreferrer')
    setDoneMethod('apps'); setDone(true); setGrowing(true)
    setTimeout(() => setTreeCount(c => c + mntTrees), 1200)
  }

  async function handleQPay() {
    setQpStep('loading'); setQpError('')
    try {
      const res  = await fetch('/api/qpay/invoice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: qpAmount }) })
      const data = await res.json() as QRData & { error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? 'Failed')
      setQrData(data); setQpStep('qr')
      expireRef.current = setTimeout(() => { clearInterval(pollRef.current ?? undefined); setQpStep('idle'); setQrData(null); setQpError(isMn ? 'QR кодны хугацаа дууссан.' : 'QR expired. Please try again.') }, 5 * 60 * 1000)
      pollRef.current = setInterval(async () => {
        try {
          const r = await fetch(`/api/qpay/check/${data.invoice_id}`)
          const d = await r.json() as { paid: boolean }
          if (d.paid) { clearInterval(pollRef.current ?? undefined); clearTimeout(expireRef.current ?? undefined); setDoneMethod('qpay'); setDone(true); setGrowing(true); setTimeout(() => setTreeCount(c => c + qpTrees), 1200) }
        } catch { /* keep polling */ }
      }, 3000)
    } catch (err) { setQpError(err instanceof Error ? err.message : 'Could not generate QR.'); setQpStep('idle') }
  }

  async function copyText(text: string, key: string) {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1800)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div
            initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative z-10 w-full sm:max-w-md bg-[#12121C] rounded-t-3xl sm:rounded-3xl border border-white/8 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>

            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-white/8 hover:bg-white/15 text-white/50 hover:text-white transition-all">✕</button>

            {/* ── SUCCESS ── */}
            <AnimatePresence>
              {done && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center px-6 pb-8">
                  <div className="w-full h-52">
                    <CanvasBoundary>
                      <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white/20 text-3xl">🌱</div>}>
                        <TreeSeed growing={growing} treeCount={treeCount} />
                      </Suspense>
                    </CanvasBoundary>
                  </div>
                  <div className="text-green-400 font-black text-xl mb-1">
                    {doneMethod === 'qpay' ? (isMn ? 'Төлбөр амжилттай!' : 'Payment confirmed!') : (isMn ? 'Цонх нээгдлээ!' : 'Opened!')}
                  </div>
                  <p className="text-white/50 text-sm mb-1">{isMn ? 'Цөлийг сэргээхэд тусалсанд баярлалаа.' : 'Thank you for helping revive the desert.'}</p>
                  {doneMethod !== 'qpay' && (
                    <p className="text-white/30 text-xs mb-4">{isMn ? 'Нээгдсэн цонхонд төлбөрөө дуусгана уу.' : 'Complete your payment in the opened tab.'}</p>
                  )}
                  <button onClick={onClose} className="mt-2 px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase text-white" style={{ background: '#E03D1E' }}>
                    {isMn ? 'Хаах' : 'Close'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── FORM ── */}
            {!done && (
              <div className="px-5 pt-4 pb-6 space-y-4 max-h-[88dvh] overflow-y-auto">

                {/* Header */}
                <div className="pr-8">
                  <h2 className="text-lg font-black text-white leading-tight">{t('donate.title')}</h2>
                  <p className="text-white/45 text-xs mt-0.5">{t('donate.subtitle')}</p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-5 gap-1 p-1 bg-white/5 rounded-xl">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => switchMethod(tab.id)}
                      className={`flex flex-col items-center py-2 px-1 rounded-lg text-[9px] font-black tracking-wide uppercase transition-all duration-200 gap-0.5 ${
                        method === tab.id ? 'text-white shadow-sm' : 'text-white/35 hover:text-white/60'
                      }`}
                      style={method === tab.id ? { background: '#E03D1E' } : undefined}
                    >
                      <span className="text-base leading-none">{tab.icon}</span>
                      {isMn ? tab.labelMn : tab.labelEn}
                    </button>
                  ))}
                </div>

                {/* ── CARD / STRIPE ── */}
                {method === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/35 text-[10px] font-semibold tracking-widest uppercase mb-2">{isMn ? 'Дүн сонгох' : 'Select amount'}</p>
                      <div className="flex flex-wrap gap-2">
                        {USD_AMOUNTS.map(a => (
                          <button key={a} onClick={() => setUsdAmount(a)}
                            style={usdAmount === a ? { background: '#E03D1E' } : undefined}
                            className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all min-h-[44px] ${usdAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/65 border-white/10 hover:border-vermilion/40'}`}>
                            ${a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-950/50 border border-green-900/50">
                      <span className="text-lg">🌱</span>
                      <p className="text-green-400 text-sm">
                        <strong>${usdAmount}</strong> {isMn ? `= ${usdTrees} мод тарина` : `plants ${usdTrees} tree${usdTrees !== 1 ? 's' : ''}`}
                      </p>
                    </div>

                    <motion.button onClick={handleStripe} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="w-full py-3.5 rounded-xl font-black text-sm text-white tracking-wide flex items-center justify-center gap-2"
                      style={{ background: '#635BFF' }}>
                      <span>💳</span> {isMn ? `Картаар төлөх — $${usdAmount}` : `Pay $${usdAmount} by card`}
                    </motion.button>

                    {/* Apple Pay / Google Pay */}
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button onClick={handleStripe} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-black border border-white/15 hover:border-white/30 transition-colors">
                        <span className="text-base"> Apple Pay</span>
                      </motion.button>
                      <motion.button onClick={handleStripe} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 bg-white/10 border border-white/15 hover:border-white/30 transition-colors">
                        <span className="text-base">G Pay</span>
                      </motion.button>
                    </div>
                    <p className="text-white/20 text-[10px] text-center">{isMn ? 'Stripe аюулгүй төлбөрийн системээр боловсруулагдана' : 'Powered by Stripe — secure card processing'}</p>
                  </div>
                )}

                {/* ── PAYPAL ── */}
                {method === 'paypal' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/35 text-[10px] font-semibold tracking-widest uppercase mb-2">{isMn ? 'Дүн сонгох' : 'Select amount'}</p>
                      <div className="flex flex-wrap gap-2">
                        {USD_AMOUNTS.map(a => (
                          <button key={a} onClick={() => setPpAmount(a)}
                            style={ppAmount === a ? { background: '#E03D1E' } : undefined}
                            className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all min-h-[44px] ${ppAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/65 border-white/10 hover:border-vermilion/40'}`}>
                            ${a}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-950/50 border border-green-900/50">
                      <span className="text-lg">🌱</span>
                      <p className="text-green-400 text-sm"><strong>${ppAmount}</strong> {isMn ? `= ${ppTrees} мод тарина` : `plants ${ppTrees} tree${ppTrees !== 1 ? 's' : ''}`}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex flex-col items-center gap-1.5">
                        <p className="text-white/30 text-[9px] uppercase tracking-widest">{isMn ? 'QR уншуулах' : 'Scan to donate'}</p>
                        <div className="bg-white rounded-xl p-2"><img src="/paypal-qr.png" alt="PayPal QR" className="w-28 h-28" /></div>
                      </div>
                      <div className="flex-1 w-full space-y-2">
                        <motion.button onClick={handlePayPal} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          className="w-full py-3.5 rounded-xl font-black text-sm text-white tracking-wide" style={{ background: '#003087' }}>
                          {isMn ? `PayPal — $${ppAmount}` : `Donate $${ppAmount} via PayPal`}
                        </motion.button>
                        <p className="text-white/20 text-[10px] text-center">{isMn ? 'PayPal хуудас шинэ таб дээр нээгдэнэ' : 'Opens PayPal in a new tab'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── QPAY ── */}
                {method === 'qpay' && (
                  <div className="space-y-4">
                    {qpStep === 'idle' && (
                      <>
                        <div>
                          <p className="text-white/35 text-[10px] font-semibold tracking-widest uppercase mb-2">{isMn ? 'Дүн сонгох' : 'Select amount'}</p>
                          <div className="flex flex-wrap gap-2">
                            {QPAY_AMOUNTS.map(a => (
                              <button key={a} onClick={() => setQpAmount(a)}
                                style={qpAmount === a ? { background: '#E03D1E' } : undefined}
                                className={`px-3 py-2.5 rounded-xl font-bold text-xs border transition-all min-h-[44px] ${qpAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/65 border-white/10 hover:border-vermilion/40'}`}>
                                ₮{a.toLocaleString()}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-950/50 border border-green-900/50">
                          <span className="text-lg">🌱</span>
                          <p className="text-green-400 text-sm"><strong>₮{qpAmount.toLocaleString()}</strong> {isMn ? `= ${qpTrees} мод тарина` : `plants ${qpTrees} tree${qpTrees !== 1 ? 's' : ''}`}</p>
                        </div>
                        {qpError && <p className="text-red-400 text-xs text-center bg-red-900/20 rounded-xl p-2.5">{qpError}</p>}
                        <motion.button onClick={handleQPay} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                          className="w-full py-3.5 rounded-xl font-black text-sm text-white tracking-wide" style={{ background: '#E03D1E' }}>
                          {isMn ? `QPay — ₮${qpAmount.toLocaleString()}` : `Pay ₮${qpAmount.toLocaleString()} via QPay`}
                        </motion.button>
                      </>
                    )}
                    {qpStep === 'loading' && (
                      <div className="flex flex-col items-center py-10 gap-3">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-9 h-9 rounded-full border-2 border-vermilion/30 border-t-vermilion" />
                        <p className="text-white/50 text-sm">{isMn ? 'QR код үүсгэж байна…' : 'Generating QR code…'}</p>
                      </div>
                    )}
                    {qpStep === 'qr' && qrData && (
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-white/55 text-xs text-center">{isMn ? 'Банкны аппаараа QR кодыг уншуулна уу' : 'Scan with your banking app'}</p>
                        <div className="bg-white rounded-2xl p-3 shadow-lg">
                          <img src={`data:image/png;base64,${qrData.qr_image}`} alt="QPay QR" className="w-52 h-52" />
                        </div>
                        {qrData.urls.length > 0 && (
                          <div className="w-full">
                            <p className="text-white/30 text-[10px] text-center uppercase tracking-widest mb-2">{isMn ? 'Аппаараа нээх' : 'Open in banking app'}</p>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {qrData.urls.slice(0, 6).map((u, i) => (
                                <a key={i} href={u.link} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/8 border border-white/10 hover:border-vermilion/40 transition-colors min-h-[36px]">
                                  {u.logo && <img src={u.logo} alt={u.name} className="w-4 h-4 rounded-sm" />}
                                  <span className="text-white/60 text-[10px] font-semibold">{u.name}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-white/35 text-xs">
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }} className="w-3 h-3 rounded-full border border-white/30 border-t-white/70 shrink-0" />
                          {isMn ? 'Төлбөрийг хүлээж байна…' : 'Waiting for payment…'}
                        </div>
                        <button onClick={() => { clearInterval(pollRef.current ?? undefined); clearTimeout(expireRef.current ?? undefined); setQpStep('idle'); setQrData(null) }}
                          className="text-white/30 text-xs hover:text-white/55 transition-colors underline underline-offset-2">
                          {isMn ? 'Цуцлах' : 'Cancel'}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ── MONGOLIAN APPS ── */}
                {method === 'apps' && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/35 text-[10px] font-semibold tracking-widest uppercase mb-2">{isMn ? 'Дүн сонгох' : 'Select amount'}</p>
                      <div className="flex flex-wrap gap-2">
                        {MNT_AMOUNTS.map(a => (
                          <button key={a} onClick={() => setMntAmount(a)}
                            style={mntAmount === a ? { background: '#E03D1E' } : undefined}
                            className={`px-3 py-2.5 rounded-xl font-bold text-xs border transition-all min-h-[44px] ${mntAmount === a ? 'text-white border-transparent' : 'bg-white/5 text-white/65 border-white/10 hover:border-vermilion/40'}`}>
                            ₮{a.toLocaleString()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-green-950/50 border border-green-900/50">
                      <span className="text-lg">🌱</span>
                      <p className="text-green-400 text-sm"><strong>₮{mntAmount.toLocaleString()}</strong> {isMn ? `= ${mntTrees} мод тарина` : `plants ${mntTrees} tree${mntTrees !== 1 ? 's' : ''}`}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* SocialPay */}
                      <motion.button onClick={handleSocialPay} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="flex flex-col items-center gap-2 py-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#E03D1E]/40 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#1B5FB4] flex items-center justify-center text-white font-black text-xs">SP</div>
                        <span className="text-white/80 text-xs font-bold">SocialPay</span>
                        <span className="text-white/35 text-[10px]">{isMn ? 'Хаан банк' : 'Khan Bank'}</span>
                      </motion.button>

                      {/* MonPay */}
                      <motion.button onClick={handleMonPay} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className="flex flex-col items-center gap-2 py-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#E03D1E]/40 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-[#F7941D] flex items-center justify-center text-white font-black text-xs">MP</div>
                        <span className="text-white/80 text-xs font-bold">MonPay</span>
                        <span className="text-white/35 text-[10px]">{isMn ? 'Монпэй' : 'MonPay wallet'}</span>
                      </motion.button>
                    </div>
                    <p className="text-white/20 text-[10px] text-center">{isMn ? 'Аппыг нээх бөгөөд тэнд төлбөрөө дуусгана уу' : 'Opens the app — complete payment there'}</p>
                  </div>
                )}

                {/* ── BANK TRANSFER ── */}
                {method === 'bank' && (
                  <div className="space-y-3">
                    <p className="text-white/55 text-xs leading-relaxed">
                      {isMn
                        ? 'Доорх дансны дэлгэрэнгүйг ашиглан шилжүүлэг хийнэ үү. Гүйлгээний утгад "хандив" гэж бичнэ үү.'
                        : 'Transfer to any of the accounts below. Include "donation" in the payment reference.'}
                    </p>

                    <div className="space-y-2">
                      {BANK_ACCOUNTS.map((b, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/8 space-y-2.5">
                          <p className="text-white font-bold text-sm">{isMn ? b.bank : b.bankEn}</p>

                          {[
                            { label: isMn ? 'Ибан дугаар'    : 'IBAN',            value: b.iban,     key: `iban-${i}` },
                            { label: isMn ? 'Дансны дугаар'  : 'Account number',  value: b.account,  key: `acc-${i}`  },
                            { label: isMn ? 'Валют'          : 'Currency',        value: b.currency, key: `cur-${i}`  },
                            { label: isMn ? 'Данс эзэмшигч' : 'Account holder',  value: b.holder,   key: `hld-${i}`  },
                            { label: isMn ? 'Гүйлгээний утга': 'Reference',       value: isMn ? b.ref : b.refEn, key: `ref-${i}` },
                          ].map(row => (
                            <div key={row.key} className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-white/35 text-[10px] uppercase tracking-widest">{row.label}</p>
                                <p className="text-white/80 text-xs font-mono mt-0.5 break-all">{row.value}</p>
                              </div>
                              <button
                                onClick={() => copyText(row.value, row.key)}
                                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-white/8 hover:bg-white/15 text-white/50 hover:text-white text-[10px] font-semibold transition-all"
                              >
                                {copied === row.key ? '✓' : isMn ? 'Хуулах' : 'Copy'}
                              </button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/30">
                      <p className="text-amber-400/80 text-[10px] leading-relaxed">
                        {isMn
                          ? '⚠ Гүйлгээний утганд: Хандив, Компаний нэр, РД гэж заавал бичнэ үү.'
                          : '⚠ Reference must include: Donation, Company name, Registration No.'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tree counter */}
                <div className="flex items-center justify-center gap-2 pt-1 border-t border-white/6">
                  <span className="text-sm">🌳</span>
                  <p className="text-white/30 text-xs">
                    <span className="text-white/50 font-semibold">{treeCount.toLocaleString()}</span>{' '}{t('donate.impact')}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
