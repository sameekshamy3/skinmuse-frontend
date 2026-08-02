import { createFileRoute } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — SkinMuse" }] }),
  component: Wishlist,
});

const items = [
  { brand: "Hermès", name: "Rouge Hermès Satin — 64 Rose Velours", price: "$77" },
  { brand: "La Mer", name: "The Concentrate", price: "$395" },
  { brand: "Dior", name: "Forever Skin Glow Foundation", price: "$56" },
];

function Wishlist() {
  return (
    <div>
      <PageHeader eyebrow="Library" title="Wishlist" description="A private atelier of desires." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => (
          <GlassCard key={i.name}>
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blush to-rosegold text-ivory">
                <Gift size={18} />
              </div>
              <span className="text-xs font-medium text-rosegold">{i.price}</span>
            </div>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
              {i.brand}
            </p>
            <p className="mt-1 font-serif text-lg leading-tight text-charcoal">{i.name}</p>
            <button className="mt-4 text-[11px] uppercase tracking-[0.2em] text-rosegold hover:text-charcoal">
              View details →
            </button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
