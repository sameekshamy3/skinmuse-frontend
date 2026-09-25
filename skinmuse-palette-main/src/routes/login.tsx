import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  AuthLayout,
  Divider,
  Field,
  GoogleButton,
  PrimaryButton,
} from "@/components/auth-layout";
import { api } from "@/lib/api";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Sign in — SkinMuse" },
      { name: "description", content: "Sign in to your SkinMuse account to access your shade profile and personalized recommendations." },
      { property: "og:url", content: "/login" },
    ],
    links: [{ rel: "canonical", href: "/login" }],
  }),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      await signInWithEmailAndPassword(auth, email, password);
      // Sync with backend if needed, or just navigate
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const { signInWithPopup } = await import("firebase/auth");
      const { auth, googleProvider } = await import("@/lib/firebase");
      await signInWithPopup(auth, googleProvider);
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={<>Enter your <em className="italic">Muse</em>.</>}
      subtitle="Sign in to revisit your palette and see this month's edit."
    >
      <div className="space-y-3">
        <GoogleButton onClick={handleGoogleSignIn} disabled={loading} />
        <Link
          to="/"
          className="flex w-full items-center justify-center rounded-2xl border border-charcoal/10 bg-white/40 py-3.5 text-sm font-medium text-charcoal/70 hover:bg-beige/50 transition-colors"
        >
          Continue as Guest
        </Link>
      </div>

      <Divider label="or with email" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <Field label="Email" type="email" placeholder="you@studio.com" autoComplete="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Field label="Password" type="password" placeholder="••••••••" autoComplete="current-password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-rosegold hover:underline">
            Forgot password?
          </Link>
        </div>
        <PrimaryButton disabled={loading}>{loading ? "Signing in..." : "Sign in"}</PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-charcoal/60">
        New here?{" "}
        <Link to="/signup" className="font-medium text-charcoal underline underline-offset-4 decoration-rosegold">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
