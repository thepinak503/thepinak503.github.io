export interface Project {
  id: string
  name: string
  desc: string
  fullDesc?: string
  tech: string[]
  category: 'web' | 'security' | 'mobile' | 'backend' | 'ai' | 'devops' | 'tools'
  live?: string
  code?: string
  featured?: boolean
  gradient?: string
  emoji?: string
}

export interface Skill {
  name: string
  level: number
  icon: string
  category: 'frontend' | 'backend' | 'security' | 'cloud-devops' | 'tools' | 'mobile'
  color?: string
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
  achievements: string[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface NavLink {
  path: string
  label: string
}

export const personalInfo = {
  name: 'Pinak Dhabu',
  title: 'Computer Engineering Student & Developer',
  location: 'Pune, India 🇮🇳',
  bio: 'Windows and Arch Linux enthusiast. Building modern web apps, system tools, and exploring cybersecurity. Passionate about open source, CLI tooling, and performance engineering.',
  shortBio: 'Computer Engineering Student · Windows & Arch Linux enthusiast · Building the future, one terminal command at a time.',
  email: 'pinakdhabu2005@gmail.com',
  resumeUrl: '#',
  stats: {
    repos: 37,
    followers: 9,
    following: 26,
    stars: 15,
  },
  education: [
    { degree: 'B.E. Computer Engineering', school: 'SPPU University', period: '2021 – 2025', desc: 'Focus on systems programming, web development, and cybersecurity.' },
  ],
}

export const navLinks: NavLink[] = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/thepinak503',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/pinakdhabu2005',
    icon: 'linkedin',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/pinakdhabu',
    icon: 'instagram',
  },
]

export const skills: Skill[] = [
  { name: 'React', level: 85, icon: '⚛️', category: 'frontend', color: '#61dafb' },
  { name: 'TypeScript', level: 80, icon: '📘', category: 'frontend', color: '#3178c6' },
  { name: 'JavaScript', level: 88, icon: '🟨', category: 'frontend', color: '#f7df1e' },
  { name: 'HTML/CSS', level: 90, icon: '🌐', category: 'frontend', color: '#e34f26' },
  { name: 'Tailwind CSS', level: 85, icon: '🎨', category: 'frontend', color: '#06b6d4' },
  { name: 'Python', level: 82, icon: '🐍', category: 'backend', color: '#3776ab' },
  { name: 'Java', level: 78, icon: '☕', category: 'backend', color: '#ed8b00' },
  { name: 'C++', level: 75, icon: '⚙️', category: 'backend', color: '#00599c' },
  { name: 'Rust', level: 55, icon: '🦀', category: 'backend', color: '#dea584' },
  { name: 'Node.js', level: 72, icon: '🟢', category: 'backend', color: '#339933' },
  { name: 'Kotlin', level: 65, icon: '🅺', category: 'mobile', color: '#7f52ff' },
  { name: 'Docker', level: 60, icon: '🐳', category: 'cloud-devops', color: '#2496ed' },
  { name: 'Terraform', level: 50, icon: '🏗️', category: 'cloud-devops', color: '#7b42bc' },
  { name: 'Linux', level: 88, icon: '🐧', category: 'tools', color: '#fcc624' },
  { name: 'Git', level: 85, icon: '🔀', category: 'tools', color: '#f05032' },
  { name: 'Bash', level: 82, icon: '💻', category: 'tools', color: '#4eaa25' },
  { name: 'PowerShell', level: 75, icon: '🪟', category: 'tools', color: '#5391fe' },
  { name: 'Arch Linux', level: 80, icon: '🏔️', category: 'tools', color: '#1793d1' },
]

