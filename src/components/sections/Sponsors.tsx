'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

// ── 6 value propositions ─────────────────────────────────────────────────────
const VALUES = [
  {
    n: '01',
    color: '#D4AF37',
    titleMn: 'БОНЗ / ESG оролцоо',
    titleEn: 'ESG Participation',
    tagMn: 'Тайлан, нийгмийн нөлөөлөл, бодит кейс',
    tagEn: 'Reporting, social impact, real cases',
    bodyMn: 'Цөлжилт, газрын доройтол, уур амьсгалын сорилтын эсрэг бодит оролцоо бий болгоно. ESG тайландаа оруулах бодит кейс, бодит түүх, бодит үр дүнтэй болно.',
    bodyEn: 'Build real participation against desertification and land degradation. Gain concrete case studies and measurable outcomes to include in your ESG / sustainability reporting.',
  },
  {
    n: '02',
    color: '#FF6B35',
    titleMn: 'Медиа ба контентын харагдац',
    titleEn: 'Media & Content Visibility',
    tagMn: '120 хоногийн өндөр давтамжтай visibility',
    tagEn: '120 days of high-frequency visibility',
    bodyMn: 'Өдөр тутмын сошиал контентод тогтмол байрших. Централ ТВ-ийн тусгай нэвтрүүлэгт оролцоо, 2 бүрэн хэмжээний баримтат кино, фото үзэсгэлэн болон хэвлэлийн агуулгад олон давтамжтай харагдах.',
    bodyEn: 'Daily social content placement, Central TV specials, two full-length documentaries, photo exhibitions, and press coverage — all within a single 120-day campaign window.',
  },
  {
    n: '03',
    color: '#E34234',
    titleMn: 'Брэндийн онцгой өгүүлэмж',
    titleEn: 'Brand Differentiation',
    tagMn: 'Түүх, маршрут, агуулгатай холбогдсон өвөрмөц positioning',
    tagEn: 'Unique positioning tied to a real story and route',
    bodyMn: 'Брэндийг тодорхой маршрут, өртөө, агуулга, үнэ цэнэ, түүхтэй холбох. Компанийг өөрчлөлтийн оролцогч, тодорхой мессежийн эзэн болгон харуулах.',
    bodyEn: 'Link your brand to a specific leg of the route, a story, a value. Position your company as a change-maker with a distinct, ownable message.',
  },
  {
    n: '04',
    color: '#C9A84C',
    titleMn: 'Нэр хүнд',
    titleEn: 'Reputation',
    tagMn: 'Үндэсний болон олон улсын public image өснө',
    tagEn: 'National and international public image growth',
    bodyMn: 'Монгол Улсын олон улсын манлайллыг дэмжигч байгууллага болж харагдана. Уур амьсгал, цөлжилт, тогтвортой хөгжлийн олон улсын яриа хэлэлцээнд нэр холбогдоно.',
    bodyEn: 'Be seen as an organisation supporting Mongolia\'s international leadership. Your name becomes associated with climate, desertification, and sustainable development on a global stage.',
  },
  {
    n: '05',
    color: '#2D7A4F',
    titleMn: 'Сүлжээ ба түншлэл',
    titleEn: 'Network & Partnerships',
    tagMn: 'Төр, олон улс, бизнес, шинжлэх ухаантай холбогдоно',
    tagEn: 'Connect with government, international bodies, science',
    bodyMn: 'Төрийн байгууллагуудтай бодлогын түвшний хамтын ажиллагаанд ойртох. Олон улсын байгууллага, шинжлэх ухаан, инноваци, тогтвортой хөгжлийн яриа хэлэлцээнд оролцох.',
    bodyEn: 'Gain access to policy-level government collaboration and international organisations. Join the conversation on innovation, science, and sustainable development.',
  },
  {
    n: '06',
    color: '#4CAF50',
    titleMn: 'Маркетингтэй уялдах ашиглалт',
    titleEn: 'Marketing Alignment',
    tagMn: 'ESG, PR, campaign, employer branding-д ашиглана',
    tagEn: 'ESG, PR, campaigns, employer branding',
    bodyMn: 'Жилийн БОНЗ / ESG тайландаа бодит кейс болгон тусгах. PR болон дотоод ажилтнуудын идэвхжүүлэлт, employer branding, corporate culture-д ашиглах.',
    bodyEn: 'Use the participation as a real case in your annual ESG report. Apply the content across PR, employer branding, internal engagement, and corporate culture.',
  },
] as const

