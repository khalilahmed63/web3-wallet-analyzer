'use client'
import { mockWalletSummary } from "@/lib/mock-data";
import { formatCompactCurrency, truncateAddress } from "@/lib/formatters";
import { useEffect, useState } from "react";

type WalletOverviewProps = {
    address?: string;
};

export function WalletOverview({ address }: WalletOverviewProps) {
    const displayAddress = address || mockWalletSummary.address;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Wallet Address
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                    {truncateAddress(displayAddress)}
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Total Portfolio Value
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    {mounted ? formatCompactCurrency(mockWalletSummary.totalValueUsd ?? 0) : "--"}
                </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    Assets Held
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    {mockWalletSummary.tokens.length}
                </p>
            </div>
        </div>
    );
}