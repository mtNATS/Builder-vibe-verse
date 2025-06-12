import React from "react";
import { motion } from "framer-motion";
import {
  Building,
  Users,
  Star,
  Shield,
  Eye,
  MessageCircle,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SellerInfo } from "@/types/calculator";

interface SellerCardProps {
  seller: SellerInfo;
  isDark: boolean;
  onViewDetails?: () => void;
  onContact?: () => void;
  compact?: boolean;
}

const SellerCard: React.FC<SellerCardProps> = ({
  seller,
  isDark,
  onViewDetails,
  onContact,
  compact = false,
}) => {
  const formatDate = (dateString: string) => {
    const years = new Date().getFullYear() - new Date(dateString).getFullYear();
    return years;
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
            {/* Seller Icon */}
            <div className="flex flex-col items-center text-center mb-4">
              <motion.div
                className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center relative overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {seller.type === "company" ? (
                  <Building className="w-8 h-8 text-white relative z-10" />
                ) : (
                  <Users className="w-8 h-8 text-white relative z-10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-600 opacity-80" />
              </motion.div>

              {/* Seller Name */}
              <h3 className="text-lg font-bold text-foreground mb-3 leading-tight text-center">
                {seller.name}
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
                    {seller.rating}
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
                  {seller.reviewCount?.toLocaleString("ru-RU")} отзывов
                </Badge>
                {seller.verificationStatus === "verified" && (
                  <Badge
                    variant="default"
                    className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs px-2 py-1"
                  >
                    <Shield className="w-3 h-3 mr-1" />
                    Проверен
                  </Badge>
                )}
              </div>

              {/* Business Type */}
              <div className="text-sm text-muted-foreground mb-4">
                {seller.type === "company"
                  ? "Юридическое лицо"
                  : "Физическое лицо"}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 w-full mb-4">
                <div
                  className={`text-center ${
                    isDark ? "bg-gray-800/40" : "bg-gray-100/40"
                  } backdrop-blur-sm rounded-lg p-3 border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="text-lg font-bold text-primary">
                    {seller.totalProducts}
                  </div>
                  <div className="text-xs text-muted-foreground">Товаров</div>
                </div>
                <div
                  className={`text-center ${
                    isDark ? "bg-gray-800/40" : "bg-gray-100/40"
                  } backdrop-blur-sm rounded-lg p-3 border ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <div className="text-lg font-bold text-green-400">
                    {formatDate(seller.registrationDate)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    лет на рынке
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onViewDetails}
                  className={`h-10 text-xs ${
                    isDark
                      ? "bg-gray-800/60 border-gray-700 text-gray-300 hover:bg-gray-700/60"
                      : "bg-gray-100/60 border-gray-300 text-gray-600 hover:bg-gray-200/60"
                  } backdrop-blur-sm`}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Подробнее
                </Button>
                <Button
                  size="sm"
                  onClick={onContact}
                  className="h-10 text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Связаться
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
            {/* Seller Icon */}
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              {seller.type === "company" ? (
                <Building className="w-8 h-8 text-white" />
              ) : (
                <Users className="w-8 h-8 text-white" />
              )}
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground text-sm leading-tight">
                  {seller.name}
                </h3>
                {seller.verificationStatus === "verified" && (
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 text-xs font-medium">
                    {seller.rating}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {seller.reviewCount?.toLocaleString("ru-RU")} отзывов
                </span>
              </div>

              <div className="text-xs text-muted-foreground mb-3">
                {seller.type === "company"
                  ? "Юридическое лицо"
                  : "Физическое лицо"}{" "}
                • {seller.totalProducts} товаров •{" "}
                {formatDate(seller.registrationDate)} лет на платформе
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
                  onClick={onContact}
                  className="h-8 px-3 text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Связаться
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SellerCard;
