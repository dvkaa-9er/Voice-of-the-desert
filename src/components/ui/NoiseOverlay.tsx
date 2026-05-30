'use client'

import { useEffect, useRef } from 'react'

export default function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)
  const frameRef  = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      // Only redraw every 3rd frame — keeps grain "alive" without thrashing GPU
      frameRef.current++
      if (frameRef.current % 3 === 0) {
        const { width, height } = canvas
        const imageData = ctx.createImageData(width, height)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const v = (Math.random() * 255) | 0
          data[i] = data[i + 1] = data[i + 2] = v
          data[i + 3] = 18 // very subtle alpha
        }
        ctx.putImageData(imageData, 0, 0)
      }
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[200] pointer-events-none mix-blend-overlay opacity-40"
      aria-hidden="true"
    />
  )
}
