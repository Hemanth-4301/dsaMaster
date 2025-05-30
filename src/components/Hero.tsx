import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, Trophy } from 'lucide-react';
import { CircularProgress } from './ProgressBar';

interface HeroProps {
  totalSolved: number;
  totalQuestions: number;
}

const Hero: React.FC<HeroProps> = ({ totalSolved, totalQuestions }) => {
  const progress = totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="px-4 py-16 sm:py-24 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <motion.div variants={itemVariants}>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
            variants={itemVariants}
          >
            Ace Your Technical Interviews with{' '}
            <span className="text-primary-600 dark:text-primary-400">DSA</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-gray-700 dark:text-gray-300 mb-8"
            variants={itemVariants}
          >
            Prepare smarter, not harder. Practice curated DSA problems for success in top tech interviews.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            variants={itemVariants}
          >
            <motion.a
              href="#categories"
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg shadow-md flex items-center space-x-2 transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <BookOpen size={18} />
              <span>Start Learning</span>
              <ChevronRight size={16} />
            </motion.a>
            
            <motion.a
              href="https://leetcode.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm flex items-center space-x-2 transition-colors duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trophy size={18} className="text-accent-500" />
              <span>LeetCode</span>
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-xs w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Your Progress</h3>
            
            <CircularProgress
              progress={progress}
              size={180}
              strokeWidth={12}
              className="mb-6"
            />
            
            <p className="text-center text-gray-700 dark:text-gray-300">
              You've solved{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {totalSolved}
              </span>{' '}
              out of{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {totalQuestions}
              </span>{' '}
              questions
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;