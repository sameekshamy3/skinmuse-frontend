import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Plus } from "lucide-react";
import { PageHeader } from "@/components/dashboard/placeholder-page";

export const Route = createFileRoute("/_dashboard/saved")({
  head: () => ({ meta: [{ title: "Saved Looks — SkinMuse" }] }),
  component: SavedLooks,
});

function SavedLooks() {
  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Saved Looks"
        description="Your personal moodboard of curated beauty edits."
      />
      <div className="mx-auto max-w-2xl rounded-3xl border border-white/60 bg-white/60 p-12 text-center shadow-soft backdrop-blur-xl">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-blush to-rosegold text-ivory shadow-luxe">
          <Bookmark size={32} />
        </div>
        <h2 className="mt-6 font-serif text-2xl text-charcoal">No saved looks yet</h2>
        <p className="mt-2 text-sm text-charcoal/60">
          When you save a look, it will live here — ready to recreate on any occasion.
        </p>
        <Link
          to="/recommendations"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-charcoal px-5 py-2.5 text-xs font-medium text-ivory hover:bg-rosegold"
        >
          <Plus size={14} /> Discover a look
        </Link>
      </div>
    </div>
  );
}
