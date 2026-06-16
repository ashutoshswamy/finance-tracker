"use client";

import { Transaction } from "@/lib/types";
import { useCurrency } from "@/components/currency-provider";

export function SummaryCards({ transactions }: { transactions: Transaction[] }) {
  const { format } = useCurrency();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="space-y-1">
      {/* Balance — hero stat */}
      <div className="py-8 border-b border-border/50">
        <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
          Net balance
        </p>
        <p
          className="text-[clamp(2.5rem,8vw,4.5rem)] leading-none font-mono font-light tabular-nums"
          style={{
            color: balance >= 0
              ? "var(--income)"
              : "var(--expense)",
          }}
        >
          {balance < 0 ? "−" : ""}{format(balance)}
        </p>
      </div>

      {/* Income + Expenses */}
      <div className="grid grid-cols-2 gap-0 pt-1">
        <div className="py-5 pr-6">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Income</p>
          <p
            className="text-xl font-mono tabular-nums font-light"
            style={{ color: "var(--income)" }}
          >
            +{format(income)}
          </p>
        </div>
        <div className="py-5 pl-6 border-l border-border/50">
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Expenses</p>
          <p
            className="text-xl font-mono tabular-nums font-light"
            style={{ color: "var(--expense)" }}
          >
            −{format(expenses)}
          </p>
        </div>
      </div>
    </div>
  );
}
