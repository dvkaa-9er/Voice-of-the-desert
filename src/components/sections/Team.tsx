'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { TEAM } from '@/lib/constants'

type TeamMember = (typeof TEAM)[0]

function MemberCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  const { t, locale } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col"
    >
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4 border border-white/8 group-hover:border-vermilion/30 transition-colors duration-300">
        <Image
          src={member.image}
          alt={locale === 'mn' ? member.name : member.nameEn}
          fill
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 17vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="text-[11px] font-black tracking-[0.3em] uppercase text-vermilion/80">
            {t(member.roleKey)}
          </span>
        </div>
      </div>

      {/* Name + bio */}
      <h3 className="text-white font-black text-base leading-tight group-hover:text-vermilion transition-colors duration-300">
        {locale === 'mn' ? member.name : member.nameEn}
      </h3>
      <p className="text-white/40 text-sm mt-1.5 leading-relaxed">
        {locale === 'mn' ? member.descriptionMn : member.descriptionEn}
      </p>
    </motion.div>
  )
}

export default function Team() {
  const { t }  = useLanguage()
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="team" ref={ref} className="relative py-16 md:py-24 px-6 md:px-12">
      <div
        className="absolute top-1/2 right-[-0.05em] -translate-y-1/2 font-black leading-none select-none pointer-events-none text-white/[0.025]"
        style={{ fontSize: 'clamp(140px,20vw,280px)' }}
      >
        05
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-3 mb-14"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-vermilion/60" />
            <p className="text-gold/70 text-xs font-black tracking-[0.5em] uppercase">Leadership</p>
          </div>
          <h2
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(36px,6vw,80px)' }}
          >
            {t('team.title')}
          </h2>
          <p className="text-white/50 text-base max-w-md">{t('team.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {TEAM.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
