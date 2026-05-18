import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const COUNTING = ['q0', 'q1', 'q2', 'q3']
const WORK = ['w0', 'w1', 'w2', 'w3']
const CY = [22, 52, 82, 112]
const WY_COUNT = CY
const WY_WORK = [142, 172, 202, 232]
const W = 380
const H = 220

const SECTIONS = [
  { id: 'init', label: 'Initialize |1⟩ on w0', x: 50 },
  { id: 'hadamard', label: 'H⊗⁴ — superposition on counting register', x: 90 },
  { id: 'oracle', label: 'Controlled-U: modular exponentiation a^x mod N', x: 150 },
  { id: 'iqft', label: 'Inverse QFT — extract period from phases', x: 260 },
  { id: 'measure', label: 'Measure counting qubits → k → continued fractions → r', x: 330 },
]

export default function ShorCircuit() {
  const [step, setStep] = useState(0)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    if (step >= 5) return
    const t = setTimeout(() => setStep((s) => s + 1), 400)
    return () => clearTimeout(t)
  }, [step])

  return (
    <motion.div className="relative w-full overflow-x-auto">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <text x="8" y="14" className="fill-accent-purple text-[9px] font-semibold">Counting</text>
        {COUNTING.map((q, i) => (
          <g key={q}>
            <text x="4" y={WY_COUNT[i] + 4} className="fill-white/40 text-[9px] font-mono">{q}</text>
            <line x1="28" y1={WY_COUNT[i]} x2={W - 8} y2={WY_COUNT[i]} stroke="rgba(124,58,237,0.3)" />
          </g>
        ))}
        <text x="8" y="128" className="fill-accent-green text-[9px] font-semibold">Work</text>
        {WORK.map((q, i) => (
          <g key={q}>
            <text x="4" y={WY_WORK[i] + 4} className="fill-white/40 text-[9px] font-mono">{q}</text>
            <line x1="28" y1={WY_WORK[i]} x2={W - 8} y2={WY_WORK[i]} stroke="rgba(16,185,129,0.3)" />
          </g>
        ))}
        {step >= 1 && (
          <g>
            <rect x="88" y={WY_WORK[0] - 10} width="18" height="20" rx="3" fill="#10b981" />
            <text x="97" y={WY_WORK[0] + 5} textAnchor="middle" className="fill-white text-[9px]">X</text>
          </g>
        )}
        {step >= 2 && COUNTING.map((_, i) => (
          <g key={`h${i}`}>
            <rect x="88" y={WY_COUNT[i] - 10} width="18" height="20" rx="3" fill="#2563eb" />
            <text x="97" y={WY_COUNT[i] + 5} textAnchor="middle" className="fill-white text-[8px]">H</text>
          </g>
        ))}
        {step >= 3 && ['U₇', 'U₄', 'I', 'I'].map((label, i) => (
          <g key={label}>
            <rect x="148" y={WY_COUNT[i] - 12} width="36" height="24" rx="4" fill="rgba(124,58,237,0.6)" stroke="#7c3aed" />
            <text x="166" y={WY_COUNT[i] + 4} textAnchor="middle" className="fill-white text-[8px] font-mono">{label}</text>
            <line x1="166" y1={WY_COUNT[i]} x2="166" y2={WY_WORK[0]} stroke="#7c3aed" strokeDasharray="3 2" />
          </g>
        ))}
        {step >= 4 && (
          <g>
            <rect x="255" y={WY_COUNT[0] - 14} width="50" height={WY_COUNT[3] - WY_COUNT[0] + 28} rx="6" fill="rgba(37,99,235,0.3)" stroke="#2563eb" />
            <text x="280" y={WY_COUNT[1] + 20} textAnchor="middle" className="fill-white text-[9px]">QFT†</text>
          </g>
        )}
        {step >= 5 && COUNTING.map((_, i) => (
          <g key={`m${i}`}>
            <rect x="328" y={WY_COUNT[i] - 8} width="14" height="16" fill="#d97706" />
            <text x="335" y={WY_COUNT[i] + 4} textAnchor="middle" className="fill-white text-[8px]">M</text>
          </g>
        ))}
        {SECTIONS.map((s) => (
          <rect
            key={s.id}
            x={s.x - 5}
            y="8"
            width="55"
            height={H - 16}
            fill="transparent"
            onMouseEnter={() => setHover(s)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>
      {hover && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 rounded-lg border border-white/10 bg-black/70 px-3 py-2 text-center text-[10px] text-white/70"
        >
          {hover.label}
        </motion.p>
      )}
    </motion.div>
  )
}
