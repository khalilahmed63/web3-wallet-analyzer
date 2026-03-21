import { TokenTable } from "@/components/wallet/token-table";
import { WalletInput } from "@/components/wallet/wallet-input";
import { WalletOverview } from "@/components/wallet/wallet-overview";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <WalletInput />
        <WalletOverview />
        <TokenTable />
      </div>
    </main>
  );
}
