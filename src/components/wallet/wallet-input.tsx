"use client";

import { supportedChains, type SupportedChainKey } from "@/lib/chains";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type WalletInputProps = {
  value: string;
  chain: SupportedChainKey;
  onChange: (value: string) => void;
  onChainChange: (chain: SupportedChainKey) => void;
  onAnalyze?: (address: string) => void;
  error?: string;
  isLoading?: boolean;
};

function ChainIcon({ src, className }: { src: string; className?: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={20}
      height={20}
      className={[
        "size-5 shrink-0 rounded-full object-cover",
        className ?? "",
      ].join(" ")}
      aria-hidden
    />
  );
}

export function WalletInput({
  value,
  chain,
  onChange,
  onChainChange,
  onAnalyze,
  error,
  isLoading = false,
}: WalletInputProps) {
  const [chainMenuOpen, setChainMenuOpen] = useState(false);
  const chainMenuRef = useRef<HTMLDivElement>(null);

  const selectedChain = supportedChains.find((c) => c.value === chain);

  useEffect(() => {
    if (!chainMenuOpen) {
      return;
    }
    function closeOnPointerDown(ev: PointerEvent) {
      if (!chainMenuRef.current?.contains(ev.target as Node)) {
        setChainMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeOnPointerDown);
    return () => document.removeEventListener("pointerdown", closeOnPointerDown);
  }, [chainMenuOpen]);

  useEffect(() => {
    if (!chainMenuOpen) {
      return;
    }
    function onKeyDown(ev: KeyboardEvent) {
      if (ev.key === "Escape") {
        setChainMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [chainMenuOpen]);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Web3 Wallet Analyzer
      </h1>
      <p className="mt-2 text-sm text-slate-400">
        Analyze any EVM wallet and explore token balances, portfolio value, and
        asset distribution.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_minmax(11rem,auto)_auto]">
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

        <div ref={chainMenuRef} className="relative">
          <button
            type="button"
            id="chain-select-button"
            aria-haspopup="listbox"
            aria-expanded={chainMenuOpen}
            aria-controls="chain-select-list"
            onClick={() => setChainMenuOpen((o) => !o)}
            className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-3 text-left text-sm text-white focus:outline-none focus:ring-2 focus:ring-slate-500/50"
          >
            <span className="flex min-w-0 items-center gap-2">
              {selectedChain ? (
                <ChainIcon src={selectedChain.iconUrl} />
              ) : null}
              <span className="truncate">{selectedChain?.label ?? chain}</span>
            </span>
            <svg
              className={[
                "size-4 shrink-0 text-slate-400 transition",
                chainMenuOpen ? "rotate-180" : "",
              ].join(" ")}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {chainMenuOpen ? (
            <ul
              id="chain-select-list"
              role="listbox"
              aria-labelledby="chain-select-button"
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-64 overflow-auto rounded-xl border border-slate-800 bg-slate-950 py-1 shadow-lg shadow-black/40"
            >
              {supportedChains.map((item) => (
                <li key={item.value} role="presentation">
                  <button
                    type="button"
                    role="option"
                    aria-selected={item.value === chain}
                    onClick={() => {
                      onChainChange(item.value);
                      setChainMenuOpen(false);
                    }}
                    className={[
                      "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-white transition hover:bg-slate-800/80",
                      item.value === chain ? "bg-slate-800/50" : "",
                    ].join(" ")}
                  >
                    <ChainIcon src={item.iconUrl} />
                    <span className="truncate">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

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
