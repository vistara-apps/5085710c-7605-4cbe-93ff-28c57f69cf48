'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, MessageCircle, Newspaper, BarChart3 } from 'lucide-react';
import { SentimentData } from '@/lib/types';
import { getSentimentLabel, getSentimentColor } from '@/lib/utils';

interface SentimentPanelProps {
  assetSymbol: string;
}

export function SentimentPanel({ assetSymbol }: SentimentPanelProps) {
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock sentiment data - replace with real API
    const mockSentiment: SentimentData = {
      assetSymbol,
      score: Math.random() * 2 - 1, // Random score between -1 and 1
      sources: {
        social: Math.random() * 2 - 1,
        news: Math.random() * 2 - 1,
        technical: Math.random() * 2 - 1,
      },
      lastUpdated: new Date().toISOString(),
    };

    setTimeout(() => {
      setSentiment(mockSentiment);
      setLoading(false);
    }, 500);
  }, [assetSymbol]);

  if (loading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-32 mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!sentiment) {
    return (
      <div className="card">
        <h3 className="text-sm font-medium text-text-secondary mb-2">Sentiment Analysis</h3>
        <p className="text-text-secondary text-xs">No sentiment data available</p>
      </div>
    );
  }

  const SentimentIcon = sentiment.score > 0.2 ? TrendingUp : sentiment.score < -0.2 ? TrendingDown : Minus;

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">Sentiment Analysis</h3>
        <div className="flex items-center gap-1">
          <SentimentIcon className={`w-4 h-4 ${getSentimentColor(sentiment.score)}`} />
          <span className={`text-sm font-medium ${getSentimentColor(sentiment.score)}`}>
            {getSentimentLabel(sentiment.score)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3 h-3 text-text-secondary" />
            <span className="text-xs text-text-secondary">Social</span>
          </div>
          <span className={`text-xs font-medium ${getSentimentColor(sentiment.sources.social)}`}>
            {sentiment.sources.social > 0 ? '+' : ''}{(sentiment.sources.social * 100).toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Newspaper className="w-3 h-3 text-text-secondary" />
            <span className="text-xs text-text-secondary">News</span>
          </div>
          <span className={`text-xs font-medium ${getSentimentColor(sentiment.sources.news)}`}>
            {sentiment.sources.news > 0 ? '+' : ''}{(sentiment.sources.news * 100).toFixed(0)}%
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-3 h-3 text-text-secondary" />
            <span className="text-xs text-text-secondary">Technical</span>
          </div>
          <span className={`text-xs font-medium ${getSentimentColor(sentiment.sources.technical)}`}>
            {sentiment.sources.technical > 0 ? '+' : ''}{(sentiment.sources.technical * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-800">
        <p className="text-xs text-text-secondary">
          Last updated: {new Date(sentiment.lastUpdated).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
