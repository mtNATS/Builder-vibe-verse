import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  TrendingUp,
  Package,
  Moon,
  Sun,
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
    { value: "247", label: "Клиентов", color: "text-blue-400" },
    { value: "1286", label: "Товаров", color: "text-green-400" },
    { value: "1.2M", label: "На сумму", color: "text-orange-400" },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 ${isDark ? "dark" : ""}`}
    >
      {/* Theme Toggle */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </motion.button>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full"
        >
          {/* App Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-500/25"
          >
            <ArrowRight className="w-10 h-10 text-white" />
          </motion.div>

          {/* App Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Wildberries</h1>
            <h2 className="text-2xl font-semibold text-white/90 mb-4">
              Калькулятор
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm mx-auto">
              Рассчитайте логистические затраты и комиссии для ваших товаров на
              маркетплейсах
            </p>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mb-8"
          >
            <Button
              onClick={handleStartCalculation}
              className="w-full h-14 bg-white text-slate-900 hover:bg-white/90 font-semibold text-lg rounded-2xl shadow-xl shadow-white/10 transition-all duration-300 hover:shadow-white/20"
              size="lg"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Начать работу
            </Button>
          </motion.div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="space-y-4"
          >
            {/* Search Section */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Package className="w-5 h-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">Поиск товара</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-10 bg-white/10 rounded-lg border border-white/20"></div>
                  <div className="h-10 bg-white/5 rounded-lg border border-white/10"></div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Calculations */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Calculator className="w-5 h-5 text-green-400" />
                    </div>
                    <CardTitle className="text-lg">Последние расчеты</CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white/80 border-white/20"
                  >
                    Все →
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/60 text-center py-4">
                  Пока нет расчетов
                </p>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-white">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-lg">
                    Статистика приложения
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {statsData.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                      className="text-center"
                    >
                      <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
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
