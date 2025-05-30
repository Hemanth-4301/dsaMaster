import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import ProgressBar from "./ProgressBar";
import { Category } from "../types/Question";

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

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="backdrop-blur-lg bg-white/30 dark:bg-gray-800/30 rounded-xl shadow-lg overflow-hidden border border-gray-200/50 dark:border-gray-700/50 transition-all duration-200 hover:shadow-xl"
    >
      <Link to={`/category/${category.id}`} className="block h-full">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-primary-100/50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <IconComponent size={24} />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              {category.name}
            </h3>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-12">
            {category.description}
          </p>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {solvedCount} / {totalQuestions} solved
              </span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {Math.round(progress)}%
              </span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
