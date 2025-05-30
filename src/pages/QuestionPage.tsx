import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import CodeTabs from '../components/CodeTabs';
import { categories } from '../data/categories';
import { Question } from '../types/Question';
import { getQuestionStatus, getQuestionStarred, toggleQuestionStatus, toggleQuestionStar } from '../utils/localStorage';

const QuestionPage: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [category, setCategory] = useState<string>('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    if (questionId) {
      const id = parseInt(questionId);
      
      // Find the question and its category
      let foundQuestion: Question | null = null;
      let foundCategory = '';
      
      for (const cat of categories) {
        const q = cat.questions.find((q) => q.id === id);
        if (q) {
          foundQuestion = q;
          foundCategory = cat.id;
          break;
        }
      }
      
      if (foundQuestion) {
        setQuestion(foundQuestion);
        setCategory(foundCategory);
        setIsCompleted(getQuestionStatus(id));
        setIsStarred(getQuestionStarred(id));
      }
    }
  }, [questionId]);

  const handleToggleStatus = () => {
    if (question) {
      const newStatus = !isCompleted;
      toggleQuestionStatus(question.id, newStatus);
      setIsCompleted(newStatus);
    }
  };

  const handleToggleStar = () => {
    if (question) {
      const newStarred = !isStarred;
      toggleQuestionStar(question.id, newStarred);
      setIsStarred(newStarred);
    }
  };

  if (!question) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Question not found</h2>
        <Link to="/" className="text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center">
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
    );
  }

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Hard: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pt-24">
      <div className="mb-8">
        <Link to={`/category/${category}`} className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm">
          <ArrowLeft size={16} className="mr-1" />
          Back to Category
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleStatus}
              className="focus:outline-none"
              aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompleted ? (
                <CheckCircle className="text-green-500 dark:text-green-400\" size={24} />
              ) : (
                <Circle className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" size={24} />
              )}
            </button>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {question.problem}
            </h1>
            
            <span className={`text-sm px-2 py-1 rounded-full ${difficultyColors[question.difficulty]}`}>
              {question.difficulty}
            </span>
          </div>
          
          <button
            onClick={handleToggleStar}
            className="focus:outline-none"
            aria-label={isStarred ? "Remove from favorites" : "Add to favorites"}
          >
            <Star 
              size={24} 
              className={isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-400 dark:text-gray-500"} 
            />
          </button>
        </div>
        
        <div className="mb-6">
          <a 
            href={question.leetcodeLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            View on LeetCode
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Problem Description</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{question.description}</p>
          
          {question.examples.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
              <div className="space-y-4">
                {question.examples.map((example, index) => (
                  <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                    <div className="mb-2">
                      <span className="font-mono font-medium text-gray-800 dark:text-gray-200">Input: </span>
                      <span className="font-mono text-gray-700 dark:text-gray-300">{example.input}</span>
                    </div>
                    <div>
                      <span className="font-mono font-medium text-gray-800 dark:text-gray-200">Output: </span>
                      <span className="font-mono text-gray-700 dark:text-gray-300">{example.output}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Brute Force Approach</h2>
            <CodeTabs solution={question.bruteForce} title="Brute Force Solution" />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Optimal Approach</h2>
            <CodeTabs solution={question.optimal} title="Optimal Solution" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionPage;