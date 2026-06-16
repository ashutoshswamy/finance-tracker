"use client";

import { useState } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Transaction,
  TransactionType,
  Category,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "@/lib/types";

interface Props {
  onAdded: () => void;
  transaction?: Transaction;
  trigger?: React.ReactNode;
}

export function TransactionForm({ onAdded, transaction, trigger }: Props) {
  const { user } = useAuth();
  const isEdit = !!transaction;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<TransactionType>(transaction?.type ?? "expense");
  const [amount, setAmount] = useState(transaction ? String(transaction.amount) : "");
  const [category, setCategory] = useState<Category | "">(transaction?.category ?? "");
  const [description, setDescription] = useState(transaction?.description ?? "");
  const [date, setDate] = useState(transaction?.date ?? new Date().toISOString().split("T")[0]);

  const categories = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      if (isEdit) {
        setType(transaction.type);
        setAmount(String(transaction.amount));
        setCategory(transaction.category);
        setDescription(transaction.description ?? "");
        setDate(transaction.date);
      } else {
        setType("expense");
        setAmount("");
        setCategory("");
        setDescription("");
        setDate(new Date().toISOString().split("T")[0]);
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !category) return;
    setLoading(true);
    try {
      if (isEdit) {
        await updateDoc(doc(db, "users", user.uid, "transactions", transaction.id), {
          type,
          amount: parseFloat(amount),
          category,
          description,
          date,
        });
        toast.success("Transaction updated");
      } else {
        await addDoc(collection(db, "users", user.uid, "transactions"), {
          type,
          amount: parseFloat(amount),
          category,
          description,
          date,
          createdAt: Date.now(),
        });
        toast.success("Transaction added");
      }
      setOpen(false);
      onAdded();
    } catch {
      toast.error(isEdit ? "Failed to update" : "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  }

  const formBody = (
    <form onSubmit={handleSubmit} className="space-y-5 mt-1">
      <div className="flex gap-0 border border-border/60 rounded-sm overflow-hidden">
        <button
          type="button"
          onClick={() => { setType("expense"); setCategory(""); }}
          className={`flex-1 py-1.5 text-xs transition-colors ${
            type === "expense"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => { setType("income"); setCategory(""); }}
          className={`flex-1 py-1.5 text-xs transition-colors border-l border-border/60 ${
            type === "income"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Income
        </button>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs tracking-wide uppercase text-muted-foreground">Amount</Label>
        <Input
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 py-2 text-sm font-mono focus-visible:ring-0 focus-visible:border-foreground/40 transition-colors placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs tracking-wide uppercase text-muted-foreground">Category</Label>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 h-9 text-sm focus:ring-0 focus:border-foreground/40 transition-colors">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c} className="text-sm">
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs tracking-wide uppercase text-muted-foreground">
          Description{" "}
          <span className="text-muted-foreground/40 normal-case tracking-normal">(optional)</span>
        </Label>
        <Input
          placeholder="Note"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 py-2 text-sm focus-visible:ring-0 focus-visible:border-foreground/40 transition-colors placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs tracking-wide uppercase text-muted-foreground">Date</Label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 py-2 text-sm focus-visible:ring-0 focus-visible:border-foreground/40 transition-colors"
        />
      </div>

      <Button type="submit" className="w-full rounded-sm text-sm h-9 mt-2" disabled={loading}>
        {loading ? "Saving…" : isEdit ? "Save changes" : "Save transaction"}
      </Button>
    </form>
  );

  const dialogContent = (
    <DialogContent className="sm:max-w-sm">
      <DialogHeader>
        <DialogTitle
          className="text-2xl font-light italic"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {isEdit ? "Edit transaction" : "New transaction"}
        </DialogTitle>
      </DialogHeader>
      {formBody}
    </DialogContent>
  );

  /* Edit mode — controlled Dialog, external trigger button */
  if (isEdit) {
    return (
      <>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="contents"
          aria-label="Edit transaction"
        >
          {trigger}
        </button>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          {dialogContent}
        </Dialog>
      </>
    );
  }

  /* Add mode — DialogTrigger inside Dialog */
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button size="sm" className="rounded-sm text-xs h-7 px-3" />}>
        + Add
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
