import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

export default function S1_Title({ onNavigate }) {
  const { openModal } = useModal()

  const overview = (
    <>
      <ModalTitle>Presentation Overview</ModalTitle>
      <Step n={1} color="#7c3aed">RSA key exchange & why factoring matters</Step>
      <Step n={2} color="#2563eb">Shor&apos;s reduction: period-finding → factors</Step>
      <Step n={3} color="#10b981">Quantum building blocks: QFT, superposition</Step>
      <Step n={4} color="#d97706">Four computational labs with real code</Step>
      <Step n={5} color="#dc2626">Threat timeline & NIST post-quantum standards</Step>
    </>
  )

  return (
    <SlideWrapper className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white/10"
            style={{ width: 200 + i * 120, height: 200 + i * 120 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        <motion.div className="absolute h-40 w-40 rounded-full bg-accent-purple/30 blur-3xl" animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute right-1/4 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" animate={{ x: [0, -25, 0] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.div className="absolute bottom-1/4 h-24 w-24 rounded-full bg-yellow-500/20 blur-2xl" />
      </div>
      <div className="relative z-10 max-w-4xl text-center">
        <motion.h1
          className="gradient-text mb-4 text-4xl font-black leading-tight md:text-6xl"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Shor&apos;s Algorithm &amp; the Quantum Threat to RSA
        </motion.h1>
        <motion.p className="mb-8 text-lg text-white/60 md:text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          From exponential classical hardness to polynomial quantum computation
        </motion.p>
        <motion.div className="mb-8 space-y-1 text-sm text-white/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <p className="font-semibold text-white/80">Kiouaz Selssabila</p>
          <p>Supervisor: M. Pierre Hyvernat</p>
          <p>Université Savoie Mont Blanc · Licence 3 · May 2026</p>
        </motion.div>
        <motion.div className="flex flex-wrap justify-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <button onClick={() => openModal(overview)} className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium transition hover:bg-white/10">
            Overview
          </button>
          <button onClick={() => onNavigate(1)} className="rounded-xl bg-accent-purple px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-purple/80">
            Begin →
          </button>
        </motion.div>
      </div>
    </SlideWrapper>
  )
}
