import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Github, Linkedin, Instagram } from './Icons'
import { socialLinks, personalInfo } from '../data/portfolio'

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={18} />,
  linkedin: <Linkedin size={18} />,
  instagram: <Instagram size={18} />,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border" style={{ background: 'var(--bg-elev)' }}>
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                <span className="text-sm font-extrabold text-accent" style={{ letterSpacing: '-0.05em' }}>PD</span>
              </div>
              <span className="font-semibold tracking-tight">{personalInfo.name}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              {personalInfo.shortBio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Navigate</h4>
            <nav className="flex flex-col gap-3">
              {['/', '/about', '/projects', '/contact'].map((path, i) => (
                <a
                  key={path}
                  href={path}
                  className="text-sm text-muted hover:text-fg transition-colors animated-link w-fit"
                >
                  {['Home', 'About', 'Projects', 'Contact'][i]}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Connect</h4>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  variants={item}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-muted hover:text-fg transition-colors w-fit group"
                >
                  <span className="opacity-60 group-hover:opacity-100 transition-opacity">
                    {iconMap[link.icon] || null}
                  </span>
                  {link.name}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Location & Email */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-muted">{personalInfo.location}</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm text-muted hover:text-accent transition-colors animated-link w-fit"
              >
                {personalInfo.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {year} {personalInfo.name}. Built with{' '}
            <Heart size={10} className="inline text-red-500 fill-red-500" /> using React & Tailwind.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-fg transition-all duration-200 hover:scale-110"
                aria-label={link.name}
              >
                {iconMap[link.icon] || null}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
