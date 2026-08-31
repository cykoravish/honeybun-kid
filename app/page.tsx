import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-8">
          <div className="order-2 md:order-1">
            <h1 className="font-display text-[2.6rem] leading-[1.08] text-ink sm:text-6xl">
              Sweet little outfits for your little honey.
            </h1>
            <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-ink-soft">
              Soft cotton sets designed for little adventures, lazy mornings and
              everything in between. Every piece is made to be lived in, loved,
              and handed down.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-rose-deep"
              >
                Shop the collection
              </Link>
              <a
                href={waLink("Hi Honeybun! I'd love to know more about your outfits.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-ink/20 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/50"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="arch-frame-lg relative aspect-[3/4] w-full max-w-sm mx-auto bg-cream md:max-w-none">
              <Image
                src="/images/product-girl-floral-set.png"
                alt="Toddler wearing the Dolle Floral Fleece Set from Honeybun Kidswear"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper px-5 py-2.5 text-sm text-ink shadow-md shadow-black/10 md:left-6 md:translate-x-0">
              Sizes 2–5 years, ready to ship
            </div>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section className="border-y border-cream-deep bg-cream">
        <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-cream-deep px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {[
            {
              title: "Ultra-soft fabric",
              body: "Breathable cotton blends chosen for sensitive skin.",
            },
            {
              title: "Adorable details",
              body: "Embroidery, appliqué and prints, finished by hand.",
            },
            {
              title: "Made with love",
              body: "Small batches, checked piece by piece before they ship.",
            },
          ].map((item) => (
            <div key={item.title} className="px-2 py-8 sm:px-8">
              <p className="font-display text-lg text-ink">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <Link href="/shop?category=girls" className="group relative block overflow-hidden rounded-[32px]">
            <div className="relative aspect-[4/5] w-full bg-cream">
              <Image
                src="/images/girl-pink-set.png"
                alt="Girls' collection"
                fill
                sizes="(min-width: 640px) 45vw, 90vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl text-paper">For Her</p>
              <p className="mt-1 text-sm text-paper/85">Sets, dresses &amp; more</p>
            </div>
          </Link>

          <Link href="/shop?category=boys" className="group relative block overflow-hidden rounded-[32px]">
            <div className="relative aspect-[4/5] w-full bg-cream">
              <Image
                src="/images/boy-paw-patrol.png"
                alt="Boys' collection"
                fill
                sizes="(min-width: 640px) 45vw, 90vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0" />
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl text-paper">For Him</p>
              <p className="mt-1 text-sm text-paper/85">Sets, shackets &amp; more</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-3xl text-ink">This season&apos;s favourites</h2>
          <Link href="/shop" className="hidden text-sm text-ink-soft hover:text-ink sm:inline">
            View all
          </Link>
        </div>
        <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="arch-frame relative aspect-[4/5] w-full max-w-sm bg-cream md:max-w-none">
            <Image
              src="/images/product-boy-shacket-main.png"
              alt="Boy wearing the Golden Hour Shacket Set"
              fill
              sizes="(min-width: 768px) 40vw, 80vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
              We design for scraped knees, sticky fingers and Sunday best —
              often on the same day.
            </p>
            <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-ink-soft">
              Honeybun started with a simple idea: children&apos;s clothes
              should feel as good as they look. Every set is cut for movement,
              stitched to last, and finished with the kind of small detail a
              parent notices and a child never has to think about.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram strip */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl text-ink">Follow along</h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-soft hover:text-ink"
            >
              @{INSTAGRAM_HANDLE}
            </a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
            {[
              "/images/girl-pink-set.png",
              "/images/boy-paw-patrol.png",
              "/images/boy-cream-set.png",
            ].map((src) => (
              <a
                key={src}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-2xl bg-paper"
              >
                <Image
                  src={src}
                  alt="Honeybun Kidswear on Instagram"
                  fill
                  sizes="30vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8">
          <p className="font-display text-3xl text-paper sm:text-4xl">
            Ready to dress your little honey?
          </p>
          <p className="mt-4 text-paper/70">
            Browse the collection or message us directly — we reply fast.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-rose"
            >
              Shop the collection
            </Link>
            <a
              href={waLink("Hi Honeybun! I'd love to know more about your outfits.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-paper/30 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:border-paper/60"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
