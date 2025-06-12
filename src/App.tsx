import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import CalculatorForm from "./pages/CalculatorForm";
import CalculatorLoading from "./pages/CalculatorLoading";
import CalculatorResults from "./pages/CalculatorResults";
import CalculationHistory from "./pages/CalculationHistory";
import ProductDetails from "./pages/ProductDetails";
import SellerDetails from "./pages/SellerDetails";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calculator/form" element={<CalculatorForm />} />
          <Route path="/calculator/loading" element={<CalculatorLoading />} />
          <Route path="/calculator/results" element={<CalculatorResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
