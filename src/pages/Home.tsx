import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import CategoryCard from "../components/CategoryCard";
import { categories, totalQuestions } from "../../public/data/categories";
import {
  getTotalSolvedQuestions,
  getQuestionStatus,
} from "../utils/localStorage";

const Home: React.FC = () => {
  const totalSolved = getTotalSolvedQuestions();

  // Get the count of solved questions for each category
  const getSolvedCountForCategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (!category) return 0;

    return category.questions.filter((q) => getQuestionStatus(q.id)).length;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
      <Hero totalSolved={totalSolved} totalQuestions={totalQuestions} />

      <motion.div
        className="mt-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        id="categories"
      >
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8"
          variants={itemVariants}
        >
          DSA Categories
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <CategoryCard
                category={category}
                solvedCount={getSolvedCountForCategory(category.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
