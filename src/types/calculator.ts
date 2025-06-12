export interface CalculatorFormData {
  box: string;
  marketplace: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  quantity: number;
  price: number;
}

export interface LogisticsCosts {
  deliveryCost: number;
  storageCost: number;
  returnCost: number;
  totalExpenses: number;
}

export interface CommissionCosts {
  marketplaceCommission: number;
  marketplaceCommissionPercent: number;
  supplierCommission: number;
  supplierCommissionPercent: number;
}

export interface CalculationResults {
  logistics: LogisticsCosts;
  commissions: CommissionCosts;
  productInfo: ProductInfo;
}

export interface ProductInfo {
  title: string;
  price: number;
  rating?: number;
  reviewCount?: number;
  articleId?: string;
  category?: string;
  brand?: string;
  description?: string;
  images?: string[];
  seller?: SellerInfo;
  specifications?: Record<string, string>;
  availability?: {
    inStock: boolean;
    remainingCount?: number;
    warehouses?: string[];
  };
}

export interface SellerInfo {
  id: string;
  name: string;
  type: "individual" | "company";
  rating: number;
  reviewCount: number;
  registrationDate: string;
  totalProducts: number;
  verificationStatus: "verified" | "unverified";
  location: {
    country: string;
    city: string;
    region?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  businessInfo?: {
    inn?: string;
    ogrn?: string;
    legalAddress?: string;
  };
}

export interface CalculationHistory {
  id: string;
  date: string;
  productInfo: ProductInfo;
  formData: CalculatorFormData;
  results: CalculationResults;
  notes?: string;
}

export interface FeedbackForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: "bug" | "feature" | "question" | "complaint" | "other";
  priority: "low" | "medium" | "high";
}

export interface MarketplaceOption {
  value: string;
  label: string;
  icon?: string;
}

export interface BoxOption {
  value: string;
  label: string;
  maxWeight?: number;
  maxDimensions?: {
    length: number;
    width: number;
    height: number;
  };
}