export const projects: Project[] = [
  {
    id: 'dotfiles',
    name: 'Dotfiles',
    desc: 'The ultimate universal dotfiles configuration for all Linux distributions. 1000+ aliases, 50+ functions, multi-mode support.',
    fullDesc: 'A comprehensive dotfiles repository that works across all Linux distributions. Features 1000+ aliases, 50+ functions, multi-mode support, and extensive customization options for power users.',
    tech: ['Shell', 'Bash', 'Zsh', 'Git'],
    category: 'tools',
    live: 'https://github.com/thepinak503/dotfiles',
    code: 'https://github.com/thepinak503/dotfiles',
    featured: true,
    gradient: 'from-amber-500/20 via-orange-500/10 to-amber-600/20',
    emoji: '🔧',
  },
  {
    id: 'echomind',
    name: 'EchoMind',
    desc: 'A powerful, lightweight CLI tool in Rust that pipes input to AI chat APIs and outputs responses.',
    fullDesc: 'A Rust-powered CLI tool that seamlessly integrates AI chat APIs into your terminal workflow. Pipe input, get intelligent responses — perfect for automation and scripting.',
    tech: ['Rust', 'CLI', 'AI APIs'],
    category: 'ai',
    code: 'https://github.com/thepinak503/echomind',
    featured: true,
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    emoji: '🧠',
  },
  {
    id: 'powerconfig',
    name: 'PowerConfig',
    desc: 'The Ultimate PowerShell Configuration for Windows. 1000+ aliases, 50+ functions, modern CLI tools.',
    fullDesc: 'The most comprehensive PowerShell configuration available. Supports Scoop, Chocolatey, and Winget package managers. 1000+ aliases, 50+ functions, and full integration with modern Windows CLI tools.',
    tech: ['PowerShell', 'Windows', 'CLI'],
    category: 'tools',
    code: 'https://github.com/thepinak503/powerconfig',
    featured: true,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    emoji: '⚡',
  },
  {
    id: 'echomind-mobile',
    name: 'EchoMind Mobile',
    desc: 'Android companion app for EchoMind, bringing AI CLI capabilities to your pocket.',
    fullDesc: 'The mobile companion to EchoMind, bringing AI-powered terminal capabilities to Android. Built with Kotlin for native performance.',
    tech: ['Kotlin', 'Android', 'AI'],
    category: 'mobile',
    code: 'https://github.com/thepinak503/echomind-mobile',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-green-500/20',
    emoji: '📱',
  },
  {
    id: 'cryptovault',
    name: 'CryptoVault',
    desc: 'Enterprise Encryption Suite — modern React app with multiple encryption algorithms and beautiful dark theme.',
    fullDesc: 'An enterprise-grade encryption suite built with React. Features multiple encryption algorithms, real-time processing, a beautiful dark theme, and an intuitive interface for security professionals.',
    tech: ['React', 'JavaScript', 'Crypto'],
    category: 'security',
    code: 'https://github.com/pinakdhabu/cryptovault',
    gradient: 'from-red-500/20 via-rose-500/10 to-pink-500/20',
    emoji: '🔐',
  },
  {
    id: 'exam-prompt',
    name: 'Exam-Prompt',
    desc: '20 AI skills for 10/10 exam answers at any university. Works with ChatGPT, Claude, Gemini, Cursor, Copilot, and Codex.',
    fullDesc: 'A curated collection of 20 AI prompting skills designed to help students excel in exams across any university. Compatible with all major AI platforms including ChatGPT, Claude, Gemini, and more.',
    tech: ['AI', 'Prompt Engineering'],
    category: 'ai',
    code: 'https://github.com/pinakdhabu/Exam-prompt',
    featured: true,
    gradient: 'from-yellow-500/20 via-amber-500/10 to-orange-500/20',
    emoji: '🎓',
  },
  {
    id: 'sppuqp',
    name: 'Sppuqp',
    desc: 'Official SPPU Previous Year Question Papers repository — helping students access past papers easily.',
    fullDesc: 'A community-driven repository of SPPU previous year question papers. Making academic resources accessible to all students.',
    tech: ['HTML', 'GitHub Pages'],
    category: 'web',
    code: 'https://github.com/pinakdhabu/Sppuqp',
    gradient: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20',
    emoji: '📚',
  },
  {
    id: 'containerized-cloud',
    name: 'Containerized App Deployment on Cloud',
    desc: 'Internship project demonstrating containerized application deployment on cloud infrastructure using Terraform and Docker.',
    fullDesc: 'A comprehensive demonstration of cloud-native application deployment using Docker containers and Terraform infrastructure-as-code. Built during a cloud computing internship.',
    tech: ['Docker', 'Terraform', 'Cloud', 'DevOps'],
    category: 'devops',
    code: 'https://github.com/pinakdhabu/containerized-app-deployment-on-cloud',
    gradient: 'from-blue-500/20 via-cyan-500/10 to-teal-500/20',
    emoji: '☁️',
  },
  {
    id: 'smart-attend',
    name: 'SmartAttend',
    desc: 'Smart attendance management system built with Kotlin.',
    fullDesc: 'An intelligent attendance management system for Android built with Kotlin. Streamlines attendance tracking with smart features.',
    tech: ['Kotlin', 'Android'],
    category: 'mobile',
    code: 'https://github.com/thepinak503/SmartAttend',
    gradient: 'from-green-500/20 via-emerald-500/10 to-teal-500/20',
    emoji: '✅',
  },
  {
    id: 'sppuresult',
    name: 'SppuResult',
    desc: 'SPPU result checker and analyzer Android app.',
    fullDesc: 'An Android application that helps SPPU students check and analyze their exam results with visual insights and grade tracking.',
    tech: ['Kotlin', 'Android'],
    category: 'mobile',
    code: 'https://github.com/thepinak503/sppuresult-android',
    gradient: 'from-purple-500/20 via-violet-500/10 to-indigo-500/20',
    emoji: '📊',
  },
]

