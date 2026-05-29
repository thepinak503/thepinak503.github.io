import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Briefcase, ChevronRight } from 'lucide-react'
import { experiences } from '../data/portfolio'

function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div
      ref={ref}
      className="absolute left-[19px] top-2 bottom-2 w-px hidden md:block"
      style={{ background: 'var(--border)' }}
    >
      <motion.div
        className="w-full origin-top"
        style={{
          scaleY,
          background: 'linear-gradient(to bottom, var(--accent), var(--accent-glow))',
          height: '100%',
        }}
      />
    </div>
  )
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: typeof experiences[number]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className="relative flex gap-6 md:gap-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Timeline dot (desktop) */}
      <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-12 md:items-start md:pt-1">
        {isEven && (
          <div className="text-right">
            <span className="text-xs font-semibold text-accent tabular-nums">{exp.period}</span>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border-2"
          style={{
            background: 'var(--bg)',
            borderColor: 'var(--accent)',
          }}
        >
          <Briefcase size={14} className="text-accent" />
        </div>
      </div>

      {/* Card */}
      <div className={`flex-1 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="glass-card p-5 sm:p-6">
          <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
            <div>
              <h3 className="text-base font-semibold">{exp.role}</h3>
              <p className="text-sm text-muted">{exp.company}</p>
            </div>
            <span className="text-xs text-muted tabular-nums whitespace-nowrap md:hidden">
              {exp.period}
            </span>
          </div>

          <p className="text-sm text-muted mb-4 leading-relaxed">{exp.description}</p>

          <ul className="space-y-2">
            {exp.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2 text-sm text-muted"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <ChevronRight size={14} className="text-accent mt-0.5 shrink-0" />
                <span>{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">Experience</span>
          <h2 className="section-title">Work & Journey</h2>
          <p className="section-subtitle mx-auto">
            From student projects to production deployments — here's my path so far.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          <TimelineLine />

          {/* Mobile dots */}
          <div className="absolute left-0 top-0 bottom-0 w-px hidden sm:block md:hidden" style={{ background: 'var(--border)' }}>
            <div className="absolute top-0 left-0 w-full h-full" style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-glow))' }} />
          </div>

          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 sm:pl-10 md:pl-0">
                {/* Mobile dot */}
                <div
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 sm:hidden"
                  style={{
                    background: 'var(--bg)',
                    borderColor: 'var(--accent)',
                  }}
                />
                <ExperienceCard exp={exp} index={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
