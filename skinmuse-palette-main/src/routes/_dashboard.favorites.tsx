import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, Bookmark, Sparkles, Clock, Gift, X } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";

export const Route = createFileRoute("/_dashboard/favorites")({
  head: () => ({ meta: [{ title: "Favorites — SkinMuse" }] }),
  component: Favorites,
});

const TABS = [
  { key: "products", label: "Products", icon: Heart },
  { key: "tutorials", label: "Tutorials", icon: Bookmark },
  { key: "looks", label: "Looks", icon: Sparkles },
  { key: "recent", label: "Recently Viewed", icon: Clock },
  { key: "wishlist", label: "Wishlist", icon: Gift },
] as const;

function Favorites() {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("products");
  const [removed, setRemoved] = useState<string[]>([]);

  const { data: PRODUCTS = [], isLoading: pLoading } = useQuery({ queryKey: ["products"], queryFn: () => api.get("/products") });
  const { data: TUTORIALS = [], isLoading: tLoading } = useQuery({ queryKey: ["tutorials"], queryFn: () => api.get("/tutorials").then(r => r.tutorials) });
  const { data: LOOKS = [], isLoading: lLoading } = useQuery({ queryKey: ["looks"], queryFn: () => api.get("/looks") });

  const favProducts = PRODUCTS.slice(0, 8).filter((p: any) => !removed.includes(p.id));
  const favTutorials = TUTORIALS.slice(0, 6).filter((t: any) => !removed.includes(t.id));
  const favLooks = LOOKS.slice(0, 6).filter((l: any) => !removed.includes(l.id));
  const recent = PRODUCTS.slice(8, 14).filter((p: any) => !removed.includes(p.id));
  const wishlist = PRODUCTS.slice(14, 20).filter((p: any) => !removed.includes(p.id));
  const isLoading = pLoading || tLoading || lLoading;

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Favorites"
        description="Products, tutorials and looks you love — always within reach."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
                active
                  ? "bg-charcoal text-ivory"
                  : "border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
              }`}
            >
              <Icon size={13} /> {t.label}
            </button>
          );
        })}
      </div>

      {isLoading && <div className="p-8 text-center text-charcoal/50">Loading favorites...</div>}
      {!isLoading && (
        <>
          {tab === "products" && (
            <Grid items={favProducts} onRemove={(id) => setRemoved((r) => [...r, id])} />
          )}
          {tab === "recent" && <Grid items={recent} onRemove={(id) => setRemoved((r) => [...r, id])} />}
          {tab === "wishlist" && (
            <Grid items={wishlist} onRemove={(id) => setRemoved((r) => [...r, id])} />
          )}

      {tab === "tutorials" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favTutorials.map((t) => (
            <div
              key={t.id}
              className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl animate-fade-in"
            >
              <div className={`aspect-video w-full bg-gradient-to-br ${t.gradient}`} />
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                  {t.category}
                </p>
                <h3 className="mt-1 font-serif text-lg leading-tight text-charcoal">{t.title}</h3>
              </div>
              <RemoveBtn onClick={() => setRemoved((r) => [...r, t.id])} />
            </div>
          ))}
        </div>
      )}

      {tab === "looks" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favLooks.map((l) => (
            <div
              key={l.id}
              className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl animate-fade-in"
            >
              <div className={`aspect-[4/3] w-full bg-gradient-to-br ${l.gradient}`} />
              <div className="p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                  {l.category}
                </p>
                <h3 className="mt-1 font-serif text-lg leading-tight text-charcoal">{l.name}</h3>
              </div>
              <RemoveBtn onClick={() => setRemoved((r) => [...r, l.id])} />
            </div>
          ))}
        </div>
      )}

      {tab === "products" && favProducts.length === 0 && (
        <GlassCard className="mx-auto max-w-lg text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe">
            <Heart size={26} />
          </div>
          <h3 className="mt-4 font-serif text-2xl text-charcoal">Nothing loved yet</h3>
          <p className="mt-2 text-sm text-charcoal/60">
            Tap the heart on any product or shade to keep it close.
          </p>
          <Link
            to="/recommendations"
            className="mt-4 inline-block rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
          >
            Explore recommendations
          </Link>
        </GlassCard>
      )}
      </>
      )}
    </div>
  );
}

function Grid({
  items,
  onRemove,
}: {
  items: any[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((p) => (
        <div key={p.id} className="relative animate-fade-in">
          <ProductCard product={p} />
          <RemoveBtn onClick={() => onRemove(p.id)} />
        </div>
      ))}
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Remove"
      className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-charcoal/60 shadow-sm backdrop-blur transition hover:bg-white hover:text-destructive"
    >
      <X size={13} />
    </button>
  );
}
