import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import QuestionPage from './pages/QuestionPage';
import { loadAppState, toggleDarkMode, getTotalSolvedQuestions } from './utils/localStorage';
import { totalQuestions } from './data/categories';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [totalSolved, setTotalSolved] = useState(0);
  
  useEffect(() => {
    const appState = loadAppState();
    setDarkMode(appState.darkMode);
    setTotalSolved(getTotalSolvedQuestions());
    
    const handleStorageChange = () => {
      setTotalSolved(getTotalSolvedQuestions());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    toggleDarkMode(newDarkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col bg-gradient-to-br from-primary-50/30 to-secondary-50/30 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
        <Navbar 
          darkMode={darkMode} 
          toggleDarkMode={handleToggleDarkMode} 
          totalSolved={totalSolved}
          totalQuestions={totalQuestions}
        />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/question/:questionId" element={<QuestionPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App