// ── Sponsorship tiers ─────────────────────────────────────────────────────────
type Tier = {
  label: string
  labelEn: string
  tag: string
  tagEn: string
  slots: string
  slotsEn: string
  price: string
  priceEn: string
  color: string
  featured?: boolean
  benefitsMn: string[]
  benefitsEn: string[]
}

const TIERS: Tier[] = [
  {
    label: 'ЕРӨНХИЙ ИВЭЭН ТЭТГЭГЧ',
    labelEn: 'TITLE SPONSOR',
    tag: 'Төслийн хамгийн өндөр түвшний стратегийн түнш',
    tagEn: "The project's highest-level strategic partner",
    slots: '3 байгууллага',
    slotsEn: '3 organisations',
    price: '500 сая₮',
    priceEn: '500M MNT',
    color: '#D4AF37',
    featured: true,
    benefitsMn: [
      'Төслийн үндсэн стратегийн хамтрагчийн статустайгаар харагдана',
      '120 хоногийн экспедицийн гол агуулга, гол тайз, гол маршрутад дээд түвшний байршуулалт авна',
      'Өдөр тутмын сошиал, 7 хоногийн тойм, баримтат кино, шууд дамжуулалт, хэвлэлд хамгийн өндөр түвшинд тусгагдана',
      'Централ ТВ-ийн тусгай нэвтрүүлэгт гол түншийн түвшинд онцгойлон орно',
      'Тусгай PR, брэнд өгүүлэмж, өндөр түвшний сүлжээний боломжтой',
    ],
    benefitsEn: [
      'Positioned as the main strategic partner of the project',
      'Top-tier placement in key content, stages, and routes across the full 120-day expedition',
      'Highest-level coverage in daily social, weekly reviews, documentaries, live streams, and press',
      'Featured as lead partner in Central TV special programmes',
      'Dedicated PR, brand narrative, and premium networking opportunities',
    ],
  },
  {
    label: 'СТРАТЕГИЙН ТҮНШ',
    labelEn: 'STRATEGIC PARTNER',
    tag: 'Тодорхой агуулга, чиглэл, бүс нутагтай нэр холбогдох premium түншлэл',
    tagEn: 'Premium partnership linked to specific content, direction, and region',
    slots: '5 байгууллага',
    slotsEn: '5 organisations',
    price: '300 сая₮',
    priceEn: '300M MNT',
    color: '#FF6B35',
    benefitsMn: [
      'Спорт, шинжлэх ухаан, залуучууд, контент, бүс нутгийн хамтын ажиллагааны тодорхой нэг бүрэлдэхүүнтэй нэрээ холбох боломжтой',
      'Өдөр тутмын сошиал, 7 хоногийн тойм, медиа контент, форум, тусгай танилцуулгад өндөр түвшинд тусгагдана',
      'Централ ТВ болон төслийн тойм контентод стратегийн түншийн хувиар орно',
      'ESG болон маркетингийн зорилготой уялдах тусгай агуулга ашиглах боломжтой',
    ],
    benefitsEn: [
      'Link your name to a specific component: sport, science, youth, content, or regional cooperation',
      'Featured at high level in daily social, weekly reviews, media content, forums, and special presentations',
      'Included as strategic partner in Central TV and project summary content',
      'Access to bespoke content aligned with your ESG and marketing goals',
    ],
  },
  {
    label: 'АЛБАН ЁСНЫ ТҮНШ',
    labelEn: 'OFFICIAL PARTNER',
    tag: 'Тогтмол харагдацтай, албан ёсны брэнд түншлэл',
    tagEn: 'Official brand partnership with consistent visibility',
    slots: '10 байгууллага',
    slotsEn: '10 organisations',
    price: '150 сая₮',
    priceEn: '150M MNT',
    color: '#FF6B35',
    benefitsMn: [
      'Төслийн танилцуулга, хэвлэл, сошиал, өдөр тутмын пост, фото, видео агуулгад албан ёсны түншийн хэлбэрээр оролцоно',
      'Тодорхой маршрут, үйл ажиллагаа, өдөр тутмын контентод тусгагдана',
      '7 хоногийн тойм болон нэгдсэн сурталчилгаанд тогтмол тусгагдана',
      'Централ ТВ-ийн тусгай нэвтрүүлэгт албан ёсны түншийн хүрээнд дурдагдана',
      'Маркетинг, PR, ESG-д ашиглах бодит кейс бүрдүүлнэ',
    ],
    benefitsEn: [
      'Participation as official partner in all project presentations, press, social, daily posts, photos, and video content',
      'Included in specific route segments, events, and daily content',
      'Regular inclusion in weekly reviews and joint promotional materials',
      'Mentioned as official partner in Central TV special programmes',
      'Real cases generated for use in marketing, PR, and ESG reporting',
    ],
  },
  {
    label: 'ӨРТӨӨНИЙ ТҮНШ',
    labelEn: 'CHECKPOINT PARTNER',
    tag: 'Тодорхой байршил, өртөөтэй холбогдох сэдэвчилсэн оролцоо',
    tagEn: 'Themed participation tied to a specific checkpoint or location',
    slots: '50 байгууллага',
    slotsEn: '50 organisations',
    price: '50 сая₮',
    priceEn: '50M MNT',
    color: '#C9A84C',
    benefitsMn: [
      'Экспедицийн тодорхой өртөө, байршил, маршрут, сэдэвчилсэн хэсгийг ивээн тэтгэнэ',
      'Тухайн цэгийн фото, видео, пост, өдрийн тэмдэглэлд нэрээ тусгуулна',
      '"Энэ өртөөг дэмжигч" гэсэн ойлгомжтой брэнд холболт үүсгэнэ',
    ],
    benefitsEn: [
      'Sponsor a specific checkpoint, location, or route segment of the expedition',
      'Name included in that point\'s photos, videos, posts, and daily diary',
      'Clear "Checkpoint Supporter" brand association created',
    ],
  },
  {
    label: 'ДЭМЖИГЧ БАЙГУУЛЛАГА',
    labelEn: 'SUPPORTING ORGANISATION',
    tag: 'Санхүүгийн болон бүтээгдэхүүн, үйлчилгээний бодит дэмжлэг',
    tagEn: 'Financial, product, or service support',
    slots: '',
    slotsEn: '',
    price: '25 сая₮ эсвэл бараа/үйлчилгээ',
    priceEn: '25M MNT or in-kind',
    color: '#4CAF50',
    benefitsMn: [
      'Санхүү, бүтээгдэхүүн, үйлчилгээ, техник, логистик, даатгал, эрүүл мэнд, хоол хүнсээр оролцоно',
      'Төслийн албан ёсны дэмжигчээр танилцуулагдана',
      'Нэр, лого дэмжигчдийн хэсэгт байршуулна',
      'Өдөр тутмын болон нэгдсэн контентын зохих хэсэгт дурдагдана',
      'Нийлүүлсэн бараа, үйлчилгээ нь бодит оролцооны кейс болно',
    ],
    benefitsEn: [
      'Participate via finance, products, services, tech, logistics, insurance, health, or food & equipment',
      'Introduced as an official supporter of the project',
      'Name and logo placed in the supporters section',
      'Mentioned in relevant sections of daily and consolidated content',
      'Supplied goods or services become a real-world participation case study',
    ],
  },
]

