import { createFileRoute } from "@tanstack/react-router";
import { UserCircle2 } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/beauty-profile")({
  head: () => ({ meta: [{ title: "Beauty Profile — SkinMuse" }] }),
  component: BeautyProfile,
});

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-charcoal/5 py-3 last:border-0">
      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
        {label}
      </span>
      <span className="text-sm text-charcoal">{value}</span>
    </div>
  );
}

function BeautyProfile() {
  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Beauty Profile"
        description="The essence of your SkinMuse identity."
        actions={
          <button className="rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-xs font-medium text-charcoal hover:bg-beige">
            Edit profile
          </button>
        }
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-rosegold to-blush text-2xl font-semibold text-ivory shadow-luxe">
              SA
            </div>
            <h3 className="mt-4 font-serif text-2xl text-charcoal">Sarah Ainsley</h3>
            <p className="text-xs text-charcoal/50">Muse since Sept 2026</p>
            <span className="mt-4 rounded-full bg-rosegold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
              Atelier Member
            </span>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h4 className="font-serif text-xl text-charcoal">Skin & Complexion</h4>
          <div className="mt-4">
            <Row label="Skin Tone" value="Medium — Warm 3.5" />
            <Row label="Undertone" value="Peach / Golden" />
            <Row label="Skin Type" value="Normal to combination" />
            <Row label="Concerns" value="Uneven texture, hydration" />
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h4 className="font-serif text-xl text-charcoal">Beauty Preferences</h4>
          <div className="mt-4">
            <Row label="Favorite Brands" value="Dior · Chanel · Hermès · La Mer" />
            <Row label="Finish" value="Luminous · Second-skin" />
            <Row label="Coverage" value="Light to medium" />
            <Row label="Budget" value="Luxury ($$$$)" />
          </div>
        </GlassCard>

        <GlassCard>
          <h4 className="font-serif text-xl text-charcoal">Account</h4>
          <div className="mt-4">
            <Row label="Email" value="sarah@skinmuse.co" />
            <Row label="Phone" value="+1 (415) 555 0134" />
            <Row label="Country" value="United States" />
            <Row label="Language" value="English (US)" />
          </div>
          <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-charcoal py-3 text-xs font-medium text-ivory hover:bg-rosegold">
            <UserCircle2 size={14} /> Manage account
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
