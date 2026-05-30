'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked]  = useState(false)
  const [visible, setVisible]  = useState(false)

  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  // Inner dot — instant
  const dotX = useSpring(rawX, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(rawY, { stiffness: 2000, damping: 60 })

  // Outer ring — lags behind
  const ringX = useSpring(rawX, { stiffness: 140, damping: 22 })
  const ringY = useSpring(rawY, { stiffness: 140, damping: 22 })

  const trailRef = useRef<{ x: number; y: number; id: number }[]>([])
  const trailIdRef = useRef(0)
  const [trail, setTrail] = useState<{ x: number; y: number; id: number; opacity: number }[]>([])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)

      // Sand particle trail — add a point every move
      const id = ++trailIdRef.current
      trailRef.current.push({ x: e.clientX, y: e.clientY, id })
      if (trailRef.current.length > 18) trailRef.current.shift()
      setTrail(
        trailRef.current.map((p, i) => ({
          ...p,
          opacity: (i / trailRef.current.length) * 0.5,
        }))
      )
    }

    const onDown = () => setClicked(true)
    const onUp   = () => setClicked(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    // Detect hoverable elements
    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }
    addHover()

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null // Don't render on touch devices
  }

  return (
    <>
      {/* Sand particle trail */}
      {trail.map(p => (
        <motion.div
          key={p.id}
          className="fixed top-0 left-0 pointer-events-none z-[190] rounded-full"
          style={{
            x: p.x - 2,
            y: p.y - 2,
            width: 4,
            height: 4,
            background: '#D4AF37',
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Outer magnetic ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[195] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          borderColor: hovered ? '#D4AF37' : 'rgba(255,255,255,0.5)',
        }}
        animate={{
          width:  hovered ? 56 : clicked ? 20 : 36,
          height: hovered ? 56 : clicked ? 20 : 36,
          backgroundColor: hovered ? 'rgba(212,175,55,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[196] rounded-full bg-gold"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: hovered ? '#D4AF37' : '#fff',
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovered ? 6 : 5, height: hovered ? 6 : 5 }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
