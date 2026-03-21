import { useEffect, useState } from "react";
import { formatCompactCurrency } from "./formatters";

export function SafeCurrency({ value }: { value: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <>--</>;

  return <>{formatCompactCurrency(value)}</>;
}