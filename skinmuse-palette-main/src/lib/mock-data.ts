// Central mock-data source for SkinMuse.
// TODO: Replace with API/Firebase integration once backend is wired.

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  shadeName: string;
  shadeNumber: string;
  shadeHex: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  why: string;
  bestFor: string[];
  undertoneMatch: "Warm" | "Cool" | "Neutral";
  matchPercent: number;
  finish?: string;
  coverage?: string;
  texture?: string;
  crueltyFree?: boolean;
  waterproof?: boolean;
  ingredients?: string[];
  pros?: string[];
  cons?: string[];
  image?: string;
};

export type ProductCategory =
  | "Foundation"
  | "Concealer"
  | "Color Corrector"
  | "Compact Powder"
  | "Primer"
  | "Blush"
  | "Bronzer"
  | "Highlighter"
  | "Contour"
  | "Setting Spray"
  | "Lipstick"
  | "Lip Liner"
  | "Eye Shadow Palette"
  | "Mascara"
  | "Eyeliner"
  | "Eyebrow Products"
  | "Skincare Products"
  | "Sunscreen";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Foundation",
  "Concealer",
  "Color Corrector",
  "Compact Powder",
  "Primer",
  "Blush",
  "Bronzer",
  "Highlighter",
  "Contour",
  "Setting Spray",
  "Lipstick",
  "Lip Liner",
  "Eye Shadow Palette",
  "Mascara",
  "Eyeliner",
  "Eyebrow Products",
  "Skincare Products",
  "Sunscreen",
];

export const BRANDS = [
  "Maybelline",
  "Lakme",
  "Kay Beauty",
  "MAC",
  "Huda Beauty",
  "L'Oréal Paris",
  "Swiss Beauty",
  "Sugar Cosmetics",
  "e.l.f.",
  "Nykaa",
  "Charlotte Tilbury",
  "Rare Beauty",
  "NARS",
];

const FINISHES = ["Matte", "Satin", "Luminous", "Dewy", "Natural"];
const COVERAGES = ["Sheer", "Light", "Medium", "Full"];
const TEXTURES = ["Liquid", "Cream", "Powder", "Balm", "Gel"];

const SHADE_PALETTE: Record<ProductCategory, string[]> = {
  Foundation: ["#f2d5b5", "#e6bf99", "#d4a37a", "#b98460", "#8f5c3f"],
  Concealer: ["#f5dcc0", "#eac8a4", "#d5aa82", "#b48661"],
  "Color Corrector": ["#f4bfc0", "#f5cf9d", "#d6e0b2", "#b8c9e8"],
  "Compact Powder": ["#eecfb0", "#dcb18a", "#c19670"],
  Primer: ["#f7ecdd"],
  Blush: ["#f2a3a0", "#e77b7b", "#c9615c", "#a94747"],
  Bronzer: ["#c48a5c", "#a66a3f", "#7d4a28"],
  Highlighter: ["#f9e6c8", "#e8c78a", "#d1a86a"],
  Contour: ["#a97957", "#835838", "#5f3d24"],
  "Setting Spray": ["#f4ecdf"],
  Lipstick: ["#c95a5a", "#a83b3b", "#7d2a2a", "#d67d7d", "#8a4a4a"],
  "Lip Liner": ["#a25454", "#7c3535"],
  "Eye Shadow Palette": ["#c9a37a", "#8f5c3f", "#5c3a24", "#d7a19b"],
  Mascara: ["#111111"],
  Eyeliner: ["#111111", "#3a2418"],
  "Eyebrow Products": ["#4a3320", "#6b4a2e"],
  "Skincare Products": ["#f7ecdd"],
  Sunscreen: ["#f7ecdd"],
};

function seed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick<T>(arr: T[], key: string, offset = 0): T {
  return arr[(seed(key) + offset) % arr.length];
}

