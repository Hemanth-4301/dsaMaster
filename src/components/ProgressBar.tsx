import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, className = '' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`h-2 bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clampedProgress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`h-full rounded-full relative ${
          clampedProgress < 30
            ? 'bg-gradient-to-r from-red-500 to-red-400'
            : clampedProgress < 70
            ? 'bg-gradient-to-r from-yellow-500 to-yellow-400'
            : 'bg-gradient-to-r from-green-500 to-green-400'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
      </motion.div>
    </div>
  );
};

export interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  className = '',
  showPercentage = true,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200/50 dark:text-gray-700/50"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`${
            clampedProgress < 30
              ? 'text-red-500'
              : clampedProgress < 70
              ? 'text-yellow-500'
              : 'text-green-500'
          }`}
          strokeLinecap="round"
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;