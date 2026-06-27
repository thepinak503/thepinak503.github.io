import React from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { personalInfo } from '../data/portfolio';
import { Shield, Code, Lock, Server } from 'lucide-react';

const stats = [
  { label: 'GitHub Repositories', value: 58, suffix: '+' },
  { label: 'GitHub Stars', value: 17, suffix: '' },
  { label: 'Technologies', value: 20, suffix: '+' },
  { label: 'GitHub Followers', value: 20, suffix: '' },
];

const highlights = [
  {
    icon: Shield,
    title: 'Security First',
    description: 'Every solution is built with security at its core, implementing industry-standard encryption and best practices.',
    color: 'cyan',
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable, and well-documented code following modern development principles.',
    color: 'blue',
  },
  {
    icon: Lock,
    title: 'Cryptography',
    description: 'Deep expertise in cryptographic algorithms, secure communication, and data protection strategies.',
    color: 'purple',
  },
  {
    icon: Server,
    title: 'Full-Stack',
    description: 'End-to-end development capabilities from database design to pixel-perfect frontend interfaces.',
    color: 'emerald',
  },
];

const Counter: React.FC<{ value: number; suffix: string; isVisible: boolean }> = ({ value, suffix, isVisible }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="text-3xl sm:text-4xl font-black text-white tabular-nums">
      {count}{suffix}
    </span>
  );
};

const About: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.03)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm mb-4 block">// about me</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Who <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">I Am</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-slate-400 leading-relaxed mt-4">
              I'm all about building tools that automate life and look cool doing it — whether that's
              crafting the perfect <span className="text-cyan-400">dotfiles</span> setup, building
              <span className="text-cyan-400"> Rust CLI tools</span> that pipe to AI, or creating
              <span className="text-cyan-400"> Android apps</span> with Kotlin.
              I run <span className="text-cyan-400">Arch Linux</span> btw 🐧 and I'm always exploring
              the intersection of developer tooling, security, and AI.
            </p>
          </motion.div>

          {/* Highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              const colorMap: Record<string, string> = {
                cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/25 border-cyan-500/20 bg-cyan-500/10 text-cyan-400',
                blue: 'from-blue-500 to-blue-600 shadow-blue-500/25 border-blue-500/20 bg-blue-500/10 text-blue-400',
                purple: 'from-purple-500 to-purple-600 shadow-purple-500/25 border-purple-500/20 bg-purple-500/10 text-purple-400',
                emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/25 border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
              };
              return (
                <div
                  key={i}
                  className="group p-5 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${colorMap[item.color]} bg-opacity-10 w-fit mb-3`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-white font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 sm:p-8 bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl hover:border-cyan-500/20 transition-all duration-300 group"
            >
              <Counter value={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              <p className="text-sm text-slate-400 mt-2 group-hover:text-slate-300 transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
