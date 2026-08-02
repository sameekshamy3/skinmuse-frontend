import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Sparkle, Palette, PlayCircle, ArrowUpRight } from "lucide-react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import heroModel from "@/assets/hero-model.jpg";
import foundation from "@/assets/product-foundation.jpg";
import lipstick from "@/assets/product-lipstick.jpg";
import concealer from "@/assets/product-concealer.jpg";
import powder from "@/assets/product-powder.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "SkinMuse — Discover Your Perfect Shade" },
      {
        name: "description",
        content:
          "AI-powered luxury beauty concierge. Get precise foundation, concealer, and lipstick matches curated for your skin.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const brands = ["DIOR", "RARE BEAUTY", "SEPHORA", "CHANEL", "FENTY", "CHARLOTTE TILBURY"];

const features = [
  {
    icon: Sparkle,
    title: "Real-time Analysis",
    body: "Our AI identifies texture, tone, and hydration levels instantly from a simple selfie.",
  },
  {
    icon: Palette,
    title: "Curated Matches",
    body: "No more guessing games. Get precise product matches across 200+ luxury brands.",
  },
  {
    icon: PlayCircle,
    title: "AI Tutorials",
    body: "Personalized video guides that show you exactly how to apply your specific matches.",
  },
];

const products = [
  { img: foundation, name: "Velvet Veil Foundation", shade: "Shade 2.5 Neutral", label: "Luminous Silk" },
  { img: lipstick, name: "Petal Soft Lipstick", shade: "Dusty Rose", label: "Muse Matte" },
  { img: concealer, name: "Ethereal Concealer", shade: "Light Beige", label: "Radiant Lift" },
  { img: powder, name: "Cloud Finish Powder", shade: "Translucent", label: "Silk Mist" },
];

const steps = [
  { n: "01", t: "Capture", d: "Take a natural-light selfie or upload a portrait — no makeup required." },
  { n: "02", t: "Analyze", d: "Our vision model reads 500+ skin signals: undertone, texture, hydration." },
  { n: "03", t: "Discover", d: "Receive a curated edit of shade-matched products across your favorite houses." },
];

const testimonials = [
  {
    quote:
      "I've spent years testing foundations. SkinMuse found my exact shade in thirty seconds. It feels like a personal artist in my pocket.",
    name: "Amara Okafor",
    role: "Editor, Vestige Magazine",
  },
  {
    quote:
      "The tutorials adapt to my features — not a generic tutorial in sight. My routine has never felt more mine.",
    name: "Léa Marchand",
    role: "Creative Director",
  },
  {
    quote:
      "Finally, an AI that understands warm undertones. The concealer match was flawless on the first try.",
    name: "Priya Raman",
    role: "Beauty Investor",
  },
];

const tiers = [
  {
    name: "Essential",
    price: "Free",
    sub: "For discovering your palette",
    perks: ["1 full face analysis / month", "Basic shade matching", "Access to 20 brands"],
    cta: "Try for free",
    featured: false,
  },
  {
    name: "Muse Pro",
    price: "$19",
    per: "/month",
    sub: "The signature experience",
    perks: [
      "Unlimited multi-product scans",
      "Undertone correction guide",
      "200+ luxury brands",
      "Personalized video tutorials",
    ],
    cta: "Begin Pro trial",
    featured: true,
  },
  {
    name: "Atelier",
    price: "$49",
    per: "/month",
    sub: "For the connoisseur",
    perks: [
      "1-on-1 artist consultation",
      "Seasonal shade shift alerts",
      "Luxury sample shipments",
      "Priority support",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

const faqs = [
  {
    q: "How does the AI face scan work?",
    a: "You capture a well-lit selfie. Our vision model analyzes over 500 skin data points — undertone, texture, hydration, oxidation risk — and matches them against a curated database of luxury products.",
  },
  {
    q: "Is my facial data private?",
    a: "Yes. Images are processed ephemerally and never stored without your consent. You can delete your diagnostic profile at any time.",
  },
  {
    q: "Which brands do you support?",
    a: "Over 200 prestige and luxury houses including Dior, Rare Beauty, Chanel, Fenty, Charlotte Tilbury, and more. Our catalog updates weekly.",
  },
  {
    q: "Can I use SkinMuse without an account?",
    a: "Absolutely. Guest access lets you try one full analysis without signing up. Create a profile to save your shades and history.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <SiteNav />

      {/* HERO */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <span className="inline-block rounded-full bg-blush/40 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
                AI-Powered Beauty
              </span>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-charcoal">
                Discover Your <br />
                <em className="font-serif italic">Perfect Shade.</em>
              </h1>
              <p className="max-w-md text-base sm:text-lg leading-relaxed text-charcoal/60">
                SkinMuse analyzes over 500 skin data points to match you with luxury beauty products
                that feel like a second skin.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/signup"
                  className="rounded-full bg-rosegold px-8 py-4 text-sm font-medium text-white shadow-luxe hover:scale-[1.03] transition-transform"
                >
                  Analyze My Face
                </Link>
                <a
                  href="#products"
                  className="rounded-full border border-charcoal/10 px-8 py-4 text-sm font-medium hover:bg-beige transition-colors"
                >
                  View Gallery
                </a>
              </div>
              <div className="flex items-center gap-4 pt-8 border-t border-charcoal/5">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full bg-beige border-2 border-ivory" />
                  <div className="size-8 rounded-full bg-blush border-2 border-ivory" />
                  <div className="size-8 rounded-full bg-rosegold border-2 border-ivory" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                  Trusted by 50,000+ beauty enthusiasts
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-beige shadow-luxe outline-1 -outline-offset-1 outline-black/5">
                <img
                  src={heroModel}
                  alt="A model with luminous glowing skin"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
                {/* AI scan overlay ring */}
                <div className="pointer-events-none absolute inset-0 grid place-items-center">
                  <div className="size-56 sm:size-72 rounded-full border border-white/40 animate-pulse" />
                </div>
              </div>
              {/* Floating scan card */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 w-60 sm:w-64 rounded-2xl border border-white/40 bg-white/90 p-5 backdrop-blur-xl shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rosegold">
                    Face Scan Active
                  </span>
                  <span className="size-2 rounded-full bg-rosegold animate-pulse" />
                </div>
                <div className="h-1 mb-3 w-full overflow-hidden rounded-full bg-beige">
                  <div className="h-full w-3/4 bg-rosegold" />
                </div>
                <p className="text-xs font-medium text-charcoal">Undertone: Warm Olive</p>
                <p className="mt-1 text-[10px] text-charcoal/50">Recommended: Satin Finish</p>
              </div>
              {/* Shade match chip */}
              <div className="hidden md:flex absolute -top-6 -right-4 items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-4 backdrop-blur-xl shadow-xl">
                <div className="size-10 rounded-full bg-[#E8C4B0] ring-4 ring-rosegold/15" />
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-charcoal/40">
                    Perfect Match
                  </div>
                  <div className="text-xs font-semibold text-charcoal">Shade 4.5 · Neutral</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="py-10 border-y border-charcoal/5">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 sm:gap-x-14 gap-y-4 opacity-40">
            {brands.map((b) => (
              <span
                key={b}
                className="font-serif italic text-lg sm:text-xl tracking-[0.15em] text-charcoal"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="scan" className="bg-beige/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
              The Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl mt-3">The Muse Experience</h2>
            <p className="mx-auto mt-4 max-w-xl text-charcoal/50">
              Science meets sophistication to simplify your daily beauty ritual.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-charcoal/5 bg-white p-8 sm:p-10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-luxe"
              >
                <div className="mb-6 grid size-12 place-items-center rounded-2xl bg-ivory text-rosegold">
                  <f.icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/60">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-4 sm:flex sm:items-end sm:justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
                Your Recommendations
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">Your Daily Routine</h2>
              <p className="mt-2 text-charcoal/50">Based on your unique profile.</p>
            </div>
            <a
              href="#"
              className="inline-flex w-fit items-center gap-1 border-b border-rosegold pb-1 text-sm font-semibold text-rosegold"
            >
              Explore the shop <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:gap-6 md:grid-cols-4">
            {products.map((p) => (
              <div key={p.name} className="group cursor-pointer">
                <div className="mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-beige/50 outline-1 -outline-offset-1 outline-black/5">
                  <img
                    src={p.img}
                    alt={p.name}
                    width={640}
                    height={853}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-rosegold">
                  {p.label}
                </div>
                <h4 className="mt-1 text-sm font-semibold">{p.name}</h4>
                <p className="text-xs text-charcoal/50">{p.shade}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-beige/30 py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
                The Ritual
              </span>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
                A single scan. <br />
                <em className="italic">A lifetime of clarity.</em>
              </h2>
              <p className="mt-6 max-w-md text-charcoal/60">
                From selfie to shade in under a minute. Then let SkinMuse follow the seasons,
                adjusting your palette as your skin evolves.
              </p>
            </div>
            <div className="space-y-6">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex gap-6 rounded-3xl border border-charcoal/5 bg-white p-8 shadow-sm"
                >
                  <div className="font-serif text-4xl text-rosegold shrink-0">{s.n}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{s.t}</h3>
                    <p className="text-charcoal/60 leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
              Devotion
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">In Her Own Words</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl border border-charcoal/5 bg-white p-8 sm:p-10 flex flex-col"
              >
                <div className="font-serif text-4xl text-rosegold leading-none mb-4">"</div>
                <blockquote className="flex-1 text-charcoal/80 leading-relaxed">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-charcoal/5">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-charcoal/50">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-beige/30 py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
              Membership
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">Select Your Access</h2>
            <p className="mt-4 text-charcoal/50 max-w-lg mx-auto">
              Professional-grade analysis for every beauty journey.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-3xl p-8 sm:p-10 ${
                  t.featured
                    ? "bg-charcoal text-ivory shadow-luxe ring-1 ring-rosegold/40"
                    : "bg-white border border-charcoal/5"
                }`}
              >
                {t.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-rosegold px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                    Most Loved
                  </div>
                )}
                <div className="text-sm font-medium mb-2">{t.name}</div>
                <div className="mb-1 flex items-baseline gap-1 font-serif">
                  <span className="text-4xl">{t.price}</span>
                  {t.per && (
                    <span className={`text-sm font-sans ${t.featured ? "opacity-50" : "text-charcoal/40"}`}>
                      {t.per}
                    </span>
                  )}
                </div>
                <p className={`text-sm mb-8 ${t.featured ? "text-ivory/60" : "text-charcoal/50"}`}>
                  {t.sub}
                </p>
                <ul className="space-y-3 text-sm mb-10">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className={`mt-2 size-1.5 rounded-full shrink-0 ${t.featured ? "bg-rosegold" : "bg-rosegold"}`} />
                      <span className={t.featured ? "text-ivory/80" : "text-charcoal/70"}>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-auto rounded-full py-3 text-center text-sm font-medium transition-colors ${
                    t.featured
                      ? "bg-rosegold text-white hover:bg-rosegold/90"
                      : "border border-charcoal/10 hover:bg-charcoal hover:text-ivory"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
              FAQ
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl">Questions, Answered</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-charcoal text-ivory p-12 sm:p-20 text-center overflow-hidden relative">
          <div className="absolute -top-24 -right-24 size-96 bg-rosegold/20 blur-[120px] rounded-full" />
          <div className="relative">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Your shade is <em className="italic">waiting.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-ivory/60">
              Join fifty thousand people who let SkinMuse curate their beauty.
            </p>
            <Link
              to="/signup"
              className="mt-10 inline-block rounded-full bg-rosegold px-10 py-4 text-sm font-medium text-white shadow-luxe hover:scale-[1.03] transition-transform"
            >
              Begin Your Scan
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-charcoal/5 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <span className="text-sm sm:text-base font-medium">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-rosegold transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6 text-sm leading-relaxed text-charcoal/60">{a}</div>
      )}
    </div>
  );
}
