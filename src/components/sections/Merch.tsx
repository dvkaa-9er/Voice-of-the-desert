'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const ITEMS = [
  {
    icon: '👕',
    labelEn: 'Expedition Tee',
    labelMn: 'Экспедицийн цамц',
    descEn: 'Merino–cotton blend, route map print',
    descMn: 'Меринос-хөвөн, маршрутын хэвлэл',
    color: '#E03D1E',
  },
  {
    icon: '🧢',
    labelEn: 'Desert Cap',
    labelMn: 'Цөлийн малгай',
    descEn: 'UV-rated, embroidered logo',
    descMn: 'UV хамгаалалттай, оёмол лого',
    color: '#C8841A',
  },
  {
    icon: '🖼️',
    labelEn: 'Art Prints',
    labelMn: 'Урлагийн хэвлэл',
    descEn: 'Limited-edition expedition photography',
    descMn: 'Хязгаарлагдмал тооны экспедицийн фото',
    color: '#C9A84C',
  },
  {
    icon: '🎒',
    labelEn: 'Trail Pack',
    labelMn: 'Явган аялалын уут',
    descEn: '25 L ultralight, desert-tested',
    descMn: '25 л хэт хөнгөн, цөлд туршсан',
    color: '#2D7A4F',
  },
] as const

export default function Merch() {
  const { locale } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMn = locale === 'mn'

  return (
    <section id="merch" ref={ref} className="relative py-28 px-6 md:px-12 overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#E03D1E]/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-14 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gold/60" />
              <p className="text-gold/70 text-[10px] font-black tracking-[0.5em] uppercase">
                {isMn ? 'Экспедицийн цуглуулга' : 'Expedition Collection'}
              </p>
            </div>
            <h2 className="text-[clamp(40px,7vw,96px)] font-black text-white leading-[0.9] tracking-[-0.02em]">
              {isMn ? (
                <>ЦӨЛИЙН<br /><span className="text-gradient-gold">БАРАА</span></>
              ) : (
                <>DESERT<br /><span className="text-gradient-gold">MERCH</span></>
              )}
            </h2>
            <p className="text-white/45 text-sm md:text-base leading-relaxed max-w-lg">
              {isMn
                ? 'Хязгаарлагдмал тооны экспедицийн хувцас, урлагийн хэвлэл, тоног төхөөрөмж. Дэлгүүр тун удахгүй нээгдэнэ.'
                : 'Limited-edition apparel, art prints, and expedition gear — each piece carries the story of 12,000 km across Eurasia. Shop opening soon.'}
            </p>
          </div>

          {/* CTA — desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:flex flex-col items-end gap-3 shrink-0"
          >
            <Link href="/shop">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] font-black tracking-widest uppercase text-[#0A0A0F]"
                style={{ background: '#E03D1E' }}
              >
                {isMn ? 'Дэлгүүр харах' : 'View Shop'}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </Link>
            <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">
              {isMn ? 'Мэдэгдэл авахаар бүртгүүлнэ үү' : 'Register for launch notification'}
            </span>
          </motion.div>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ITEMS.map(({ icon, labelEn, labelMn, descEn, descMn, color }, i) => (
            <motion.div
              key={labelEn}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden p-6 flex flex-col gap-4 hover:border-white/20 transition-colors duration-300"
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60"
                style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
              />

              {/* Icon */}
              <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">
                {icon}
              </span>

              {/* Text */}
              <div className="space-y-1">
                <p className="text-white font-black text-sm tracking-wide leading-tight">
                  {isMn ? labelMn : labelEn}
                </p>
                <p className="text-white/35 text-[11px] leading-snug">
                  {isMn ? descMn : descEn}
                </p>
              </div>

              {/* Coming soon pill */}
              <div
                className="self-start text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
                style={{ background: color + '18', color: color + 'cc' }}
              >
                {isMn ? 'Тун удахгүй' : 'Coming Soon'}
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}0d 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA — mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex md:hidden flex-col items-center gap-3 pt-2"
        >
          <Link href="/shop" className="w-full">
            <motion.span
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2.5 w-full rounded-full px-7 py-3.5 text-[11px] font-black tracking-widest uppercase text-[#0A0A0F]"
              style={{ background: '#E03D1E' }}
            >
              {isMn ? 'Дэлгүүр харах' : 'View Shop'}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </Link>
          <span className="text-white/25 text-[10px] tracking-[0.25em] uppercase">
            {isMn ? 'Мэдэгдэл авахаар бүртгүүлнэ үү' : 'Register for launch notification'}
          </span>
        </motion.div>

      </div>
    </section>
  )
}