const NAME_BITS: Record<string, string[]> = {
  Foundation: ["Silk Serum", "Cloud Skin", "Second Skin", "Velvet Glow", "Aura Fluid"],
  Concealer: ["Bright Veil", "Halo Touch", "Radiant Erase", "Luminous Cover"],
  "Color Corrector": ["Chroma Fix", "Tone Balance", "Neutralize Kit"],
  "Compact Powder": ["Silk Compact", "Blur Powder", "Set & Soft"],
  Primer: ["Poreless Prime", "Glow Base", "Grip Primer"],
  Blush: ["Petal Flush", "Silk Cheek", "Rose Bloom"],
  Bronzer: ["Sun Kissed", "Golden Hour", "Toasted"],
  Highlighter: ["Moon Beam", "Halo Glow", "Champagne Shine"],
  Contour: ["Sculpt Stick", "Chisel Cream", "Shadow Play"],
  "Setting Spray": ["Lock It", "Dew Mist", "Longwear Veil"],
  Lipstick: ["Velvet Kiss", "Matte Muse", "Silk Rouge", "Satin Bloom"],
  "Lip Liner": ["Precise Line", "Silk Liner"],
  "Eye Shadow Palette": ["Neutral Muse", "Rose Editorial", "Nude Study"],
  Mascara: ["Volume Lash", "Curl Lift", "Feather Lash"],
  Eyeliner: ["Fine Ink", "Precise Wing", "Kohl Muse"],
  "Eyebrow Products": ["Brow Sculpt", "Feather Brow"],
  "Skincare Products": ["Glow Serum", "Hydra Cream", "Renewal Oil"],
  Sunscreen: ["Silk SPF 50", "Veil SPF 30", "Invisible Shield"],
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  Foundation: "Weightless, buildable coverage with a second-skin finish.",
  Concealer: "Brightening formula that blurs shadows and imperfections.",
  Lipstick: "Pigment-rich color with a comfortable, hydrating feel.",
  Blush: "Petal-soft flush that melts into skin seamlessly.",
  Highlighter: "Finely-milled glow for that lit-from-within luminosity.",
};

function makeProduct(brand: string, category: ProductCategory, i: number): Product {
  const id = `${category.replace(/\s+/g, "-").toLowerCase()}-${brand.replace(/[^a-z]/gi, "").toLowerCase()}-${i}`;
  const key = id + i;
  const shades = SHADE_PALETTE[category];
  const hex = shades[i % shades.length];
  const nameBit = pick(NAME_BITS[category] ?? ["Muse"], key, i);
  const shadeNames = ["Ivory", "Beige", "Sand", "Almond", "Cocoa", "Rose", "Nude", "Petal", "Mocha", "Warm Sand"];
  const shadeName = pick(shadeNames, key, i);
  const price = 780 + (seed(key) % 45) * 60;
  const rating = 3.6 + ((seed(key) % 15) / 10);
  const reviews = 120 + (seed(key) % 4200);
  const undertones = ["Warm", "Cool", "Neutral"] as const;
  return {
    id,
    name: `${nameBit} ${category}`,
    brand,
    category,
    shadeName,
    shadeNumber: `${100 + (seed(key) % 40)}`,
    shadeHex: hex,
    price,
    rating: Math.min(5, Math.round(rating * 10) / 10),
    reviews,
    description:
      CATEGORY_DESCRIPTIONS[category] ??
      "A premium formula thoughtfully crafted for your complexion.",
    why: "Matched to your warm undertone, medium depth and normal-to-combination texture — reduces the look of pigmentation.",
    bestFor: ["Normal", "Combination", "Dry"].filter((_, k) => (seed(key) + k) % 2 === 0),
    undertoneMatch: pick(undertones as unknown as string[], key, i) as Product["undertoneMatch"],
    matchPercent: 82 + (seed(key) % 17),
    finish: pick(FINISHES, key, i),
    coverage: pick(COVERAGES, key, i),
    texture: pick(TEXTURES, key, i),
    crueltyFree: (seed(key) % 3) !== 0,
    waterproof: (seed(key) % 4) === 0,
    ingredients: ["Hyaluronic Acid", "Niacinamide", "Vitamin E", "Squalane", "SPF 30"].filter(
      (_, k) => (seed(key) + k) % 2 === 0,
    ),
    pros: ["Weightless feel", "Buildable coverage", "Doesn't oxidize", "Skin-loving actives"],
    cons: ["Limited shade range", "Premium price point"],
  };
}

