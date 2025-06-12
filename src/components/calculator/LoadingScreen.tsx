import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Database, Calculator } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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

  const steps = [
    { icon: Search, label: "Поиск товара на Wildberries", duration: 800 },
    { icon: Database, label: "Сбор актуальных данных", duration: 700 },
    { icon: Calculator, label: "Расчет комиссий и логистики", duration: 500 },
  ];

  useEffect(() => {
    let totalDuration = 0;
    let currentDuration = 0;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark">
      <div className="relative min-h-screen max-w-md mx-auto flex flex-col items-center justify-center p-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          {/* Loading Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/25"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Search className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/60 text-sm">Прогресс</span>
              <span className="text-blue-400 text-sm font-medium">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
          </div>

          {/* Current Step */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                {React.createElement(steps[currentStep]?.icon || Search, {
                  className: "w-6 h-6 text-green-400",
                })}
              </div>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">
              Анализ данных...
            </h2>
            <p className="text-white/70">
              {steps[currentStep]?.label || "Обработка запроса"}
            </p>
          </motion.div>

          {/* Steps Indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0.3 }}
                animate={{
                  scale: currentStep >= index ? 1 : 0.8,
                  opacity: currentStep >= index ? 1 : 0.3,
                }}
                className={`w-2 h-2 rounded-full ${
                  currentStep >= index ? "bg-green-400" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Cancel Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full border-white/30 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Отменить
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
