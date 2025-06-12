import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calculator,
  ArrowRight,
  Package,
  TrendingUp,
  Moon,
  Sun,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleStartCalculation = () => {
    navigate("/calculator/form");
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isDark ? "bg-gradient-mobile-dark" : "bg-gradient-mobile-light"}`}
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs - reduced intensity */}
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-primary opacity-20 blur-3xl floating"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-secondary opacity-10 blur-3xl floating"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 glass-button text-foreground"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* Main Content - More compact layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-4 max-w-md mx-auto">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Compact Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader className="pb-4 pt-6">
                {/* Sparkle */}
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="w-4 h-4 text-primary opacity-60" />
                </motion.div>

                {/* Logo */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    backgroundColor: "rgb(156, 163, 175)",
                  }}
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    className="relative z-10"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    />
                    <rect
                      x="30"
                      y="20"
                      width="8"
                      height="60"
                      rx="4"
                      fill="white"
                    />
                    <path
                      d="M22 32
                         C 21 30 22 28 24 28
                         L 82 30
                         C 85 30.5 86 32.5 85 35
                         C 84 37.5 81 39 78 39
                         C 74 39 69 38 64 36.5
                         C 58 35 52 33.5 46 32
                         C 40 30.5 34 29.5 28 29
                         C 25 28.5 23 29.5 22 32 Z"
                      fill="white"
                    />
                    <rect
                      x="30"
                      y="70"
                      width="38"
                      height="8"
                      rx="4"
                      fill="white"
                    />
                    <circle cx="68" cy="74" r="4" fill="white" />
                  </svg>
                </motion.div>

                {/* Compact Title */}
                <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  Fusion Starter
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Калькулятор логистических затрат
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 pb-6">
                {/* Enhanced Main CTA Button with Neumorphism */}
                <motion.div variants={itemVariants} className="mb-4">
                  <Button
                    onClick={handleStartCalculation}
                    className={`w-full h-12 text-base font-semibold border-0 shadow-lg transition-all duration-200 group relative overflow-hidden ${
                      isDark
                        ? "glass text-white hover:bg-white/10"
                        : "neu-button bg-gradient-primary text-white hover:shadow-xl"
                    }`}
                    size="lg"
                  >
                    <div className="flex items-center justify-center relative z-10">
                      <Package className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform duration-200" />
                      Калькулятор Wildberries
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                    {/* Gradient overlay */}
                    {!isDark && (
                      <div className="absolute inset-0 bg-gradient-primary opacity-90 rounded-lg" />
                    )}
                  </Button>
                </motion.div>

                {/* Compact Feature Cards with outlined icons */}
                <motion.div
                  className="grid grid-cols-2 gap-3"
                  variants={itemVariants}
                >
                  <motion.div
                    className={`p-3 ${isDark ? "glass" : "neu"} rounded-lg text-center cursor-pointer group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-accent flex items-center justify-center relative">
                      {/* Icon outline */}
                      <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                      <TrendingUp className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      Точные расчеты
                    </p>
                  </motion.div>

                  <motion.div
                    className={`p-3 ${isDark ? "glass" : "neu"} rounded-lg text-center cursor-pointer group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-secondary flex items-center justify-center relative">
                      {/* Icon outline */}
                      <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                      <Calculator className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                      Быстрые результаты
                    </p>
                  </motion.div>
                </motion.div>

                {/* Compact Additional Info */}
                <motion.div
                  variants={itemVariants}
                  className={`p-3 ${isDark ? "glass" : "neu-inset"} rounded-lg mt-4`}
                >
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 text-primary" />
                    </motion.div>
                    <span>Современный интерфейс с Glassmorphism</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Additional styled element */}
        <div className="glass rounded-lg p-4" />
      </div>
    </div>
  );
};

export default Index;
