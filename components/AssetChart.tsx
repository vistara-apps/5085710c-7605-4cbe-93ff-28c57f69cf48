'use client';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Asset } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface AssetChartProps {
  asset: Asset;
  height?: number;
}

export function AssetChart({ asset, height = 200 }: AssetChartProps) {
  const sparklineData = asset.sparkline_in_7d?.price || [];
  
  const chartData = sparklineData.map((price, index) => ({
    time: index,
    price: price,
  }));

  const isPositive = asset.price_change_percentage_24h > 0;
  const lineColor = isPositive ? '#22c55e' : '#ef4444';

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-text-secondary">
        <p>No chart data available</p>
      </div>
    );
  }

  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            hide 
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(210, 15%, 15%)',
              border: '1px solid hsl(210, 15%, 25%)',
              borderRadius: '8px',
              color: 'hsl(0, 0%, 95%)'
            }}
            formatter={(value: number) => [formatPrice(value), 'Price']}
            labelFormatter={() => ''}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
