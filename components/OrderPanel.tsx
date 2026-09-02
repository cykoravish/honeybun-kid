"use client";

import { useState } from "react";
import { waLink } from "@/lib/site-config";
import { useCart } from "@/lib/cart-context";

export default function OrderPanel({
  slug,
  productName,
  price,
  image,
  sizes,
}: {
  slug: string;
  productName: string;
  price: number;
  image: string;
  sizes: string[];
}) {
  const [selected, setSelected] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem, open } = useCart();

  const message = `Hi Honeybun! I'd like to order the ${productName} in size ${selected}.`;

  function handleAddToCart() {
    addItem({ slug, name: productName, size: selected, price, quantity, image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      <p className="text-sm font-medium text-ink">Size — {selected}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelected(size)}
            aria-pressed={selected === size}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              selected === size
                ? "border-ink bg-ink text-paper"
                : "border-cream-deep text-ink-soft hover:border-ink/40 hover:text-ink"
            }`}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <p className="text-sm font-medium text-ink">Quantity</p>
        <div className="flex items-center gap-3 rounded-full border border-cream-deep px-3 py-1.5">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-6 w-6 items-center justify-center text-ink-soft hover:text-ink"
          >
            −
          </button>
          <span className="w-4 text-center text-sm text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex h-6 w-6 items-center justify-center text-ink-soft hover:text-ink"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
      >
        {added ? "Added ✓" : `Add to cart — ₹${price * quantity}`}
      </button>

      {added && (
        <button
          onClick={open}
          className="mt-3 w-full text-center text-xs text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          View cart
        </button>
      )}

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-cream-deep px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/40"
      >
        Or order via WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-ink-soft">
        Cash on delivery. We&apos;ll confirm details after you check out.
      </p>
    </div>
  );
}
