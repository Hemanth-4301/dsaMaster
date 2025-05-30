import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Solution } from '../types/Question';

interface CodeTabsProps {
  solution: Solution;
  title: string;
}

type Language = 'java' | 'python' | 'cpp';

const CodeTabs: React.FC<CodeTabsProps> = ({ solution, title }) => {
  const [activeTab, setActiveTab] = useState<Language>('java');

  const getLanguageHighlight = (language: Language): string => {
    switch (language) {
      case 'java':
        return 'java';
      case 'python':
        return 'python';
      case 'cpp':
        return 'cpp';
      default:
        return 'java';
    }
  };

  return (
    <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
        <div className="flex text-sm">
          {(['java', 'python', 'cpp'] as Language[]).map((lang) => (
            <button
              key={lang}
              className={`px-3 py-1 rounded-md focus:outline-none ${
                activeTab === lang
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(lang)}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <SyntaxHighlighter
            language={getLanguageHighlight(activeTab)}
            style={vs2015}
            customStyle={{
              margin: 0,
              padding: '16px',
              borderRadius: '0 0 8px 8px',
              fontSize: '14px',
            }}
          >
            {solution.code[activeTab]}
          </SyntaxHighlighter>
        </motion.div>
      </AnimatePresence>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Complexity:</span>
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
            Time: {solution.complexity.time}, Space: {solution.complexity.space}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{solution.explanation}</p>
      </div>
    </div>
  );
};

export default CodeTabs;