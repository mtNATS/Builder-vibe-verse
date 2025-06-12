import React, { useEffect } from "react";
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
    // If user navigated directly to results without going through the form,
    // we still show fallback data but could optionally redirect
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

  const logisticsItems = [
    {
      label: "Стоимость доставки",
      value: results.logistics.deliveryCost,
      color: "text-blue-400",
      icon: Package,
    },
    {
      label: "Стоимость хранения",
      value: results.logistics.storageCost,
      color: "text-green-400",
      icon: TrendingUp,
    },
    {
      label: "Стоимость возврата",
      value: results.logistics.returnCost,
      color: "text-orange-400",
      icon: TrendingDown,
    },
  ];

  const commissionItems = [
    {
      label: "Комиссия маркетплейса",
      value: results.commissions.marketplaceCommission,
      percent: results.commissions.marketplaceCommissionPercent,
      color: "text-red-400",
      icon: CreditCard,
    },
    {
      label: "Комиссия поставщика",
      value: results.commissions.supplierCommission,
      percent: results.commissions.supplierCommissionPercent,
      color: "text-purple-400",
      icon: Target,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const totalCosts =
    results.logistics.totalExpenses +
    results.commissions.marketplaceCommission +
    results.commissions.supplierCommission;

  return (
    <div className="min-h-screen morph-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-accent opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-secondary opacity-15 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Success particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 p-6 pb-4"
        >
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={goBack}
              className="glass-button text-white hover:bg-white/20 rounded-full hover-lift"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <motion.h1
              className="text-xl font-semibold text-white text-glow-soft"
              animate={{
                textShadow: [
                  "0 0 10px rgba(255,255,255,0.5)",
                  "0 0 20px rgba(34,197,94,0.5)",
                  "0 0 10px rgba(255,255,255,0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Результаты расчета
            </motion.h1>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-green-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="relative z-10 px-6 pb-6 space-y-6 custom-scrollbar"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-lift">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center shrink-0 relative overflow-hidden"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Package className="w-8 h-8 text-white relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm leading-tight mb-3">
                      {results.productInfo.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div
                        className="flex items-center gap-1 glass rounded-full px-2 py-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {results.productInfo.rating}
                        </span>
                      </motion.div>
                      <Badge
                        variant="secondary"
                        className="glass border-white/20 text-white/80"
                      >
                        {results.productInfo.reviewCount?.toLocaleString(
                          "ru-RU",
                        )}{" "}
                        отзывов
                      </Badge>
                    </div>
                    <motion.div
                      className="text-blue-400 text-2xl font-bold text-glow"
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(59,130,246,0.5)",
                          "0 0 20px rgba(59,130,246,0.8)",
                          "0 0 10px rgba(59,130,246,0.5)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {formatCurrency(results.productInfo.price)}
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-3"
          >
            <Button className="glass-button text-white border-white/20 backdrop-blur-sm hover-lift">
              <Package className="w-4 h-4 mr-2" />
              Новый расчёт
            </Button>
            <Button className="glass-button text-blue-400 border-blue-500/50 hover:bg-blue-500/10">
              <Info className="w-4 h-4 mr-2" />
              Подробности
            </Button>
          </motion.div>

          {/* Logistics Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 bg-gradient-accent rounded-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="w-5 h-5 text-white" />
                  </motion.div>
                  <CardTitle className="text-white text-lg">
                    Логистика
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <Target className="w-4 h-4 text-white/60" />
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {logisticsItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-3 glass rounded-xl hover-lift"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-2 bg-gradient-primary rounded-lg`}
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-white/90">{item.label}:</span>
                      </div>
                      <motion.span
                        className={`font-bold text-lg ${item.color} text-glow`}
                        animate={{
                          textShadow: [
                            `0 0 10px ${item.color.includes("blue") ? "rgba(59,130,246,0.5)" : item.color.includes("green") ? "rgba(34,197,94,0.5)" : "rgba(251,146,60,0.5)"}`,
                            `0 0 20px ${item.color.includes("blue") ? "rgba(59,130,246,0.8)" : item.color.includes("green") ? "rgba(34,197,94,0.8)" : "rgba(251,146,60,0.8)"}`,
                            `0 0 10px ${item.color.includes("blue") ? "rgba(59,130,246,0.5)" : item.color.includes("green") ? "rgba(34,197,94,0.5)" : "rgba(251,146,60,0.5)"}`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {formatCurrency(item.value)}
                      </motion.span>
                    </motion.div>
                  );
                })}

                <Separator className="bg-white/20 my-4" />

                <motion.div
                  className="flex items-center justify-between p-4 glass-intense rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-gradient-secondary rounded-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </motion.div>
                    <span className="text-white font-semibold text-lg">
                      Итого расходы:
                    </span>
                  </div>
                  <motion.span
                    className="text-red-400 font-bold text-xl text-glow"
                    animate={{
                      textShadow: [
                        "0 0 10px rgba(248,113,113,0.5)",
                        "0 0 20px rgba(248,113,113,0.8)",
                        "0 0 10px rgba(248,113,113,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {formatCurrency(results.logistics.totalExpenses)}
                  </motion.span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commissions Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 hover-lift">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="p-3 bg-gradient-secondary rounded-xl"
                    whileHover={{ rotate: -360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <CreditCard className="w-5 h-5 text-white" />
                  </motion.div>
                  <CardTitle className="text-white text-lg">Комиссии</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {commissionItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-3 glass rounded-xl hover-lift"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="p-2 bg-gradient-primary rounded-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="w-4 h-4 text-white" />
                        </motion.div>
                        <div className="flex flex-col">
                          <span className="text-white/90">{item.label}:</span>
                          <span className="text-white/60 text-sm">
                            ({item.percent}%)
                          </span>
                        </div>
                      </div>
                      <motion.span
                        className={`font-bold text-lg ${item.color} text-glow`}
                        animate={{
                          textShadow: [
                            `0 0 10px ${item.color.includes("red") ? "rgba(248,113,113,0.5)" : "rgba(168,85,247,0.5)"}`,
                            `0 0 20px ${item.color.includes("red") ? "rgba(248,113,113,0.8)" : "rgba(168,85,247,0.8)"}`,
                            `0 0 10px ${item.color.includes("red") ? "rgba(248,113,113,0.5)" : "rgba(168,85,247,0.5)"}`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {formatCurrency(item.value)}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-intense border-0 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-primary opacity-10"
                animate={{
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <CardContent className="p-6 relative z-10">
                <div className="text-center">
                  <motion.div
                    className="flex items-center justify-center gap-2 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, type: "spring", bounce: 0.5 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                    <h3 className="text-white text-xl font-bold">
                      Общие затраты
                    </h3>
                  </motion.div>

                  <motion.div
                    className="text-4xl font-bold text-red-400 mb-6 text-glow"
                    animate={{
                      scale: [1, 1.05, 1],
                      textShadow: [
                        "0 0 20px rgba(248,113,113,0.5)",
                        "0 0 30px rgba(248,113,113,0.8)",
                        "0 0 20px rgba(248,113,113,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {formatCurrency(totalCosts)}
                  </motion.div>

                  <div className="grid grid-cols-2 gap-6">
                    <motion.div
                      className="glass rounded-xl p-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white/70 text-sm mb-1">
                        Логистика
                      </div>
                      <div className="text-green-400 font-bold text-lg text-glow">
                        {formatCurrency(results.logistics.totalExpenses)}
                      </div>
                    </motion.div>
                    <motion.div
                      className="glass rounded-xl p-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="text-white/70 text-sm mb-1">Комиссии</div>
                      <div className="text-purple-400 font-bold text-lg text-glow">
                        {formatCurrency(
                          results.commissions.marketplaceCommission +
                            results.commissions.supplierCommission,
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Calculation Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => navigate("/calculator/form")}
              className="w-full bg-gradient-primary hover:bg-gradient-secondary border-0 text-white h-14 font-bold text-lg relative overflow-hidden group pulse-glow"
            >
              <Zap className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Новый расчёт
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorResults;
