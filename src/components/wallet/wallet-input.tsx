"use client";

import { supportedChains } from "@/lib/chains";

type WalletInputProps = {
  value: string;
  chain: string;
  onChange: (value: string) => void;
  onChainChange: (chain: string) => void;
  onAnalyze?: (address: string) => void;
  error?: string;
  isLoading?: boolean;
};

export function WalletInput({
  value,
  chain,
  onChange,
  onChainChange,
  onAnalyze,
  error,
  isLoading = false,
}: WalletInputProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Web3 Wallet Analyzer
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Analyze any EVM wallet and explore token balances, portfolio value, and
        asset distribution.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_180px_auto]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste wallet address (e.g. 0x...)"
          className={[
            "rounded-xl border bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none",
            error ? "border-red-500/60" : "border-slate-800",
          ].join(" ")}
        />

        <select
          value={chain}
          onChange={(e) => onChainChange(e.target.value)}
          className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white focus:outline-none"
        >
          {supportedChains.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onAnalyze?.(value)}
          disabled={isLoading}
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Analyzing..." : "Analyze Wallet"}
        </button>
      </div>

      {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}