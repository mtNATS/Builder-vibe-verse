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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
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

                {/* App Icon with refined effects */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-80 rounded-2xl" />
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Calculator className="w-10 h-10 text-white relative z-10" />
                  </motion.div>
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

              <CardContent className="space-y-6">
                {/* Main CTA Button */}
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
                  className="grid grid-cols-2 gap-4"
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
                  className={`p-4 ${isDark ? "glass" : "neu-inset"} rounded-xl`}
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
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
