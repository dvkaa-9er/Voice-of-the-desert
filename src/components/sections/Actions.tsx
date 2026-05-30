'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const PILLARS = [
  {
    key: 'motion' as const,
    index: '01',
    icon: '🏃',
    word: 'MOTION',
    color: '#E03D1E',   // Brand: Vermilion — highest visibility
    colorB: '#FF6B35',
    stats: [
      { valueMn: 'Тэсвэр', valueEn: 'Endurance',    descMn: 'Хүний тэсвэрийн хязгаар',        descEn: 'Human endurance limits' },
      { valueMn: 'Байгаль', valueEn: 'Nature',      descMn: 'Хатуу байгалийн нөхцөл',         descEn: 'Harsh natural conditions' },
      { valueMn: 'Холбоо',  valueEn: 'Connection',  descMn: 'Хил дамнасан нэгдэл',            descEn: 'Cross-border unity' },
    ],
  },
  {
    key: 'science' as const,
    index: '02',
    icon: '🔬',
    word: 'SCIENCE',
    color: '#1E5855',   // Brand: Basin Teal — rigour & depth
    colorB: '#2D9C8C',
    stats: [
      { valueMn: 'Байгаль', valueEn: 'Environment', descMn: 'Байгаль орчны судалгаа',         descEn: 'Environmental research' },
      { valueMn: 'Нийгэм',  valueEn: 'Society',     descMn: 'Нийгмийн нөлөөллийн судалгаа',  descEn: 'Social impact research' },
      { valueMn: 'Эдийн засаг', valueEn: 'Economy', descMn: 'Эдийн засгийн дүн шинжилгээ',   descEn: 'Economic analysis' },
    ],
  },
  {
    key: 'voice' as const,
    index: '03',
    icon: '🎬',
    word: 'VOICE',
    color: '#C8841A',   // Brand: Ochre — warmth & story
    colorB: '#E8A030',
    stats: [
      { valueMn: 'Кино',    valueEn: 'Film',        descMn: '4K баримтат кино',               descEn: '4K documentary' },
      { valueMn: 'Фото',    valueEn: 'Photo',       descMn: 'Олон улсын фото төсөл',          descEn: 'International photo project' },
      { valueMn: 'Контент', valueEn: 'Content',     descMn: 'Өдөр тутмын сошиал медиа',      descEn: 'Daily social media' },
    ],
  },
] as const

function PillarCard({ pillar, index, inView }: { pillar: typeof PILLARS[number]; index: number; inView: boolean }) {
  const { t, locale } = useLanguage()
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12 + 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border overflow-hidden flex flex-col"
      style={{ borderColor: open ? pillar.color + '60' : 'rgba(255,255,255,0.1)' }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${pillar.color}, ${pillar.colorB})` }} />

      {/* Card header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start gap-4 p-6 text-left w-full group"
      >
        <span className="text-3xl mt-0.5">{pillar.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black tracking-[0.4em]" style={{ color: pillar.color }}>{pillar.index}</span>
          </div>
          <h3 className="text-white font-black text-xl leading-tight">
            DESERT {pillar.word}
          </h3>
          <p className="font-semibold text-sm mt-1" style={{ color: pillar.color }}>
            {t(`actions.${pillar.key}.subtitle`)}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/30 text-xl shrink-0 mt-1"
        >
          +
        </motion.span>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">
              {/* Divider */}
              <div className="h-px" style={{ background: `linear-gradient(90deg, ${pillar.color}40, transparent)` }} />

              {/* Description */}
              <p className="text-white/70 text-sm leading-[1.75]">
                {t(`actions.${pillar.key}.desc`)}
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {pillar.stats.map((s, si) => (
                  <div key={si} className="rounded-xl p-3 text-center" style={{ background: pillar.color + '12' }}>
                    <div className="font-black text-sm leading-tight text-white">
                      {locale === 'mn' ? s.valueMn : s.valueEn}
                    </div>
                    <div className="text-[10px] text-white/45 mt-1 leading-snug">
                      {locale === 'mn' ? s.descMn : s.descEn}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tag */}
              <p className="text-white/45 text-xs leading-relaxed italic border-l-2 pl-3"
                 style={{ borderColor: pillar.color + '60' }}>
                {t(`actions.${pillar.key}.tag`)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Actions() {
  const { t, locale } = useLanguage()
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="actions" ref={ref} className="relative py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ── Section header ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-white/20" />
            <span className="text-white/35 text-[10px] font-black tracking-[0.5em] uppercase">Initiative Framework</span>
          </div>
          <h2 className="text-[clamp(32px,5.5vw,64px)] font-black text-white leading-[0.92] tracking-[-0.02em]">
            {t('actions.title')}
          </h2>
          <p className="text-white/55 text-[clamp(14px,1.3vw,17px)] leading-relaxed max-w-2xl">
            {locale === 'mn'
              ? 'Дараах гурван тулгуур тус бүр нь бие даасан агуулга, үр дүнтэй боловч хамтдаа нэгдсэн нөлөөллийг бий болгоно.'
              : 'Each pillar operates independently with distinct outcomes — together they create a unified, compounding impact.'
            }
          </p>
        </motion.div>

        {/* ── Three pillar cards ───────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.key} pillar={p} index={i} inView={inView} />
          ))}
        </div>

      </div>
    </section>
  )
}
