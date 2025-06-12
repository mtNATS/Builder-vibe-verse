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
    { value: "247", label: "Клиен��ов", color: "text-blue-400", icon: Target },
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
        {/* Reduced intensity gradient orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-primary opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 25, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-accent opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
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
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
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

      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <motion.div
          className="relative z-10 w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* App Icon with refined effects */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <motion.div
              className="w-24 h-24 glass-intense rounded-3xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-90 rounded-3xl" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <ArrowRight className="w-12 h-12 text-white" />
              </motion.div>

              {/* Simplified sparkle */}
              <motion.div
                className="absolute top-2 right-2"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 text-white/60" />
              </motion.div>
            </motion.div>

            {/* App Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl font-bold text-white mb-2">
                Wildberries
              </h1>
              <h2 className="text-3xl font-semibold bg-gradient-accent bg-clip-text text-transparent mb-4">
                Калькулятор
              </h2>
              <p className="text-white/80 text-lg leading-relaxed max-w-sm mx-auto">
                Рассчитайте логистические затраты и комиссии для ваших товаров
                на маркетплейсах
              </p>
            </motion.div>
          </motion.div>

          {/* Start Button */}
          <motion.div variants={itemVariants} className="mb-8">
            <Button
              onClick={handleStartCalculation}
              className="w-full h-16 glass-intense text-slate-900 font-bold text-xl rounded-2xl relative overflow-hidden group bg-white/90 hover:bg-white border-0"
              size="lg"
            >
              <motion.div className="flex items-center justify-center relative z-10">
                <Zap className="w-6 h-6 mr-3 group-hover:text-primary transition-colors" />
                Начать работу
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </motion.div>
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div variants={itemVariants} className="space-y-4">
            {/* Search Section */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-primary rounded-xl">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">Поиск товара</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-12 glass rounded-xl border border-white/20 relative overflow-hidden">
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
                  <div className="h-12 glass rounded-xl border border-white/10 opacity-60" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Calculations */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-accent rounded-xl">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">Последние расчеты</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="glass border-white/20 text-white/90 cursor-pointer"
                  >
                    Все →
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-center py-6">
                  Пока нет расчетов
                </p>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="glass-card border-0 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-secondary rounded-xl">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">
                    Статистика приложения
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        className="text-center glass rounded-xl p-4 cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <div
                          className={`text-2xl font-bold ${stat.color} mb-1`}
                        >
                          {stat.value}
                        </div>
                        <div className="text-white/70 text-sm">
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
