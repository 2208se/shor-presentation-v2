import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const TAKEAWAYS = [
  { t: 'O(n³) confirmed', d: 'Four labs with real code validate polynomial quantum scaling.', color: '#10b981' },
  { t: 'RSA safe today', d: '~20M logical qubits needed; credible timeline 10–25 years.', color: '#2563eb' },
  { t: 'Act now: HNDL & NIST PQC', d: 'Migrate to ML-KEM, ML-DSA before harvest-now-decrypt-later.', color: '#d97706' },
  { t: 'Physics shapes computation', d: 'Quantum mechanics defines new computational limits.', color: '#7c3aed' },
]

export default function S18_Conclusion() {
  const { openModal } = useModal()

  return (
    <SlideWrapper>
      <h2 className="mb-8 text-3xl font-bold">Conclusion</h2>
      <div className="w-full max-w-2xl space-y-3">
        {TAKEAWAYS.map((item, i) => (
          <motion.button
            key={item.t}
            onClick={() => openModal(<><ModalTitle color={item.color}>{item.t}</ModalTitle><Step n={1} color={item.color}>{item.d}</Step></>)}
            className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-white" style={{ background: item.color }}>
              {i + 1}
            </span>
            <div>
              <p className="font-semibold text-white">{item.t}</p>
              <p className="text-sm text-white/50">{item.d}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </SlideWrapper>
  )
}
