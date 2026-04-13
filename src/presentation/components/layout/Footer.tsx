"use client";

export default function Footer() {
  return (
    <footer className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <span suppressHydrationWarning className="text-[10px] text-[var(--dim)]">
          {new Date().getFullYear()} &middot; Luiz Henrique
        </span>
      </div>
    </footer>
  );
}
