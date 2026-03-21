export function formatCurrency(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
}

export function formatCompactCurrency(value: number = 0) {
  if (typeof window === "undefined") {
    return "$--"; // fallback during SSR
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function truncateAddress(address: string, start = 6, end = 4) {
  if (!address) return "";
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}
