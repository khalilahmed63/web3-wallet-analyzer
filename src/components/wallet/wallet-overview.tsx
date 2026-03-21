"use client";

import { formatCompactCurrency, truncateAddress } from "@/lib/formatters";
import { supportedChains } from "@/lib/chains";
import { SafeCurrency } from "@/lib/formatCompactCurrency";

type WalletOverviewProps = {
    address?: string;
    chain: string;
    nativeBalance?: number | null;
    totalValueUsd: number;
    assetsCount: number;
};

export function WalletOverview({
    address,
    chain,
    nativeBalance,
    totalValueUsd,
    assetsCount,
}: WalletOverviewProps) {
    const selectedChain =
        supportedChains.find((item) => item.value === chain)?.label ?? chain;

    return (
        <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Wallet Address
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                    {address ? truncateAddress(address) : "--"}
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">Chain</p>
                <p className="mt-2 text-sm font-medium text-white">{selectedChain}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Native Balance
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    {nativeBalance !== null && nativeBalance !== undefined
                        ? nativeBalance.toFixed(4)
                        : "--"}
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Total Portfolio Value
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    <SafeCurrency value={totalValueUsd} />
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Assets Held
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    {assetsCount}
                </p>
            </div>
        </div>
    );
}