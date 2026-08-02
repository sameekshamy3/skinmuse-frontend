import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bell, ShoppingBag, GraduationCap, LineChart, Tag, BadgePercent } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";
import { api } from "@/lib/api";
import { type NotificationItem } from "@/lib/mock-data";

export const Route = createFileRoute("/_dashboard/notifications")({
  head: () => ({ meta: [{ title: "Notifications — SkinMuse" }] }),
  component: Notifications,
});

const FILTERS = ["All", "Unread", "Products", "Tutorials", "Reports", "Offers"] as const;
type Filter = (typeof FILTERS)[number];

const ICONS: Record<NotificationItem["type"], { icon: React.ReactNode; tint: string }> = {
  product: { icon: <ShoppingBag size={15} />, tint: "from-rosegold/80 to-blush" },
  tutorial: { icon: <GraduationCap size={15} />, tint: "from-blush to-rosegold/70" },
  report: { icon: <LineChart size={15} />, tint: "from-charcoal/70 to-rosegold/60" },
  offer: { icon: <BadgePercent size={15} />, tint: "from-rosegold to-charcoal/60" },
  price: { icon: <Tag size={15} />, tint: "from-blush to-charcoal/50" },
};

function Notifications() {
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [filter, setFilter] = useState<Filter>("All");

  const { data: fetchedNotifs = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => api.get("/notifications"),
  });

  useEffect(() => {
    if (fetchedNotifs.length > 0 && items.length === 0) {
      setItems(fetchedNotifs);
    }
  }, [fetchedNotifs]);

  const filtered = items.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return n.unread;
    const map: Record<string, NotificationItem["type"][]> = {
      Products: ["product", "price"],
      Tutorials: ["tutorial"],
      Reports: ["report"],
      Offers: ["offer"],
    };
    return map[filter]?.includes(n.type);
  });

  return (
    <div>
      <PageHeader
        eyebrow="Inbox"
        title="Notifications"
        description="Curated updates from your SkinMuse rituals."
        actions={
          <button
            onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
            className="rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige"
          >
            Mark all as read
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              filter === f
                ? "bg-charcoal text-ivory"
                : "border border-charcoal/10 bg-white/70 text-charcoal/70 hover:bg-beige"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <GlassCard className="!p-2">
        {isLoading ? (
          <div className="p-8 text-center text-charcoal/50">Loading inbox...</div>
        ) : (
        <ul>
          {filtered.map((n) => {
            const { icon, tint } = ICONS[n.type];
            return (
              <li
                key={n.id}
                className={`flex items-start gap-4 rounded-2xl px-4 py-4 transition hover:bg-beige/50 ${
                  n.unread ? "bg-rosegold/[0.04]" : ""
                }`}
              >
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${tint} text-ivory shadow-soft`}
                >
                  {icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start gap-2">
                    <p className="text-sm font-medium text-charcoal">{n.title}</p>
                    {n.unread && <span className="mt-1.5 h-2 w-2 rounded-full bg-rosegold" />}
                  </div>
                  <p className="mt-1 text-xs text-charcoal/60">{n.body}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-charcoal/40">
                    {n.time}
                  </p>
                </div>
              </li>
            );
          })}
          {filtered.length === 0 && (
            <li className="p-10 text-center">
              <Bell size={28} className="mx-auto text-charcoal/30" />
              <p className="mt-3 text-sm text-charcoal/60">You're all caught up.</p>
            </li>
          )}
        </ul>
        )}
      </GlassCard>
    </div>
  );
}
