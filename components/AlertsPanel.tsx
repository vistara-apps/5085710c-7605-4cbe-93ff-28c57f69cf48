'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Activity, TrendingUp } from 'lucide-react';
import { OnChainAlert } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';
import { StatusIndicator } from './StatusIndicator';

export function AlertsPanel() {
  const [alerts, setAlerts] = useState<OnChainAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock alerts data - replace with real API
    const mockAlerts: OnChainAlert[] = [
      {
        id: '1',
        assetSymbol: 'BTC',
        type: 'large_transaction',
        amount: 1000,
        timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        description: 'Large BTC transaction detected: 1,000 BTC moved',
        severity: 'high'
      },
      {
        id: '2',
        assetSymbol: 'ETH',
        type: 'whale_movement',
        amount: 5000,
        timestamp: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
        description: 'Whale movement: 5,000 ETH transferred to exchange',
        severity: 'medium'
      },
      {
        id: '3',
        assetSymbol: 'BASE',
        type: 'contract_interaction',
        amount: 0,
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        description: 'High activity on Base smart contracts',
        severity: 'low'
      }
    ];

    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="card">
        <div className="h-4 bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-3 bg-gray-700 rounded mb-2"></div>
              <div className="h-2 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getAlertIcon = (type: OnChainAlert['type']) => {
    switch (type) {
      case 'large_transaction':
        return TrendingUp;
      case 'whale_movement':
        return Activity;
      case 'contract_interaction':
        return AlertTriangle;
      default:
        return Bell;
    }
  };

  const getSeverityVariant = (severity: OnChainAlert['severity']): 'positive' | 'negative' | 'neutral' => {
    switch (severity) {
      case 'high':
        return 'negative';
      case 'medium':
        return 'neutral';
      case 'low':
        return 'positive';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-4 h-4 text-accent" />
        <h3 className="text-sm font-medium text-text-secondary">On-Chain Alerts</h3>
      </div>

      {alerts.length === 0 ? (
        <p className="text-xs text-text-secondary">No recent alerts</p>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            return (
              <div key={alert.id} className="border-l-2 border-accent/30 pl-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    <Icon className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-text-primary font-medium">
                        {alert.assetSymbol}
                      </p>
                      <p className="text-xs text-text-secondary mt-1 break-words">
                        {alert.description}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {formatTimeAgo(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  <StatusIndicator variant={getSeverityVariant(alert.severity)}>
                    {alert.severity}
                  </StatusIndicator>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
