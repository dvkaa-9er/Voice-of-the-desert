'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const STRATEGIC = [
  {
    nameMn: 'UNCCD COP17 Улаанбаатар 2026',
    nameEn: 'UNCCD COP17 Ulaanbaatar 2026',
    abbr: 'UNCCD',
    color: '#D4AF37',
  },
  {
    nameMn: 'Монголын Үндэсний Худалдаа Аж Үйлдвэрийн Танхим',
    nameEn: 'Mongolian National Chamber of Commerce & Industry',
    abbr: 'МҮХАҮТ',
    color: '#FF6B35',
  },
]

const COLLABORATORS = [
  {
    nameMn: 'Байгаль Орчин, Уур Амьсгалын Өөрчлөлтийн Яам',
    nameEn: 'Ministry of Environment & Climate Change',
    abbr: 'БОУАӨЯ',
    color: '#2D7A4F',
  },
  {
    nameMn: 'Хил Хамгаалах Ерөнхий Газар',
    nameEn: 'General Border Protection Department',
    abbr: 'ХХЕГ',
    color: '#4CAF50',
  },
  {
    nameMn: 'Монгол Улсын Шинжлэх Ухааны Академи',
    nameEn: 'Mongolian Academy of Sciences',
    abbr: 'МУША',
    color: '#C9A84C',
  },
  {
    nameMn: 'Монголын Залуучуудын Холбоо',
    nameEn: 'Youth Union of Mongolia',
    abbr: 'МЗХ',
    color: '#E34234',
  },
  {
    nameMn: 'Централ Телевиз',
    nameEn: 'Central Television',
    abbr: 'CTV',
    color: '#FF6B35',
  },
]

export default function Partners() {
  const { t, locale } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="partners" ref={ref} className="relative py-16 md:py-24 px-6 md:px-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gold/60" />
            <p className="text-gold/70 text-[10px] font-black tracking-[0.5em] uppercase">Global Coalition</p>
          </div>
          <h2 className="text-[clamp(32px,5.5vw,64px)] font-black text-white leading-tight">{t('partners.title')}</h2>
          <p className="text-white/55 text-base max-w-xl">{t('partners.subtitle')}</p>
        </motion.div>

        {/* Strategic partners */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="space-y-5"
        >
          <p className="text-white/30 text-[10px] font-black tracking-[0.45em] uppercase">
            {locale === 'mn' ? 'Стратегийн түнш байгууллагууд' : 'Strategic Partners'}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {STRATEGIC.map((p, i) => (
              <motion.div
                key={p.abbr}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                className="flex items-center gap-5 p-5 rounded-xl border border-white/8 bg-white/[0.025] hover:border-white/20 transition-colors group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: p.color + '20', color: p.color }}
                >
                  {p.abbr}
                </div>
                <span className="text-white/70 text-sm font-medium leading-snug group-hover:text-white transition-colors line-clamp-2">
                  {locale === 'mn' ? p.nameMn : p.nameEn}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collaborating partners */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="space-y-5"
        >
          <p className="text-white/30 text-[10px] font-black tracking-[0.45em] uppercase">
            {locale === 'mn' ? 'Хамтрагч байгууллагууд' : 'Collaborating Partners'}
          </p>
          <div className="flex flex-wrap gap-3">
            {COLLABORATORS.map((p, i) => (
              <motion.div
                key={p.abbr}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 px-4 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:border-white/25 transition-colors group cursor-default"
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: p.color }}
                />
                <span className="text-white/60 text-sm font-medium group-hover:text-white/85 transition-colors whitespace-nowrap">
                  {locale === 'mn' ? p.nameMn : p.nameEn}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
