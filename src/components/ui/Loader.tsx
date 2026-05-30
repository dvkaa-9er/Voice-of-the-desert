'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Mini globe draws the route on load
function LoaderGlobe({ progress }: { progress: number }) {
  const meshRef  = useRef<THREE.Mesh>(null)
  const routeRef = useRef<THREE.Line | null>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Route points (simplified great-circle arc across Eurasia)
  const routePts = [
    [0.32, 0.37, -0.87], [0.18, 0.38, -0.91], [0.05, 0.36, -0.93],
    [-0.08, 0.33, -0.94], [-0.20, 0.31, -0.93], [-0.32, 0.34, -0.89],
    [-0.40, 0.33, -0.86],
  ].map(p => new THREE.Vector3(...p).normalize())

  const curve = new THREE.CatmullRomCurve3(routePts.map(v => v.clone().multiplyScalar(1.04)))
  const fullPts = curve.getPoints(120)

  const drawnCount = Math.floor(progress * fullPts.length)
  const drawnPts = fullPts.slice(0, Math.max(2, drawnCount))

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = clock.elapsedTime * 0.25
    groupRef.current.rotation.x = -0.15
  })

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#0D1B3E" roughness={0.8} metalness={0.1} />
      </mesh>
      {/* Grid wireframe */}
      <mesh>
        <sphereGeometry args={[1.005, 24, 16]} />
        <meshBasicMaterial color="#1A3A6A" wireframe transparent opacity={0.25} />
      </mesh>
      {/* Route drawing */}
      <primitive
        object={(() => {
          const geo = new THREE.BufferGeometry().setFromPoints(drawnPts)
          const mat = new THREE.LineBasicMaterial({ color: '#E03D1E', linewidth: 2 })
          return new THREE.Line(geo, mat)
        })()}
      />
      {/* Runner dot at route tip */}
      {drawnPts.length > 1 && (
        <mesh position={drawnPts[drawnPts.length - 1]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#E03D1E" emissive="#E03D1E" emissiveIntensity={3} />
        </mesh>
      )}
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 3, 5]} intensity={1.5} color="#E03D1E" />
    </group>
  )
}

// Text scramble hook
function useScramble(target: string, active: boolean) {
  const [text, setText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!?'
  const iterRef = useRef(0)
  const rafRef  = useRef(0)

  useEffect(() => {
    if (!active) { setText(''); iterRef.current = 0; return }
    let frame = 0
    const interval = setInterval(() => {
      setText(
        target.split('').map((c, i) => {
          if (c === ' ') return ' '
          if (i < iterRef.current) return c
          return chars[Math.floor(Math.random() * chars.length)]
        }).join('')
      )
      if (frame++ % 3 === 0) iterRef.current++
      if (iterRef.current >= target.length) { setText(target); clearInterval(interval) }
    }, 40)
    return () => clearInterval(interval)
  }, [active, target])

  return text
}

interface LoaderProps { onDone: () => void }

export default function Loader({ onDone }: LoaderProps) {
  const [progress,  setProgress]  = useState(0)
  const [phase,     setPhase]     = useState<'globe' | 'title' | 'done'>('globe')
  const [titleReady, setTitleReady] = useState(false)
  const [exiting,   setExiting]   = useState(false)

  const line1 = useScramble('VOICE OF THE', titleReady)
  const line2 = useScramble('DESERT', titleReady)

  useEffect(() => {
    // Phase 1: draw the route (0 → 100% over 2.2s)
    const startTime = performance.now()
    const DRAW_DUR  = 1400   // was 2200

    const tick = () => {
      const elapsed = performance.now() - startTime
      const p = Math.min(1, elapsed / DRAW_DUR)
      setProgress(p)
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setPhase('title')
        setTimeout(() => setTitleReady(true), 150)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 700)
        }, 1800)   // was 3200
      }
    }
    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] bg-[#050508] flex flex-col items-center justify-center"
        >
          {/* Globe canvas — square, scales with viewport using vmin */}
          <motion.div
            style={{ width: 'clamp(200px, 42vmin, 280px)', height: 'clamp(200px, 42vmin, 280px)' }}
            className="mb-[4vmin]"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} gl={{ alpha: true }}>
              <LoaderGlobe progress={progress} />
            </Canvas>
          </motion.div>

          {/* Route progress bar — width matches globe */}
          <div
            style={{ width: 'clamp(200px, 42vmin, 280px)' }}
            className="h-[2px] bg-white/10 rounded-full overflow-hidden mb-[4vmin]"
          >
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-vermilion to-ochre"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Scramble title — always rendered so layout height never shifts.
              Opacity transitions from 0→1; invisible placeholders hold space. */}
          <motion.div
            animate={{ opacity: titleReady ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
            style={{ width: 'clamp(200px, 42vmin, 280px)' }}
          >
            <div className="text-white/50 tracking-[0.6em] uppercase mb-2"
                 style={{ fontSize: 'clamp(9px, 1.8vmin, 13px)' }}>
              {line1 || ' '}
            </div>
            <div className="text-white font-black tracking-widest"
                 style={{ fontSize: 'clamp(28px, 8vmin, 48px)' }}>
              {line2 || ' '}
            </div>
            <div className="text-vermilion/60 tracking-[0.5em] uppercase mt-3"
                 style={{ fontSize: 'clamp(8px, 1.6vmin, 11px)' }}>
              UNCCD COP17 Initiative
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
