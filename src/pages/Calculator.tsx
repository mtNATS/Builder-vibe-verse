import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Package,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Target,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Calculator = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  const handleStartCalculation = () => {
    navigate("/calculator/form");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const statsData = [
    { value: "247", label: "Клиентов", color: "text-blue-400", icon: Target },
    { value: "1286", label: "Товаров", color: "text-green-400", icon: Package },
    {
      value: "1.2M",
      label: "На сумму",
      color: "text-orange-400",
      icon: TrendingUp,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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
    <div className="min-h-screen morph-bg relative overflow-hidden">
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-primary opacity-20 blur-3xl floating"
          animate={{
            x: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-accent opacity-15 blur-3xl floating"
          animate={{
            x: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />

        {/* Reduced floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 glass-button text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3 }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      {/* Compact Main Content */}
      <div className="relative min-h-screen flex flex-col justify-center p-4 max-w-md mx-auto">
        <motion.div
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header with Logo */}
          <motion.div variants={itemVariants} className="text-center mb-6">
            <motion.div
              className="w-16 h-16 glass-intense rounded-2xl flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
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
                <rect x="30" y="20" width="8" height="60" rx="4" fill="white" />
                <path
                  d="M22 32 C 21 30 22 28 24 28 L 82 30 C 85 30.5 86 32.5 85 35 C 84 37.5 81 39 78 39 C 74 39 69 38 64 36.5 C 58 35 52 33.5 46 32 C 40 30.5 34 29.5 28 29 C 25 28.5 23 29.5 22 32 Z"
                  fill="white"
                />
                <rect x="30" y="70" width="38" height="8" rx="4" fill="white" />
                <circle cx="68" cy="74" r="4" fill="white" />
              </svg>
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">Wildberries</h1>
            <h2 className="text-2xl font-semibold bg-gradient-accent bg-clip-text text-transparent mb-2">
              Калькулятор
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mx-auto">
              Рассчитайте логистические затраты и комиссии для ваших товаров на
              маркетплейсах
            </p>
          </motion.div>

          {/* Start Button */}
          <motion.div variants={itemVariants} className="mb-6">
            <Button
              onClick={handleStartCalculation}
              className="w-full h-12 glass-intense text-slate-900 font-bold text-lg rounded-xl relative overflow-hidden group bg-white/90 hover:bg-white border-0"
              size="lg"
            >
              <motion.div className="flex items-center justify-center relative z-10">
                <Zap className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
                Начать работу
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Compact Feature Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Search Section */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <Search className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-lg">Поиск товара</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="h-10 glass rounded-lg border border-white/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: [-100, 300] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <div className="h-10 glass rounded-lg border border-white/10 opacity-60" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Calculations */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-accent rounded-lg relative">
                      <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                      <Calculator className="w-5 h-5 text-white relative z-10" />
                    </div>
                    <CardTitle className="text-lg">Последние расчеты</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="glass border-white/20 text-white/90 cursor-pointer text-xs"
                  >
                    Все →
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-white/60 text-center py-4 text-sm">
                  Пока нет расчетов
                </p>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-secondary rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <TrendingUp className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-lg">
                    Статистика приложения
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-3">
                  {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="text-center glass rounded-lg p-3 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-6 h-6 mx-auto mb-2 rounded-lg bg-gradient-primary flex items-center justify-center relative">
                          <div className="absolute inset-0 rounded-lg border border-white/30" />
                          <IconComponent className="w-3 h-3 text-white relative z-10" />
                        </div>
                        <div className={`text-xl font-bold ${stat.color} mb-1`}>
                          {stat.value}
                        </div>
                        <div className="text-white/70 text-xs">
                          {stat.label}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Calculator;
