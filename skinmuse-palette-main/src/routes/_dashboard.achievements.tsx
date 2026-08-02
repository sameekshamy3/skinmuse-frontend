import { createFileRoute } from "@tanstack/react-router";
import { Trophy, ScanFace, Bookmark, Heart, Sparkles } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/achievements")({
  head: () => ({ meta: [{ title: "Achievements — SkinMuse" }] }),
  component: Achievements,
});

const badges = [
  { icon: ScanFace, title: "First Scan", desc: "Completed your first AI scan", earned: true },
  { icon: Bookmark, title: "Curator", desc: "Save 10 looks", earned: true },
  { icon: Heart, title: "Devotee", desc: "Favorite 25 products", earned: false },
  { icon: Sparkles, title: "Muse Radiance", desc: "7-day tutorial streak", earned: false },
];

function Achievements() {
  return (
    <div>
      <PageHeader
        eyebrow="Rewards"
        title="Achievements"
        description="Milestones in your beauty journey."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {badges.map((b) => (
          <GlassCard key={b.title} className={b.earned ? "" : "opacity-60"}>
            <div
              className={`grid h-14 w-14 place-items-center rounded-2xl ${
                b.earned
                  ? "bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe"
                  : "bg-beige text-charcoal/50"
              }`}
            >
              <b.icon size={22} />
            </div>
            <p className="mt-5 font-serif text-lg text-charcoal">{b.title}</p>
            <p className="mt-1 text-xs text-charcoal/60">{b.desc}</p>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
              <Trophy size={10} /> {b.earned ? "Earned" : "Locked"}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
