import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  QrCode,
} from "lucide-react";
import { Scanner } from "@yudiel/react-qr-scanner";
/* ===================== ANIMATION VARIANTS ===================== */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

/* ===================== MAIN COMPONENT ===================== */
const AttendancePage = () => {
  const subjects = [
    { subject: "Data Structures", attendance: 95 },
    { subject: "DBMS", attendance: 91 },
    { subject: "Operating System", attendance: 87 },
    { subject: "Computer Network", attendance: 93 },
    { subject: "Mathematics", attendance: 89 },
  ];

  const history = [
    { date: "2026-06-01", subject: "DBMS", status: "Present" },
    { date: "2026-06-02", subject: "Data Structures", status: "Present" },
    { date: "2026-06-03", subject: "Operating System", status: "Absent" },
    { date: "2026-06-04", subject: "Computer Network", status: "Present" },
    { date: "2026-06-05", subject: "Mathematics", status: "Leave" },
  ];

  /* ===================== QR STATE ===================== */
  const [scanResult, setScanResult] = useState<string>("");
  const [marked, setMarked] = useState(false);

  const handleDecode = (result: string) => {
    setScanResult(result);
  };

  const handleError = (error: any) => {
    console.log("QR Error:", error);
  };

  const markAttendance = () => {
    if (!scanResult) return;
    setMarked(true);

    // later you will call backend API here
    console.log("Attendance Marked for:", scanResult);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-3 md:p-8 bg-slate-50 min-h-screen text-slate-800"
    >
      {/* HEADER */}
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Attendance Dashboard</h1>
          <p className="text-slate-500">QR-based attendance system</p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4  rounded-xl shadow-sm">
          <Calendar className="w-4 h-4 text-blue-500" />
          Academic 2026
        </div>
      </div>

      {/* ================= QR SCANNER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl shadow-sm mb-3"
      >
        <div className="flex items-center gap-2 mb-2">
          <QrCode className="text-blue-600" />
          <h2 className="font-bold text-lg">Scan QR to Mark Attendance</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {/* Scanner */}
          <div className="rounded-xl overflow-hidden border">
            <Scanner
              onScan={(result: any) => {
                if (result?.[0]?.rawValue) {
                  handleDecode(result[0].rawValue);
                }
              }}
              onError={handleError}
            />
          </div>

          {/* Result */}
          <div className="flex flex-col justify-center gap-1">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm text-slate-500">Scanned Data:</p>
              <p className="font-semibold break-all">
                {scanResult || "No QR scanned yet"}
              </p>
            </div>

            <button
              onClick={markAttendance}
              disabled={!scanResult}
              className={`px-4 py-2 rounded-xl text-white font-semibold ${
                scanResult
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Mark Attendance
            </button>

            {marked && (
              <div className="text-green-600 flex items-center gap-2 font-semibold">
                <CheckCircle className="w-4 h-4" />
                Attendance Marked Successfully
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ================= STATS ================= */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2"
      >
        {[
          {
            title: "Overall Attendance",
            value: "92%",
            icon: <BookOpen className="w-5 h-5 text-blue-600" />,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Total Present",
            value: "184",
            icon: <CheckCircle className="w-5 h-5 text-emerald-600" />,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
          },
          {
            title: "Total Absent",
            value: "12",
            icon: <XCircle className="w-5 h-5 text-rose-600" />,
            color: "text-rose-600",
            bgColor: "bg-rose-50",
          },
          {
            title: "On Leave",
            value: "4",
            icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
            color: "text-amber-600",
            bgColor: "bg-amber-50",
          },
        ].map((card, i) => (
          <motion.div key={i} variants={item}>
            <div className="bg-white p-2 rounded-xl shadow-sm flex justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase">{card.title}</p>
                <h3 className={`text-2xl font-bold ${card.color}`}>
                  {card.value}
                </h3>
              </div>
              <div className={`p-1 rounded-xl ${card.bgColor}`}>
                {card.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ================= SUBJECTS ================= */}
      <div className="bg-white p-2 rounded-3xl mt-3 shadow-sm">
        <h2 className="font-bold text-xl mb-4">Subject Attendance</h2>

        <div className="grid md:grid-cols-2 gap-2">
          {subjects.map((sub, i) => (
            <div key={i}>
              <div className="flex justify-between">
                <span>{sub.subject}</span>
                <span>{sub.attendance}%</span>
              </div>

              <div className="w-full bg-slate-100 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${sub.attendance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-3 rounded-3xl mt-2 shadow-sm">
        <h2 className="font-bold text-xl mb-4">Recent Logs</h2>

        <table className="w-full">
          <tbody>
            {history.map((h, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{h.date}</td>
                <td className="p-3">{h.subject}</td>
                <td className="p-3 text-right">{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AttendancePage;
