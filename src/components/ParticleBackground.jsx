import { useEffect, useRef } from 'react'

export default function ParticleBackground({ burst = null }) {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const burstRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    burstRef.current = burst
  }, [burst])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 15000))
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      hue: [260, 160, 220, 200][Math.floor(Math.random() * 4)],
      alpha: Math.random() * 0.5 + 0.2,
    }))

    const bursts = []

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (burstRef.current) {
        const { x, y, t } = burstRef.current
        if (Date.now() - t < 800) {
          for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2
            const dist = ((Date.now() - t) / 800) * 120
            bursts.push({
              x: x + Math.cos(angle) * dist,
              y: y + Math.sin(angle) * dist,
              alpha: 1 - (Date.now() - t) / 800,
              hue: 270,
            })
          }
        }
        burstRef.current = null
      }

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        g.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.alpha})`)
        g.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  )
}
