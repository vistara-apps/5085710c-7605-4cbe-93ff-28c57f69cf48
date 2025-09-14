'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Shield, Clock } from 'lucide-react';
import { AltcoinOpportunity } from '@/lib/types';
import { formatPrice, formatPercentage } from '@/lib/utils';
import { StatusIndicator } from './StatusIndicator';

export function OpportunityScanner() {
  const [opportunities, setOpportunities] = useState<AltcoinOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock opportunities data - replace with real scanning algorithm
    const mockOpportunities: AltcoinOpportunity[] = [
      {
        asset: {
          id: 'solana',
          symbol: 'sol',
          name: 'Solana',
          current_price: 98.45,
          price_change_percentage_24h: 8.32,
          market_cap: 42000000000,
          total_volume: 2100000000,
          image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
          last_updated: new Date().toISOString()
        },
        score: 8.5,
        reasons: ['Strong technical breakout', 'Increasing developer activity', 'Growing DeFi ecosystem'],
        riskLevel: 'medium',
        timeframe: '7d'
      },
      {
        asset: {
          id: 'polygon',
          symbol: 'matic',
          name: 'Polygon',
          current_price: 0.87,
          price_change_percentage_24h: 12.45,
          market_cap: 8500000000,
          total_volume: 450000000,
          image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
          last_updated: new Date().toISOString()
        },
        score: 7.8,
        reasons: ['Undervalued vs peers', 'Major partnership announcements', 'Layer 2 adoption growing'],
        riskLevel: 'low',
        timeframe: '30d'
      }
    ];

    setTimeout(() => {
      setOpportunities(mockOpportunities);
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="h-4 bg-gray-700 rounded w-40 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded mb-1"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getRiskVariant = (risk: AltcoinOpportunity['riskLevel']): 'positive' | 'negative' | 'neutral' => {
    switch (risk) {
      case 'low':
        return 'positive';
      case 'high':
        return 'negative';
      case 'medium':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const getTimeframeIcon = (timeframe: AltcoinOpportunity['timeframe']) => {
    switch (timeframe) {
      case '24h':
        return Clock;
      case '7d':
        return TrendingUp;
      case '30d':
        return Shield;
      default:
        return Clock;
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-accent" />
        <h3 className="text-sm font-medium text-text-secondary">Opportunity Scanner</h3>
      </div>

      {opportunities.length === 0 ? (
        <p className="text-xs text-text-secondary">No opportunities detected</p>
      ) : (
        <div className="space-y-4">
          {opportunities.map((opportunity, index) => {
            const TimeframeIcon = getTimeframeIcon(opportunity.timeframe);
            return (
              <div key={opportunity.asset.id} className="border border-gray-800 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-text-primary">
                      {opportunity.asset.symbol.toUpperCase()}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatPrice(opportunity.asset.current_price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIndicator variant={getRiskVariant(opportunity.riskLevel)}>
                      {opportunity.riskLevel} risk
                    </StatusIndicator>
                    <div className="flex items-center gap-1 text-xs text-accent">
                      <TimeframeIcon className="w-3 h-3" />
                      {opportunity.timeframe}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-text-secondary">Score:</span>
                  <span className="text-xs font-medium text-accent">
                    {opportunity.score}/10
                  </span>
                  <span className={`text-xs font-medium ${
                    opportunity.asset.price_change_percentage_24h >= 0 ? 'text-positive' : 'text-negative'
                  }`}>
                    {formatPercentage(opportunity.asset.price_change_percentage_24h)}
                  </span>
                </div>

                <div className="space-y-1">
                  {opportunity.reasons.slice(0, 2).map((reason, reasonIndex) => (
                    <p key={reasonIndex} className="text-xs text-text-secondary">
                      • {reason}
                    </p>
                  ))}
                  {opportunity.reasons.length > 2 && (
                    <p className="text-xs text-accent">
                      +{opportunity.reasons.length - 2} more reasons
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-gray-800">
        <p className="text-xs text-text-secondary">
          Scanner last run: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
