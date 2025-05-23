import React, { useRef, useState, useEffect } from 'react'

const HeroSection = () => {
  const [hovered, setHovered] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  type Particle = {
    x: number; y: number; targetX: number; targetY: number;
    phoenixX: number; phoenixY: number; size: number; opacity: number; speed: number;
  }
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const particles: Particle[] = []
    const COUNT = 150

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        phoenixX: canvas.width / 2 + Math.cos(i * 0.1) * (100 + i * 2),
        phoenixY: canvas.height / 2 + Math.sin(i * 0.1) * (50 + i),
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.01
      })
    }
    particlesRef.current = particles

    // Animation loop
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create gradient background effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      )
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        // Determine target based on hover state
        const targetX = hovered ? particle.phoenixX : particle.targetX
        const targetY = hovered ? particle.phoenixY : particle.targetY

        // Smooth movement towards target
        particle.x += (targetX - particle.x) * particle.speed
        particle.y += (targetY - particle.y) * particle.speed

        // Add floating motion
        particle.x += Math.sin(time * 0.001 + i * 0.1) * 0.5
        particle.y += Math.cos(time * 0.0005 + i * 0.1) * 0.3

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.x -= dx * force * 0.1
          particle.y -= dy * force * 0.1
        }

        // Draw particle with glow effect
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = hovered ? '#f97316' : '#3b82f6'
        ctx.shadowColor = hovered ? '#f97316' : '#3b82f6'
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections for phoenix formation
        if (hovered && i < particles.length - 1) {
          const next = particles[i + 1]
          const dist = Math.sqrt((particle.x - next.x) ** 2 + (particle.y - next.y) ** 2)
          if (dist < 80) {
            ctx.save()
            ctx.globalAlpha = 0.3
            ctx.strokeStyle = '#f97316'
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(next.x, next.y)
            ctx.stroke()
            ctx.restore()
          }
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hovered])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="transform transition-all duration-700 hover:scale-105">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Igniting Impact,
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">
              One Line of Code at a Time
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed">
            Student-powered digital solutions for nonprofits.
            <br />
            <span className="text-lg text-gray-400 mt-2 block">
              Where innovation meets purpose, and code creates change.
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform">
              <span className="flex items-center gap-2">
                View Our Work
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl transition-all duration-300 text-white font-semibold text-lg backdrop-blur-sm hover:scale-105 transform">
              <span className="flex items-center gap-2">
                Get Started
                <svg className="w-5 h-5 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        
        {/* Floating indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Discover More</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  )
}

export default HeroSection