import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cpu,
  BookOpen,
  Lightbulb,
  Heart,
  Sparkles,
  Stars,
} from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const features = [
    {
      icon: Code,
      title: "Comprehensive DSA Learning",
      description:
        "Learn Data Structures and Algorithms through our curated collection of 141 essential problems covering all fundamental concepts.",
      color: "blue",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Cpu,
      title: "AI-Powered Assistance",
      description:
        "Get instant help from our intelligent assistant that can explain concepts, debug code, and provide learning resources.",
      color: "purple",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: BookOpen,
      title: "Integrated Note-Taking",
      description:
        "Built-in todo app helps you track your progress and organize study notes efficiently.",
      color: "green",
      gradient: "from-green-400 to-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent mb-6">
              darkDSA
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4"
            >
              <Sparkles size={32} className="text-purple-400" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-6"
          >
            <div className="w-32 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full shadow-lg">
              <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Swapped the order of these two divs to move right content to left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:order-2"
          >
            {/* Decorative elements around the main card */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-80"
            ></motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-80"
            ></motion.div>

            <motion.div
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60 p-8 rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50 backdrop-blur-lg"
            >
              <div className="mt-8 mb-8">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
                >
                  This platform is designed to help you systematically learn and
                  practice core Data Structures and Algorithms concepts. With
                  carefully selected problems, intelligent assistance, and
                  productivity tools, we aim to make your DSA journey more
                  effective and enjoyable.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-pink-200 dark:border-pink-800/30"
                >
                  <div className="flex justify-center items-center gap-3 text-pink-600 dark:text-pink-400">
                    <span className="text-lg font-medium">Built with</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <Heart size={24} className="fill-current" />
                    </motion.div>
                    <span className="text-lg font-medium">and passion</span>
                  </div>
                </motion.div>
              </div>

              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -100, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: "10%",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 lg:order-1"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-700/30 rounded-2xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className={`p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl shadow-lg`}
                    >
                      <feature.icon size={28} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom decorative section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear",
                }}
              >
                <Stars size={20} className="text-yellow-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
