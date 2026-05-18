import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts'
import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import ChartFrame from '../interactive/ChartFrame'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const LAB1_DATA = [32, 48, 64, 80, 96].map((n) => ({
  n,
  measured: 0.1446 * n,
  theoryHalf: 0.1505 * (n / 2),
}))

const LAB2_DATA = [
  { name: 'Success', value: 86, color: '#7c3aed' },
  { name: 'Even r', value: 55, color: '#2563eb' },
  { name: 'Useful gcd', value: 78, color: '#10b981' },
  { name: 'Theory', value: 50, color: '#d97706' },
]

const LAB3_PEAKS = [0, 4, 8, 12]
const LAB3_DATA = Array.from({ length: 16 }, (_, k) => ({
  k,
  prob: LAB3_PEAKS.includes(k) ? 25 : 0.5,
}))

const LABS = [
  {
    id: 1,
    badge: 'LAB 1',
    color: '#2563eb',
    title: 'Classical Factoring',
    summary: 'Timed factorization confirms exponential scaling — RSA-2048 infeasible classically.',
    stats: ['slope 0.1446', '4% error', '6×10²⁸¹ y'],
    modal: (
      <>
        <ModalTitle color="#2563eb">Lab 1 — Classical Factoring</ModalTitle>
        <Step n={1} color="#2563eb">Measured log₁₀(time) vs n (bits) matches O(2^(n/4)) trend</Step>
        <Step n={2} color="#10b981">Extrapolation: factoring RSA-2048 would take ~6×10²⁸¹ years</Step>
      </>
    ),
  },
  {
    id: 2,
    badge: 'LAB 2',
    color: '#7c3aed',
    title: 'Period-Finding',
    summary: 'Random base a finds period r with high success; Miller conditions hold empirically.',
    stats: ['86% success', '78% useful gcd', '≥50% theory'],
    modal: (
      <>
        <ModalTitle color="#7c3aed">Lab 2 — Period-Finding</ModalTitle>
        <Step n={1} color="#7c3aed">Period-finding succeeds reliably after O(1) random trials</Step>
        <Step n={2} color="#7c3aed">Failures: a^(r/2) ≡ −1 mod N — retry with new a</Step>
      </>
    ),
  },
  {
    id: 3,
    badge: 'LAB 3',
    color: '#10b981',
    title: 'QFT Simulation',
    summary: 'QFT concentrates probability on k = m·(N/r); peaks at 0, 4, 8, 12 for N=16, r=4.',
    stats: ['norm 1.0', '25% / peak', 'N=35 fail'],
    modal: (
      <>
        <ModalTitle color="#10b981">Lab 3 — QFT Simulation</ModalTitle>
        <Step n={1} color="#10b981">4 peaks at k = 0, N/r, 2N/r, 3N/r — period r = 4 recovered</Step>
        <Step n={2} color="#10b981">N=35 needs wider register; statevector sim scales exponentially</Step>
      </>
    ),
  },
]

function Lab1Chart() {
  return (
    <ChartFrame height={110}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={LAB1_DATA} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="n" tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" />
          <YAxis tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" width={22} />
          <Line dataKey="measured" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line dataKey="theoryHalf" stroke="#dc2626" strokeDasharray="4 3" strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function Lab2Chart() {
  return (
    <ChartFrame height={110}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={LAB2_DATA} layout="vertical" margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" unit="%" />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" width={44} />
          <Bar dataKey="value" radius={[0, 3, 3, 0]} maxBarSize={10}>
            {LAB2_DATA.map((e) => (
              <Cell key={e.name} fill={e.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function Lab3Chart() {
  return (
    <ChartFrame height={110}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={LAB3_DATA} margin={{ top: 4, right: 2, left: -16, bottom: 0 }}>
          <XAxis dataKey="k" tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" interval={3} />
          <YAxis tick={{ fontSize: 7, fill: '#64748b' }} stroke="transparent" domain={[0, 30]} width={20} unit="%" />
          <Bar dataKey="prob" radius={[1, 1, 0, 0]} maxBarSize={8}>
            {LAB3_DATA.map((e) => (
              <Cell key={e.k} fill={LAB3_PEAKS.includes(e.k) ? '#7c3aed' : 'rgba(255,255,255,0.1)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

const CHARTS = [Lab1Chart, Lab2Chart, Lab3Chart]

export default function S10_Labs() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <h2 className="mb-1 text-center text-xl font-bold md:text-2xl">Labs 1–3 — Experimental Results</h2>
      <p className="mb-4 text-center text-xs text-white/50">
        Classical hardness · period-finding · QFT simulation
      </p>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-3 md:grid-cols-3">
        {LABS.map((lab, i) => {
          const Chart = CHARTS[i]
          return (
            <motion.button
              key={lab.id}
              type="button"
              onClick={() => openModal(lab.modal)}
              className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-white/25 hover:bg-white/[0.08]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div className="mb-2 flex items-center gap-2">
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: `${lab.color}22`, color: lab.color }}
                >
                  {lab.badge}
                </span>
                <h3 className="text-sm font-bold text-white">{lab.title}</h3>
              </motion.div>

              <Chart />

              <div className="mt-2 flex flex-wrap gap-1">
                {lab.stats.map((s) => (
                  <span key={s} className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] text-white/60">
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-2 text-[10px] leading-snug text-white/50">{lab.summary}</p>
              <p className="mt-1 text-[9px] text-white/30">Click for details →</p>
            </motion.button>
          )
        })}
      </div>
    </SlideWrapper>
  )
}
