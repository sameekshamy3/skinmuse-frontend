import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon,
  primaryHref = "/dashboard",
  primaryLabel = "Back to Dashboard",
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-10 sm:p-16 shadow-luxe backdrop-blur-2xl">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rosegold/15 blur-3xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="grid h-24 w-24 place-items-center rounded-3xl bg-gradient-to-br from-rosegold/90 to-blush text-ivory shadow-luxe">
            {icon}
          </div>
          <span className="mt-8 text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl leading-tight text-charcoal">
            {title}
          </h1>
          <p className="mt-4 max-w-xl text-charcoal/60">{description}</p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-rosegold/30 bg-rosegold/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-rosegold">
            <Sparkles size={12} />
            Coming in a future module
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to={primaryHref}
              className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-all hover:bg-rosegold hover:shadow-luxe"
            >
              {primaryLabel}
            </Link>
            <Link
              to="/help"
              className="rounded-full border border-charcoal/10 bg-white/70 px-6 py-3 text-sm font-medium text-charcoal hover:bg-beige"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight text-charcoal">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm text-charcoal/60">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/60 bg-white/60 p-6 shadow-soft backdrop-blur-xl transition-all hover:shadow-luxe ${className}`}
    >
      {children}
    </div>
  );
}
