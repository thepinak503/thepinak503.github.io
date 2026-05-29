import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../data/portfolio'

const categories = [
  { key: 'all', label: 'All Skills' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'security', label: 'Security' },
  { key: 'cloud-devops', label: 'Cloud & DevOps' },
  { key: 'tools', label: 'Tools & Systems' },
  { key: 'mobile', label: 'Mobile' },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">Expertise</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            Technologies I work with daily to build performant, scalable applications across the full stack.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-muted hover:text-fg hover:bg-accent-subtle'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="skill-category-bg"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: typeof skills[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.setProperty('--rotate-x', `${y * -12}deg`)
    cardRef.current.style.setProperty('--rotate-y', `${x * 12}deg`)
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--rotate-x', '0deg')
    cardRef.current.style.setProperty('--rotate-y', '0deg')
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        className="glass-card p-4 card-3d cursor-default"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-3d-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-lg" role="img" aria-label={skill.name}>
                {skill.icon}
              </span>
              <span className="text-sm font-semibold">{skill.name}</span>
            </div>
            <span className="tabular-nums text-xs text-muted font-medium">{skill.level}%</span>
          </div>

          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--border)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${skill.color || 'var(--accent)'}, var(--accent))`,
                width: 0,
              }}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
