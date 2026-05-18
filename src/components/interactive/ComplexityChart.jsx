import { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import ChartFrame from './ChartFrame'

const TICK_STYLE = { fontSize: 10, fill: '#94a3b8' }
const GRID = 'rgba(255,255,255,0.08)'
const TOOLTIP_STYLE = { background: 'rgba(6,6,20,0.95)', border: '1px solid rgba(255,255,255,0.12)' }

export default function ComplexityChart({ animate = true }) {
  const data = useMemo(() => {
    const pts = []
    for (let n = 64; n <= 2048; n += 64) {
      const trialLog = (n / 2) * Math.log10(2)
      const pollardLog = (n / 4) * Math.log10(2)
      const shorLog = 3 * Math.log10(n)
      pts.push({ n, trialLog, pollardLog, shorLog })
    }
    return pts
  }, [])

  return (
    <motion.div
      initial={animate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl"
    >
      <ChartFrame height={300}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 28 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
            <XAxis
              dataKey="n"
              stroke="#94a3b8"
              tick={TICK_STYLE}
              label={{ value: 'n (bits)', position: 'insideBottom', offset: -8, fill: '#94a3b8', fontSize: 11 }}
            />
            <YAxis
              stroke="#94a3b8"
              tick={TICK_STYLE}
              domain={[0, 'auto']}
              tickFormatter={(v) => `${Math.round(v)}`}
              label={{ value: 'log₁₀(ops)', angle: -90, position: 'insideLeft', offset: 12, fill: '#94a3b8', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              formatter={(v, name) => [`10^${Math.round(v)}`, name]}
              labelFormatter={(n) => `n = ${n} bits`}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <ReferenceLine
              x={2048}
              stroke="#d97706"
              strokeDasharray="5 5"
              label={{ value: 'RSA-2048', fill: '#d97706', fontSize: 10, position: 'top' }}
            />
            <Line type="monotone" dataKey="trialLog" name="Trial O(2^(n/2))" stroke="#dc2626" dot={false} strokeWidth={2.5} />
            <Line type="monotone" dataKey="pollardLog" name="Pollard ρ O(2^(n/4))" stroke="#d97706" dot={false} strokeWidth={2.5} strokeDasharray="6 4" />
            <Line type="monotone" dataKey="shorLog" name="Shor O(n³)" stroke="#10b981" dot={false} strokeWidth={2.5} />
          </LineChart>
        </ResponsiveContainer>
      </ChartFrame>
    </motion.div>
  )
}
