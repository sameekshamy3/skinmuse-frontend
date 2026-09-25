import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import authBackdrop from "@/assets/auth-backdrop.jpg";

export function AuthLayout({
  children,
  eyebrow,
  title,
  subtitle,
}: {
  children: ReactNode;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-ivory text-charcoal">
      {/* Left visual */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={authBackdrop}
          alt="Luxury makeup flatlay"
          width={1280}
          height={1600}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ivory/30 via-transparent to-charcoal/30" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12">
          <Link to="/" className="font-serif text-2xl font-bold text-charcoal drop-shadow-sm">
            SkinMuse
          </Link>
          <div className="max-w-md">
            <p className="font-serif text-3xl italic text-charcoal leading-snug drop-shadow-sm">
              "The most sophisticated shade-match I've ever experienced."
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-charcoal/60">
              — Vogue Beauty
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="relative flex items-center justify-center px-5 sm:px-10 py-16 overflow-hidden">
        <div className="absolute -top-32 -right-32 size-96 bg-blush/40 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 size-96 bg-rosegold/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative w-full max-w-md">
          <Link
            to="/"
            className="lg:hidden mb-10 inline-block font-serif text-2xl font-bold text-charcoal"
          >
            SkinMuse
          </Link>

          <div className="rounded-3xl border border-white/60 bg-white/70 p-8 sm:p-10 shadow-luxe backdrop-blur-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rosegold">
              {eyebrow}
            </span>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl leading-tight">{title}</h1>
            <p className="mt-3 text-sm text-charcoal/60">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GoogleButton({ label = "Continue with Google", onClick, disabled }: { label?: string; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-3 rounded-2xl border border-charcoal/10 bg-white py-3.5 text-sm font-medium text-charcoal shadow-sm hover:bg-beige/50 transition-colors disabled:opacity-50"
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12S6.8 21.5 12 21.5c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2.1H12z"
        />
      </svg>
      {label}
    </button>
  );
}

export function Divider({ label }: { label: string }) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-charcoal/10" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white/70 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-charcoal/40">
          {label}
        </span>
      </div>
    </div>
  );
}

import { InputHTMLAttributes } from "react";

export function Field({
  label,
  ...props
}: {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/60">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-charcoal/10 bg-white/60 px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-rosegold/40 focus:border-rosegold/40 transition disabled:opacity-50"
      />
    </label>
  );
}

import { ButtonHTMLAttributes } from "react";

export function PrimaryButton({ children, ...props }: { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`w-full rounded-2xl bg-charcoal py-3.5 text-sm font-medium text-ivory shadow-sm hover:bg-rosegold hover:shadow-luxe transition-all disabled:opacity-50 disabled:cursor-not-allowed ${props.className || ''}`}
    >
      {children}
    </button>
  );
}
