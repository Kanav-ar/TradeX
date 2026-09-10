import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../../context/Auth/AuthContext";
import EmailStatus from "../email/EmailStatus";

export default function Security() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to load security settings.
        </p>
      </div>
    );
  }

  const isVerified = currentUser.isEmailVerified === true;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <Link
        to="/profile"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

      <div className="mt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
          Account security
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Keep your account secure.
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Manage your TradeX authentication and keep your account protected.
        </p>
      </div>

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-[#0d1421]">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500">
          Security overview
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <SecurityStatusCard
            icon={
              isVerified ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )
            }
            title="Email verification"
            description={
              isVerified
                ? "Your email address has been verified."
                : "Your email address still needs verification."
            }
            status={isVerified ? "Verified" : "Action required"}
            verified={isVerified}
          />

          <SecurityStatusCard
            icon={<LockKeyhole className="h-5 w-5" />}
            title="Password authentication"
            description="Your account is protected by password authentication."
            status="Enabled"
            verified
          />
        </div>
      </div>

      
      {!isVerified && (
        <div className="mt-5">
          <EmailStatus />
        </div>
      )}

  
      <div className="mt-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
          Security actions
        </p>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0d1421]">
          <SecurityAction
            icon={<KeyRound className="h-5 w-5" />}
            title="Change password"
            description="Update your current TradeX password."
            href="/change-password"
          />

          <SecurityAction
            icon={<LockKeyhole className="h-5 w-5" />}
            title="Reset your password"
            description="Use password recovery if you no longer remember your password."
            href="/forgot-password"
            last
          />
        </div>
      </div>

      {/* Security note */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/40 dark:bg-blue-950/20">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
          Keep your credentials private
        </p>

        <p className="mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400">
          Never share your password or verification links with anyone.
          TradeX will never ask you to disclose your password.
        </p>
      </div>
    </div>
  );
}

function SecurityStatusCard({
  icon,
  title,
  description,
  status,
  verified,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
  verified: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5 dark:border-gray-700">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            verified
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400"
          }`}
        >
          {icon}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
            verified
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
              : "bg-red-50 text-red-500 dark:bg-red-950/30 dark:text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-sm font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function SecurityAction({
  icon,
  title,
  description,
  href,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  last?: boolean;
}) {
  return (
    <Link
      to={href}
      className={`group flex items-center justify-between gap-5 px-5 py-5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/40 ${
        !last ? "border-b border-gray-100 dark:border-gray-800" : ""
      }`}
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-500" />
    </Link>
  );
}