import { useState } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step, Formula } from '../modals/ModalContent'

const FLOW = [
  { id: 1, text: 'N given · choose a', sub: 'check gcd(a,N)', glow: '' },
  { id: 2, text: 'Find r = ord_N(a)', sub: 'QUANTUM', glow: 'shadow-[0_0_20px_rgba(124,58,237,0.6)] border-accent-purple' },
  { id: 3, text: "Miller's theorem", sub: 'gcd(a^(r/2)±1, N)', glow: '' },
  { id: 4, text: 'p and q ✓', sub: 'factors found', glow: 'border-accent-green shadow-[0_0_15px_rgba(16,185,129,0.4)]' },
]

const SEQ = ['1', '7', '4', '13', '1', '7', '4', '13']

export default function S5_ShorIdea({ onBurst }) {
  const { openModal } = useModal()
  const [revealed, setRevealed] = useState(0)

  const walkthrough = (
    <>
      <ModalTitle>Example: N = 15, a = 7</ModalTitle>
      <Step n={1} color="#7c3aed">7¹ mod 15 = 7, 7² = 4, 7³ = 13, 7⁴ = 1 → r = 4</Step>
      <Step n={2} color="#10b981">7² ± 1 = 49±1 → gcd(48,15)=3, gcd(50,15)=5</Step>
      <Formula>15 = 3 × 5</Formula>
    </>
  )

  return (
    <SlideWrapper>
      <h2 className="mb-2 text-center text-xl font-bold md:text-2xl">The central reduction: factoring → period-finding</h2>
      <p className="mb-6 text-center text-sm text-white/50">N is the input (given). We choose random base a.</p>
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {FLOW.map((box, i) => (
          <motion.div key={box.id} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={i === 3 ? (e) => onBurst?.(e.clientX, e.clientY) : undefined}
              className={`cursor-pointer rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-center md:px-4 ${box.glow}`}
            >
              <p className="text-xs font-semibold md:text-sm">{box.text}</p>
              <p className="text-[10px] text-white/50">{box.sub}</p>
            </motion.div>
            {i < 3 && <span className="text-accent-purple">→</span>}
          </motion.div>
        ))}
      </div>
      <button
        onClick={() => { setRevealed(SEQ.length); openModal(walkthrough) }}
        className="mt-6 w-full max-w-xl rounded-xl border border-white/10 bg-white/5 p-4 text-left"
      >
        <p className="mb-2 text-xs text-white/50">7^x mod 15 =</p>
        <div className="flex flex-wrap gap-2 font-mono">
          {SEQ.map((v, i) => (
            <motion.span
              key={i}
              className="rounded bg-accent-purple/30 px-2 py-1 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: i < revealed ? 1 : 0.3 }}
              onAnimationComplete={() => i === revealed && revealed < SEQ.length && setTimeout(() => setRevealed((r) => r + 1), 300)}
            >
              {v}
            </motion.span>
          ))}
        </div>
        <p className="mt-2 text-xs text-accent-green">r = 4 → 15 = 3 × 5 (click for full walkthrough)</p>
      </button>
    </SlideWrapper>
  )
}
