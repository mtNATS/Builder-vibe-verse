import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Database, Calculator, Sparkles, Zap } from "lucide-react";
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

  return (
    <div className="min-h-screen morph-bg relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pulsing orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-primary opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-accent opacity-25 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Data flow particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Binary code effect */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`binary-${i}`}
            className="absolute text-white/10 text-xs font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </motion.div>
        ))}
      </div>

      <div className="relative min-h-screen max-w-md mx-auto flex flex-col items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-sm">
          {/* Enhanced Loading Icon */}
          <motion.div
            className="relative mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <motion.div
              className="w-24 h-24 glass-intense rounded-full flex items-center justify-center mx-auto relative overflow-hidden"
              animate={{
                boxShadow: [
                  "0 8px 32px -8px rgba(102, 126, 234, 0.4)",
                  "0 16px 48px -8px rgba(102, 126, 234, 0.6)",
                  "0 8px 32px -8px rgba(102, 126, 234, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Rotating background */}
              <motion.div
                className={`absolute inset-0 ${currentStepData.bgColor} opacity-80 rounded-full`}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Main icon */}
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
                  className: "w-12 h-12 text-white",
                })}
              </motion.div>

              {/* Orbiting sparkles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/60 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    rotate: [0, 360],
                    x: [0, 30],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut",
                  }}
                />
              ))}

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
          </motion.div>

          {/* Enhanced Progress Section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/80 text-sm font-medium">
                Прогресс анализа
              </span>
              <motion.span
                className="text-blue-400 text-base font-bold"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(59,130,246,0.5)",
                    "0 0 20px rgba(59,130,246,0.8)",
                    "0 0 10px rgba(59,130,246,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {Math.round(progress)}%
              </motion.span>
            </div>

            {/* Custom Progress Bar */}
            <div className="relative">
              <div className="h-2 glass rounded-full overflow-hidden">
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
          </motion.div>

          {/* Current Step Display */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="glass-card p-4 border-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  className={`p-3 ${currentStepData.bgColor} rounded-xl relative`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute inset-0 rounded-xl border-2 border-white/30" />
                  {React.createElement(currentStepData.icon, {
                    className: "w-6 h-6 text-white relative z-10",
                  })}
                </motion.div>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>

              <motion.h2
                className="text-white text-lg font-bold mb-2"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.3)",
                    "0 0 20px rgba(102,126,234,0.4)",
                    "0 0 10px rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Анализ данных...
              </motion.h2>

              <motion.p
                className={`${currentStepData.color} font-medium text-sm`}
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {currentStepData.label}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Enhanced Steps Indicator */}
          <motion.div
            className="flex justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative p-2 rounded-full transition-all duration-500 ${
                  currentStep >= index ? "glass" : "bg-white/10"
                }`}
                animate={{
                  scale: currentStep === index ? [1, 1.2, 1] : 1,
                  opacity: currentStep >= index ? 1 : 0.4,
                }}
                transition={{
                  scale: { duration: 1, repeat: Infinity },
                  opacity: { duration: 0.3 },
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full border border-white/30" />
                  {React.createElement(step.icon, {
                    className: `w-3 h-3 ${
                      currentStep >= index ? step.color : "text-white/40"
                    } relative z-10`,
                  })}
                </div>

                {currentStep >= index && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/30"
                    animate={{
                      scale: [1, 1.5],
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
          </motion.div>

          {/* Enhanced Cancel Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full glass-button border-white/30 text-white/90 hover:bg-white/10 hover:text-white h-10 font-medium"
            >
              <Zap className="w-4 h-4 mr-2" />
              Отменить
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
