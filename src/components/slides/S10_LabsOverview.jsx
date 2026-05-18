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
  theory: 0.1505 * (n / 4),
}))

const LAB2_DATA = [
  { name: 'Success', v: 86 },
  { name: 'Even r', v: 55 },
  { name: 'GCD ok', v: 78 },
  { name: 'Bound', v: 50 },
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
    bg: 'bg-accent-blue/20',
    title: 'Classical Factoring',
    desc: 'Timed factorization confirms exponential scaling in n.',
    stat: '6×10²⁸¹ y for RSA-2048',
    modal: (
      <>
        <ModalTitle color="#2563eb">Lab 1 — Classical Factoring</ModalTitle>
        <Step n={1} color="#2563eb">Measured slope 0.1446 vs theory 0.1505 (4% gap)</Step>
        <Step n={2} color="#10b981">RSA-2048 infeasible on classical hardware</Step>
      </>
    ),
  },
  {
    id: 2,
    badge: 'LAB 2',
    color: '#7c3aed',
    bg: 'bg-accent-purple/20',
    title: 'Period-Finding',
    desc: 'Random base a yields period r with high success rate.',
    stat: '86% success · ≥50% theory',
    modal: (
      <>
        <ModalTitle color="#7c3aed">Lab 2 — Period-Finding</ModalTitle>
        <Step n={1} color="#7c3aed">Miller conditions verified; failures → a^(r/2) ≡ −1 mod N</Step>
        <Step n={2} color="#10b981">O(1) expected trials; QFT beats classical O(r)</Step>
      </>
    ),
  },
  {
    id: 3,
    badge: 'LAB 3',
    color: '#10b981',
    bg: 'bg-accent-green/20',
    title: 'QFT Simulation',
    desc: 'Statevector QFT on N=16: peaks at k = m·(N/r).',
    stat: '25% per peak · norm = 1',
    modal: (
      <>
        <ModalTitle color="#10b981">Lab 3 — QFT Simulation</ModalTitle>
        <Step n={1} color="#10b981">Peaks at 0, 4, 8, 12 → period r = 4</Step>
        <Step n={2} color="#d97706">N=35 fails: needs 2n qubits — simulation limit</Step>
      </>
    ),
  },
]

function Lab1Chart() {
  return (
    <ChartFrame height={100}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={LAB1_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="n" tick={{ fontSize: 7 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 7 }} stroke="#64748b" width={24} />
          <Line dataKey="measured" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line dataKey="theory" stroke="#d97706" strokeWidth={1.5} strokeDasharray="4 3" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function Lab2Chart() {
  return (
    <ChartFrame height={100}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={LAB2_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 7 }} stroke="#64748b" />
          <YAxis tick={{ fontSize: 7 }} stroke="#64748b" domain={[0, 100]} unit="%" width={28} />
          <Bar dataKey="v" radius={[2, 2, 0, 0]} maxBarSize={20}>
            {LAB2_DATA.map((_, i) => (
              <Cell key={i} fill={i === 0 ? '#7c3aed' : 'rgba(124,58,237,0.45)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

function Lab3Chart() {
  return (
    <ChartFrame height={100}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={LAB3_DATA} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis dataKey="k" tick={{ fontSize: 7 }} stroke="#64748b" interval={3} />
          <YAxis tick={{ fontSize: 7 }} stroke="#64748b" domain={[0, 30]} unit="%" width={28} />
          <Bar dataKey="prob" radius={[1, 1, 0, 0]} maxBarSize={8}>
            {LAB3_DATA.map((e) => (
              <Cell key={e.k} fill={LAB3_PEAKS.includes(e.k) ? '#10b981' : 'rgba(255,255,255,0.1)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

const CHARTS = [Lab1Chart, Lab2Chart, Lab3Chart]

export default function S10_LabsOverview() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <h2 className="mb-1 text-center text-xl font-bold md:text-2xl">Experimental Labs — Overview</h2>
      <p className="mb-4 text-center text-xs text-white/50">
        Three simulations validating classical hardness, period-finding, and QFT
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
              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${lab.bg}`} style={{ color: lab.color }}>
                  {lab.badge}
                </span>
                <h3 className="text-sm font-bold">{lab.title}</h3>
              </div>
              <p className="mb-2 text-[10px] leading-snug text-white/55">{lab.desc}</p>
              <Chart />
              <p className="mt-2 font-mono text-[10px] font-semibold" style={{ color: lab.color }}>
                {lab.stat}
              </p>
              <p className="mt-1 text-[9px] text-white/30">Click for details →</p>
            </motion.button>
          )
        })}
      </div>

      <p className="mt-4 text-center text-[10px] text-white/40">
        Lab 4 (Qiskit circuit, N=15) on the next slide →
      </p>
    </SlideWrapper>
  )
}
