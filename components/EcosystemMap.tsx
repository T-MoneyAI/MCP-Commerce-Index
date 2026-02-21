'use client';

const layers = [
  {
    name: 'Agent Platforms',
    color: 'border-[#e0e7ff] bg-[#f5f7ff]',
    label: 'text-[#4338ca]',
    items: ['Claude', 'ChatGPT', 'Gemini', 'Copilot', 'Custom Agents'],
  },
  {
    name: 'Trust & Orchestration',
    color: 'border-[#1A1F71]/20 bg-[#1A1F71]/[0.03]',
    label: 'text-[#1A1F71]',
    items: ['Visa Agent Wallet', 'Biometric Auth', 'Spending Controls', 'Multi-Rail Routing'],
    highlight: true,
  },
  {
    name: 'Payment Protocols',
    color: 'border-[#d1fae5] bg-[#f0fdf4]',
    label: 'text-[#0e6245]',
    items: ['x402', 'HTTP 402', 'MCP Payments', 'Tempo MPP'],
  },
  {
    name: 'Settlement Rails',
    color: 'border-[#dbeafe] bg-[#eff6ff]',
    label: 'text-[#1d4ed8]',
    items: ['Visa/MC Cards', 'USDC on Base', 'Stablecoins', 'Bank Rails'],
  },
  {
    name: 'Merchants & Services',
    color: 'border-[var(--border-light)] bg-[var(--surface)]',
    label: 'text-[var(--text-tertiary)]',
    items: ['APIs', 'SaaS', 'Data Providers', 'Cloud Infra', 'Commerce'],
  },
];

export function EcosystemMap() {
  return (
    <div className="border border-[var(--border-light)] rounded-lg p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[14px] font-semibold text-[var(--text-primary)]">Agent Commerce Stack</div>
          <div className="text-[12px] text-[var(--text-tertiary)] mt-0.5">From intent to settlement</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {layers.map((layer) => (
          <div
            key={layer.name}
            className={`border rounded-md p-3 ${layer.color} ${layer.highlight ? 'ring-1 ring-[#1A1F71]/15' : ''}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${layer.label}`}>
                {layer.name}
              </span>
              {layer.highlight && (
                <span className="text-[10px] text-[#1A1F71] font-medium opacity-60">Network position</span>
              )}
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {layer.items.map((item) => (
                <span
                  key={item}
                  className={`px-2 py-0.5 text-[11px] rounded ${
                    layer.highlight && item === 'Visa Agent Wallet'
                      ? 'bg-[#1A1F71] text-white font-medium'
                      : 'bg-white/60 text-[var(--text-secondary)] border border-[var(--border-light)]'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
