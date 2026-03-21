'use client'
import { PortfolioDistributionChart } from "@/components/charts/portfolio-distribution-chart";
import { TokenTable } from "@/components/wallet/token-table";
import { TopHoldings } from "@/components/wallet/top-holdings";
import { WalletInput } from "@/components/wallet/wallet-input";
import { WalletOverview } from "@/components/wallet/wallet-overview";
import { mockWalletSummary } from "@/lib/mock-data";
import { useState } from "react";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState(mockWalletSummary.address);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <WalletInput
          value={walletAddress}
          onChange={setWalletAddress}
          onAnalyze={setWalletAddress}
        />
        <WalletOverview address={walletAddress} />
        <TopHoldings />
        <PortfolioDistributionChart />
        <TokenTable />
      </div>
    </main>
  );
}
