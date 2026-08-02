import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "The AI Scan", href: "#scan" },
  { label: "Collections", href: "#products" },
  { label: "How it Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-charcoal/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-charcoal">
          SkinMuse
        </Link>
        <div className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.18em] text-charcoal/70 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-charcoal transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-charcoal hover:text-rosegold transition-colors sm:inline-block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-charcoal px-5 py-2.5 text-xs sm:text-sm font-medium text-ivory shadow-sm transition-all duration-300 hover:bg-rosegold hover:shadow-luxe"
          >
            Start Scan
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden ml-1 text-charcoal"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-charcoal/5 bg-ivory/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/login"
              className="py-3 text-sm uppercase tracking-[0.18em] text-charcoal/70 hover:text-charcoal"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
