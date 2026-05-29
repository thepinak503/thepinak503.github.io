import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Search, Grid3X3, ArrowUpRight } from 'lucide-react'
import { Github } from '../components/Icons'
import { projects } from '../data/portfolio'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'security', label: 'Security' },
  { key: 'mobile', label: 'Mobile' },
  { key: 'backend', label: 'Backend' },
  { key: 'ai', label: 'AI' },
  { key: 'devops', label: 'DevOps' },
  { key: 'tools', label: 'Tools' },
]

export default function Projects() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [liked, setLiked] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('project-likes')
      return stored ? new Set(JSON.parse(stored)) : new Set()
    } catch {
      return new Set()
    }
  })

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem('project-likes', JSON.stringify([...next]))
      return next
    })
  }, [])

  const filtered = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen py-20 sm:py-28">
      <div className="section-container">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">Portfolio</span>
          <h1 className="section-title">Projects</h1>
          <p className="section-subtitle">
            A collection of tools, apps, and experiments I&apos;ve built. Each project represents a piece of the puzzle.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative flex-1 max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--muted)' }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border transition-all duration-200"
              style={{
                background: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--fg)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--accent)'
                e.target.style.boxShadow = '0 0 0 3px var(--accent-subtle)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border)'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`relative px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="project-category-bg"
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
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                liked={liked.has(project.id)}
                onToggleLike={toggleLike}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Grid3X3 size={32} className="mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <p className="text-muted">No projects match your search.</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('all') }}
              className="btn btn-ghost mt-4 text-sm"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  liked,
  onToggleLike,
}: {
  project: typeof projects[number]
  liked: boolean
  onToggleLike: (id: string) => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    cardRef.current.style.setProperty('--mouse-x', `${x * 100}%`)
    cardRef.current.style.setProperty('--mouse-y', `${y * 100}%`)
    cardRef.current.style.setProperty('--rotate-x', `${(y - 0.5) * -10}deg`)
    cardRef.current.style.setProperty('--rotate-y', `${(x - 0.5) * 10}deg`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--rotate-x', '0deg')
    cardRef.current.style.setProperty('--rotate-y', '0deg')
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div
        ref={cardRef}
        className="glass-card overflow-hidden card-3d group cursor-default"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`h-1.5 bg-gradient-to-r ${project.gradient || 'from-accent/40 to-accent/20'}`}
        />

        <div className="card-3d-inner p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              {project.emoji && (
                <span className="text-lg shrink-0" role="img" aria-hidden="true">{project.emoji}</span>
              )}
              <h3 className="text-base font-semibold truncate">{project.name}</h3>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onToggleLike(project.id) }}
              className="shrink-0 p-1.5 rounded-lg transition-all duration-200 hover:bg-accent-subtle"
              aria-label={liked ? 'Unlike project' : 'Like project'}
            >
              <Heart
                size={14}
                className={`transition-all duration-300 ${
                  liked ? 'fill-red-500 text-red-500 scale-110' : 'text-muted'
                }`}
              />
            </button>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="tag text-[10px]">{t}</span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] text-muted">+{project.tech.length - 4}</span>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted hover:text-fg transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={12} />
                Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors ml-auto"
                onClick={(e) => e.stopPropagation()}
              >
                Live
                <ArrowUpRight size={10} />
              </a>
            )}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--accent-glow) 0%, transparent 100%)`,
          }}
        />
      </div>
    </motion.div>
  )
}
