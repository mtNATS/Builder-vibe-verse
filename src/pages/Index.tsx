import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, ArrowRight, Package, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="text-center max-w-md w-full">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Fusion Starter</CardTitle>
            <CardDescription>
              Добро пожаловать в приложение для расчета логистических затрат
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => navigate("/calculator")}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Package className="w-5 h-5 mr-2" />
              Калькулятор Wildberries
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm text-slate-600">Точные расчеты</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <Calculator className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm text-slate-600">Быстрые результаты</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
