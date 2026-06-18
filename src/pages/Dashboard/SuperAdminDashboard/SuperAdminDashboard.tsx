import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  RefreshCw,
  Search,
  ChevronDown,
  CheckCircle2,
  ArrowUpDown,
  Check,
  X,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ---------------------------
   DATA
---------------------------- */

const stats = [
  { label: "Total Users", value: "1,248", change: "+12%", up: true },
  { label: "Total Schools", value: "86", change: "+4", up: true },
  { label: "Admins", value: "24", change: "+2", up: true },
  { label: "Active Sessions", value: "312", change: "+8%", up: true },
  { label: "Monthly Revenue", value: "Rs 4.2L", change: "+6%", up: true },
  { label: "System Uptime", value: "99.9%", change: "Stable", up: null },
];

const userGrowth = [
  { month: "Jan", students: 320, teachers: 40, parents: 80 },
  { month: "Feb", students: 380, teachers: 45, parents: 95 },
  { month: "Mar", students: 450, teachers: 52, parents: 110 },
  { month: "Apr", students: 520, teachers: 58, parents: 130 },
  { month: "May", students: 610, teachers: 63, parents: 155 },
  { month: "Jun", students: 700, teachers: 70, parents: 178 },
];

const sessionData = [
  { day: "Mon", sessions: 210 },
  { day: "Tue", sessions: 280 },
  { day: "Wed", sessions: 260 },
  { day: "Thu", sessions: 312 },
  { day: "Fri", sessions: 295 },
  { day: "Sat", sessions: 140 },
  { day: "Sun", sessions: 90 },
];
const peakSession = Math.max(...sessionData.map((d) => d.sessions));

const roleData = [
  { name: "Students", value: 980, color: "#0f172a" },
  { name: "Teachers", value: 148, color: "#0f766e" },
  { name: "Parents", value: 96, color: "#64748b" },
  { name: "Admins", value: 24, color: "#d97706" },
];
const roleTotal = roleData.reduce((a, b) => a + b.value, 0);

const schools = [
  { name: "Greenwood International School", plan: "Enterprise", students: 1240, status: "Active" },
  { name: "Riverside Academy", plan: "Pro", students: 860, status: "Active" },
  { name: "Sunrise Public School", plan: "Basic", students: 320, status: "Trial" },
  { name: "Mount Valley School", plan: "Pro", students: 540, status: "Active" },
  { name: "Bright Future Academy", plan: "Basic", students: 210, status: "Suspended" },
  { name: "Everest International", plan: "Enterprise", students: 1580, status: "Active" },
  { name: "Lotus Children's School", plan: "Basic", students: 180, status: "Trial" },
  { name: "Highland Academy", plan: "Pro", students: 690, status: "Active" },
];

const recentActivity = [
  { user: "Rohan Thapa", role: "Admins", action: "Deleted user account", time: "09:42", type: "danger" },
  { user: "Aarav Sharma", role: "Admins", action: "Updated system settings", time: "09:26", type: "warning" },
  { user: "Priya Rai", role: "Admins", action: "Created new teacher account", time: "08:44", type: "success" },
  { user: "Dev Karki", role: "Teachers", action: "Login from new device", time: "07:38", type: "warning" },
  { user: "Sita Magar", role: "Admins", action: "Exported audit logs", time: "06:51", type: "success" },
  { user: "Bibek Gurung", role: "Teachers", action: "3 failed login attempts", time: "06:20", type: "danger" },
  { user: "Suresh Lama", role: "Parents", action: "Updated profile photo", time: "05:30", type: "success" },
  { user: "Kiran Bista", role: "Students", action: "Attempted unauthorized access", time: "04:10", type: "danger" },
];

const systemStatus = [
  "API Gateway", "Database Cluster", "CDN", "Authentication Service", "Email Queue",
];

const severityDot: Record<string, string> = {
  danger: "bg-red-500", warning: "bg-amber-500", success: "bg-emerald-500",
};
const severityPill: Record<string, string> = {
  all: "bg-slate-900 text-white border-slate-900",
  danger: "bg-red-50 text-red-700 border-red-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
};
const statusPill: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Trial: "bg-amber-50 text-amber-700",
  Suspended: "bg-red-50 text-red-700",
};

/* ---------------------------
   SMALL REUSABLE PIECES
---------------------------- */

