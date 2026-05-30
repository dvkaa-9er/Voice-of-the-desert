'use client'

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* ── Blurred video ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ filter: 'blur(10px)', transform: 'scale(1.08)' }}
      >
        <video
          src="/bg-dune.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width:  'max(177.78vh, 100vw)',
            height: 'max(100vh, 56.25vw)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* ── Dark overlay — keeps text readable ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#050508]/72" />

      {/* ── Bottom vignette ────────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48"
        style={{ background: 'linear-gradient(to top, #050508, transparent)' }}
      />

      {/* ── Top vignette ───────────────────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-32"
        style={{ background: 'linear-gradient(to bottom, #050508, transparent)' }}
      />
    </div>
  )
}
