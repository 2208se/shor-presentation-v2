import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { motion } from 'framer-motion'
import ChartFrame from './ChartFrame'

const N = 16
const R = 4
const AFTER_PEAKS = [0, 4, 8, 12] // k = m · (N/r)

const TICK = { fontSize: 8, fill: '#64748b' }
const Y_TICKS = [0, 6, 12, 18, 25]

/**
 * Before QFT — computational basis (x):
 * Periodic wave |ψ(x)|² ∝ cos²(2πx/r): period visible but spread across all x.
 */
function beforeData() {
  return Array.from({ length: N }, (_, x) => {
    const wave = Math.pow(Math.cos((2 * Math.PI * x) / R), 2)
    const prob = 3 + wave * 18 // 3% … 21% — wavy, not isolated spikes
    return {
      index: x,
      prob,
      label: `${x}`,
      highlight: x % R === 0,
    }
  })
}

/**
 * After QFT — frequency basis (k):
 * Only k = m·(N/r) have amplitude; everything else ≈ 0.
 */
function afterData() {
  return Array.from({ length: N }, (_, k) => {
    const isPeak = AFTER_PEAKS.includes(k)
    return {
      index: k,
      prob: isPeak ? 25 : 0.2,
      label: `${k}`,
      highlight: isPeak,
    }
  })
}

function ChartPanel({ data, title, subtitle, axisLabel, color, peakColor }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-xs font-semibold text-white/70">{title}</p>
      <p className="max-w-[200px] text-center text-[10px] leading-snug text-white/40">{subtitle}</p>
      <ChartFrame height={170} className="max-w-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 6, left: 0, bottom: 18 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={TICK}
              stroke="#64748b"
              interval={1}
              label={{ value: axisLabel, position: 'insideBottom', offset: -6, fill: '#94a3b8', fontSize: 9 }}
            />
            <YAxis
              tick={TICK}
              stroke="#64748b"
              domain={[0, 28]}
              ticks={Y_TICKS}
              tickFormatter={(v) => `${v}%`}
              width={36}
            />
            <Tooltip
              contentStyle={{ background: 'rgba(6,6,20,0.95)', fontSize: 10, border: '1px solid rgba(255,255,255,0.1)' }}
              formatter={(v) => [`${Number(v).toFixed(1)}%`, 'P']}
            />
            <Bar dataKey="prob" radius={[2, 2, 0, 0]} maxBarSize={12}>
              {data.map((entry) => (
                <Cell
                  key={entry.index}
                  fill={entry.highlight ? peakColor : 'rgba(255,255,255,0.1)'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartFrame>
    </motion.div>
  )
}

export default function BarChartQFT() {
  const [applied, setApplied] = useState(false)

  return (
    <motion.div className="flex w-full max-w-4xl flex-col items-center gap-3">
      <p className="max-w-lg text-center text-[11px] text-white/55">
        QFT turns a <span className="text-accent-blue">hidden period in x</span> into{' '}
        <span className="text-accent-purple">sharp peaks in k</span> — spacing becomes N/r = 4
      </p>

      <motion.div className="flex flex-wrap items-end justify-center gap-4 md:gap-8" layout>
        <ChartPanel
          data={beforeData()}
          title="Before QFT"
          subtitle="Wavy periodic pattern in x (period r = 4, still spread out)"
          axisLabel="x (computational)"
          color="#2563eb"
          peakColor="#2563eb"
        />

        <motion.span
          className="mb-14 rounded-full border border-accent-purple bg-accent-purple/10 px-4 py-1.5 text-xs font-bold text-accent-purple"
          animate={applied ? { scale: [1, 1.12, 1], boxShadow: ['0 0 0 rgba(124,58,237,0)', '0 0 20px rgba(124,58,237,0.5)', '0 0 0 rgba(124,58,237,0)'] } : {}}
          transition={{ duration: 0.7 }}
        >
          QFT →
        </motion.span>

        {applied ? (
          <ChartPanel
            data={afterData()}
            title="After QFT"
            subtitle="4 sharp peaks at k = 0, 4, 8, 12 only (N/r spacing)"
            axisLabel="k (frequency)"
            color="#7c3aed"
            peakColor="#7c3aed"
          />
        ) : (
          <div className="mb-2 flex h-[170px] w-[230px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] px-4 text-center">
            <p className="text-xs text-white/35">Click to apply QFT</p>
            <p className="text-[10px] text-white/25">Peaks will sharpen at k = 0, N/r, 2N/r, 3N/r</p>
          </div>
        )}
      </motion.div>

      {!applied && (
        <button
          type="button"
          onClick={() => setApplied(true)}
          className="rounded-lg border border-accent-purple/50 bg-accent-purple/20 px-5 py-2 text-xs font-medium text-accent-purple transition hover:bg-accent-purple/30"
        >
          Apply QFT →
        </button>
      )}

      {applied && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[10px] text-accent-green"
        >
          Before: smooth wave in x · After: isolated spikes in k → measure k to find r
        </motion.p>
      )}
    </motion.div>
  )
}
