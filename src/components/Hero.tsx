import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Shield, Code, Lock } from 'lucide-react';
import XLogo from './XLogo';
import { useTypewriter } from '../hooks/useTypewriter';
import { personalInfo, socialLinks } from '../data/portfolio';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 15000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      }));
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(34, 211, 238, ${0.06 * (1 - dist / 150)})`;
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
        ctx!.fill();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
};

const Hero: React.FC = () => {
  const { text } = useTypewriter({
    words: ['Computer Engineering Student', 'Linux & Arch Enthusiast', 'Rust CLI Tool Builder', 'Full-Stack Developer', 'Windows & Linux Power User'],
    typeSpeed: 80,
    deleteSpeed: 40,
    delayBetween: 2000,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const floatingIcons = [
    { Icon: Shield, x: '15%', y: '20%', delay: 0 },
    { Icon: Code, x: '85%', y: '25%', delay: 1 },
    { Icon: Lock, x: '10%', y: '70%', delay: 2 },
  ];

  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'x': return XLogo;
      case 'code': return Code;
      default: return Github;
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[200px]" />
      </div>

      {/* Particle network */}
      <ParticleBackground />

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        >
          <div className="p-4 bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 rounded-2xl">
            <Icon className="h-8 w-8 text-cyan-400" />
          </div>
        </motion.div>
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-medium">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="h-14 sm:h-16 flex items-center justify-center mb-8"
        >
          <span className="text-lg sm:text-xl md:text-3xl text-slate-300 font-light">
            <span className="text-cyan-400 font-mono">&gt; </span>
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-5 sm:h-7 bg-cyan-400 ml-1"
            />
          </span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build{' '}
          <span className="text-cyan-300 font-medium">CLI tools</span>,{' '}
          <span className="text-blue-300 font-medium">dotfiles</span>,{' '}
          <span className="text-purple-300 font-medium">web apps</span>, and{' '}
          <span className="text-emerald-300 font-medium">Android apps</span>.
          Linux enthusiast, Rust experimenter, and automation addict.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <motion.a
            href="#projects"
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3.5 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center justify-center space-x-4">
          {socialLinks.map((link) => {
            const Icon = getSocialIcon(link.icon);
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                title={link.name}
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="h-5 w-5 text-slate-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