function ValueCard({ v, index, inView }: { v: typeof VALUES[number]; index: number; inView: boolean }) {
  const { locale } = useLanguage()
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09 + 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 border border-white/8 rounded-xl bg-white/[0.025] group hover:border-white/20 transition-colors duration-300"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-6 right-6 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${v.color}80, transparent)` }} />

      <div className="flex items-start gap-4 mb-4">
        <span className="text-[11px] font-black tracking-[0.4em]" style={{ color: v.color }}>{v.n}</span>
        <div>
          <h3 className="font-black text-white text-sm leading-tight">{locale === 'mn' ? v.titleMn : v.titleEn}</h3>
          <p className="text-[10px] tracking-wider mt-0.5" style={{ color: v.color + 'cc' }}>
            {locale === 'mn' ? v.tagMn : v.tagEn}
          </p>
        </div>
      </div>

      <p className="text-white/45 text-xs leading-relaxed">
        {locale === 'mn' ? v.bodyMn : v.bodyEn}
      </p>
    </motion.div>
  )
}

function TierCard({ tier, index, inView }: { tier: Tier; index: number; inView: boolean }) {
  const { locale } = useLanguage()
  const benefits = locale === 'mn' ? tier.benefitsMn : tier.benefitsEn
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 + 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl border overflow-hidden ${tier.featured ? 'bg-white/[0.06]' : 'bg-white/[0.025]'}`}
      style={{ borderColor: tier.featured ? tier.color + '70' : 'rgba(255,255,255,0.08)' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}40, transparent)` }} />

      {tier.featured && (
        <div
          className="absolute top-4 right-4 text-[9px] font-black tracking-[0.4em] uppercase px-3 py-1 rounded-full"
          style={{ background: tier.color + '25', color: tier.color }}
        >
          Top Tier
        </div>
      )}

      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3
                className="text-[clamp(16px,2vw,22px)] font-black tracking-wide"
                style={{ color: tier.color }}
              >
                {locale === 'mn' ? tier.label : tier.labelEn}
              </h3>
              <p className="text-white/40 text-xs mt-1">
                {locale === 'mn' ? tier.tag : tier.tagEn}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[clamp(20px,2.5vw,32px)] font-black leading-none" style={{ color: tier.color }}>
                {locale === 'mn' ? tier.price : tier.priceEn}
              </div>
              {tier.slots && (
                <div className="text-white/30 text-[10px] font-bold tracking-wider mt-1 uppercase">
                  {locale === 'mn' ? tier.slots : tier.slotsEn}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, ${tier.color}30, transparent)` }} />

        {/* Benefits */}
        <ul className="space-y-2.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-white/55 text-sm leading-relaxed">
              <span className="shrink-0 mt-1 w-1 h-1 rounded-full" style={{ background: tier.color }} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function Sponsors() {
  const { locale } = useLanguage()
  const headerRef  = useRef<HTMLDivElement>(null)
  const valuesRef  = useRef<HTMLDivElement>(null)
  const tiersRef   = useRef<HTMLDivElement>(null)

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' })
  const tiersInView  = useInView(tiersRef,  { once: true, margin: '-80px' })

  return (
    <section id="sponsors" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-3xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-0.5 bg-gold/60" />
              <span className="text-gold/60 text-[10px] font-black tracking-[0.55em] uppercase">
                {locale === 'mn' ? 'Оролцооны загвар' : 'Partnership Model'}
              </span>
            </div>

            <h2 className="text-[clamp(40px,7vw,96px)] font-black text-white leading-[0.9] tracking-[-0.02em]">
              {locale === 'mn' ? (
                <>КОМПАНИУДЫН<br />ОРОЛЦОО</>
              ) : (
                <>PARTNER<br />WITH US</>
              )}
            </h2>

            <p className="text-white/50 text-[clamp(13px,1.3vw,16px)] leading-[1.75] max-w-2xl">
              {locale === 'mn'
                ? 'Ийм хэмжээний олон улсын санаачилга нь Монгол Улсын нэрийн өмнөөс хэрэгжих, олон талын оролцоонд тулгуурласан үндэсний түвшний түншлэлийн загвар юм. Энэ төсөлд нэгдэж буй байгууллага нь зөвхөн санхүүгийн дэмжигч биш — Монгол Улсын стратегийн санаачилгын хамтрагч, бодит байр суурь илэрхийлэгч, брэндийн шинэ түүх бүтээгч байх болно.'
                : 'An international initiative of this scale — implemented under Mongolia\'s name, built on multi-stakeholder collaboration — represents a national-level partnership model. Joining is not just financial support: you become a strategic partner of Mongolia\'s initiative, a genuine voice on climate and sustainability, and the author of a new brand story.'
              }
            </p>

            <p className="text-white/30 text-sm italic border-l-2 border-gold/30 pl-4">
              {locale === 'mn'
                ? '"Voice of the Desert" төсөлд нэгдэх нь зардал биш, харин брэнд, нэр хүнд, нийгмийн үнэ цэнэ, стратегийн байр сууринд хийж буй хөрөнгө оруулалт болно.'
                : 'Joining "Voice of the Desert" is not a cost — it is an investment in brand, reputation, social value, and strategic positioning.'
              }
            </p>
          </motion.div>
        </div>

        {/* ── 6 Value propositions ────────────────────────────────────────────── */}
        <div ref={valuesRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="flex items-center gap-4">
              <div className="w-8 h-0.5 bg-white/20" />
              <span className="text-white/30 text-[10px] font-black tracking-[0.55em] uppercase">
                {locale === 'mn' ? 'Компаниудын оролцооны үнэ цэн' : 'Value of Company Participation'}
              </span>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <ValueCard key={v.n} v={v} index={i} inView={valuesInView} />
            ))}
          </div>
        </div>

        {/* ── Tiers ───────────────────────────────────────────────────────────── */}
        <div ref={tiersRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={tiersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between gap-8 flex-wrap"
          >
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-8 h-0.5 bg-white/20" />
                <span className="text-white/30 text-[10px] font-black tracking-[0.55em] uppercase">
                  {locale === 'mn' ? 'Оролцооны түвшин' : 'Participation Tiers'}
                </span>
              </div>
              <h3 className="text-[clamp(24px,4vw,48px)] font-black text-white leading-tight">
                {locale === 'mn' ? 'Үнэ цэнийн багц' : 'Sponsorship Packages'}
              </h3>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {TIERS.map((tier, i) => (
              <TierCard key={tier.label} tier={tier} index={i} inView={tiersInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
