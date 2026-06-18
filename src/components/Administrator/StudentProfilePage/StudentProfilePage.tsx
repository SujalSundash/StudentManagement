import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { 
  BookOpen, 
  Award, 
  Clock, 
  CreditCard, 
  AlertCircle,
  Search,
  SlidersHorizontal,
  Users,
  Download,
  Plus,
  ArrowLeft,
  Eye,
  Trash2,
  ShieldAlert,
  CheckCircle,
  X
} from 'lucide-react';

// --- Interfaces ---
interface StudentProfile {
  id: string;
  name: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  avatar: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  department: string;
  batch: string;
  semester: string;
  rollNo: string;
  email: string;
  phone: string;
  address: string;
  guardian: string;
  attendanceOverall: number;
  currentGpa: number;
  completedCourses: number;
  feePaidStatus: 'Paid' | 'Pending' | 'Partial';
  pendingFeeAmount: number;
  subjects: Array<{ code: string; name: string; instructor: string; attendance: number; grade: string }>;
  performance: Array<{ semester: string; gpa: number }>;
  logs: Array<{ date: string; type: 'notice' | 'attendance' | 'academic' | 'fee'; text: string }>;
}

// --- Comprehensive Seed Mock Data Matrix ---
const initialStudentsDataset: StudentProfile[] = [
  {
    id: "STU-2026-089",
    name: "Rohan Shrestha",
    status: "Active",
    avatar: "",
    dob: "March 12, 2005",
    gender: "Male",
    bloodGroup: "B+",
    nationality: "Nepali",
    department: "Computer Science",
    batch: "2023 - 2027",
    semester: "6th Semester",
    rollNo: "CS-23-45",
    email: "rohan.shrestha@edusmart.edu",
    phone: "+977 9841234567",
    address: "Kathmandu, Nepal",
    guardian: "Hari Shrestha (Father)",
    attendanceOverall: 92,
    currentGpa: 3.82,
    completedCourses: 24,
    feePaidStatus: "Paid",
    pendingFeeAmount: 0,
    subjects: [
      { code: "CS-301", name: "Database Management System", instructor: "Er. Ramesh Thapa", attendance: 95, grade: "A" },
      { code: "CS-302", name: "Data Structures & Algorithms", instructor: "Dr. Alok Joshi", attendance: 89, grade: "A-" },
      { code: "CS-303", name: "Operating Systems", instructor: "Prof. Sunita Rai", attendance: 92, grade: "B+" },
      { code: "CS-304", name: "Computer Networks", instructor: "Er. Rupesh Karki", attendance: 94, grade: "A" },
    ],
    performance: [
      { semester: "Sem 1", gpa: 3.50 }, { semester: "Sem 2", gpa: 3.65 },
      { semester: "Sem 3", gpa: 3.42 }, { semester: "Sem 4", gpa: 3.80 },
      { semester: "Sem 5", gpa: 3.82 },
    ],
    logs: [
      { date: "June 05, 2026", type: "academic", text: "Scored 48/50 in Database Management mid-term evaluation." },
      { date: "June 02, 2026", type: "attendance", text: "Marked absent for morning Computer Networks laboratory session." },
      { date: "May 28, 2026", type: "fee", text: "6th Semester installment payment of $1,200 processed via system e-wallet." },
    ]
  },
  {
    id: "STU-2026-042",
    name: "Aayush Sharma",
    status: "Active",
    avatar: "",
    dob: "August 22, 2004",
    gender: "Male",
    bloodGroup: "O+",
    nationality: "Nepali",
    department: "Computer Science",
    batch: "2023 - 2027",
    semester: "6th Semester",
    rollNo: "CS-23-12",
    email: "aayush.sharma@edusmart.edu",
    phone: "+977 9851012345",
    address: "Lalitpur, Nepal",
    guardian: "Gopal Sharma (Father)",
    attendanceOverall: 87,
    currentGpa: 3.45,
    completedCourses: 22,
    feePaidStatus: "Partial",
    pendingFeeAmount: 450,
    subjects: [
      { code: "CS-301", name: "Database Management System", instructor: "Er. Ramesh Thapa", attendance: 88, grade: "B" },
      { code: "CS-302", name: "Data Structures & Algorithms", instructor: "Dr. Alok Joshi", attendance: 85, grade: "B+" },
    ],
    performance: [
      { semester: "Sem 1", gpa: 3.20 }, { semester: "Sem 2", gpa: 3.40 },
      { semester: "Sem 3", gpa: 3.35 }, { semester: "Sem 4", gpa: 3.50 },
    ],
    logs: [
      { date: "June 01, 2026", type: "fee", text: "Partial payment warning notification dispatched automatically." }
    ]
  },
  {
    id: "STU-2026-115",
    name: "Deepa Rai",
    status: "Suspended",
    avatar: "",
    dob: "November 05, 2005",
    gender: "Female",
    bloodGroup: "A-",
    nationality: "Nepali",
    department: "Information Technology",
    batch: "2024 - 2028",
    semester: "4th Semester",
    rollNo: "IT-24-19",
    email: "deepa.rai@edusmart.edu",
    phone: "+977 9813001122",
    address: "Bhaktapur, Nepal",
    guardian: "Nirmala Rai (Mother)",
    attendanceOverall: 62,
    currentGpa: 2.15,
    completedCourses: 12,
    feePaidStatus: "Pending",
    pendingFeeAmount: 1850,
    subjects: [
      { code: "IT-201", name: "Web Technologies", instructor: "Er. Rupesh Karki", attendance: 60, grade: "C" },
    ],
    performance: [
      { semester: "Sem 1", gpa: 2.80 }, { semester: "Sem 2", gpa: 2.50 },
      { semester: "Sem 3", gpa: 2.15 },
    ],
    logs: [
      { date: "June 04, 2026", type: "notice", text: "Account systematically locked due to disciplinary attendance review." }
    ]
  }
];

