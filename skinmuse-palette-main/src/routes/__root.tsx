import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-charcoal">404</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-charcoal/50">Page not found</p>
        <p className="mt-3 text-charcoal/60">
          The shade you're looking for doesn't exist here.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory transition-colors hover:bg-rosegold"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-charcoal">Something wasn't quite right</h1>
        <p className="mt-3 text-charcoal/60">
          A gentle glitch on our end. Try again or head home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-ivory hover:bg-rosegold transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-charcoal/10 px-6 py-3 text-sm font-medium text-charcoal hover:bg-beige transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SkinMuse — Discover Your Perfect Shade" },
      {
        name: "description",
        content:
          "AI-powered luxury beauty concierge. Get precise foundation, concealer, and lipstick matches curated for your skin.",
      },
      { name: "author", content: "SkinMuse" },
      { property: "og:title", content: "SkinMuse — Discover Your Perfect Shade" },
      {
        property: "og:description",
        content:
          "AI-powered luxury beauty concierge. Get precise foundation, concealer, and lipstick matches curated for your skin.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SkinMuse" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SkinMuse — Discover Your Perfect Shade" },
      { name: "twitter:description", content: "AI-powered luxury beauty concierge. Get precise foundation, concealer, and lipstick matches curated for your skin." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3e8742cf-ee40-461e-adae-f8ebe4b1d61a/id-preview-025747e6--b7def1bf-f72a-4e60-bcc8-c3306384d5e8.lovable.app-1784041892737.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3e8742cf-ee40-461e-adae-f8ebe4b1d61a/id-preview-025747e6--b7def1bf-f72a-4e60-bcc8-c3306384d5e8.lovable.app-1784041892737.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
