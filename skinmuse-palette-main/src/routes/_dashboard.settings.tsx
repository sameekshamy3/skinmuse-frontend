import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Moon, Monitor, Trash2 } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — SkinMuse" }] }),
  component: Settings,
});

const tabs = [
  "General",
  "Appearance",
  "Notifications",
  "Privacy",
  "Security",
  "Language",
  "Accessibility",
  "Connected Accounts",
  "Subscription",
  "Billing",
];

function Toggle({ label, hint, defaultOn }: { label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="flex items-start justify-between gap-6 border-b border-charcoal/5 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-charcoal">{label}</p>
        {hint && <p className="mt-1 text-xs text-charcoal/50">{hint}</p>}
      </div>
      <button
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          on ? "bg-rosegold" : "bg-charcoal/20"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function Settings() {
  const [tab, setTab] = useState("General");
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  return (
    <div>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Refine SkinMuse to your rituals."
      />
      <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside>
          <GlassCard className="!p-3">
            <ul className="space-y-1">
              {tabs.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => setTab(t)}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                      tab === t
                        ? "bg-charcoal text-ivory"
                        : "text-charcoal/70 hover:bg-beige/70"
                    }`}
                  >
                    {t}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-destructive hover:bg-destructive/5">
                  <Trash2 size={14} /> Delete Account
                </button>
              </li>
            </ul>
          </GlassCard>
        </aside>

        <div className="space-y-6">
          {tab === "Appearance" ? (
            <GlassCard>
              <h4 className="font-serif text-xl text-charcoal">Appearance</h4>
              <p className="mt-1 text-xs text-charcoal/50">Choose how SkinMuse feels for you.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { id: "light", label: "Light", icon: Sun },
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "system", label: "System", icon: Monitor },
                ].map((opt) => {
                  const active = theme === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id as typeof theme)}
                      className={`flex flex-col items-center gap-3 rounded-2xl border p-6 transition ${
                        active
                          ? "border-rosegold bg-rosegold/5 shadow-luxe"
                          : "border-charcoal/10 bg-white/60 hover:bg-white"
                      }`}
                    >
                      <opt.icon
                        size={22}
                        className={active ? "text-rosegold" : "text-charcoal/60"}
                      />
                      <span className="text-sm text-charcoal">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          ) : tab === "Notifications" ? (
            <GlassCard>
              <h4 className="font-serif text-xl text-charcoal">Notifications</h4>
              <div className="mt-4">
                <Toggle label="Personalized recommendations" hint="Weekly curated edits from SkinMuse AI." defaultOn />
                <Toggle label="Offers & launches" hint="Early access from featured maisons." defaultOn />
                <Toggle label="Tutorial updates" hint="New lessons matched to your goals." />
                <Toggle label="Account activity" defaultOn />
                <Toggle label="System notifications" />
              </div>
            </GlassCard>
          ) : (
            <GlassCard>
              <h4 className="font-serif text-xl text-charcoal">{tab}</h4>
              <p className="mt-1 text-xs text-charcoal/50">
                Refined controls for {tab.toLowerCase()}.
              </p>
              <div className="mt-4">
                <Toggle label={`Enable ${tab}`} hint="Recommended setting" defaultOn />
                <Toggle label="Send anonymized analytics" hint="Helps us refine the AI." defaultOn />
                <Toggle label="Advanced options" />
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button className="rounded-full border border-charcoal/10 bg-white/70 px-5 py-2.5 text-xs font-medium text-charcoal hover:bg-beige">
                  Reset
                </button>
                <button className="rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold">
                  Save changes
                </button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
