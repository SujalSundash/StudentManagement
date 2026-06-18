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
  CreditCard, 
  AlertCircle,
  Search,
  SlidersHorizontal,
  Download,
  Plus,
  ArrowLeft,
  Eye,
  Trash2,
  ShieldAlert,
  CheckCircle,
  X,
  Briefcase,
  Layers} from 'lucide-react';

// --- Interfaces ---
interface InstructorProfile {
  id: string;
  name: string;
  status: 'Active' | 'On Leave' | 'Suspended';
  avatar: string;
  dob: string;
  gender: string;
  joiningDate: string;
  nationality: string;
  department: string;
  designation: string; // e.g., Professor, Assistant Professor, Lecturer
  roomNo: string;
  email: string;
  phone: string;
  address: string;
  qualification: string; // e.g., Ph.D. in Data Science
  assignedClassesCount: number;
  averageRating: number; // Student satisfaction rating out of 5.0
  syllabusCoverage: number; // Overall percentage completed
  payrollStatus: 'Disbursed' | 'Pending' | 'On Hold';
  salaryAmount: number;
  assignedModules: Array<{ code: string; name: string; studentCount: number; room: string; schedule: string }>;
  performanceHistory: Array<{ semester: string; reviewScore: number }>; // review score out of 5.0
  logs: Array<{ date: string; type: 'system' | 'payroll' | 'academic' | 'notice'; text: string }>;
}

// --- Seed Mock Data Matrix ---
const initialInstructorsDataset: InstructorProfile[] = [
  {
    id: "INS-2026-014",
    name: "Er. Rupesh Karki",
    status: "Active",
    avatar: "",
    dob: "September 18, 1994",
    gender: "Male",
    joiningDate: "February 10, 2022",
    nationality: "Nepali",
    department: "Computer Science",
    designation: "Assistant Professor",
    roomNo: "Block C - Lab 4",
    email: "rupesh.karki@edusmart.edu",
    phone: "+977 9841998877",
    address: "Kathmandu, Nepal",
    qualification: "M.E. in Computer Engineering",
    assignedClassesCount: 4,
    averageRating: 4.85,
    syllabusCoverage: 94,
    payrollStatus: "Disbursed",
    salaryAmount: 2400,
    assignedModules: [
      { code: "CS-304", name: "Computer Networks", studentCount: 45, room: "Hall B", schedule: "Mon/Wed - 08:00 AM" },
      { code: "IT-201", name: "Web Technologies", studentCount: 52, room: "Lab 2", schedule: "Tue/Thu - 10:30 AM" },
      { code: "CS-402", name: "Advanced Node.js Frameworks", studentCount: 38, room: "Lab 5", schedule: "Fri - 01:00 PM" }
    ],
    performanceHistory: [
      { semester: "2024 Fall", reviewScore: 4.50 },
      { semester: "2025 Spring", reviewScore: 4.68 },
      { semester: "2025 Fall", reviewScore: 4.85 }
    ],
    logs: [
      { date: "June 06, 2026", type: "academic", text: "Submitted standardized final practical markings for CS-304." },
      { date: "June 01, 2026", type: "payroll", text: "Monthly institutional compensation wire processed successfully." },
      { date: "May 25, 2026", type: "system", text: "Updated master lesson plan syllabus outline repository for Web Tech." }
    ]
  },
  {
    id: "INS-2026-003",
    name: "Dr. Alok Joshi",
    status: "Active",
    avatar: "",
    dob: "January 04, 1982",
    gender: "Male",
    joiningDate: "August 15, 2018",
    nationality: "Nepali",
    department: "Computer Science",
    designation: "Professor / Department Chair",
    roomNo: "Admin Block - Room 102",
    email: "alok.joshi@edusmart.edu",
    phone: "+977 9851065432",
    address: "Lalitpur, Nepal",
    qualification: "Ph.D. in Algorithms & Complexity",
    assignedClassesCount: 2,
    averageRating: 4.90,
    syllabusCoverage: 89,
    payrollStatus: "Disbursed",
    salaryAmount: 3500,
    assignedModules: [
      { code: "CS-302", name: "Data Structures & Algorithms", studentCount: 60, room: "Auditorium 1", schedule: "Mon/Wed - 10:00 AM" }
    ],
    performanceHistory: [
      { semester: "2024 Fall", reviewScore: 4.90 },
      { semester: "2025 Spring", reviewScore: 4.88 },
      { semester: "2025 Fall", reviewScore: 4.90 }
    ],
    logs: [
      { date: "June 04, 2026", type: "notice", text: "Approved departmental funding for high-performance laboratory machine upgrades." }
    ]
  },
  {
    id: "INS-2026-029",
    name: "Prof. Sunita Rai",
    status: "On Leave",
    avatar: "",
    dob: "November 23, 1989",
    gender: "Female",
    joiningDate: "May 20, 2021",
    nationality: "Nepali",
    department: "Information Technology",
    designation: "Senior Lecturer",
    roomNo: "Block C - Room 305",
    email: "sunita.rai@edusmart.edu",
    phone: "+977 9818334455",
    address: "Bhaktapur, Nepal",
    qualification: "M.S. in Cyber Security",
    assignedClassesCount: 1,
    averageRating: 4.20,
    syllabusCoverage: 72,
    payrollStatus: "On Hold",
    salaryAmount: 2100,
    assignedModules: [
      { code: "CS-303", name: "Operating Systems", studentCount: 42, room: "Room 401", schedule: "Tue/Thu - 08:00 AM" }
    ],
    performanceHistory: [
      { semester: "2024 Fall", reviewScore: 4.35 },
      { semester: "2025 Spring", reviewScore: 4.10 },
      { semester: "2025 Fall", reviewScore: 4.20 }
    ],
    logs: [
      { date: "June 02, 2026", type: "notice", text: "Submitted verified documentation for authorized medical leave of absence." }
    ]
  }
];

