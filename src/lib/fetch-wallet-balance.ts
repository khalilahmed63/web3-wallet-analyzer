import { formatEther, isAddress } from "viem";
import { getPublicClient, type SupportedChainKey } from "@/lib/viem-client";

export async function fetchNativeBalance(
  address: string,
  chain: SupportedChainKey,
) {
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address.");
  }

  const client = getPublicClient(chain);

  const balanceWei = await client.getBalance({
    address,
  });

  const balance = Number(formatEther(balanceWei));

  return {
    balanceWei,
    balance,
  };
}