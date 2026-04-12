import { createPublicClient, http } from "viem";
import { mainnet, polygon, base, arbitrum, bsc } from "viem/chains";

const chainMap = {
  eth: mainnet,
  polygon,
  base,
  arbitrum,
  bsc,
};

export type SupportedChainKey = keyof typeof chainMap;

export function getPublicClient(chain: SupportedChainKey) {
  return createPublicClient({
    chain: chainMap[chain],
    transport: http("https://ethereum.publicnode.com"),
    // transport: http(),
  });
}
