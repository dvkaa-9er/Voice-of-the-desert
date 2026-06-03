'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const STRATEGIC = [
  {
    nameMn: 'Монгол Улсын Ерөнхийлөгчийн Тамгын Газар',
    nameEn: "Office of the President of Mongolia",
    logo: '/partners/partner-president.png',
  },
  {
    nameMn: 'Байгаль Орчин, Уур Амьсгалын Өөрчлөлтийн Яам',
    nameEn: 'Ministry of Environment & Climate Change',
    logo: '/partners/partner-environment.png',
  },
  {
    nameMn: 'НҮБ-ын Цөлжилтийн Эсрэг Конвенц',
    nameEn: 'UN Convention to Combat Desertification',
    logo: '/partners/partner-unccd.png',
  },
  {
    nameMn: 'UNCCD COP17 Улаанбаатар 2026',
    nameEn: 'UNCCD COP17 Ulaanbaatar 2026',
    logo: '/partners/partner-cop17.png',
  },
  {
    nameMn: 'Монгол Улсын Шинжлэх Ухааны Академи',
    nameEn: 'Mongolian Academy of Sciences',
    logo: '/partners/partner-academy.png',
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {STRATEGIC.map((p, i) => (
              <motion.div
                key={p.logo}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                className="flex items-center justify-center p-5 rounded-xl border border-white/8 bg-white hover:border-vermilion/30 transition-colors group"
                title={locale === 'mn' ? p.nameMn : p.nameEn}
              >
                <div className="relative w-full h-24">
                  <Image
                    src={p.logo}
                    alt={locale === 'mn' ? p.nameMn : p.nameEn}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 40vw, 200px"
                  />
                </div>
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
