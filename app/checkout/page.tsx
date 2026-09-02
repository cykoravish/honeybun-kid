"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          paymentMethod: "cod",
          items,
          subtotal,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      const data = await res.json();
      setOrderId(data.id);
      clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <p className="font-display text-3xl text-ink">Thank you! 🎉</p>
        <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft">
          Your order has been placed. We&apos;ll call you shortly to confirm
          details before it ships — pay by cash when it arrives.
        </p>
        <p className="mt-2 text-xs text-ink-soft">Order reference: {orderId.slice(-8)}</p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <p className="font-display text-2xl text-ink">Your cart is empty</p>
        <p className="mt-3 text-ink-soft">Add something you love before checking out.</p>
        <Link
          href="/shop"
          className="mt-7 inline-block rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
        >
          Browse the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Checkout</h1>

      <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="customerName" className="text-sm font-medium text-ink">
              Full name
            </label>
            <input
              id="customerName"
              required
              value={form.customerName}
              onChange={(e) => update("customerName", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
              placeholder="Priya Sharma"
            />
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium text-ink">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium text-ink">
              Full delivery address
            </label>
            <textarea
              id="address"
              required
              rows={3}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
              placeholder="House / street / landmark"
            />
          </div>

          <div>
            <label htmlFor="city" className="text-sm font-medium text-ink">
              City
            </label>
            <input
              id="city"
              required
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
              placeholder="Dehradun"
            />
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium text-ink">
              Order notes <span className="text-ink-soft">(optional)</span>
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="mt-1.5 w-full resize-none rounded-xl border border-cream-deep bg-paper px-4 py-3 text-[15px] text-ink outline-none focus:border-ink/40"
              placeholder="Anything we should know?"
            />
          </div>

          <div className="rounded-xl border border-cream-deep bg-cream/60 px-4 py-3.5">
            <p className="text-sm font-medium text-ink">Payment method</p>
            <p className="mt-1 text-sm text-ink-soft">
              Cash on delivery — pay when your order arrives.
            </p>
            <p className="mt-1 text-xs text-ink-soft">
              Card payment is coming soon.
            </p>
          </div>

          {error && (
            <p className="rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose-deep">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-rose-deep disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Place order — ₹${subtotal}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-cream-deep bg-cream/50 p-6">
          <p className="font-display text-lg text-ink">Order summary</p>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={`${item.slug}-${item.size}`} className="flex gap-3">
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-paper">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="52px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-ink">{item.name}</p>
                  <p className="text-ink-soft">
                    Size {item.size} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm text-ink">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-cream-deep pt-4 text-sm">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-medium text-ink">₹{subtotal}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
