import React, { useState } from "react";
import {
  Building2,
  Users,
  GraduationCap,
  DollarSign,
  Layers,
  Search,
  Plus,
  ArrowLeft,
  Eye,
  Trash2,
  X,
  BookOpen,
  Award,
  SlidersHorizontal,
  ChevronRight,
  FileText,
} from "lucide-react";

// --- Interfaces ---
interface DepartmentDetail {
  id: string; // e.g., DEPT-CS
  name: string;
  code: string;
  hod: string;
  establishedYear: number;
  totalFaculty: number;
  totalStudents: number;
  budgetAllocated: number;
  courseCount: number;
  labCount: number;
  academicPerformance: number; // Avg GPA of the entire department
  status: "Active" | "Under Review";
  topResearchPaper: string;
  popularModules: string[];
}

// --- Seed Mock Data Matrix ---
const initialDepartmentsDataset: DepartmentDetail[] = [
  {
    id: "DEPT-CSE",
    name: "Computer Science & Engineering",
    code: "CSE",
    hod: "Dr. Alok Joshi",
    establishedYear: 2015,
    totalFaculty: 18,
    totalStudents: 420,
    budgetAllocated: 75000,
    courseCount: 24,
    labCount: 6,
    academicPerformance: 3.42,
    status: "Active",
    topResearchPaper:
      "Decentralized Consensus Layer Optimization in High-Throughput Networks",
    popularModules: [
      "Data Structures & Algorithms",
      "Advanced Node.js Frameworks",
      "Machine Learning Systems",
    ],
  },
  {
    id: "DEPT-IT",
    name: "Information Technology",
    code: "IT",
    hod: "Prof. Sunita Rai",
    establishedYear: 2018,
    totalFaculty: 12,
    totalStudents: 280,
    budgetAllocated: 52000,
    courseCount: 16,
    labCount: 4,
    academicPerformance: 3.18,
    status: "Active",
    topResearchPaper:
      "An Empirical Analysis of Zero-Trust Network Microsegmentation in Cloud SaaS Infrastructure",
    popularModules: [
      "Web Technologies",
      "Cyber Security Architectures",
      "Cloud Infrastructure Routing",
    ],
  },
  {
    id: "DEPT-ECE",
    name: "Electronics & Communication",
    code: "ECE",
    hod: "Dr. Ramesh Adhikari",
    establishedYear: 2016,
    totalFaculty: 14,
    totalStudents: 195,
    budgetAllocated: 61000,
    courseCount: 18,
    labCount: 5,
    academicPerformance: 2.95,
    status: "Under Review",
    topResearchPaper:
      "Low-Latency Signal Transduction Matrices in Embedded IoT Microcontrollers",
    popularModules: [
      "Microprocessors",
      "Digital Signal Processing",
      "Embedded Systems Design",
    ],
  },
];

