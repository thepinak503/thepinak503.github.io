import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion, useSpring, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Github, Linkedin } from './Icons'
import { personalInfo, socialLinks, typewriterWords } from '../data/portfolio'

/* -- Particle canvas background (optimized with refs) -- */
function ParticleCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<{
    x: number; y: number; vx: number; vy: number; size: number; alpha: number
  }[]>([])
  const dimsRef = useRef({ width: 0, height: 0 })
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Keep mouseRef in sync without triggering re-render
  mouseRef.current = { x: mouseX, y: mouseY }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function resize() {
      if (!canvas) return
      const w = canvas.parentElement?.offsetWidth || window.innerWidth
      const h = canvas.parentElement?.offsetHeight || window.innerHeight
      canvas.width = w
      canvas.height = h
      dimsRef.current = { width: w, height: h }
    }

    function initParticles() {
      const { width, height } = dimsRef.current
      const count = Math.min(60, Math.floor((width * height) / 15000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      }))
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
      const particleColor = isDark ? '180, 190, 220' : '60, 70, 110'
      const particles = particlesRef.current
      const { width, height } = dimsRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particles) {
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx -= dx * 0.00005
          p.vy -= dy * 0.00005
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        p.vx *= 0.99
        p.vy *= 0.99

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`
        ctx.fill()
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${particleColor}, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    const handleResize = () => { resize(); initParticles() }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty deps — particle system runs once; mouse position read from ref

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}

/* -- Floating geometric shapes -- */
function FloatingShapes() {
  const shapes = useMemo(() => [
    { type: 'circle' as const, size: 4, top: '15%', left: '10%', delay: 0, duration: 14, color: 'var(--accent)' },
    { type: 'square' as const, size: 3, top: '25%', right: '15%', delay: 2, duration: 16, color: 'var(--accent)' },
    { type: 'triangle' as const, size: 5, top: '60%', left: '85%', delay: 4, duration: 18, color: 'var(--accent)' },
    { type: 'circle' as const, size: 2, top: '75%', left: '20%', delay: 1, duration: 12, color: 'var(--accent)' },
    { type: 'square' as const, size: 2.5, top: '40%', right: '8%', delay: 3, duration: 15, color: 'var(--accent)' },
    { type: 'circle' as const, size: 1.5, top: '80%', right: '30%', delay: 5, duration: 13, color: 'var(--accent)' },
    { type: 'square' as const, size: 3.5, top: '10%', right: '40%', delay: 6, duration: 17, color: 'var(--accent)' },
    { type: 'circle' as const, size: 2.5, top: '50%', left: '5%', delay: 0.5, duration: 11, color: 'var(--accent)' },
  ], [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
      {shapes.map((shape, i) => {
        const sizePx = shape.size * 8
        const style: React.CSSProperties = {
          position: 'absolute',
          top: shape.top,
          left: 'left' in shape ? shape.left as string : undefined,
          right: 'right' in shape ? shape.right as string : undefined,
          width: sizePx,
          height: sizePx,
          opacity: 0.08,
        }

        if (shape.type === 'circle') {
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{ ...style, background: shape.color }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.06, 0.12, 0.06],
                scale: [1, 1.1, 1],
                y: [0, -15, 0],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.delay,
                ease: 'easeInOut',
              }}
            />
          )
        }

        if (shape.type === 'square') {
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ ...style, border: `1px solid ${shape.color}`, borderRadius: '2px' }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.06, 0.12, 0.06],
                scale: [1, 1.1, 1],
                y: [0, -15, 0],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                delay: shape.delay,
                ease: 'easeInOut',
              }}
            />
          )
        }

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...style,
              background: shape.color,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.06, 0.12, 0.06],
              scale: [1, 1.1, 1],
              y: [0, -15, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        )
      })}
    </div>
  )
}

/* -- Aurora gradient background -- */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 30% 40%, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.3,
        }}
      />
      <div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 70% 60%, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.2,
        }}
      />
    </div>
  )
}

/* -- Orbiting accent elements -- */
function OrbitingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
      <motion.div
        className="absolute top-1/4 right-1/4 w-1 h-1 rounded-full"
        style={{ background: 'var(--accent)', opacity: 0.3 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-2 h-2 rounded-full absolute"
          style={{ background: 'var(--accent)', top: -4, left: -4, opacity: 0.2 }}
        />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-0.5 h-0.5 rounded-full"
        style={{ background: 'var(--accent)', opacity: 0.2 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-3 h-3 rounded-full absolute"
          style={{ background: 'var(--accent)', top: -6, left: -6, opacity: 0.1 }}
        />
      </motion.div>
    </div>
  )
}

/* -- Typewriter hook -- */
function useTypewriter(words: string[], typingSpeed = 60, deletingSpeed = 30, pauseDuration = 2000) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting) {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1))
        }, typingSpeed)
      } else {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, deletingSpeed)
      } else {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration])

  return text
}

/* -- Scroll indicator -- */
function ScrollIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <span className="text-[10px] uppercase tracking-widest text-muted font-medium">Scroll</span>
      <div className="w-px h-10 relative overflow-hidden rounded-full" style={{ background: 'var(--border)' }}>
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            background: 'var(--accent)',
            scaleY,
            transformOrigin: 'top',
            height: '100%',
          }}
        />
      </div>
      <ChevronDown size={12} className="text-muted" />
    </motion.div>
  )
}

/* -- Main Hero -- */
export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const typedText = useTypewriter(typewriterWords)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 80])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ background: 'var(--bg)' }}
    >
      <AuroraBackground />
      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} />
      <FloatingShapes />
      <OrbitingElements />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--fg) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div
        className="absolute pointer-events-none transition-opacity duration-500 hidden md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: 400,
          height: 400,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          opacity: mousePos.x > 0 ? 0.3 : 0,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 section-container text-center"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="status-pill status-pill--success text-xs">
            <Sparkles size={10} />
            Open for opportunities
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] mb-4"
          style={{ letterSpacing: '-0.04em', color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          {personalInfo.name.split(' ').map((word, i, arr) => (
            <span key={i} className="inline-block">
              <span className={i === 1 ? 'gradient-text' : ''}>{word}</span>
              {i < arr.length - 1 && <span className="mx-3 sm:mx-4" />}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-lg sm:text-xl text-muted font-medium">{personalInfo.shortBio.split('·')[0]}</span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-base sm:text-lg text-muted">
            <span className="hidden sm:inline">Currently: </span>
          </span>
          <span className="text-base sm:text-lg font-semibold text-fg relative">
            <span>{typedText}</span>
            <span className="inline-block w-[2px] h-[1em] ml-0.5 bg-accent animate-typing-cursor align-middle" />
          </span>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/projects" className="btn btn-primary group">
            View Projects
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get in Touch
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {socialLinks.map((link, i) => {
            const iconMap: Record<string, React.ReactNode> = {
              github: <Github size={16} />,
              linkedin: <Linkedin size={16} />,
            }
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost btn-icon text-muted hover:text-fg"
                aria-label={link.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {iconMap[link.icon] || null}
              </motion.a>
            )
          })}
          <span className="h-4 w-px" style={{ background: 'var(--border)' }} />
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xs text-muted hover:text-accent transition-colors animated-link"
          >
            {personalInfo.email}
          </a>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
