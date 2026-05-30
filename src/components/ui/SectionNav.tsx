'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',    label: 'About' },
  { id: 'actions',  label: 'Pillars' },
  { id: 'team',     label: 'Team' },
  { id: 'partners', label: 'Partners' },
  { id: 'sponsors', label: 'Sponsors' },
  { id: 'contact',  label: 'Contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3 items-end"
      onMouseLeave={() => setHovered(null)}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            onMouseEnter={() => setHovered(id)}
            className="group flex items-center gap-3 relative"
            aria-label={label}
          >
            {/* Label tooltip */}
            <AnimatePresence>
              {hovered === id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.18 }}
                  className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 select-none pointer-events-none"
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.span
              animate={{
                width:  isActive ? 20 : 6,
                opacity: isActive ? 1 : 0.3,
                background: isActive ? '#D4AF37' : '#ffffff',
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block h-[3px] rounded-full"
              style={{ minWidth: 6 }}
            />
          </button>
        )
      })}
    </div>
  )
}
