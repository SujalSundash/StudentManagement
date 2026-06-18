import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
  { name: "Students", path: "/students", icon: <FaUserGraduate /> },
  { name: "Attendance", path: "/attendance", icon: <FaClipboardCheck /> },
  { name: "Fees", path: "/fees", icon: <FaMoneyBillWave /> },
  { name: "Exams", path: "/exams", icon: <FaBook /> },
  { name: "Notices", path: "/notices", icon: <FaBell /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
];

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
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
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl text-slate-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0
          h-screen w-64
          bg-white border-r border-slate-200
          flex flex-col
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
              ERP SYSTEM
            </span>
          </div>
        </div>

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
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;