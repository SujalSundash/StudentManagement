import { useState } from "react";
import axios from "axios";
import { User, Mail, Lock, GraduationCap } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        formData
      );

      setMessage(res.data.message);

      // Save email for OTP page
      localStorage.setItem("email", formData.email);

      // Redirect to verify otp page
      window.location.href = "/verify-otp";
    } catch (error: any) {
      setMessage(
        error?.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <GraduationCap size={50} />
          </div>

          <h1 className="text-3xl font-bold">
            School ERP SaaS
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>
        </div>

        {/* Alert */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-blue-100 text-blue-700">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="school@gmail.com"
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-3.5 text-gray-400"
              />

              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        {/* Login */}
        <div className="text-center mt-6">
          <span className="text-gray-500">
            Already have an account?
          </span>

          <a
            href="/login"
            className="text-blue-600 font-semibold ml-2"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}