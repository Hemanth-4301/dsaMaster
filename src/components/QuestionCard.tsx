import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle, Circle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Question, Difficulty } from '../types/Question';

interface QuestionCardProps {
  question: Question;
  isCompleted: boolean;
  isStarred: boolean;
  onToggleCompleted: (id: number, status: boolean) => void;
  onToggleStarred: (id: number, starred: boolean) => void;
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isCompleted,
  isStarred,
  onToggleCompleted,
  onToggleStarred,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-200"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onToggleCompleted(question.id, !isCompleted)}
              className="mt-1 focus:outline-none"
              aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompleted ? (
                <CheckCircle className="text-green-500 dark:text-green-400\" size={20} />
              ) : (
                <Circle className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300\" size={20} />
              )}
            </button>
            
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {question.problem}
                </h3>
                <a 
                  href={question.leetcodeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <ExternalLink size={12} className="mr-1" />
                  LeetCode
                </a>
                <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[question.difficulty]}`}>
                  {question.difficulty}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onToggleStarred(question.id, !isStarred)}
              className="focus:outline-none"
              aria-label={isStarred ? "Remove from favorites" : "Add to favorites"}
            >
              <Star 
                size={20} 
                className={isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-400 dark:text-gray-500"} 
              />
            </button>
            
            <button
              onClick={toggleExpanded}
              className="focus:outline-none text-gray-500 dark:text-gray-400"
              aria-label={isExpanded ? "Collapse question details" : "Expand question details"}
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Problem Description</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{question.description}</p>
                </div>
                
                {question.examples.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Examples</h4>
                    <div className="space-y-2">
                      {question.examples.map((example, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md text-sm">
                          <div className="mb-1">
                            <span className="font-mono text-gray-800 dark:text-gray-200">Input: </span>
                            <span className="font-mono text-gray-600 dark:text-gray-400">{example.input}</span>
                          </div>
                          <div>
                            <span className="font-mono text-gray-800 dark:text-gray-200">Output: </span>
                            <span className="font-mono text-gray-600 dark:text-gray-400">{example.output}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="pt-2">
                  <Link
                    to={`/question/${question.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    View full solution
                    <ChevronDown size={16} className="ml-1 rotate-270" style={{ transform: 'rotate(-90deg)' }} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default QuestionCard;