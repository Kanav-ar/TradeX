import { useState } from "react";
import { api } from "../../../api/axios";
import { useAuth } from "../../../context/Auth/AuthContext";
import BlueBtn from "../../common/BlueBtn";
import { toast } from "sonner";

export default function EmailStatus() {
  const { currentUser } = useAuth();
  const [isResending, setIsResending] = useState(false);

  async function resendVerificationEmail() {
    if (isResending) return;

    try {
      setIsResending(true);

      await api.post("/resend");

      toast.success("Verification email sent", {
      description: "Check your inbox for the verification link.",
    });
    } catch (error) {
      console.error("Failed to resend verification email:", error);
      toast.error("Unable to send email", {
      description: "Please try again in a moment.",
    });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/50">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
        Email
      </p>

      <div className="mt-2">
        {currentUser?.isEmailVerified === true ? (
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Verified
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Not Verified
              </span>
            </div>

            <BlueBtn
              tag={isResending ? "Sending..." : "Verify Email"}
              onClick={resendVerificationEmail}
              disabled={isResending}
            />
          </div>
        )}
      </div>
    </div>
  );
}
