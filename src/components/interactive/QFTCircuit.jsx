import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const GATES = [
  { id: 'h0', type: 'H', wire: 0, x: 60, label: 'H', tip: 'Hadamard: |0⟩→(|0⟩+|1⟩)/√2' },
  { id: 'h1', type: 'H', wire: 1, x: 60, label: 'H', tip: 'Creates uniform superposition on q1' },
  { id: 'cp10', type: 'CP', wire: 0, x: 120, label: 'CP(-π/2)', tip: 'Controlled phase: e^{-iπ/2} if control=|1⟩' },
  { id: 'h2', type: 'H', wire: 2, x: 60, label: 'H', tip: 'Hadamard on q2' },
  { id: 'cp21', type: 'CP', wire: 1, x: 180, label: 'CP(-π/4)', tip: 'Phase kickback encodes frequency' },
  { id: 'h3', type: 'H', wire: 3, x: 60, label: 'H', tip: 'Hadamard on q3' },
  { id: 'sw01', type: 'SWAP', wire: 0, x: 240, wire2: 1, tip: 'SWAP: exchange q0 ↔ q1' },
  { id: 'cp32', type: 'CP', wire: 2, x: 200, label: 'CP(-π/8)', tip: 'Finer phase resolution' },
]

const WIRE_Y = [30, 70, 110, 150]
const W = 320
const H = 180

export default function QFTCircuit({ animateIn = true }) {
  const [hover, setHover] = useState(null)
  const [visible, setVisible] = useState(animateIn ? 0 : GATES.length)

  useEffect(() => {
    if (!animateIn || visible >= GATES.length) return
    const t = setTimeout(() => setVisible((v) => v + 1), 150)
    return () => clearTimeout(t)
  }, [visible, animateIn])

  return (
    <motion.div className="relative w-full overflow-x-auto">
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="mx-auto">
        {['q0', 'q1', 'q2', 'q3'].map((label, i) => (
          <g key={label}>
            <text x="4" y={WIRE_Y[i] + 4} className="fill-white/50 text-[10px] font-mono">{label}</text>
            <line x1="28" y1={WIRE_Y[i]} x2={W - 10} y2={WIRE_Y[i]} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          </g>
        ))}
        {GATES.slice(0, visible).map((g, idx) => {
          const y = WIRE_Y[g.wire]
          if (g.type === 'SWAP') {
            const y2 = WIRE_Y[g.wire2]
            return (
              <motion.g
                key={g.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                onMouseEnter={() => setHover(g)}
                onMouseLeave={() => setHover(null)}
              >
                <line x1={g.x} y1={y} x2={g.x} y2={y2} stroke="#d97706" strokeWidth="2" />
                <circle cx={g.x} cy={y} r="6" fill="#d97706" />
                <circle cx={g.x} cy={y2} r="6" fill="#d97706" />
                <text x={g.x + 8} y={(y + y2) / 2} className="fill-[#d97706] text-[9px]">×</text>
              </motion.g>
            )
          }
          const fill = g.type === 'H' ? '#2563eb' : '#d97706'
          return (
            <motion.g
              key={g.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              onMouseEnter={() => setHover(g)}
              onMouseLeave={() => setHover(null)}
            >
              <rect x={g.x - 22} y={y - 12} width="44" height="24" rx="4" fill={fill} fillOpacity="0.85" stroke="white" strokeOpacity="0.2" />
              <text x={g.x} y={y + 4} textAnchor="middle" className="fill-white text-[8px] font-mono">{g.label}</text>
            </motion.g>
          )
        })}
      </svg>
      {hover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg border border-white/10 bg-black/80 px-3 py-2 text-center text-[10px] text-white/80"
        >
          {hover.tip}
        </motion.div>
      )}
      <p className="mt-1 text-center text-[10px] text-white/40">
        n(n+1)/2 gates = O(n²) — for n=4: exactly 10 gates
      </p>
    </motion.div>
  )
}
