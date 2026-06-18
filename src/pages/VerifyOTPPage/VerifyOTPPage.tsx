import { useEffect, useState } from "react";
import axios from "axios";

export default function VerifyOTPPage() {
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleVerify = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:4000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Account verified successfully");

      window.location.href = "/login";
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post(
        "http://localhost:4000/api/auth/resend-otp",
        {
          email,
        }
      );

      setSeconds(60);
      alert("OTP resent successfully");
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mb-6">
          OTP sent to {email}
        </p>

        {message && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6 Digit OTP"
            className="w-full border p-3 rounded-xl text-center text-2xl tracking-widest"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="text-center mt-5">
          {seconds > 0 ? (
            <p>Resend OTP in {seconds}s</p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-blue-600 font-semibold"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}