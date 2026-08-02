import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  ScanFace,
  Sparkles,
  Wand2,
  GraduationCap,
  Bookmark,
  Heart,
  Play,
  ArrowUpRight,
  Droplet,
  Palette,
  Clock,
  TrendingUp,
  Star,
} from "lucide-react";
import { GlassCard, PageHeader } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkinMuse" },
      { name: "description", content: "Your personal beauty workspace." },
    ],
  }),
  component: DashboardHome,
});

const summaryCards = [
  {
    label: "Recent Face Scan",
    value: "Warm 3.5",
    hint: "Undertone: Peach",
    icon: ScanFace,
    accent: "from-rosegold to-blush",
  },
  {
    label: "Recommended Foundation",
    value: "Dior Forever Skin",
    hint: "Match 97%",
    icon: Droplet,
    accent: "from-blush to-rosegold",
  },
  {
    label: "Recommended Lipstick",
    value: "Rouge Hermès 64",
    hint: "Rose Velours",
    icon: Palette,
    accent: "from-rosegold/80 to-charcoal/60",
  },
  {
    label: "Tutorials Completed",
    value: "12 / 24",
    hint: "Weekly streak: 5",
    icon: GraduationCap,
    accent: "from-charcoal/70 to-rosegold",
  },
];

const quickActions = [
  { label: "Scan Face", to: "/scan", icon: ScanFace },
  { label: "Find Foundation", to: "/recommendations", icon: Droplet },
  { label: "Try Lipstick", to: "/try-on", icon: Wand2 },
  { label: "View Tutorials", to: "/tutorials", icon: Play },
  { label: "Continue Last Session", to: "/history", icon: Clock },
];

const activity = [
  { title: "AI Face Scan completed", meta: "2 hours ago · Warm undertone", icon: ScanFace },
  { title: "Saved look — 'Champagne Glow'", meta: "Yesterday · 6 products", icon: Bookmark },
  { title: "Watched: Everyday Radiance", meta: "2 days ago · 8 min", icon: Play },
  { title: "Virtual Try-On — Chanel Rouge Allure", meta: "3 days ago", icon: Wand2 },
  { title: "Favorited Charlotte Tilbury Pillow Talk", meta: "5 days ago", icon: Heart },
];

function DashboardHome() {
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => api.get("/dashboard"),
  });

  const profile = dashboardData?.profile;
  const latestScan = dashboardData?.latestScan;
  const latestRecs = dashboardData?.latestRecommendations;

  const dynamicSummaryCards = [
    {
      label: "Recent Face Scan",
      value: latestScan ? latestScan.colorAnalysis?.undertone || "Unknown" : "No scans yet",
      hint: latestScan ? `Match: ${latestScan.colorAnalysis?.skinTone || "N/A"}` : "Scan your face",
      icon: ScanFace,
      accent: "from-rosegold to-blush",
    },
    {
      label: "Recommended Foundation",
      value: latestRecs?.products?.[0]?.name || "Not available",
      hint: latestRecs ? "Match 97%" : "Get recommendations",
      icon: Droplet,
      accent: "from-blush to-rosegold",
    },
    {
      label: "Recommended Lipstick",
      value: latestRecs?.products?.[1]?.name || "Not available",
      hint: latestRecs ? "Perfect for you" : "Get recommendations",
      icon: Palette,
      accent: "from-rosegold/80 to-charcoal/60",
    },
    {
      label: "Total Scans",
      value: dashboardData?.stats?.totalScans || 0,
      hint: "Lifetime",
      icon: GraduationCap,
      accent: "from-charcoal/70 to-rosegold",
    },
  ];

  if (isLoading) {
    return <div className="p-8 text-center text-charcoal/50 font-medium">Loading your Muse...</div>;
  }

  return (
    <div>
      <PageHeader
        eyebrow="Welcome back"
        title={`Good morning, ${profile?.name?.split(' ')[0] || 'Muse'} ✨`}
        description="Your bespoke beauty concierge has curated fresh recommendations tailored to your skin today."
        actions={
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory shadow-sm hover:bg-rosegold hover:shadow-luxe"
          >
            <ScanFace size={14} /> New Face Scan
          </Link>
        }
      />

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dynamicSummaryCards.map((c) => (
          <GlassCard key={c.label} className="group">
            <div className="flex items-start justify-between gap-3">
              <div
                className={`grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br ${c.accent} text-ivory shadow-soft`}
              >
                <c.icon size={18} />
              </div>
              <ArrowUpRight
                size={16}
                className="text-charcoal/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-rosegold"
              />
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
              {c.label}
            </p>
            <p className="mt-1 font-serif text-2xl text-charcoal leading-tight">{c.value}</p>
            <p className="mt-1 text-xs text-charcoal/50">{c.hint}</p>
          </GlassCard>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-charcoal/50">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {quickActions.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-luxe"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-beige text-charcoal group-hover:bg-charcoal group-hover:text-ivory transition-colors">
                <a.icon size={16} />
              </div>
              <span className="min-w-0 truncate text-sm font-medium text-charcoal">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <GlassCard className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl text-charcoal">Recent Activity</h2>
              <p className="text-xs text-charcoal/50">The story of your last week in beauty.</p>
            </div>
            <Link
              to="/history"
              className="text-[11px] uppercase tracking-[0.2em] text-rosegold hover:text-charcoal"
            >
              View all
            </Link>
          </div>
          <ol className="relative space-y-5 border-l border-charcoal/10 pl-6">
            {activity.map((a, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[29px] top-1 grid h-6 w-6 place-items-center rounded-full bg-white shadow-soft ring-1 ring-charcoal/5">
                  <a.icon size={12} className="text-rosegold" />
                </span>
                <p className="text-sm font-medium text-charcoal">{a.title}</p>
                <p className="text-xs text-charcoal/50">{a.meta}</p>
              </li>
            ))}
          </ol>
        </GlassCard>

        {/* Quick insights */}
        <div className="space-y-6">
          <GlassCard>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
              <Sparkles size={12} /> Today's Beauty Tip
            </div>
            <p className="mt-4 font-serif text-xl leading-snug text-charcoal">
              Press, don't rub. A stippling motion sets liquid foundation into a second-skin finish.
            </p>
            <p className="mt-3 text-xs text-charcoal/50">Curated by SkinMuse AI</p>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/60">
                <TrendingUp size={12} /> Weekly Insights
              </div>
              <span className="text-[10px] text-charcoal/40">Nov 4 – 10</span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                { label: "Scans", value: 4, max: 7 },
                { label: "Try-Ons", value: 9, max: 12 },
                { label: "Tutorials", value: 3, max: 5 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs text-charcoal/70">
                    <span>{row.label}</span>
                    <span>{row.value}/{row.max}</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-beige">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rosegold to-blush"
                      style={{ width: `${(row.value / row.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/60">
              <Star size={12} /> Favorite Product
            </div>
            <p className="mt-4 font-serif text-lg text-charcoal">Chanel Les Beiges Water-Fresh</p>
            <p className="mt-1 text-xs text-charcoal/50">Worn in 8 of your saved looks</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
