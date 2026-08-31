import Image from "next/image";
import Link from "next/link";
import { INSTAGRAM_URL, waLink } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-cream-deep bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt="Honeybun Kidswear"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-display text-lg text-ink">Honeybun</span>
            </div>
            <p className="mt-3 max-w-[26ch] text-sm leading-relaxed text-ink-soft">
              Sweet little outfits for your little honey — soft, comfy, made with love.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li><Link href="/shop" className="hover:text-ink">All products</Link></li>
              <li><Link href="/shop?category=girls" className="hover:text-ink">For Her</Link></li>
              <li><Link href="/shop?category=boys" className="hover:text-ink">For Him</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Say hello</p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li>
                <a href={waLink("Hi Honeybun! I'd love to know more about your outfits.")} className="hover:text-ink" target="_blank" rel="noopener noreferrer">
                  WhatsApp us
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} className="hover:text-ink" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-ink">Contact page</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-cream-deep pt-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Honeybun Kidswear. All rights reserved.</p>
          <p>Little outfits for little joys.</p>
        </div>
      </div>
    </footer>
  );
}
