export type Product = {
  slug: string;
  name: string;
  category: "girls" | "boys";
  price: number;
  compareAtPrice?: number;
  sizes: string[];
  blurb: string;
  description: string;
  details: string[];
  images: string[];
};

export const products: Product[] = [
  {
    slug: "dolle-floral-fleece-set",
    name: "Dolle Floral Fleece Set",
    category: "girls",
    price: 1099,
    compareAtPrice: 1399,
    sizes: ["2 Yrs", "3 Yrs", "4 Yrs", "5 Yrs"],
    blurb: "A brushed-fleece sweatshirt and jogger set with a hand-finished flower appliqué.",
    description:
      "Soft days call for softer clothes. This fleece set is brushed inside for warmth, finished with an embroidered bee trail and a dimensional flower patch she'll want to touch again and again. Paired joggers keep the whole look easy to move in, nap in, and love in.",
    details: [
      "Brushed cotton-blend fleece, gentle on skin",
      "Embroidered detailing and appliqué flower",
      "Elasticated cuffs and waistband for all-day comfort",
      "Sold as a matching top and jogger set",
    ],
    images: [
      "/images/product-girl-floral-set.png",
      "/images/girl-pink-set.png",
    ],
  },
  {
    slug: "puppy-patrol-fleece-set",
    name: "Puppy Patrol Fleece Set",
    category: "boys",
    price: 1049,
    compareAtPrice: 1299,
    sizes: ["2 Yrs", "3 Yrs", "4 Yrs", "5 Yrs"],
    blurb: "A cosy crew-neck and jogger set for kids who never sit still.",
    description:
      "Built for backyard patrols and living-room adventures alike. A heathered fleece crew-neck with a bold graphic print pairs with matching joggers, so getting dressed is one less thing to negotiate before playtime.",
    details: [
      "Heathered fleece, brushed on the inside",
      "Printed graphic on chest and leg",
      "Ribbed cuffs, hem and waistband",
      "Sold as a matching top and jogger set",
    ],
    images: [
      "/images/product-boy-puppy-set.png",
      "/images/boy-paw-patrol.png",
    ],
  },
  {
    slug: "golden-hour-shacket-set",
    name: "Golden Hour Shacket Set",
    category: "boys",
    price: 1399,
    sizes: ["2 Yrs", "3 Yrs", "4 Yrs", "5 Yrs"],
    blurb: "A textured shirt-jacket and trouser set in warm cream and olive.",
    description:
      "A little more grown-up, a lot more charming. Woven from a soft waffle-textured cotton, the oversized shacket layers easily over a tee, with a contrast pocket and roll-tab sleeves. The matching wide-leg trouser keeps the outfit relaxed from morning to evening.",
    details: [
      "Textured waffle-weave cotton blend",
      "Roll-tab sleeves and contrast chest pocket",
      "Relaxed, easy-movement fit",
      "Sold as a matching shacket and trouser set",
    ],
    images: [
      "/images/product-boy-shacket-2.png",
      "/images/product-boy-shacket-2.png",
      "/images/product-boy-shacket-3.png",
      "/images/product-boy-shacket-4.png",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
