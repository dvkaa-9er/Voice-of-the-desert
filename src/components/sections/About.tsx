'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const COUNTRIES = [
  { name: 'Mongolia',   flag: '🇲🇳' },
  { name: 'China',      flag: '🇨🇳' },
  { name: 'Kazakhstan', flag: '🇰🇿' },
  { name: 'Kyrgyzstan', flag: '🇰🇬' },
  { name: 'Tajikistan', flag: '🇹🇯' },
  { name: 'Uzbekistan', flag: '🇺🇿' },
  { name: 'Russia',     flag: '🇷🇺' },
]

const WHY_POINTS = [
  {
    titleMn: 'Шинжлэх ухаанд суурилсан платформ',
    titleEn: 'A science-grounded platform',
    bodyMn: 'Цөлжилтийг хүний нүдэнд харагдах, ойлгомжтой болгодог. Энэ нь алдагдлын тухай кампанит ажил биш — асуудал руу гүйх дуудлага.',
    bodyEn: 'Makes desertification visible and human. It is not a campaign about loss — it is a call to run toward the problem.',
  },
  {
    titleMn: 'Монголын санаачилга, олон улсын тавцан',
    titleEn: 'Mongolian initiative, international stage',
    bodyMn: 'Монгол Улсын тэргүүлсэн, олон улсын түнштэй хамтарсан санаачилга. Спорт, судалгаа, медиа, бодлогын уулзвар дэх цэг.',
    bodyEn: 'A Mongolian initiative with an international stage and partners. A meeting point for sport, research, media and policy.',
  },
  {
    titleMn: '120 хоногийн амьд түүх',
    titleEn: 'A long-form story, told live',
    bodyMn: 'Өдөр бүр, 120 хоногийн турш бодит цаг хугацаанд дамжуулагдана. Тоо баримт нь брэндийн нуруу нугас: тодорхой, давтагдах, иш татах боломжтой.',
    bodyEn: 'Told live, every day, for 120 days. The numbers are the brand\'s backbone: concrete, repeatable, quotable.',
  },
]

export default function About() {
  const { t, locale } = useLanguage()
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" ref={ref} className="relative py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-14">

        {/* ── Section header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-vermilion/60" />
            <span className="text-vermilion/70 text-[10px] font-black tracking-[0.5em] uppercase">{t('about.subtitle')}</span>
          </div>
          <h2 className="text-[clamp(36px,6vw,72px)] font-black text-white leading-[0.92] tracking-[-0.02em]">
            {t('about.title')}
          </h2>
        </motion.div>

        {/* ── Mission text + UNCCD ────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            <p className="text-white/75 text-[clamp(15px,1.5vw,18px)] leading-[1.8]">
              {t('about.body')}
            </p>
          </motion.div>

          {/* UNCCD badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="flex items-start gap-4 p-5 rounded-2xl border border-vermilion/25 bg-vermilion/[0.04] min-w-[180px] md:min-w-[220px]"
          >
            <div className="relative w-12 h-12 shrink-0">
              <div className="absolute inset-0 rounded-full border border-vermilion/40" />
              <div className="absolute inset-0 flex items-center justify-center text-vermilion font-black text-[8px] tracking-wider text-center leading-tight">UN<br/>CCD</div>
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }} className="absolute inset-0">
                <div className="w-2 h-2 rounded-full bg-vermilion absolute -top-1 left-1/2 -translate-x-1/2" />
              </motion.div>
            </div>
            <div>
              <div className="text-vermilion font-black text-sm">UNCCD COP17</div>
              <div className="text-white/60 text-xs mt-1 leading-relaxed">
                {locale === 'mn'
                  ? 'НҮБ-ийн Цөлжилтийн эсрэг конвенцийн 17 дахь талуудын чуулган'
                  : 'UN Convention to Combat Desertification — 17th Conference of the Parties'
                }
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Why this matters ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/35 text-[10px] font-black tracking-[0.45em] uppercase"
          >
            {locale === 'mn' ? 'Бид юу болох вэ' : 'What we are'}
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_POINTS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 rounded-xl border border-white/8 bg-white/[0.025] space-y-2"
              >
                <h4 className="text-white font-bold text-sm">{locale === 'mn' ? p.titleMn : p.titleEn}</h4>
                <p className="text-white/55 text-xs leading-relaxed">{locale === 'mn' ? p.bodyMn : p.bodyEn}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Expedition video ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="relative w-full rounded-2xl overflow-hidden border border-white/8"
          style={{ paddingBottom: '56.25%' }}
        >
          <iframe
            src="https://www.youtube-nocookie.com/embed/6VblZ_AGpso?autoplay=1&mute=1&rel=0&modestbranding=1&color=white&playsinline=1"
            title={locale === 'mn' ? 'Монголын Говь цөл — экспедицийн эхлэл' : 'Mongolian Gobi — where the expedition begins'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-4 left-5 pointer-events-none">
            <p className="text-white/50 text-[10px] font-semibold tracking-wider uppercase">
              {locale === 'mn' ? 'Монголын Говь цөл — экспедицийн эхлэл' : 'Mongolian Gobi — where the expedition begins'}
            </p>
          </div>
        </motion.div>

        {/* ── Countries on the route ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="space-y-3"
        >
          <p className="text-white/35 text-[10px] font-black tracking-[0.45em] uppercase">
            {locale === 'mn' ? 'Маршрутын улсууд' : 'Countries on the route'}
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map(({ name, flag }, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.45 + i * 0.05, duration: 0.4 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-white/12 text-white/65 bg-white/[0.04] hover:border-vermilion/30 hover:text-white/85 transition-colors"
              >
                <span className="text-base leading-none">{flag}</span>
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
