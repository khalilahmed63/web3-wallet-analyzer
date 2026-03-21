import { WalletSummary } from "./wallet";

export const mockWalletSummary: WalletSummary = {
  address: "0x2F9c7A4bB9B84A2c3a7f7A06E1E4C5B6D7E8F901",
  totalValueUsd: 28640.75,
  tokens: [
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 2.45,
      priceUsd: 3450.12,
      valueUsd: 8452.79,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 6400,
      priceUsd: 1,
      valueUsd: 6400,
    },
    {
      symbol: "WBTC",
      name: "Wrapped Bitcoin",
      balance: 0.12,
      priceUsd: 68250.55,
      valueUsd: 8190.07,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      balance: 1800,
      priceUsd: 1.12,
      valueUsd: 2016,
    },
    {
      symbol: "TEL",
      name: "Telcoin",
      balance: 78000,
      priceUsd: 0.0072,
      valueUsd: 561.6,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      balance: 3020,
      priceUsd: 1,
      valueUsd: 3020,
    },
  ],
};