import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import PasswordInput from "../components/signupAndLogin/PasswordInput";
import Input from "../components/signupAndLogin/Input";
import AuthCard from "../components/signupAndLogin/AuthCard";
import AuthHeader from "../components/signupAndLogin/AuthHeader";
import axios from "axios";
import { X } from "lucide-react";
import { useAuth } from "../context/Auth/AuthContext";
import ForgetPasswordBtn from "../components/common/ForgetPassBtn";

export default function Login() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  function handleFormData(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitFormData(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/login", formData);
      setCurrentUser(response.data.data.user);
      navigate("/");
      setFormData({ identifier: "", password: "" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#070d17]">
      <div className="flex flex-col lg:flex-row min-h-screen px-6 py-8 justify-around gap-4">
        <AuthHeader />

        <div className="flex flex-col items-center justify-center ">
          <AuthCard
            title="Welcome Back"
            description="Enter your details to get started."
          >
            <form className="mt-6 space-y-4" onSubmit={submitFormData}>
              {error && (
                <p className="text-red-500 flex items-center gap-6">
                  {error}{" "}
                  <button
                    type="button"
                    className="hover:bg-red-500/30 cursor-pointer rounded-lg"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    <X />
                  </button>{" "}
                </p>
              )}
              <Input
                label="Username or Email"
                name="identifier"
                type="text"
                placeholder="Enter Username or Email"
                value={formData.identifier}
                onChange={handleFormData}
              />

              <PasswordInput
                value={formData.password}
                onChange={handleFormData}
              />

              <div className="flex justify-between">
                {" "}
                <ForgetPasswordBtn />{" "}
              </div>

              <button
                type="submit"
                className="w-full mt-8 rounded-lg bg-[#387ed1] px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition hover:bg-[#2f6fb9] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                disabled={loading}
              >
                {loading ? "Loggin you in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-[#387ed1] hover:underline"
              >
                Signup
              </Link>
            </p>
          </AuthCard>

          <p className="mt-6 text-center text-xs text-gray-400">
            This is a learning project inspired by Zerodha.
          </p>
        </div>
      </div>
    </section>
  );
}
