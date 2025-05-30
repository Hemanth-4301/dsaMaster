import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Code, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  totalSolved: number;
  totalQuestions: number;
}

const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  toggleDarkMode,
  totalSolved,
  totalQuestions,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-black shadow-sm py-3 px-4 sm:px-6 fixed w-full top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white">
          <Code size={28} className="text-white" />
          <span className="text-xl font-bold">dark DSA</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-md font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? "text-white"
                  : "text-white hover:text-primary-600 dark:hover:text-primary-400"
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <div className="text-md font-medium text-white">
            <span className="mr-1">Progress:</span>
            <span className="text-white font-bold">
              <span className="text-primary-400">{totalSolved}</span>/
              {totalQuestions}
            </span>
          </div>

          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
            <span className="mr-1">Progress:</span>
            <span className="text-primary-600 dark:text-primary-400 font-bold">
              {totalSolved}/{totalQuestions}
            </span>
          </div>

          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

          <button
            onClick={toggleMenu}
            className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-2 overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.to
                      ? "text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800 rounded"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
