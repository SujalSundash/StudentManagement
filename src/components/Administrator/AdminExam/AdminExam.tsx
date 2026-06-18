import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  Award, 
  Search, 
  SlidersHorizontal, 
  Plus, 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Users, 
  X, 
  ChevronRight, 
  BookOpen
} from 'lucide-react';

// --- Interfaces ---
interface ExamDetail {
  id: string; // e.g., EXAM-CSE-301
  title: string;
  courseCode: string;
  department: string;
  date: string;
  duration: string;
  totalMarks: number;
  passingMarks: number;
  enrolledStudents: number;
  evaluationStatus: 'Pending' | 'In Progress' | 'Completed';
  examiner: string;
  roomAllocation: string;
}

// --- Seed Mock Data Matrix ---
const initialExamsDataset: ExamDetail[] = [
  {
    id: "EXAM-CSE-301",
    title: "Advanced Database Management Systems",
    courseCode: "CSE-301",
    department: "Computer Science",
    date: "2026-06-15",
    duration: "3 Hours",
    totalMarks: 100,
    passingMarks: 40,
    enrolledStudents: 142,
    evaluationStatus: "Pending",
    examiner: "Dr. Alok Joshi",
    roomAllocation: "Block C - Hall 2"
  },
  {
    id: "EXAM-IT-204",
    title: "Cloud Infrastructure & Routing architectures",
    courseCode: "IT-204",
    department: "Information Technology",
    date: "2026-06-18",
    duration: "2 Hours",
    totalMarks: 75,
    passingMarks: 30,
    enrolledStudents: 98,
    evaluationStatus: "In Progress",
    examiner: "Prof. Sunita Rai",
    roomAllocation: "Lab 4 & 5"
  },
  {
    id: "EXAM-ECE-402",
    title: "Digital Signal Processing Foundations",
    courseCode: "ECE-402",
    department: "Electronics & Communication",
    date: "2026-05-28",
    duration: "3 Hours",
    totalMarks: 100,
    passingMarks: 40,
    enrolledStudents: 64,
    evaluationStatus: "Completed",
    examiner: "Dr. Ramesh Adhikari",
    roomAllocation: "Block A - Room 102"
  }
];