export default function StudentProfilePage() {
  const [students, setStudents] = useState<StudentProfile[]>(initialStudentsDataset);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'personal' | 'academic' | 'contact'>('personal');
  
  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State for Adding New Student
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentDept, setNewStudentDept] = useState('Computer Science');
  const [newStudentEmail, setNewStudentEmail] = useState('');

  // --- Administrative Handlers ---
  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentEmail) return;

    const generatedId = `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: StudentProfile = {
      id: generatedId,
      name: newStudentName,
      status: "Active",
      avatar: "",
      dob: "Not Provided", gender: "Not Provided", bloodGroup: "N/A", nationality: "Nepali",
      department: newStudentDept,
      batch: "2026 - 2030",
      semester: "1st Semester",
      rollNo: `NEW-${Math.floor(10 + Math.random() * 89)}`,
      email: newStudentEmail,
      phone: "N/A", address: "N/A", guardian: "N/A",
      attendanceOverall: 100, currentGpa: 4.00, completedCourses: 0,
      feePaidStatus: "Pending", pendingFeeAmount: 2200,
      subjects: [], performance: [],
      logs: [{ date: "June 07, 2026", type: "notice", text: "Student system account provisioned by Central Administration." }]
    };

    setStudents([newRecord, ...students]);
    setIsAddModalOpen(false);
    setNewStudentName('');
    setNewStudentEmail('');
    alert(`Successfully created system record for ${newStudentName} with System ID: ${generatedId}`);
  };

  const handleUpdateStatus = (id: string, newStatus: 'Active' | 'On Leave' | 'Suspended') => {
    const updated = students.map(s => s.id === id ? { ...s, status: newStatus } : s);
    setStudents(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({ ...selectedStudent, status: newStatus });
    }
    alert(`Administrative Status updated to: ${newStatus}`);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm("CRITICAL WARNING: Are you certain you want to permanently delete this student record from institutional clusters? This cannot be undone.")) {
      setStudents(students.filter(s => s.id !== id));
      setSelectedStudent(null);
    }
  };

  const handleDownloadTranscript = (name: string) => {
    alert(`Generating certified administrative verification ledger and transcripts for: ${name}`);
  };

  // Filter calculation logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All' || student.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800 relative">
      
      {/* ========================================================= */}
      {/* VIEW CONDITION 1: REVEAL SYSTEM-WIDE DIRECTORY MASTER     */}
      {/* ========================================================= */}
      {!selectedStudent ? (
        <div className="max-w-6xl mx-auto flex flex-col gap-5">
          
          {/* Admin Header Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md shadow-blue-100">
                <Users size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Global Student Control Hub</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Root Admin Privilege System Registry Access</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-start sm:self-center">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Plus size={15} /> Add Student Profile
              </button>
            </div>
          </div>

          {/* Administrative Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search global records by Name, Student ID, or Active Institutional Mail..." 
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
                <option value="Information Technology">Information Technology</option>
              </select>
              <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>

            <div className="md:col-span-3 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
              >
                <option value="All">All Status Flags</option>
                <option value="Active">Active Status</option>
                <option value="On Leave">On Leave</option>
                <option value="Suspended">Suspended</option>
              </select>
              <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Master Operational Grid Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-212.5">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-5 font-medium">Student Info</th>
                    <th className="py-3 font-medium">Department / Route</th>
                    <th className="py-3 text-center font-medium">Attendance</th>
                    <th className="py-3 text-center font-medium">GPA Metric</th>
                    <th className="py-3 text-center font-medium">Billing Ledger</th>
                    <th className="py-3 text-center font-medium">Account Status</th>
                    <th className="py-3 pr-5 text-right font-medium">Root Access Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/40 group transition-colors duration-150">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{student.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{student.id} • {student.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700">
                        <div>{student.department}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{student.semester}</div>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className={`font-bold px-2 py-0.5 rounded-md ${student.attendanceOverall >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                          {student.attendanceOverall}%
                        </span>
                      </td>
                      <td className="py-3.5 text-center font-bold text-slate-700">{student.currentGpa.toFixed(2)}</td>
                      <td className="py-3.5 text-center">
                        <span className={`font-bold px-2 py-0.5 rounded-md ${
                          student.feePaidStatus === 'Paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                          {student.feePaidStatus === 'Paid' ? 'Clear' : `$${student.pendingFeeAmount} Pending`}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <select 
                          value={student.status}
                          onChange={(e) => handleUpdateStatus(student.id, e.target.value as any)}
                          className={`font-bold border-none bg-transparent rounded-lg p-1 text-center cursor-pointer outline-none ${
                            student.status === 'Active' ? 'text-emerald-600 bg-emerald-50/50' :
                            student.status === 'Suspended' ? 'text-rose-600 bg-rose-50/50' : 'text-amber-600 bg-amber-50/50'
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="On Leave">On Leave</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </td>
                      <td className="py-3.5 pr-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button 
                            onClick={() => setSelectedStudent(student)}
                            className="p-1.5 border border-slate-200 hover:border-blue-500 bg-white text-slate-400 hover:text-blue-600 rounded-lg shadow-xs transition-all"
                            title="View Deep Profile"
                          >
                            <Eye size={13} />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="p-1.5 border border-slate-200 hover:border-rose-500 bg-white text-slate-400 hover:text-rose-600 rounded-lg shadow-xs transition-all"
                            title="Purge Record"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        
        // ========================================================= 
        // VIEW CONDITION 2: DYNAMIC ADMIN DETAILED PROFILE SHEET    
        // ========================================================= 
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          
          {/* Navigation Action Back Strip */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <ArrowLeft size={14} /> Back to Administration Registry
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => handleDownloadTranscript(selectedStudent.name)}
                className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Download size={13} /> Export Transcript
              </button>
            </div>
          </div>

          {/* PROFILE CARD IDENTIFIER */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 w-full bg-linear-to-r from-slate-700 to-slate-900 relative" />
            <div className="px-6 pb-5 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-slate-100 shadow-md flex items-center justify-center text-slate-700 font-bold text-3xl">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="mb-1">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <h2 className="text-xl font-bold text-slate-800">{selectedStudent.name}</h2>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      selectedStudent.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>{selectedStudent.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">{selectedStudent.id} • Global Operations Registry</p>
                </div>
              </div>

              {/* Status Modulation Buttons inside Detail View */}
              <div className="flex items-center gap-2">
                {selectedStudent.status !== 'Suspended' ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedStudent.id, 'Suspended')}
                    className="flex items-center gap-1 px-3 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                  >
                    <ShieldAlert size={14} /> Suspend Access
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(selectedStudent.id, 'Active')}
                    className="flex items-center gap-1 px-3 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-all"
                  >
                    <CheckCircle size={14} /> Reinstate Account
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABBED MATRIX DATA SECTION */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1">
              {(['personal', 'academic', 'contact'] as const).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveProfileTab(tab)}
                  className={`capitalize px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeProfileTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  {tab} Core Info
                </button>
              ))}
            </div>
            <div className="p-5 text-xs font-semibold text-slate-700">
              {activeProfileTab === 'personal' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Date of Birth</label>{selectedStudent.dob}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Gender</label>{selectedStudent.gender}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Blood Group</label>{selectedStudent.bloodGroup}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Nationality</label>{selectedStudent.nationality}</div>
                </div>
              )}
              {activeProfileTab === 'academic' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Department Route</label>{selectedStudent.department}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Batch Scope</label>{selectedStudent.batch}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Roll Assignment</label>{selectedStudent.rollNo}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active Semester</label>{selectedStudent.semester}</div>
                </div>
              )}
              {activeProfileTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Direct Phone</label>{selectedStudent.phone}</div>
                  <div className="md:col-span-2"><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Admin E-mail</label>{selectedStudent.email}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Emergency Guardian</label>{selectedStudent.guardian}</div>
                </div>
              )}
            </div>
          </div>

          {/* SYSTEM QUICK LEDGER STATS METRICS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Attendance</span><h4 className="text-base font-bold text-slate-800">{selectedStudent.attendanceOverall}%</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Award size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">GPA Rating</span><h4 className="text-base font-bold text-slate-800">{selectedStudent.currentGpa.toFixed(2)}</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><BookOpen size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Completed Modules</span><h4 className="text-base font-bold text-slate-800">{selectedStudent.completedCourses} Passed</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl"><CreditCard size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Accounting Status</span><h4 className="text-base font-bold text-slate-800 capitalize">{selectedStudent.feePaidStatus}</h4></div>
            </div>
          </div>

          {/* ROW 6 & 7: PERFORMANCE CHART & ADMINISTRATIVE AUDIT LOG */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-slate-700 text-base mb-4">Historical Progression Ledger</h3>
              <div className="h-48 w-full -ml-5">
                {selectedStudent.performance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedStudent.performance} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="semester" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 4.0]} ticks={[0, 2.0, 4.0]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }} />
                      <Bar dataKey="gpa" fill="#1e293b" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 text-xs font-semibold">No historic semester analytics populated.</div>
                )}
              </div>
            </div>

            <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-700 text-base mb-4">System Access Audit Trail</h3>
              <div className="flex flex-col gap-3.5">
                {selectedStudent.logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 mt-0.5"><AlertCircle size={14} /></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center"><span className="font-bold text-slate-400 text-[10px]">{log.date}</span></div>
                      <p className="text-slate-600 font-medium mt-0.5 line-clamp-2">{log.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* GLOBAL OVERLAY MODAL: RECORD CREATION COMPONENT           */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Provision New Student Account</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleCreateStudent} className="p-5 flex flex-col gap-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Full Student Legal Name</label>
                <input required type="text" placeholder="e.g., Rupesh Karki" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all" />
              </div>
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Primary Notification E-mail</label>
                <input required type="email" placeholder="username@institution.edu" value={newStudentEmail} onChange={(e) => setNewStudentEmail(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all" />
              </div>
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Department Faculty Assignment</label>
                <select value={newStudentDept} onChange={(e) => setNewStudentDept(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold outline-none cursor-pointer">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all mt-2">Commit Record to Registry</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}