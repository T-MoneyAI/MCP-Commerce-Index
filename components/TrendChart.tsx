'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface TrendChartProps {
  data: number[];
  height?: number;
  showAxis?: boolean;
  color?: string;
}

export function TrendChart({
  data,
  height = 40,
  showAxis = false,
  color = '#2563eb',
}: TrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center text-[var(--text-tertiary)] text-[11px]" style={{ height }}>
        No data
      </div>
    );
  }

  const chartData = data.map((value, index) => ({
    day: index + 1,
    downloads: value,
  }));

  const isPositive = data[data.length - 1] >= data[0];
  const trendColor = isPositive ? '#0e6245' : '#cd3d64';

  if (!showAxis) {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id={`gradient-${trendColor}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={trendColor} stopOpacity={0.15} />
              <stop offset="100%" stopColor={trendColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="downloads"
            stroke={trendColor}
            strokeWidth={1.5}
            fill={`url(#gradient-${trendColor})`}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="day"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9ca3af', fontSize: 10 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#9ca3af', fontSize: 10 }}
          tickFormatter={(value) =>
            value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value
          }
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e3e8ee',
            borderRadius: '6px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontSize: '12px',
          }}
          labelStyle={{ color: '#9ca3af' }}
          itemStyle={{ color: '#111827' }}
          formatter={(value) => [typeof value === 'number' ? value.toLocaleString() : value, 'Downloads']}
          labelFormatter={(label) => `Day ${label}`}
        />
        <Line
          type="monotone"
          dataKey="downloads"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 3, fill: color, stroke: '#fff', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
