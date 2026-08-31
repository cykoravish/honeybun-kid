import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop — Honeybun Kidswear",
  description: "Browse Honeybun's cotton sets for babies and toddlers.",
};

const filters = [
  { key: "all", label: "All" },
  { key: "girls", label: "For Her" },
  { key: "boys", label: "For Him" },
] as const;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category === "girls" || category === "boys" ? category : "all";
  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="max-w-xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Shop</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Small-batch cotton sets, made to move in. Sizes run 2–5 years across
          the collection.
        </p>
      </div>

      <div className="mt-9 flex gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "all" ? "/shop" : `/shop?category=${f.key}`}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active === f.key
                ? "bg-ink text-paper"
                : "bg-cream text-ink-soft hover:text-ink"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}

        <div className="flex flex-col justify-center rounded-[32px] border border-dashed border-cream-deep bg-cream/60 p-8 text-center aspect-[4/5]">
          <p className="font-display text-lg text-ink">More styles on the way</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            New sets drop regularly — follow along on Instagram or message us
            to hear first.
          </p>
        </div>
      </div>
    </section>
  );
}