export default function TeacherStudentManager() {
  const [instructors, setInstructors] = useState<InstructorProfile[]>(initialInstructorsDataset);
  const [selectedInstructor, setSelectedInstructor] = useState<InstructorProfile | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'personal' | 'professional' | 'contact'>('personal');
  
  // Search & Filter Systems
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State for Onboarding New Instructor
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newInsName, setNewInsName] = useState('');
  const [newInsDept, setNewInsDept] = useState('Computer Science');
  const [newInsEmail, setNewInsEmail] = useState('');
  const [newInsDesignation, setNewInsDesignation] = useState('Lecturer');

  // --- Administration Core Handlers ---
  const handleOnboardInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInsName || !newInsEmail) return;

    const generatedId = `INS-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: InstructorProfile = {
      id: generatedId,
      name: newInsName,
      status: "Active",
      avatar: "",
      dob: "Not Specified", gender: "Not Specified", joiningDate: "June 07, 2026", nationality: "Nepali",
      department: newInsDept,
      designation: newInsDesignation,
      roomNo: "TBD",
      email: newInsEmail,
      phone: "TBD", address: "TBD",
      qualification: "Credentials Pending Audit",
      assignedClassesCount: 0, averageRating: 5.00, syllabusCoverage: 0,
      payrollStatus: "Pending", salaryAmount: 1800,
      assignedModules: [], performanceHistory: [],
      logs: [{ date: "June 07, 2026", type: "system", text: "Faculty enterprise infrastructure routing provisioned by Administration." }]
    };

    setInstructors([newRecord, ...instructors]);
    setIsAddModalOpen(false);
    setNewInsName('');
    setNewInsEmail('');
    alert(`Successfully registered faculty profile for ${newInsName} with ID: ${generatedId}`);
  };

 const handleUpdateStatus = (id: string, newStatus: 'Active' | 'On Leave' | 'Suspended') => {
  // Corrected spread from "...s = i" to "...i"
  const updated = instructors.map(i => i.id === id ? { ...i, status: newStatus } : i);
  setInstructors(updated);
  if (selectedInstructor && selectedInstructor.id === id) {
    setSelectedInstructor({ ...selectedInstructor, status: newStatus });
  }
  alert(`Access permissions changed to: ${newStatus}`);
};

  const handlePurgeRecord = (id: string) => {
    if (window.confirm("CRITICAL ACCREDITATION WARNING: Delete this instructor record permanently? All course history links will be unassigned.")) {
      setInstructors(instructors.filter(i => i.id !== id));
      setSelectedInstructor(null);
    }
  };

  const handleExportRoster = () => {
    alert("Compiling fully audited institutional faculty roster schema matching active queries (.csv)...");
  };

  // Filter calculation matrix
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          instructor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          instructor.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All' || instructor.department === deptFilter;
    const matchesStatus = statusFilter === 'All' || instructor.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800 relative">
      
      {/* ========================================================= */}
      {/* VIEW CONDITION 1: ROOT FACULTY DIRECTORY MASTER TAB      */}
      {/* ========================================================= */}
      {!selectedInstructor ? (
        <div className="max-w-5xl mx-auto flex flex-col gap-5">
          
          {/* Dashboard Header Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-slate-900 text-white rounded-xl shadow-md">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Faculty & Instructor Registry</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Administrative oversight of institutional tenure, classes, and performance ratings</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-center"
            >
              <Plus size={15} /> Onboard New Faculty
            </button>
          </div>

          {/* Directory Filtering Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by instructor name, ID index, or academic email account..." 
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

            <div className="md:col-span-2 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Only</option>
                <option value="On Leave">On Leave</option>
                <option value="Suspended">Suspended</option>
              </select>
              <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>

            <button 
              onClick={handleExportRoster}
              className="md:col-span-2 flex items-center justify-center gap-1.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Download size={13} /> Export Data
            </button>
          </div>

          {/* Master Operational Matrix Table Grid */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-225">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-5 font-medium">Instructor Profile</th>
                    <th className="py-3 font-medium">Academic Department</th>
                    <th className="py-3 text-center font-medium">Active Loads</th>
                    <th className="py-3 text-center font-medium">Syllabus Progress</th>
                    <th className="py-3 text-center font-medium">Rating Score</th>
                    <th className="py-3 text-center font-medium">Access Matrix</th>
                    <th className="py-3 pr-5 text-right font-medium">Global Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredInstructors.map((instructor) => (
                    <tr key={instructor.id} className="hover:bg-slate-50/40 group transition-colors duration-150">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                            {instructor.name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0,2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{instructor.name}</h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{instructor.id} • {instructor.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700">
                        <div>{instructor.designation}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{instructor.department}</div>
                      </td>
                      <td className="py-3.5 text-center font-bold text-slate-700">
                        <span className="px-2 py-0.5 bg-slate-100 rounded-md text-slate-600">
                          {instructor.assignedClassesCount} Modules
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2 max-w-28 mx-auto">
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${instructor.syllabusCoverage}%` }} />
                          </div>
                          <span className="font-bold text-slate-600">{instructor.syllabusCoverage}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-center">
                        <span className="font-bold text-amber-600 bg-amber-50/70 px-1.5 py-0.5 rounded-md">
                          ★ {instructor.averageRating.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-3.5 text-center">
                        <select 
                          value={instructor.status}
                          onChange={(e) => handleUpdateStatus(instructor.id, e.target.value as any)}
                          className={`font-bold border-none bg-transparent rounded-lg p-1 cursor-pointer text-center outline-none ${
                            instructor.status === 'Active' ? 'text-emerald-600 bg-emerald-50/50' :
                            instructor.status === 'Suspended' ? 'text-rose-600 bg-rose-50/50' : 'text-amber-600 bg-amber-50/50'
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
                            onClick={() => setSelectedInstructor(instructor)}
                            className="p-1.5 border border-slate-200 hover:border-blue-500 bg-white text-slate-400 hover:text-blue-600 rounded-lg shadow-2xs transition-all"
                            title="Inspect Deep Profile"
                          >
                            <Eye size={13} />
                          </button>
                          <button 
                            onClick={() => handlePurgeRecord(instructor.id)}
                            className="p-1.5 border border-slate-200 hover:border-rose-500 bg-white text-slate-400 hover:text-rose-600 rounded-lg shadow-2xs transition-all"
                            title="Purge Faculty Node"
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
        // VIEW CONDITION 2: COMPREHENSIVE FACULTY DEEP ANALYTICS   
        // ========================================================= 
        <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn">
          
          {/* Navigation Action Back Strip */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedInstructor(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <ArrowLeft size={14} /> Back to Faculty Directory
            </button>
            <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 font-bold px-3 py-1.5 rounded-xl">
              System ID Ref: {selectedInstructor.id}
            </span>
          </div>

          {/* FACULTY CARD HOOK IDENTIFIER */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="h-32 w-full bg-slate-900 relative opacity-95" />
            <div className="px-6 pb-5 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 -mt-12 relative z-10">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-4 text-center md:text-left">
                <div className="w-24 h-24 rounded-2xl border-4 border-white bg-blue-50 text-blue-600 font-bold text-3xl shadow-md flex items-center justify-center shrink-0">
                  {selectedInstructor.name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0,2)}
                </div>
                <div className="mb-1">
                  <div className="flex items-center justify-center md:justify-start gap-2.5">
                    <h2 className="text-xl font-bold text-slate-800">{selectedInstructor.name}</h2>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      selectedInstructor.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>{selectedInstructor.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-medium mt-0.5">{selectedInstructor.designation} • {selectedInstructor.department}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedInstructor.status !== 'Suspended' ? (
                  <button 
                    onClick={() => handleUpdateStatus(selectedInstructor.id, 'Suspended')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100 rounded-xl text-xs font-bold transition-all"
                  >
                    <ShieldAlert size={14} /> Revoke Infrastructure Keys
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUpdateStatus(selectedInstructor.id, 'Active')}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 rounded-xl text-xs font-bold transition-all"
                  >
                    <CheckCircle size={14} /> Reinstate Faculty Reroute
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABBED SUBSYSTEM CARD CHANGER */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 gap-1">
              {(['personal', 'professional', 'contact'] as const).map((tab) => (
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
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Date of Birth</label>{selectedInstructor.dob}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Gender Axis</label>{selectedInstructor.gender}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Nationality</label>{selectedInstructor.nationality}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">System Onboarding Date</label>{selectedInstructor.joiningDate}</div>
                </div>
              )}
              {activeProfileTab === 'professional' && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Accredited Rank</label>{selectedInstructor.designation}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Core Department</label>{selectedInstructor.department}</div>
                  <div className="md:col-span-2"><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Highest Qualification Ledger</label>{selectedInstructor.qualification}</div>
                </div>
              )}
              {activeProfileTab === 'contact' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Direct Office Phone</label>{selectedInstructor.phone}</div>
                  <div className="md:col-span-2"><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Enterprise Mailbox</label>{selectedInstructor.email}</div>
                  <div><label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-0.5">Assigned Facility Room</label>{selectedInstructor.roomNo}</div>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC SYSTEM STATS PERFORMANCE DASHBOARD */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Layers size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Course Load</span><h4 className="text-base font-bold text-slate-800">{selectedInstructor.assignedClassesCount} Classes Active</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Award size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Student Rating</span><h4 className="text-base font-bold text-slate-800">★ {selectedInstructor.averageRating} / 5.0</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><BookOpen size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Syllabus Coverage</span><h4 className="text-base font-bold text-slate-800">{selectedInstructor.syllabusCoverage}% Done</h4></div>
            </div>
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex items-center gap-3.5">
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl"><CreditCard size={18} /></div>
              <div><span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Admin Payroll</span><h4 className="text-base font-bold text-slate-800">${selectedInstructor.salaryAmount} ({selectedInstructor.payrollStatus})</h4></div>
            </div>
          </div>

          {/* FACULTY MODULES ASSIGNED SPECIFIC LEDGER TABLE */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-blue-600" size={18} />
              <h3 className="font-bold text-slate-700 text-base">Assigned Core Course Modules</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-2.5 font-medium">Code</th>
                    <th className="pb-2.5 font-medium">Module Name</th>
                    <th className="pb-2.5 font-medium text-center">Enrolled Students</th>
                    <th className="pb-2.5 font-medium text-center">Room Assignment</th>
                    <th className="pb-2.5 font-medium text-right">Time Grid Routine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                  {selectedInstructor.assignedModules.map((mod, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 text-blue-600 font-bold">{mod.code}</td>
                      <td className="py-3 text-slate-800">{mod.name}</td>
                      <td className="py-3 text-center text-slate-500">{mod.studentCount} Active</td>
                      <td className="py-3 text-center"><span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[11px]">{mod.room}</span></td>
                      <td className="py-3 text-right text-slate-500 font-medium">{mod.schedule}</td>
                    </tr>
                  ))}
                  {selectedInstructor.assignedModules.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">No system class routines mapped to this instructor node.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* HISTORIC PERFORMANCE GRAPH CHART & AUDIT TRAILS */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
              <h3 className="font-bold text-slate-700 text-base mb-4">Evaluation Score Progression</h3>
              <div className="h-48 w-full -ml-5">
                {selectedInstructor.performanceHistory.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selectedInstructor.performanceHistory} margin={{ left: -20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="semester" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 5.0]} ticks={[0, 2.5, 5.0]} tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: 'none', color: '#fff' }} />
                      <Bar dataKey="reviewScore" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-400 font-semibold">No historic appraisal loops mapped.</div>
                )}
              </div>
            </div>

            <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
              <h3 className="font-bold text-slate-700 text-base mb-4">Faculty Event Trails</h3>
              <div className="flex flex-col gap-3.5 my-auto">
                {selectedInstructor.logs.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <div className="p-1.5 bg-slate-50 rounded-lg text-slate-400 shrink-0 mt-0.5"><AlertCircle size={14} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center"><span className="font-bold text-slate-400 text-[10px]">{log.date}</span><span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">{log.type}</span></div>
                      <p className="text-slate-600 font-medium mt-0.5 line-clamp-2 leading-relaxed">{log.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* GLOBAL MODAL: PROVISION NEW INSTRUCTOR ACCOUNT MODULE     */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-md w-full overflow-hidden animate-slideUp">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Provision Faculty Record Node</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            <form onSubmit={handleOnboardInstructor} className="p-5 flex flex-col gap-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Legal Academic Name</label>
                <input required type="text" placeholder="e.g., Er. Rupesh Karki" value={newInsName} onChange={(e) => setNewInsName(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all" />
              </div>
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Enterprise Mailbox Identifier</label>
                <input required type="email" placeholder="username@institution.edu" value={newInsEmail} onChange={(e) => setNewInsEmail(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Department Faculty</label>
                  <select value={newInsDept} onChange={(e) => setNewInsDept(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold outline-none cursor-pointer">
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Starting Tenure Rank</label>
                  <select value={newInsDesignation} onChange={(e) => setNewInsDesignation(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold outline-none cursor-pointer">
                    <option value="Lecturer">Lecturer</option>
                    <option value="Senior Lecturer">Senior Lecturer</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Professor">Professor</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all mt-2">Commit Faculty Node to Registry</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}