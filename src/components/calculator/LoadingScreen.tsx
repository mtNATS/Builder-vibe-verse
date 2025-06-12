import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Database,
  Calculator,
  Sparkles,
  Zap,
  Sun,
  Moon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoadingScreenProps {
  onComplete: () => void;
  onCancel: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  onCancel,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDark, setIsDark] = useState(true);

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

  const steps = [
    {
      icon: Search,
      label: "Поиск товара на Wildberries",
      duration: 800,
      color: "text-blue-400",
      bgColor: "bg-gradient-primary",
    },
    {
      icon: Database,
      label: "Сбор актуальных данных",
      duration: 700,
      color: "text-green-400",
      bgColor: "bg-gradient-accent",
    },
    {
      icon: Calculator,
      label: "Расчет комиссий и логистики",
      duration: 500,
      color: "text-purple-400",
      bgColor: "bg-gradient-secondary",
    },
  ];

  useEffect(() => {
    const totalTime = steps.reduce((acc, step) => acc + step.duration, 0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / totalTime) * 50;

        // Update current step based on progress
        let stepProgress = 0;
        for (let i = 0; i < steps.length; i++) {
          stepProgress += (steps[i].duration / totalTime) * 100;
          if (newProgress <= stepProgress) {
            setCurrentStep(i);
            break;
          }
        }

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }

        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const currentStepData = steps[currentStep] || steps[0];

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
      {/* Background elements matching Index page */}
      <div className="absolute inset-0 overflow-hidden">
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

      {/* Main Content - Unified layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-start pt-20 p-4 max-w-md mx-auto">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              {/* Loading Icon Header - Unified spacing */}
              <CardHeader className="text-center relative p-6">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  animate={{
                    boxShadow: [
                      "0 8px 32px -8px rgba(102, 126, 234, 0.4)",
                      "0 16px 48px -8px rgba(102, 126, 234, 0.6)",
                    ],
                  }}
                >
                  {/* Rotating background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-primary opacity-90 rounded-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="relative z-10"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity },
                    }}
                  >
                    {React.createElement(currentStepData.icon, {
                      className: "w-8 h-8 text-white",
                    })}
                  </motion.div>

                  {/* Progress ring */}
                  <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="2"
                      fill="none"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="rgba(255,255,255,0.8)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      transition={{ duration: 0.5 }}
                    />
                  </svg>
                </motion.div>

                {/* Title - Unified typography */}
                <CardTitle className="text-xl font-bold text-foreground mb-3">
                  Анализ данных...
                </CardTitle>

                <div className="text-sm text-muted-foreground mb-6">
                  Обработка параметров товара
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 space-y-8">
                {/* Progress Section - Unified spacing */}
                <motion.div variants={itemVariants}>
                  <div className={`p-6 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground text-sm font-medium">
                        Прогресс анализа
                      </span>
                      <motion.span
                        className="text-primary text-lg font-bold"
                        animate={{
                          textShadow: [
                            "0 0 10px rgba(59,130,246,0.5)",
                            "0 0 20px rgba(59,130,246,0.8)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {Math.round(progress)}%
                      </motion.span>
                    </div>

                    {/* Custom Progress Bar */}
                    <div className="relative">
                      <div
                        className={`h-3 ${isDark ? "glass" : "neu-inset"} rounded-full overflow-hidden`}
                      >
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full relative overflow-hidden"
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            animate={{ x: [-100, 200] }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Current Step Display - Unified spacing */}
                <motion.div variants={itemVariants}>
                  <div className={`p-6 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center relative"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        {React.createElement(currentStepData.icon, {
                          className: "w-5 h-5 text-white relative z-10",
                        })}
                      </motion.div>
                      <h4 className="text-lg font-semibold text-foreground">
                        Текущий этап
                      </h4>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Sparkles className="w-4 h-4 text-primary opacity-60" />
                      </motion.div>
                    </div>

                    <motion.p
                      className={`${currentStepData.color} font-medium text-base`}
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {currentStepData.label}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Steps Indicator - Unified spacing */}
                <motion.div variants={itemVariants}>
                  <div className={`p-6 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        <Calculator className="w-5 h-5 text-white relative z-10" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground">
                        Этапы обработки
                      </h4>
                    </div>

                    <div className="flex justify-center gap-4">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`relative p-4 rounded-lg transition-all duration-500 ${
                            currentStep >= index
                              ? isDark
                                ? "glass"
                                : "neu"
                              : "bg-muted/20"
                          }`}
                          animate={{
                            scale: currentStep === index ? [1, 1.05, 1] : 1,
                            opacity: currentStep >= index ? 1 : 0.4,
                          }}
                          transition={{
                            scale: { duration: 1, repeat: Infinity },
                            opacity: { duration: 0.3 },
                          }}
                        >
                          <div className="relative">
                            <div className="absolute inset-0 rounded-lg border border-white/30" />
                            {React.createElement(step.icon, {
                              className: `w-5 h-5 ${
                                currentStep >= index
                                  ? step.color
                                  : "text-muted-foreground"
                              } relative z-10`,
                            })}
                          </div>

                          {currentStep >= index && (
                            <motion.div
                              className="absolute inset-0 rounded-lg border-2 border-primary/30"
                              animate={{
                                scale: [1, 1.2],
                                opacity: [0.8, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Cancel Button - Unified height */}
                <motion.div variants={itemVariants}>
                  <Button
                    variant="outline"
                    onClick={onCancel}
                    className={`w-full h-12 text-base ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Отменить
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
