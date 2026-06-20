"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) router.push("/dashboard");
    }).catch((err: unknown) => {
      const code = (err as { code?: string }).code ?? "";
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(code ? `${code}: ${message}` : message);
    });
  }, [router]);

  async function handleGoogleSignIn() {
    setGoogleLoading(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(code ? `${code}: ${message}` : message);
      setGoogleLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(code ? `${code}: ${message}` : message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/80 hover:text-foreground transition-colors"
          >
            Finance Tracker
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div
          className="w-full max-w-sm opacity-0"
          style={{ animation: "fade-up 0.6s ease 0.1s forwards" }}
        >
          <div className="mb-10">
            <h1
              className="text-5xl font-light italic mb-2"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Welcome back.
            </h1>
            <p className="text-sm text-muted-foreground">Sign in to your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs tracking-wide uppercase text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-0 border-b border-border/60 rounded-none px-0 py-2 text-sm focus-visible:ring-0 focus-visible:border-foreground/40 transition-colors placeholder:text-muted-foreground/40"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs tracking-wide uppercase text-muted-foreground">
                Password
              </Label>
              <PasswordInput
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                inputClassName="bg-transparent border-0 border-b border-border/60 rounded-none px-0 py-2 text-sm focus-visible:ring-0 focus-visible:border-foreground/40 transition-colors placeholder:text-muted-foreground/40"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full rounded-sm text-sm font-medium h-9"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign in"}
              </Button>
            </div>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t border-border/40" />
            <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">or</span>
            <div className="flex-1 border-t border-border/40" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-sm text-sm h-9 border-border/60 gap-2.5"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || loading}
          >
            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            {googleLoading ? "Signing in…" : "Continue with Google"}
          </Button>

          <p className="text-center text-xs text-muted-foreground mt-8">
            No account?{" "}
            <Link href="/register" className="text-foreground/70 hover:text-foreground underline underline-offset-4 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
