import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { personalInfo, socialLinks } from '../data/portfolio';
import { Send, Mail, MapPin, Github, Linkedin, Code, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import XLogo from './XLogo';

const getSocialIcon = (name: string) => {
  switch (name) {
    case 'github': return Github;
    case 'linkedin': return Linkedin;
    case 'x': return XLogo;
    case 'code': return Code;
    default: return Github;
  }
};

// EmailJS config — these need to be set via env vars or configured in the EmailJS dashboard
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_default';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const Contact: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasConfig = !!EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setError(null);

    try {
      if (hasConfig) {
        // Initialize EmailJS with public key
        emailjs.init(EMAILJS_PUBLIC_KEY);

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formState.name,
            email: formState.email,
            message: formState.message,
            to_name: 'Pinak',
            reply_to: formState.email,
          }
        );
      } else {
        // Fallback: simulate sending (no EmailJS configured)
        await new Promise((r) => setTimeout(r, 1500));
      }

      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to send message. Please try again or email me directly.');
      console.error('EmailJS error:', err);
    }
  };

  const inputClasses = "w-full px-4 py-3.5 bg-white/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300";

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gray-50 dark:bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.03)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm mb-4 block">// get in touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
          <p className="text-gray-500 dark:text-slate-400 mt-6 max-w-xl mx-auto">
            Have a project in mind or just want to chat? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-5 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-xl flex items-center space-x-4 hover:border-cyan-500/20 transition-all duration-300">
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <Mail className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Email</p>
                <p className="text-gray-900 dark:text-white font-medium">{personalInfo.email}</p>
              </div>
            </div>

            <div className="p-5 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-xl flex items-center space-x-4 hover:border-cyan-500/20 transition-all duration-300">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-slate-400">Location</p>
                <p className="text-gray-900 dark:text-white font-medium">{personalInfo.location}</p>
              </div>
            </div>

            <div className="p-5 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-xl">
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-3">Social Links</p>
              <div className="flex space-x-3">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link.icon);
                  return (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-slate-700/50 rounded-lg text-gray-500 dark:text-slate-400 hover:text-cyan-400 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8 bg-white/80 dark:bg-slate-800/40 backdrop-blur-sm border border-gray-200 dark:border-slate-700/50 rounded-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <CheckCircle className="h-16 w-16 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-center">Thanks for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Name</label>
                      <input
                        id="name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className={inputClasses}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Email</label>
                      <input
                        id="email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={inputClasses}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`${inputClasses} h-32 resize-none`}
                      placeholder="Tell me about your project or idea..."
                      required
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  {!hasConfig && (
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-xs">
                      EmailJS not configured. Set <code className="font-mono bg-yellow-500/10 px-1 rounded">VITE_EMAILJS_PUBLIC_KEY</code>, <code className="font-mono bg-yellow-500/10 px-1 rounded">VITE_EMAILJS_SERVICE_ID</code>, and <code className="font-mono bg-yellow-500/10 px-1 rounded">VITE_EMAILJS_TEMPLATE_ID</code> in a <code className="font-mono bg-yellow-500/10 px-1 rounded">.env</code> file to enable email sending. Messages will be simulated for now.
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
