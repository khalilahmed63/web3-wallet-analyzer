'use client'

import { mockWalletSummary } from "@/lib/mock-data";
import { formatCompactCurrency } from "@/lib/formatters";
import { useEffect, useState } from "react";

type TokenTableProps = {
    tokens: typeof mockWalletSummary.tokens;
};

export function TokenTable({ tokens }: TokenTableProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-lg font-semibold text-white">Token Balances</h2>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-800">
                <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-800 bg-slate-950/70 text-xs uppercase tracking-wide text-slate-400">
                        <tr>
                            <th className="px-6 py-4">Token</th>
                            <th className="px-6 py-4">Balance</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Value</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-800">
                        {tokens.map((token) => (
                            <tr key={token.symbol} className="hover:bg-slate-800/60">
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-white">{token.symbol}</p>
                                        <p className="text-xs text-slate-400">{token.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-300">{token.balance}</td>
                                <td className="px-6 py-4 text-slate-300">
                                    {mounted ? formatCompactCurrency(token.priceUsd ?? 0) : "--"}

                                </td>
                                <td className="px-6 py-4 font-medium text-white">
                                    {mounted ? formatCompactCurrency(token.valueUsd ?? 0) : "--"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}