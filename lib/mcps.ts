import { MCPConfig } from './types';

export const mcpRegistry: MCPConfig[] = [
  // ═══════════════════════════════════════════════════
  // PAYMENTS — PSP & Payment Processor MCP/Agent Tools
  // ═══════════════════════════════════════════════════
  {
    id: 'stripe-mcp',
    name: 'Stripe MCP',
    category: 'payments',
    npmPackage: '@stripe/mcp',
    githubRepo: 'stripe/stripe-mcp',
    description: 'Official Stripe MCP server for AI agents',
    website: 'https://mcp.stripe.com',
  },
  {
    id: 'stripe-agent-toolkit',
    name: 'Stripe Agent Toolkit',
    category: 'payments',
    npmPackage: '@stripe/agent-toolkit',
    githubRepo: 'stripe/agent-toolkit',
    description: 'Stripe tools for LangChain, Vercel AI SDK, and agent frameworks',
  },
  {
    id: 'paypal-mcp',
    name: 'PayPal MCP',
    category: 'payments',
    npmPackage: '@anthropic/paypal-mcp',
    githubRepo: 'paypal/agent-toolkit',
    description: 'PayPal agent toolkit for AI-powered payments',
    website: 'https://developer.paypal.com',
  },
  {
    id: 'square-mcp',
    name: 'Square MCP',
    category: 'payments',
    npmPackage: null,
    githubRepo: 'square/square-mcp',
    description: 'Square payments MCP server',
  },
  {
    id: 'rapay-mcp',
    name: 'Ra Pay MCP',
    category: 'payments',
    npmPackage: '@rapay/mcp-server',
    githubRepo: null,
    description: 'Ra Pay MCP server for AI agent payments',
  },
  {
    id: 'kobana-mcp',
    name: 'Kobana MCP',
    category: 'payments',
    npmPackage: 'kobana-mcp-payment',
    githubRepo: null,
    description: 'MCP server for Kobana Payment API (billets, Pix, DARF)',
  },

  // ═══════════════════════════════════════════════════
  // COMMERCE — Storefronts, Marketplaces, Commerce Platforms
  // ═══════════════════════════════════════════════════
  {
    id: 'shopify-dev-mcp',
    name: 'Shopify Dev MCP',
    category: 'commerce',
    npmPackage: '@shopify/dev-mcp',
    githubRepo: 'Shopify/dev-mcp',
    description: 'Official Shopify developer MCP server',
  },
  {
    id: 'shopify-mcp',
    name: 'Shopify MCP (Community)',
    category: 'commerce',
    npmPackage: 'shopify-mcp',
    githubRepo: null,
    description: 'Community-built Shopify MCP integration',
  },
  {
    id: 'shopify-storefront-mcp',
    name: 'Shopify Storefront MCP',
    category: 'commerce',
    npmPackage: '@wolfielabs/shopify-storefront-mcp-server',
    githubRepo: null,
    description: 'Shopify Storefront API MCP server',
  },
  {
    id: 'polaris-mcp',
    name: 'Shopify Polaris MCP',
    category: 'commerce',
    npmPackage: 'polaris-mcp-server',
    githubRepo: null,
    description: 'Shopify Polaris UI components for AI assistants — 3.4k weekly',
  },

  // ═══════════════════════════════════════════════════
  // PROTOCOLS — Payment Protocol Specifications & SDKs
  // ═══════════════════════════════════════════════════
  {
    id: 'x402-core',
    name: 'x402 Core',
    category: 'protocols',
    npmPackage: '@x402/core',
    githubRepo: 'coinbase/x402',
    description: 'x402 payment protocol — HTTP 402 for the internet. 22k weekly.',
    website: 'https://www.x402.org',
  },
  {
    id: 'x402',
    name: 'x402',
    category: 'protocols',
    npmPackage: 'x402',
    githubRepo: 'coinbase/x402',
    description: 'x402 umbrella package — 92k weekly downloads',
    website: 'https://www.x402.org',
  },
  {
    id: 'x402-evm',
    name: 'x402 EVM',
    category: 'protocols',
    npmPackage: '@x402/evm',
    githubRepo: 'coinbase/x402',
    description: 'x402 EVM chain implementation (Base, Ethereum) — 18k weekly',
  },
  {
    id: 'x402-svm',
    name: 'x402 SVM (Solana)',
    category: 'protocols',
    npmPackage: '@x402/svm',
    githubRepo: 'coinbase/x402',
    description: 'x402 Solana implementation — 3.9k weekly',
  },
  {
    id: 'x402-express',
    name: 'x402 Express',
    category: 'protocols',
    npmPackage: '@x402/express',
    githubRepo: 'coinbase/x402',
    description: 'x402 Express.js middleware for servers — 5.7k weekly',
  },
  {
    id: 'x402-fetch',
    name: 'x402 Fetch',
    category: 'protocols',
    npmPackage: 'x402-fetch',
    githubRepo: null,
    description: 'Fetch wrapper with automatic x402 payment — 7k weekly',
  },
  {
    id: 'x402-express-wrapper',
    name: 'x402 Express Wrapper',
    category: 'protocols',
    npmPackage: 'x402-express',
    githubRepo: null,
    description: 'Express middleware for x402 payments — 3.4k weekly',
  },
  {
    id: 'x402-axios',
    name: 'x402 Axios',
    category: 'protocols',
    npmPackage: 'x402-axios',
    githubRepo: null,
    description: 'Axios wrapper with automatic x402 payment — 3k weekly',
  },
  {
    id: 'x402-extensions',
    name: 'x402 Extensions',
    category: 'protocols',
    npmPackage: '@x402/extensions',
    githubRepo: 'coinbase/x402',
    description: 'x402 protocol extensions',
  },
  {
    id: 'x402-mcp',
    name: 'x402 MCP',
    category: 'protocols',
    npmPackage: 'x402-mcp',
    githubRepo: null,
    description: 'x402 protocol MCP server integration',
  },

  // ═══════════════════════════════════════════════════
  // WALLETS — Agent Wallets & Payment Tools
  // ═══════════════════════════════════════════════════
  {
    id: 'atxp-client',
    name: 'ATXP Client',
    category: 'wallets',
    npmPackage: '@atxp/client',
    githubRepo: null,
    description: 'ATXP agent payment client — pay-per-use MCP tools. 5.3k weekly.',
    website: 'https://atxp.email',
  },
  {
    id: 'mcpay',
    name: 'MCPay',
    category: 'wallets',
    npmPackage: 'mcpay',
    githubRepo: 'microchipgnu/MCPay',
    description: 'Payment infrastructure for MCP servers',
  },
  {
    id: 'cronos402',
    name: 'Cronos 402',
    category: 'wallets',
    npmPackage: 'cronos402',
    githubRepo: null,
    description: 'First MCP payment gateway for Cronos blockchain',
  },

  // ═══════════════════════════════════════════════════
  // CRYPTO — Blockchain & DeFi Agent Tools
  // ═══════════════════════════════════════════════════
  {
    id: 'coinbase-cdp-agentkit',
    name: 'Coinbase CDP AgentKit',
    category: 'crypto',
    npmPackage: null,
    githubRepo: 'coinbase/cdp-agentkit',
    description: 'Coinbase agent toolkit for onchain AI agents',
  },
  {
    id: 'near-mcp',
    name: 'NEAR MCP',
    category: 'crypto',
    npmPackage: null,
    githubRepo: 'nearai/near-mcp',
    description: 'NEAR blockchain MCP integration',
  },
  {
    id: 'armor-crypto-mcp',
    name: 'Armor Crypto MCP',
    category: 'crypto',
    npmPackage: 'armor-crypto-mcp',
    githubRepo: null,
    description: 'Cross-chain swaps for AI agents',
  },
  {
    id: 'coingecko-mcp',
    name: 'CoinGecko MCP',
    category: 'crypto',
    npmPackage: 'coingecko-mcp',
    githubRepo: null,
    description: 'Crypto price data MCP server',
  },
  {
    id: 'hive-crypto-mcp',
    name: 'Hive Intelligence',
    category: 'crypto',
    npmPackage: 'hive-crypto-mcp',
    githubRepo: 'hive-intel/hive-crypto-mcp',
    description: 'DeFi analytics and intelligence MCP',
  },

  // ═══════════════════════════════════════════════════
  // WALLETS (continued)
  // ═══════════════════════════════════════════════════
  {
    id: 'naturalpay',
    name: 'NaturalPay',
    category: 'wallets',
    npmPackage: '@naturalpay/sdk',
    githubRepo: null,
    description: 'Natural Payments SDK — AI agent payment infrastructure',
  },
  {
    id: 'paysentry',
    name: 'PaySentry',
    category: 'wallets',
    npmPackage: '@paysentry/control',
    githubRepo: null,
    description: 'Declarative policy engine for AI agent payment control',
  },
  {
    id: 'justpayai',
    name: 'JustPayAI',
    category: 'wallets',
    npmPackage: 'justpayai-mcp-server',
    githubRepo: null,
    description: 'MCP server for agent-to-agent payment marketplace',
  },
  {
    id: 'coinrailz-solana',
    name: 'Coinrailz Agent Payments',
    category: 'wallets',
    npmPackage: '@coinrailz/agent-payments-solana',
    githubRepo: null,
    description: 'Solana AI agent payment processing — non-custodial USDC',
  },
  {
    id: 'moon-banking',
    name: 'Moon Banking MCP',
    category: 'wallets',
    npmPackage: '@moonbanking/mcp-server',
    githubRepo: null,
    description: 'Moon Banking API MCP server',
  },
  {
    id: 'x402-hello',
    name: 'x402 Hello',
    category: 'protocols',
    npmPackage: 'x402-hello',
    githubRepo: null,
    description: 'Your first AI agent payment in 60 seconds — x402 starter',
  },

  // ═══════════════════════════════════════════════════
  // COMMERCE (continued)
  // ═══════════════════════════════════════════════════

  // ═══════════════════════════════════════════════════
  // PAYMENTS (continued) — from MCP directories
  // ═══════════════════════════════════════════════════
  {
    id: 'payman-ai',
    name: 'Payman AI',
    category: 'payments',
    npmPackage: 'payman-mcp-server',
    githubRepo: null,
    description: 'Payman AI agent payment MCP server',
  },
  {
    id: 'xero-mcp',
    name: 'Xero MCP',
    category: 'commerce',
    npmPackage: 'xero-mcp-server',
    githubRepo: null,
    description: 'Xero accounting/invoicing MCP server for AI agents',
    website: 'https://www.xero.com',
  },
  {
    id: 'multi-payment-mcp',
    name: 'Multi-Provider Payment MCP',
    category: 'payments',
    npmPackage: 'multi-provider-payment-mcp',
    githubRepo: null,
    description: 'Unified MCP server for Stripe + Paystack payments',
  },
  {
    id: 'infini-payment',
    name: 'Infini Payment MCP',
    category: 'wallets',
    npmPackage: 'infini-payment-mcp',
    githubRepo: null,
    description: 'USDC/USDT payment MCP server for AI agents',
  },

  // ═══════════════════════════════════════════════════
  // DATA — Data providers agents pay for
  // ═══════════════════════════════════════════════════
];

export function getMCPsByCategory(category: string | null): MCPConfig[] {
  if (!category || category === 'all') {
    return mcpRegistry;
  }
  return mcpRegistry.filter((mcp) => mcp.category === category);
}
