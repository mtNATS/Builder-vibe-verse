import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Star,
  Eye,
  Moon,
  Sun,
  Sparkles,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductInfo } from "@/types/calculator";

const ProductDetails = () => {
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

  const goBack = () => {
    navigate(-1);
  };

  // Mock product data
  const defaultProduct: ProductInfo = {
    title: "Протеиновые батончики без сахара Layers Ассорти, 4шт х 60г",
    price: 435,
    rating: 4.8,
    reviewCount: 5247,
    articleId: "123456789",
    category: "Спортивное питание",
    brand: "Layers",
    description:
      "Протеиновые батончики Layers - это идеальный выбор для тех, кто следит за своим здоровьем и фигурой. Без добавления сахара, с высоким содержанием белка и отличным вкусом.",
    specifications: {
      "Вес упаковки": "240 г (4 x 60 г)",
      "Содержание белка": "20 г на батончик",
      Калорийность: "180 ккал на батончик",
      "Без сахара": "Да",
      "Срок годности": "12 месяцев",
      "Страна производства": "Россия",
      "Вкусы в ассорти": "Шоколад, ваниль, кокос, орех",
    },
    availability: {
      inStock: true,
      remainingCount: 156,
      warehouses: ["Москва", "СПб", "Казань", "Екатеринбург"],
    },
  };

  const product = location.state?.product || defaultProduct;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
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

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isDark ? "bg-gradient-mobile-dark" : "bg-gradient-mobile-light"}`}
    >
      {/* Background elements */}
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
          <h1 className="text-lg font-semibold text-foreground">О товаре</h1>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-primary opacity-60" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-start pt-8 p-4 max-w-md mx-auto">
        <motion.div
          className="w-full sm:flex sm:flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6 sm:m-auto sm:-mb-[5px]">
                {/* New horizontal layout */}
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    {/* Product Icon - moved to left */}
                    <div
                      className={`w-16 h-16 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden mb-4 sm:p-[30px]`}
                    >
                      <Package className="w-8 h-8 text-white relative z-10" />
                    </div>

                    {/* Content area */}
                    <div className="flex items-center justify-center gap-3 mt-1.5 sm:justify-end sm:items-center sm:ml-auto">
                      {/* Rating */}
                      <div
                        className={`flex items-center gap-1 ${isDark ? "glass" : "neu"} rounded-full px-3 py-2 sm:flex sm:flex-row sm:justify-end sm:items-center sm:m-auto sm:ml-auto`}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mt-1.5">
                        {formatCurrency(product.price)}
                      </div>

                      {/* Reviews */}
                      <Badge
                        variant="secondary"
                        className={`${isDark ? "glass" : "neu"} border-0 text-sm px-3 py-1 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:items-end sm:mt-auto`}
                      >
                        {product.reviewCount?.toLocaleString("ru-RU")} отзывов
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Product Title - moved above and left-aligned */}
                <h5 className="text-xl font-bold leading-[25px] mt-1.5 sm:mr-auto sm:text-left sm:text-sm">
                  {product.title}
                </h5>
              </CardContent>

              {/* Analytics Button - moved outside */}
              <Button
                variant="outline"
                className={`h-10 text-xs mx-6 mb-6 sm:mt-[22px] ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Аналитика
              </Button>
            </Card>
          </motion.div>

          {/* Product Info Card */}
          <motion.div variants={itemVariants} className="mt-6">
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Package className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Информация о товаре
                    </h4>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between mt-3">
                      <span className="text-muted-foreground">Артикул:</span>
                      <span className="font-medium text-foreground">
                        {product.articleId}
                      </span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-muted-foreground">Бренд:</span>
                      <span className="font-medium text-foreground">
                        {product.brand}
                      </span>
                    </div>
                    <div className="flex justify-between mt-3">
                      <span className="text-muted-foreground">Категория:</span>
                      <span className="font-medium text-foreground">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Specifications */}
          {product.specifications && (
            <motion.div variants={itemVariants} className="mt-6">
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Eye className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Характеристики
                    </h4>
                  </div>

                  <div className="space-y-3 text-sm">
                    {Object.entries(product.specifications).map(
                      ([key, value], index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium text-foreground text-right max-w-[60%]">
                            {value}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Description */}
          {product.description && (
            <motion.div variants={itemVariants} className="mt-6">
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Eye className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Описание
                    </h4>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
