'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { MCPData } from '@/lib/types';

interface AggregateTrendChartProps {
  data: MCPData[];
}

export function AggregateTrendChart({ data }: AggregateTrendChartProps) {
  const maxLen = Math.max(...data.map((m) => m.trend?.length ?? 0), 0);
  if (maxLen === 0) return null;

  const aggregated = Array.from({ length: maxLen }, (_, i) => {
    const total = data.reduce((sum, mcp) => sum + (mcp.trend?.[i] ?? 0), 0);
    const daysAgo = maxLen - 1 - i;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      day: i + 1,
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      downloads: total,
    };
  });

  const first = aggregated[0]?.downloads ?? 0;
  const last = aggregated[aggregated.length - 1]?.downloads ?? 0;
  const changePercent = first > 0 ? Math.round(((last - first) / first) * 100) : 0;

  return (
    <div className="border border-[var(--border-light)] rounded-lg p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[14px] font-semibold text-[var(--text-primary)]">Total Downloads</div>
          <div className="text-[12px] text-[var(--text-tertiary)] mt-0.5">
            Aggregate daily volume across all {data.length} packages
          </div>
        </div>
        <div className="text-right">
          <div className={`text-[20px] font-semibold font-[family-name:var(--font-geist-mono)] ${changePercent >= 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}`}>
            {changePercent >= 0 ? '+' : ''}{changePercent}%
          </div>
          <div className="text-[11px] text-[var(--text-tertiary)]">30d change</div>
        </div>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={aggregated}>
            <defs>
              <linearGradient id="agg-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              interval={Math.floor(aggregated.length / 6)}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 10 }}
              tickFormatter={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
              }
              width={45}
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
            />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke="#2563eb"
              strokeWidth={2}
              fill="url(#agg-gradient)"
              dot={false}
              activeDot={{ r: 3, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
