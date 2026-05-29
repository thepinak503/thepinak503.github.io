import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Send, ChevronDown, CheckCircle } from 'lucide-react'
import { Github, Linkedin } from '../components/Icons'
import { personalInfo, socialLinks, faqItems } from '../data/portfolio'

function FAQItem({
  item,
  index,
}: {
  item: { q: string; a: string }
  index: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium transition-colors hover:bg-accent-subtle/50"
        aria-expanded={open}
      >
        <span>{item.q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ml-3"
          style={{ color: 'var(--muted)' }}
        >
          <ChevronDown size={14} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 text-sm text-muted leading-relaxed">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    border: `1px solid ${focusedField === field ? 'var(--accent)' : 'var(--border)'}`,
    boxShadow: focusedField === field ? '0 0 0 3px var(--accent-subtle)' : 'none',
    background: 'var(--surface)',
    color: 'var(--fg)',
    outline: 'none',
    transition: 'all 0.2s ease',
  })

  const labelStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--muted)',
    marginBottom: '6px',
    display: 'block',
  }

  return (
    <div className="min-h-screen py-20 sm:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(var(--fg) 1px, transparent 1px),
            linear-gradient(90deg, var(--fg) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="section-container relative z-10">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="kicker">Contact</span>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have a project in mind, a collaboration idea, or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                className="glass-card p-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle size={40} className="mx-auto mb-4" style={{ color: 'var(--success)' }} />
                <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                <p className="text-sm text-muted mb-6">
                  Thanks for reaching out! I&apos;ll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary text-sm"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" style={labelStyle}>Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('name')}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle('email')}
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: '120px' }}
                    placeholder="What's on your mind?"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary w-full"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Send size={14} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass-card p-5 space-y-4">
              <h3 className="text-sm font-semibold mb-4">Contact Info</h3>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail size={14} className="text-accent shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-accent transition-colors">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={14} className="text-accent shrink-0" />
                {personalInfo.location}
              </div>
              <div className="flex items-center gap-3 pt-2">
                {socialLinks.map((link) => {
                  const iconMap: Record<string, React.ReactNode> = {
                    github: <Github size={16} />,
                    linkedin: <Linkedin size={16} />,
                  }
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost btn-icon text-muted hover:text-fg"
                      aria-label={link.name}
                    >
                      {iconMap[link.icon] || null}
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">Frequently Asked</h3>
              <div className="space-y-2">
                {faqItems.map((item, i) => (
                  <FAQItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
