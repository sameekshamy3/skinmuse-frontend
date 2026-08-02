import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Copy, Pencil, Trash2, Save, Sparkles, Palette } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { api } from "@/lib/api";
import { LOOK_CATEGORIES, type Look } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/looks")({
  head: () => ({ meta: [{ title: "Look Builder — SkinMuse" }] }),
  component: LookBuilder,
});

function LookBuilder() {
  const [category, setCategory] = useState<string>("All");
  const [looks, setLooks] = useState<Look[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  const { data: fetchedLooks = [], isLoading } = useQuery({
    queryKey: ["looks"],
    queryFn: () => api.get("/looks"),
  });

  useEffect(() => {
    if (fetchedLooks.length > 0 && looks.length === 0) {
      setLooks(fetchedLooks);
      setActiveId(fetchedLooks[0].id);
    }
  }, [fetchedLooks]);

  const filtered = category === "All" ? looks : looks.filter((l) => l.category === category);
  const active = looks.find((l) => l.id === activeId) ?? looks[0];

  function duplicate(l: Look) {
    const copy: Look = { ...l, id: `${l.id}-copy-${Date.now()}`, name: `${l.name} Copy` };
    setLooks((prev) => [copy, ...prev]);
    setActiveId(copy.id);
  }

  function remove(id: string) {
    setLooks((prev) => prev.filter((l) => l.id !== id));
  }

  function rename(id: string, name: string) {
    setLooks((prev) => prev.map((l) => (l.id === id ? { ...l, name } : l)));
  }

  return (
    <div>
      <PageHeader
        eyebrow="Look Builder"
        title="Compose your signature look"
        description="Blend curated shades into one cohesive story — save, duplicate, and revisit any time."
        actions={
          <button
            onClick={() => {
              const fresh: Look = {
                id: `look-new-${Date.now()}`,
                name: "Untitled Muse",
                category: "Natural",
                gradient: "from-blush/80 via-ivory to-rosegold/40",
                products: looks[0]?.products || [],
              };
              setLooks((prev) => [fresh, ...prev]);
              setActiveId(fresh.id);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
          >
            <Sparkles size={13} /> New Look
          </button>
        }
      />

      {isLoading && <div className="p-8 text-center text-charcoal/50">Loading looks...</div>}
      {!isLoading && looks.length > 0 && active && (
        <>
          <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...LOOK_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              category === c
                ? "bg-charcoal text-ivory"
                : "border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((look) => (
            <button
              key={look.id}
              onClick={() => setActiveId(look.id)}
              className={`group text-left transition ${activeId === look.id ? "ring-2 ring-rosegold rounded-3xl" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-soft backdrop-blur-xl">
                <div className={`aspect-[4/3] w-full bg-gradient-to-br ${look.gradient}`} />
                <div className="p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                    {look.category}
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-charcoal">{look.name}</h3>
                  <div className="mt-3 flex -space-x-1">
                    {["#d4a37a", "#c95a5a", "#f2a3a0", "#e8c78a"].map((c) => (
                      <span
                        key={c}
                        className="h-5 w-5 rounded-full ring-2 ring-white"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <GlassCard>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
                {active.category}
              </p>
              <input
                value={active.name}
                onChange={(e) => rename(active.id, e.target.value)}
                className="mt-1 w-full bg-transparent font-serif text-2xl text-charcoal focus:outline-none"
              />
            </div>
            <Palette size={18} className="text-rosegold" />
          </div>

          <div className={`mt-4 aspect-[4/3] w-full rounded-2xl bg-gradient-to-br ${active.gradient}`} />

          <ul className="mt-4 space-y-2">
            {active.products.map((p) => (
              <li
                key={p.category}
                className="flex items-center justify-between rounded-2xl border border-charcoal/5 bg-white/70 px-3 py-2"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/50">
                    {p.category}
                  </p>
                  <p className="text-sm text-charcoal">{p.shade}</p>
                </div>
                <button className="text-[10px] font-medium uppercase tracking-[0.2em] text-rosegold hover:underline">
                  Swap
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center gap-1.5 rounded-full bg-charcoal py-2.5 text-xs font-medium text-ivory hover:bg-rosegold">
              <Save size={12} /> Save
            </button>
            <button
              onClick={() => duplicate(active)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/10 bg-white/70 py-2.5 text-xs font-medium text-charcoal hover:bg-beige"
            >
              <Copy size={12} /> Duplicate
            </button>
            <button className="flex items-center justify-center gap-1.5 rounded-full border border-charcoal/10 bg-white/70 py-2.5 text-xs font-medium text-charcoal hover:bg-beige">
              <Pencil size={12} /> Rename
            </button>
            <button
              onClick={() => remove(active.id)}
              className="flex items-center justify-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/5 py-2.5 text-xs font-medium text-destructive hover:bg-destructive/10"
            >
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </GlassCard>
      </div>
      </>
      )}
    </div>
  );
}
