import { mockWalletSummary } from "@/lib/mock-data";
import { truncateAddress } from "@/lib/formatters";
import { SafeCurrency } from "@/lib/formatCompactCurrency";

type WalletOverviewProps = {
    address?: string;
    ethBalance?: number | null;
    totalValueUsd: number;
    assetsCount: number;
};

export function WalletOverview({
    address,
    ethBalance,
    totalValueUsd,
    assetsCount,
}: WalletOverviewProps) {
    const displayAddress = address || mockWalletSummary.address;

    return (
        <div className="grid gap-4 md:grid-cols-4">
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
                    ETH Balance
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                    {ethBalance !== null && ethBalance !== undefined
                        ? `${ethBalance.toFixed(4)} ETH`
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