import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Star,
  Heart,
  Share2,
  BarChart3,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductInfo } from "@/types/calculator";

interface ProductCardProps {
  product: ProductInfo;
  isDark: boolean;
  onViewDetails?: () => void;
  onAddToFavorites?: () => void;
  onShare?: () => void;
  onAnalytics?: () => void;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isDark,
  onViewDetails,
  onAddToFavorites,
  onShare,
  onAnalytics,
  compact = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
      >
        <Card
          className={`${
            isDark
              ? "bg-gray-900/90 border-gray-800"
              : "bg-white/90 border-gray-200"
          } backdrop-blur-lg border rounded-2xl shadow-xl overflow-hidden`}
        >
          <CardContent className="p-6">
            {/* Product Icon */}
            <div className="flex flex-col items-center text-center mb-4">
              <motion.div
                className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Package className="w-8 h-8 text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-600 opacity-80" />
              </motion.div>

              {/* Product Title */}
              <h3 className="text-lg font-bold text-foreground mb-3 leading-tight text-center">
                {product.title}
              </h3>

              {/* Rating and Reviews */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className={`flex items-center gap-1 ${
                    isDark ? "bg-gray-800/60" : "bg-gray-100/60"
                  } backdrop-blur-sm rounded-full px-3 py-1.5 border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-sm font-medium">
                    {product.rating}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className={`${
                    isDark
                      ? "bg-gray-800/60 text-gray-300"
                      : "bg-gray-100/60 text-gray-600"
                  } border-0 text-sm px-3 py-1 backdrop-blur-sm`}
                >
                  {product.reviewCount?.toLocaleString("ru-RU")} отзывов
                </Badge>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
                {formatCurrency(product.price)}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAddToFavorites}
                  className={`h-10 text-xs ${
                    isDark
                      ? "bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60"
                      : "bg-gray-100/60 border-gray-300 text-gray-600 hover:bg-gray-200/60"
                  } backdrop-blur-sm`}
                >
                  <Heart className="w-3 h-3 mr-1" />В избранное
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShare}
                  className={`h-10 text-xs ${
                    isDark
                      ? "bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60"
                      : "bg-gray-100/60 border-gray-300 text-gray-600 hover:bg-gray-200/60"
                  } backdrop-blur-sm`}
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Поделиться
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAnalytics}
                  className={`h-10 text-xs ${
                    isDark
                      ? "bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60"
                      : "bg-gray-100/60 border-gray-300 text-gray-600 hover:bg-gray-200/60"
                  } backdrop-blur-sm`}
                >
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Аналитика
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer"
    >
      <Card className="glass-card border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {/* Product Image/Icon */}
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <Package className="w-8 h-8 text-white" />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight mb-2 line-clamp-2">
                {product.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-xs font-medium">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {product.reviewCount?.toLocaleString("ru-RU")} отзывов
                </span>
              </div>

              <div className="text-lg font-bold text-primary mb-3">
                {formatCurrency(product.price)}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewDetails}
                  className="h-8 px-3 text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Подробнее
                </Button>
                <Button
                  size="sm"
                  onClick={onAddToFavorites}
                  className="h-8 px-3 text-xs bg-gradient-primary text-white"
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Добавить
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
