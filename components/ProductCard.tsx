import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="arch-frame relative aspect-[4/5] w-full bg-cream">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.compareAtPrice && (
          <span className="absolute left-4 top-4 rounded-full bg-rose px-3 py-1 text-xs font-medium text-white">
            Save ₹{product.compareAtPrice - product.price}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-ink">{product.name}</h3>
          <p className="mt-0.5 text-sm text-ink-soft">{product.sizes[0]}–{product.sizes[product.sizes.length - 1]}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-medium text-ink">₹{product.price}</p>
          {product.compareAtPrice && (
            <p className="text-sm text-ink-soft line-through">₹{product.compareAtPrice}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
