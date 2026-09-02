"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OrdersLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/orders/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password.");
        return;
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-5 py-20 sm:px-8">
      <p className="font-display text-2xl text-ink">Orders</p>
      <p className="mt-2 text-sm text-ink-soft">Enter the password to view incoming orders.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
        />
        {error && <p className="text-sm text-rose-deep">{error}</p>}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-rose-deep disabled:opacity-60"
        >
          {loading ? "Checking…" : "View orders"}
        </button>
      </form>
    </section>
  );
}
