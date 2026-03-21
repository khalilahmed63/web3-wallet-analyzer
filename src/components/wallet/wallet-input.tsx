"use client";

type WalletInputProps = {
  value: string;
  onChange: (value: string) => void;
  onAnalyze?: (address: string) => void;
};

export function WalletInput({
  value,
  onChange,
  onAnalyze,
}: WalletInputProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Web3 Wallet Analyzer
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Analyze any Ethereum wallet and explore token balances, portfolio value,
        and asset distribution.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste wallet address (e.g. 0x...)"
          className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => onAnalyze?.(value)}
          className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
        >
          Analyze Wallet
        </button>
      </div>
    </div>
  );
}