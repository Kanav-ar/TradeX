import { XCircle } from "lucide-react";

export default function NotVerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
      <XCircle className="h-3.5 w-3.5" />
      Not Verified
    </span>
  );
}
