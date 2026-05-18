export function Step({ n, color, children }) {
  return (
    <div className="mb-3 flex gap-3">
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ background: color }}
      >
        {n}
      </span>
      <div className="text-sm text-white/80">{children}</div>
    </div>
  )
}

export function ModalTitle({ children, color = '#7c3aed' }) {
  return (
    <h3 className="mb-4 text-lg font-bold" style={{ color }}>
      {children}
    </h3>
  )
}

export function Formula({ children }) {
  return <p className="my-2 rounded-lg bg-white/5 p-2 font-mono text-sm text-accent-green">{children}</p>
}
