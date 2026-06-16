"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: "USD",
  setCurrency: () => {},
  format: (n) => `$${Math.abs(n).toFixed(2)}`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("ft-currency") as CurrencyCode | null;
    if (saved && CURRENCIES.find((c) => c.code === saved)) {
      setCurrencyState(saved);
    }
  }, []);

  function setCurrency(c: CurrencyCode) {
    setCurrencyState(c);
    localStorage.setItem("ft-currency", c);
  }

  function format(amount: number) {
    if (!mounted) return `$${Math.abs(amount).toFixed(2)}`;
    const cur = CURRENCIES.find((c) => c.code === currency)!;
    const decimals = currency === "JPY" ? 0 : 2;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: cur.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(Math.abs(amount));
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
