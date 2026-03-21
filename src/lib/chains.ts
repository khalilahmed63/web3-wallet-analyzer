export type SupportedChain = {
  label: string;
  value: string;
};

export const supportedChains: SupportedChain[] = [
  { label: "Ethereum", value: "eth" },
  { label: "Polygon", value: "polygon" },
  { label: "Base", value: "base" },
  { label: "Arbitrum", value: "arbitrum" },
  { label: "BNB Chain", value: "bsc" },
];