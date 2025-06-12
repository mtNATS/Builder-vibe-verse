import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Search,
  Calculator,
  Loader2,
  Zap,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import {
  CalculatorFormData,
  MarketplaceOption,
  BoxOption,
} from "@/types/calculator";

const CalculatorForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState<CalculatorFormData>({
    box: "",
    marketplace: "",
    weight: 0.28,
    dimensions: { length: 0, width: 0, height: 0 },
    quantity: 1,
    price: 435,
  });

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

  const marketplaces: MarketplaceOption[] = [
    { value: "wildberries", label: "Wildberries" },
    { value: "ozon", label: "Ozon" },
    { value: "yandex", label: "Яндекс.Маркет" },
    { value: "avito", label: "Avito" },
  ];

  const boxTypes: BoxOption[] = [
    { value: "small", label: "Малая коробка (до 1 кг)" },
    { value: "medium", label: "Средняя коробка (до 5 кг)" },
    { value: "large", label: "Большая коробка (до 25 кг)" },
    { value: "envelope", label: "Конверт (до 500 г)" },
  ];

  const handleInputChange = (field: keyof CalculatorFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDimensionChange = (
    dimension: "length" | "width" | "height",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: parseFloat(value) || 0,
      },
    }));
  };

  const handleCalculate = async () => {
    setIsLoading(true);

    navigate("/calculator/loading", {
      state: {
        formData,
        targetResults: {
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
            price: formData.price,
            rating: 4.8,
            reviewCount: 5247,
          },
        },
      },
    });
  };

  const goBack = () => {
    navigate("/");
  };

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
            WB Калькулятор
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
      <div className="relative z-10 min-h-screen flex flex-col justify-center sm:justify-start sm:items-center p-4 max-w-md mx-auto">
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0 shadow-xl sm:flex sm:flex-col">
              <CardHeader className="text-center relative pb-4 sm:pt-6 sm:justify-center sm:items-center sm:ml-auto">
                {/* Product Icon */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${isDark ? "glass" : "neu"} flex items-center justify-center relative overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-90 rounded-2xl" />
                  <Calculator className="w-8 h-8 text-white relative z-10" />
                </motion.div>

                <CardTitle className="text-lg font-bold text-foreground mb-2 leading-tight">
                  Калькулятор WB
                </CardTitle>

                <div className="text-sm text-muted-foreground mb-4">
                  Расчет логистики и комиссий
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-6 sm:mb-5">
                {/* Search Section */}
                <motion.div variants={itemVariants}>
                  <div className={`p-4 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-primary rounded-lg relative">
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        <Search className="w-4 h-4 text-white relative z-10" />
                      </div>
                      <h4 className="font-semibold text-foreground">
                        Поиск товара
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Артикул или ссылка
                        </Label>
                        <Input
                          placeholder="Введите артикул товара"
                          className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                        />
                      </div>
                      <Button className="w-full h-10 text-sm font-medium bg-gradient-primary text-white border-0">
                        <Search className="w-4 h-4 mr-2" />
                        Найти товар
                      </Button>
                    </div>
                  </div>
                </motion.div>

                {/* Form Section */}
                <motion.div variants={itemVariants}>
                  <div className={`p-4 ${isDark ? "glass" : "neu"} rounded-lg`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-accent rounded-lg relative">
                        <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                        <Package className="w-4 h-4 text-white relative z-10" />
                      </div>
                      <h4 className="font-semibold text-foreground">
                        Параметры товара
                      </h4>
                    </div>
                    <div className="space-y-4">
                      {/* Marketplace */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Маркетплейс
                        </Label>
                        <Select
                          value={formData.marketplace}
                          onValueChange={(value) =>
                            handleInputChange("marketplace", value)
                          }
                        >
                          <SelectTrigger
                            className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white" : "neu border-gray-200"}`}
                          >
                            <SelectValue placeholder="Выберите маркетплейс" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${isDark ? "glass-intense border-white/20" : "bg-white border-gray-200"}`}
                          >
                            {marketplaces.map((marketplace) => (
                              <SelectItem
                                key={marketplace.value}
                                value={marketplace.value}
                                className={`${isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
                              >
                                {marketplace.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Box Type */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Коробка
                        </Label>
                        <Select
                          value={formData.box}
                          onValueChange={(value) =>
                            handleInputChange("box", value)
                          }
                        >
                          <SelectTrigger
                            className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white" : "neu border-gray-200"}`}
                          >
                            <SelectValue placeholder="Выберите тип коробки" />
                          </SelectTrigger>
                          <SelectContent
                            className={`${isDark ? "glass-intense border-white/20" : "bg-white border-gray-200"}`}
                          >
                            {boxTypes.map((box) => (
                              <SelectItem
                                key={box.value}
                                value={box.value}
                                className={`${isDark ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
                              >
                                {box.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Weight */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Вес (кг)
                        </Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.weight}
                          onChange={(e) =>
                            handleInputChange(
                              "weight",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                          placeholder="0.28"
                        />
                      </div>

                      {/* Dimensions */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Габариты (см)
                        </Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            placeholder="Длина"
                            value={formData.dimensions.length || ""}
                            onChange={(e) =>
                              handleDimensionChange("length", e.target.value)
                            }
                            className={`h-10 text-xs ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                          />
                          <Input
                            type="number"
                            placeholder="Ширина"
                            value={formData.dimensions.width || ""}
                            onChange={(e) =>
                              handleDimensionChange("width", e.target.value)
                            }
                            className={`h-10 text-xs ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                          />
                          <Input
                            type="number"
                            placeholder="Высота"
                            value={formData.dimensions.height || ""}
                            onChange={(e) =>
                              handleDimensionChange("height", e.target.value)
                            }
                            className={`h-10 text-xs ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                          />
                        </div>
                      </div>

                      {/* Quantity */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Количество шт.
                        </Label>
                        <Input
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) =>
                            handleInputChange(
                              "quantity",
                              parseInt(e.target.value) || 1,
                            )
                          }
                          className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                        />
                      </div>

                      {/* Price */}
                      <div>
                        <Label className="text-muted-foreground text-sm mb-2 block">
                          Цена товара (₽)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          value={formData.price}
                          onChange={(e) =>
                            handleInputChange(
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className={`h-10 text-sm ${isDark ? "glass border-white/20 text-white placeholder:text-white/60" : "neu border-gray-200"}`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Calculate Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={handleCalculate}
                    disabled={
                      isLoading || !formData.marketplace || !formData.box
                    }
                    className={`w-full h-12 text-base font-semibold border-0 shadow-lg transition-all duration-200 group ${
                      isDark
                        ? "glass text-white hover:bg-white/10"
                        : "neu-button bg-gradient-primary text-white hover:shadow-xl"
                    }`}
                    size="lg"
                  >
                    <div className="flex items-center justify-center relative z-10">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Анализ данных...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                          Рассчитать логистику
                          <Calculator className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                    {/* Gradient overlay for light theme */}
                    {!isDark && (
                      <div className="absolute inset-0 bg-gradient-primary opacity-90 rounded-lg" />
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorForm;
