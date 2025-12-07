"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { success, error } = useToast();

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.username) {
      error("Username is required");
      return false;
    }

    if (!formData.email) {
      error("Email is required");
      return false;
    } else if (!emailRegex.test(formData.email)) {
      error("Invalid email format");
      return false;
    }

    if (!formData.password) {
      error("Password is required");
      return false;
    } else if (formData.password.length < 8) {
      error("Password must be at least 8 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        isSignup: "true",
      });

      if (response?.error) {
        error(response.error || "Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      if (!response?.ok) {
        error("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      success("Registration successful!");
      router.push("/chat");
    } catch (err) {
      error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const { status } = useSession()
  // Authentication check
  useEffect(() => {
    if (status === "authenticated") {
      router.push('/chat');
    }
  }, [status, router])

  if(status === "loading") {
    return (
      <main>
        <div className="flex items-center justify-center mt-20 w-full lg:max-w-5xl mx-auto px-6">
          <p>Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main>
      <nav className="flex justify-center items-center px-4 lg:px-6 py-4 shadow-md sticky top-0 bg-white z-50">
        <div className="w-full max-w-7xl">
          <Logo />
        </div>
      </nav>

      <div className="flex items-center justify-center mt-20 w-full lg:max-w-5xl mx-auto px-6">
        <form
          className="w-full lg:max-w-xl border border-gray-600 py-12 px-6 lg:px-12 rounded-2xl flex flex-col gap-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold text-black text-center">
            Get Started
          </h1>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-gray-700 font-medium">
              Username
            </label>
            <input
              type="text"
              placeholder="John Snow"
              id="username"
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="At least 8 characters"
              className="border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <Button
            text={loading ? "Registering user..." : "Get Started"}
            classname={`w-full py-3 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transform hover:scale-105 font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />

          <p className="text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Signup;