"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=girls", label: "For Her" },
  { href: "/shop?category=boys", label: "For Him" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-deep/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="Honeybun Kidswear"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-display text-xl text-ink">Honeybun</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[15px] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/shop"
          className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-rose-deep md:inline-block"
        >
          Shop the collection
        </Link>

        <button
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ease-out ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-[1.5px] w-6 bg-ink transition-transform duration-300 ease-out ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 border-t border-cream-deep/70 bg-paper px-5 pb-5 pt-2">
            {links.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-lg px-2 py-2.5 text-[15px] text-ink-soft transition-all duration-300 ease-out hover:bg-cream hover:text-ink ${
                  open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className={`mt-2 rounded-full bg-ink px-5 py-2.5 text-center text-sm font-medium text-paper transition-all duration-300 ease-out ${
                open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${links.length * 40}ms` : "0ms" }}
              onClick={() => setOpen(false)}
            >
              Shop the collection
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
