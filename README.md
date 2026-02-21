# MCP Commerce Index

Real-time tracking of the agent commerce ecosystem.

Payments, protocols, wallets, and commerce tools — ranked by adoption. Updated hourly.

## Quick Start

```bash
git clone https://github.com/YOUR_ORG/mcp-commerce-index.git
cd mcp-commerce-index
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What's Tracked

| Category | Examples | Count |
|----------|---------|-------|
| **Payments** | Stripe MCP, PayPal, Adyen, Square, Braintree, MercadoPago | 11 |
| **Protocols** | x402 (Coinbase), x402-EVM, x402-SVM, x402-Express | 9 |
| **Commerce** | Shopify Dev MCP, Medusa, Polaris | 5 |
| **Wallets** | ATXP, MCPay, Cronos402 | 3 |
| **Crypto** | Coinbase SDK, AgentKit, CoinGecko MCP, NEAR MCP | 6 |
| **Data** | MCP SDK (reference) | 1 |

**35 packages tracked** across the agent commerce stack.

## Features

- **Live Rankings** — ranked by npm weekly downloads
- **Trend Charts** — 7-day sparklines + 30-day detailed graphs
- **Category Filters** — Payments, Protocols, Commerce, Wallets, Crypto, Data
- **GitHub Metrics** — Stars, forks, issues, last commit
- **Auto-Refresh** — data updates hourly via ISR

## API

```bash
# All MCPs
curl http://localhost:3000/api/mcps

# Filter by category
curl "http://localhost:3000/api/mcps?category=payments"
curl "http://localhost:3000/api/mcps?category=protocols"
curl "http://localhost:3000/api/mcps?category=wallets"

# Download trends
curl http://localhost:3000/api/trends/@stripe%2Fagent-toolkit
```

## Add a New MCP

Edit `lib/mcps.ts`:

```typescript
{
  id: 'your-mcp',
  name: 'Your MCP Name',
  category: 'payments', // payments | protocols | commerce | wallets | crypto | data
  npmPackage: 'your-npm-package',
  githubRepo: 'owner/repo',
  description: 'What it does',
}
```

PRs for new MCPs welcome.

## Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_ORG/mcp-commerce-index)

### Docker

```bash
docker build -t mcp-commerce-index .
docker run -p 3000:3000 mcp-commerce-index
```

## Tech Stack

- Next.js 14 (App Router)
- Tailwind CSS
- Recharts
- SWR

## License

MIT

---

