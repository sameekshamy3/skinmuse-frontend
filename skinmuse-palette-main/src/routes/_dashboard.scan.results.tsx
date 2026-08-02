import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  Droplet,
  Palette,
  Sun,
  Circle,
  Waves,
  Zap,
  ArrowRight,
  RefreshCcw,
  Share2,
  Download,
} from "lucide-react";
import type { ReactNode } from "react";
import { GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/scan/results")({
  head: () => ({
    meta: [
      { title: "Analysis Ready — SkinMuse" },
      { name: "description", content: "Your personalized skin analysis." },
    ],
  }),
  component: ResultsPage,
});

// TODO: replace mock data with real analysis payload from AI backend.
const MOCK = {
  skinTone: { label: "Warm Ivory", value: "W3.5", swatch: "#E8C6A8" },
  undertone: { label: "Peach", value: "Warm", swatch: "#F1B99B" },
  skinType: { label: "Combination", value: "T-zone oily" },
  darkCircles: { label: "Mild", value: "Level 2 / 5" },
  pigmentation: { label: "Minimal", value: "Even tone" },
  acne: { label: "Clear", value: "0 active" },
};

const RECS = [
  {
    icon: Palette,
    kind: "Foundation",
    name: "Dior Forever Skin Glow",
    shade: "3WP · Warm Peach",
    match: 97,
  },
  {
    icon: Circle,
    kind: "Concealer",
    name: "NARS Radiant Creamy",
    shade: "Vanilla",
    match: 94,
  },
  {
    icon: Droplet,
    kind: "Lipstick",
    name: "Chanel Rouge Coco Bloom",
    shade: "116 · Dream",
    match: 92,
  },
];

function ResultsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 sm:p-10 shadow-luxe backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rosegold/15 blur-3xl" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rosegold/30 bg-rosegold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-rosegold">
              <Sparkles size={12} /> Analysis Ready
            </span>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight text-charcoal">
              Your SkinMuse profile
            </h1>
            <p className="mt-3 max-w-xl text-sm text-charcoal/60">
              A snapshot of your tone, undertone, and skin story — with hand-picked shades
              tailored to you.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige">
              <Share2 size={14} /> Share
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-4 py-2.5 text-xs font-medium text-charcoal hover:bg-beige">
              <Download size={14} /> Save PDF
            </button>
          </div>
        </div>

        <div className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            icon={<Palette size={18} />}
            label="Skin Tone"
            value={MOCK.skinTone.label}
            hint={MOCK.skinTone.value}
            swatch={MOCK.skinTone.swatch}
          />
          <MetricCard
            icon={<Sun size={18} />}
            label="Undertone"
            value={MOCK.undertone.label}
            hint={MOCK.undertone.value}
            swatch={MOCK.undertone.swatch}
          />
          <MetricCard
            icon={<Droplet size={18} />}
            label="Skin Type"
            value={MOCK.skinType.label}
            hint={MOCK.skinType.value}
          />
          <MetricCard
            icon={<Circle size={18} />}
            label="Dark Circles"
            value={MOCK.darkCircles.label}
            hint={MOCK.darkCircles.value}
          />
          <MetricCard
            icon={<Waves size={18} />}
            label="Pigmentation"
            value={MOCK.pigmentation.label}
            hint={MOCK.pigmentation.value}
          />
          <MetricCard
            icon={<Zap size={18} />}
            label="Acne"
            value={MOCK.acne.label}
            hint={MOCK.acne.value}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">
              Curated for you
            </span>
            <h2 className="mt-1 font-serif text-2xl text-charcoal">Recommended shades</h2>
          </div>
          <Link
            to="/recommendations"
            className="hidden text-xs font-medium uppercase tracking-[0.2em] text-charcoal/60 hover:text-rosegold sm:inline-flex sm:items-center sm:gap-1"
          >
            See all <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECS.map((r) => {
            const Icon = r.icon;
            return (
              <GlassCard key={r.name}>
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-soft">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-charcoal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory">
                    {r.match}% match
                  </span>
                </div>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-rosegold">
                  {r.kind}
                </p>
                <p className="mt-1 font-serif text-lg text-charcoal">{r.name}</p>
                <p className="mt-1 text-sm text-charcoal/60">{r.shade}</p>
              </GlassCard>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/scan"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-6 py-3 text-sm font-medium text-charcoal hover:bg-beige"
          >
            <RefreshCcw size={14} /> Rescan
          </Link>
          <Link
            to="/recommendations"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-all hover:bg-rosegold hover:shadow-luxe"
          >
            See full recommendations <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  hint,
  swatch,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  swatch?: string;
}) {
  return (
    <div className="rounded-3xl border border-white/60 bg-white/60 p-5 shadow-soft backdrop-blur-xl transition-all hover:shadow-luxe">
      <div className="flex items-center justify-between">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-beige text-charcoal/70">
          {icon}
        </div>
        {swatch && (
          <span
            className="h-8 w-8 rounded-full border border-white/80 shadow-soft"
            style={{ background: swatch }}
            aria-hidden
          />
        )}
      </div>
      <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-charcoal/50">
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl text-charcoal">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-charcoal/50">{hint}</p>}
    </div>
  );
}
