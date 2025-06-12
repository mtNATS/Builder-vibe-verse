import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  Search,
  Calculator,
  Loader2,
  Zap,
  Sparkles,
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
  const [formData, setFormData] = useState<CalculatorFormData>({
    box: "",
    marketplace: "",
    weight: 0.28,
    dimensions: { length: 0, width: 0, height: 0 },
    quantity: 1,
    price: 435,
  });

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
            title:
              "Протеиновые батончики без сахара Layers Ассорти, 4��т х 60г",
            price: formData.price,
            rating: 4.8,
            reviewCount: 5247,
          },
        },
      },
    });
  };

  const goBack = () => {
    navigate("/calculator");
  };

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

  return (
    <div className="min-h-screen morph-bg relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-primary opacity-20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-accent opacity-15 blur-3xl"
          animate={{ x: [0, 25, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
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
          <h1 className="text-lg font-semibold text-white">WB Калькулятор</h1>
          <div className="w-10"></div>
        </div>
        <p className="text-white/70 text-center text-sm max-w-md mx-auto">
          Поиск и расчет затрат
        </p>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4 pb-6 max-w-md mx-auto">
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Search Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <Search className="w-4 h-4 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-white text-base">
                    Поиск товара
                  </CardTitle>
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-3 h-3 text-white/60" />
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
                    Артикул или ссылка
                  </Label>
                  <Input
                    placeholder="Введите артикул товара"
                    className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10"
                  />
                </div>
                <Button className="w-full bg-gradient-primary hover:bg-gradient-secondary border-0 text-white font-medium h-10">
                  <Search className="w-4 h-4 mr-2" />
                  Найти товар
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Section */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-accent rounded-lg relative">
                    <div className="absolute inset-0 rounded-lg border-2 border-white/30" />
                    <Package className="w-4 h-4 text-white relative z-10" />
                  </div>
                  <CardTitle className="text-white text-base">
                    Параметры товара
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {/* Marketplace */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
                    Маркетплейс
                  </Label>
                  <Select
                    value={formData.marketplace}
                    onValueChange={(value) =>
                      handleInputChange("marketplace", value)
                    }
                  >
                    <SelectTrigger className="glass-input text-white h-10 border-white/20 focus:border-primary/50">
                      <SelectValue placeholder="Выберите маркетплейс" />
                    </SelectTrigger>
                    <SelectContent className="glass-intense border-white/20">
                      {marketplaces.map((marketplace) => (
                        <SelectItem
                          key={marketplace.value}
                          value={marketplace.value}
                          className="text-white hover:bg-white/10"
                        >
                          {marketplace.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Box Type */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
                    Коробка
                  </Label>
                  <Select
                    value={formData.box}
                    onValueChange={(value) => handleInputChange("box", value)}
                  >
                    <SelectTrigger className="glass-input text-white h-10 border-white/20 focus:border-primary/50">
                      <SelectValue placeholder="Выберите тип коробки" />
                    </SelectTrigger>
                    <SelectContent className="glass-intense border-white/20">
                      {boxTypes.map((box) => (
                        <SelectItem
                          key={box.value}
                          value={box.value}
                          className="text-white hover:bg-white/10"
                        >
                          {box.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
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
                    className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10"
                    placeholder="0.28"
                  />
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
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
                      className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10 text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Ширина"
                      value={formData.dimensions.width || ""}
                      onChange={(e) =>
                        handleDimensionChange("width", e.target.value)
                      }
                      className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10 text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Высота"
                      value={formData.dimensions.height || ""}
                      onChange={(e) =>
                        handleDimensionChange("height", e.target.value)
                      }
                      className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
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
                    className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label className="text-white/90 font-medium text-sm">
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
                    className="glass-input text-white placeholder:text-white/60 border-white/20 focus:border-primary/50 h-10"
                  />
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  disabled={isLoading || !formData.marketplace || !formData.box}
                  className="w-full bg-gradient-secondary hover:bg-gradient-primary border-0 text-white font-bold h-12 text-base relative overflow-hidden group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Анализ данных...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                      Рассчитать логистику
                      <Calculator className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CalculatorForm;
