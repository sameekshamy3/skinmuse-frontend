import { Instagram, Facebook } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 grid gap-12 md:grid-cols-4">
        <div className="col-span-2">
          <h2 className="font-serif text-3xl mb-5">SkinMuse</h2>
          <p className="text-ivory/50 max-w-sm leading-relaxed">
            The intersection of luxury artistry and neural intelligence. We help you find beauty
            that was made for you.
          </p>
          <div className="flex gap-3 mt-8">
            {[Instagram, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid size-10 place-items-center rounded-full border border-ivory/15 text-ivory/70 hover:border-rosegold hover:text-rosegold transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/80">
            Platform
          </h4>
          <ul className="space-y-4 text-sm text-ivory/60 font-light">
            {["AI Analysis", "Virtual Try-On", "Concierge", "Beauty Quiz"].map((t) => (
              <li key={t}>
                <a href="#" className="hover:text-ivory transition-colors">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-ivory/80">
            Company
          </h4>
          <ul className="space-y-4 text-sm text-ivory/60 font-light">
            {["Our Science", "Brand Partners", "Privacy", "Contact"].map((t) => (
              <li key={t}>
                <a href="#" className="hover:text-ivory transition-colors">
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-8 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row gap-3 justify-between text-[10px] uppercase tracking-[0.25em] text-ivory/30">
        <span>© 2026 SkinMuse Intelligence</span>
        <span>Crafted with care · Paris</span>
      </div>
    </footer>
  );
}