const Card = ({ children, className = "" }: any) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm p-5 ${className}`}>{children}</div>
);

const Section = ({ title, subtitle, action, children, className = "" }: any) => (
  <Card className={className}>
    <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
      <div>
        <h2 className="font-semibold text-slate-900">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </Card>
);

const SearchBox = ({ value, onChange, placeholder }: any) => (
  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-full sm:w-64">
    <Search size={14} className="text-slate-400 shrink-0" />
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-transparent outline-none ml-2 w-full text-sm text-slate-700 placeholder:text-slate-400"
    />
    {value && (
      <button onClick={() => onChange("")} className="text-slate-400 hover:text-slate-600">
        <X size={13} />
      </button>
    )}
  </div>
);

const Tip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs shadow-md">
      <p className="text-slate-500 font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: <b>{p.value}</b></p>
      ))}
    </div>
  );
};

/* ---------------------------
   MAIN COMPONENT
---------------------------- */

const SuperAdminDashboard = () => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [lastSync, setLastSync] = useState("09:48 AM");
  const [refreshing, setRefreshing] = useState(false);

  const [roleFilter, setRoleFilter] = useState<string | null>(null);
  const [auditSearch, setAuditSearch] = useState("");
  const [severity, setSeverity] = useState("all");

  const [schoolSearch, setSchoolSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "students">("students");
  const [sortDesc, setSortDesc] = useState(true);

  const [pending, setPending] = useState([
    { id: 1, name: "Cedar Heights School", type: "New school signup" },
    { id: 2, name: "Maya Gurung", type: "Teacher verification" },
    { id: 3, name: "Horizon Academy", type: "Plan upgrade request" },
  ]);
  const [resolved, setResolved] = useState<Record<number, "approved" | "rejected">>({});

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setRefreshing(false);
    }, 600);
  };

  const filteredActivity = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    return recentActivity.filter((a) =>
      (severity === "all" || a.type === severity) &&
      (!roleFilter || a.role === roleFilter) &&
      (q === "" || a.user.toLowerCase().includes(q) || a.action.toLowerCase().includes(q))
    );
  }, [auditSearch, severity, roleFilter]);

  const filteredSchools = useMemo(() => {
    const q = schoolSearch.trim().toLowerCase();
    const list = schools.filter((s) => s.name.toLowerCase().includes(q));
    return [...list].sort((a, b) => {
      const dir = sortDesc ? -1 : 1;
      if (sortBy === "name") return a.name.localeCompare(b.name) * dir * -1;
      return (a.students - b.students) * dir;
    });
  }, [schoolSearch, sortBy, sortDesc]);

  const toggleSort = (key: "name" | "students") => {
    if (sortBy === key) setSortDesc((d) => !d);
    else { setSortBy(key); setSortDesc(true); }
  };

  const resolveApproval = (id: number, decision: "approved" | "rejected") => {
    setResolved((r) => ({ ...r, [id]: decision }));
    setTimeout(() => setPending((p) => p.filter((item) => item.id !== id)), 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400">
              <Shield size={14} /> EduSphere Admin
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mt-2">Super Admin Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">System overview & analytics</p>
          </div>

          <div className="mt-4 md:mt-0 text-right">
            <button
              onClick={() => setStatusOpen((v) => !v)}
              className="inline-flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
            >
              ● All systems operational
              <ChevronDown size={12} className={statusOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            <div className="flex items-center justify-end gap-2 mt-1">
              <p className="text-xs text-slate-400 font-mono">Last sync: {lastSync}</p>
              <button onClick={refresh} disabled={refreshing} className="text-slate-400 hover:text-slate-700 disabled:opacity-50">
                <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>

        {statusOpen && (
          <Card>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {systemStatus.map((s) => (
                <div key={s} className="flex items-center gap-2 text-xs bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span className="font-medium text-slate-700">{s}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* STATS */}
        <Card className="!p-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {stats.map((s, i) => (
              <div key={i} className="p-4 border-r border-b border-slate-100 last:border-r-0">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">{s.label}</p>
                <p className="text-2xl font-semibold text-slate-900 mt-1">{s.value}</p>
                <div className="flex items-center gap-1 mt-1 text-xs">
                  {s.up === true && <TrendingUp size={12} className="text-emerald-600" />}
                  {s.up === false && <TrendingDown size={12} className="text-red-500" />}
                  <span className="text-slate-500">{s.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CHARTS */}
        <div className="grid md:grid-cols-3 gap-6">
          <Section title="User Growth" subtitle="Monthly platform expansion" className="md:col-span-2">
            <ResponsiveContainer width="100%" height={230}>
              <AreaChart data={userGrowth}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<Tip />} />
                <Area type="monotone" dataKey="students" name="Students" stroke="#0f172a" fill="#0f172a10" />
                <Area type="monotone" dataKey="teachers" name="Teachers" stroke="#0f766e" fill="#0f766e10" />
                <Area type="monotone" dataKey="parents" name="Parents" stroke="#64748b" fill="#64748b10" />
              </AreaChart>
            </ResponsiveContainer>
          </Section>

          <Section title="Weekly Sessions" subtitle="Active usage trends">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={sessionData}>
                <CartesianGrid stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="sessions" name="Sessions">
                  {sessionData.map((d, i) => (
                    <Cell key={i} fill={d.sessions === peakSession ? "#d97706" : "#0f172a"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Section>
        </div>

        {/* ROLE DISTRIBUTION + PENDING APPROVALS */}
        <div className="grid md:grid-cols-3 gap-6">
          <Section title="Role Distribution" subtitle={`${roleTotal} total users`}>
            <div className="space-y-3">
              {roleData.map((r) => {
                const pct = Math.round((r.value / roleTotal) * 100);
                const active = roleFilter === r.name;
                return (
                  <button
                    key={r.name}
                    onClick={() => setRoleFilter(active ? null : r.name)}
                    className={`w-full text-left rounded-lg px-2 py-1.5 ${active ? "bg-slate-50 ring-1 ring-slate-300" : "hover:bg-slate-50"}`}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">{r.name}</span>
                      <span className="font-mono text-slate-800">{r.value}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: r.color }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Pending Approvals" subtitle="Items waiting on your review" className="md:col-span-2">
            {pending.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">All caught up — nothing pending.</p>
            ) : (
              <div className="space-y-3">
                {pending.map((p) => (
                  <div key={p.id} className="flex items-center justify-between border border-slate-100 rounded-lg px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-500">{p.type}</p>
                    </div>
                    {resolved[p.id] ? (
                      <span className={`text-xs font-medium ${resolved[p.id] === "approved" ? "text-emerald-600" : "text-red-500"}`}>
                        {resolved[p.id] === "approved" ? "Approved" : "Rejected"}
                      </span>
                    ) : (
                      <div className="flex gap-2">
                        <button onClick={() => resolveApproval(p.id, "rejected")} className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
                          <X size={14} />
                        </button>
                        <button onClick={() => resolveApproval(p.id, "approved")} className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                          <Check size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>
        </div>

        {/* SCHOOLS TABLE */}
        <Section
          title="Schools Overview"
          subtitle={`${filteredSchools.length} of ${schools.length} schools`}
          action={<SearchBox value={schoolSearch} onChange={setSchoolSearch} placeholder="Search schools..." />}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-slate-400 border-b border-slate-100">
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("name")}>
                    <span className="inline-flex items-center gap-1">School <ArrowUpDown size={11} /></span>
                  </th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4 cursor-pointer" onClick={() => toggleSort("students")}>
                    <span className="inline-flex items-center gap-1">Students <ArrowUpDown size={11} /></span>
                  </th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((s) => (
                  <tr key={s.name} className="border-b border-slate-50 last:border-b-0">
                    <td className="py-2.5 pr-4 text-slate-800 font-medium">{s.name}</td>
                    <td className="py-2.5 pr-4 text-slate-500">{s.plan}</td>
                    <td className="py-2.5 pr-4 font-mono text-slate-700">{s.students.toLocaleString()}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusPill[s.status]}`}>{s.status}</span>
                    </td>
                  </tr>
                ))}
                {filteredSchools.length === 0 && (
                  <tr><td colSpan={4} className="py-6 text-center text-slate-400">No schools match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Section>

        {/* AUDIT TRAIL */}
        <Section
          title="Audit Trail"
          subtitle="Recent system activity"
          action={<SearchBox value={auditSearch} onChange={setAuditSearch} placeholder="Search by user or action..." />}
        >
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {["all", "danger", "warning", "success"].map((key) => (
              <button
                key={key}
                onClick={() => setSeverity(key)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                  severity === key ? severityPill[key] : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {key === "all" ? "All" : key === "danger" ? "Critical" : key === "warning" ? "Warning" : "Success"}
              </button>
            ))}
            {roleFilter && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                Role: {roleFilter}
                <button onClick={() => setRoleFilter(null)}><X size={11} /></button>
              </span>
            )}
          </div>

          {filteredActivity.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No activity matches your filters.</p>
          ) : (
            <div className="space-y-4">
              {filteredActivity.map((a, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-xs text-slate-400 w-12">{a.time}</span>
                  <span className={`w-2 h-2 mt-1.5 rounded-full ${severityDot[a.type]}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{a.action}</p>
                    <p className="text-xs text-slate-500">{a.user} · {a.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <p className="text-center text-xs text-slate-400 pt-2">EduSphere Admin · v2.4.1</p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;