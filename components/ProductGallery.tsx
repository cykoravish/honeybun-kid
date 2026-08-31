"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="arch-frame-lg relative aspect-[4/5] w-full bg-cream">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width: 768px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1} of ${name}`}
              aria-pressed={active === i}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                active === i ? "border-ink" : "border-transparent"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
