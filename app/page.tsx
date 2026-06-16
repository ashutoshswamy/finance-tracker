import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const TICKER = [
  { label: "SALARY", amount: "+$5,000", income: true },
  { label: "RENT", amount: "−$1,200", income: false },
  { label: "GROCERIES", amount: "−$340", income: false },
  { label: "FREELANCE", amount: "+$2,800", income: true },
  { label: "NETFLIX", amount: "−$15", income: false },
  { label: "INVESTMENT", amount: "+$800", income: true },
  { label: "TRANSPORT", amount: "−$120", income: false },
  { label: "HEALTH", amount: "−$90", income: false },
  { label: "SHOPPING", amount: "−$230", income: false },
];

const MOCK_TXS = [
  { date: "Jun 15", label: "Salary", cat: "income", amount: "+$5,000", income: true },
  { date: "Jun 14", label: "Groceries", cat: "food", amount: "−$340", income: false },
  { date: "Jun 13", label: "Netflix", cat: "entertainment", amount: "−$15", income: false },
  { date: "Jun 12", label: "Freelance", cat: "freelance", amount: "+$2,800", income: true },
  { date: "Jun 11", label: "Rent", cat: "housing", amount: "−$1,200", income: false },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 32s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover { animation-play-state: paused; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50%       { transform: translateY(-10px) rotate(-1deg); }
        }
        .card-float { animation: float 6s ease-in-out infinite; }

        .grain::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          background-size: 128px 128px;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.4;
        }
      `}</style>

      {/* ── Nav ─────────────────────────────────────── */}
      <nav className="border-b border-border/50 relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xs font-medium tracking-[0.28em] uppercase">
            Finance Tracker
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
            >
              Sign in →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Ticker tape ─────────────────────────────── */}
      <div
        className="overflow-hidden py-2.5 border-b border-border/30 shrink-0"
        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
      >
        <div className="ticker-track flex whitespace-nowrap w-max gap-0">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-5 text-[11px] font-mono tracking-widest"
            >
              <span style={{ opacity: 0.4 }}>·</span>
              <span className="font-medium">{item.label}</span>
              <span style={{ opacity: item.income ? 0.95 : 0.75 }}>{item.amount}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────── */}
      <section className="relative flex-1 grain overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 68% 45%, color-mix(in srgb, var(--accent) 8%, transparent), transparent)",
          }}
        />

        {/* Giant watermark "$" */}
        <div
          className="absolute select-none pointer-events-none font-light italic leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(280px, 45vw, 600px)",
            color: "var(--foreground)",
            opacity: 0.028,
            top: "-8%",
            right: "-4%",
            lineHeight: 1,
          }}
          aria-hidden
        >
          $
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center min-h-[calc(100svh-7rem)]">

          {/* ── Left: Copy ───────────────────── */}
          <div>
            <div className="opacity-0" style={{ animation: "fade-up 0.7s ease 0.15s forwards" }}>
              <h1
                className="font-light italic leading-[0.86] mb-8"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(4rem, 10.5vw, 9.5rem)",
                }}
              >
                <span className="block">Every</span>
                <span className="block">dollar.</span>
                <span className="block not-italic" style={{ color: "var(--accent)" }}>
                  Accounted.
                </span>
              </h1>
            </div>

            <div className="opacity-0" style={{ animation: "fade-up 0.7s ease 0.28s forwards" }}>
              <p className="text-[15px] text-muted-foreground max-w-[340px] leading-relaxed mb-10">
                Track income and expenses with brutal clarity.
                Know your balance. Always.
              </p>
            </div>

            <div
              className="opacity-0 flex flex-wrap gap-4 items-center mb-16"
              style={{ animation: "fade-up 0.7s ease 0.38s forwards" }}
            >
              <Link
                href="/register"
                className="inline-flex items-center gap-2 text-sm font-medium px-6 py-3 rounded-sm transition-opacity hover:opacity-80"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                Start tracking →
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
            </div>

            {/* Mini stats */}
            <div
              className="opacity-0 flex flex-wrap items-center gap-0 border-t border-border/40 pt-8"
              style={{ animation: "fade-up 0.7s ease 0.5s forwards" }}
            >
              {[
                { val: "8", label: "currencies" },
                { val: "10+", label: "categories" },
                { val: "∞", label: "transactions" },
              ].map((s, i) => (
                <div key={s.label} className="pr-6 mr-6 md:pr-8 md:mr-8 border-r border-border/40 last:border-0 last:pr-0 last:mr-0">
                  <p
                    className="text-3xl font-light tabular-nums leading-none mb-1"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {s.val}
                  </p>
                  <p className="text-[11px] text-muted-foreground tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Dashboard mockup ───────── */}
          <div
            className="opacity-0 hidden lg:block"
            style={{ animation: "fade-up 0.8s ease 0.3s forwards" }}
          >
            <div className="card-float">
              {/* Shadow layer (depth) */}
              <div
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-sm"
                style={{ background: "var(--accent)", opacity: 0.1 }}
              />

              {/* Main card */}
              <div
                className="relative rounded-sm border overflow-hidden"
                style={{
                  background: "var(--card)",
                  borderColor: "var(--border)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px var(--border)",
                }}
              >
                {/* Titlebar */}
                <div
                  className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ borderColor: "var(--border)", background: "color-mix(in srgb, var(--muted) 40%, transparent)" }}
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                    Finance Tracker
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--expense)", opacity: 0.7 }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--accent)", opacity: 0.8 }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--income)", opacity: 0.7 }} />
                  </div>
                </div>

                {/* Balance block */}
                <div className="px-5 pt-5 pb-4 border-b" style={{ borderColor: "var(--border)" }}>
                  <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-2">
                    Net Balance
                  </p>
                  <p
                    className="text-4xl font-light tabular-nums"
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      color: "var(--income)",
                    }}
                  >
                    $6,895.00
                  </p>
                  <div className="flex gap-6 mt-3.5">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Income</p>
                      <p
                        className="text-sm font-mono mt-0.5"
                        style={{ color: "var(--income)" }}
                      >
                        +$8,600
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Expenses</p>
                      <p
                        className="text-sm font-mono mt-0.5"
                        style={{ color: "var(--expense)" }}
                      >
                        −$1,705
                      </p>
                    </div>
                  </div>
                </div>

                {/* Transactions */}
                <div className="px-5 py-4">
                  <p className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                    Transactions
                  </p>
                  <div>
                    {MOCK_TXS.map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2.5 border-b last:border-0"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ background: tx.income ? "var(--income)" : "var(--expense)" }}
                          />
                          <div>
                            <p className="text-[11px] font-medium leading-none">{tx.label}</p>
                            <p className="text-[9px] text-muted-foreground mt-0.5">{tx.date} · {tx.cat}</p>
                          </div>
                        </div>
                        <p
                          className="text-[11px] font-mono tabular-nums"
                          style={{ color: tx.income ? "var(--income)" : "var(--expense)" }}
                        >
                          {tx.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
            {[
              {
                num: "01",
                title: "Simple",
                body: "Add any transaction in seconds. Income or expense, categorized and logged immediately.",
              },
              {
                num: "02",
                title: "Secure",
                body: "Firebase authentication. Your data stays private. Only you can see your finances.",
              },
              {
                num: "03",
                title: "Instant",
                body: "Balance updates the moment you add a transaction. Always accurate, always current.",
              },
            ].map((f) => (
              <div key={f.num} className="px-0 py-8 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 space-y-4">
                <p
                  className="text-xs font-mono font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {f.num}
                </p>
                <p className="text-sm font-medium tracking-wide">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────── */}
      <section
        className="border-t border-border/50 py-24 text-center relative overflow-hidden"
        style={{ background: "color-mix(in srgb, var(--foreground) 4%, var(--background))" }}
      >
        <div
          className="absolute pointer-events-none select-none font-light italic leading-none"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(160px, 28vw, 360px)",
            color: "var(--foreground)",
            opacity: 0.025,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
          }}
          aria-hidden
        >
          clarity.
        </div>
        <div className="relative max-w-2xl mx-auto px-6">
          <h2
            className="font-light italic mb-5 leading-[0.9]"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
            }}
          >
            Ready to see
            <br />
            <span style={{ color: "var(--accent)" }}>clearly?</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-10 max-w-xs mx-auto leading-relaxed">
            Take control of your finances. Free, private, and always up to date.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-sm transition-opacity hover:opacity-80"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Create free account →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────── */}
      <footer className="border-t border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs tracking-[0.22em] uppercase text-muted-foreground/40">
            Finance Tracker
          </span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground/40">
              Built by{" "}
              <a
                href="https://ashutoshswamy.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/70 hover:text-foreground underline underline-offset-3 transition-colors"
              >
                Ashutosh Swamy
              </a>
            </span>
            <span className="text-muted-foreground/20 text-xs">·</span>
            <a
              href="https://github.com/ashutoshswamy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/40 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground/20 text-xs">·</span>
            <span className="text-xs text-muted-foreground/40 font-mono">
              2025
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
