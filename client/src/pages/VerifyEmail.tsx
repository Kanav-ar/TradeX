import { api } from "../api/axios";
import { useNavigate, useParams } from "react-router";
import BlueBtn from "../components/common/BlueBtn";
import TradeXLogo from "../components/common/Logo";
import { toast } from "sonner";

export default function EmailVerify() {
  const { token } = useParams();
  const navigate = useNavigate();

  async function verifyEmail() {
    if (!token) {
      toast.error("Invalid verification link");
      return;
    }

    try {
      const response = await api.post(`/verify-email/${token}`);

      console.log(response.data);

      toast.success("Email verified successfully", {
        description: "Your TradeX account is now verified.",
      });

      navigate("/");
    } catch (error) {
      console.error("Email verification failed:", error);

      toast.error("Email verification failed", {
        description: "The link may be invalid or expired.",
      });
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 text-center text-white">
      <TradeXLogo />

      <BlueBtn
        tag="Verify Your Email"
        onClick={verifyEmail}
        disabled={false}
      />
    </div>
  );
}