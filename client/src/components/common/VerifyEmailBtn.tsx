import { toast } from "sonner";
import { api } from "../../api/axios";
import { useState } from "react";
import BlueBtn from "./BlueBtn";

export default function VerifyEmailBtn() {
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
    <BlueBtn tag="Verify Your Email" onClick={resendVerificationEmail}/>
  );
}