export type TransactionType = "income" | "expense";

export type Category =
  | "salary"
  | "freelance"
  | "investment"
  | "food"
  | "transport"
  | "housing"
  | "entertainment"
  | "health"
  | "shopping"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: number;
}

export const INCOME_CATEGORIES: Category[] = ["salary", "freelance", "investment", "other"];
export const EXPENSE_CATEGORIES: Category[] = [
  "food",
  "transport",
  "housing",
  "entertainment",
  "health",
  "shopping",
  "other",
];
