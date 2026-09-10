import { toast } from "sonner";
import { api } from "../../api/axios";

async function handleForgotPasswordRequest() {
  try {
    await api.post("/forgot-password");
    toast.success("Reset password link has been sent on your email");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong, try again after sometime");
  }
}

export default function ForgetPasswordBtn() {
  return <button className="text-blue-600 dark:text-blue-500 text-sm cursor-pointer" onClick={handleForgotPasswordRequest}>Forgot Password?</button>;
}
