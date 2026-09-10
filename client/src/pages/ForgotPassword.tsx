import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { api } from "../api/axios";
import BlueBtn from "../components/common/BlueBtn";
import TradeXLogo from "../components/common/Logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleForgotPassword(e: React.ChangeEvent) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post("/forgot-password", {
        email: email.trim(),
      });

      toast.success("Reset link sent", {
        description: "Check your inbox for the password reset link.",
      });

      setEmail("");
    } catch (error) {
      console.error("Forgot password failed:", error);

      toast.error("Unable to send reset link", {
        description: "Please check the email address and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-[#070d17]">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <TradeXLogo />
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-700 dark:bg-[#0d1421] sm:p-10">
          <div className="mb-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Mail className="h-5 w-5" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
              Account recovery
            </p>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Forgot your password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Enter the email address associated with your TradeX account and
              we'll send you a password reset link.
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={isSubmitting}
                className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 mb-2 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-600
                "
              />
            </div>
            <BlueBtn
              tag={isSubmitting ? "Sending..." : "Send reset link"}
              disabled={isSubmitting}
            />
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Back to login
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-600">
          Your account security is important to us.
        </p>
      </div>
    </div>
  );
}