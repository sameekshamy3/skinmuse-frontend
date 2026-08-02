import type { ReactNode } from "react";
import { Check, AlertCircle, Loader2 } from "lucide-react";

export function ScanShell({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 sm:p-10 shadow-luxe backdrop-blur-2xl">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-rosegold/15 blur-3xl" />
        <div className="relative">
          <header className="mb-8 text-center sm:text-left">
            {eyebrow && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-rosegold">
                {eyebrow}
              </span>
            )}
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl leading-tight text-charcoal">
              {title}
            </h1>
            {description && (
              <p className="mt-3 max-w-2xl text-sm text-charcoal/60 mx-auto sm:mx-0">
                {description}
              </p>
            )}
          </header>
          {children}
          {footer && (
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-all hover:bg-rosegold hover:shadow-luxe disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-charcoal/10 bg-white/70 px-6 py-3 text-sm font-medium text-charcoal transition-all hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function StepIndicator({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em]">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full border transition-all ${
                active
                  ? "border-rosegold bg-rosegold text-ivory"
                  : done
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-charcoal/15 bg-white/60 text-charcoal/40"
              }`}
            >
              {done ? <Check size={12} /> : i + 1}
            </span>
            <span
              className={
                active ? "text-charcoal" : done ? "text-charcoal/60" : "text-charcoal/30"
              }
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="mx-1 h-px w-6 bg-charcoal/10 sm:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function CheckRow({
  ok,
  label,
  hint,
  pending,
}: {
  ok: boolean;
  label: string;
  hint?: string;
  pending?: boolean;
}) {
  return (
    <li className="flex items-start gap-3 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-xl">
      <span
        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full ${
          pending
            ? "bg-beige text-charcoal/40"
            : ok
              ? "bg-charcoal text-ivory"
              : "bg-blush/60 text-rosegold"
        }`}
      >
        {pending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : ok ? (
          <Check size={14} />
        ) : (
          <AlertCircle size={14} />
        )}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-charcoal">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-charcoal/50">{hint}</p>}
      </div>
    </li>
  );
}
