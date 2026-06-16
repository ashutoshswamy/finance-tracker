import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { CurrencyProvider } from "@/components/currency-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Finance Tracker",
    template: "%s · Finance Tracker",
  },
  description: "Track income and expenses with brutal clarity. Know your balance. Always.",
  openGraph: {
    title: "Finance Tracker",
    description: "Track income and expenses with brutal clarity. Know your balance. Always.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Finance Tracker",
    description: "Track income and expenses with brutal clarity. Know your balance. Always.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ErrorBoundary>
            <AuthProvider>
              <CurrencyProvider>
                {children}
                <Toaster />
              </CurrencyProvider>
            </AuthProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
