import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { experiences } from '../data/portfolio';
import { Briefcase, Calendar, Award } from 'lucide-react';

const Experience: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.03)_0%,transparent_50%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm mb-4 block">// career journey</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-blue-500/30 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative flex flex-col md:flex-row items-start gap-6 mb-16 last:mb-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 top-2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-slate-950 transform -translate-x-1/2 z-10 shadow-lg shadow-cyan-500/25">
                <div className="absolute inset-0 rounded-full animate-ping bg-cyan-500/20" />
              </div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group">
                  {/* Header */}
                  <div className="flex items-center space-x-2 mb-1">
                    <Briefcase className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-mono text-cyan-400">{exp.role}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1">{exp.company}</h3>

                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-4">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{exp.period}</span>
                  </div>

                  <p className="text-slate-400 text-sm mb-4">{exp.description}</p>

                  {/* Achievements */}
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, j) => (
                      <li key={j} className="flex items-start space-x-2 text-sm text-slate-300">
                        <Award className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
