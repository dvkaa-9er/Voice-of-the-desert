'use client'

import { useState, useEffect } from 'react'
import { LanguageProvider } from '@/components/providers/LanguageProvider'
import { ScrollProvider } from '@/components/providers/ScrollProvider'
import Header from '@/components/navigation/Header'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Actions from '@/components/sections/Actions'
import Team from '@/components/sections/Team'
import Partners from '@/components/sections/Partners'
import Sponsors from '@/components/sections/Sponsors'
import Contact from '@/components/sections/Contact'
import DonationModal from '@/components/ui/DonationModal'
import NoiseOverlay from '@/components/ui/NoiseOverlay'
import CustomCursor from '@/components/ui/CustomCursor'
import Loader from '@/components/ui/Loader'
import SectionNav from '@/components/ui/SectionNav'
import BackToTop from '@/components/ui/BackToTop'
import VideoBackground from '@/components/ui/VideoBackground'

export default function Home() {
  const [donateOpen,   setDonateOpen]   = useState(false)
  const [loaderDone,   setLoaderDone]   = useState(false)
  const [isTouch,      setIsTouch]      = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  return (
    <LanguageProvider>
      <ScrollProvider>
        {/* ── Global UI overlays ──────────────────────────────────────────────── */}
        {/* Animated film grain */}
        <NoiseOverlay />

        {/* Magnetic cursor — desktop only */}
        {!isTouch && <CustomCursor />}

        {/* Opening loader sequence */}
        {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}

        {/* ── Main app ────────────────────────────────────────────────────────── */}
        <div
          className="relative min-h-screen bg-[#050508]"
          style={{ cursor: isTouch ? 'auto' : 'none' }}
        >
          <VideoBackground />

          {/* Scrollable content */}
          <div className="relative z-10">
            <Header onDonateClick={() => setDonateOpen(true)} />

            <main>
              <Hero    onDonateClick={() => setDonateOpen(true)} />
              <div className="divider-glow mx-6 md:mx-12" />
              <About />
              <div className="divider-glow mx-6 md:mx-12" />
              <Actions />
              <div className="divider-glow mx-6 md:mx-12" />
              <Team />
              <div className="divider-glow mx-6 md:mx-12" />
              <Partners />
              <div className="divider-glow mx-6 md:mx-12" />
              <Sponsors />
              <div className="divider-glow mx-6 md:mx-12" />
              <Contact />
            </main>
          </div>

          {/* Page-position dot nav + back-to-top */}
          <SectionNav />
          <BackToTop />

          {/* Donation modal */}
          <DonationModal open={donateOpen} onClose={() => setDonateOpen(false)} />
        </div>
      </ScrollProvider>
    </LanguageProvider>
  )
}
