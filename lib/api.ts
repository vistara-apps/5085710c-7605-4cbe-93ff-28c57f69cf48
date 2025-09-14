import { Asset, MarketStats, ApiResponse } from './types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Mock data for development - replace with real API calls
const MOCK_ASSETS: Asset[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    current_price: 43250.50,
    price_change_percentage_24h: 2.45,
    market_cap: 847500000000,
    total_volume: 25600000000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [42000, 42500, 43000, 42800, 43200, 43500, 43250]
    }
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    current_price: 2650.75,
    price_change_percentage_24h: -1.23,
    market_cap: 318500000000,
    total_volume: 15200000000,
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [2700, 2680, 2650, 2620, 2640, 2660, 2650]
    }
  },
  {
    id: 'base',
    symbol: 'base',
    name: 'Base',
    current_price: 1.85,
    price_change_percentage_24h: 5.67,
    market_cap: 185000000,
    total_volume: 12500000,
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    last_updated: new Date().toISOString(),
    sparkline_in_7d: {
      price: [1.75, 1.78, 1.82, 1.80, 1.83, 1.87, 1.85]
    }
  }
];

export async function fetchAssets(symbols?: string[]): Promise<ApiResponse<Asset[]>> {
  try {
    // In production, use real CoinGecko API
    // const response = await fetch(`${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`);
    
    // For now, return mock data
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    
    let assets = MOCK_ASSETS;
    if (symbols && symbols.length > 0) {
      assets = MOCK_ASSETS.filter(asset => 
        symbols.includes(asset.symbol.toLowerCase())
      );
    }

    return {
      data: assets,
      success: true
    };
  } catch (error) {
    console.error('Error fetching assets:', error);
    return {
      data: [],
      success: false,
      error: 'Failed to fetch asset data'
    };
  }
}

export async function fetchAssetById(id: string): Promise<ApiResponse<Asset | null>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const asset = MOCK_ASSETS.find(a => a.id === id || a.symbol === id.toLowerCase());
    
    return {
      data: asset || null,
      success: true
    };
  } catch (error) {
    console.error('Error fetching asset:', error);
    return {
      data: null,
      success: false,
      error: 'Failed to fetch asset data'
    };
  }
}

export async function fetchMarketStats(): Promise<ApiResponse<MarketStats>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const stats: MarketStats = {
      totalMarketCap: 1650000000000,
      totalVolume: 85000000000,
      btcDominance: 51.3,
      activeCoins: 2847,
      marketCapChange24h: 2.1
    };

    return {
      data: stats,
      success: true
    };
  } catch (error) {
    console.error('Error fetching market stats:', error);
    return {
      data: {
        totalMarketCap: 0,
        totalVolume: 0,
        btcDominance: 0,
        activeCoins: 0,
        marketCapChange24h: 0
      },
      success: false,
      error: 'Failed to fetch market statistics'
    };
  }
}

export async function searchAssets(query: string): Promise<ApiResponse<Asset[]>> {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filteredAssets = MOCK_ASSETS.filter(asset =>
      asset.name.toLowerCase().includes(query.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(query.toLowerCase())
    );

    return {
      data: filteredAssets,
      success: true
    };
  } catch (error) {
    console.error('Error searching assets:', error);
    return {
      data: [],
      success: false,
      error: 'Failed to search assets'
    };
  }
}
