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
        duration: 0.6,
        staggerChildren: 0.1,
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

  const totalCosts =
    results.logistics.totalExpenses +
    results.commissions.marketplaceCommission +
    results.commissions.supplierCommission;

  return (
    <div className="min-h-screen morph-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-accent opacity-20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-secondary opacity-15 blur-3xl"
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Success particles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -25, 0],
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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-4 pb-2"
      >
        <div className="flex items-center justify-between mb-4 max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="glass-button text-white hover:bg-white/20 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold text-white">
            Результаты расчета
          </h1>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-green-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-6 max-w-md mx-auto">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <motion.div
                    className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Package className="w-6 h-6 text-white relative z-10" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm leading-tight mb-2">
                      {results.productInfo.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 glass rounded-full px-2 py-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-xs font-medium">
                          {results.productInfo.rating}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="glass border-white/20 text-white/80 text-xs"
                      >
                        {results.productInfo.reviewCount?.toLocaleString(
                          "ru-RU",
                        )}{" "}
                        отзывов
                      </Badge>
                    </div>
                    <div className="text-blue-400 text-lg font-bold">
                      {formatCurrency(results.productInfo.price)}
                    </div>
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
            <Button className="glass-button text-white border-white/20 backdrop-blur-sm h-10 text-sm">
              <Package className="w-4 h-4 mr-2" />
              Новый расчёт
            </Button>
            <Button className="glass-button text-blue-400 border-blue-500/50 hover:bg-blue-500/10 h-10 text-sm">
              <Info className="w-4 h-4 mr-2" />
              Подробности
            </Button>
          </motion.div>

          {/* Logistics Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-accent rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <TrendingUp className="w-4 h-4 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-white text-base">
                    Логистика
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {logisticsItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-2 glass rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gradient-primary rounded relative">
                          <div className="absolute inset-0 rounded border border-white/30" />
                          <IconComponent className="w-3 h-3 text-white relative z-10" />
                        </div>
                        <span className="text-white/90 text-sm">
                          {item.label}:
                        </span>
                      </div>
                      <span className={`font-bold text-sm ${item.color}`}>
                        {formatCurrency(item.value)}
                      </span>
                    </motion.div>
                  );
                })}

                <Separator className="bg-white/20 my-3" />

                <motion.div
                  className="flex items-center justify-between p-3 glass-intense rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-gradient-secondary rounded relative">
                      <div className="absolute inset-0 rounded border border-white/30" />
                      <Zap className="w-3 h-3 text-white relative z-10" />
                    </div>
                    <span className="text-white font-semibold text-sm">
                      Итого расходы:
                    </span>
                  </div>
                  <span className="text-red-400 font-bold text-base">
                    {formatCurrency(results.logistics.totalExpenses)}
                  </span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commissions Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-secondary rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <CreditCard className="w-4 h-4 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-white text-base">
                    Комиссии
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {commissionItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-center justify-between p-2 glass rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-gradient-primary rounded relative">
                          <div className="absolute inset-0 rounded border border-white/30" />
                          <IconComponent className="w-3 h-3 text-white relative z-10" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-white/90 text-sm">
                            {item.label}:
                          </span>
                          <span className="text-white/60 text-xs">
                            ({item.percent}%)
                          </span>
                        </div>
                      </div>
                      <span className={`font-bold text-sm ${item.color}`}>
                        {formatCurrency(item.value)}
                      </span>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-intense border-0 relative overflow-hidden">
              <CardContent className="p-4 relative z-10">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                    <h3 className="text-white text-lg font-bold">
                      Общие затраты
                    </h3>
                  </div>

                  <div className="text-3xl font-bold text-red-400 mb-4">
                    {formatCurrency(totalCosts)}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass rounded-lg p-3">
                      <div className="text-white/70 text-xs mb-1">
                        Логистика
                      </div>
                      <div className="text-green-400 font-bold text-sm">
                        {formatCurrency(results.logistics.totalExpenses)}
                      </div>
                    </div>
                    <div className="glass rounded-lg p-3">
                      <div className="text-white/70 text-xs mb-1">Комиссии</div>
                      <div className="text-purple-400 font-bold text-sm">
                        {formatCurrency(
                          results.commissions.marketplaceCommission +
                            results.commissions.supplierCommission,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* New Calculation Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={() => navigate("/calculator/form")}
              className="w-full bg-gradient-primary hover:bg-gradient-secondary border-0 text-white h-12 font-bold text-base relative overflow-hidden group"
            >
              <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Новый расчёт
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorResults;
