import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/account")({
  head: () => ({ meta: [{ title: "Account — SkinMuse" }] }),
  component: Account,
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/50">
        {label}
      </p>
      <p className="mt-1 text-sm text-charcoal">{value}</p>
    </div>
  );
}

function Account() {
  return (
    <div>
      <PageHeader
        eyebrow="Your account"
        title="Account Overview"
        description="Manage the details of your SkinMuse identity."
        actions={
          <Link
            to="/settings"
            className="rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-xs font-medium text-charcoal hover:bg-beige"
          >
            Open settings
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard>
          <div className="flex flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-rosegold to-blush text-2xl font-semibold text-ivory shadow-luxe">
              SA
            </div>
            <h3 className="mt-4 font-serif text-2xl text-charcoal">Sarah Ainsley</h3>
            <p className="text-xs text-charcoal/50">sarah@skinmuse.co</p>
            <button className="mt-6 w-full rounded-full bg-charcoal py-3 text-xs font-medium text-ivory hover:bg-rosegold">
              Change photo
            </button>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h4 className="font-serif text-xl text-charcoal">Personal details</h4>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <Field label="Full Name" value="Sarah Ainsley" />
            <Field label="Email" value="sarah@skinmuse.co" />
            <Field label="Phone" value="+1 (415) 555 0134" />
            <Field label="Date Joined" value="September 12, 2026" />
            <Field label="Account Status" value="Active" />
            <Field label="Subscription" value="Atelier — $18/mo" />
            <Field label="Preferred Language" value="English (US)" />
            <Field label="Country" value="United States" />
          </div>
          <button className="mt-8 rounded-full bg-charcoal px-6 py-3 text-xs font-medium text-ivory hover:bg-rosegold">
            Edit profile
          </button>
        </GlassCard>

        <GlassCard className="lg:col-span-3">
          <h4 className="font-serif text-xl text-charcoal">Beauty preferences</h4>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Favorite Brands" value="Dior · Chanel · Hermès" />
            <Field label="Budget Preference" value="Luxury ($$$$)" />
            <Field label="Skin Tone" value="Medium — Warm 3.5" />
            <Field label="Undertone" value="Peach / Golden" />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
