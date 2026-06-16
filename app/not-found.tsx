import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-6">
        <p
          className="text-[clamp(6rem,20vw,12rem)] font-light italic leading-none"
          style={{ fontFamily: "var(--font-cormorant)", color: "var(--accent)", opacity: 0.4 }}
        >
          404
        </p>
        <p
          className="text-3xl font-light italic"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Page not found.
        </p>
        <p className="text-sm text-muted-foreground">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-sm transition-opacity hover:opacity-80"
          style={{ background: "var(--foreground)", color: "var(--background)" }}
        >
          Go home →
        </Link>
      </div>
    </div>
  );
}
