'use client';

import { Asset } from '@/lib/types';
import { formatPrice, formatPercentage, getPercentageColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Image from 'next/image';

interface AssetCardProps {
  asset: Asset;
  variant?: 'default' | 'compact';
  onClick?: () => void;
}

export function AssetCard({ asset, variant = 'default', onClick }: AssetCardProps) {
  const isPositive = asset.price_change_percentage_24h > 0;
  const isNegative = asset.price_change_percentage_24h < 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div 
      className={`card hover:bg-gray-800 transition-colors duration-200 cursor-pointer ${
        variant === 'compact' ? 'p-3' : 'p-4'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-surface">
            {asset.image ? (
              <Image
                src={asset.image}
                alt={asset.name}
                width={32}
                height={32}
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-bold text-white">
                {asset.symbol.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h3 className={`font-semibold text-text-primary ${
              variant === 'compact' ? 'text-sm' : 'text-base'
            }`}>
              {asset.symbol.toUpperCase()}
            </h3>
            <p className={`text-text-secondary ${
              variant === 'compact' ? 'text-xs' : 'text-sm'
            }`}>
              {asset.name}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className={`font-semibold text-text-primary ${
            variant === 'compact' ? 'text-sm' : 'text-base'
          }`}>
            {formatPrice(asset.current_price)}
          </p>
          <div className={`flex items-center gap-1 justify-end ${
            variant === 'compact' ? 'text-xs' : 'text-sm'
          }`}>
            <TrendIcon className={`w-3 h-3 ${getPercentageColor(asset.price_change_percentage_24h)}`} />
            <span className={getPercentageColor(asset.price_change_percentage_24h)}>
              {formatPercentage(asset.price_change_percentage_24h)}
            </span>
          </div>
        </div>
      </div>

      {variant === 'default' && (
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="flex justify-between text-xs text-text-secondary">
            <span>Market Cap</span>
            <span>${(asset.market_cap / 1e9).toFixed(2)}B</span>
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>Volume</span>
            <span>${(asset.total_volume / 1e6).toFixed(1)}M</span>
          </div>
        </div>
      )}
    </div>
  );
}
