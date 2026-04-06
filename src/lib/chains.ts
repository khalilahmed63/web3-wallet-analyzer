export type SupportedChainKey = "eth" | "polygon" | "base" | "arbitrum" | "bsc";

export type SupportedChain = {
  label: string;
  value: SupportedChainKey;
  /** Chain logo (PNG), shown in the chain picker */
  iconUrl: string;
};

export const supportedChains: SupportedChain[] = [
  {
    label: "Ethereum",
    value: "eth",
    iconUrl: "/chains/eth.svg",
  },
  {
    label: "Polygon",
    value: "polygon",
    iconUrl: "/chains/polygon.svg",
  },
  {
    label: "Base",
    value: "base",
    iconUrl: "/chains/base.svg",
  },
  {
    label: "Arbitrum",
    value: "arbitrum",
    iconUrl: "/chains/arbitrum.svg",
  },
  {
    label: "BNB Chain",
    value: "bsc",
    iconUrl: "/chains/bsc.svg",
  },
];
