import { useState } from "react";
import axios from "axios";
import { Mail, Lock, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
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

  const handleLogin = async (e: { preventDefault: () => void; }) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await axios.post(
      "http://localhost:4000/api/auth/login",
      formData
    );

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    switch (user.role) {
      case "superadmin":
        window.location.href = "/superadmin/dashboard";
        break;

      case "admin":
        window.location.href = "/adminDashboard";
        break;

      case "teacher":
        window.location.href = "/teacher/dashboard";
        break;

      case "student":
        window.location.href = "/student/dashboard";
        break;

      case "parent":
        window.location.href = "/parent/dashboard";
        break;

      default:
        window.location.href = "/";
    }
  } catch (error) {
    const err = error as any;
    setMessage(
      err.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <div className="text-center mb-8">
          <GraduationCap
            size={50}
            className="mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold">
            School ERP SaaS
          </h1>

          <p className="text-gray-500">
            Login to continue
          </p>
        </div>

        {message && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label>Email</label>

            <div className="relative mt-1">
              <Mail
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 py-3"
                placeholder="admin@gmail.com"
              />
            </div>
          </div>

          <div>
            <label>Password</label>

            <div className="relative mt-1">
              <Lock
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-xl pl-10 py-3"
                placeholder="********"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <a
              href="/forgot-password"
              className="text-blue-600 text-sm"
            >
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-5">
          <span>Don't have an account?</span>

          <a
            href="/register"
            className="ml-2 text-blue-600 font-semibold"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}