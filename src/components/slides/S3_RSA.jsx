import { motion } from 'framer-motion'
import { Lock, Unlock } from 'lucide-react'
import SlideWrapper from '../SlideWrapper'
import { useModal } from '../../context/ModalContext'
import { ModalTitle, Step, Formula } from '../modals/ModalContent'

const KEY_STEPS = [
  'Choose primes p, q (secret)',
  'N = p × q (public modulus)',
  'φ(N) = (p−1)(q−1)',
  'Choose e with gcd(e, φ(N)) = 1',
  'd = e⁻¹ mod φ(N) [Extended GCD]',
  '→ Public key: (N, e) · Private key: (N, d)',
]

export default function S3_RSA() {
  const { openModal } = useModal()

  const securityModal = (
    <>
      <ModalTitle color="#d97706">Factoring ↔ RSA Security</ModalTitle>
      <Step n={1} color="#10b981">Factoring N ⇒ break RSA (provable reduction)</Step>
      <Step n={2} color="#dc2626">Converse: RSA break ⇒ factor N? OPEN PROBLEM</Step>
      <Formula>Best known attack: factor N, then compute φ(N) or d</Formula>
      <p className="text-sm text-white/60">RSA security is equivalent to factoring in practice, but a formal equivalence remains unproven.</p>
    </>
  )

  return (
    <SlideWrapper scroll>
      <h2 className="mb-4 text-2xl font-bold">RSA Protocol</h2>
      <div className="grid w-full max-w-5xl grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-accent-purple/30 bg-white/5 p-4">
          <h3 className="mb-3 font-semibold text-accent-purple">Key Generation</h3>
          <ol className="space-y-2">
            {KEY_STEPS.map((s, i) => (
              <motion.li key={i} className="flex gap-2 text-sm" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-purple" />
                <span className="font-mono text-white/80">{s}</span>
              </motion.li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-accent-blue/30 bg-white/5 p-4">
          <h3 className="mb-3 font-semibold text-accent-blue">Cipher Primitive</h3>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <Lock className="text-accent-green" size={24} />
            <div>
              <p className="text-xs text-white/50">Enciphering</p>
              <p className="font-mono text-sm">m ↦ m<sup>e</sup> mod N = c</p>
            </div>
          </div>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <Unlock className="text-accent-blue" size={24} />
            <div>
              <p className="text-xs text-white/50">Deciphering</p>
              <p className="font-mono text-sm">c ↦ c<sup>d</sup> mod N = m</p>
            </div>
          </div>
          <p className="text-xs text-white/50">
            Works because ed ≡ 1 mod φ(N) → m<sup>ed</sup> = m mod N (Euler&apos;s theorem)
          </p>
        </div>
      </div>
      <button
        onClick={() => openModal(securityModal)}
        className="mt-4 max-w-5xl rounded-lg border border-accent-yellow/50 bg-accent-yellow/10 px-4 py-3 text-left text-sm text-accent-yellow transition hover:bg-accent-yellow/20"
      >
        ⚠ Security nuance: Factoring → breaking RSA (provable). Converse is an OPEN PROBLEM. — click for details
      </button>
    </SlideWrapper>
  )
}
