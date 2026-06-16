"use client";

import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { useCurrency } from "@/components/currency-provider";
import { useRouter } from "next/navigation";
import { SummaryCards } from "@/components/summary-cards";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/lib/types";
import { CURRENCIES, CurrencyCode } from "@/lib/currency";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    setFetching(true);
    setFetchError(false);
    try {
      const q = query(
        collection(db, "users", user.uid, "transactions"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
      setTransactions(data);
    } catch {
      setFetchError(true);
    } finally {
      setFetching(false);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user, fetchTransactions]);

  async function handleSignOut() {
    await signOut(auth);
    router.push("/login");
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xs text-muted-foreground tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    );
  }

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "U";
  const emailShort = user.email ?? "";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <span className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/70 shrink-0">
            Finance Tracker
          </span>

          <div className="flex items-center gap-1.5 ml-auto">
            {/* Currency selector */}
            <Select value={currency} onValueChange={(v) => setCurrency(v as CurrencyCode)}>
              <SelectTrigger
                size="sm"
                className="h-7 rounded-sm border-border/40 bg-transparent text-xs font-mono w-auto min-w-16 gap-1 px-2"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.code} value={c.code} className="text-xs font-mono">
                    {c.code} {c.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ThemeToggle />

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-7 px-2 rounded-sm text-xs text-muted-foreground hover:text-foreground gap-1.5"
                  />
                }
              >
                <span className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-medium text-foreground">
                  {initials}
                </span>
                <span className="hidden sm:block max-w-28 truncate">{emailShort}</span>
                <span className="opacity-40 text-[10px]">▾</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                <DropdownMenuItem className="text-xs text-muted-foreground cursor-default" disabled>
                  {emailShort}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-xs text-destructive focus:text-destructive"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8">
        <div
          className="opacity-0"
          style={{ animation: "fade-up 0.6s ease 0.05s forwards" }}
        >
          <SummaryCards transactions={transactions} />
        </div>

        <div
          className="opacity-0 pt-8"
          style={{ animation: "fade-up 0.6s ease 0.2s forwards" }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground">
              Transactions
              {transactions.length > 0 && (
                <span className="ml-2 text-muted-foreground/40 font-mono normal-case tracking-normal">
                  {transactions.length}
                </span>
              )}
            </p>
            <TransactionForm onAdded={fetchTransactions} />
          </div>

          {fetching ? (
            <div className="py-16 text-center">
              <p className="text-xs text-muted-foreground tracking-widest uppercase animate-pulse">
                Loading
              </p>
            </div>
          ) : fetchError ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-xs text-muted-foreground">Failed to load transactions.</p>
              <button
                onClick={fetchTransactions}
                className="text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                Retry
              </button>
            </div>
          ) : (
            <TransactionList transactions={transactions} onDeleted={fetchTransactions} />
          )}
        </div>
      </main>
    </div>
  );
}
