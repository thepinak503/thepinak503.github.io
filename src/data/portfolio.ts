export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  github?: string;
  live?: string;
  category: 'web' | 'security' | 'mobile' | 'backend' | 'devops' | 'cli' | 'ai';
  stars?: number;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'security' | 'tools' | 'cloud' | 'mobile' | 'ai';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  logo?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username: string;
}

export const personalInfo = {
  name: 'Pinak Dhabu',
  title: 'Computer Engineering Student & Full-Stack Developer',
  email: 'pinakdhabu2005@gmail.com',
  location: 'Pune, India',
  bio: 'Computer Engineering Student | Windows and Arch Linux enthusiast. I build CLI tools, web apps, Android apps, and dotfiles — anything that automates life or looks cool in a terminal.',
  avatar: 'https://avatars.githubusercontent.com/u/150576156?v=4',
  resumeUrl: '#',
  githubRepos: 58, // 37 + 21
  githubFollowers: 20, // 9 + 11
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub (thepinak503)', url: 'https://github.com/thepinak503', icon: 'code', username: 'thepinak503' },
  { name: 'GitHub (pinakdhabu)', url: 'https://github.com/pinakdhabu', icon: 'github', username: 'pinakdhabu' },
  { name: 'X (Twitter)', url: 'https://x.com/PinakDhabu', icon: 'x', username: '@PinakDhabu' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/pinakdhabu2005', icon: 'linkedin', username: 'pinakdhabu2005' },
];

export const skills: Skill[] = [
  { name: 'React / TypeScript', level: 88, icon: '⚛️', category: 'frontend' },
  { name: 'Kotlin / Android', level: 78, icon: '📱', category: 'mobile' },
  { name: 'C++', level: 85, icon: '⚡', category: 'backend' },
  { name: 'Rust', level: 60, icon: '🦀', category: 'backend' },
  { name: 'Bash / Shell Scripting', level: 92, icon: '🐚', category: 'tools' },
  { name: 'PowerShell', level: 90, icon: '🪟', category: 'tools' },
  { name: 'Linux / Arch', level: 95, icon: '🐧', category: 'tools' },
  { name: 'Cryptography', level: 75, icon: '🔐', category: 'security' },
  { name: 'Docker / K8s', level: 72, icon: '🐳', category: 'cloud' },
  { name: 'Terraform / IaC', level: 68, icon: '🏗️', category: 'cloud' },
  { name: 'Git / CI/CD', level: 85, icon: '🔄', category: 'tools' },
  { name: 'Node.js', level: 80, icon: '🟢', category: 'backend' },
  { name: 'Prompt Engineering / AI', level: 82, icon: '🤖', category: 'ai' },
  { name: 'D2 / Diagramming', level: 70, icon: '📊', category: 'tools' },
];

export const projects: Project[] = [
  {
    id: 'dotfiles',
    title: 'dotfiles',
    description: 'Ultimate universal Linux dotfiles with 1000+ aliases',
    longDescription: 'The ultimate universal dotfiles configuration for all Linux distributions. Features 1000+ aliases, 50+ functions, and support for basic, advanced, and ultra-nerd modes. Fully customized Starship prompt, ZSH/Bash setup, and more.',
    tags: ['Shell', 'Linux', 'ZSH', 'Starship', 'Dotfiles'],
    image: '',
    github: 'https://github.com/thepinak503/dotfiles',
    category: 'devops',
    stars: 2,
  },
  {
    id: 'cryptovault',
    title: 'CryptoVault',
    description: 'Enterprise Encryption Suite with multiple cipher algorithms',
    longDescription: '🔐 CryptoVault - Enterprise Encryption Suite. A modern React app with multiple encryption algorithms (AES-256, ChaCha20, RSA-2048, SHA-256, Caesar, Atbash), beautiful dark theme, and real-time client-side processing.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Web Crypto API'],
    image: '',
    github: 'https://github.com/pinakdhabu/cryptovault',
    category: 'security',
  },
  {
    id: 'exam-prompt',
    title: 'Exam-Prompt',
    description: '20 AI skills for 10/10 exam answers at any university',
    longDescription: '20 AI skills for 10/10 exam answers at any university worldwide. Works with ChatGPT, Claude, Gemini, Cursor, Copilot, Codex. The ultimate prompt engineering collection for students.',
    tags: ['AI', 'Prompt Engineering', 'ChatGPT', 'Claude', 'Gemini'],
    image: '',
    github: 'https://github.com/pinakdhabu/Exam-prompt',
    live: 'https://pinakdhabu.github.io/Exam-prompt/',
    category: 'ai',
    stars: 7,
  },
  {
    id: 'echomind',
    title: 'EchoMind',
    description: 'CLI tool in Rust that pipes input to AI chat APIs',
    longDescription: 'A powerful, lightweight command-line tool written in Rust that pipes input to AI chat APIs and outputs responses. Perfect for integrating AI assistance into your shell workflows with support for multiple AI providers.',
    tags: ['Rust', 'CLI', 'AI', 'API'],
    image: '',
    github: 'https://github.com/thepinak503/echomind',
    category: 'cli',
    stars: 1,
  },
  {
    id: 'sppuqp',
    title: 'Sppuqp',
    description: 'Official SPPU Previous Year Question Papers',
    longDescription: 'Official SPPU Previous Year Question Papers collection. A comprehensive resource for Savitribai Phule Pune University students to access previous year question papers easily.',
    tags: ['Education', 'University', 'Documentation'],
    image: '',
    github: 'https://github.com/pinakdhabu/Sppuqp',
    category: 'web',
    stars: 7,
  },
  {
    id: 'powerconfig',
    title: 'PowerConfig',
    description: 'Ultimate PowerShell Configuration for Windows',
    longDescription: 'The Ultimate PowerShell Configuration for Windows. Full support for Scoop, Chocolatey, and Winget. 1000+ aliases, 50+ functions, modern CLI tools. The Windows counterpart to the dotfiles project.',
    tags: ['PowerShell', 'Windows', 'CLI', 'Automation'],
    image: '',
    github: 'https://github.com/thepinak503/powerconfig',
    category: 'devops',
  },
  {
    id: 'echomind-mobile',
    title: 'EchoMind Mobile',
    description: 'Android companion app for EchoMind AI assistant',
    longDescription: 'Android mobile application built with Kotlin that serves as a mobile companion to the EchoMind CLI tool, bringing AI assistance to your Android device.',
    tags: ['Kotlin', 'Android', 'AI', 'Mobile'],
    image: '',
    github: 'https://github.com/thepinak503/echomind-mobile',
    category: 'mobile',
  },
  {
    id: 'containerized-cloud',
    title: 'Containerized App Deployment on Cloud',
    description: 'Cloud deployment project using Docker, Terraform & AWS',
    longDescription: 'Final internship project: Containerized Application Deployment on Cloud. Full pipeline using Docker, Terraform, and cloud infrastructure for automated deployment.',
    tags: ['Docker', 'Terraform', 'Cloud', 'DevOps', 'AWS'],
    image: '',
    github: 'https://github.com/pinakdhabu/containerized-app-deployment-on-cloud',
    category: 'devops',
  },
];

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    company: 'Cloud Internship',
    role: 'DevOps / Cloud Engineer Intern',
    period: '2026',
    description: 'Completed a cloud internship focused on containerized application deployment.',
    achievements: [
      'Deployed containerized applications on cloud using Docker and Terraform',
      'Built CI/CD pipelines for automated cloud infrastructure provisioning',
      'Configured Nginx servers with Terraform for production environments',
      'Developed system health monitoring tools in C++',
    ],
  },
  {
    id: 'exp-2',
    company: 'Open Source',
    role: 'Linux & Tools Developer',
    period: '2023 - Present',
    description: 'Building open-source tools, dotfiles, and utilities for the Linux and Windows communities.',
    achievements: [
      'Created dotfiles with 1000+ aliases and 50+ functions for Linux',
      'Developed EchoMind, a Rust CLI tool for AI API integration',
      'Built PowerConfig - Ultimate PowerShell Configuration for Windows',
      'Published AUR package for terminal-typing-tutor',
    ],
  },
  {
    id: 'exp-3',
    company: 'PinakDhabu Projects',
    role: 'Full-Stack & Security Developer',
    period: '2024 - Present',
    description: 'Building web apps, Android apps, and security tools for developers and students.',
    achievements: [
      'Created CryptoVault - Enterprise Encryption Suite with 6+ cipher algorithms',
      'Built Exam-Prompt with 20 AI prompt skills (7⭐ on GitHub)',
      'Developed Sppuqp - SPPU question paper repository (7⭐, 1 fork)',
      'Built Android apps with Kotlin (SmartAttend, SppuResult, EchoMind Mobile)',
    ],
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];
