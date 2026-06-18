import { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link, useLocation } from "react-router-dom";
=======
import { NavLink, useLocation } from "react-router-dom";
>>>>>>> Shriya
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaBook,
  FaBell,
  FaCog,
} from "react-icons/fa";

import hero from "../../../assets/hero.png";

const menuItems = [
  { name: "Dashboard", path: "/StudentDashboard", icon: <FaHome /> },
<<<<<<< HEAD
  { name: "Students", path: "/StudentInformation", icon: <FaUserGraduate /> },
  {
    name: "Attendance",
    path: "/StudentAttendance",
    icon: <FaClipboardCheck />,
  },
  { name: "Fees", path: "/StudentFees", icon: <FaMoneyBillWave /> },
  { name: "Exams", path: "/StudentExams", icon: <FaBook /> },
  { name: "Notices", path: "/StudentNotices", icon: <FaBell /> },
  { name: "Settings", path: "/StudentSetting", icon: <FaCog /> },
=======
  { name: "Students", path: "/students", icon: <FaUserGraduate /> },
  { name: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
  { name: "Fees", path: "/fees", icon: <FaMoneyBillWave /> },
  { name: "Exams", path: "/exams", icon: <FaBook /> },
  { name: "Notices", path: "/notices", icon: <FaBell /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
>>>>>>> Shriya
];

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
<<<<<<< HEAD
      {/* Mobile Header - Hidden from Medium Screens Upward */}
      <div className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-slate-200 shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src={hero} alt="Logo" className="w-8 h-8 object-contain" />
          <h1 className="font-bold text-lg text-slate-900">EduSmart</h1>
=======
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img
            src={hero}
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="font-bold text-lg text-slate-900">
            EduSmart
          </h1>
>>>>>>> Shriya
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
          className="text-xl text-slate-700 focus:outline-none p-1"
          aria-label="Toggle navigation menu"
=======
          className="text-xl text-slate-700"
>>>>>>> Shriya
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

<<<<<<< HEAD
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
=======
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
>>>>>>> Shriya
          onClick={() => setIsOpen(false)}
        />
      )}

<<<<<<< HEAD
      {/* Navigation Sidebar Drawer */}
=======
      {/* Sidebar */}
>>>>>>> Shriya
      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-white border-r border-slate-200
          flex flex-col
<<<<<<< HEAD
          z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Branding Container - Only visible on desktop layouts */}
        <div className="hidden md:flex items-center gap-3 px-6 h-20 border-b border-slate-100">
          <img src={hero} alt="Logo" className="w-10 h-10 object-contain" />

          <div>
            <h2 className="font-bold text-slate-900 tracking-tight">EduSmart</h2>
            <span className="text-[10px] text-blue-600 font-bold tracking-wider block">
=======
          z-40 md:z-50
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="hidden md:flex items-center gap-3 px-6 h-20 border-b border-slate-100">
          <img
            src={hero}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          <div>
            <h2 className="font-bold text-slate-900">
              EduSmart
            </h2>
            <span className="text-xs text-blue-600 font-medium">
>>>>>>> Shriya
              ERP SYSTEM
            </span>
          </div>
        </div>

<<<<<<< HEAD
        {/* Scrollable Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path} // Optimized: Replaced the array loop index with a unique route path string
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-slate-50 text-blue-600 font-semibold border-l-4 border-blue-600 rounded-l-none"
                      : "text-slate-600 hover:bg-slate-50/80 hover:text-slate-900"
                  }`}
                >
                  <span className={`text-base ${isActive ? "text-blue-600" : "text-slate-400"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Persistent User Info Profile Card Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
              S
            </div>

            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-slate-800 truncate">
                Sujal Sundas
              </h4>
              <p className="text-xs text-slate-400 font-medium truncate">Student Account</p>
=======
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6 px-3 space-y-2">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-linear-to-r from-blue-50 to-indigo-50 text-blue-700 font-semibold border-l-4 border-blue-600 shadow-sm rounded-l-none"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <span className="text-base">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer User */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              S
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                Sujal Sundas
              </h4>

              <p className="text-xs text-slate-500">
                Student Account
              </p>
>>>>>>> Shriya
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;