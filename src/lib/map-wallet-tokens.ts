import { WalletToken } from "./wallet";

type MoralisToken = {
  token_address?: string;
  symbol?: string;
  name?: string;
  decimals?: number;
  balance?: string;
  usd_price?: number;
  logo?: string;
  thumbnail?: string;
};

export function mapMoralisTokensToWalletTokens(
  items: MoralisToken[],
): WalletToken[] {
  return items
    .map((item) => {
      const decimals = Number(item.decimals ?? 18);
      const rawBalance = Number(item.balance ?? 0);
      const balance = rawBalance / Math.pow(10, decimals);
      const priceUsd = Number(item.usd_price ?? 0);
      const valueUsd = balance * priceUsd;
      const logo = item.logo;
      const thumbnail = item.thumbnail;

      return {
        address: item.token_address,
        symbol: item.symbol || "UNKNOWN",
        name: item.name || "Unknown Token",
        balance,
        priceUsd,
        valueUsd,
        logo: logo as string,
        thumbnail: thumbnail as string,
      };
    })
    .filter((token) => token.valueUsd > 0)
    .sort((a, b) => b.valueUsd - a.valueUsd);
}
