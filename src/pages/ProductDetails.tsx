import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Star,
  Heart,
  Share2,
  Eye,
  Moon,
  Sun,
  Sparkles,
  BarChart3,
  ShoppingCart,
  Award,
  Truck,
  Shield,
  MapPin,
  Calendar,
  Info,
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

  // Enhanced mock product data
  const defaultProduct: ProductInfo = {
    title: "Протеиновые батончики без сахара Layers Ассорти, 4шт х 60г",
    price: 435,
    rating: 4.8,
    reviewCount: 5247,
    articleId: "123456789",
    category: "Спортивное питание",
    brand: "Layers",
    description:
      "Протеиновые батончики Layers - это идеальный выбор для тех, кто следит за своим здоровьем и фигурой. Без добавления сахара, с высоким содер��анием белка и отличным вкусом. Каждый батончик содержит 20г высококачественного белка и всего 180 калорий.",
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
      registrationDate: "2019-03-15T00:00:00Z",
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${isDark ? "bg-gradient-mobile-dark" : "bg-gradient-mobile-light"}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gradient-primary opacity-20 blur-3xl"
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
          className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-accent opacity-15 blur-3xl"
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
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-secondary opacity-10 blur-3xl"
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
        transition={{ duration: 0.6 }}
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
          {/* Product Header Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                {/* Product Image Section */}
                <motion.div
                  variants={imageVariants}
                  className="relative h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center"
                >
                  <motion.div
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Package className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Floating action buttons */}
                  <motion.div
                    className="absolute top-4 right-4 flex gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 glass-button rounded-full"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 glass-button rounded-full"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Product Info Section */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-foreground leading-tight mb-3">
                        {product.title}
                      </h2>

                      {/* Brand and Category */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {product.brand}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Rating, Reviews and Price */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center gap-1 ${isDark ? "glass" : "neu"} rounded-full px-3 py-2`}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.reviewCount?.toLocaleString("ru-RU")} отзывов
                      </span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {formatCurrency(product.price)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className="h-12 bg-gradient-primary text-white font-semibold"
                      onClick={() => console.log("Add to cart")}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />В корзину
                    </Button>
                    <Button
                      variant="outline"
                      className={`h-12 ${isDark ? "glass border-primary/50 text-primary hover:bg-primary/10" : "neu border-primary/30"}`}
                      onClick={() => console.log("View analytics")}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Аналитика
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Details */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-lg border border-white/30" />
                    <Info className="w-4 h-4 text-white relative z-10" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Информация о товаре
                  </h4>
                </div>

                <div className="space-y-4 text-sm">
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Availability */}
          {product.availability && (
            <motion.div variants={itemVariants}>
              <Card className="glass-card border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-lg border border-white/30" />
                      <Truck className="w-4 h-4 text-white relative z-10" />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground">
                      Наличие и доставка
                    </h4>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Статус:</span>
                      <Badge
                        variant={
                          product.availability.inStock
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {product.availability.inStock
                          ? "В наличии"
                          : "Нет в наличии"}
                      </Badge>
                    </div>
                    {product.availability.remainingCount && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Остаток:</span>
                        <span className="font-medium text-foreground">
                          {product.availability.remainingCount} шт.
                        </span>
                      </div>
                    )}
                    {product.availability.warehouses && (
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
                </CardContent>
              </Card>
            </motion.div>
          )}

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
                      <Shield className="w-4 h-4 text-white relative z-10" />
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

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Название:
                      </span>
                      <span className="font-medium text-foreground text-sm">
                        {product.seller.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Рейтинг:
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="font-medium text-foreground text-sm">
                          {product.seller.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Товаров:
                      </span>
                      <span className="font-medium text-foreground text-sm">
                        {product.seller.totalProducts}
                      </span>
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
                      <Eye className="w-4 h-4 mr-2" />
                      Подробнее о продавце
                    </Button>
                  </div>
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
