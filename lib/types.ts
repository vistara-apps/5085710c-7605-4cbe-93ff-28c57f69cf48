export interface Asset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
  last_updated: string;
}

export interface User {
  userAddress: string;
  trackedAssets: string[];
  alertPreferences: {
    priceAlerts: boolean;
    onChainAlerts: boolean;
    sentimentAlerts: boolean;
    thresholdPercentage: number;
  };
}

export interface OnChainAlert {
  id: string;
  assetSymbol: string;
  type: 'large_transaction' | 'whale_movement' | 'contract_interaction';
  amount: number;
  timestamp: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SentimentData {
  assetSymbol: string;
  score: number; // -1 to 1
  sources: {
    social: number;
    news: number;
    technical: number;
  };
  lastUpdated: string;
}

export interface AltcoinOpportunity {
  asset: Asset;
  score: number;
  reasons: string[];
  riskLevel: 'low' | 'medium' | 'high';
  timeframe: '24h' | '7d' | '30d';
}

export interface MarketStats {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  activeCoins: number;
  marketCapChange24h: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
