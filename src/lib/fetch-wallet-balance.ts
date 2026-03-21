import { formatEther, isAddress } from "viem";
import { publicClient } from "@/lib/viem-client";

export async function fetchEthBalance(address: string) {
  if (!isAddress(address)) {
    throw new Error("Invalid Ethereum address.");
  }

  const balanceWei = await publicClient.getBalance({
    address,
  });

  const balanceEth = Number(formatEther(balanceWei));

  return {
    balanceWei,
    balanceEth,
  };
}