'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState({ name: '', email: '', message: '' })
  const [trap, setTrap]       = useState('')  // honeypot — must stay empty

  // Pre-fill message when user clicks a sponsorship tier card
  useEffect(() => {
    const handler = (e: Event) => {
      const { tier } = (e as CustomEvent<{ tier: string }>).detail
      setForm(f => ({
        ...f,
        message: `I am interested in the ${tier} sponsorship package and would like to learn more.`,
      }))
    }
    window.addEventListener('sponsorship-inquiry', handler)
    return () => window.removeEventListener('sponsorship-inquiry', handler)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _trap: trap }),
      })
      const data = await res.json() as { ok?: boolean; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong.')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-center px-6 py-16 md:py-24"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-gold/70 text-xs font-bold tracking-[0.4em] uppercase mb-4">
            Join the Movement
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3">
            {t('contact.title')}
          </h2>
          <p className="text-white/60 text-lg">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="rounded-2xl border border-white/10 bg-white/4 p-8 backdrop-blur-sm"
        >
          {!sent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot — hidden from humans, filled by bots */}
              <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
                <input type="text" name="_trap" tabIndex={-1} autoComplete="off" value={trap} onChange={e => setTrap(e.target.value)} />
              </div>
              {[
                { key: 'name', type: 'text', field: 'name' },
                { key: 'email', type: 'email', field: 'email' },
              ].map(({ key, type, field }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-xs font-medium tracking-wider uppercase">
                    {t(`contact.${key}`)}
                  </label>
                  <input
                    type={type}
                    required
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                    className="bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/8 transition-all duration-200"
                    placeholder={t(`contact.${key}`)}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs font-medium tracking-wider uppercase">
                  {t('contact.message')}
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="bg-white/5 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/8 transition-all duration-200 resize-none"
                  placeholder={t('contact.message')}
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs text-center -mb-1">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={loading ? {} : { scale: 1.02 }}
                whileTap={loading ? {} : { scale: 0.98 }}
                className="w-full py-4 rounded-xl font-black text-sm tracking-wider uppercase text-white shadow-lg transition-shadow mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: '#E03D1E' }}
              >
                {loading ? '…' : t('contact.send')}
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="text-white font-black text-2xl mb-2">Message Sent!</h3>
              <p className="text-white/50 text-sm">
                Thank you for joining the movement. We'll be in touch soon.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Direct contact info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-10 rounded-2xl border border-white/8 bg-white/[0.025] p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-0.5 bg-vermilion/50" />
            <span className="text-vermilion/60 text-[10px] font-black tracking-[0.45em] uppercase">
              Voice of the Desert
            </span>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:contact@voiceofdesert.org"
              className="flex items-center gap-4 group"
            >
              <span className="text-white/25 text-xs w-4">@</span>
              <span className="text-white/60 text-sm group-hover:text-vermilion transition-colors duration-200">
                contact@voiceofdesert.org
              </span>
            </a>
            <a
              href="tel:+97689942918"
              className="flex items-center gap-4 group"
            >
              <span className="text-white/25 text-xs w-4">↗</span>
              <span className="text-white/60 text-sm group-hover:text-vermilion transition-colors duration-200">
                +976 8994 2918
              </span>
            </a>
            <a
              href="tel:+97693234444"
              className="flex items-center gap-4 group"
            >
              <span className="text-white/25 text-xs w-4">↗</span>
              <span className="text-white/60 text-sm group-hover:text-vermilion transition-colors duration-200">
                +976 9323 4444
              </span>
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-white/20 text-xs mt-12 tracking-wider"
        >
          {t('contact.rights')}
        </motion.p>
      </div>
    </section>
  )
}
