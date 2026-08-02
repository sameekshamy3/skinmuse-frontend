import { createFileRoute } from "@tanstack/react-router";
import { Crown, Check } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/subscription")({
  head: () => ({ meta: [{ title: "Subscription — SkinMuse" }] }),
  component: Subscription,
});

const plans = [
  {
    name: "Discover",
    price: "Free",
    perks: ["2 AI scans / month", "Basic recommendations", "Access to community tutorials"],
  },
  {
    name: "Atelier",
    price: "$18/mo",
    perks: ["Unlimited AI scans", "Curated brand edits", "Virtual try-on", "Priority concierge"],
    featured: true,
  },
  {
    name: "Maison",
    price: "$42/mo",
    perks: ["Everything in Atelier", "1:1 artist consultations", "Early product access", "Personalized routines"],
  },
];

function Subscription() {
  return (
    <div>
      <PageHeader
        eyebrow="Membership"
        title="Subscription"
        description="Choose the level of concierge that suits your rituals."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <GlassCard
            key={p.name}
            className={p.featured ? "ring-2 ring-rosegold/60 !shadow-luxe" : ""}
          >
            <div className="flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-rosegold to-blush text-ivory">
                <Crown size={18} />
              </div>
              {p.featured && (
                <span className="rounded-full bg-charcoal px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory">
                  Current
                </span>
              )}
            </div>
            <p className="mt-6 font-serif text-2xl text-charcoal">{p.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-charcoal/50">{p.price}</p>
            <ul className="mt-5 space-y-2 text-sm text-charcoal/80">
              {p.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <Check size={14} className="mt-0.5 text-rosegold" /> {perk}
                </li>
              ))}
            </ul>
            <button
              className={`mt-6 w-full rounded-full py-3 text-xs font-medium ${
                p.featured
                  ? "border border-charcoal/10 bg-white/70 text-charcoal hover:bg-beige"
                  : "bg-charcoal text-ivory hover:bg-rosegold"
              }`}
            >
              {p.featured ? "Manage plan" : "Upgrade"}
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
