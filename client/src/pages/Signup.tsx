import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../api/axios";
import PasswordInput from "../components/signupAndLogin/PasswordInput";
import Input from "../components/signupAndLogin/Input";
import TermsCheckbox from "../components/signupAndLogin/TermsCheckbox";
import AuthCard from "../components/signupAndLogin/AuthCard";
import AuthHeader from "../components/signupAndLogin/AuthHeader";
import axios from "axios";
import { X } from "lucide-react";
import { useAuth } from "../context/Auth/AuthContext";

export default function Signup() {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
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
      const response = await api.post("/signup", formData);

      if (!response.data) {
        setError("Unable to create account");
        return;
      }
      setCurrentUser(response.data.data.user);
      navigate("/");
      setFormData({ username: "", email: "", fullname: "", password: "" });
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

        <div className="flex flex-col items-center">
          <AuthCard
            title="Create your account"
            description="Enter your details to get started."
          >
            <form className="mt-6 space-y-4" onSubmit={submitFormData}>
              {error && (
                <p className="text-red-400 flex items-center gap-2">
                  {error}{" "}
                  <button
                    type="button"
                    className="hover:bg-gray-500/30 cursor-pointer rounded-full"
                    onClick={() => {
                      setError(null);
                    }}
                  >
                    <X />
                  </button>{" "}
                </p>
              )}
              <Input
                label="Username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleFormData}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleFormData}
              />
              <Input
                label="Full name"
                name="fullname"
                type="text"
                placeholder="you@example.com"
                value={formData.fullname}
                onChange={handleFormData}
              />
              <PasswordInput
                value={formData.password}
                onChange={handleFormData}
              />

              <TermsCheckbox checked={terms} onChange={setTerms} />

              <button
                type="submit"
                className="w-full rounded-lg bg-[#387ed1] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2f6fb9] focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                disabled={loading || !terms}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-[#387ed1] hover:underline"
              >
                Login
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
