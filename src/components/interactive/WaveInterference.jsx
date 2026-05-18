import { useState, useMemo } from 'react'

const W = 280
const H = 80
const STEPS = 80

function wavePath(amp, phase, yOffset, color) {
  const pts = []
  for (let i = 0; i <= STEPS; i++) {
    const x = (i / STEPS) * W
    const t = (i / STEPS) * Math.PI * 4
    const y = yOffset + amp * Math.sin(t + phase) * 28
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return { d: pts.join(' '), color }
}

export default function WaveInterference() {
  const [phi, setPhi] = useState(0)
  const destructive = Math.abs(phi - Math.PI) < 0.4
  const constructive = phi < 0.4 || phi > Math.PI * 2 - 0.4

  const waves = useMemo(() => {
    const w1 = wavePath(1, 0, H / 2 - 20, '#7c3aed')
    const w2 = wavePath(0.9, phi, H / 2 - 20, '#2563eb')
    const sumPts = []
    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * Math.PI * 4
      const y = H / 2 + 20 + (Math.sin(t) + 0.9 * Math.sin(t + phi)) * 14
      sumPts.push(`${i === 0 ? 'M' : 'L'}${((i / STEPS) * W).toFixed(1)},${y.toFixed(1)}`)
    }
    const sumColor = destructive ? '#dc2626' : constructive ? '#10b981' : '#d97706'
    return { w1, w2, sum: { d: sumPts.join(' '), color: sumColor } }
  }, [phi, destructive, constructive])

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={W} height={H + 40} className="overflow-visible">
        <path d={waves.w1.d} fill="none" stroke={waves.w1.color} strokeWidth="2" opacity="0.8" />
        <path d={waves.w2.d} fill="none" stroke={waves.w2.color} strokeWidth="2" opacity="0.8" />
        <path d={waves.sum.d} fill="none" stroke={waves.sum.color} strokeWidth="2.5" />
        <text x="0" y={H + 28} className="fill-white/40 text-[10px]">sum</text>
      </svg>
      <div className="w-full px-2">
        <label className="mb-1 block text-xs text-white/50">
          Phase φ = {(phi / Math.PI).toFixed(2)}π
        </label>
        <input
          type="range"
          min={0}
          max={Math.PI * 2}
          step={0.05}
          value={phi}
          onChange={(e) => setPhi(parseFloat(e.target.value))}
          className="w-full accent-accent-purple"
        />
      </div>
      <p className="text-center text-[10px] leading-snug text-white/60">
        Interference: wrong answers cancel (φ=π), correct answer amplifies (φ=0)
      </p>
    </div>
  )
}
