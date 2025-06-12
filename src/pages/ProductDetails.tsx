import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Star,
  Eye,
  Heart,
  Share2,
  Moon,
  Sun,
  Sparkles,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    images: [
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
      "/api/placeholder/400/400",
    ],
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
    seller: {
      id: "seller_123",
      name: "ООО Спортивное питание",
      type: "company",
      rating: 4.9,
      reviewCount: 12847,
      registrationDate: "2019-03-15",
      totalProducts: 486,
      verificationStatus: "verified",
      location: {
        country: "Россия",
        city: "Москва",
        region: "Московская область",
      },
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
          className="w-full space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product Header */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardHeader className="text-center relative p-6">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-secondary opacity-90 rounded-2xl" />
                  <Package className="w-8 h-8 text-white relative z-10" />
                </motion.div>

                <CardTitle className="text-xl font-bold text-foreground mb-3 leading-tight">
                  {product.title}
                </CardTitle>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <div
                    className={`flex items-center gap-1 ${isDark ? "glass" : "neu"} rounded-full px-3 py-2`}
                  >
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400 text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${isDark ? "glass" : "neu"} border-0 text-sm px-3 py-1`}
                  >
                    {product.reviewCount?.toLocaleString("ru-RU")} отзывов
                  </Badge>
                </div>

                <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                  {formatCurrency(product.price)}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-10 text-xs ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                  >
                    <Heart className="w-3 h-3 mr-1" />В избранное
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-10 text-xs ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                  >
                    <Share2 className="w-3 h-3 mr-1" />
                    Поделиться
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-10 text-xs ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                  >
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Аналитика
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6 space-y-6">
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Артикул:</span>
                      <span className="font-medium text-foreground">
                        {product.articleId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Бренд:</span>
                      <span className="font-medium text-foreground">
                        {product.brand}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Категория:</span>
                      <span className="font-medium text-foreground">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="opacity-50" />

                {/* Availability */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Truck className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Наличие
                    </h4>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Статус:</span>
                      <Badge
                        variant={
                          product.availability?.inStock
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {product.availability?.inStock
                          ? "В наличии"
                          : "Нет в наличии"}
                      </Badge>
                    </div>
                    {product.availability?.remainingCount && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Остаток:</span>
                        <span className="font-medium text-foreground">
                          {product.availability.remainingCount} шт.
                        </span>
                      </div>
                    )}
                    {product.availability?.warehouses && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Склады:</span>
                        <span className="font-medium text-foreground text-right">
                          {product.availability.warehouses
                            .slice(0, 2)
                            .join(", ")}
                          {product.availability.warehouses.length > 2 &&
                            ` +${product.availability.warehouses.length - 2}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Specifications */}
          {product.specifications && (
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Award className="w-4 h-4 text-white relative z-10" />
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
            <motion.div variants={itemVariants}>
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

          {/* Seller Info */}
          {product.seller && (
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Users className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Продавец
                    </h4>
                    {product.seller.verificationStatus === "verified" && (
                      <Badge variant="default" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Проверен
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Название:</span>
                      <span className="font-medium text-foreground">
                        {product.seller.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="font-medium text-foreground">
                          {product.seller.rating}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({product.seller.reviewCount})
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товаров:</span>
                      <span className="font-medium text-foreground">
                        {product.seller.totalProducts}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Локация:</span>
                      <span className="font-medium text-foreground">
                        {product.seller.location.city}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className={`w-full h-12 text-sm mt-4 ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                    onClick={() =>
                      navigate("/seller-details", {
                        state: { seller: product.seller },
                      })
                    }
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Подробнее о продавце
                  </Button>
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
