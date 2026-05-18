import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step } from '../modals/ModalContent'

const CARDS = [
  { id: 'hw', title: 'Hardware', color: '#10b981', text: 'IBM Condor 1127 q · Google Willow ~105 q · Need ~20M logical qubits' },
  { id: 'time', title: 'Timeline', color: '#d97706', text: '10–25 years — no scientific consensus on CRQC arrival' },
  { id: 'gut', title: 'Gutmann & Neuhaus 2025', color: '#7c3aed', text: 'Sceptical take: VIC-20, abacus, dog — click for fun modal' },
  { id: 'skep', title: 'Sceptical views', color: '#dc2626', text: 'Dyakonov et al. — serious debate, not a fringe minority' },
]

export default function S15_Threat() {
  const { openModal } = useModal()

  const gutModal = (
    <>
      <ModalTitle color="#7c3aed">Gutmann &amp; Neuhaus (2025)</ModalTitle>
      <Step n={1} color="#7c3aed">🖥️ VIC-20 — classical toy</Step>
      <Step n={2} color="#d97706">🧮 Abacus — manual counting</Step>
      <Step n={3} color="#10b981">🐕 Dog — &quot;even he can&apos;t factor RSA&quot;</Step>
      <p className="text-sm text-white/60">Humorous critique of quantum hype — still worth engaging seriously.</p>
    </>
  )

  return (
    <SlideWrapper>
      <h2 className="mb-6 text-2xl font-bold">Is RSA broken today?</h2>
      <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {CARDS.map((c) => (
          <button
            key={c.id}
            onClick={() => openModal(
              c.id === 'gut' ? gutModal : (
                <>
                  <ModalTitle color={c.color}>{c.title}</ModalTitle>
                  <Step n={1} color={c.color}>{c.text}</Step>
                </>
              )
            )}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:scale-[1.02]"
            style={{ borderColor: `${c.color}40` }}
          >
            <h3 className="text-lg font-bold" style={{ color: c.color }}>{c.title}</h3>
            <p className="mt-2 text-sm text-white/60">{c.text}</p>
          </button>
        ))}
      </div>
    </SlideWrapper>
  )
}
