'use client';

interface MetricBadgeProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: number;
}

export function MetricBadge({ label, value, icon, trend }: MetricBadgeProps) {
  return (
    <div className="bg-[var(--surface)] rounded-md p-3">
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[15px] font-semibold text-[var(--text-primary)] font-[family-name:var(--font-geist-mono)]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {trend !== undefined && trend !== 0 && (
          <span className={`text-[11px] font-medium ${trend > 0 ? 'text-[#0e6245]' : 'text-[#cd3d64]'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  );
}
