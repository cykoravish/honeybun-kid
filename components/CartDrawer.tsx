"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, setQuantity, subtotal } = useCart();

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-paper shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-cream-deep px-5 py-4">
          <p className="font-display text-lg text-ink">Your cart</p>
          <button
            onClick={close}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-cream hover:text-ink"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5 text-center">
            <p className="text-ink-soft">Your cart is empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className="rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-paper hover:bg-rose-deep"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size}`} className="flex gap-3">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-cream">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-ink">{item.name}</p>
                      <p className="mt-0.5 text-xs text-ink-soft">Size {item.size}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(item.slug, item.size, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-cream-deep text-ink-soft hover:text-ink"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm text-ink">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.slug, item.size, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-6 w-6 items-center justify-center rounded-full border border-cream-deep text-ink-soft hover:text-ink"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <p className="text-sm font-medium text-ink">
                        ₹{item.price * item.quantity}
                      </p>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        aria-label={`Remove ${item.name}`}
                        className="text-xs text-ink-soft hover:text-rose-deep"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-cream-deep px-5 py-5">
              <div className="flex items-center justify-between text-sm text-ink-soft">
                <span>Subtotal</span>
                <span className="text-base font-medium text-ink">₹{subtotal}</span>
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Shipping calculated at checkout. Cash on delivery.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="mt-4 flex w-full items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
