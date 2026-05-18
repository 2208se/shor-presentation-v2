import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step, Formula } from '../modals/ModalContent'

export default function S17_Unique() {
  const { openModal } = useModal()

  const bqpModal = (
    <>
      <ModalTitle>Shor &amp; Complexity Classes</ModalTitle>
      <Formula>BPP ⊆ BQP — quantum can simulate classical efficiently</Formula>
      <Step n={1} color="#7c3aed">Factoring ∈ BQP (Shor 1994)</Step>
      <Step n={2} color="#dc2626">Factoring ∈ BPP? OPEN — no classical poly algorithm known</Step>
      <p className="text-sm text-white/60">Shor places factoring in BQP \ BPP if BPP ≠ BQP.</p>
    </>
  )

  return (
    <SlideWrapper>
      <h2 className="mb-6 text-2xl font-bold">Shor&apos;s Unique Position</h2>
      <div className="grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 opacity-60">
          <h3 className="font-bold text-white/70">Grover search</h3>
          <p className="mt-2 font-mono text-sm">O(√N) vs O(N)</p>
          <p className="mt-2 text-sm text-white/50">Quadratic speedup — polynomial improvement only</p>
        </div>
        <button
          onClick={() => openModal(bqpModal)}
          className="relative rounded-2xl border-2 border-accent-purple bg-accent-purple/10 p-6 text-left shadow-[0_0_30px_rgba(124,58,237,0.3)]"
        >
          <span className="absolute -top-2 right-4 rounded-full bg-accent-yellow px-2 py-0.5 text-[10px] font-bold text-black">
            UNIQUE IN HISTORY
          </span>
          <h3 className="font-bold text-accent-purple">Shor&apos;s algorithm</h3>
          <p className="mt-2 font-mono text-sm">O(n³) vs e^(n^⅓)</p>
          <p className="mt-2 text-sm text-white/70">Superpolynomial speedup on a practically important problem</p>
          <p className="mt-2 text-xs text-accent-green">Factoring ∈ BQP \ BPP (conjectured)</p>
        </button>
      </div>
    </SlideWrapper>
  )
}
