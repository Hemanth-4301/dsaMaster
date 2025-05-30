import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, Circle, Tag } from 'lucide-react';
import { Question, Difficulty } from "../types/Question";

interface QuestionCardProps {
  question: Question;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleCompleted: (id: number, status: boolean) => void;
  onToggleStarred: (id: number, starred: boolean) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50",
  Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50",
  Hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50",
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isCompleted,
  isStarred,
  onToggleCompleted,
  onToggleStarred,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/question/${question.id}`} className="block">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`
          relative overflow-hidden rounded-xl transition-all duration-300
          ${isCompleted ? 'bg-gradient-to-br from-white/40 to-white/20 dark:from-gray-800/40 dark:to-gray-800/20' : 
                         'bg-gradient-to-br from-white/30 to-white/10 dark:from-gray-800/30 dark:to-gray-800/10'}
          border border-white/30 dark:border-gray-700/50
          shadow-lg hover:shadow-xl
          backdrop-blur-md
          ${isHovered ? 'scale-[1.01] -translate-y-0.5' : ''}
        `}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent dark:from-white/5 rounded-bl-full pointer-events-none"></div>
        
        {isCompleted && (
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-green-500 dark:from-green-500 dark:to-green-600"></div>
        )}
        
        {isStarred && (
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-yellow-400/80 border-r-transparent"></div>
        )}

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleCompleted(question.id, !isCompleted);
                }}
                className="mt-1 focus:outline-none"
                aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                {isCompleted ? (
                  <CheckCircle className="text-green-500 dark:text-green-400 drop-shadow-md" size={22} />
                ) : (
                  <Circle className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" size={22} />
                )}
              </motion.button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className={`text-lg font-medium ${isCompleted ? 'text-gray-700 dark:text-gray-200' : 'text-gray-900 dark:text-white'}`}>
                    {question.problem}
                  </h3>

                  <span className={`text-xs px-2.5 py-1 rounded-full border ${difficultyColors[question.difficulty]} font-medium`}>
                    {question.difficulty}
                  </span>
                </div>
                
                {question.tags && question.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {question.tags.map((tag, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.15, rotate: isStarred ? 0 : 20 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleStarred(question.id, !isStarred);
                }}
                className="focus:outline-none"
                aria-label={isStarred ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  size={22}
                  className={
                    isStarred
                      ? "text-yellow-400 fill-yellow-400 drop-shadow-md"
                      : "text-gray-400 dark:text-gray-500 hover:text-yellow-400 dark:hover:text-yellow-400"
                  }
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default QuestionCard;