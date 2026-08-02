import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Mic, TrendingUp, History, Sparkles } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { api } from "@/lib/api";
import { BRANDS, PRODUCT_CATEGORIES } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/search")({
  head: () => ({ meta: [{ title: "Search — SkinMuse" }] }),
  component: SearchPage,
});

const RECENT = ["warm foundation", "rare beauty blush", "smokey eye tutorial", "bridal look"];
const TRENDING = ["Charlotte Tilbury Pillow Talk", "MAC Studio Fix", "Peach blush", "Glass skin"];

function SearchPage() {
  const [q, setQ] = useState("");

  const { data: PRODUCTS = [] } = useQuery({ queryKey: ["products"], queryFn: () => api.get("/products") });
  const { data: TUTORIALS = [] } = useQuery({ queryKey: ["tutorials"], queryFn: () => api.get("/tutorials").then(r => r.tutorials) });
  const { data: LOOKS = [] } = useQuery({ queryKey: ["looks"], queryFn: () => api.get("/looks") });

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return null;
    return {
      products: PRODUCTS.filter(
        (p: any) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      ).slice(0, 8),
      tutorials: TUTORIALS.filter(
        (t: any) => t.title.toLowerCase().includes(query) || t.category.toLowerCase().includes(query),
      ).slice(0, 6),
      looks: LOOKS.filter(
        (l: any) => l.name.toLowerCase().includes(query) || l.category.toLowerCase().includes(query),
      ),
      brands: BRANDS.filter((b) => b.toLowerCase().includes(query)),
      categories: PRODUCT_CATEGORIES.filter((c) => c.toLowerCase().includes(query)),
    };
  }, [q, PRODUCTS, TUTORIALS, LOOKS]);

  return (
    <div>
      <PageHeader
        eyebrow="Discover"
        title="Search SkinMuse"
        description="Products, brands, tutorials, looks and categories — all in one place."
      />

      <GlassCard className="!p-3">
        <div className="relative">
          <SearchIcon
            size={17}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/40"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            autoFocus
            placeholder="Try 'warm foundation', 'Rare Beauty', 'smokey eye'…"
            className="w-full rounded-full border border-charcoal/10 bg-white/80 py-3.5 pl-12 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-rosegold/30"
          />
          <button
            aria-label="Voice search"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-rosegold text-ivory shadow-soft hover:bg-charcoal"
          >
            <Mic size={14} />
          </button>
        </div>
      </GlassCard>

      {!results && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
              <History size={12} /> Recent searches
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {RECENT.map((r) => (
                <button
                  key={r}
                  onClick={() => setQ(r)}
                  className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-xs text-charcoal/80 hover:bg-beige"
                >
                  {r}
                </button>
              ))}
            </div>
          </GlassCard>
          <GlassCard>
            <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
              <TrendingUp size={12} /> Trending
            </p>
            <ul className="mt-4 space-y-2">
              {TRENDING.map((t, i) => (
                <li key={t}>
                  <button
                    onClick={() => setQ(t)}
                    className="flex w-full items-center justify-between rounded-2xl border border-charcoal/5 bg-white/70 px-3 py-2 text-left text-sm text-charcoal hover:bg-beige"
                  >
                    <span>
                      <span className="mr-2 text-xs text-charcoal/40">0{i + 1}</span>
                      {t}
                    </span>
                    <Sparkles size={12} className="text-rosegold" />
                  </button>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      )}

      {results && (
        <div className="mt-6 space-y-8">
          {(results.brands.length > 0 || results.categories.length > 0) && (
            <GlassCard>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                Quick matches
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {results.brands.map((b) => (
                  <span key={b} className="rounded-full bg-charcoal px-3 py-1.5 text-xs text-ivory">
                    {b}
                  </span>
                ))}
                {results.categories.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-xs text-charcoal"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}

          {results.products.length > 0 && (
            <div>
              <h3 className="mb-3 font-serif text-xl text-charcoal">Products</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {results.products.map((p) => (
                  <li key={p.id}>
                    <Link
                      to="/product/$id"
                      params={{ id: p.id }}
                      className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft backdrop-blur-xl hover:bg-beige"
                    >
                      <span
                        className="h-12 w-12 shrink-0 rounded-xl"
                        style={{ background: p.shadeHex }}
                      />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-charcoal">{p.name}</p>
                        <p className="text-[11px] text-charcoal/50">
                          {p.brand} · {p.shadeName}
                        </p>
                      </div>
                      <span className="ml-auto text-sm font-serif text-charcoal">₹{p.price}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.tutorials.length > 0 && (
            <div>
              <h3 className="mb-3 font-serif text-xl text-charcoal">Tutorials</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {results.tutorials.map((t) => (
                  <li
                    key={t.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft backdrop-blur-xl"
                  >
                    <div className={`h-12 w-16 shrink-0 rounded-xl bg-gradient-to-br ${t.gradient}`} />
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm text-charcoal">{t.title}</p>
                      <p className="text-[11px] text-charcoal/50">
                        {t.category} · {t.duration}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.looks.length > 0 && (
            <div>
              <h3 className="mb-3 font-serif text-xl text-charcoal">Looks</h3>
              <ul className="grid gap-3 sm:grid-cols-3">
                {results.looks.map((l) => (
                  <li
                    key={l.id}
                    className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-soft backdrop-blur-xl"
                  >
                    <div className={`h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br ${l.gradient}`} />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-charcoal">{l.name}</p>
                      <p className="text-[11px] text-charcoal/50">{l.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {results.products.length === 0 &&
            results.tutorials.length === 0 &&
            results.looks.length === 0 &&
            results.brands.length === 0 && (
              <GlassCard className="text-center">
                <p className="text-sm text-charcoal/60">No matches. Try a different search.</p>
              </GlassCard>
            )}
        </div>
      )}
    </div>
  );
}
