'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'
import { useScroll } from '@/components/providers/ScrollProvider'

const NAV_LINKS = [
  { key: 'about',    id: 'about' },
  { key: 'actions',  id: 'actions' },
  { key: 'team',     id: 'team' },
  { key: 'partners', id: 'partners' },
  { key: 'sponsors', id: 'sponsors' },
  { key: 'contact',  id: 'contact' },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Header({ onDonateClick }: { onDonateClick: () => void }) {
  const { t, locale, toggleLocale } = useLanguage()
  const { scrollY, scrollProgress }  = useScroll()
  const [menuOpen, setMenuOpen]       = useState(false)

  const scrolled  = scrollY > 80
  const nearEnd   = scrollProgress > 0.85  // dark near Contact

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'bg-[#050508]/80 backdrop-blur-xl border-b border-white/6'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

          {/* Logo */}
          <button onClick={() => scrollTo('hero')} className="group flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Voice of the Desert"
              className="h-11 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(({ key, id }) => (
              <button
                key={key}
                onClick={() => scrollTo(id)}
                className="group relative text-white/55 hover:text-white text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors duration-200"
              >
                {t(`nav.${key}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <Link
              href="/shop"
              className="group relative text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors duration-200 flex items-center gap-1.5"
            >
              <span className="text-gold/80 group-hover:text-gold transition-colors duration-200">
                {t('nav.shop')}
              </span>
              <span className="text-[8px] font-black tracking-widest text-orange/70 bg-orange/10 rounded-full px-1.5 py-0.5 leading-none">
                {t('nav.shopBadge')}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* EN / МН */}
            <button
              onClick={toggleLocale}
              className="text-[10px] font-black tracking-[0.3em] px-3 py-1.5 rounded-full border border-white/10 hover:border-gold/40 transition-colors"
            >
              <span className={locale === 'en' ? 'text-gold' : 'text-white/30'}>EN</span>
              <span className="text-white/20 mx-1">/</span>
              <span className={locale === 'mn' ? 'text-gold' : 'text-white/30'}>МН</span>
            </button>

            {/* Donate */}
            <motion.button
              onClick={onDonateClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden rounded-full px-5 py-2.5 text-[11px] font-black tracking-widest uppercase text-white"
              style={{ background: '#E03D1E' }}
            >
              <span className="relative z-10">{t('nav.donate')}</span>
            </motion.button>

            {/* Burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Menu"
            >
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block w-6 h-0.5 bg-white/70 rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                className="block w-4 h-0.5 bg-white/70 rounded-full"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block w-6 h-0.5 bg-white/70 rounded-full origin-center"
              />
            </button>
          </div>
        </div>

        {/* Expedition progress bar */}
        <div className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-gold/60 to-orange/60"
             style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s linear' }} />
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050508]/95 backdrop-blur-2xl flex flex-col items-start justify-center px-10 pt-20"
          >
            {NAV_LINKS.map(({ key, id }, i) => (
              <motion.button
                key={key}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => { scrollTo(id); setMenuOpen(false) }}
                className="text-white/60 hover:text-white font-black text-4xl tracking-tight py-3 transition-colors"
              >
                {t(`nav.${key}`)}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 }}
            >
              <Link
                href="/shop"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-gold font-black text-4xl tracking-tight py-3 hover:text-gold/80 transition-colors"
              >
                {t('nav.shop')}
                <span className="text-[11px] font-black tracking-widest text-orange/80 bg-orange/10 rounded-full px-2 py-1 leading-none self-center">
                  {t('nav.shopBadge')}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
