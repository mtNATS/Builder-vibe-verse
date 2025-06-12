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
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-accent opacity-15 blur-3xl floating"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
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

      {/* Main Content */}
      <div
        className="relative z-10 min-h-screen flex items-center justify-center p-6"
        style={{
          "@media (max-width: 640px)": {
            minHeight: "102px",
          },
        }}
      >
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader className="text-center relative">
                {/* Simplified sparkle */}
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

                {/* Custom Logo */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-full ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  style={{
                    backgroundColor: "rgb(156, 163, 175)", // gray-400 equivalent
                  }}
                >
                  {/* Final Logo Replica */}
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 100 100"
                    className="relative z-10"
                  >
                    {/* Circle outline */}
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    />

                    {/* Vertical stem of 't' */}
                    <path
                      d="M30 18
                         L30 79
                         C30 81 32 83 34 83
                         L38 83
                         C40 83 42 81 42 79
                         L42 18
                         C42 16 40 14 38 14
                         L34 14
                         C32 14 30 16 30 18 Z"
                      fill="white"
                    />

                    {/* Flowing banner/ribbon */}
                    <path
                      d="M25 30
                         C24 28 25 26 27 26
                         L82 30
                         C85 31 86 34 85 37
                         C84 40 81 42 78 43
                         C75 44 71 44 67 43
                         C63 42 59 40 55 38
                         C51 36 47 34 43 33
                         C39 32 35 31 31 31
                         C28 31 26 30 25 30 Z"
                      fill="white"
                    />

                    {/* Banner shadow/depth */}
                    <path
                      d="M30 33
                         L75 35
                         C78 35 80 37 79 39
                         C78 41 75 42 72 42
                         C68 42 64 41 60 40
                         C56 39 52 37 48 36
                         C44 35 40 34 36 34
                         C33 34 30 33 30 33 Z"
                      fill="rgba(255,255,255,0.7)"
                    />

                    {/* Bottom horizontal base */}
                    <path
                      d="M30 68
                         L72 68
                         C76 68 80 70 80 74
                         C80 78 76 80 72 80
                         L34 80
                         C32 80 30 78 30 76
                         L30 68 Z"
                      fill="white"
                    />

                    {/* Rounded end for base */}
                    <path
                      d="M72 68
                         C78 68 82 70 82 74
                         C82 78 78 80 72 80
                         C76 80 80 78 80 74
                         C80 70 76 68 72 68 Z"
                      fill="white"
                    />
                  </svg>
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    Fusion Starter
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Добро пожаловать в приложение для расчета логистических
                    затрат
                  </CardDescription>
                </motion.div>
              </CardHeader>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Moved CardContent outside */}
      <div className="relative z-10 px-6 pb-6 max-w-md mx-auto">
        <CardContent className="p-0">
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => navigate("/calculator")}
              className="w-full h-14 text-lg font-semibold bg-gradient-primary hover:bg-gradient-secondary border-0 shadow-lg transition-all duration-200 group"
              size="lg"
            >
              <Package className="w-5 h-5 mr-3 group-hover:rotate-6 transition-transform duration-200" />
              Калькулятор Wildberries
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Button>
          </motion.div>

          {/* Feature Cards - simplified hover effects */}
          <motion.div
            className="grid grid-cols-2 gap-4 mt-6"
            variants={itemVariants}
          >
            <motion.div
              className={`p-4 ${isDark ? "glass" : "neu"} rounded-xl text-center cursor-pointer group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-accent flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Точные расчеты
              </p>
            </motion.div>

            <motion.div
              className={`p-4 ${isDark ? "glass" : "neu"} rounded-xl text-center cursor-pointer group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Быстрые результаты
              </p>
            </motion.div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className={`p-4 ${isDark ? "glass" : "neu-inset"} rounded-xl mt-6`}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span>Современный интерфейс с Glassmorphism</span>
            </div>
          </motion.div>
        </CardContent>
      </div>
    </div>
  );
};

export default Index;
