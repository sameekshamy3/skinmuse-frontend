import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Filter, SlidersHorizontal, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { ProductCard } from "@/components/product-card";
import { api } from "@/lib/api";
import {
  BRANDS,
  PRODUCT_CATEGORIES,
  type Product,
  type ProductCategory,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations — SkinMuse" }] }),
  component: Recommendations,
});

const SORTS = ["Best Match", "Highest Rated", "Lowest Price", "Newest"] as const;
type Sort = (typeof SORTS)[number];

const COVERAGES = ["Sheer", "Light", "Medium", "Full"];
const FINISHES = ["Matte", "Satin", "Luminous", "Dewy", "Natural"];
const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];

function Rail({ category, items }: { category: ProductCategory; items: Product[] }) {
  const railId = `rail-${category}`;
  const scroll = (dir: -1 | 1) => {
    const el = document.getElementById(railId);
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };
  if (items.length === 0) return null;
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">
            {items.length} matched
          </p>
          <h2 className="mt-1 font-serif text-2xl text-charcoal">{category}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="grid h-9 w-9 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/60 hover:bg-beige"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="grid h-9 w-9 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/60 hover:bg-beige"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        id={railId}
        className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-2 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <div key={p.id} className="w-[240px] shrink-0 snap-start sm:w-[260px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Recommendations() {
  const [brand, setBrand] = useState<string>("All");
  const [priceMax, setPriceMax] = useState<number>(4000);
  const [skinType, setSkinType] = useState<string>("All");
  const [coverage, setCoverage] = useState<string>("All");
  const [finish, setFinish] = useState<string>("All");
  const [crueltyFree, setCrueltyFree] = useState(false);
  const [waterproof, setWaterproof] = useState(false);
  const [sort, setSort] = useState<Sort>("Best Match");
  const [openFilters, setOpenFilters] = useState(false);

  const { data: PRODUCTS = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products"),
  });

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p: Product) => {
      if (brand !== "All" && p.brand !== brand) return false;
      if (p.price > priceMax) return false;
      if (skinType !== "All" && !p.bestFor.includes(skinType)) return false;
      if (coverage !== "All" && p.coverage !== coverage) return false;
      if (finish !== "All" && p.finish !== finish) return false;
      if (crueltyFree && !p.crueltyFree) return false;
      if (waterproof && !p.waterproof) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Lowest Price") return a.price - b.price;
      if (sort === "Newest") return a.id.localeCompare(b.id);
      return b.matchPercent - a.matchPercent;
    });
    return list;
  }, [brand, priceMax, skinType, coverage, finish, crueltyFree, waterproof, sort]);

  const byCategory = useMemo(() => {
    const map = new Map<ProductCategory, Product[]>();
    for (const cat of PRODUCT_CATEGORIES) map.set(cat, []);
    for (const p of filtered) map.get(p.category)?.push(p);
    return map;
  }, [filtered]);

  if (isLoading) {
    return <div className="p-8 text-center text-charcoal/50 font-medium">Loading catalog...</div>;
  }

  return (
    <div>
      <PageHeader
        eyebrow="AI Curation"
        title="Curated for your complexion"
        description="Every shade below is matched to your warm undertone, medium depth and combination texture."
        actions={
          <>
            <button
              onClick={() => setOpenFilters((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige lg:hidden"
            >
              <Filter size={13} /> Filters
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-xs text-charcoal/70 sm:inline-flex">
              <SlidersHorizontal size={13} />
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent text-xs font-medium text-charcoal focus:outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className={`${openFilters ? "block" : "hidden"} lg:block`}>
          <GlassCard>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-serif text-lg text-charcoal">Filters</h3>
              <Sparkles size={14} className="text-rosegold" />
            </div>

            <FilterBlock label="Brand">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-xl border border-charcoal/10 bg-white/70 px-3 py-2 text-xs"
              >
                <option>All</option>
                {BRANDS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </FilterBlock>

            <FilterBlock label={`Max Price · ₹${priceMax}`}>
              <input
                type="range"
                min={500}
                max={4200}
                step={50}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-rosegold"
              />
            </FilterBlock>

            <FilterBlock label="Skin Type">
              <SelectRow value={skinType} onChange={setSkinType} options={["All", ...SKIN_TYPES]} />
            </FilterBlock>
            <FilterBlock label="Coverage">
              <SelectRow value={coverage} onChange={setCoverage} options={["All", ...COVERAGES]} />
            </FilterBlock>
            <FilterBlock label="Finish">
              <SelectRow value={finish} onChange={setFinish} options={["All", ...FINISHES]} />
            </FilterBlock>

            <div className="mt-4 space-y-2">
              <Check label="Cruelty Free" checked={crueltyFree} onChange={setCrueltyFree} />
              <Check label="Waterproof" checked={waterproof} onChange={setWaterproof} />
            </div>

            <div className="mt-6 sm:hidden">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="w-full rounded-xl border border-charcoal/10 bg-white/70 px-3 py-2 text-xs"
              >
                {SORTS.map((s) => (
                  <option key={s}>Sort: {s}</option>
                ))}
              </select>
            </div>
          </GlassCard>
        </aside>

        <div className="min-w-0">
          {PRODUCT_CATEGORIES.map((cat) => (
            <Rail key={cat} category={cat} items={byCategory.get(cat) ?? []} />
          ))}
          {filtered.length === 0 && (
            <GlassCard className="text-center">
              <p className="text-sm text-charcoal/60">
                No matches with current filters. Loosen a filter to see more picks.
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
        {label}
      </p>
      {children}
    </div>
  );
}

function SelectRow({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-charcoal/10 bg-white/70 px-3 py-2 text-xs"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 text-xs text-charcoal">
      <span>{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-rosegold" : "bg-charcoal/20"}`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            checked ? "left-4" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}
