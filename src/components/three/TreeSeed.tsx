'use client'

import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Environment } from '@react-three/drei'
import * as THREE from 'three'

function GrowingTree({ growing }: { growing: boolean }) {
  const trunkRef = useRef<THREE.Mesh>(null)
  const leavesRef = useRef<THREE.Group>(null)
  const progressRef = useRef(0)

  useFrame((_, delta) => {
    if (!trunkRef.current || !leavesRef.current) return
    if (growing && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta * 0.8)
    } else if (!growing) {
      progressRef.current = Math.max(0, progressRef.current - delta * 2)
    }
    const p = progressRef.current
    trunkRef.current.scale.setScalar(p)
    leavesRef.current.scale.setScalar(p)
    trunkRef.current.rotation.y += delta * 0.5
    leavesRef.current.rotation.y += delta * 0.3
  })

  return (
    <group position={[0, -0.5, 0]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[1.2, 32]} />
        <meshStandardMaterial color="#2D7A4F" roughness={0.9} />
      </mesh>

      {/* Trunk */}
      <mesh ref={trunkRef} position={[0, 0.4, 0]} scale={0}>
        <cylinderGeometry args={[0.06, 0.1, 0.8, 8]} />
        <meshStandardMaterial color="#5C3A1E" roughness={0.9} />
      </mesh>

      {/* Leaves cluster */}
      <group ref={leavesRef} position={[0, 0.9, 0]} scale={0}>
        <mesh>
          <sphereGeometry args={[0.35, 8, 8]} />
          <meshStandardMaterial color="#2D7A4F" roughness={0.7} />
        </mesh>
        {[
          [0.25, 0.15, 0],
          [-0.25, 0.1, 0.1],
          [0, 0.2, -0.2],
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshStandardMaterial color="#3A9A60" roughness={0.7} />
          </mesh>
        ))}
      </group>

      {growing && (
        <Sparkles count={30} scale={2} size={2} speed={1} color="#4CAF50" opacity={0.8} />
      )}
    </group>
  )
}

interface TreeSeedProps {
  growing: boolean
  treeCount: number
}

export default function TreeSeed({ growing, treeCount }: TreeSeedProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 1.5, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 3]} intensity={1.2} color="#D4AF37" />
        <pointLight position={[-2, 2, -2]} color="#2D7A4F" intensity={0.8} />
        <GrowingTree growing={growing} />
        <Environment preset="forest" />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-green-400 font-bold text-2xl">{treeCount.toLocaleString()}</span>
      </div>
    </div>
  )
}
