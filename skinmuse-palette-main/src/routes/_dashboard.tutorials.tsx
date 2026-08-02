import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Play, Bookmark, Heart, Share2, Search, Flame, Clock, Eye } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { api } from "@/lib/api";
import { TUTORIAL_CATEGORIES, type Tutorial } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/tutorials")({
  head: () => ({ meta: [{ title: "Tutorials — SkinMuse" }] }),
  component: TutorialsPage,
});

function TutorialsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const { data: TUTORIALS = [], isLoading } = useQuery({
    queryKey: ["tutorials"],
    queryFn: () => api.get("/tutorials").then(r => r.tutorials),
  });

  const filtered = useMemo(() => {
    return TUTORIALS.filter((t: Tutorial) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, TUTORIALS]);

  const trending = TUTORIALS.filter((t: Tutorial) => t.trending).slice(0, 6);
  const recommended = TUTORIALS.slice(0, 4);

  return (
    <div>
      <PageHeader
        eyebrow="Tutorials"
        title="Learn the ritual"
        description="Step-by-step lessons from world-class artists — chosen for your beauty profile."
      />

      {isLoading && <div className="p-8 text-center text-charcoal/50">Loading tutorials...</div>}
      {!isLoading && (
        <>
          <GlassCard className="mb-8 !p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={15}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
            />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tutorials, techniques, artists…"
              className="w-full rounded-full border border-charcoal/10 bg-white/70 py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rosegold/30"
            />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["All", ...TUTORIAL_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium transition ${
                cat === c
                  ? "bg-charcoal text-ivory"
                  : "border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </GlassCard>

      <Section title="Trending" icon={<Flame size={16} className="text-rosegold" />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((t) => (
            <TutorialCard key={t.id} t={t} />
          ))}
        </div>
      </Section>

      <Section title="Recommended for you">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((t) => (
            <TutorialCard key={t.id} t={t} compact />
          ))}
        </div>
      </Section>

      <Section title={cat === "All" ? "All lessons" : cat}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((t) => (
            <TutorialCard key={t.id} t={t} compact />
          ))}
        </div>
      </Section>
        </>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-serif text-2xl text-charcoal">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TutorialCard({ t, compact = false }: { t: Tutorial; compact?: boolean }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-luxe">
      <div className={`relative ${compact ? "aspect-video" : "aspect-[4/3]"} w-full bg-gradient-to-br ${t.gradient}`}>
        <div className="absolute inset-0 grid place-items-center">
          <button
            aria-label="Play"
            className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-charcoal shadow-luxe transition hover:scale-105 hover:text-rosegold"
          >
            <Play size={20} className="ml-0.5 fill-current" />
          </button>
        </div>
        <div className="absolute left-3 top-3 flex gap-1.5">
          {t.trending && (
            <span className="rounded-full bg-rosegold/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory">
              Trending
            </span>
          )}
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal/70">
            {t.difficulty}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-[10px] font-medium text-ivory backdrop-blur">
          <Clock size={10} className="mr-1 inline" />
          {t.duration}
        </div>
      </div>
      <div className="p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
          {t.category}
        </p>
        <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-tight text-charcoal">
          {t.title}
        </h3>
        <div className="mt-3 flex items-center justify-between text-[11px] text-charcoal/50">
          <span className="flex items-center gap-1">
            <Eye size={11} /> {t.views.toLocaleString()}
          </span>
          <div className="flex items-center gap-1">
            <IconBtn icon={<Bookmark size={12} />} />
            <IconBtn icon={<Heart size={12} />} />
            <IconBtn icon={<Share2 size={12} />} />
          </div>
        </div>
      </div>
    </div>
  );
}

function IconBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="grid h-7 w-7 place-items-center rounded-full border border-charcoal/10 bg-white/70 text-charcoal/60 hover:bg-beige hover:text-rosegold">
      {icon}
    </button>
  );
}
