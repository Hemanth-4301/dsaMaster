import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import QuestionPage from "./pages/QuestionPage";
import {
  loadAppState,
  toggleDarkMode,
  getTotalSolvedQuestions,
} from "./utils/localStorage";
import { totalQuestions } from "../public/data/categories";
import Todo from "./components/Todo";
import Chatbot from "./components/Chatbot";
import About from "./components/About";

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const [totalSolved, setTotalSolved] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const appState = loadAppState();
    setDarkMode(appState.darkMode);
    setTotalSolved(getTotalSolvedQuestions());

    const handleStorageChange = () => {
      setTotalSolved(getTotalSolvedQuestions());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    toggleDarkMode(newDarkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 ${
        darkMode ? "dark" : ""
      }`}
    >
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={handleToggleDarkMode}
        totalSolved={totalSolved}
        totalQuestions={totalQuestions}
      />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/question/:questionId" element={<QuestionPage />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </AnimatePresence>
      </main>
      <div className="p-2 md:p-6 lg:p-12 pb-12">
        {location.pathname !== "/about" && <Chatbot />}
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
