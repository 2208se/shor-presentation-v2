import SlideWrapper from '../SlideWrapper'
import QFTCircuit from '../interactive/QFTCircuit'
import BarChartQFT from '../interactive/BarChartQFT'

export default function S8_QFT() {
  return (
    <SlideWrapper scroll>
      <div className="flex w-full max-w-5xl flex-col items-center gap-5">
        <div>
          <p className="mb-2 text-center font-mono text-xs text-accent-green md:text-sm">
            QFT_N |j⟩ = (1/√N) Σ e^(2πijk/N) |k⟩
          </p>
          <QFTCircuit />
        </div>
        <BarChartQFT />
        <p className="max-w-xl text-center text-[10px] text-white/50">
          After QFT, measure k → k/N ≈ j/r → continued fractions recover period r
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="rounded-lg border border-red-600/40 bg-red-600/20 px-3 py-1 text-[10px] text-red-500">
            Classical FFT: O(2^n·n) [exponential]
          </span>
          <span className="rounded-lg border border-accent-green/40 bg-accent-green/20 px-3 py-1 text-[10px] text-accent-green">
            QFT: O(n²) [polynomial]
          </span>
        </div>
      </div>
    </SlideWrapper>
  )
}
