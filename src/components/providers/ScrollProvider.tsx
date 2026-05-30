'use client'

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'

interface ScrollContextType {
  scrollY: number
  scrollProgress: number
  activeSection: number
}

const ScrollContext = createContext<ScrollContextType>({
  scrollY: 0,
  scrollProgress: 0,
  activeSection: 0,
})

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const sy = window.scrollY
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const progress = maxScroll > 0 ? sy / maxScroll : 0
        setScrollY(sy)
        setScrollProgress(progress)
        // 7 sections — divide progress into equal segments
        setActiveSection(Math.min(6, Math.floor(progress * 7)))
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollY, scrollProgress, activeSection }}>
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)
