'use client';

import { useEffect, useState } from 'react';
import { MarketStats } from '@/lib/types';
import { fetchMarketStats } from '@/lib/api';
import { formatMarketCap, formatPercentage, getPercentageColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';

export function MarketOverview() {
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const response = await fetchMarketStats();
      if (response.success) {
        setStats(response.data);
      }
      setLoading(false);
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-700 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="card text-center py-8">
        <p className="text-text-secondary">Failed to load market statistics</p>
      </div>
    );
  }

  const marketCapChange = stats.marketCapChange24h;
  const TrendIcon = marketCapChange >= 0 ? TrendingUp : TrendingDown;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium text-text-secondary">Total Market Cap</span>
        </div>
        <p className="text-lg font-semibold text-text-primary">
          {formatMarketCap(stats.totalMarketCap)}
        </p>
        <div className={`flex items-center gap-1 text-xs ${getPercentageColor(marketCapChange)}`}>
          <TrendIcon className="w-3 h-3" />
          {formatPercentage(marketCapChange)}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-text-secondary">24h Volume</span>
        </div>
        <p className="text-lg font-semibold text-text-primary">
          {formatMarketCap(stats.totalVolume)}
        </p>
        <p className="text-xs text-text-secondary">Across all markets</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <span className="text-xs font-medium text-text-secondary">BTC Dominance</span>
        </div>
        <p className="text-lg font-semibold text-text-primary">
          {stats.btcDominance.toFixed(1)}%
        </p>
        <p className="text-xs text-text-secondary">Market share</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full"></div>
          <span className="text-xs font-medium text-text-secondary">Active Coins</span>
        </div>
        <p className="text-lg font-semibold text-text-primary">
          {stats.activeCoins.toLocaleString()}
        </p>
        <p className="text-xs text-text-secondary">Tracked assets</p>
      </div>
    </div>
  );
}
