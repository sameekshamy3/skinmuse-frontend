import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanFace,
  Sparkles,
  Wand2,
  GraduationCap,
  Palette,
  Bookmark,
  History,
  Heart,
  Gift,
  UserCircle2,
  Trophy,
  Crown,
  Settings,
  LifeBuoy,
  LogOut,
  Search,
  Bell,
  Sun,
  Moon,
  Plus,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

type NavItem = { label: string; to: string; icon: typeof LayoutDashboard };

const nav: { section: string; items: NavItem[] }[] = [
  {
    section: "Workspace",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
      { label: "AI Face Scan", to: "/scan", icon: ScanFace },
      { label: "Recommendations", to: "/recommendations", icon: Sparkles },
      { label: "Virtual Try-On", to: "/try-on", icon: Wand2 },
      { label: "Look Builder", to: "/looks", icon: Palette },
      { label: "Tutorials", to: "/tutorials", icon: GraduationCap },
    ],
  },
  {
    section: "Library",
    items: [
      { label: "Saved Looks", to: "/saved", icon: Bookmark },
      { label: "Scan History", to: "/history", icon: History },
      { label: "Favorites", to: "/favorites", icon: Heart },
      { label: "Wishlist", to: "/wishlist", icon: Gift },
      { label: "Search", to: "/search", icon: Search },
    ],
  },
  {
    section: "Account",
    items: [
      { label: "Beauty Profile", to: "/beauty-profile", icon: UserCircle2 },
      { label: "Achievements", to: "/achievements", icon: Trophy },
      { label: "Subscription", to: "/subscription", icon: Crown },
      { label: "Settings", to: "/settings", icon: Settings },
      { label: "Help & Support", to: "/help", icon: LifeBuoy },
    ],
  },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const sidebarW = collapsed ? "lg:w-[84px]" : "lg:w-[264px]";

  return (
    <div className="min-h-screen text-charcoal">
      {/* soft veil so the marble background reads consistently */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-ivory/70 backdrop-blur-[2px]" />

      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex ${sidebarW} w-[280px] transform flex-col border-r border-charcoal/5 bg-white/70 backdrop-blur-2xl transition-all duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between px-5">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rosegold to-blush text-ivory shadow-luxe">
              <span className="font-serif text-lg">S</span>
            </div>
            {!collapsed && (
              <span className="font-serif text-xl font-bold tracking-tight">SkinMuse</span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-full p-2 text-charcoal/60 hover:bg-beige lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {nav.map((group) => (
            <div key={group.section} className="mt-4">
              {!collapsed && (
                <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-charcoal/40">
                  {group.section}
                </p>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = pathname === item.to;
                  const Icon = item.icon;
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all ${
                          active
                            ? "bg-charcoal text-ivory shadow-soft"
                            : "text-charcoal/70 hover:bg-beige/70 hover:text-charcoal"
                        } ${collapsed ? "justify-center" : ""}`}
                        title={collapsed ? item.label : undefined}
                      >
                        <Icon
                          size={18}
                          className={`shrink-0 ${
                            active ? "text-ivory" : "text-charcoal/50 group-hover:text-rosegold"
                          }`}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-charcoal/5 p-3">
          <Link
            to="/"
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-charcoal/70 hover:bg-beige/70 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} className="text-charcoal/50" />
            {!collapsed && <span>Log out</span>}
          </Link>
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="mt-2 hidden w-full items-center justify-center gap-2 rounded-2xl border border-charcoal/10 bg-white/60 py-2 text-xs uppercase tracking-[0.2em] text-charcoal/60 hover:bg-beige/70 lg:flex"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            {!collapsed && "Collapse"}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className={`${collapsed ? "lg:pl-[84px]" : "lg:pl-[264px]"} transition-all duration-300`}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-charcoal/5 bg-ivory/70 backdrop-blur-2xl">
          <div className="flex h-20 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full p-2 text-charcoal/70 hover:bg-beige lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <div className="relative hidden max-w-md flex-1 sm:block">
              <Search
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40"
              />
              <input
                type="search"
                placeholder="Search products, tutorials, shades…"
                className="w-full rounded-full border border-charcoal/10 bg-white/70 py-2.5 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-rosegold/30"
              />
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <button
                className="hidden items-center gap-2 rounded-full bg-charcoal px-4 py-2.5 text-xs font-medium text-ivory shadow-sm transition-all hover:bg-rosegold hover:shadow-luxe sm:inline-flex"
              >
                <Plus size={14} />
                Quick Action
              </button>
              <button
                onClick={() => setDark((v) => !v)}
                className="rounded-full border border-charcoal/10 bg-white/60 p-2.5 text-charcoal/70 hover:bg-beige"
                aria-label="Toggle theme"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <Link
                to="/notifications"
                className="relative rounded-full border border-charcoal/10 bg-white/60 p-2.5 text-charcoal/70 hover:bg-beige"
                aria-label="Notifications"
              >
                <Bell size={16} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rosegold" />
              </Link>
              <Link
                to="/account"
                className="flex items-center gap-2 rounded-full border border-charcoal/10 bg-white/70 py-1.5 pl-1.5 pr-3 hover:bg-beige"
              >
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rosegold to-blush text-xs font-semibold text-ivory">
                  SA
                </div>
                <span className="hidden text-xs font-medium text-charcoal sm:inline">Sarah</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
