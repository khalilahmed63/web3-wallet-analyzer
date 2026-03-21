'use client'
import { PortfolioDistributionChart } from "@/components/charts/portfolio-distribution-chart";
import { TokenTable } from "@/components/wallet/token-table";
import { TopHoldings } from "@/components/wallet/top-holdings";
import { WalletInput } from "@/components/wallet/wallet-input";
import { WalletOverview } from "@/components/wallet/wallet-overview";
import { fetchEthBalance } from "@/lib/fetch-wallet-balance";
import { mapMoralisTokensToWalletTokens } from "@/lib/map-wallet-tokens";
import { mockWalletSummary } from "@/lib/mock-data";
import { useState } from "react";
import { isAddress } from "viem";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(mockWalletSummary.address);
  const [inputAddress, setInputAddress] = useState(mockWalletSummary.address);
  const [tokens, setTokens] = useState(mockWalletSummary.tokens);
  const [totalValueUsd, setTotalValueUsd] = useState(mockWalletSummary.totalValueUsd);
  const [ethBalance, setEthBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze(address: string) {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError("Please enter a wallet address.");
      return;
    }

    if (!isAddress(trimmedAddress)) {
      setError("Please enter a valid Ethereum wallet address.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await fetchEthBalance(trimmedAddress);
      const ethPrice = 3500;
      const response = await fetch(
        `/api/wallet?address=${encodeURIComponent(trimmedAddress)}&chain=polygon`
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch wallet tokens.");
      }

      const realTokens = mapMoralisTokensToWalletTokens(
        Array.isArray(data.result
        ) ? data.result
          : []
      );

      const tokensWithRealEth = realTokens.some((token) => token.symbol === "ETH")
        ? realTokens.map((token) =>
          token.symbol === "ETH"
            ? {
              ...token,
              balance: result.balanceEth,
              priceUsd: ethPrice,
              valueUsd: result.balanceEth * ethPrice,
              logo: token.logo,
              thumbnail: token.thumbnail,
            }
            : token
        )
        : [
          {
            symbol: "ETH",
            name: "Ethereum",
            balance: result.balanceEth,
            priceUsd: ethPrice,
            valueUsd: result.balanceEth * ethPrice,
            logo: "",
            thumbnail: "",

          },
          ...realTokens,
        ];

      const total = tokensWithRealEth.reduce(
        (sum, token) => sum + token.valueUsd,
        0
      );

      setWalletAddress(trimmedAddress);
      setTokens(tokensWithRealEth);
      setTotalValueUsd(total);
      setEthBalance(result.balanceEth);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch wallet balance."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <WalletInput
          value={inputAddress}
          onChange={setInputAddress}
          onAnalyze={handleAnalyze}
          error={error}
          isLoading={isLoading}
        />

        <WalletOverview
          address={walletAddress}
          ethBalance={ethBalance}
          totalValueUsd={totalValueUsd}
          assetsCount={tokens.length}
        />

        {isLoading ? (
          <>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-40 rounded bg-slate-800" />
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="h-32 rounded-2xl bg-slate-800" />
                  <div className="h-32 rounded-2xl bg-slate-800" />
                  <div className="h-32 rounded-2xl bg-slate-800" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 w-48 rounded bg-slate-800" />
                <div className="h-80 rounded-2xl bg-slate-800" />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-6 w-40 rounded bg-slate-800" />
                <div className="h-12 rounded bg-slate-800" />
                <div className="h-12 rounded bg-slate-800" />
                <div className="h-12 rounded bg-slate-800" />
                <div className="h-12 rounded bg-slate-800" />
              </div>
            </div>
          </>
        ) : (
          <>
            <TopHoldings tokens={tokens} totalValueUsd={totalValueUsd} />
            <PortfolioDistributionChart tokens={tokens} totalValueUsd={totalValueUsd} />
            <TokenTable tokens={tokens} />
          </>
        )}
      </div>
    </main>
  );
}
