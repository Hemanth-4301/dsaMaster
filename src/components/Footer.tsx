import React from "react";
import { Code, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-4 px-4 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center">
        <div className="flex items-center justify-center space-x-2 mb-4 sm:mb-0">
          <span className="dark:text-white text-black">
            &copy; {new Date().getFullYear()}{" "}
          </span>
          <Code size={20} className="text-black dark:text-white" />
          <span className="text-gray-700 dark:text-gray-300 text-center">
            dark DSA
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
