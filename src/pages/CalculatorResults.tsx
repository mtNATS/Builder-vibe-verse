import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  CreditCard,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate, useLocation } from "react-router-dom";
import { CalculationResults } from "@/types/calculator";
import ProductCard from "@/components/ProductCard";
import SellerCard from "@/components/SellerCard";

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
      articleId: "123456789",
      category: "Спортивное питание",
      brand: "Layers",
      seller: {
        id: "seller_123",
        name: "ООО Спортивное питание",
        type: "company",
        rating: 4.9,
        reviewCount: 12847,
        registrationDate: "2019-03-15T00:00:00Z",
        totalProducts: 486,
        verificationStatus: "verified",
        location: {
          country: "Россия",
          city: "Москва",
          region: "Московская область",
        },
      },
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

      {/* Header - Unified spacing */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button
            variant="ghost"
            size="icon"
            onClick={goBack}
            className="glass-button text-foreground hover:bg-white/10 rounded-full h-12 w-12"
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

      {/* Main Content - Unified layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-start pt-8 p-4 max-w-md mx-auto">
        <motion.div
          className="w-full space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Card */}
          <motion.div variants={itemVariants}>
            <ProductCard
              product={results.productInfo}
              isDark={isDark}
              compact={true}
              onViewDetails={() =>
                navigate("/product-details", {
                  state: { product: results.productInfo },
                })
              }
              onAddToFavorites={() => console.log("Add to favorites")}
              onShare={() => console.log("Share product")}
              onAnalytics={() => console.log("View analytics")}
            />
          </motion.div>

          {/* Seller Card */}
          {results.productInfo.seller && (
            <motion.div variants={itemVariants}>
              <SellerCard
                seller={results.productInfo.seller}
                isDark={isDark}
                compact={true}
                onViewDetails={() =>
                  navigate("/seller-details", {
                    state: { seller: results.productInfo.seller },
                  })
                }
                onContact={() => console.log("Contact seller")}
              />
            </motion.div>
          )}

          {/* Detailed Breakdown - Unified spacing */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Logistics Details */}
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <TrendingUp className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Логистика
                  </h4>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Доставка:</span>
                    <span className="font-semibold text-blue-500">
                      {formatCurrency(results.logistics.deliveryCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Хранение:</span>
                    <span className="font-semibold text-green-500">
                      {formatCurrency(results.logistics.storageCost)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Возврат:</span>
                    <span className="font-semibold text-orange-500">
                      {formatCurrency(results.logistics.returnCost)}
                    </span>
                  </div>
                  <Separator className="my-3 opacity-50" />
                  <div className="flex justify-between items-center font-semibold text-base">
                    <span className="text-foreground">Итого:</span>
                    <span className="text-green-500">
                      {formatCurrency(results.logistics.totalExpenses)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Commissions Details */}
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <CreditCard className="w-5 h-5 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Комиссии
                  </h4>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-muted-foreground font-medium">
                        Маркетплейс
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ({results.commissions.marketplaceCommissionPercent}%)
                      </div>
                    </div>
                    <span className="font-semibold text-red-500">
                      {formatCurrency(
                        results.commissions.marketplaceCommission,
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-muted-foreground font-medium">
                        Поставщик
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ({results.commissions.supplierCommissionPercent}%)
                      </div>
                    </div>
                    <span className="font-semibold text-purple-500">
                      {formatCurrency(results.commissions.supplierCommission)}
                    </span>
                  </div>
                  <Separator className="my-3 opacity-50" />
                  <div className="flex justify-between items-center font-semibold text-base">
                    <span className="text-foreground">Итого:</span>
                    <span className="text-purple-500">
                      {formatCurrency(
                        results.commissions.marketplaceCommission +
                          results.commissions.supplierCommission,
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Total Summary */}
            <Card
              className={`${isDark ? "glass-intense" : "neu-inset"} border-0 shadow-xl`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-foreground">
                      Общие затраты
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Логистика + комиссии
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {formatCurrency(totalCosts)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorResults;
