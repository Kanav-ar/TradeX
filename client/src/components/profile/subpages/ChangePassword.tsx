import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, KeyRound } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { api } from "../../../api/axios";
import BlueBtn from "../../common/BlueBtn";

export default function ChangePassword() {
  const navigate = useNavigate();
  
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
                     
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (newPassword === currentPassword) {
      toast.error("New password must be different");
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post("/change-password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      toast.success("Password changed successfully", {
        description: "Your TradeX password has been updated.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/profile");
    } catch (error) {
      console.error("Change password failed:", error);

      toast.error("Unable to change password", {
        description: "Please check your current password and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
     
      <Link
        to="/profile"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </Link>

  
      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          <KeyRound className="h-5 w-5" />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
          Security
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Change your password
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
          Choose a strong password you don't use elsewhere.
        </p>
      </div>

    
      <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-gray-700 dark:bg-[#0d1421] sm:p-8">
        <form onSubmit={handleChangePassword} className="space-y-5">
          <PasswordInput
            label="Current password"
            value={currentPassword}
            onChange={setCurrentPassword}
            visible={showCurrent}
            setVisible={setShowCurrent}
            disabled={isSubmitting}
          />

          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={setNewPassword}
            visible={showNew}
            setVisible={setShowNew}
            disabled={isSubmitting}
          />

          <PasswordInput
            label="Confirm new password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            visible={showConfirm}
            setVisible={setShowConfirm}
            disabled={isSubmitting}
          />

          <div className="pt-3">
            <BlueBtn
              tag={isSubmitting ? "Updating..." : "Update password"}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>

      <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 dark:border-gray-700 dark:bg-gray-800/40">
        <p className="text-xs leading-6 text-gray-500 dark:text-gray-400">
          For security, your new password should be unique and difficult to
          guess. Never share your password with anyone.
        </p>
      </div>
    </div>
  );
}

function PasswordInput({
  label,
  value,
  onChange,
  visible,
  setVisible,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className=" w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-white
          "
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}