export const PRODUCTS: Product[] = PRODUCT_CATEGORIES.flatMap((cat) =>
  BRANDS.slice(0, 6).flatMap((brand, bi) =>
    Array.from({ length: 2 }, (_, i) => makeProduct(brand, cat, bi * 2 + i)),
  ),
);

export function productsByCategory(cat: ProductCategory) {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function findProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id);
}

// ————— Tutorials —————
export type Tutorial = {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  views: number;
  likes: number;
  trending?: boolean;
  gradient: string;
};

export const TUTORIAL_CATEGORIES = [
  "Beginner",
  "Foundation",
  "Concealer",
  "Lipstick",
  "Smokey Eye",
  "Bridal Makeup",
  "Office Makeup",
  "No Makeup Look",
  "Skincare",
  "Color Correcting",
];

const GRADIENTS = [
  "from-rosegold/80 via-blush/70 to-ivory",
  "from-charcoal/80 via-rosegold/40 to-blush/60",
  "from-blush/80 via-ivory to-rosegold/40",
  "from-rosegold/60 via-charcoal/40 to-blush/70",
];

export const TUTORIALS: Tutorial[] = TUTORIAL_CATEGORIES.flatMap((cat, ci) =>
  Array.from({ length: 4 }, (_, i) => ({
    id: `tut-${ci}-${i}`,
    title: `${cat} — Lesson ${i + 1}: The Ritual`,
    category: cat,
    difficulty: (["Beginner", "Intermediate", "Advanced"] as const)[(ci + i) % 3],
    duration: `${4 + ((ci + i * 3) % 18)}:${((i * 17) % 60).toString().padStart(2, "0")}`,
    views: 1200 + ((ci * 7 + i * 91) * 137) % 42000,
    likes: 60 + ((ci + i) * 47) % 800,
    trending: (ci + i) % 5 === 0,
    gradient: GRADIENTS[(ci + i) % GRADIENTS.length],
  })),
);

// ————— Looks —————
export type Look = {
  id: string;
  name: string;
  category: string;
  gradient: string;
  products: { category: ProductCategory; shade: string }[];
};

export const LOOK_CATEGORIES = [
  "Office",
  "College",
  "Party",
  "Wedding",
  "Festive",
  "Natural",
  "Glam",
  "Bold",
  "Date Night",
];

export const LOOKS: Look[] = LOOK_CATEGORIES.map((cat, i) => ({
  id: `look-${i}`,
  name: `${cat} Muse`,
  category: cat,
  gradient: GRADIENTS[i % GRADIENTS.length],
  products: [
    { category: "Foundation", shade: "Warm Sand 3.5" },
    { category: "Concealer", shade: "Almond Bright" },
    { category: "Lipstick", shade: cat === "Bold" ? "Deep Rouge" : "Rose Petal" },
    { category: "Blush", shade: "Petal Flush" },
    { category: "Eye Shadow Palette", shade: "Nude Study" },
    { category: "Highlighter", shade: "Champagne" },
    { category: "Contour", shade: "Soft Sculpt" },
  ],
}));

// ————— Notifications —————
export type NotificationItem = {
  id: string;
  type: "product" | "tutorial" | "report" | "offer" | "price";
  title: string;
  body: string;
  time: string;
  unread?: boolean;
};

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "product",
    title: "New drop from Charlotte Tilbury",
    body: "Airbrush Flawless Foundation in your matched shade — Warm 3.5 — just launched.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "n2",
    type: "tutorial",
    title: "A tutorial picked for you",
    body: "Golden hour glam — 6 minutes, matched to your beauty profile.",
    time: "5h ago",
    unread: true,
  },
  {
    id: "n3",
    type: "report",
    title: "Your weekly skin report is ready",
    body: "Hydration up 12%, evenness improved. Tap to view the full read.",
    time: "1d ago",
  },
  {
    id: "n4",
    type: "price",
    title: "Price drop on a saved product",
    body: "Rare Beauty Soft Pinch Blush is now 18% off at Nykaa.",
    time: "2d ago",
  },
  {
    id: "n5",
    type: "offer",
    title: "Atelier members — exclusive early access",
    body: "Shop the Dior Forever Skin Glow refresh 48 hours before launch.",
    time: "3d ago",
  },
];
