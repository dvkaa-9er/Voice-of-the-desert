'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { NEWS, CATEGORY_COLOR, type NewsCategory } from '@/lib/constants'

const CATEGORY_LABEL: Record<NewsCategory, { en: string; mn: string }> = {
  expedition: { en: 'Expedition', mn: 'Экспедиц' },
  science:    { en: 'Science',    mn: 'Шинжлэх ухаан' },
  media:      { en: 'Media',      mn: 'Медиа' },
  press:      { en: 'Press',      mn: 'Хэвлэл' },
}

function formatDate(iso: string, locale: 'en' | 'mn') {
  const d = new Date(iso)
  return d.toLocaleDateString(locale === 'mn' ? 'mn-MN' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function News() {
  const { locale } = useLanguage()
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isMn   = locale === 'mn'

  return (
    <section id="news" ref={ref} className="relative py-16 md:py-24 px-6 md:px-12 overflow-hidden">

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-vermilion/4 blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-vermilion/60" />
              <p className="text-vermilion/70 text-[10px] font-black tracking-[0.5em] uppercase">
                {isMn ? 'Экспедицийн мэдээ' : 'Expedition Updates'}
              </p>
            </div>
            <h2 className="text-[clamp(32px,5.5vw,64px)] font-black text-white leading-tight tracking-tight">
              {isMn ? 'Сүүлийн мэдээ' : 'Latest News'}
            </h2>
          </div>

          {/* Category legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {(Object.keys(CATEGORY_COLOR) as NewsCategory[]).map(cat => (
              <span
                key={cat}
                className="flex items-center gap-1.5 text-[9px] font-black tracking-[0.25em] uppercase px-2.5 py-1 rounded-full"
                style={{ background: CATEGORY_COLOR[cat] + '18', color: CATEGORY_COLOR[cat] }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: CATEGORY_COLOR[cat] }} />
                {CATEGORY_LABEL[cat][isMn ? 'mn' : 'en']}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Card grid — horizontal scroll on mobile, 3-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...NEWS].map((item, i) => {
            const color = CATEGORY_COLOR[item.category]
            const label = CATEGORY_LABEL[item.category][isMn ? 'mn' : 'en']
            const title = isMn ? item.titleMn : item.titleEn
            const excerpt = isMn ? item.excerptMn : item.excerptEn

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden flex flex-col hover:border-white/20 transition-colors duration-300"
              >
                {/* Top colour bar */}
                <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}40)` }} />

                <div className="p-5 flex flex-col gap-3 flex-1">
                  {/* Meta row */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[9px] font-black tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
                      style={{ background: color + '18', color }}
                    >
                      {label}
                    </span>
                    <time className="text-white/30 text-[10px] font-medium">
                      {formatDate(item.date, locale)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-white text-sm leading-snug group-hover:text-white/90 transition-colors">
                    {title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/45 text-xs leading-relaxed flex-1">
                    {excerpt}
                  </p>

                  {/* Read more + Instagram share */}
                  <div className="flex items-center justify-between pt-1 mt-auto">
                    <a
                      href={item.href}
                      className="flex items-center gap-1.5 text-[10px] font-black tracking-widest uppercase transition-colors duration-200"
                      style={{ color }}
                    >
                      {isMn ? 'Дэлгэрэнгүй' : 'Read more'}
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>

                    {/* Share to Instagram story */}
                    <button
                      onClick={() => shareToInstagram({ title, excerpt, date: item.date, category: label, color })}
                      title={isMn ? 'Instagram story-д хуваалцах' : 'Share as Instagram Story'}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-[9px] font-black tracking-widest uppercase"
                    >
                      <InstagramIcon />
                      <span>{isMn ? 'Story' : 'Story'}</span>
                    </button>
                  </div>
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}0a 0%, transparent 65%)` }}
                />
              </motion.article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

// ── Instagram Story share ────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

interface ShareArgs {
  title: string
  excerpt: string
  date: string
  category: string
  color: string
}

