import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const CARDS = [
  { id: 'x2', title: 'x²≡1', content: 'N | (x−1)(x+1) — neither factor is ±1 mod N' },
  { id: 'crt', title: 'CRT argument', content: 'N=pq splits: one prime divides (x−1), the other (x+1)' },
  { id: '50', title: '≥50% success', content: 'For random a, at least half yield useful r (even, a^(r/2)≢−1)' },
  { id: 'class', title: '! Classical only', content: 'Finding r is hard classically; quantum QFT makes it polynomial' },
]

export default function S6_Miller() {
  const [open, setOpen] = useState(null)
  const { openModal } = useModal()

  const fullProof = (
    <>
      <ModalTitle color="#10b981">Miller&apos;s Theorem — Full Proof Sketch</ModalTitle>
      <Step n={1} color="#10b981">If r even and a^(r/2) ≢ −1 mod N, set x = a^(r/2)</Step>
      <Step n={2} color="#10b981">x² ≡ 1 mod N but x ≢ ±1 mod N</Step>
      <Step n={3} color="#10b981">gcd(x±1, N) are non-trivial factors of N</Step>
    </>
  )

  return (
    <SlideWrapper scroll>
      <button
        onClick={() => openModal(fullProof)}
        className="mb-4 w-full max-w-3xl rounded-xl border-2 border-accent-green/50 bg-accent-green/10 p-4 text-left"
      >
        <p className="text-sm font-semibold text-accent-green">Miller&apos;s Theorem</p>
        <p className="mt-1 font-mono text-xs text-white/80">
          If r even and a^(r/2) ≢ −1 mod N, then gcd(a^(r/2)±1, N) are non-trivial factors
        </p>
      </button>
      <div className="grid max-w-3xl grid-cols-1 gap-2 sm:grid-cols-2">
        {CARDS.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button onClick={() => setOpen(open === c.id ? null : c.id)} className="w-full p-3 text-left font-semibold text-white">
              {c.title} {open === c.id ? '▼' : '▶'}
            </button>
            <AnimatePresence>
              {open === c.id && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t border-white/10 px-3 pb-3 text-sm text-white/70">
                  {c.content}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </SlideWrapper>
  )
}
