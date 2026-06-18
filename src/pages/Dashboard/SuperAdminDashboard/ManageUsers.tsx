import React, { useState } from "react";
import {
  Trash2, Edit, Search, Filter, UserPlus,
  Download, ChevronDown, Shield, BookOpen, Users, GraduationCap, User,
} from "lucide-react";

type Role = "Student" | "Teacher" | "Admin" | "Parent" | "SuperAdmin";
type Status = "Active" | "Inactive";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: Status;
  joined: string;
};

const users: User[] = [
  { id: 1, name: "Aarav Sharma",   email: "aarav@edusphere.com",   role: "Student",    status: "Active",   joined: "Jan 12, 2024" },
  { id: 2, name: "Priya Thapa",    email: "priya@edusphere.com",   role: "Teacher",    status: "Active",   joined: "Mar 4, 2024"  },
  { id: 3, name: "Rohan Karki",    email: "rohan@edusphere.com",   role: "Admin",      status: "Active",   joined: "Feb 19, 2024" },
  { id: 4, name: "Sita Rai",       email: "sita@edusphere.com",    role: "Parent",     status: "Inactive", joined: "Apr 2, 2024"  },
  { id: 5, name: "Bibek Gurung",   email: "bibek@edusphere.com",   role: "Student",    status: "Active",   joined: "May 7, 2024"  },
  { id: 6, name: "Anita Magar",    email: "anita@edusphere.com",   role: "Teacher",    status: "Inactive", joined: "Jun 1, 2024"  },
  { id: 7, name: "Dev Shrestha",   email: "dev@edusphere.com",     role: "SuperAdmin", status: "Active",   joined: "Jan 1, 2024"  },
];

const roleStyle: Record<Role, { bg: string; text: string; icon: React.ReactNode }> = {
  Student:    { bg: "bg-blue-50",   text: "text-blue-700",   icon: <GraduationCap size={11} /> },
  Teacher:    { bg: "bg-violet-50", text: "text-violet-700", icon: <BookOpen size={11} />      },
  Admin:      { bg: "bg-amber-50",  text: "text-amber-700",  icon: <Shield size={11} />        },
  Parent:     { bg: "bg-teal-50",   text: "text-teal-700",   icon: <Users size={11} />         },
  SuperAdmin: { bg: "bg-red-50",    text: "text-red-700",    icon: <User size={11} />          },
};

const ManageUsers: React.FC = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [data, setData] = useState<User[]>(users);

  const filtered = data.filter((u) =>
    (u.name.toLowerCase().includes(search.toLowerCase()) ||
     u.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === "All" || u.role === roleFilter) &&
    (statusFilter === "All" || u.status === statusFilter)
  );

  const handleDelete = (id: number) => setData((prev) => prev.filter((u) => u.id !== id));

  const toggleStatus = (id: number) =>
    setData((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u
      )
    );

  const stats = [
    { label: "Total users",   value: data.length,                                  color: "text-gray-800"   },
    { label: "Active",        value: data.filter((u) => u.status === "Active").length,   color: "text-green-700"  },
    { label: "Inactive",      value: data.filter((u) => u.status === "Inactive").length, color: "text-red-600"    },
    { label: "Teachers",      value: data.filter((u) => u.role === "Teacher").length,    color: "text-violet-700" },
  ];

  const selectClass = "bg-transparent outline-none text-xs text-gray-500 cursor-pointer";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Manage users</h1>
            <p className="text-xs text-gray-400 mt-0.5">SuperAdmin · Full access to all user accounts</p>
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors">
            <UserPlus size={13} /> Add user
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-4 py-3">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-white border border-gray-200 rounded-lg px-3 h-9">
            <Search size={13} className="text-gray-300 shrink-0" />
            <input
              type="text" placeholder="Search name or email..."
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-xs text-gray-700 placeholder-gray-300 w-full"
            />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-9">
            <Filter size={12} className="text-gray-300" />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className={selectClass}>
              {["All", "Student", "Teacher", "Admin", "Parent", "SuperAdmin"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <ChevronDown size={11} className="text-gray-300" />
          </div>
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 h-9">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
              <option value="All">All status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDown size={11} className="text-gray-300" />
          </div>
          <button className="flex items-center gap-2 px-3 h-9 bg-white border border-gray-200 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors">
            <Download size={12} /> Export
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <table className="w-full text-left table-fixed">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider w-[28%]">User</th>
                <th className="px-4 py-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider w-[18%]">Role</th>
                <th className="px-4 py-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider w-[15%]">Status</th>
                <th className="px-4 py-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider w-[18%]">Joined</th>
                <th className="px-4 py-3 text-[11px] font-medium text-gray-400 uppercase tracking-wider w-[21%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-sm text-gray-400">No users found.</td>
                </tr>
              ) : (
                filtered.map((u, i) => {
                  const r = roleStyle[u.role];
                  return (
                    <tr key={u.id} className={`hover:bg-gray-50 transition-colors ${i !== filtered.length - 1 ? "border-b border-gray-100" : ""}`}>
                      {/* USER */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-semibold shrink-0">
                            {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{u.name}</p>
                            <p className="text-xs text-gray-400 truncate">{u.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* ROLE */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium ${r.bg} ${r.text}`}>
                          {r.icon} {u.role}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium ${u.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-green-500" : "bg-red-400"}`} />
                          {u.status}
                        </span>
                      </td>

                      {/* JOINED */}
                      <td className="px-4 py-3 text-xs text-gray-400">{u.joined}</td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => toggleStatus(u.id)}
                            className="text-[11px] px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
                          >
                            {u.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                          <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                            <Edit size={13} />
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-400 mt-3">
          Showing {filtered.length} of {data.length} users
        </p>
      </div>
    </div>
  );
};

export default ManageUsers;