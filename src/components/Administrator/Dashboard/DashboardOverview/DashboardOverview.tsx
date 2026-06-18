import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AlertTriangle, UserPlus, Calendar, DollarSign } from "lucide-react";
import DashboardStats from "../DashboardStats/DashboardStats";
import DashboardDetailsRow from "../DashboardDetailsRow/DashboardDetailsRow";

// --- Types & Interfaces ---
interface GrowthDataPoint {
  name: string;
  students: number;
}

interface AttendanceDataPoint {
  name: string;
  value: number;
  color: string;
}

// --- Mock Data ---
const growthData: GrowthDataPoint[] = [
  { name: "Jan", students: 400 },
  { name: "Feb", students: 800 },
  { name: "Mar", students: 950 },
  { name: "Apr", students: 1200 },
  { name: "May", students: 1400 },
  { name: "Jun", students: 1750 },
  { name: "Jul", students: 2000 },
  { name: "Aug", students: 2200 },
  { name: "Sep", students: 2250 },
  { name: "Oct", students: 2350 },
  { name: "Nov", students: 2450 },
  { name: "Dec", students: 2450 },
];

const attendanceData: AttendanceDataPoint[] = [
  { name: "Present", value: 89, color: "#22c55e" },
  { name: "Absent", value: 8, color: "#ef4444" },
  { name: "Leave", value: 3, color: "#f59e0b" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-blue-600 text-white px-3 py-1.5 rounded-lg shadow-lg text-xs relative font-semibold">
        <div className="text-[14px] font-bold">
          {payload[0].value?.toLocaleString()}
        </div>
        <div className="text-[10px] opacity-80 font-normal">Total Students</div>
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45"></div>
      </div>
    );
  }
  return null;
};

export default function DashboardOverview() {
  return (
    // REMOVED min-h-screen from here so elements sit naturally right above each other
    <div className="w-full bg-slate-50 px-1 py-4 font-sans text-slate-800 flex flex-col gap-2">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* 1. Student Growth Card */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between h-80">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-slate-700 text-base">
              Student Growth{" "}
              <span className="text-slate-400 font-normal text-sm">(This Year)</span>
            </h3>
            <select className="text-sm bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-3 py-1.5 outline-none font-medium cursor-pointer">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>

          <div className="h-56 w-full -ml-4 pr-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={growthData}
                margin={{ top: 25, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                  domain={[0, 3000]}
                  tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
                />
                {/* Changed tooltip boundary coordinate settings to stay within Recharts context dynamically */}
                <Tooltip
                  content={<CustomTooltip />}
                  defaultIndex={10}
                  position={{ x: 345, y: 35 }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorStudents)"
                  dot={{
                    r: 4,
                    stroke: "#3b82f6",
                    strokeWidth: 2,
                    fill: "#fff",
                  }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Attendance Overview Card */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-80">
          <h3 className="font-bold text-slate-700 text-base mb-2">
            Attendance Overview
          </h3>

          <div className="flex items-center justify-between my-auto gap-4">
            <div className="relative w-40 h-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">89%</span>
                <span className="text-xs text-slate-400 font-medium">Present</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pr-2 flex-1">
              {attendanceData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-500 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-700">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Important Notifications Card */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col h-80">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-700 text-base">
              Notifications
            </h3>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-xs tracking-wide">
              View All
            </button>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
            {/* Notification Row 1 */}
            <div className="flex items-start gap-2.5 pb-2 border-b border-slate-50">
              <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg mt-0.5 shrink-0">
                <AlertTriangle size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">15 students have attendance below 75%</h4>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-1">10m ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Please take necessary action.</p>
              </div>
            </div>

            {/* Notification Row 2 */}
            <div className="flex items-start gap-2.5 pb-2 border-b border-slate-50">
              <div className="p-1.5 bg-blue-50 text-blue-500 rounded-lg mt-0.5 shrink-0">
                <UserPlus size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">New admission applications</h4>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-1">30m ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">8 applications pending review.</p>
              </div>
            </div>

            {/* Notification Row 3 */}
            <div className="flex items-start gap-2.5 pb-2 border-b border-slate-50">
              <div className="p-1.5 bg-purple-50 text-purple-500 rounded-lg mt-0.5 shrink-0">
                <Calendar size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">Mid-term exams in 5 days</h4>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-1">1h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Please check exam schedule.</p>
              </div>
            </div>

            {/* Notification Row 4 */}
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-emerald-50 text-emerald-500 rounded-lg mt-0.5 shrink-0">
                <DollarSign size={15} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-bold text-slate-800 truncate">145 fee payments pending</h4>
                  <span className="text-[9px] text-slate-400 whitespace-nowrap ml-1">2h ago</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">Total pending: $28,750</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Render secondary section seamlessly directly below with equal grid tracking gap */}
      <div className="max-w-7xl mx-auto w-full -mt-6">
         <DashboardStats />
         <DashboardDetailsRow/>
      </div>
    </div>
  );
}