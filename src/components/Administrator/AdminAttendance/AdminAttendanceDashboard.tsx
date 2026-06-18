import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  SlidersHorizontal,
  Download,
  ArrowLeft,
  Eye,
  Calendar,
  Users,
  ShieldAlert,
  Clock,
  RefreshCw,
} from "lucide-react";

// --- Interfaces ---
interface StudentAttendanceRecord {
  id: string;
  name: string;
  email: string;
  department: string;
  semester: string;
  totalClasses: number;
  classesAttended: number;
  attendancePercentage: number;
  status: "Compliant" | "Warning" | "Critical";
  lastActive: string;
}

interface DepartmentSummary {
  name: string;
  code: string;
  avgAttendance: number;
  criticalCount: number;
}

// --- Seed Mock Data Matrix ---
const initialAttendanceDataset: StudentAttendanceRecord[] = [
  {
    id: "STU-2026-089",
    name: "Rohan Shrestha",
    email: "rohan.shrestha@edusmart.edu",
    department: "Computer Science",
    semester: "6th Semester",
    totalClasses: 120,
    classesAttended: 111,
    attendancePercentage: 92.5,
    status: "Compliant",
    lastActive: "Today, 10:30 AM",
  },
  {
    id: "STU-2026-042",
    name: "Aayush Sharma",
    email: "aayush.sharma@edusmart.edu",
    department: "Computer Science",
    semester: "6th Semester",
    totalClasses: 120,
    classesAttended: 105,
    attendancePercentage: 87.5,
    status: "Compliant",
    lastActive: "Today, 09:15 AM",
  },
  {
    id: "STU-2026-115",
    name: "Deepa Rai",
    email: "deepa.rai@edusmart.edu",
    department: "Computer Science",
    semester: "6th Semester",
    totalClasses: 120,
    classesAttended: 114,
    attendancePercentage: 95.0,
    status: "Compliant",
    lastActive: "Yesterday",
  },
  {
    id: "STU-2026-021",
    name: "Niranjan Joshi",
    email: "niranjan.j@edusmart.edu",
    department: "Information Technology",
    semester: "4th Semester",
    totalClasses: 110,
    classesAttended: 82,
    attendancePercentage: 74.5,
    status: "Warning",
    lastActive: "3 days ago",
  },
  {
    id: "STU-2026-073",
    name: "Prerna Thapa",
    email: "prerna.t@edusmart.edu",
    department: "Computer Science",
    semester: "6th Semester",
    totalClasses: 120,
    classesAttended: 109,
    attendancePercentage: 90.8,
    status: "Compliant",
    lastActive: "Today, 11:00 AM",
  },
  {
    id: "STU-2026-194",
    name: "Bibek Thapa",
    email: "bibek.t@edusmart.edu",
    department: "Information Technology",
    semester: "4th Semester",
    totalClasses: 110,
    classesAttended: 65,
    attendancePercentage: 59.0,
    status: "Critical",
    lastActive: "1 week ago",
  },
];

const departmentAggregates: DepartmentSummary[] = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    avgAttendance: 91.4,
    criticalCount: 0,
  },
  {
    name: "Information Technology",
    code: "IT",
    avgAttendance: 66.7,
    criticalCount: 2,
  },
];

