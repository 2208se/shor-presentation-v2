import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const STATES = [
  { label: '|0⟩', alpha: 1, beta: 0, theta: 0 },
  { label: '|1⟩', alpha: 0, beta: 1, theta: Math.PI },
  { label: 'superposition', alpha: 0.707, beta: 0.707, theta: Math.PI / 2 },
]

export default function BlochSphere() {
  const [idx, setIdx] = useState(0)
  const [theta, setTheta] = useState(0)
  const animRef = useRef(null)
  const state = STATES[idx]
  const alpha2 = state.alpha ** 2
  const beta2 = state.beta ** 2

  useEffect(() => {
    let t = theta
    const target = state.theta
    const step = () => {
      const diff = target - t
      if (Math.abs(diff) < 0.02) {
        setTheta(target)
        return
      }
      t += diff * 0.12
      setTheta(t)
      animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [idx, state.theta])

  const cx = 55
  const cy = 55
  const r = 48
  const arrowLen = 38
  const ax = cx + arrowLen * Math.sin(theta)
  const ay = cy - arrowLen * Math.cos(theta)

  const cycle = () => setIdx((i) => (i + 1) % STATES.length)

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={cycle}
        className="relative cursor-pointer rounded-full border border-accent-purple/40 bg-accent-purple/10 p-1 transition hover:border-accent-purple"
        aria-label="Toggle qubit state"
      >
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <motion.line
            x1={cx}
            y1={cy}
            x2={ax}
            y2={ay}
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx={ax} cy={ay} r="4" fill="#10b981" />
        </svg>
      </button>
      <p className="font-mono text-xs text-accent-green">
        α|0⟩ + β|1⟩
      </p>
      <motion.div className="w-full space-y-1" key={idx}>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-12 font-mono text-white/50">|α|²</span>
          <motion.div
            className="h-2 flex-1 rounded bg-accent-purple/30"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
          >
            <motion.div
              className="h-full rounded bg-accent-purple"
              initial={{ width: 0 }}
              animate={{ width: `${alpha2 * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <span className="font-mono text-accent-purple">{(alpha2 * 100).toFixed(0)}%</span>
        </div>
        <motion.div className="flex items-center gap-2 text-xs">
          <span className="w-12 font-mono text-white/50">|β|²</span>
          <motion.div className="h-2 flex-1 rounded bg-accent-blue/30">
            <motion.div
              className="h-full rounded bg-accent-blue"
              initial={{ width: 0 }}
              animate={{ width: `${beta2 * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
          <span className="font-mono text-accent-blue">{(beta2 * 100).toFixed(0)}%</span>
        </motion.div>
      </motion.div>
    </div>
  )
}
