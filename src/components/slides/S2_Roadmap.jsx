import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'

const CARDS = [
  { num: '01', title: 'Why RSA is secure', desc: 'Key generation, cipher primitive, classical hardness', slide: 2 },
  { num: '02', title: 'How Shor breaks it', desc: 'Period-finding, Miller\'s theorem, QFT', slide: 4 },
  { num: '03', title: 'Four labs', desc: 'Classical factoring, period-finding, QFT, Qiskit', slide: 9 },
  { num: '04', title: 'Is RSA broken today?', desc: 'Hardware, timeline, PQC standards', slide: 11 },
]

export default function S2_Roadmap({ onNavigate, onBurst }) {
  const handleClick = (e, slide) => {
    onBurst(e.clientX, e.clientY)
    onNavigate(slide)
  }

  return (
    <SlideWrapper>
      <h2 className="mb-8 text-3xl font-bold text-white">Roadmap</h2>
      <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((c, i) => (
          <motion.button
            key={c.num}
            onClick={(e) => handleClick(e, c.slide)}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition hover:border-accent-purple/50 hover:bg-accent-purple/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-4xl font-black text-accent-purple/80">{c.num}</span>
            <h3 className="mt-2 text-xl font-bold text-white">{c.title}</h3>
            <p className="mt-2 text-sm text-white/50">{c.desc}</p>
          </motion.button>
        ))}
      </div>
    </SlideWrapper>
  )
}