export default function AdminExam() {
  const [exams, setExams] = useState<ExamDetail[]>(initialExamsDataset);
  const [selectedExam, setSelectedExam] = useState<ExamDetail | null>(null);

  // Search & Filter System
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal State for Scheduling New Exam
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newDept, setNewDept] = useState('Computer Science');
  const [newDate, setNewDate] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newTotalMarks, setNewTotalMarks] = useState('100');
  const [newPassingMarks, setNewPassingMarks] = useState('40');
  const [newExaminer, setNewExaminer] = useState('');
  const [newRoom, setNewRoom] = useState('');

  // --- Administrative Matrix Handlers ---
  const handleScheduleExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCourseCode || !newDate || !newExaminer) return;

    const newRecord: ExamDetail = {
      id: `EXAM-${newCourseCode.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      courseCode: newCourseCode.toUpperCase(),
      department: newDept,
      date: newDate,
      duration: newDuration || "3 Hours",
      totalMarks: Number(newTotalMarks) || 100,
      passingMarks: Number(newPassingMarks) || 40,
      enrolledStudents: 0,
      evaluationStatus: "Pending",
      examiner: newExaminer,
      roomAllocation: newRoom || "TBD"
    };

    setExams([newRecord, ...exams]);
    setIsAddModalOpen(false);
    
    // Clear Form Fields
    setNewTitle('');
    setNewCourseCode('');
    setNewDate('');
    setNewDuration('');
    setNewExaminer('');
    setNewRoom('');
    alert(`Successfully compiled and scheduled: ${newTitle}`);
  };

  const handleUpdateEvaluationStatus = (id: string, nextStatus: 'Pending' | 'In Progress' | 'Completed') => {
    const updated = exams.map(e => e.id === id ? { ...e, evaluationStatus: nextStatus } : e);
    setExams(updated);
    if (selectedExam && selectedExam.id === id) {
      setSelectedExam({ ...selectedExam, evaluationStatus: nextStatus });
    }
  };

  // Filter application parameters
  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          exam.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          exam.examiner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || exam.evaluationStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full bg-slate-50 min-h-screen p-6 font-sans text-slate-800">
      
      {/* ========================================================= */}
      {/* VIEW CONDITION 1: ROOT EXAMS MANAGEMENT OVERVIEW          */}
      {/* ========================================================= */}
      {!selectedExam ? (
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          
          {/* Dashboard Header Setup */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
                <FileSpreadsheet size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Examination & Grading Registry</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Provision exam timelines, map structural seating distributions, and control institutional grading cycles</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all self-start sm:self-center"
            >
              <Plus size={15} /> Schedule New Examination
            </button>
          </div>

          {/* Quick Tracking Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
  {/* Card 1: Total Modules */}
  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
      <FileText size={18} />
    </div>
    <div className="min-w-0">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
        Total Modules
      </span>
      <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
        {exams.length} Test Blocks
      </h4>
    </div>
  </div>

  {/* Card 2: In Evaluation */}
  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl shrink-0">
      <Clock size={18} />
    </div>
    <div className="min-w-0">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
        In Evaluation
      </span>
      <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
        {exams.filter(e => e.evaluationStatus === 'In Progress').length} Pending
      </h4>
    </div>
  </div>

  {/* Card 3: Released Results */}
  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
      <CheckCircle size={18} />
    </div>
    <div className="min-w-0">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
        Released Results
      </span>
      <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
        {exams.filter(e => e.evaluationStatus === 'Completed').length} Batches
      </h4>
    </div>
  </div>

  {/* Card 4: Active Candidates */}
  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4 flex flex-row items-center gap-4">
    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
      <Users size={18} />
    </div>
    <div className="min-w-0">
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block truncate">
        Active Candidates
      </span>
      <h4 className="text-sm sm:text-base font-bold text-slate-800 truncate">
        {exams.reduce((acc, curr) => acc + curr.enrolledStudents, 0)} Examinees
      </h4>
    </div>
  </div>
</div>

          {/* Search/Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search blueprints by assessment title, structural course codes, or designated supervisor index..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs font-medium outline-none transition-all shadow-sm"
              />
            </div>

            <div className="md:col-span-4 relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-4 pr-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl text-xs outline-none cursor-pointer shadow-sm appearance-none"
              >
                <option value="All">All Evaluation Cycles</option>
                <option value="Pending">Pending Evaluation</option>
                <option value="In Progress">Under Active Grading</option>
                <option value="Completed">Completed & Released</option>
              </select>
              <SlidersHorizontal className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
            </div>
          </div>

          {/* Core Master Examination Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-212.5">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-5 font-medium">Exam Assessment Node</th>
                    <th className="py-3 font-medium">Department Unit</th>
                    <th className="py-3 font-medium">Timeline Allocation</th>
                    <th className="py-3 text-center font-medium">Room Target</th>
                    <th className="py-3 text-center font-medium">Grading Lifecycle State</th>
                    <th className="py-3 pr-5 text-right font-medium">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredExams.map((exam) => (
                    <tr 
                      key={exam.id} 
                      onClick={() => setSelectedExam(exam)}
                      className="hover:bg-slate-50/40 group cursor-pointer transition-colors duration-150"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center shrink-0">
                            {exam.courseCode.substring(0,3)}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{exam.title}</h4>
                            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Code: {exam.courseCode} • Weight: {exam.totalMarks} Marks</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-600">{exam.department}</td>
                      <td className="py-3.5 text-slate-600">
                        <div className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> {exam.date}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5 pl-4">Duration: {exam.duration}</div>
                      </td>
                      <td className="py-3.5 text-center font-bold text-slate-700">{exam.roomAllocation}</td>
                      <td className="py-3.5 text-center">
                        <span className={`font-bold px-2.5 py-0.5 rounded-full border text-[10px] ${
                          exam.evaluationStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          exam.evaluationStatus === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          {exam.evaluationStatus}
                        </span>
                      </td>
                      <td className="py-3.5 pr-5 text-right">
                        <span className="text-blue-600 font-bold group-hover:underline inline-flex items-center gap-0.5 text-xs">
                          Inspect Sheet <ChevronRight size={14} />
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredExams.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-400 font-medium">
                        No examination modules found matching input query parameters.
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
        // VIEW CONDITION 2: DEEP EXAMINATION METRICS & AUDIT LINK   
        // ========================================================= 
        <div className="max-w-5xl mx-auto flex flex-col gap-6 animate-fadeIn">
          
          {/* Upper Navigation Action Bar */}
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedExam(null)}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all"
            >
              <ArrowLeft size={14} /> Back to Exam Directory
            </button>
            <span className="text-[11px] bg-slate-100 text-slate-500 border border-slate-200 font-bold px-3 py-1.5 rounded-xl">
              System ID Matrix: {selectedExam.id}
            </span>
          </div>

          {/* Structural Detail Grid Panel */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-50 p-5 rounded-2xl border border-slate-100 gap-4">
              <div>
                <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-wider block">{selectedExam.courseCode} • {selectedExam.department}</span>
                <h3 className="text-base font-bold text-slate-800 mt-0.5">{selectedExam.title}</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Supervising Proctor / Examiner: <strong>{selectedExam.examiner}</strong></p>
              </div>

              <div className="flex items-center gap-4 text-center">
                <div className="bg-white px-3 py-2 border border-slate-100 rounded-xl shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Enrolled</span>
                  <h5 className="text-sm font-black text-slate-700">{selectedExam.enrolledStudents} Students</h5>
                </div>
                <div className="bg-white px-3 py-2 border border-slate-100 rounded-xl shadow-2xs">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Passing Floor</span>
                  <h5 className="text-sm font-black text-rose-600">{selectedExam.passingMarks} / {selectedExam.totalMarks}</h5>
                </div>
              </div>
            </div>

            {/* Assessment State Controls */}
            <div className="border border-dashed border-slate-200 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-1.5"><Award size={15} className="text-purple-600" /> Grading Control Panel</h4>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Transition grading parameters across systemic ledger thresholds directly.</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleUpdateEvaluationStatus(selectedExam.id, 'In Progress')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all border ${selectedExam.evaluationStatus === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-white hover:bg-slate-50 text-slate-600 border-slate-200'}`}
                >
                  Initiate Active Grading
                </button>
                <button 
                  onClick={() => handleUpdateEvaluationStatus(selectedExam.id, 'Completed')}
                  className={`px-3 py-2 text-xs font-bold rounded-xl transition-all border ${selectedExam.evaluationStatus === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'}`}
                >
                  Finalize & Publish Grades
                </button>
              </div>
            </div>

            {/* Timetable Configuration Data Map */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <Calendar size={16} className="text-slate-400" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Scheduled Window</span>
                  {selectedExam.date}
                </div>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <Clock size={16} className="text-slate-400" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Assigned Length</span>
                  {selectedExam.duration}
                </div>
              </div>
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <BookOpen size={16} className="text-slate-400" />
                <div>
                  <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-bold">Assigned Location</span>
                  {selectedExam.roomAllocation}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* GLOBAL MODAL: PROVISION NEW EXAMINATION EVENT MODULE       */}
      {/* ========================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">Schedule Academic Assessment</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors"><X size={18} /></button>
            </div>
            
            <form onSubmit={handleScheduleExam} className="p-5 flex flex-col gap-4 text-xs">
              <div>
                <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Assessment Sheet Title</label>
                <input required type="text" placeholder="e.g., Advanced Database Management Systems" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none transition-all" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Course Mapping Code</label>
                  <input required type="text" placeholder="e.g., CSE-301" value={newCourseCode} onChange={(e) => setNewCourseCode(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-bold uppercase tracking-wider outline-none transition-all" />
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Academic Department</label>
                  <select value={newDept} onChange={(e) => setNewDept(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl outline-none cursor-pointer">
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Communication">Electronics & Comm.</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Execution Calendar Date</label>
                  <input required type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none text-slate-500" />
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Duration Index</label>
                  <input type="text" placeholder="e.g., 3 Hours" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Max Marks Weight</label>
                  <input type="number" value={newTotalMarks} onChange={(e) => setNewTotalMarks(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-bold outline-none" />
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Minimum Pass Bound</label>
                  <input type="number" value={newPassingMarks} onChange={(e) => setNewPassingMarks(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-bold outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Lead Examiner / Proctor</label>
                  <input required type="text" placeholder="e.g., Dr. Alok Joshi" value={newExaminer} onChange={(e) => setNewExaminer(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none" />
                </div>
                <div>
                  <label className="block uppercase font-bold text-slate-400 tracking-wider mb-1.5">Room Allocation Bound</label>
                  <input type="text" placeholder="e.g., Block C - Hall 2" value={newRoom} onChange={(e) => setNewRoom(e.target.value)} className="w-full p-2.5 bg-white border border-slate-200 focus:border-blue-500 rounded-xl font-medium outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-all mt-2">Commit Examination Schedule to Ledger</button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}