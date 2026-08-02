import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, MessageCircle, FileText, Info, ShieldCheck, Bug } from "lucide-react";
import { PageHeader, GlassCard } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/help")({
  head: () => ({ meta: [{ title: "Help & Support — SkinMuse" }] }),
  component: Help,
});

const cards = [
  { icon: Mail, title: "Contact Support", desc: "Reach a SkinMuse concierge within a few hours." },
  { icon: Bug, title: "Report a Problem", desc: "Tell us where the experience faltered." },
  { icon: MessageCircle, title: "Send Feedback", desc: "Shape the future of SkinMuse with your voice." },
  { icon: FileText, title: "Terms & Conditions", desc: "The fine print, elegantly written." },
  { icon: ShieldCheck, title: "Privacy Policy", desc: "How we protect your beauty data." },
  { icon: Info, title: "About SkinMuse", desc: "The story behind the muse." },
];

const faqs = [
  { q: "How accurate is the AI Face Scan?", a: "SkinMuse uses studio-calibrated color science for a 97% match confidence." },
  { q: "Which brands do you match?", a: "We curate over 200 luxury and clean beauty houses worldwide." },
  { q: "Can I cancel my subscription anytime?", a: "Yes — manage your plan from Settings → Subscription." },
];

function Help() {
  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Help & Support"
        description="We're here — always."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <GlassCard key={c.title} className="cursor-pointer">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-beige text-charcoal">
              <c.icon size={18} />
            </div>
            <p className="mt-5 font-serif text-lg text-charcoal">{c.title}</p>
            <p className="mt-1 text-xs text-charcoal/60">{c.desc}</p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-charcoal/50">
          Frequently Asked
        </h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <GlassCard key={f.q}>
              <div className="flex items-start gap-4">
                <LifeBuoy size={16} className="mt-1 shrink-0 text-rosegold" />
                <div className="min-w-0">
                  <p className="font-serif text-lg text-charcoal">{f.q}</p>
                  <p className="mt-1 text-sm text-charcoal/60">{f.a}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
