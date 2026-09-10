import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  LogOut,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "../context/Auth/AuthContext";
import SignUpBtn from "../components/signupAndLogin/SignupBtn";
import LoginBtn from "../components/signupAndLogin/LoginBtn";

export default function Profile() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return (
      <div className="flex flex-col gap-8 min-h-[70vh] items-center justify-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Unable to load profile.
          <br />
          Please Signup or login.
        </p>
        <div className="flex gap-8">
          <SignUpBtn />
          <LoginBtn />
        </div>
      </div>
    );
  }

  const fullname =
    currentUser.fullname
      ?.trim()
      .split(" ")
      .map((n) => n[0].toUpperCase() + n.slice(1))
      .join(" ") || "TradeX User";
  const username = currentUser.username || "user";
  const email = currentUser.email || "";
  const initial = fullname.charAt(0).toUpperCase();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-500">
          Account
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Your TradeX identity
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
          Manage your personal information, security, and account preferences
          from one place
        </p>
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0d1421]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative p-7 sm:p-9">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div
                className=" flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-3xl font-semibold text-white shadow-lg
                "
              >
                {initial}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {fullname}
                  </h2>

                  {currentUser.isEmailVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  @{username}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  {email}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/50">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                Account status
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
            Overview
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <OverviewCard
            icon={<UserRound className="h-5 w-5" />}
            title="Personal profile"
            description="Your basic TradeX account information."
            status="Up to date"
            iconClass="bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
          />

          <OverviewCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Account security"
            description="Your account is protected with secure authentication."
            status="Protected"
            iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
          />
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
            Account settings
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0d1421]">
          <SettingRow
            icon={<UserRound className="h-5 w-5" />}
            title="Personal information"
            description="View your name, username, and email address."
            action="View profile"
          />

          <SettingRow
            icon={<KeyRound className="h-5 w-5" />}
            title="Change password"
            description="Update your current account password."
            action="Change password"
            href="/change-password"
          />

          <SettingRow
            icon={<LockKeyhole className="h-5 w-5" />}
            title="Security"
            description="Manage the security of your TradeX account."
            action="Review security"
          />
        </div>
      </section>

      <section className="mt-8">
        <button
          type="button"
          onClick={logout}
          className="
            group
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            border
            border-red-100
            bg-red-50/50
            px-5
            py-4
            text-left
            transition-all
            duration-200
            hover:border-red-200
            hover:bg-red-50
            dark:border-red-900/40
            dark:bg-red-950/10
            dark:hover:bg-red-950/20
          "
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-500 dark:bg-red-950/40 dark:text-red-400">
              <LogOut className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Sign out of TradeX
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                End your current session securely.
              </p>
            </div>
          </div>

          <ArrowRight className="h-4 w-4 text-red-400 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </section>

      <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-600">
        TradeX account settings
      </p>
    </div>
  );
}

function OverviewCard({
  icon,
  title,
  description,
  status,
  iconClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-[#0d1421]">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
          {status}
        </span>
      </div>

      <h3 className="mt-5 text-base font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

function SettingRow({
  icon,
  title,
  description,
  action,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-500">
            {description}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-blue-500">
        {action}
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="
          group
          flex
          items-center
          justify-between
          gap-6
          border-b
          border-gray-100
          px-5
          py-5
          transition-colors
          duration-200
          hover:bg-gray-50
          dark:border-gray-800
          dark:hover:bg-gray-800/40
        "
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="
        group
        flex
        w-full
        items-center
        justify-between
        gap-6
        border-b
        border-gray-100
        px-5
        py-5
        text-left
        transition-colors
        duration-200
        hover:bg-gray-50
        dark:border-gray-800
        dark:hover:bg-gray-800/40
      "
    >
      {content}
    </button>
  );
}