export default function AdminDepartment() {
  const [departments, setDepartments] = useState<DepartmentDetail[]>(
    initialDepartmentsDataset,
  );
  const [selectedDept, setSelectedDept] = useState<DepartmentDetail | null>(
    null,
  );

  // Search & Filters System
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State for Registering New Department
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptCode, setNewDeptCode] = useState("");
  const [newDeptHod, setNewDeptHod] = useState("");
  const [newDeptBudget, setNewDeptBudget] = useState("");

  // --- Administrative Matrix Handlers ---
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || !newDeptCode || !newDeptHod) return;

    const newRecord: DepartmentDetail = {
      id: `DEPT-${newDeptCode.toUpperCase()}`,
      name: newDeptName,
      code: newDeptCode.toUpperCase(),
      hod: newDeptHod,
      establishedYear: 2026,
      totalFaculty: 0,
      totalStudents: 0,
      budgetAllocated: Number(newDeptBudget) || 0,
      courseCount: 0,
      labCount: 0,
      academicPerformance: 0.0,
      status: "Active",
      topResearchPaper:
        "No publications registered for this academic block node.",
      popularModules: ["Curriculum Framework TBD"],
    };

    setDepartments([...departments, newRecord]);
    setIsAddModalOpen(false);
    setNewDeptName("");
    setNewDeptCode("");
    setNewDeptHod("");
    setNewDeptBudget("");
    alert(
      `Successfully registered the department of ${newDeptName} into the system.`,
    );
  };

  const handlePurgeDepartment = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop parent row triggers
    if (
      window.confirm(
        "CRITICAL ADMIN WARNING: Deleting this department node will orphan all linked student rosters and faculty nodes! Proceed?",
      )
    ) {
      setDepartments(departments.filter((d) => d.id !== id));
      if (selectedDept && selectedDept.id === id) setSelectedDept(null);
    }
  };

  const handleToggleStatus = (
    id: string,
    currentStatus: "Active" | "Under Review",
  ) => {
    // Explicitly tell TypeScript the type of the next status
    const nextStatus: "Active" | "Under Review" =
      currentStatus === "Active" ? "Under Review" : "Active";

    const updated = departments.map((d) =>
      d.id === id ? { ...d, status: nextStatus } : d,
    );
    setDepartments(updated);

    if (selectedDept && selectedDept.id === id) {
      setSelectedDept({ ...selectedDept, status: nextStatus });
    }
  };

  // Filter metrics calculation mapping
  const filteredDepartments = departments.filter((dept) => {
    const matchesSearch =
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.hod.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || dept.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Recharts payload assembly

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      {/* ========================================================= */}
      {/* VIEW CONDITION 1: ROOT DEPARTMENTS HUB OVERVIEW           */}
      {/* ========================================================= */}
      {!selectedDept ? (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {/* Dashboard Header Layout */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
                <Building2 size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Institutional Departments
                </h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Manage operational budgets, HOD appointments, resource loads,
                  and academic statuses
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-center"
            >
              <Plus size={15} /> Create Academic Department
            </button>
          </div>

          {/* Quick Metrics Multi-Card Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {/* Card 1: Total Faculties */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                <Layers size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                  Total Faculties
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                  {departments.length} Units
                </h4>
              </div>
            </div>

            {/* Card 2: Total Enrollment */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                <Users size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                  Total Enrollment
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                  {departments.reduce(
                    (acc, curr) => acc + curr.totalStudents,
                    0,
                  )}{" "}
                  Students
                </h4>
              </div>
            </div>

            {/* Card 3: Combined Budget */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
                <DollarSign size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                  Combined Budget
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                  $
                  {departments
                    .reduce((acc, curr) => acc + curr.budgetAllocated, 0)
                    .toLocaleString()}
                </h4>
              </div>
            </div>

            {/* Card 4: Institutional Quality */}
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
                <Award size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
                  Institutional Quality
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
                  3.18 Avg GPA
                </h4>
              </div>
            </div>
          </div>

          {/* Search/Filter Hub Block */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search departments by structural name, code signature, or appointed Head of Department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-medium outline-none transition-all shadow-sm"
              />
            </div>

            <div className="md:col-span-4 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
              >
                <option value="All">All Operational Statuses</option>
                <option value="Active">Active Infrastructure Only</option>
                <option value="Under Review">Under Operational Review</option>
              </select>
              <SlidersHorizontal
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
          </div>

          {/* Core Master Table Structure Grid */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-212.5">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-5 font-medium">Department Block</th>
                    <th className="py-3 font-medium">Appointed Head (HOD)</th>
                    <th className="py-3 text-center font-medium">
                      Resource Distribution
                    </th>
                    <th className="py-3 text-center font-medium">
                      Fiscal Budget
                    </th>
                    <th className="py-3 text-center font-medium">
                      Academic Mark
                    </th>
                    <th className="py-3 text-center font-medium">
                      Status Flag
                    </th>
                    <th className="py-3 pr-5 text-right font-medium">
                      Management
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredDepartments.map((dept) => (
                    <tr
                      key={dept.id}
                      onClick={() => setSelectedDept(dept)}
                      className="hover:bg-slate-50/40 group cursor-pointer transition-colors duration-150"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {dept.code}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">
                              {dept.name}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                              Established {dept.establishedYear} • Ref:{" "}
                              {dept.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap size={13} className="text-slate-400" />{" "}
                          {dept.hod}
                        </div>
                      </td>
                      <td className="py-3.5 text-center font-medium text-slate-500">
                        <div className="flex items-center justify-center gap-3">
                          <span>
                            👨‍🏫{" "}
                            <strong className="text-slate-700">
                              {dept.totalFaculty}
                            </strong>{" "}
                            Faculty
                          </span>
                          <span>
                            🎓{" "}
                            <strong className="text-slate-700">
                              {dept.totalStudents}
                            </strong>{" "}
                            Students
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center font-bold text-slate-700">
                        ${dept.budgetAllocated.toLocaleString()}
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          ★ {dept.academicPerformance.toFixed(2)} GPA
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(dept.id, dept.status);
                          }}
                          className={`font-bold px-2.5 py-0.5 rounded-full border text-[10px] transition-all ${
                            dept.status === "Active"
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100"
                          }`}
                        >
                          {dept.status}
                        </button>
                      </td>
                      <td className="py-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDept(dept);
                            }}
                            className="p-1.5 border border-slate-200 hover:border-blue-500 bg-white text-slate-400 hover:text-blue-600 rounded-lg shadow-2xs transition-all"
                          >
                            <Eye size={13} />
                          </button>
                          <button
                            onClick={(e) => handlePurgeDepartment(dept.id, e)}
                            className="p-1.5 border border-slate-200 hover:border-rose-500 bg-white text-slate-400 hover:text-rose-600 rounded-lg shadow-2xs transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDepartments.length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-slate-400 font-medium"
                      >
                        No structural department modules found matching input
                        query values.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        // =========================================================
        // VIEW CONDITION 2: DEEP DEPARTMENTAL OPERATIONAL METRICS
        // =========================================================
        <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn">
          {/* Upper Nav Assembly */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedDept(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <ArrowLeft size={14} /> Back to Department Hub
            </button>
            <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 font-bold px-3 py-1.5 rounded-xl">
              Dept Node ID: {selectedDept.id}
            </span>
          </div>

          {/* Department Banner Header Hook */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="h-28 w-full bg-linear-to-r from-blue-600 to-indigo-700 relative opacity-95" />
            <div className="px-6 pb-5 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 -mt-10 relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl border-4 border-white bg-slate-900 text-white font-bold text-2xl shadow-md flex items-center justify-center shrink-0">
                  {selectedDept.code}
                </div>
                <div className="mb-1">
                  <h2 className="text-xl font-bold text-slate-800">
                    {selectedDept.name}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    Under Leadership of Head of Department:{" "}
                    <strong>{selectedDept.hod}</strong>
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${selectedDept.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
              >
                {selectedDept.status}
              </span>
            </div>
          </div>

          {/* Deep Metrics Allocation Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <BookOpen size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Active Courses
                </span>
                <h5 className="text-sm font-bold text-slate-700">
                  {selectedDept.courseCount} Curriculum Units
                </h5>
              </div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <Layers size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Operational Labs
                </span>
                <h5 className="text-sm font-bold text-slate-700">
                  {selectedDept.labCount} Hardware Spaces
                </h5>
              </div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <DollarSign size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Allocated Capital
                </span>
                <h5 className="text-sm font-bold text-slate-700">
                  ${selectedDept.budgetAllocated.toLocaleString()} YR
                </h5>
              </div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                <Award size={16} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Performance Index
                </span>
                <h5 className="text-sm font-bold text-slate-700">
                  ★ {selectedDept.academicPerformance} Cumulative
                </h5>
              </div>
            </div>
          </div>

          {/* Operational Assets & Research Mapping Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Left Block: Core High-Volume Curriculum Modules */}
            <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2 border-b border-slate-50 pb-2">
                <BookOpen size={15} className="text-blue-600" /> High-Retention
                Core Modules
              </h3>
              <div className="flex flex-col gap-2">
                {selectedDept.popularModules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-semibold text-slate-700 hover:border-blue-200 transition-colors"
                  >
                    <span className="flex items-center gap-2">🔘 {mod}</span>
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Block: Registered Research Papers & Academic Outputs */}
            <div className="md:col-span-6 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
              <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2 border-b border-slate-50 pb-2">
                <FileText size={15} className="text-purple-600" /> Primary
                Departmental Publication
              </h3>
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col gap-2 my-auto shadow-md">
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-400">
                  IEEE / ACM Indexed Node
                </span>
                <p className="text-xs font-bold leading-relaxed italic">
                  "{selectedDept.topResearchPaper}"
                </p>
                <div className="w-full h-px bg-slate-800 my-1" />
                <span className="text-[10px] text-slate-400 font-medium">
                  Review Loop Oversight Led by: {selectedDept.hod}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GLOBAL MODAL: PROVISION NEW DEPARTMENT NODE MODULE        */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">
                Provision Academic Department Node
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <form
              onSubmit={handleCreateDepartment}
              className="p-5 flex flex-col gap-4 text-xs"
            >
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Department Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Computer Science & Engineering"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Alpha Code Sig
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., CSE"
                    maxLength={4}
                    value={newDeptCode}
                    onChange={(e) => setNewDeptCode(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-bold uppercase tracking-wider outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                    Allocated Capital Budget ($)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 65000"
                    value={newDeptBudget}
                    onChange={(e) => setNewDeptBudget(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-bold outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">
                  Appointed Head of Department (HOD)
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., Dr. Alok Joshi"
                  value={newDeptHod}
                  onChange={(e) => setNewDeptHod(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all mt-2"
              >
                Commit Department Node to Architecture
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
