import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductGallery from "@/components/ProductGallery";
import OrderPanel from "@/components/OrderPanel";
import ProductCard from "@/components/ProductCard";
import { getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Honeybun Kidswear`,
    description: product.blurb,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 2);

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <nav className="text-sm text-ink-soft">
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-12 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="md:pt-2">
          <h1 className="font-display text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="text-xl font-medium text-ink">₹{product.price}</p>
            {product.compareAtPrice && (
              <p className="text-base text-ink-soft line-through">₹{product.compareAtPrice}</p>
            )}
          </div>
          <p className="mt-5 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <ul className="mt-6 space-y-1.5">
            {product.details.map((d) => (
              <li key={d} className="flex gap-2.5 text-sm text-ink-soft">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-honey" />
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-cream-deep pt-8">
            <OrderPanel productName={product.name} sizes={product.sizes} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24">
          <h2 className="font-display text-2xl text-ink">You might also like</h2>
          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
