"use client";

import { useState } from "react";
import { waLink } from "@/lib/site-config";

export default function OrderPanel({
  productName,
  sizes,
}: {
  productName: string;
  sizes: string[];
}) {
  const [selected, setSelected] = useState(sizes[0]);

  const message = `Hi Honeybun! I'd like to order the ${productName} in size ${selected}.`;

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

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-7 flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
      >
        Order via WhatsApp
      </a>
      <p className="mt-3 text-center text-xs text-ink-soft">
        We&apos;ll confirm size, price and delivery over chat.
      </p>
    </div>
  );
}
