import { ArrowLeft, AtSign, Mail, UserRound } from "lucide-react";
import { Link } from "react-router";
import { useAuth } from "../../../context/Auth/AuthContext";
import VerifiedBadge from "../../common/VerifiedBadge";
import type { ReactNode } from "react";
import NotVerifiedBadge from "../../common/NotVerfiedBadge";
import BlueBtn from "../../common/BlueBtn";
import VerifyEmailBtn from "../../common/VerifyEmailBtn";

export default function PersonalInformation() {
  const { currentUser } = useAuth();

  const verified = currentUser?.isEmailVerified;
  if (!currentUser) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Unable to load your information.
        </p>
      </div>
    );
  }

  const fullname =
    currentUser.fullname
      ?.trim()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ") || "TradeX User";

  const username = currentUser.username || "user";
  const email = currentUser.email || "";

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
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          Profile
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Personal information
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          The information associated with your TradeX account.
        </p>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#0d1421]">
        <ProfileField
          icon={<UserRound className="h-5 w-5" />}
          label="Full name"
          value={fullname}
        />

        <ProfileField
          icon={<AtSign className="h-5 w-5" />}
          label="Username"
          value={`@${username}`}
        />

        <ProfileField
          icon={<Mail className="h-5 w-5" />}
          label="Email address"
          value={email}
          last
          badge={verified ? <VerifiedBadge /> : <NotVerifiedBadge />}
          btn={!verified && <VerifyEmailBtn/>}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/40">
        <p className="text-xs leading-6 text-gray-500 dark:text-gray-400">
          These details are currently managed through your TradeX account.
        </p>
      </div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  value,
  last = false,
  badge,
  btn,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  last?: boolean;
  badge?: ReactNode;
  btn?: ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-4 px-6 py-6 ${
        !last ? "border-b border-gray-100 dark:border-gray-800" : ""
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400 dark:text-gray-500">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-gray-900 dark:text-white">
          {value}
        </p>
      </div>
      {badge}

      <span className="ml-4">{btn}</span>
    </div>
  );
}
