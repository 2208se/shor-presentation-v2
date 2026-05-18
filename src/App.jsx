import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ModalProvider } from './context/ModalContext'
import HUD from './components/HUD'
import Modal from './components/Modal'
import ParticleBackground from './components/ParticleBackground'

import S1_Title from './components/slides/S1_Title'
import S2_Roadmap from './components/slides/S2_Roadmap'
import S3_RSA from './components/slides/S3_RSA'
import S4_Complexity from './components/slides/S4_Complexity'
import S5_ShorIdea from './components/slides/S5_ShorIdea'
import S6_Miller from './components/slides/S6_Miller'
import S7_Qubit from './components/slides/S7_Qubit'
import S8_QFT from './components/slides/S8_QFT'
import S9_Complexity from './components/slides/S9_Complexity'
import S10_LabsOverview from './components/slides/S10_LabsOverview'
import S13_Lab4 from './components/slides/S13_Lab4'
import S15_Threat from './components/slides/S15_Threat'
import S16_NIST from './components/slides/S16_NIST'
import S17_Unique from './components/slides/S17_Unique'
import S18_Conclusion from './components/slides/S18_Conclusion'
import S19_References from './components/slides/S19_References'

const SLIDES = [
  S1_Title, S2_Roadmap, S3_RSA, S4_Complexity, S5_ShorIdea, S6_Miller,
  S7_Qubit, S8_QFT, S9_Complexity, S10_LabsOverview, S13_Lab4,
  S15_Threat, S16_NIST, S17_Unique, S18_Conclusion, S19_References,
]

const TOTAL = SLIDES.length

export default function App() {
  const [current, setCurrent] = useState(0)
  const [burst, setBurst] = useState(null)
  const [touchStart, setTouchStart] = useState(null)

  const go = useCallback((n) => setCurrent(Math.max(0, Math.min(TOTAL - 1, n))), [])
  const next = useCallback(() => go(current + 1), [current, go])
  const prev = useCallback(() => go(current - 1), [current, go])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft') {
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (touchStart == null) return
    const dx = e.changedTouches[0].clientX - touchStart
    if (dx > 60) prev()
    else if (dx < -60) next()
    setTouchStart(null)
  }

  const triggerBurst = (x, y) => setBurst({ x, y, t: Date.now() })

  const Slide = SLIDES[current]

  return (
    <ModalProvider>
      <div
        className="relative min-h-screen bg-bg"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ParticleBackground burst={burst} />
        <HUD current={current} total={TOTAL} onGo={go} onPrev={prev} onNext={next} />
        <AnimatePresence mode="wait">
          <Slide key={current} onNavigate={go} onBurst={triggerBurst} />
        </AnimatePresence>
        <Modal />
      </div>
    </ModalProvider>
  )
}
