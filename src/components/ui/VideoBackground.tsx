'use client'

import { useState, useEffect } from 'react'

export default function VideoBackground() {
  // Delay loading the 51 MB video so it never competes with critical JS/CSS/fonts.
  // The loader animation runs for ~3 s, so by the time it's gone the video is ready.
  const [src, setSrc] = useState<string | undefined>(undefined)

  useEffect(() => {
    const t = setTimeout(() => setSrc('/bg-dune.mp4'), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* Blurred video */}
      <div
        className="absolute inset-0"
        style={{ filter: 'blur(10px)', transform: 'scale(1.08)' }}
      >
        {src && (
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width:  'max(177.78vh, 100vw)',
              height: 'max(100vh, 56.25vw)',
              pointerEvents: 'none',
            }}
          />
        )}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#050508]/72" />

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to top, #050508, transparent)' }}
      />

      {/* Top vignette */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, #050508, transparent)' }}
      />
    </div>
  )
}
