import { useState } from 'react'
import { motion } from 'framer-motion'
import SlideWrapper from '../SlideWrapper'
import BlochSphere from '../interactive/BlochSphere'
import WaveInterference from '../interactive/WaveInterference'

function ClassicalBit() {
  const [bit, setBit] = useState(0)
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs text-white/50">Classical bit</p>
      <button
        onClick={() => setBit(1 - bit)}
        className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-white/20 bg-white/5 font-mono text-2xl font-bold transition hover:border-accent-blue"
      >
        <motion.span key={bit} initial={{ rotateY: 90 }} animate={{ rotateY: 0 }}>
          {bit}
        </motion.span>
      </button>
      <p className="text-[10px] text-white/40">click to toggle</p>
    </div>
  )
}

function HadamardSection() {
  const [n, setN] = useState(2)
  const bars = Math.pow(2, n)
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-xs font-mono">
        <span>|0⟩</span>
        <span className="rounded border border-accent-blue px-2 py-1 bg-accent-blue/20">H</span>
        <span>(|0⟩+|1⟩)/√2</span>
      </div>
      <label className="text-[10px] text-white/50">n qubits: {n}</label>
      <input type="range" min={1} max={4} value={n} onChange={(e) => setN(+e.target.value)} className="w-32 accent-accent-purple" />
      <div className="flex h-24 items-end gap-0.5">
        {Array.from({ length: bars }, (_, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-t bg-accent-purple"
            initial={{ height: 0 }}
            animate={{ height: `${100 / bars}%` }}
            transition={{ delay: i * 0.02 }}
            style={{ maxHeight: '80px', minHeight: '4px' }}
          />
        ))}
      </div>
      <p className="text-center text-[10px] text-accent-yellow">NOT magic parallelism — measurement collapses to ONE outcome</p>
    </div>
  )
}

export default function S7_Qubit() {
  return (
    <SlideWrapper scroll>
      <h2 className="mb-3 text-xl font-bold text-center">What is a Quantum Computer?</h2>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-3 text-center text-xs font-semibold text-accent-purple">A — Classical vs Quantum bit</p>
          <div className="flex justify-around">
            <ClassicalBit />
            <BlochSphere />
          </div>
          <p className="mt-3 text-center font-mono text-[10px] text-white/60">|ψ⟩ = α|0⟩ + β|1⟩, |α|²+|β|²=1</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-center text-xs font-semibold text-accent-blue">B — Superposition &amp; interference</p>
          <WaveInterference />
          <p className="mt-2 text-center text-[10px] text-white/40">A quantum algorithm is a designed interference pattern</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="mb-2 text-center text-xs font-semibold text-accent-green">C — Hadamard &amp; superposition</p>
          <HadamardSection />
        </div>
      </div>
    </SlideWrapper>
  )
}
