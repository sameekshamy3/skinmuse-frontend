import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, Field, PrimaryButton } from "@/components/auth-layout";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPage,
  head: () => ({
    meta: [
      { title: "Reset password — SkinMuse" },
      { name: "description", content: "Recover access to your SkinMuse profile. We'll send a secure reset link to your inbox." },
      { property: "og:url", content: "/forgot-password" },
    ],
    links: [{ rel: "canonical", href: "/forgot-password" }],
  }),
});

function ForgotPage() {
  return (
    <AuthLayout
      eyebrow="Reset access"
      title={<>Forgot your <em className="italic">key</em>?</>}
      subtitle="Enter the email tied to your SkinMuse profile and we'll send a secure link to reset your password."
    >
      <form className="space-y-4">
        <Field label="Email" type="email" placeholder="you@studio.com" autoComplete="email" />
        <PrimaryButton>Send reset link</PrimaryButton>
      </form>

      <p className="mt-8 text-center text-sm text-charcoal/60">
        Remembered it?{" "}
        <Link to="/login" className="font-medium text-charcoal underline underline-offset-4 decoration-rosegold">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
