import { useState } from "react";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import TradeXLogo from "../components/common/Logo";
import BlueBtn from "../components/common/BlueBtn";
import { api } from "../api/axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/reset-password/${token}`, {
        newPassword,
        confirmPassword,
      });

      toast.success("Password reset successfully", {
        description: "You can now log in with your new password.",
      });

      navigate("/login");
    } catch (error) {
      console.error("Password reset failed:", error);

      toast.error("Unable to reset password", {
        description: "The reset link may be invalid or expired.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4  dark:bg-[#070d17]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl  dark:bg-[#0d1421]">
        <div className="mb-8 flex flex-col items-center text-center">
          <TradeXLogo />

          <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200">
            <LockKeyhole size={24} />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Reset your password
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-blue-100">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-5">
          <div>
            <label
              htmlFor="newPassword"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-500 dark:bg-gray-900 dark:text-white"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-blue-200 dark:hover:text-white"
              >
                {showNewPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-white"
            >
              Confirm password
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-500 dark:bg-gray-900 dark:text-white"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-blue-200 dark:hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>
          </div>

          <BlueBtn
            tag={loading ? "Resetting..." : "Reset Password"}
            disabled={loading}
          />
        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-6 w-full text-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-200 dark:hover:text-white"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}