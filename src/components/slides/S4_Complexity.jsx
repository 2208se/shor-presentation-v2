import SlideWrapper from '../SlideWrapper'
import ComplexityChart from '../interactive/ComplexityChart'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const MODALS = {
  trial: (
    <>
      <ModalTitle color="#dc2626">Trial Division</ModalTitle>
      <Step n={1} color="#dc2626">Test divisors up to √N</Step>
      <Step n={2} color="#dc2626">O(2^(n/2)) operations for n-bit N</Step>
      <p className="text-sm text-white/60">Exponential in input size — infeasible for RSA-2048.</p>
    </>
  ),
  pollard: (
    <>
      <ModalTitle color="#d97706">Pollard ρ</ModalTitle>
      <Step n={1} color="#d97706">Random walk in ℤ/Nℤ</Step>
      <Step n={2} color="#d97706">Birthday paradox → factor in O(2^(n/4))</Step>
    </>
  ),
  shor: (
    <>
      <ModalTitle color="#10b981">Shor O(n³)</ModalTitle>
      <Step n={1} color="#10b981">Quantum period-finding + QFT</Step>
      <Step n={2} color="#10b981">Polynomial in n = log₂ N</Step>
    </>
  ),
}

export default function S4_Complexity() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <h2 className="mb-2 text-center text-xl font-bold md:text-2xl">All classical algorithms are exponential in n = log₂N</h2>
      <p className="mb-4 text-center text-xs text-white/50">y-axis = log₁₀(operations) · x-axis = n (input size in bits)</p>
      <ComplexityChart />
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {[
          ['trial', 'Trial division', '#dc2626'],
          ['pollard', 'Pollard ρ', '#d97706'],
          ['shor', 'Shor O(n³)', '#10b981'],
        ].map(([key, label, color]) => (
          <button
            key={key}
            onClick={() => openModal(MODALS[key])}
            className="rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-white/10"
            style={{ borderColor: color, color }}
          >
            {label}
          </button>
        ))}
      </div>
    </SlideWrapper>
  )
}
