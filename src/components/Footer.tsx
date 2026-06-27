import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="p-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-md">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white">
              Pinak<span className="text-cyan-400">.</span>
            </span>
          </motion.div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 flex items-center">
            Built with <Heart className="h-3.5 w-3.5 text-red-400 mx-1" /> using React & TypeScript
          </p>

          {/* Right */}
          <p className="text-xs text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} Pinak Dhabu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
