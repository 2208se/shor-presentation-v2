import SlideWrapper from '../SlideWrapper'
import ShorCircuit from '../interactive/ShorCircuit'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const STATS = [
  { label: 'Gates', value: '26' },
  { label: 'Outcomes', value: '4' },
  { label: 'χ² p', value: '>0.8' },
  { label: 'Result', value: '15=3×5' },
]

export default function S13_Lab4() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-lg bg-accent-yellow/20 px-2 py-1 text-xs font-bold text-accent-yellow">LAB 4</span>
        <h2 className="text-xl font-bold">Qiskit Circuit — N=15, a=7</h2>
      </div>
      <div className="mb-2 grid grid-cols-4 gap-2">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
            <p className="text-[10px] text-white/50">{s.label}</p>
            <p className="font-mono text-sm font-bold">{s.value}</p>
          </div>
        ))}
      </div>
      <ShorCircuit />
      {[
        { t: 'Engineering: transpile & depth', d: 'Optimized circuit depth for NISQ hardware constraints.' },
        { t: 'Oracle: 7⁴ ≡ 1 mod 15', d: 'Period r=4 allows simplified controlled-U blocks.' },
        { t: 'Scaling to larger N', d: 'Qubit count grows as 2n+3 — fault-tolerant millions of qubits needed.' },
      ].map((f) => (
        <button
          key={f.t}
          onClick={() => openModal(<><ModalTitle>{f.t}</ModalTitle><Step n={1} color="#d97706">{f.d}</Step></>)}
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-xs hover:bg-white/10"
        >
          ▸ {f.t}
        </button>
      ))}
    </SlideWrapper>
  )
}
