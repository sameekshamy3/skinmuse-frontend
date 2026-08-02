import { Link } from "@tanstack/react-router";
import { Heart, Star, GitCompareArrows, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/mock-data";

export function ShadeSwatch({ hex, size = 22 }: { hex: string; size?: number }) {
  return (
    <span
      className="inline-block rounded-full ring-2 ring-white shadow-sm"
      style={{ background: hex, width: size, height: size }}
      aria-hidden
    />
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-soft backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-luxe">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{
          background: `radial-gradient(120% 90% at 30% 20%, ${product.shadeHex}66, transparent 60%), linear-gradient(135deg, #f7ecdd 0%, #f2d8d4 60%, #eac6b8 100%)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="h-40 w-32 rounded-[28px] shadow-luxe ring-1 ring-white/60"
            style={{
              background: `linear-gradient(160deg, ${product.shadeHex}, ${product.shadeHex}cc 60%, #ffffff33)`,
            }}
          />
        </div>
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal/70 backdrop-blur">
            {product.matchPercent}% match
          </span>
          <span className="rounded-full bg-rosegold/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ivory backdrop-blur">
            {product.undertoneMatch}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button
            aria-label="Save to favorites"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-charcoal/70 shadow-sm backdrop-blur transition hover:bg-white hover:text-rosegold"
          >
            <Heart size={15} />
          </button>
          <button
            aria-label="Compare"
            className="grid h-9 w-9 place-items-center rounded-full bg-white/85 text-charcoal/70 shadow-sm backdrop-blur transition hover:bg-white hover:text-rosegold"
          >
            <GitCompareArrows size={15} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rosegold">
            {product.brand}
          </p>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="mt-1 line-clamp-2 font-serif text-lg leading-tight text-charcoal hover:text-rosegold"
          >
            {product.name}
          </Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-charcoal/60">
          <ShadeSwatch hex={product.shadeHex} size={16} />
          <span className="truncate">
            {product.shadeName} · #{product.shadeNumber}
          </span>
        </div>

        <p className="line-clamp-2 text-xs text-charcoal/60">{product.description}</p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-charcoal/70">
            <Star size={12} className="fill-rosegold text-rosegold" />
            <span className="font-medium text-charcoal">{product.rating.toFixed(1)}</span>
            <span className="text-charcoal/40">({product.reviews.toLocaleString()})</span>
          </div>
          <span className="font-serif text-base text-charcoal">₹{product.price}</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-charcoal py-2 text-[11px] font-medium text-ivory transition hover:bg-rosegold">
            <ShoppingBag size={12} /> Buy Now
          </button>
          <Link
            to="/product/$id"
            params={{ id: product.id }}
            className="rounded-full border border-charcoal/10 bg-white/80 px-3 py-2 text-[11px] font-medium text-charcoal hover:bg-beige"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
