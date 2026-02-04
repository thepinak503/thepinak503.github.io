import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Hero() {
  const canvasRef = useRef(null)
  const subtitleRef = useRef(null)
  const spotlightRef = useRef(null)
  const navigate = useNavigate()
  const [subtitle, setSubtitle] = useState('')
  const phrases = ['Developer', 'System enthusiast', 'Lifelong learner']
  const phraseIndex = useRef(0)
  const charIndex = useRef(0)
  const isDeleting = useRef(false)

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0, height = 0, raf = 0
    const particles = []
    const PARTICLE_COUNT = 60
    const DPR = Math.min(2, window.devicePixelRatio || 1)

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = Math.floor(rect.width)
      height = Math.floor(rect.height)
      canvas.width = Math.floor(width * DPR)
      canvas.height = Math.floor(height * DPR)
      ctx.scale(DPR, DPR)
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min
    }

    function initParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          r: rand(1, 2.5),
          opacity: rand(0.3, 0.8),
          vx: rand(-0.3, 0.3),
          vy: rand(-0.15, 0.15)
        })
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height)
      ctx.save()
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -5) p.x = width + 5
        if (p.x > width + 5) p.x = -5
        if (p.y < -5) p.y = height + 5
        if (p.y > height + 5) p.y = -5
        ctx.globalAlpha = p.opacity
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6)
        grad.addColorStop(0, 'rgba(124,58,237,0.6)')
        grad.addColorStop(1, 'rgba(124,58,237,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
      raf = requestAnimationFrame(step)
    }

    const onResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener('resize', onResize)
    resize()
    initParticles()
    step()

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
      } else {
        step()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Spotlight effect
  useEffect(() => {
    const spotlight = spotlightRef.current
    if (!spotlight) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const update = (x, y) => {
      spotlight.style.setProperty('--x', x + 'px')
      spotlight.style.setProperty('--y', y + 'px')
    }

    window.addEventListener('pointermove', (e) => update(e.clientX, e.clientY), { passive: true })
  }, [])

  // Typewriter effect
  useEffect(() => {
    const typeStep = () => {
      const current = phrases[phraseIndex.current % phrases.length]
      
      if (!isDeleting.current) {
        charIndex.current++
        if (charIndex.current >= current.length + 3) {
          isDeleting.current = true
        }
      } else {
        charIndex.current--
        if (charIndex.current <= 0) {
          isDeleting.current = false
          phraseIndex.current++
        }
      }
      
      setSubtitle(current.slice(0, Math.max(0, charIndex.current)))
    }

    const timeout = setTimeout(typeStep, isDeleting.current ? 60 : 120)
    return () => clearTimeout(timeout)
  }, [subtitle])

  return (
    <section id="home" className="hero" aria-label="Hero">
      <div className="hero-inner">
        <p className="eyebrow">Hello, I'm</p>
        <h1>Pinak Dhabu</h1>
        <p className="subtitle" ref={subtitleRef}>{subtitle}</p>
        <div className="hero-cta">
          <button
            className="btn btn-primary magnetic"
            onClick={() => navigate('/projects')}
            aria-label="View my work"
          >
            View my work
          </button>
          <button
            className="btn btn-secondary magnetic"
            onClick={() => navigate('/about')}
            aria-label="About me"
          >
            About me
          </button>
        </div>
      </div>
      <canvas className="hero-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="hero-spotlight" ref={spotlightRef} aria-hidden="true"></div>
      <div className="hero-orb" aria-hidden="true"></div>
    </section>
  )
}

export default Hero
