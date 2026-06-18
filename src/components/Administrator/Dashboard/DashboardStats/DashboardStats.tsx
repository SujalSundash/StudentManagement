import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  UserPlus, 
  FileText, 
  ClipboardList, 
  CheckSquare, 
  Users, 
  UserX, 
  Briefcase, 
  Building2,
  PlusCircle,
  GraduationCap,
  BookOpen,
  CalendarDays,
  FileBarChart2,
  Megaphone
} from 'lucide-react';

// --- Interfaces ---
interface StatRowProps {
  icon: React.ReactNode;
  bgIconColor: string;
  label: string;
  value: number;
}

interface ActionCardProps {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  onClick?: () => void;
}

// --- Subcomponents for Cleanliness ---
const StatRow = ({ icon, bgIconColor, label, value }: StatRowProps) => (
  <div className="flex items-center justify-between py-2 text-sm">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-xl ${bgIconColor}`}>
        {icon}
      </div>
      <span className="text-slate-500 font-medium">{label}</span>
    </div>
    <span className="font-bold text-slate-800 text-base">{value}</span>
  </div>
);

const QuickActionCard = ({ icon, iconColor, label, onClick }: ActionCardProps) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 border border-slate-100 rounded-xl bg-white hover:bg-slate-50 hover:shadow-sm transition-all duration-200 group text-center w-full"
  >
    <div className={`p-2.5 rounded-xl ${iconColor} mb-2 group-hover:scale-105 transition-transform duration-200`}>
      {icon}
    </div>
    <span className="text-xs font-bold text-slate-700 tracking-wide">{label}</span>
  </button>
);

export default function DashboardStats() {
  // Semi-donut progress data
  const feeProgressData = [
    { name: 'Collected', value: 72, color: '#2563eb' }, // blue-600
    { name: 'Remaining', value: 28, color: '#eff6ff' }, // blue-50
  ];

  return (
    <div className="w-full bg-slate-50 px-1 py-5 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* 1. Admissions Overview */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <ClipboardList className="text-blue-600" size={18} />
            <h3 className="font-bold text-slate-700 text-base">Admissions Overview</h3>
          </div>
          <div className="flex flex-col gap-2 my-auto">
            <StatRow 
              icon={<UserPlus size={16} className="text-blue-500" />} 
              bgIconColor="bg-blue-50" 
              label="New Admissions Today" 
              value={15} 
            />
            <StatRow 
              icon={<FileText size={16} className="text-emerald-500" />} 
              bgIconColor="bg-emerald-50" 
              label="Pending Applications" 
              value={8} 
            />
            <StatRow 
              icon={<CheckSquare size={16} className="text-orange-500" />} 
              bgIconColor="bg-orange-50" 
              label="Total Applications" 
              value={320} 
            />
            <StatRow 
              icon={<Users size={16} className="text-purple-500" />} 
              bgIconColor="bg-purple-50" 
              label="This Month Admissions" 
              value={78} 
            />
          </div>
        </div>

        {/* 2. Teacher Overview */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-purple-600" size={18} />
            <h3 className="font-bold text-slate-700 text-base">Teacher Overview</h3>
          </div>
          <div className="flex flex-col gap-2 my-auto">
            <StatRow 
              icon={<Users size={16} className="text-purple-500" />} 
              bgIconColor="bg-purple-50" 
              label="Active Teachers" 
              value={125} 
            />
            <StatRow 
              icon={<UserX size={16} className="text-orange-500" />} 
              bgIconColor="bg-orange-50" 
              label="Leave Requests" 
              value={4} 
            />
            <StatRow 
              icon={<Briefcase size={16} className="text-emerald-500" />} 
              bgIconColor="bg-emerald-50" 
              label="New Hires This Month" 
              value={3} 
            />
            <StatRow 
              icon={<Building2 size={16} className="text-indigo-500" />} 
              bgIconColor="bg-indigo-50" 
              label="Departments" 
              value={12} 
            />
          </div>
        </div>

        {/* 3. Fee Collection */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <PlusCircle className="text-emerald-500" size={18} />
            <h3 className="font-bold text-slate-700 text-base">
              Fee Collection <span className="text-slate-400 font-normal text-sm">(This Month)</span>
            </h3>
          </div>
          
          <div className="flex items-center justify-between gap-2 my-auto">
            {/* Gauge Style Ring */}
            <div className="relative w-32 h-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={feeProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={54}
                    startAngle={220}
                    endAngle={-40}
                    paddingAngle={0}
                    dataKey="value"
                    cornerRadius={10}
                  >
                    {feeProgressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center -mt-1">
                <span className="text-2xl font-bold text-slate-800">72%</span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Collected</span>
              </div>
            </div>

            {/* Figures Grid */}
            <div className="flex flex-col gap-2.5 flex-1 pl-2">
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Collected Amount</div>
                <div className="text-base font-bold text-slate-800">$89,650</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Total Amount</div>
                <div className="text-base font-bold text-slate-700">$125,000</div>
              </div>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Pending Amount</div>
                <div className="text-base font-bold text-red-500">$35,350</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Quick Actions */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-slate-700 text-base mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-3 gap-3 my-auto">
            <QuickActionCard 
              icon={<GraduationCap size={20} />} 
              iconColor="bg-blue-50 text-blue-600" 
              label="Add Student" 
            />
            <QuickActionCard 
              icon={<Users size={20} />} 
              iconColor="bg-emerald-50 text-emerald-600" 
              label="Add Teacher" 
            />
            <QuickActionCard 
              icon={<BookOpen size={20} />} 
              iconColor="bg-purple-50 text-purple-600" 
              label="Create Course" 
            />
            <QuickActionCard 
              icon={<CalendarDays size={20} />} 
              iconColor="bg-amber-50 text-amber-500" 
              label="Schedule Exam" 
            />
            <QuickActionCard 
              icon={<FileBarChart2 size={20} />} 
              iconColor="bg-cyan-50 text-cyan-600" 
              label="Generate Report" 
            />
            <QuickActionCard 
              icon={<Megaphone size={20} />} 
              iconColor="bg-rose-50 text-rose-500" 
              label="Send Notice" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}