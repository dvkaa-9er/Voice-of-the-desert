'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LanguageProvider, useLanguage } from '@/components/providers/LanguageProvider'
import NoiseOverlay from '@/components/ui/NoiseOverlay'

const PRODUCT_TEASERS = [
  { icon: '👕', label: 'Expedition Tee', labelMn: 'Экспедицийн цамц', delay: 0 },
  { icon: '🧢', label: 'Desert Cap',     labelMn: 'Цөлийн малгай',    delay: 0.08 },
  { icon: '🖼️', label: 'Art Prints',     labelMn: 'Урлагийн хэвлэл', delay: 0.16 },
  { icon: '🎒', label: 'Trail Pack',     labelMn: 'Явган аялалын уут', delay: 0.24 },
]

function ShopContent() {
  const { locale } = useLanguage()
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [trap, setTrap]           = useState('')  // honeypot

  const isMn = locale === 'mn'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), _trap: trap }),
      })
      const data = await res.json() as { ok?: boolean; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#050508] overflow-hidden flex flex-col">
      <NoiseOverlay />

      {/* Ambient desert glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#E03D1E]/6 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/4 w-[600px] h-[400px] rounded-full bg-[#C8841A]/5 blur-[100px]" />
      </div>

      {/* Header strip */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 h-16 border-b border-white/6">
        <Link href="/" className="group flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Voice of the Desert"
            className="h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </Link>
        <Link
          href="/"
          className="text-[10px] font-semibold tracking-[0.3em] uppercase text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          {isMn ? '← Буцах' : '← Back to site'}
        </Link>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-4 py-1.5 text-[10px] font-black tracking-[0.35em] uppercase text-gold"
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          {isMn ? 'Тун удахгүй' : 'Coming Soon'}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight leading-none mb-4"
        >
          <span className="text-gradient-gold">
            {isMn ? 'ЦӨЛИЙН' : 'DESERT'}
          </span>
          <br />
          <span className="text-white">
            {isMn ? 'БАРАА' : 'MERCH'}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="max-w-lg text-white/45 text-sm md:text-base leading-relaxed mb-12"
        >
          {isMn
            ? 'Экспедицийн онцгой цуглуулга — хязгаарлагдмал тооны хувцас, урлагийн хэвлэл, тоног төхөөрөмж. Эхний мэдэгдэл авахаар бүртгүүлнэ үү.'
            : 'Limited-edition expedition gear — apparel, art prints, and trail equipment inspired by 12,000 km across Eurasia. Register to be first notified when the shop opens.'}
        </motion.p>

        {/* Product teasers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 w-full max-w-2xl"
        >
          {PRODUCT_TEASERS.map(({ icon, label, labelMn, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + delay }}
              className="relative group rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm p-6 flex flex-col items-center gap-3 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-gold/6 to-transparent" />
              <span className="text-3xl grayscale opacity-50 group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-500">
                {icon}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300">
                {isMn ? labelMn : label}
              </span>
              {/* "Sold out / locked" overlay */}
              <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] font-black tracking-[0.25em] uppercase text-gold/60">
                  {isMn ? 'Тун удахгүй' : 'Soon'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Email capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="w-full max-w-md"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-gold/30 bg-gold/8 px-8 py-6 text-center"
            >
              <div className="text-2xl mb-2">🌿</div>
              <p className="text-white font-bold tracking-wide text-sm mb-1">
                {isMn ? 'Баярлалаа!' : "You're on the list!"}
              </p>
              <p className="text-white/40 text-xs tracking-wide">
                {isMn
                  ? 'Дэлгүүр нээгдэхэд мэдэгдэл илгээнэ.'
                  : "We'll notify you the moment the shop opens."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Honeypot */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <input type="text" name="_trap" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={isMn ? 'Имэйл хаяг' : 'your@email.com'}
                  className="flex-1 bg-white/5 border border-white/12 rounded-full px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none focus:border-vermilion/50 transition-colors duration-200 min-h-[48px]"
                />
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { scale: 1.04 }}
                  whileTap={loading ? {} : { scale: 0.96 }}
                  className="rounded-full px-6 py-3.5 text-[11px] font-black tracking-widest uppercase text-white whitespace-nowrap disabled:opacity-60 min-h-[48px]"
                  style={{ background: '#E03D1E' }}
                >
                  {loading ? '…' : (isMn ? 'Мэдэгдэл авах' : 'Notify Me')}
                </motion.button>
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center">{error}</p>
              )}
            </form>
          )}

          <p className="mt-4 text-[10px] text-white/20 tracking-widest uppercase">
            {isMn
              ? 'Спам илгээхгүй. Зөвхөн дэлгүүр нээлтийн мэдэгдэл.'
              : 'No spam. Launch notification only.'}
          </p>
        </motion.div>
      </main>

      {/* Footer line */}
      <footer className="relative z-10 border-t border-white/6 px-6 py-4 text-center space-y-1">
        <p className="text-[10px] text-white/20 tracking-[0.2em] uppercase">
          {isMn
            ? '© 2026 Цөлийн дуу хоолой · Бүх эрх хамгаалагдсан'
            : '© 2026 Voice of the Desert · All rights reserved'}
        </p>
        <p className="text-[9px] text-white/15 tracking-[0.3em] uppercase">
          Powered by <span className="text-white/25 font-semibold">UGC Mongolia®</span>
        </p>
      </footer>
    </div>
  )
}

export default function ShopPage() {
  return (
    <LanguageProvider>
      <ShopContent />
    </LanguageProvider>
  )
}