export const experiences: Experience[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Self-Employed / Open Source',
    period: '2024 – Present',
    description: 'Building modern web applications, CLI tools, and system configurations that push the boundaries of what\'s possible with code.',
    achievements: [
      'Created EchoMind — a Rust CLI tool for AI API integration that redefines terminal productivity',
      'Built comprehensive dotfiles with 1000+ aliases across all Linux distributions',
      'Developed PowerConfig — the ultimate PowerShell configuration for Windows power users',
      'Built CryptoVault — enterprise-grade encryption suite in React with beautiful dark theme',
    ],
  },
  {
    role: 'Cloud Intern',
    company: 'Cloud Computing Internship',
    period: '2024',
    description: 'Gained hands-on experience deploying and managing cloud infrastructure using modern DevOps practices.',
    achievements: [
      'Deployed production-grade applications using Docker containers and Terraform',
      'Implemented infrastructure-as-code practices for reproducible deployments',
      'Gained deep expertise with cloud platforms and container orchestration',
    ],
  },
  {
    role: 'Student Developer',
    company: 'SPPU University',
    period: '2021 – Present',
    description: 'Pursuing B.E. in Computer Engineering while building a portfolio of impactful side projects.',
    achievements: [
      'Developed multiple production-quality Android apps using Kotlin',
      'Created Sppuqp — a community question paper repository serving thousands of students',
      'Deep dive into systems programming, full-stack web development, and cybersecurity',
    ],
  },
]

export const typewriterWords = [
  'Computer Engineering Student',
  'Full-Stack Developer',
  'Linux & Windows Enthusiast',
  'Rust CLI Tool Builder',
  'Open Source Contributor',
  'Cybersecurity Explorer',
  'Terminal Aficionado',
]

export const faqItems = [
  {
    q: 'What tech stack do you use most?',
    a: 'I work primarily with TypeScript, React, and Tailwind CSS for web development, Rust for CLI tools, and Kotlin for Android apps. My workflow spans both Windows and Arch Linux environments.',
  },
  {
    q: 'Are you open to collaboration?',
    a: 'Absolutely! I\'m always excited to collaborate on interesting open-source projects, especially those involving CLI tooling, web development, or cybersecurity.',
  },
  {
    q: 'What are you currently learning?',
    a: 'I\'m deepening my knowledge of Rust systems programming, exploring advanced TypeScript patterns, and diving into cloud-native architecture with Kubernetes.',
  },
  {
    q: 'Do you take freelance work?',
    a: 'I\'m selective about freelance projects, but I\'m open to interesting opportunities that align with my skills in web development, CLI tools, and system configuration.',
  },
]
