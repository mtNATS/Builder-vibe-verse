import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Search, Calculator, Loader2 } from "lucide-react";
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

    // Simulate API call
    setTimeout(() => {
      navigate("/calculator/results", {
        state: {
          formData,
          results: {
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
                "Протеиновые батончики без сахара Layers Ассорти, 4шт х 60г",
              price: formData.price,
              rating: 4.8,
              reviewCount: 5247,
            },
          },
        },
      });
    }, 2000);
  };

  const goBack = () => {
    navigate("/calculator");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark">
      <div className="relative min-h-screen max-w-md mx-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

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
              className="text-white hover:bg-white/10 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold text-white">WB Калькулятор</h1>
            <div className="w-10"></div>
          </div>
          <p className="text-white/70 text-center">Поиск и расчет затрат</p>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-6 space-y-6">
          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Search className="w-5 h-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">Поиск товара</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Артикул или ссылка</Label>
                  <Input
                    placeholder="Введите артикул товара"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Найти товар
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Package className="w-5 h-5 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Параметры товара</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Marketplace */}
                <div className="space-y-2">
                  <Label className="text-white/80">Маркетплейс</Label>
                  <Select
                    value={formData.marketplace}
                    onValueChange={(value) =>
                      handleInputChange("marketplace", value)
                    }
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Выберите маркетплейс" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {marketplaces.map((marketplace) => (
                        <SelectItem
                          key={marketplace.value}
                          value={marketplace.value}
                          className="text-white"
                        >
                          {marketplace.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Box Type */}
                <div className="space-y-2">
                  <Label className="text-white/80">Коробка</Label>
                  <Select
                    value={formData.box}
                    onValueChange={(value) => handleInputChange("box", value)}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Выберите тип коробки" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {boxTypes.map((box) => (
                        <SelectItem
                          key={box.value}
                          value={box.value}
                          className="text-white"
                        >
                          {box.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label className="text-white/80">Вес (кг)</Label>
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
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="0.28"
                  />
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <Label className="text-white/80">Габариты (см)</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      placeholder="Длина"
                      value={formData.dimensions.length || ""}
                      onChange={(e) =>
                        handleDimensionChange("length", e.target.value)
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Ширина"
                      value={formData.dimensions.width || ""}
                      onChange={(e) =>
                        handleDimensionChange("width", e.target.value)
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Высота"
                      value={formData.dimensions.height || ""}
                      onChange={(e) =>
                        handleDimensionChange("height", e.target.value)
                      }
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm"
                    />
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <Label className="text-white/80">Количество шт.</Label>
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
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label className="text-white/80">Цена товара (₽)</Label>
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
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  disabled={isLoading || !formData.marketplace || !formData.box}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium h-12"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Анализ данных...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Рассчитать логистику
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
