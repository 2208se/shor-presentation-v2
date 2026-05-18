import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function HUD({ current, total, onGo, onPrev, onNext }) {
  return (
  <>
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[50px] items-center justify-between border-b border-white/10 bg-[#03030d]/90 px-4 backdrop-blur-md">
      <span className="font-mono text-xs text-white/40">
        {String(current + 1).padStart(2, '0')} / {total}
      </span>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            onClick={() => onGo(i)}
            className="group relative p-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <motion.span
              className="block h-2 w-2 rounded-full"
              animate={{
                backgroundColor: i === current ? '#7c3aed' : 'rgba(255,255,255,0.2)',
                scale: i === current ? 1.3 : 1,
              }}
              whileHover={{ scale: 1.4 }}
            />
          </button>
        ))}
      </div>
      <span className="hidden text-xs text-white/30 sm:block">
        Kiouaz Selssabila · USMB 2026
      </span>
    </header>

    <button
      onClick={onPrev}
      disabled={current === 0}
      className="fixed left-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white disabled:opacity-20"
      aria-label="Previous slide"
    >
      <ChevronLeft size={24} />
    </button>
    <button
      onClick={onNext}
      disabled={current === total - 1}
      className="fixed right-2 top-1/2 z-40 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-white/60 backdrop-blur transition hover:bg-white/10 hover:text-white disabled:opacity-20"
      aria-label="Next slide"
    >
      <ChevronRight size={24} />
    </button>
  </>
  )
}
