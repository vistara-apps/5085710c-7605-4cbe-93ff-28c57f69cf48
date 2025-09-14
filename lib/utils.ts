import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else if (price < 100) {
    return `$${price.toFixed(2)}`;
  } else {
    return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }
}

export function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`;
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`;
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`;
  } else {
    return `$${marketCap.toLocaleString()}`;
  }
}

export function formatPercentage(percentage: number): string {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
}

export function getPercentageColor(percentage: number): string {
  if (percentage > 0) return 'status-positive';
  if (percentage < 0) return 'status-negative';
  return 'status-neutral';
}

export function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}

export function generateSparklineData(length: number = 24): number[] {
  const basePrice = 100;
  const data: number[] = [];
  let currentPrice = basePrice;

  for (let i = 0; i < length; i++) {
    const change = (Math.random() - 0.5) * 10;
    currentPrice += change;
    data.push(Math.max(currentPrice, 1));
  }

  return data;
}

export function calculateSentimentScore(social: number, news: number, technical: number): number {
  return (social * 0.4 + news * 0.3 + technical * 0.3);
}

export function getSentimentLabel(score: number): string {
  if (score >= 0.6) return 'Very Bullish';
  if (score >= 0.2) return 'Bullish';
  if (score >= -0.2) return 'Neutral';
  if (score >= -0.6) return 'Bearish';
  return 'Very Bearish';
}

export function getSentimentColor(score: number): string {
  if (score >= 0.2) return 'text-positive';
  if (score <= -0.2) return 'text-negative';
  return 'text-text-secondary';
}