function shareToInstagram({ title, excerpt, date, category, color }: ShareArgs) {
  const canvas = document.createElement('canvas')
  canvas.width  = 1080
  canvas.height = 1920
  const ctx = canvas.getContext('2d')!

  const VERMILION = '#E03D1E'
  const BONE      = '#EDE8DC'
  const INK       = '#050508'

  // ── Background ──────────────────────────────────────────────────────────────
  ctx.fillStyle = INK
  ctx.fillRect(0, 0, 1080, 1920)

  // Atmosphere: faint radial glow centred on content
  const atmos = ctx.createRadialGradient(540, 800, 0, 540, 800, 850)
  atmos.addColorStop(0, color + '1a')
  atmos.addColorStop(1, 'transparent')
  ctx.fillStyle = atmos
  ctx.fillRect(0, 0, 1080, 1920)

  // ── Dune silhouettes (bottom) ───────────────────────────────────────────────
  ctx.fillStyle = color + '0e'
  ctx.beginPath()
  ctx.moveTo(0, 1920)
  ctx.bezierCurveTo(220, 1680, 460, 1600, 540, 1640)
  ctx.bezierCurveTo(640, 1680, 860, 1580, 1080, 1650)
  ctx.lineTo(1080, 1920)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = color + '07'
  ctx.beginPath()
  ctx.moveTo(0, 1920)
  ctx.bezierCurveTo(160, 1760, 360, 1720, 480, 1760)
  ctx.bezierCurveTo(620, 1800, 820, 1730, 1080, 1800)
  ctx.lineTo(1080, 1920)
  ctx.closePath()
  ctx.fill()

  // ── Decorative bars (outside safe zone — purely visual) ────────────────────
  ctx.fillStyle = VERMILION
  ctx.fillRect(0, 0, 1080, 7)
  ctx.fillRect(0, 1913, 1080, 7)

  // ── SAFE ZONE: Y 250 – 1670 ─────────────────────────────────────────────────

  // ── Brand header (Y 265 – 455) ──────────────────────────────────────────────
  ctx.fillStyle = 'rgba(237,232,220,0.35)'
  ctx.font = 'bold 19px monospace'
  ctx.textAlign = 'left'
  ctx.fillText('SPORT · SCIENCE · MEDIA', 80, 285)

  ctx.fillStyle = BONE
  ctx.font = 'bold 58px Georgia, serif'
  ctx.fillText('VOICE OF THE DESERT', 80, 370)

  ctx.fillStyle = 'rgba(237,232,220,0.42)'
  ctx.font = '24px monospace'
  ctx.fillText('Run the route. Read the land. Raise the voice.', 80, 412)

  ctx.fillStyle = VERMILION
  ctx.fillRect(80, 438, 920, 2)

  // ── News meta row (Y 460 – 520) ─────────────────────────────────────────────
  ctx.fillStyle = color + '28'
  roundRect(ctx, 80, 462, 230, 50, 25)
  ctx.fillStyle = color
  ctx.font = 'bold 20px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(category.toUpperCase(), 116, 493)

  ctx.fillStyle = 'rgba(237,232,220,0.35)'
  ctx.font = '22px monospace'
  ctx.textAlign = 'right'
  ctx.fillText(
    new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    1000, 493,
  )

  // ── News title (Y 570 – 810) ─────────────────────────────────────────────────
  ctx.fillStyle = BONE
  ctx.font = 'bold 64px Georgia, serif'
  ctx.textAlign = 'left'
  wrapText(ctx, title, 80, 600, 920, 82)

  ctx.fillStyle = color
  ctx.fillRect(80, 820, 100, 3)

  // ── Excerpt (Y 850 – 1040) ───────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(237,232,220,0.60)'
  ctx.font = '34px Georgia, serif'
  wrapText(ctx, excerpt, 80, 872, 920, 52)

  // ── Divider ──────────────────────────────────────────────────────────────────
  ctx.fillStyle = 'rgba(237,232,220,0.07)'
  ctx.fillRect(80, 1080, 920, 1)

  // ── Mission block (Y 1100 – 1420) ────────────────────────────────────────────
  ctx.fillStyle = VERMILION
  ctx.font = 'bold 20px monospace'
  ctx.textAlign = 'left'
  ctx.fillText('TOGETHER AGAINST DESERTIFICATION', 80, 1124)

  ctx.fillStyle = BONE
  ctx.font = 'bold 80px Georgia, serif'
  ctx.fillText('Protect', 80, 1224)
  ctx.fillText('our deserts.', 80, 1316)

  ctx.fillStyle = VERMILION + 'aa'
  ctx.fillRect(80, 1336, 460, 3)

  ctx.fillStyle = color + '20'
  roundRect(ctx, 80, 1360, 360, 48, 8)
  ctx.fillStyle = color
  ctx.font = 'bold 18px monospace'
  ctx.textAlign = 'left'
  ctx.fillText('UNCCD COP17 INITIATIVE', 106, 1391)

  // ── Footer CTA (Y 1470 – 1660) — top of bottom safe zone ────────────────────
  ctx.fillStyle = VERMILION
  ctx.fillRect(80, 1470, 920, 2)

  ctx.fillStyle = BONE
  ctx.font = 'bold 30px monospace'
  ctx.textAlign = 'left'
  ctx.fillText('JOIN THE MISSION  →', 80, 1530)

  ctx.fillStyle = VERMILION
  ctx.font = 'bold 30px monospace'
  ctx.fillText('voiceofdesert.org', 80, 1580)

  ctx.fillStyle = 'rgba(237,232,220,0.25)'
  ctx.font = '20px monospace'
  ctx.fillText('#VoiceOfTheDesert  #StopDesertification  #UNCCD', 80, 1630)

  // ── Export ──────────────────────────────────────────────────────────────────
  canvas.toBlob(async (blob) => {
    if (!blob) return
    const file = new File([blob], 'vod-story.png', { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Voice of the Desert' })
        return
      } catch { /* user cancelled */ }
    }
    const url = URL.createObjectURL(blob)
    const a   = document.createElement('a')
    a.href     = url
    a.download = 'vod-story.png'
    a.click()
    URL.revokeObjectURL(url)
  }, 'image/png')
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
  ctx.fill()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ')
  let line = ''
  let cy = y
  for (const word of words) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy)
      line = word
      cy += lineHeight
    } else {
      line = test
    }
  }
  if (line) ctx.fillText(line, x, cy)
}
