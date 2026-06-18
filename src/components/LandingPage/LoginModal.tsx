import React, { useState, useEffect, useRef } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import { ROLE_CONFIGS, type UserRole } from "../constant/roles";

type Mode = "login" | "signup" | "forgot";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: UserRole, path: string) => void;
}

const DEMO_USERS: Record<string, { password: string; role: UserRole }> = {
  student001: { password: "student123", role: "student" },
  teacher001: { password: "teacher123", role: "teacher" },
  parent001: { password: "parent123", role: "parent" },
  admin001: { password: "admin123", role: "admin" },
  superadmin: { password: "super123", role: "superadmin" },
};

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<Mode>("login");

  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // RESET
  useEffect(() => {
    if (!isOpen) return;

    setMode("login");
    setLoginId("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess(false);
    setLoading(false);

    setTimeout(() => inputRef.current?.focus(), 100);
  }, [isOpen]);

  // ESC CLOSE
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  // LOCK SCROLL
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // LOGIN
  const handleLogin = async () => {
    const user = DEMO_USERS[loginId.trim()];

    if (!user || user.password !== password) {
      setError("Invalid credentials");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    setSuccess(true);

    setTimeout(() => {
      onLoginSuccess(user.role, ROLE_CONFIGS[user.role].dashboardPath);
      onClose();
    }, 1000);
  };

  // SIGNUP
  const handleSignup = async () => {
    if (!loginId || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    setSuccess(true);

    setTimeout(() => {
      setMode("login");
      setSuccess(false);
    }, 1200);
  };

  // FORGOT PASSWORD
  const handleForgot = async () => {
    if (!email) {
      setError("Enter your email");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    setSuccess(true);

    setTimeout(() => {
      setMode("login");
      setSuccess(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") return handleLogin();
    if (mode === "signup") return handleSignup();
    if (mode === "forgot") return handleForgot();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#0f172a] w-full max-w-md rounded-2xl p-6 border border-white/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          className="absolute top-3 right-3 text-white"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* SUCCESS */}
        {success ? (
          <div className="text-center py-10">
            <FaCheckCircle className="text-green-400 text-4xl mx-auto" />
            <p className="text-white mt-3">
              {mode === "forgot"
                ? "Reset link sent to your email"
                : mode === "signup"
                ? "Account created successfully"
                : "Login successful"}
            </p>
          </div>
        ) : (
          <>
            {/* TITLE */}
            <h2 className="text-white text-xl font-bold text-center mb-5">
              {mode === "login"
                ? "Login"
                : mode === "signup"
                ? "Create Account"
                : "Forgot Password"}
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* LOGIN ID */}
              {(mode === "login" || mode === "signup") && (
                <div className="flex items-center bg-white/5 px-3 rounded-lg">
                  <FaUser className="text-gray-400" />
                  <input
                    ref={inputRef}
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Login ID"
                    className="w-full bg-transparent p-2 text-white outline-none"
                  />
                </div>
              )}

              {/* EMAIL */}
              {(mode === "signup" || mode === "forgot") && (
                <div className="flex items-center bg-white/5 px-3 rounded-lg">
                  <FaEnvelope className="text-gray-400" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full bg-transparent p-2 text-white outline-none"
                  />
                </div>
              )}

              {/* PASSWORD */}
              {mode !== "forgot" && (
                <div className="flex items-center bg-white/5 px-3 rounded-lg">
                  <FaLock className="text-gray-400" />
                  <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent p-2 text-white outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="text-gray-400"
                  >
                    {showPass ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}

              {/* CONFIRM PASSWORD */}
              {mode === "signup" && (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-white/5 p-2 rounded-lg text-white outline-none"
                />
              )}

              {/* ERROR */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
              >
                {loading
                  ? "Processing..."
                  : mode === "login"
                  ? "Login"
                  : mode === "signup"
                  ? "Sign Up"
                  : "Send Reset Link"}
              </button>
            </form>

            {/* SWITCH */}
            <p className="text-center text-sm text-gray-400 mt-4">
              {mode === "login" && (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-indigo-400"
                  >
                    Sign Up
                  </button>
                </>
              )}

              {mode === "signup" && (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-indigo-400"
                  >
                    Login
                  </button>
                </>
              )}

              {mode === "forgot" && (
                <button
                  onClick={() => setMode("login")}
                  className="text-indigo-400"
                >
                  Back to Login
                </button>
              )}
            </p>

            {/* FORGOT LINK */}
            {mode === "login" && (
              <p className="text-center text-xs text-gray-500 mt-2">
                <button
                  onClick={() => setMode("forgot")}
                  className="text-indigo-400"
                >
                  Forgot password?
                </button>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;