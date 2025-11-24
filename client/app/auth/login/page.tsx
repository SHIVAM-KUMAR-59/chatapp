"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const validate = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        isSignup: "false",
      });

      if(!response?.ok) {
        setErrors({ ...errors, password: "Invalid email or password" });
      }

      router.push('/chat')
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

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
            Welcome Back
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              id="email"
              className={`border ${
                errors.email ? "border-red-500" : "border-gray-400"
              } rounded-lg px-4 py-2 focus:outline-none`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`border ${
                errors.password ? "border-red-500" : "border-gray-400"
              } rounded-lg px-4 py-2 focus:outline-none`}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <Button
            text={loading ? "Logging in..." : "Login"}
            classname={`w-full py-3 rounded-lg shadow-sm hover:shadow-lg cursor-pointer transform hover:scale-105 font-semibold ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />
        </form>
      </div>
    </main>
  );
};

export default Login;
