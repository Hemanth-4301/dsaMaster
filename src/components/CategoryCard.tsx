"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import type { Category } from "../types/Question";

interface CategoryCardProps {
  category: Category;
  solvedCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  solvedCount,
}) => {
  const IconComponent = (Icons as any)[category.icon] || Icons.File;

  const totalQuestions = category.questions.length;
  const progress =
    totalQuestions > 0 ? (solvedCount / totalQuestions) * 100 : 0;

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "from-emerald-500 to-green-600";
    if (progress >= 75) return "from-blue-500 to-cyan-600";
    if (progress >= 50) return "from-amber-500 to-orange-600";
    if (progress >= 25) return "from-purple-500 to-pink-600";
    return "from-gray-400 to-gray-500";
  };

  const getIconBgColor = (progress: number) => {
    if (progress === 100)
      return "bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-600 dark:text-emerald-400";
    if (progress >= 75)
      return "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400";
    if (progress >= 50)
      return "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-600 dark:text-amber-400";
    if (progress >= 25)
      return "bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400";
    return "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 text-gray-600 dark:text-gray-400";
  };

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-300" />

      <div className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-900/40 rounded-xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/30 transition-all duration-300 hover:shadow-2xl hover:border-white/30 dark:hover:border-gray-600/50">
        <Link to={`/category/${category.id}/#category`} className="block h-full">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-800/10" />

          <div className="relative p-7">
            {/* Header section */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className={`p-3 rounded-xl shadow-sm ${getIconBgColor(
                    progress
                  )}`}
                >
                  <IconComponent size={26} strokeWidth={1.5} />
                </motion.div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-400">
                      {totalQuestions} questions
                    </span>
                  </div>
                </div>
              </div>

              {/* Completion badge */}
              {progress === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-lg"
                >
                  <Icons.Check
                    size={16}
                    className="text-white"
                    strokeWidth={2.5}
                  />
                </motion.div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed line-clamp-2 h-10">
              {category.description}
            </p>

            {/* Progress section */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Progress
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {solvedCount}/{totalQuestions}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      progress === 100
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200/80 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className={`h-full bg-gradient-to-r ${getProgressColor(
                      progress
                    )} rounded-full relative overflow-hidden`}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
                  </motion.div>
                </div>

                {/* Progress indicator dot */}
                {progress > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm`}
                    style={{ left: `${Math.max(progress - 2, 0)}%` }}
                  />
                )}
              </div>
            </div>

            {/* Hover indicator */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute bottom-4 right-4 text-gray-400 dark:text-gray-500"
            >
              <Icons.ArrowRight size={18} strokeWidth={2} />
            </motion.div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
