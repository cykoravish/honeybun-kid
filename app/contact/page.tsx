import Image from "next/image";
import type { Metadata } from "next";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, waLink } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact — Honeybun Kidswear",
  description: "Get in touch with Honeybun Kidswear on WhatsApp or Instagram.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            Let&apos;s find the perfect fit.
          </h1>
          <p className="mt-5 max-w-[42ch] text-[17px] leading-relaxed text-ink-soft">
            Questions about sizing, fabric or an order? We&apos;re a small
            team and read every message ourselves — reach out on WhatsApp or
            Instagram and we&apos;ll get right back to you.
          </p>

          <div className="mt-9 space-y-4">
            <a
              href={waLink("Hi Honeybun! I have a question about your outfits.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-cream-deep px-6 py-5 transition-colors hover:border-ink/30"
            >
              <div>
                <p className="font-medium text-ink">WhatsApp</p>
                <p className="mt-0.5 text-sm text-ink-soft">Fastest way to reach us</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-honey" />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-cream-deep px-6 py-5 transition-colors hover:border-ink/30"
            >
              <div>
                <p className="font-medium text-ink">Instagram</p>
                <p className="mt-0.5 text-sm text-ink-soft">@{INSTAGRAM_HANDLE}</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-sky" />
            </a>
          </div>
        </div>

        <div className="arch-frame-lg relative order-first aspect-[4/5] w-full max-w-sm bg-cream mx-auto md:order-last md:max-w-none">
          <Image
            src="/images/product-boy-puppy-set.png"
            alt="Honeybun Kidswear"
            fill
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
