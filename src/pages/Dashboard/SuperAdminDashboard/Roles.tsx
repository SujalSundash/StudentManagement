import React from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  UserCog,
  Crown,
  Shield,
  Search,
  Plus,
  MoreVertical,
} from "lucide-react";

const Roles = () => {
  const stats = [
    { title: "Roles", value: "5" },
    { title: "Users", value: "1,251" },
    { title: "Groups", value: "18" },
    { title: "Status", value: "Secure" },
  ];

  const roles = [
    {
      name: "Student",
      users: 980,
      permissions: "Basic Access",
      icon: GraduationCap,
      color: "bg-blue-50 text-blue-600",
      description: "Access courses, assignments and exams",
    },
    {
      name: "Teacher",
      users: 148,
      permissions: "Academic Access",
      icon: BookOpen,
      color: "bg-green-50 text-green-600",
      description: "Manage classes, attendance and grades",
    },
    {
      name: "Parent",
      users: 96,
      permissions: "Monitoring Access",
      icon: Users,
      color: "bg-pink-50 text-pink-600",
      description: "Track child performance and attendance",
    },
    {
      name: "Admin",
      users: 24,
      permissions: "Management Access",
      icon: UserCog,
      color: "bg-amber-50 text-amber-600",
      description: "Manage users, settings and operations",
    },
    {
      name: "Super Admin",
      users: 3,
      permissions: "Full Access",
      icon: Crown,
      color: "bg-violet-50 text-violet-600",
      description: "Complete platform control",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-5">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Roles & Permissions
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage user roles and access permissions across the platform.
              </p>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition">
              <Plus size={16} />
              Add Role
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
            >
              <p className="text-xs text-slate-500">{item.title}</p>
              <h3 className="text-xl font-semibold text-slate-800 mt-1">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search roles..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Roles */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <h2 className="font-semibold text-slate-800">
              Available Roles
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <div
                  key={role.name}
                  className="p-4 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${role.color}`}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h3 className="font-medium text-slate-800">
                          {role.name}
                        </h3>

                        <p className="text-xs text-slate-500 mt-0.5">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    {/* Center */}
                    <div className="hidden md:flex items-center gap-10 text-sm">
                      <div>
                        <p className="text-slate-400 text-xs">Users</p>
                        <p className="font-medium text-slate-700">
                          {role.users}
                        </p>
                      </div>

                      <div>
                        <p className="text-slate-400 text-xs">
                          Permissions
                        </p>
                        <p className="font-medium text-slate-700">
                          {role.permissions}
                        </p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Manage
                      </button>

                      <button className="p-2 rounded-lg hover:bg-slate-100">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Permission Overview */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-indigo-600" />
            <h2 className="font-semibold text-slate-800">
              Permission Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">User Management</p>
              <p className="font-medium text-slate-800 mt-1">Enabled</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Course Access</p>
              <p className="font-medium text-slate-800 mt-1">Enabled</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">Reports</p>
              <p className="font-medium text-slate-800 mt-1">Restricted</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-3">
              <p className="text-xs text-slate-500">System Settings</p>
              <p className="font-medium text-slate-800 mt-1">Admin Only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;