import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  CreditCard,
  Info,
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
  const { results } = location.state as { results: CalculationResults };

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
    },
    {
      label: "Стоимость хранения",
      value: results.logistics.storageCost,
      color: "text-green-400",
    },
    {
      label: "Стоимость возврата",
      value: results.logistics.returnCost,
      color: "text-orange-400",
    },
  ];

  const commissionItems = [
    {
      label: "Комиссия маркетплейса",
      value: results.commissions.marketplaceCommission,
      percent: results.commissions.marketplaceCommissionPercent,
      color: "text-red-400",
    },
    {
      label: "Комиссия поставщика",
      value: results.commissions.supplierCommission,
      percent: results.commissions.supplierCommissionPercent,
      color: "text-purple-400",
    },
  ];

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
            <h1 className="text-xl font-semibold text-white">Результаты</h1>
            <div className="w-10"></div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 px-6 pb-6 space-y-6">
          {/* Product Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 rounded-xl flex items-center justify-center shrink-0">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm leading-tight mb-2">
                      {results.productInfo.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-yellow-400 text-sm font-medium">
                          {results.productInfo.rating}
                        </span>
                      </div>
                      <span className="text-white/60 text-sm">
                        (
                        {results.productInfo.reviewCount?.toLocaleString(
                          "ru-RU",
                        )}
                        )
                      </span>
                    </div>
                    <div className="text-blue-400 text-xl font-bold">
                      {formatCurrency(results.productInfo.price)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm">
              <Package className="w-4 h-4 mr-2" />
              Рассчитать логистику
            </Button>
            <Button
              variant="outline"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            >
              <Info className="w-4 h-4 mr-2" />
              Подробности товара
            </Button>
          </motion.div>

          {/* Logistics Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <CardTitle className="text-white">Логистика</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {logisticsItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-white/80">{item.label}:</span>
                    <span className={`font-semibold ${item.color}`}>
                      {formatCurrency(item.value)}
                    </span>
                  </motion.div>
                ))}
                <Separator className="bg-white/20 my-4" />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-between font-semibold text-lg"
                >
                  <span className="text-white">Итого расходы:</span>
                  <span className="text-red-400">
                    {formatCurrency(results.logistics.totalExpenses)}
                  </span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commissions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">Комиссии</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {commissionItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-white/80">{item.label}:</span>
                      <span className="text-white/60 text-sm">
                        ({item.percent}%)
                      </span>
                    </div>
                    <span className={`font-semibold ${item.color}`}>
                      {formatCurrency(item.value)}
                    </span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-blue-500/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    Общие затраты
                  </h3>
                  <div className="text-3xl font-bold text-red-400 mb-4">
                    {formatCurrency(
                      results.logistics.totalExpenses +
                        results.commissions.marketplaceCommission +
                        results.commissions.supplierCommission,
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">Логистика</div>
                      <div className="text-green-400 font-medium">
                        {formatCurrency(results.logistics.totalExpenses)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60">Комиссии</div>
                      <div className="text-purple-400 font-medium">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => navigate("/calculator/form")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium"
            >
              Новый расчёт
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorResults;
