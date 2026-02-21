'use client';

import { Category } from '@/lib/types';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

const categories: Array<{ id: string; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'payments', label: 'Payments' },
  { id: 'protocols', label: 'Protocols' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'wallets', label: 'Wallets' },
  { id: 'crypto', label: 'Crypto' },
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onChange(category.id)}
          className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
            selected === category.id
              ? 'bg-[var(--text-primary)] text-white'
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export function getCategoryColor(category: Category): string {
  switch (category) {
    case 'payments':
      return 'bg-[#eff6ff] text-[#1d4ed8]';
    case 'protocols':
      return 'bg-[#f0fdf4] text-[#0e6245]';
    case 'commerce':
      return 'bg-[#faf5ff] text-[#7c3aed]';
    case 'wallets':
      return 'bg-[#fffbeb] text-[#b45309]';
    case 'crypto':
      return 'bg-[#fff7ed] text-[#c2410c]';
    case 'data':
      return 'bg-[#f0f9ff] text-[#0369a1]';
    default:
      return 'bg-[var(--surface)] text-[var(--text-tertiary)]';
  }
}
