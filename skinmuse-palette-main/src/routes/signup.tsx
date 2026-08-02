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

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Create an account — SkinMuse" },
      { name: "description", content: "Join SkinMuse to unlock AI-powered shade matching, curated product recommendations, and personalized beauty tutorials." },
      { property: "og:url", content: "/signup" },
    ],
    links: [{ rel: "canonical", href: "/signup" }],
  }),
});

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      const { createUserWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      await createUserWithEmailAndPassword(auth, email, password);
      await api.post("/auth/sync", {
        name: `${firstName} ${lastName}`,
        email,
      });
      navigate({ to: "/dashboard" });
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="Begin the ritual"
      title={<>Join the <em className="italic">Muse</em>.</>}
      subtitle="Create your profile to save your diagnostic shade and receive curated edits."
    >
      <div className="space-y-3">
        <GoogleButton label="Sign up with Google" />
      </div>

      <Divider label="or with email" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" placeholder="Amara" autoComplete="given-name" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
          <Field label="Last name" placeholder="Okafor" autoComplete="family-name" value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
        </div>
        <Field label="Email" type="email" placeholder="you@studio.com" autoComplete="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
        <Field label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
        <label className="flex items-start gap-3 pt-1 text-xs text-charcoal/60">
          <input type="checkbox" className="mt-0.5 accent-rosegold" required />
          <span>
            I agree to the{" "}
            <a href="#" className="underline decoration-rosegold underline-offset-2">Terms</a>{" "}
            &{" "}
            <a href="#" className="underline decoration-rosegold underline-offset-2">Privacy Policy</a>.
          </span>
        </label>
        <PrimaryButton disabled={loading}>{loading ? "Creating..." : "Create Account"}</PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-charcoal/60">
        Already a muse?{" "}
        <Link to="/login" className="font-medium text-charcoal underline underline-offset-4 decoration-rosegold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
