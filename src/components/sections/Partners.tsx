'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const STRATEGIC = [
  { nameMn: 'Монгол Улсын Ерөнхийлөгчийн Тамгын Газар', nameEn: 'Office of the President of Mongolia',        logo: '/partners/partner-president.png' },
  { nameMn: 'Байгаль Орчин, Уур Амьсгалын Өөрчлөлтийн Яам', nameEn: 'Ministry of Environment & Climate Change', logo: '/partners/partner-environment.png' },
  { nameMn: 'НҮБ-ын Цөлжилтийн Эсрэг Конвенц',           nameEn: 'UN Convention to Combat Desertification',   logo: '/partners/partner-unccd.png' },
  { nameMn: 'UNCCD COP17 Улаанбаатар 2026',               nameEn: 'UNCCD COP17 Ulaanbaatar 2026',              logo: '/partners/partner-cop17.png' },
  { nameMn: 'Монгол Улсын Шинжлэх Ухааны Академи',       nameEn: 'Mongolian Academy of Sciences',            logo: '/partners/partner-academy.png' },
]

const COLLABORATORS = [
  { nameMn: 'Монголын Үндэсний Худалдаа Аж Үйлдвэрийн Танхим', nameEn: 'Mongolian National Chamber of Commerce & Industry', logo: '/partners/partner-chamber.png' },
  { nameMn: 'Централ Телевиз',                            nameEn: 'Central Television',                       logo: '/partners/partner-ctv.png' },
  { nameMn: 'Монголын Залуучуудын Холбоо',                nameEn: 'Youth Union of Mongolia',                  logo: '/partners/partner-youth.png' },
  { nameMn: 'Газарзүй, Геоэкологийн Хүрээлэн',           nameEn: 'Institute of Geography & Geo-ecology',     logo: '/partners/partner-geoeco.png' },
  { nameMn: 'Green Mongolia Hub',                         nameEn: 'Green Mongolia Hub',                       logo: '/partners/partner-greenmongolia.png' },
]

function LogoCard({ logo, nameMn, nameEn, delay, locale }: {
  logo: string; nameMn: string; nameEn: string; delay: number; locale: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className="flex flex-col items-center justify-between gap-3 p-4 rounded-xl border border-white/8 bg-white hover:border-vermilion/30 transition-colors"
    >
      <div className="relative w-full h-20">
        <Image
          src={logo}
          alt={locale === 'mn' ? nameMn : nameEn}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
        />
      </div>
      <p className="text-[#1a1a14]/70 text-xs font-semibold text-center leading-snug line-clamp-2 w-full">
        {locale === 'mn' ? nameMn : nameEn}
      </p>
    </motion.div>
  )
}

export default function Partners() {
  const { t, locale } = useLanguage()
  const ref    = useRef<HTMLDivElement>(null)
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
            <p className="text-gold/70 text-xs font-black tracking-[0.5em] uppercase">Global Coalition</p>
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
          <p className="text-white/30 text-xs font-black tracking-[0.45em] uppercase">
            {locale === 'mn' ? 'Стратегийн түнш байгууллагууд' : 'Strategic Partners'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {STRATEGIC.map((p, i) => (
              <LogoCard key={p.logo} {...p} delay={0.2 + i * 0.08} locale={locale} />
            ))}
          </div>
        </motion.div>

        {/* Collaborating partners */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="space-y-5"
        >
          <p className="text-white/30 text-xs font-black tracking-[0.45em] uppercase">
            {locale === 'mn' ? 'Хамтрагч байгууллагууд' : 'Collaborating Partners'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {COLLABORATORS.map((p, i) => (
              <LogoCard key={p.logo} {...p} delay={0.4 + i * 0.08} locale={locale} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
