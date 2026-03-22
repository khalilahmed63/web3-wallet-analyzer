export type WalletToken = {
  address?: string;
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  valueUsd: number;
  logo: string;
  thumbnail: string;
};

export type WalletSummary = {
  address: string;
  totalValueUsd: number;
  tokens: WalletToken[];
};

export type RealEthBalance = {
  balanceEth: number;
};
