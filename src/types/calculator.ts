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
  productInfo: {
    title: string;
    price: number;
    rating?: number;
    reviewCount?: number;
  };
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
