'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const STATS = [
  { value: '16,000', unitMn: 'КМ',     unitEn: 'KM',      labelMn: 'Экспедицийн зам', labelEn: 'Expedition route' },
  { value: '7',      unitMn: 'УЛС',    unitEn: 'NATIONS', labelMn: 'Дамжих улс',       labelEn: 'Countries crossed' },
  { value: '120',    unitMn: 'ӨДӨР',   unitEn: 'DAYS',    labelMn: 'Үргэлжлэх хугацаа', labelEn: 'Expedition duration' },
  { value: '100M+',  unitMn: 'ХҮРЭХ',  unitEn: 'REACH',   labelMn: 'Олон нийтийн хүрэх', labelEn: 'Global audience' },
]

const TICKER_ITEMS = [
  'DESERT MOTION', '16,000 KM', 'DESERT SCIENCE', '7 NATIONS',
  'DESERT VOICE', '120 DAYS', 'UNCCD COP17', '100M+ REACH',
]

export default function Hero({ onDonateClick }: { onDonateClick: () => void }) {
  const { t, locale } = useLanguage()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(id)
  }, [])

  const ease = [0.16, 1, 0.3, 1] as const

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background ambient gradient ────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[50vh] rounded-full opacity-10"
             style={{ background: 'radial-gradient(ellipse, #E03D1E 0%, transparent 70%)' }} />
      </div>

      {/* ── Main content ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-10 pt-20 md:pt-28 pb-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-5 h-px bg-vermilion/60" />
          <span className="text-vermilion text-[10px] font-black tracking-[0.5em] uppercase">UNCCD COP17 Initiative</span>
          <div className="w-5 h-px bg-vermilion/60" />
        </motion.div>

        {/* Project name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.9, ease }}
          className="font-display text-[clamp(40px,8vw,100px)] font-black leading-[0.9] tracking-[-0.03em] text-white mb-6"
        >
          VOICE OF<br />
          <span style={{
            background: 'linear-gradient(135deg, #E03D1E 0%, #C8841A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            THE DESERT
          </span>
        </motion.h1>

        {/* One-line description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.38, duration: 0.8 }}
          className="text-white/70 text-[clamp(14px,1.8vw,20px)] font-light leading-relaxed max-w-2xl mb-4"
        >
          {locale === 'mn'
            ? 'Дэлхийн аварга Б.Буджаргалын манлайлсан 120 хоногийн тэсвэрийн экспедиц Евразийн хуурай газраар 16,000 км зам туулна. Маршрутын дагуу судлаачид газрын доройтлыг шинжилж, бүх километр нь дэлхийд дамжуулагдах түүх болно.'
            : 'A 120-day endurance expedition led by world-champion ultra-runner B.Budjargal, crossing 16,000 km of Eurasian drylands. Along the route, researchers study land degradation — and every kilometre becomes a story shared with the world.'
          }
        </motion.p>

        {/* Brand tagline — SPORT · SCIENCE · MEDIA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-white/50 text-[10px] font-black tracking-[0.45em] uppercase mb-12"
        >
          {locale === 'mn'
            ? 'СПОРТ · ШИНЖЛЭХ УХААН · МЕДИА — ЦӨЛЖИЛТИЙН ЭСРЭГ'
            : 'SPORT · SCIENCE · MEDIA — AGAINST DESERTIFICATION'}
        </motion.p>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden mb-12 w-full max-w-3xl border border-white/8"
        >
          {STATS.map((s, i) => (
            <div key={i} className="bg-[#050508] px-3 py-4 sm:px-5 sm:py-5 flex flex-col items-center gap-1">
              <span className="text-[clamp(22px,3vw,36px)] font-black text-white leading-none">{s.value}</span>
              <span className="text-vermilion text-[9px] font-black tracking-[0.4em] uppercase">
                {locale === 'mn' ? s.unitMn : s.unitEn}
              </span>
              <span className="text-white/40 text-[10px] text-center leading-tight mt-0.5">
                {locale === 'mn' ? s.labelMn : s.labelEn}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 text-sm font-semibold tracking-widest uppercase transition-all duration-200"
          >
            <span>{t('hero.cta')}</span>
            <motion.span
              animate={{ y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
          </button>

          <motion.button
            onClick={onDonateClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-3.5 font-black text-sm tracking-widest uppercase text-white rounded-full overflow-hidden"
            style={{ background: '#E03D1E' }}
          >
            {t('nav.donate')}
          </motion.button>
        </motion.div>

      </div>

      {/* ── Bottom ticker ────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/8 overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          className="flex items-center gap-8 w-max py-3 pl-8"
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-8 text-white/30 text-[10px] font-bold tracking-[0.5em] uppercase whitespace-nowrap">
              {item}
              <span className="text-vermilion/30 text-[6px]">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
