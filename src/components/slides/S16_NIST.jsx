import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const STANDARDS = [
  { name: 'ML-KEM', fips: '203', problem: 'Module-LWE', size: '~1.5 KB', replaces: 'RSA/KEM key exchange' },
  { name: 'ML-DSA', fips: '204', problem: 'Module-LWE', size: '~3 KB', replaces: 'ECDSA/RSA signatures' },
  { name: 'SLH-DSA', fips: '205', problem: 'Hash functions', size: '~8 KB', replaces: 'Backup signatures' },
]

export default function S16_NIST() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <h2 className="mb-2 text-xl font-bold">Harvest Now, Decrypt Later — why act now?</h2>
      <svg viewBox="0 0 400 60" className="mb-4 w-full max-w-lg">
        <text x="10" y="25" fill="#7c3aed" fontSize="10">2024: data encrypted</text>
        <line x1="120" y1="20" x2="200" y2="20" stroke="#d97706" strokeWidth="2" markerEnd="url(#arr)" />
        <text x="210" y="25" fill="#d97706" fontSize="10">2034?: CRQC</text>
        <line x1="300" y1="20" x2="380" y2="20" stroke="#dc2626" strokeWidth="2" />
        <text x="300" y="45" fill="#dc2626" fontSize="10">retroactive decrypt</text>
      </svg>
      <p className="mb-4 max-w-2xl rounded-lg border border-accent-yellow/40 bg-accent-yellow/10 px-3 py-2 text-xs text-accent-yellow">
        Quantum-resistant primitives standardised by NIST (August 2024), safe against Shor&apos;s algorithm
      </p>
      <div className="grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        {STANDARDS.map((s) => (
          <button
            key={s.name}
            onClick={() => openModal(
              <>
                <ModalTitle>{s.name}</ModalTitle>
                <Step n={1} color="#7c3aed">FIPS {s.fips}</Step>
                <Step n={2} color="#2563eb">Hard problem: {s.problem}</Step>
                <Step n={3} color="#10b981">Key size: {s.size}</Step>
                <p className="text-sm text-white/60">Replaces: {s.replaces}</p>
              </>
            )}
            className="rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:border-accent-purple/50"
          >
            <p className="font-bold text-accent-purple">{s.name}</p>
            <p className="text-xs text-white/50">FIPS {s.fips}</p>
            <p className="mt-1 text-[10px] text-white/40">{s.problem}</p>
          </button>
        ))}
      </div>
    </SlideWrapper>
  )
}
