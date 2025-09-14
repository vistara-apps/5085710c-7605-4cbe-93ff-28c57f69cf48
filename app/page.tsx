'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, RefreshCw, Settings } from 'lucide-react';
import { Asset } from '@/lib/types';
import { fetchAssets } from '@/lib/api';
import { AssetCard } from '@/components/AssetCard';
import { AssetChart } from '@/components/AssetChart';
import { AssetSearch } from '@/components/AssetSearch';
import { MarketOverview } from '@/components/MarketOverview';
import { SentimentPanel } from '@/components/SentimentPanel';
import { AlertsPanel } from '@/components/AlertsPanel';
import { OpportunityScanner } from '@/components/OpportunityScanner';
import { FrameButton } from '@/components/FrameButton';
import { AlertToggle } from '@/components/AlertToggle';

export default function Home() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [trackedAssets, setTrackedAssets] = useState<string[]>(['bitcoin', 'ethereum', 'base']);
  const [loading, setLoading] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    priceAlerts: true,
    onChainAlerts: true,
    sentimentAlerts: false,
    thresholdPercentage: 5
  });

  useEffect(() => {
    loadAssets();
  }, [trackedAssets]);

  const loadAssets = async () => {
    setLoading(true);
    const response = await fetchAssets(trackedAssets);
    if (response.success) {
      setAssets(response.data);
      if (!selectedAsset && response.data.length > 0) {
        setSelectedAsset(response.data[0]);
      }
    }
    setLoading(false);
  };

  const handleAddAsset = (asset: Asset) => {
    if (!trackedAssets.includes(asset.id)) {
      setTrackedAssets([...trackedAssets, asset.id]);
    }
  };

  const handleRemoveAsset = (assetId: string) => {
    setTrackedAssets(trackedAssets.filter(id => id !== assetId));
    if (selectedAsset?.id === assetId) {
      const remainingAssets = assets.filter(a => a.id !== assetId);
      setSelectedAsset(remainingAssets.length > 0 ? remainingAssets[0] : null);
    }
  };

  const handleRefresh = () => {
    loadAssets();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gradient">CryptoPulse</h1>
            <p className="text-text-secondary text-sm mt-1">
              Your real-time edge in crypto markets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FrameButton
              variant="secondary"
              icon={RefreshCw}
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </FrameButton>
            <FrameButton
              variant="secondary"
              icon={Search}
              onClick={() => setShowSearch(true)}
            >
              Add Asset
            </FrameButton>
            <FrameButton
              variant="secondary"
              icon={Settings}
              onClick={() => setShowSettings(!showSettings)}
            >
              Alerts
            </FrameButton>
          </div>
        </div>

        {/* Alert Settings Panel */}
        {showSettings && (
          <div className="card mb-6 animate-fade-in">
            <h3 className="text-sm font-medium text-text-secondary mb-4">Alert Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AlertToggle
                active={alertSettings.priceAlerts}
                onToggle={() => setAlertSettings(prev => ({ ...prev, priceAlerts: !prev.priceAlerts }))}
                label="Price Alerts"
              />
              <AlertToggle
                active={alertSettings.onChainAlerts}
                onToggle={() => setAlertSettings(prev => ({ ...prev, onChainAlerts: !prev.onChainAlerts }))}
                label="On-Chain Alerts"
              />
              <AlertToggle
                active={alertSettings.sentimentAlerts}
                onToggle={() => setAlertSettings(prev => ({ ...prev, sentimentAlerts: !prev.sentimentAlerts }))}
                label="Sentiment Alerts"
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs text-text-secondary mb-2">
                Price Change Threshold: {alertSettings.thresholdPercentage}%
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={alertSettings.thresholdPercentage}
                onChange={(e) => setAlertSettings(prev => ({ ...prev, thresholdPercentage: parseInt(e.target.value) }))}
                className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Market Overview */}
        <div className="mb-8">
          <MarketOverview />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Asset List and Chart */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tracked Assets */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Your Assets</h2>
                <FrameButton
                  variant="primary"
                  icon={Plus}
                  onClick={() => setShowSearch(true)}
                >
                  Add Asset
                </FrameButton>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
                          <div className="h-3 bg-gray-700 rounded w-16"></div>
                        </div>
                        <div className="text-right">
                          <div className="h-4 bg-gray-700 rounded w-20 mb-1"></div>
                          <div className="h-3 bg-gray-700 rounded w-16"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : assets.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-text-secondary mb-4">No assets tracked yet</p>
                  <FrameButton
                    variant="primary"
                    icon={Plus}
                    onClick={() => setShowSearch(true)}
                  >
                    Add Your First Asset
                  </FrameButton>
                </div>
              ) : (
                <div className="space-y-3">
                  {assets.map((asset) => (
                    <div key={asset.id} className="relative group">
                      <AssetCard
                        asset={asset}
                        onClick={() => setSelectedAsset(asset)}
                      />
                      <button
                        onClick={() => handleRemoveAsset(asset.id)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-negative text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Asset Chart */}
            {selectedAsset && (
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {selectedAsset.name} ({selectedAsset.symbol.toUpperCase()})
                  </h3>
                  <div className="text-right">
                    <p className="text-xl font-bold text-text-primary">
                      ${selectedAsset.current_price.toLocaleString()}
                    </p>
                    <p className={`text-sm ${
                      selectedAsset.price_change_percentage_24h >= 0 ? 'text-positive' : 'text-negative'
                    }`}>
                      {selectedAsset.price_change_percentage_24h >= 0 ? '+' : ''}
                      {selectedAsset.price_change_percentage_24h.toFixed(2)}% (24h)
                    </p>
                  </div>
                </div>
                <AssetChart asset={selectedAsset} height={300} />
              </div>
            )}
          </div>

          {/* Right Column - Panels */}
          <div className="space-y-6">
            {/* Sentiment Analysis */}
            {selectedAsset && (
              <SentimentPanel assetSymbol={selectedAsset.symbol} />
            )}

            {/* On-Chain Alerts */}
            <AlertsPanel />

            {/* Opportunity Scanner */}
            <OpportunityScanner />
          </div>
        </div>

        {/* Asset Search Modal */}
        {showSearch && (
          <AssetSearch
            onAssetSelect={handleAddAsset}
            onClose={() => setShowSearch(false)}
          />
        )}
      </div>
    </div>
  );
}
