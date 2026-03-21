'use client'
import { PortfolioDistributionChart } from "@/components/charts/portfolio-distribution-chart";
import { TokenTable } from "@/components/wallet/token-table";
import { TopHoldings } from "@/components/wallet/top-holdings";
import { WalletInput } from "@/components/wallet/wallet-input";
import { WalletOverview } from "@/components/wallet/wallet-overview";
import { SupportedChainKey } from "@/lib/chains";
import { fetchNativeBalance } from "@/lib/fetch-wallet-balance";
import { mapMoralisTokensToWalletTokens } from "@/lib/map-wallet-tokens";
import { mockWalletSummary } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import { isAddress } from "viem";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(mockWalletSummary.address);
  const [inputAddress, setInputAddress] = useState(mockWalletSummary.address);
  const [tokens, setTokens] = useState(mockWalletSummary.tokens);
  const [selectedChain, setSelectedChain] = useState<SupportedChainKey>("eth");
  const [totalValueUsd, setTotalValueUsd] = useState(mockWalletSummary.totalValueUsd);
  const [nativeBalance, setNativeBalance] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze(address: string) {
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setError("Please enter a wallet address.");
      return;
    }

    if (!isAddress(trimmedAddress)) {
      setError("Please enter a valid EVM wallet address.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const result = await fetchNativeBalance(trimmedAddress, selectedChain);

      const nativePrice =
        selectedChain === "polygon"
          ? 1.1
          : selectedChain === "bsc"
            ? 600
            : 3500;

      const response = await fetch(
        `/api/wallet?address=${encodeURIComponent(trimmedAddress)}&chain=${selectedChain}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch wallet tokens.");
      }

      const tokenItems = Array.isArray(data)
        ? data
        : Array.isArray(data.result)
          ? data.result
          : [];

      const realTokens = mapMoralisTokensToWalletTokens(tokenItems);

      const nativeSymbol =
        selectedChain === "polygon"
          ? "MATIC"
          : selectedChain === "bsc"
            ? "BNB"
            : "ETH";

      const nativeName =
        selectedChain === "polygon"
          ? "Polygon"
          : selectedChain === "bsc"
            ? "BNB"
            : "Ethereum";

      const tokensWithNative = realTokens.some(
        (token) => token.symbol === nativeSymbol,
      )
        ? realTokens.map((token) =>
          token.symbol === nativeSymbol
            ? {
              ...token,
              balance: result.balance,
              priceUsd: nativePrice,
              valueUsd: result.balance * nativePrice,
              logo: token.logo,
              thumbnail: token.thumbnail
            }
            : token,
        )
        : [
          {
            symbol: nativeSymbol,
            name: nativeName,
            balance: result.balance,
            priceUsd: nativePrice,
            valueUsd: result.balance * nativePrice,
            logo: "",
            thumbnail: ""
          },
          ...realTokens,
        ];

      const total = tokensWithNative.reduce(
        (sum, token) => sum + token.valueUsd,
        0,
      );

      setWalletAddress(trimmedAddress);
      setTokens(tokensWithNative);
      setTotalValueUsd(total);
      setNativeBalance(result.balance);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch wallet balance.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
  if (walletAddress) {
    handleAnalyze(walletAddress);
  }
}, [selectedChain]);


  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <WalletInput
          value={inputAddress}
          chain={selectedChain}
          onChange={setInputAddress}
          onChainChange={setSelectedChain}
          onAnalyze={handleAnalyze}
          error={error}
          isLoading={isLoading}
        />

        <WalletOverview
          address={walletAddress}
          chain={selectedChain}
          nativeBalance={nativeBalance}
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
            <PortfolioDistributionChart
              tokens={tokens}
              totalValueUsd={totalValueUsd}
            />
            <TokenTable tokens={tokens} />
          </>
        )}
      </div>
    </main>
  );
}
