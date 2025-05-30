import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Filter, BookOpen } from "lucide-react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { categories } from "../data/categories";
import { Category, Difficulty, Question } from "../types/Question";
import {
  getQuestionStatus,
  getQuestionStarred,
  toggleQuestionStatus,
  toggleQuestionStar,
} from "../utils/localStorage";

type FilterOption = "all" | "solved" | "unsolved" | "starred";
type SortOption =
  | "default"
  | "difficulty-asc"
  | "difficulty-desc"
  | "name-asc"
  | "name-desc";

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const foundCategory = categories.find((c) => c.id === categoryId) || null;
    setCategory(foundCategory);

    if (foundCategory) {
      setQuestions(foundCategory.questions);
    }
  }, [categoryId]);

  const handleToggleCompleted = (id: number, status: boolean) => {
    toggleQuestionStatus(id, status);
    // Force a re-render
    setQuestions([...questions]);
  };

  const handleToggleStarred = (id: number, starred: boolean) => {
    toggleQuestionStar(id, starred);
    // Force a re-render
    setQuestions([...questions]);
  };

  const filteredQuestions = questions.filter((question) => {
    // Apply search filter
    if (
      searchQuery &&
      !question.problem.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Apply status filter
    const isCompleted = getQuestionStatus(question.id);
    const isStarred = getQuestionStarred(question.id);

    switch (filter) {
      case "solved":
        return isCompleted;
      case "unsolved":
        return !isCompleted;
      case "starred":
        return isStarred;
      default:
        return true;
    }
  });

  // Apply sorting
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "difficulty-asc":
        return (
          getDifficultyValue(a.difficulty) - getDifficultyValue(b.difficulty)
        );
      case "difficulty-desc":
        return (
          getDifficultyValue(b.difficulty) - getDifficultyValue(a.difficulty)
        );
      case "name-asc":
        return a.problem.localeCompare(b.problem);
      case "name-desc":
        return b.problem.localeCompare(a.problem);
      default:
        return a.id - b.id;
    }
  });

  const getDifficultyValue = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case "Easy":
        return 1;
      case "Medium":
        return 2;
      case "Hard":
        return 3;
      default:
        return 0;
    }
  };

  // Calculate solved count and progress
  const solvedCount =
    category?.questions.filter((q) => getQuestionStatus(q.id)).length || 0;
  const totalCount = category?.questions.length || 0;
  const progress = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  if (!category) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Category not found
        </h2>
        <Link
          to="/"
          className="text-primary-600 dark:text-primary-400 hover:underline flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pt-24">
      <div className="mb-8">
        <Link
          to="/"
          className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Categories
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {category.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {category.description}
        </p>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Progress: {solvedCount} / {totalCount} questions solved
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(progress)}%
            </div>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="flex space-x-4 overflow-x-auto">
          <div className="relative ">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as FilterOption)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer"
            >
              <option value="all">All Questions</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
              <option value="starred">Starred</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BookOpen size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {sortedQuestions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">
            No questions found matching your criteria.
          </p>
        </div>
      ) : (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {sortedQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isCompleted={getQuestionStatus(question.id)}
              isStarred={getQuestionStarred(question.id)}
              onToggleCompleted={handleToggleCompleted}
              onToggleStarred={handleToggleStarred}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CategoryPage;
