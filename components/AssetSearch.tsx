'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Asset } from '@/lib/types';
import { searchAssets } from '@/lib/api';
import { AssetCard } from './AssetCard';

interface AssetSearchProps {
  onAssetSelect: (asset: Asset) => void;
  onClose: () => void;
}

export function AssetSearch({ onAssetSelect, onClose }: AssetSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchDebounced = setTimeout(async () => {
      if (query.trim().length > 0) {
        setLoading(true);
        const response = await searchAssets(query);
        if (response.success) {
          setResults(response.data);
        }
        setLoading(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchDebounced);
  }, [query]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-gray-700 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-96">
          {loading ? (
            <div className="p-4 text-center text-text-secondary">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2 space-y-2">
              {results.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  variant="compact"
                  onClick={() => {
                    onAssetSelect(asset);
                    onClose();
                  }}
                />
              ))}
            </div>
          ) : query.trim().length > 0 ? (
            <div className="p-4 text-center text-text-secondary">
              No assets found for "{query}"
            </div>
          ) : (
            <div className="p-4 text-center text-text-secondary">
              Start typing to search for cryptocurrencies
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
