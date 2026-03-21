import { mockWalletSummary } from "@/lib/mock-data";
import { SafeCurrency } from "@/lib/formatCompactCurrency";

export function TopHoldings() {
  const topHoldings = [...mockWalletSummary.tokens]
    .sort((a, b) => b.valueUsd - a.valueUsd)
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Top Holdings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Largest assets in the analyzed wallet.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {topHoldings.map((token, index) => {
          const percentage =
            (token.valueUsd / mockWalletSummary.totalValueUsd) * 100;

          return (
            <div
              key={token.symbol}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {token.symbol}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{token.name}</p>
                </div>

                <span className="rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-[11px] text-slate-300">
                  #{index + 1}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Value
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    <SafeCurrency value={token.valueUsd} />
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Balance
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-200">
                    {token.balance} {token.symbol}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Portfolio Share
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-400">
                    {percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}