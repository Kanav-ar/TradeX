import { useAuth } from "../../../context/Auth/AuthContext";
import VerifyEmailBtn from "../../common/VerifyEmailBtn";


export default function EmailStatus() {
  const { currentUser } = useAuth();

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

          <VerifyEmailBtn/>
          </div>
        )}
      </div>
    </div>
  );
}
