import React from 'react';
import { 
  Building2, 
  Clock, 
  CalendarDays, 
  ArrowRight,
  UserPlus,
  FileEdit,
  CreditCard,
  PlusCircle,
  FileText
} from 'lucide-react';

// --- Interfaces ---
interface DepartmentProps {
  name: string;
  students: number;
  courses: number;
  gpa: number;
  attendance: number;
}

interface ActivityProps {
  time: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  user: string;
}

interface ExamProps {
  subject: string;
  date: string;
  time: string;
  daysLeft: number;
  badgeBg: string;
  badgeText: string;
}

// --- Sample Mock Data Based on Images ---
const departmentsData: DepartmentProps[] = [
  { name: 'Computer Science', students: 500, courses: 8, gpa: 3.7, attendance: 91 },
  { name: 'Business Administration', students: 420, courses: 6, gpa: 3.5, attendance: 89 },
  { name: 'Information Technology', students: 380, courses: 7, gpa: 3.6, attendance: 88 },
  { name: 'Electronic Engineering', students: 320, courses: 5, gpa: 3.4, attendance: 85 },
];

const activitiesData: ActivityProps[] = [
  { 
    time: '09:30 AM', 
    icon: <UserPlus size={14} />, 
    iconBg: 'bg-blue-50', 
    iconColor: 'text-blue-600', 
    title: 'Student "John Doe" has been added', 
    user: 'by Admin' 
  },
  { 
    time: '10:15 AM', 
    icon: <FileEdit size={14} />, 
    iconBg: 'bg-amber-50', 
    iconColor: 'text-amber-500', 
    title: 'Exam schedule for Mid-term updated', 
    user: 'by Exam Coordinator' 
  },
  { 
    time: '11:20 AM', 
    icon: <CreditCard size={14} />, 
    iconBg: 'bg-emerald-50', 
    iconColor: 'text-emerald-600', 
    title: 'Fee payment of $550 received', 
    user: 'by System' 
  },
  { 
    time: '01:45 PM', 
    icon: <PlusCircle size={14} />, 
    iconBg: 'bg-rose-50', 
    iconColor: 'text-rose-500', 
    title: 'New course "AI & ML" created', 
    user: 'by Admin' 
  },
];

const examsData: ExamProps[] = [
  { subject: 'Database Management System', date: '15 Jun, 2026', time: '10:00 AM', daysLeft: 5, badgeBg: 'bg-orange-50', badgeText: 'text-orange-500' },
  { subject: 'Data Structures', date: '18 Jun, 2026', time: '01:00 PM', daysLeft: 8, badgeBg: 'bg-emerald-50', badgeText: 'text-emerald-600' },
  { subject: 'Operating Systems', date: '22 Jun, 2026', time: '10:00 AM', daysLeft: 12, badgeBg: 'bg-cyan-50', badgeText: 'text-cyan-600' },
  { subject: 'Computer Networks', date: '25 Jun, 2026', time: '01:00 PM', daysLeft: 15, badgeBg: 'bg-rose-50', badgeText: 'text-rose-500' },
];

export default function DashboardDetailsRow() {
  
  // --- Handlers for Click Actions ---
  const handleViewAllDepartments = () => alert('Navigating to All Departments Overview...');
  const handleViewAllActivities = () => alert('Navigating to System Audit Logs...');
  const handleViewAllExams = () => alert('Navigating to Central Exam Schedules...');
  
  const handleDepartmentClick = (deptName: string) => {
    alert(`Opening micro analytics profile for: ${deptName}`);
  };

  const handleExamClick = (subject: string) => {
    alert(`Opening managing module for exam paper: ${subject}`);
  };

  return (
    <div className="w-full bg-slate-50 px-1 pb-4 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* 1. Department Performance Section */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-85">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="text-blue-600" size={18} />
              <h3 className="font-bold text-slate-700 text-base">Department Performance</h3>
            </div>
            
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                    <th className="pb-3 font-medium">Department</th>
                    <th className="pb-3 font-medium text-center">Students</th>
                    <th className="pb-3 font-medium text-center">Courses</th>
                    <th className="pb-3 font-medium text-center">Avg. GPA</th>
                    <th className="pb-3 font-medium text-right">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {departmentsData.map((dept, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => handleDepartmentClick(dept.name)}
                      className="group cursor-pointer hover:bg-slate-50/80 transition-colors duration-150"
                    >
                      <td className="py-3 text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors max-w-32.5 truncate">
                        {dept.name}
                      </td>
                      <td className="py-3 text-xs font-medium text-slate-500 text-center">{dept.students}</td>
                      <td className="py-3 text-xs font-medium text-slate-500 text-center">{dept.courses}</td>
                      <td className="py-3 text-xs font-bold text-slate-700 text-center">{dept.gpa}</td>
                      <td className="py-3 text-right">
                        <div className="inline-flex items-center gap-2">
                          <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className="bg-emerald-500 h-full rounded-full" 
                              style={{ width: `${dept.attendance}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{dept.attendance}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button 
            onClick={handleViewAllDepartments}
            className="text-blue-600 hover:text-blue-700 font-bold text-xs tracking-wide flex items-center gap-1.5 mt-4 group self-start transition-all"
          >
            View All Departments 
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 2. Recent Activities Timeline Section */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-85">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-600" size={18} />
                <h3 className="font-bold text-slate-700 text-base">Recent Activities</h3>
              </div>
              <button 
                onClick={handleViewAllActivities}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xs tracking-wide transition-colors"
              >
                View All
              </button>
            </div>

            {/* Vertical Flow Timeline */}
            <div className="relative pl-4 border-l-2 border-slate-100 ml-2.5 flex flex-col gap-4 py-1">
              {activitiesData.map((activity, idx) => (
                <div key={idx} className="relative flex items-start gap-3 group">
                  {/* Timeline Node Point Ring */}
                  <div className="absolute left-[-23.5px] top-1 bg-white p-0.5 rounded-full z-10">
                    <div className={`w-3 h-3 rounded-full border-2 border-white match-color ${activity.iconColor.replace('text', 'bg')}`} />
                  </div>

                  {/* Activity Log Context Box */}
                  <div className={`p-1.5 rounded-lg shrink-0 ${activity.iconBg} ${activity.iconColor}`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                      <span className="text-[11px] font-bold text-slate-400 order-2 sm:order-1 tracking-tight">{activity.time}</span>
                      <span className="text-[10px] font-semibold text-slate-400 order-1 sm:order-2 bg-slate-50 px-1.5 py-0.5 rounded">{activity.user}</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mt-0.5 truncate group-hover:text-blue-600 transition-colors cursor-default">
                      {activity.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Upcoming Exams Notification Cards */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-85">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="text-blue-600" size={18} />
                <h3 className="font-bold text-slate-700 text-base">Upcoming Exams</h3>
              </div>
              <button 
                onClick={handleViewAllExams}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xs tracking-wide transition-colors"
              >
                View All
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {examsData.map((exam, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleExamClick(exam.subject)}
                  className="flex items-center justify-between p-2.5 border border-slate-100 rounded-xl bg-white hover:bg-slate-50/50 hover:border-slate-200 cursor-pointer group transition-all duration-150"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="p-2 bg-slate-50 text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 rounded-xl transition-all duration-150 shrink-0">
                      <FileText size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                        {exam.subject}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                        {exam.date} • {exam.time}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg shrink-0 ml-2 tracking-wide whitespace-nowrap ${exam.badgeBg} ${exam.badgeText}`}>
                    {exam.daysLeft} Days Left
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}