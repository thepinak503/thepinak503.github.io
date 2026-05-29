import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, GraduationCap, Code, Terminal, Shield } from 'lucide-react'
import { personalInfo } from '../data/portfolio'
import Skills from '../components/Skills'
import Experience from '../components/Experience'

/* -- Animated counter -- */
function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = Date.now()

    function tick() {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress * (2 - progress)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center p-5 glass-card">
      <div className="text-3xl sm:text-4xl font-bold tabular-nums mb-1" style={{ color: 'var(--accent)' }}>
        {count}{suffix}
      </div>
      <div className="text-xs text-muted font-medium uppercase tracking-wider">{label}</div>
    </div>
  )
}

/* -- Journey timeline item -- */
function JourneyItem({
  item,
  index,
}: {
  item: { degree: string; school: string; period: string; desc: string }
  index: number
}) {
  return (
    <motion.div
      className="relative flex gap-4 pl-8 pb-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="absolute left-[7px] top-3 bottom-0 w-px"
        style={{ background: 'var(--border)' }}
      />
      <div
        className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 z-10"
        style={{ background: 'var(--bg)', borderColor: 'var(--accent)' }}
      />
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-semibold">{item.degree}</h4>
        <p className="text-xs text-muted mb-1">{item.school} · {item.period}</p>
        <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* -- Interest card -- */
function InterestCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <motion.div
      className="glass-card p-4 flex items-start gap-3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: 'var(--accent-subtle)' }}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-0.5">{title}</h4>
        <p className="text-xs text-muted leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  return (
    <div className="min-h-screen py-20 sm:py-28">
      <div className="section-container">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">About</span>
          <h1 className="section-title">Who I Am</h1>
          <p className="section-subtitle">
            Computer Engineering student at SPPU, building things that matter — from CLI tools to web apps.
          </p>
        </motion.div>

        {/* Bio + details */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 mb-16">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4" style={{ letterSpacing: '-0.02em' }}>
              {personalInfo.name}
            </h2>
            <div className="space-y-4 text-sm text-muted leading-relaxed">
              <p>{personalInfo.bio}</p>
              <p>
                Currently pursuing a B.E. in Computer Engineering at SPPU University, I split my time between
                crafting elegant web interfaces, building performant CLI tools in Rust, and exploring the
                depths of systems programming and cybersecurity.
              </p>
              <p>
                I believe in the power of open source — every project I build is a contribution to a world
                where code is free, knowledge is shared, and the terminal is king.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} className="text-accent" />
                {personalInfo.location}
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
              >
                <Mail size={14} className="text-accent" />
                {personalInfo.email}
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-3">
              <AnimatedCounter value={personalInfo.stats.repos} label="Repositories" />
              <AnimatedCounter value={personalInfo.stats.followers} label="GitHub Followers" />
              <AnimatedCounter value={personalInfo.stats.stars} label="Stars Earned" />
              <AnimatedCounter value={3} suffix="+" label="Years Coding" />
            </div>
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ letterSpacing: '-0.02em' }}>
            What Drives Me
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InterestCard
              icon={<Code size={16} className="text-accent" />}
              title="Full-Stack Development"
              desc="Building modern web apps with React, TypeScript, and Tailwind CSS."
            />
            <InterestCard
              icon={<Terminal size={16} className="text-accent" />}
              title="CLI & Systems Tooling"
              desc="Crafting performant command-line tools in Rust and Bash."
            />
            <InterestCard
              icon={<Shield size={16} className="text-accent" />}
              title="Cybersecurity"
              desc="Exploring encryption, network security, and secure coding practices."
            />
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2" style={{ letterSpacing: '-0.02em' }}>
            <GraduationCap size={18} className="text-accent" />
            Education
          </h2>
          <div className="max-w-lg">
            {personalInfo.education.map((item, i) => (
              <JourneyItem key={i} item={item} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      <Skills />
      <Experience />
    </div>
  )
}
