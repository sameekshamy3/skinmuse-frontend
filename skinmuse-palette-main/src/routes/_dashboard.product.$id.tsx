import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, ShoppingBag, Share2, GitCompareArrows, Star, Sparkles, Check, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { ProductCard, ShadeSwatch } from "@/components/product-card";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_dashboard/product/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — SkinMuse` }],
  }),
  loader: async ({ params }) => {
    try {
      const product = await api.get(`/products/${params.id}`);
      return { product };
    } catch (e) {
      throw notFound();
    }
  },
  component: ProductDetails,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="mx-auto max-w-xl">
      <GlassCard className="text-center">
        <h2 className="font-serif text-2xl text-charcoal">Product not found</h2>
        <p className="mt-2 text-sm text-charcoal/60">This shade may have been retired.</p>
        <Link
          to="/recommendations"
          className="mt-6 inline-block rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
        >
          Back to recommendations
        </Link>
      </GlassCard>
    </div>
  );
}

function ProductDetails() {
  const { product } = Route.useLoaderData();
  
  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products"),
  });

  const related = allProducts.filter(
    (p: any) => p.category === product.category && p.id !== product.id,
  ).slice(0, 4);
  const together = allProducts.filter((p: any) => p.category !== product.category).slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow={product.brand}
        title={product.name}
        description={`Shade ${product.shadeName} · #${product.shadeNumber}`}
        actions={
          <Link
            to="/recommendations"
            className="rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige"
          >
            All recommendations
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="!p-0 overflow-hidden">
          <div
            className="aspect-square w-full"
            style={{
              background: `radial-gradient(120% 90% at 30% 20%, ${product.shadeHex}77, transparent 60%), linear-gradient(135deg, #f7ecdd 0%, #f2d8d4 60%, #eac6b8 100%)`,
            }}
          >
            <div className="flex h-full items-center justify-center">
              <div
                className="h-64 w-48 rounded-[36px] shadow-luxe ring-1 ring-white/60"
                style={{
                  background: `linear-gradient(160deg, ${product.shadeHex}, ${product.shadeHex}cc 60%, #ffffff33)`,
                }}
              />
            </div>
          </div>
        </GlassCard>

        <div className="flex flex-col gap-4">
          <GlassCard>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-sm text-charcoal/70">
                <Star size={14} className="fill-rosegold text-rosegold" />
                <span className="font-medium text-charcoal">{product.rating.toFixed(1)}</span>
                <span className="text-charcoal/40">({product.reviews.toLocaleString()} reviews)</span>
              </div>
              <span className="rounded-full bg-rosegold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                {product.matchPercent}% Match
              </span>
            </div>

            <p className="mt-4 font-serif text-3xl text-charcoal">₹{product.price}</p>
            <p className="mt-1 text-xs text-charcoal/60">Inclusive of all taxes</p>

            <div className="mt-6 rounded-2xl border border-rosegold/20 bg-rosegold/5 p-4">
              <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                <Sparkles size={12} /> AI Explanation
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal">
                This {product.category.toLowerCase()} matches your{" "}
                <strong>{product.undertoneMatch.toLowerCase()}</strong> undertone and medium
                complexion while reducing the appearance of pigmentation.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-full bg-charcoal py-3 text-xs font-medium text-ivory hover:bg-rosegold">
                <ShoppingBag size={14} /> Buy Now
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-white/70 py-3 text-xs font-medium text-charcoal hover:bg-beige">
                <Heart size={14} /> Save
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-white/70 py-3 text-xs font-medium text-charcoal hover:bg-beige">
                <GitCompareArrows size={14} /> Compare
              </button>
              <button className="flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-white/70 py-3 text-xs font-medium text-charcoal hover:bg-beige">
                <Share2 size={14} /> Share
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-serif text-lg text-charcoal">Shade Details</h3>
            <div className="mt-4 flex items-center gap-3">
              <ShadeSwatch hex={product.shadeHex} size={40} />
              <div>
                <p className="text-sm text-charcoal">{product.shadeName}</p>
                <p className="text-xs text-charcoal/50">
                  #{product.shadeNumber} · {product.undertoneMatch} Undertone
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-xs">
              <Meta label="Finish" value={product.finish} />
              <Meta label="Coverage" value={product.coverage} />
              <Meta label="Texture" value={product.texture} />
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="font-serif text-lg text-charcoal">Ingredients</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {(product.ingredients ?? []).map((i: string) => (
              <span
                key={i}
                className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-1 text-[11px] text-charcoal/70"
              >
                {i}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Pros</h4>
              <ul className="mt-3 space-y-2">
                {(product.pros ?? []).map((p: string) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-charcoal">
                    <Check size={13} className="mt-0.5 text-emerald-600" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-destructive">Cons</h4>
              <ul className="mt-3 space-y-2">
                {(product.cons ?? []).map((p: string) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-charcoal">
                    <X size={13} className="mt-0.5 text-destructive" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <GlassCard>
          <h3 className="font-serif text-lg text-charcoal">Customer Reviews</h3>
          <div className="mt-4 space-y-4">
            {mockReviews.map((r) => (
              <div key={r.name} className="border-b border-charcoal/5 pb-4 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rosegold to-blush text-xs font-semibold text-ivory">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm text-charcoal">{r.name}</p>
                    <div className="flex items-center gap-1 text-[11px] text-charcoal/50">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < r.rating ? "fill-rosegold text-rosegold" : "text-charcoal/20"}
                        />
                      ))}
                      · {r.date}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-charcoal/70">{r.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <Section title="Related Products" items={related} />
      <Section title="Recommended Together" items={together} />
    </div>
  );
}

function Meta({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">{label}</p>
      <p className="mt-1 text-sm text-charcoal">{value ?? "—"}</p>
    </div>
  );
}

function Section({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="mt-10">
      <h3 className="mb-4 font-serif text-2xl text-charcoal">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.filter(Boolean).map((p) => (
          <ProductCard key={p!.id} product={p!} />
        ))}
      </div>
    </div>
  );
}

const mockReviews = [
  {
    name: "Priya Sharma",
    rating: 5,
    date: "2 weeks ago",
    body: "Truly disappears into skin. My match is spot on — no oxidation even after 8 hours.",
  },
  {
    name: "Ananya Rao",
    rating: 4,
    date: "1 month ago",
    body: "Beautiful finish, the shade family covers my warm undertone. Wish the pump was sturdier.",
  },
  {
    name: "Meera Iyer",
    rating: 5,
    date: "2 months ago",
    body: "The AI got me perfectly. Feels like skincare, wears like a filter.",
  },
];
