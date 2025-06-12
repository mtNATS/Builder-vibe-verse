import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  CreditCard,
  Info,
  Sparkles,
  Target,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculationResults } from "@/types/calculator";

const CalculatorResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // Fallback data in case location.state is undefined
  const defaultResults: CalculationResults = {
    logistics: {
      deliveryCost: 47.5,
      storageCost: 0.0,
      returnCost: 137.5,
      totalExpenses: 185.0,
    },
    commissions: {
      marketplaceCommission: 67.42,
      marketplaceCommissionPercent: 15.5,
      supplierCommission: 67.42,
      supplierCommissionPercent: 15.5,
    },
    productInfo: {
      title: "Протеиновые батончики без сахара Layers Ассорти, 4шт х 60г",
      price: 435,
      rating: 4.8,
      reviewCount: 5247,
    },
  };

  // Safely extract results with fallback
  const results = location.state?.results || defaultResults;
  const hasValidData = !!location.state?.results;

  useEffect(() => {
    if (!hasValidData) {
      console.warn("No calculation data found, using fallback data");
    }
  }, [hasValidData]);

  const goBack = () => {
    navigate("/calculator/form");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const totalCosts =
    results.logistics.totalExpenses +
    results.commissions.marketplaceCommission +
    results.commissions.supplierCommission;

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
      {/* Simplified background elements matching Index page */}
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 pb-2"
      >
        <div className="flex items-center justify-between mb-4 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="glass-button text-foreground hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-foreground">
            Результаты расчета
          </h1>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-primary opacity-60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content in Index page style */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-4 max-w-md mx-auto">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader className="text-center relative pb-4">
                {/* Success sparkle */}
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
                  <Sparkles className="w-4 h-4 text-green-500 opacity-80" />
                </motion.div>

                {/* Product Info Header */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-secondary opacity-90 rounded-2xl" />
                  <Package className="w-8 h-8 text-white relative z-10" />
                </motion.div>

                {/* Product Title */}
                <CardTitle className="text-lg font-bold text-foreground mb-2 leading-tight">
                  {results.productInfo.title}
                </CardTitle>

                {/* Rating and Reviews */}
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div
                    className={`flex items-center gap-1 ${isDark ? "glass" : "neu"} rounded-full px-3 py-1`}
                  >
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm font-medium">
                      {results.productInfo.rating}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${isDark ? "glass" : "neu"} border-0 text-muted-foreground text-xs`}
                  >
                    {results.productInfo.reviewCount?.toLocaleString("ru-RU")}{" "}
                    отзывов
                  </Badge>
                </div>

                {/* Price */}
                <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                  {formatCurrency(results.productInfo.price)}
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-6">
                {/* Action Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-3"
                >
                  <Button
                    variant="outline"
                    className={`h-10 text-sm ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Подробности
                  </Button>
                </motion.div>

                {/* Detailed Breakdown */}
                <motion.div variants={itemVariants} className="space-y-4">
                  {/* Logistics Details */}
                  <div className={`p-4 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-accent rounded-lg relative">
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        <TrendingUp className="w-4 h-4 text-white relative z-10" />
                      </div>
                      <h4 className="font-semibold text-foreground">
                        Логистика
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Доставка:</span>
                        <span className="font-medium text-blue-500">
                          {formatCurrency(results.logistics.deliveryCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Хранение:</span>
                        <span className="font-medium text-green-500">
                          {formatCurrency(results.logistics.storageCost)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Возврат:</span>
                        <span className="font-medium text-orange-500">
                          {formatCurrency(results.logistics.returnCost)}
                        </span>
                      </div>
                      <Separator className="my-2 opacity-50" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Итого:</span>
                        <span className="text-green-500">
                          {formatCurrency(results.logistics.totalExpenses)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Commissions Details */}
                  <div className={`p-4 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-secondary rounded-lg relative">
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        <CreditCard className="w-4 h-4 text-white relative z-10" />
                      </div>
                      <h4 className="font-semibold text-foreground">
                        Комиссии
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <div>
                          <div className="text-muted-foreground">
                            Маркетплейс:
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ({results.commissions.marketplaceCommissionPercent}
                            %)
                          </div>
                        </div>
                        <span className="font-medium text-red-500">
                          {formatCurrency(
                            results.commissions.marketplaceCommission,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <div className="text-muted-foreground">
                            Поставщик:
                          </div>
                          <div className="text-xs text-muted-foreground">
                            ({results.commissions.supplierCommissionPercent}%)
                          </div>
                        </div>
                        <span className="font-medium text-purple-500">
                          {formatCurrency(
                            results.commissions.supplierCommission,
                          )}
                        </span>
                      </div>
                      <Separator className="my-2 opacity-50" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Итого:</span>
                        <span className="text-purple-500">
                          {formatCurrency(
                            results.commissions.marketplaceCommission +
                              results.commissions.supplierCommission,
                          )}
                        </span>
                      </div>
                    </div>
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

export default CalculatorResults;
