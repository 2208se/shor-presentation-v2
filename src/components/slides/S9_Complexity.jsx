import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const ROWS = [
  { comp: 'Oracle (modular exp)', cost: 'O(n³)', pct: 60, detail: 'Controlled-U via repeated squaring' },
  { comp: 'QFT', cost: 'O(n²)', pct: 25, detail: 'n(n+1)/2 gates' },
  { comp: 'Classical post-process', cost: 'O(n²)', pct: 10, detail: 'Continued fractions, GCD' },
  { comp: 'Repetitions', cost: 'O(1)', pct: 5, detail: 'Constant expected trials' },
  { comp: 'TOTAL', cost: 'O(n³)', pct: 100, detail: 'Dominated by modular exponentiation' },
]

export default function S9_Complexity() {
  const { openModal } = useModal()

  return (
    <SlideWrapper>
      <h2 className="mb-4 text-2xl font-bold">Total Complexity</h2>
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-left text-white/50">
              <th className="p-3">Component</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Share</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr
                key={r.comp}
                onClick={() => openModal(
                  <>
                    <ModalTitle>{r.comp}</ModalTitle>
                    <Step n={1} color="#7c3aed">{r.detail}</Step>
                    <p className="font-mono text-accent-green">{r.cost}</p>
                  </>
                )}
                className="cursor-pointer border-b border-white/5 transition hover:bg-accent-purple/10"
              >
                <td className="p-3">{r.comp}</td>
                <td className="p-3 font-mono text-accent-green">{r.cost}</td>
                <td className="p-3">
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent-purple" style={{ width: `${r.pct}%` }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 max-w-2xl text-center text-sm text-white/60">
        RSA-2048: <span className="text-accent-green font-mono">8.6×10⁹</span> gate ops vs{' '}
        <span className="text-red-500 font-mono">6×10²⁸¹</span> years classically · speedup &gt;10⁶⁰⁰
      </p>
    </SlideWrapper>
  )
}
