import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle } from '../modals/ModalContent'

const REFS = [
  { id: 1, text: 'Shor, P. (1994). Algorithms for quantum computation.', cat: 'quantum' },
  { id: 2, text: 'Nielsen & Chuang (2010). Quantum Computation and Quantum Information.', cat: 'quantum' },
  { id: 3, text: 'Preskill, J. (2018). Quantum computing in the NISQ era.', cat: 'quantum' },
  { id: 4, text: 'Pollard, J. (1975). A Monte Carlo method for factorization.', cat: 'classical' },
  { id: 5, text: 'Lenstra et al. General number field sieve.', cat: 'classical' },
  { id: 6, text: 'NIST (2024). Post-Quantum Cryptography Standards.', cat: 'threat' },
  { id: 7, text: 'Mosca, M. (2018). Cybersecurity in an era with quantum computers.', cat: 'threat' },
  { id: 8, text: 'Gidney & Ekerå (2021). How to factor 2048-bit RSA integers.', cat: 'threat' },
  { id: 9, text: 'Dyakonov, M. (2020). The case against quantum computing.', cat: 'threat' },
  { id: 10, text: 'Gutmann & Neuhaus (2025). Critique of quantum factoring claims.', cat: 'threat' },
  { id: 11, text: 'IBM Quantum (2024). Condor processor specifications.', cat: 'software' },
  { id: 12, text: 'Qiskit Documentation — Shor tutorial.', cat: 'software' },
  { id: 13, text: 'Miller, G. (1976). Riemann\'s hypothesis and tests of primality.', cat: 'classical' },
  { id: 14, text: 'Euler\'s theorem — RSA mathematical foundation.', cat: 'classical' },
  { id: 15, text: 'USMB Licence 3 — Mémoire Kiouaz Selssabila (2026).', cat: 'software' },
]

const COLORS = { quantum: '#7c3aed', classical: '#2563eb', threat: '#d97706', software: '#10b981' }

export default function S19_References() {
  const { openModal } = useModal()

  return (
    <SlideWrapper scroll>
      <h2 className="mb-4 text-2xl font-bold">References</h2>
      <ul className="max-h-[calc(100vh-140px)] w-full max-w-3xl space-y-2 overflow-y-auto pr-2">
        {REFS.map((r) => (
          <li key={r.id}>
            <button
              onClick={() => openModal(
                <>
                  <ModalTitle color={COLORS[r.cat]}>Reference [{r.id}]</ModalTitle>
                  <p className="text-sm text-white/80">{r.text}</p>
                  <p className="mt-2 text-xs text-white/40">Category: {r.cat}</p>
                </>
              )}
              className="w-full rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-left text-xs transition hover:bg-white/10"
              style={{ borderLeftColor: COLORS[r.cat], borderLeftWidth: 3 }}
            >
              <span className="font-mono text-white/40">[{r.id}]</span> {r.text}
            </button>
          </li>
        ))}
      </ul>
    </SlideWrapper>
  )
}
