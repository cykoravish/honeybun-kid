# Honeybun Kidswear

The customer-facing MVP website for **Honeybun Kidswear** — sweet little
outfits for your little honey. Built with Next.js (App Router) and Tailwind
CSS.

This is a demo/MVP: it showcases the brand, the product catalog, and lets
customers order directly over WhatsApp. There is no cart, checkout, or admin
panel in this version by design.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- Self-hosted fonts via [Fontsource](https://fontsource.org) (Fraunces +
  Plus Jakarta Sans) — no external font CDN calls at runtime

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Project structure

```
app/
  page.tsx                 Homepage
  shop/page.tsx             Shop grid (supports ?category=girls|boys)
  shop/[slug]/page.tsx       Product detail page
  contact/page.tsx            Contact page
  layout.tsx                   Root layout, fonts, header/footer
  globals.css                   Design tokens (colors, fonts, arch-frame motif)
  favicon.ico, icon.png, apple-icon.png   App icons (generated from the brand logo)

components/
  Header.tsx, Footer.tsx, WhatsAppFab.tsx
  ProductCard.tsx, ProductGallery.tsx, OrderPanel.tsx

lib/
  products.ts        Product catalog (name, price, sizes, images, copy)
  site-config.ts      WhatsApp number + Instagram handle
```

## Before going live — things to update

These are placeholders and are clearly marked with `TODO(client)` comments
in `lib/site-config.ts`:

- **WhatsApp number** — `WHATSAPP_NUMBER` in `lib/site-config.ts`
- **Instagram handle** — `INSTAGRAM_HANDLE` in `lib/site-config.ts`
- **Prices and sizes** — demo values in `lib/products.ts`, easy to edit or
  replace with real catalog data / a CMS later

## Adding a product

Add an entry to the `products` array in `lib/products.ts` and drop the
matching images in `public/images/`. Product pages, the shop grid, and the
homepage "This season's favourites" section all read from this one file.

## Design notes

- Palette, type, and the signature arch-shaped image frame are defined as
  CSS custom properties in `app/globals.css` under `@theme`.
- Images use `object-position: top` throughout so faces stay in frame when
  cropped to a container's aspect ratio — keep that in mind when adding new
  photography (crop with headroom above the subject).
