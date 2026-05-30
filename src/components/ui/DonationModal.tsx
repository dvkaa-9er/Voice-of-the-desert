'use client'

import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/providers/LanguageProvider'

const TreeSeed = lazy(() => import('@/components/three/TreeSeed'))

const AMOUNTS = [5, 10, 25, 50, 100]

interface DonationModalProps {
  open: boolean
  onClose: () => void
}

export default function DonationModal({ open, onClose }: DonationModalProps) {
  const { t } = useLanguage()
  const [selected, setSelected] = useState(5)
  const [planted, setPlanted] = useState(false)
  const [treeCount, setTreeCount] = useState(8247)
  const [growing, setGrowing] = useState(false)

  const treesForAmount = Math.floor(selected / 5)

  useEffect(() => {
    if (!open) {
      setPlanted(false)
      setGrowing(false)
    }
  }, [open])

  const handlePlant = () => {
    setGrowing(true)
    setTimeout(() => {
      setPlanted(true)
      setTreeCount((prev) => prev + treesForAmount)
    }, 1200)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
            className="relative z-10 w-full max-w-lg bg-slate rounded-3xl overflow-hidden border border-gold/20 shadow-2xl shadow-gold/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white text-xl z-10"
            >
              ✕
            </button>

            {/* 3D Tree Canvas */}
            <div className="h-52 bg-gradient-to-b from-obsidian to-slate relative">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gold/40 text-sm">Loading...</div>}>
                <TreeSeed growing={growing} treeCount={treeCount} />
              </Suspense>
              {/* Overlay text */}
              <div className="absolute bottom-3 right-4 text-right">
                <p className="text-white/40 text-xs">{t('donate.impact')}</p>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-black text-white mb-1">{t('donate.title')}</h2>
              <p className="text-white/50 text-sm mb-6">{t('donate.subtitle')}</p>

              {/* Amount selector */}
              {!planted && (
                <>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setSelected(amount)}
                        style={selected === amount ? { background: '#E03D1E' } : undefined}
                        className={`px-4 py-2 rounded-xl font-bold text-sm border transition-all duration-200 ${
                          selected === amount
                            ? 'text-white border-transparent shadow-lg'
                            : 'bg-white/5 text-white/70 border-white/10 hover:border-vermilion/40'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  {/* Impact preview */}
                  <div className="flex items-center gap-2 mb-6 p-3 rounded-xl bg-green/10 border border-green/20">
                    <span className="text-2xl">🌱</span>
                    <p className="text-green-400 font-medium text-sm">
                      ${selected} = <strong>{treesForAmount} tree{treesForAmount > 1 ? 's' : ''}</strong> planted in degraded zones
                    </p>
                  </div>

                  <motion.button
                    onClick={handlePlant}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl font-black text-lg text-white shadow-lg transition-shadow"
                    style={{ background: '#E03D1E' }}
                  >
                    {t('donate.cta')} — ${selected}
                  </motion.button>
                </>
              )}

              {planted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="text-4xl mb-3">🌳</div>
                  <p className="text-green-400 font-black text-xl mb-2">
                    {treesForAmount} tree{treesForAmount > 1 ? 's' : ''} planted!
                  </p>
                  <p className="text-white/50 text-sm mb-4">
                    Thank you for helping revive the desert.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2 rounded-full border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
                  >
                    Continue Exploring
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
