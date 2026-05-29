import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <h1
            className="text-8xl sm:text-9xl font-extrabold mb-4 gradient-text"
            style={{ letterSpacing: '-0.08em' }}
          >
            404
          </h1>
        </motion.div>

        <motion.p
          className="text-lg text-muted mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          This page doesn&apos;t exist yet — maybe it&apos;s in another branch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={14} />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
