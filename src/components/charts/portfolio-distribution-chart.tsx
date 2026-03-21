"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { mockWalletSummary } from "@/lib/mock-data";
import { formatCompactCurrency } from "@/lib/formatters";
import { useEffect, useState } from "react";

const COLORS = [
    "#22c55e",
    "#06b6d4",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
];

type PortfolioDistributionChartProps = {
    tokens: typeof mockWalletSummary.tokens;
};

export function PortfolioDistributionChart({ tokens }: PortfolioDistributionChartProps) {
    const data = tokens.map((token) => ({
        name: token.symbol,
        value: token.valueUsd,
    }));

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-white">
                        Portfolio Distribution
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Asset allocation across wallet holdings.
                    </p>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                outerRadius={110}
                                paddingAngle={3}
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    border: "1px solid #1e293b",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                                formatter={(value, name) => [
                                    formatCompactCurrency(Number(value)),
                                    name,
                                ]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                    {mockWalletSummary.tokens.map((token, index) => {
                        const percentage =
                            (token.valueUsd / mockWalletSummary.totalValueUsd) * 100;

                        return (
                            <div
                                key={token.symbol}
                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {token.symbol}
                                        </p>
                                        <p className="text-xs text-slate-400">{token.name}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-medium text-white">
                                        {mounted ? formatCompactCurrency(token.valueUsd ?? 0) : "--"}
                                    </p>
                                    <p className="text-xs text-slate-400">
                                        {percentage.toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}