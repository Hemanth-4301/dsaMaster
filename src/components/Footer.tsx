import React from 'react';
import { Github, Code, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-4 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Code size={20} className="text-primary-500" />
          <span className="text-gray-700 dark:text-gray-300">DSA Master</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <Github size={20} />
          </a>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;