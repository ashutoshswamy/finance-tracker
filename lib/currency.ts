export const CURRENCIES = [
  { code: "USD", symbol: "$", label: "USD — US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR — Euro" },
  { code: "GBP", symbol: "£", label: "GBP — British Pound" },
  { code: "INR", symbol: "₹", label: "INR — Indian Rupee" },
  { code: "JPY", symbol: "¥", label: "JPY — Japanese Yen" },
  { code: "CAD", symbol: "CA$", label: "CAD — Canadian Dollar" },
  { code: "AUD", symbol: "A$", label: "AUD — Australian Dollar" },
  { code: "CHF", symbol: "Fr", label: "CHF — Swiss Franc" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];
