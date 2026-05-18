export default function ChartFrame({ children, height = 280, className = '' }) {
  return (
    <div className={`w-full ${className}`} style={{ height, minHeight: height }}>
      {children}
    </div>
  )
}