export default function AdminAttendance() {
  const [records, setRecords] = useState<StudentAttendanceRecord[]>(
    initialAttendanceDataset,
  );
  const [selectedStudent, setSelectedStudent] =
    useState<StudentAttendanceRecord | null>(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // --- Handlers ---
  const handleBulkResetLogs = () => {
    if (
      window.confirm(
        "SYSTEM OVERRIDE WARNING: Are you sure you want to clear cached tracking indexes for the current rolling cycle?",
      )
    ) {
      alert("Institutional tracking cycles calibrated cleanly.");
    }
  };

  const handleOverridePercentage = (
    id: string,
    modificationType: "increment" | "decrement",
  ) => {
    const updated = records.map((record) => {
      if (record.id === id) {
        const structuralChange = modificationType === "increment" ? 1 : -1;
        const nextAttended = Math.min(
          record.totalClasses,
          Math.max(0, record.classesAttended + structuralChange),
        );
        const nextPct = Number(
          ((nextAttended / record.totalClasses) * 100).toFixed(1),
        );

        let nextStatus: "Compliant" | "Warning" | "Critical" = "Compliant";
        if (nextPct < 60) nextStatus = "Critical";
        else if (nextPct < 80) nextStatus = "Warning";

        return {
          ...record,
          classesAttended: nextAttended,
          attendancePercentage: nextPct,
          status: nextStatus,
        };
      }
      return record;
    });

    setRecords(updated);

    // Maintain alignment with active deep inspection states
    const updatedTarget = updated.find((r) => r.id === id);
    if (updatedTarget) setSelectedStudent(updatedTarget);
  };

  // --- Mathematical Filter Operations ---
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      deptFilter === "All" || record.department === deptFilter;
    const matchesStatus =
      statusFilter === "All" || record.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Derived Summary Matrices
  const totalRosterCount = records.length;
  const criticalThresholdCount = records.filter(
    (r) => r.status === "Critical",
  ).length;
  const warningThresholdCount = records.filter(
    (r) => r.status === "Warning",
  ).length;
  const genericComplianceRatio = (
    (records.filter((r) => r.status === "Compliant").length /
      totalRosterCount) *
    100
  ).toFixed(0);

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {/* ========================================================= */}
        {/* TOP LEVEL ACTION HEADER                                   */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
              <Calendar size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Attendance Monitoring Panel
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Track systemic eligibility variables, handle operational
                overrides, and log compliance indicators
              </p>
            </div>
          </div>

          <div className="flex gap-2 self-start sm:self-center">
            <button
              onClick={handleBulkResetLogs}
              className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <RefreshCw size={14} className="text-slate-400" />
              Recalibrate Cycle
            </button>
            <button
              onClick={() =>
                alert("Downloading cross-sectional attendance schema (.csv)...")
              }
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <Download size={14} />
              Export Sheets
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ANALYTICS BANNER MATRIX                                   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* Card 1: Compliance Ratio */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <CheckCircle size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Compliance Ratio
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {genericComplianceRatio}% Eligible
              </h4>
            </div>
          </div>

          {/* Card 2: Warning Index */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Warning Index
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {warningThresholdCount} Records
              </h4>
            </div>
          </div>

          {/* Card 3: Critical Threshold */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl shrink-0">
              <XCircle size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Critical Threshold
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {criticalThresholdCount} Flagged
              </h4>
            </div>
          </div>

          {/* Card 4: Inspected Active Roster */}
          <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <Users size={18} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                Inspected Active Roster
              </span>
              <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                {totalRosterCount} Students Total
              </h4>
            </div>
          </div>
        </div>
        {/* ========================================================= */}
        {/* CONDITIONAL SUB-SYSTEM GRAPH LAYOUTS                     */}
        {/* ========================================================= */}
        {!selectedStudent ? (
          <>
            {/* Department Progression Cards Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departmentAggregates.map((dept, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-700">
                        {dept.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                        Faculty Block Ref: {dept.code}
                      </span>
                    </div>
                    {dept.criticalCount > 0 && (
                      <span className="flex items-center gap-1 text-[9px] font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 uppercase tracking-wide animate-pulse">
                        <ShieldAlert size={10} /> {dept.criticalCount} Critical
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${dept.avgAttendance >= 80 ? "bg-blue-600" : "bg-amber-500"}`}
                        style={{ width: `${dept.avgAttendance}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600 whitespace-nowrap">
                      {dept.avgAttendance}% Avg
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Structured Search Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-6 relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Query students by explicit name index or system ID register..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-medium outline-none transition-all shadow-sm"
                />
              </div>

              <div className="md:col-span-3 relative">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                </select>
                <SlidersHorizontal
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={14}
                />
              </div>

              <div className="md:col-span-3 relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
                >
                  <option value="All">All Operational Ranks</option>
                  <option value="Compliant">Compliant Status (&gt;=80%)</option>
                  <option value="Warning">Warning Roster (60%-79%)</option>
                  <option value="Critical">Critical Threshold (&lt;60%)</option>
                </select>
                <SlidersHorizontal
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={14}
                />
              </div>
            </div>

            {/* Core Roster Grid Ledger */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-212.5">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3 px-5 font-medium">
                        Student Identity
                      </th>
                      <th className="py-3 font-medium">Academic Department</th>
                      <th className="py-3 text-center font-medium">
                        Aggregated Ratio
                      </th>
                      <th className="py-3 font-medium">
                        Metrics Progress Tracker
                      </th>
                      <th className="py-3 text-center font-medium">
                        Systemic State
                      </th>
                      <th className="py-3 pr-5 text-right font-medium">
                        Global Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-xs">
                    {filteredRecords.map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-slate-50/40 group transition-colors duration-150"
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                              {record.name
                                .split(" ")
                                .filter(Boolean)
                                .map((n) => n[0])
                                .join("")
                                .substring(0, 2)}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                                {record.name}
                              </h4>
                              <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                                {record.id} • {record.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 font-semibold text-slate-700">
                          <div>{record.department}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                            {record.semester}
                          </div>
                        </td>
                        <td className="py-3.5 text-center font-bold text-slate-700">
                          <div>
                            {record.classesAttended} / {record.totalClasses}
                          </div>
                          <span className="text-[9px] text-slate-400 font-medium mt-0.5 block">
                            Classes Logged
                          </span>
                        </td>
                        <td className="py-3.5">
                          <div className="flex items-center gap-3 max-w-xs">
                            <div className="w-full bg-slate-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full transition-all ${
                                  record.status === "Compliant"
                                    ? "bg-emerald-500"
                                    : record.status === "Warning"
                                      ? "bg-amber-500"
                                      : "bg-rose-500"
                                }`}
                                style={{
                                  width: `${record.attendancePercentage}%`,
                                }}
                              />
                            </div>
                            <span className="font-bold text-slate-600">
                              {record.attendancePercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 text-center">
                          <span
                            className={`font-bold px-2.5 py-0.5 rounded-full border text-[10px] ${
                              record.status === "Compliant"
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                : record.status === "Warning"
                                  ? "bg-amber-50 text-amber-600 border-amber-100"
                                  : "bg-rose-50 text-rose-600 border-rose-100"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                        <td className="py-3.5 pr-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedStudent(record)}
                              className="p-1.5 border border-slate-200 hover:border-blue-500 bg-white text-slate-400 hover:text-blue-600 rounded-lg shadow-2xs transition-all"
                              title="Inspect Attendance Grid"
                            >
                              <Eye size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredRecords.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-12 text-slate-400 font-medium"
                        >
                          No matching active student logs cached.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          // =========================================================
          // DEEP ATTENDANCE EXTRAPOLATION MODULE VIEW
          // =========================================================
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 gap-4">
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all self-start"
              >
                <ArrowLeft size={14} /> Back to Attendance Directory
              </button>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Clock size={13} /> Synchronized System Timestamp:{" "}
                {selectedStudent.lastActive}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-slate-900 text-white rounded-xl text-lg font-bold flex items-center justify-center">
                  {selectedStudent.name
                    .split(" ")
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    {selectedStudent.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {selectedStudent.id} • {selectedStudent.department} •{" "}
                    {selectedStudent.semester}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                    Calculated State
                  </span>
                  <span
                    className={`font-bold px-3 py-1 rounded-full border text-xs ${
                      selectedStudent.status === "Compliant"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : selectedStudent.status === "Warning"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-rose-50 text-rose-600 border-rose-100"
                    }`}
                  >
                    {selectedStudent.status}
                  </span>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-0.5">
                    Exact Percentage
                  </span>
                  <h4 className="text-xl font-black text-slate-800">
                    {selectedStudent.attendancePercentage}%
                  </h4>
                </div>
              </div>
            </div>

            {/* Admin Override Action Engine Module */}
            <div className="flex flex-col gap-3.5 p-5 border border-dashed border-slate-200 rounded-2xl">
              <div>
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1.5">
                  🔧 Administrative Reroute Engine
                </h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Directly calibrate or modify student log tallies without
                  requiring localized instructor sign-offs.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleOverridePercentage(selectedStudent.id, "decrement")
                  }
                  className="px-4 py-2 bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 font-bold rounded-xl text-xs transition-all shadow-2xs"
                >
                  - Remove One Present Lecture
                </button>
                <button
                  onClick={() =>
                    handleOverridePercentage(selectedStudent.id, "increment")
                  }
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                >
                  + Inject One Present Lecture
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
