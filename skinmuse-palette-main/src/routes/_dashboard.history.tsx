import { createFileRoute, Link } from "@tanstack/react-router";
import { History, ScanFace } from "lucide-react";
import { PageHeader } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/history")({
  head: () => ({ meta: [{ title: "Scan History — SkinMuse" }] }),
  component: ScanHistory,
});

const scans = [
  { date: "Nov 8, 2026", shade: "Warm 3.5", undertone: "Peach", light: "Natural daylight" },
  { date: "Oct 24, 2026", shade: "Warm 3.4", undertone: "Peach", light: "Studio" },
  { date: "Oct 3, 2026", shade: "Warm 3.5", undertone: "Golden", light: "Evening warm" },
];

function ScanHistory() {
  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Scan History"
        description="Every AI scan you've captured, beautifully archived."
        actions={
          <Link
            to="/scan"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
          >
            <ScanFace size={14} /> New scan
          </Link>
        }
      />
      <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/60 shadow-soft backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead className="bg-beige/40 text-[10px] uppercase tracking-[0.22em] text-charcoal/50">
            <tr>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">Shade</th>
              <th className="px-6 py-4 text-left">Undertone</th>
              <th className="hidden px-6 py-4 text-left sm:table-cell">Lighting</th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/5">
            {scans.map((s) => (
              <tr key={s.date} className="hover:bg-white/50">
                <td className="px-6 py-4 text-charcoal">{s.date}</td>
                <td className="px-6 py-4 font-serif text-charcoal">{s.shade}</td>
                <td className="px-6 py-4 text-charcoal/70">{s.undertone}</td>
                <td className="hidden px-6 py-4 text-charcoal/70 sm:table-cell">{s.light}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-[11px] uppercase tracking-[0.2em] text-rosegold hover:text-charcoal">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-charcoal/5 bg-white/40 px-5 py-3 text-xs text-charcoal/60">
        <History size={14} className="text-rosegold" />
        Rich comparisons and downloadable reports arrive with the AI Scan module.
      </div>
    </div>
  );
}
