"use client";

import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { useCurrency } from "@/components/currency-provider";
import { TransactionForm } from "@/components/transaction-form";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { Transaction } from "@/lib/types";

interface Props {
  transactions: Transaction[];
  onDeleted: () => void;
}

export function TransactionList({ transactions, onDeleted }: Props) {
  const { user } = useAuth();
  const { format } = useCurrency();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!user) return;
    setDeleting(id);
    try {
      await deleteDoc(doc(db, "users", user.uid, "transactions", id));
      toast.success("Deleted");
      onDeleted();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeleting(null);
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-xs text-muted-foreground tracking-wide">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div>
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="group flex items-center justify-between py-3.5 border-b border-border/40 last:border-0"
        >
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: tx.type === "income" ? "var(--income)" : "var(--expense)" }}
            />
            <div className="min-w-0">
              <p className="text-sm text-foreground truncate">
                {tx.description || tx.category.charAt(0).toUpperCase() + tx.category.slice(1)}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {tx.date}
                <span className="mx-1.5 opacity-30">·</span>
                {tx.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            <span
              className="text-sm font-mono tabular-nums"
              style={{ color: tx.type === "income" ? "var(--income)" : "var(--expense)" }}
            >
              {tx.type === "income" ? "+" : "−"}{format(tx.amount)}
            </span>

            {/* Edit */}
            <TransactionForm
              transaction={tx}
              onAdded={onDeleted}
              trigger={
                <span className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 text-muted-foreground/40 hover:text-foreground rounded-sm">
                  <Pencil className="w-3 h-3" />
                </span>
              }
            />

            {/* Delete */}
            <button
              onClick={() => handleDelete(tx.id)}
              disabled={deleting === tx.id}
              className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 text-muted-foreground/40 hover:text-destructive transition-all text-lg leading-none disabled:opacity-30"
              aria-label="Delete"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
