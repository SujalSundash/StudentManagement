import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTimes,
  FaHome,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBuilding,
  FaMoneyBillWave,
  FaClipboardList,
  FaBook,
  FaBullhorn,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

import hero from "../../../assets/hero.png";

// Define strict prop types
interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },

  { name: "Students", path: "/admin/student", icon: <FaUserGraduate /> },

  { name: "Teachers", path: "/admin/teacher", icon: <FaChalkboardTeacher /> },

  { name: "Departments", path: "/admin/department", icon: <FaBuilding /> },

  { name: "Attendance", path: "/admin/attendance", icon: <FaClipboardList /> },

  { name: "Fees & Payments", path: "/admin/fee-payment", icon: <FaMoneyBillWave /> },

  { name: "Exams", path: "/admin/exam", icon: <FaBook /> },

  { name: "Notices", path: "/admin/notice", icon: <FaBullhorn /> },

  { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },

  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
];

// 1. Consume isOpen & setIsOpen from parent layout
const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const location = useLocation();

  // Close sidebar drawer automatically on path navigation transitions
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  return (
    <>
      {/* Mobile Header backdrop blur layout background overlay mask */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Dynamic Draw Frame */}
      <aside
        className={`
          fixed top-0 left-0
          h-screen w-72
          bg-white border-r border-slate-200
          flex flex-col
          z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header Top Title Brand Block */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <img src={hero} alt="Logo" className="w-8 h-8 object-contain" />
            <div>
              <h2 className="font-bold text-slate-900 leading-tight">
                EduSmart
              </h2>
              <span className="text-[10px] text-indigo-600 font-bold tracking-wider block">
                ADMIN PANEL
              </span>
            </div>
          </div>

          {/* Close Sidebar button indicator toggle icon on small sizes */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-50 text-slate-500 text-lg"
          >
            <FaTimes />
          </button>
        </div>

        {/* Institution Overview Card Info Display Widget Box */}
        <div className="mx-4 mt-4 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 p-4 text-white shadow-md shrink-0">
          <p className="text-xs text-indigo-100">Institution Overview</p>
          <h3 className="text-2xl font-bold mt-0.5">2,450</h3>
          <p className="text-xs text-indigo-100">Total Students</p>
        </div>

        {/* Scrollable Nav Link Listing Panel */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3
                    px-4 py-2.5
                    rounded-xl
                    text-sm
                    transition-all duration-150
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600 font-semibold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span
                    className={`text-base ${isActive ? "text-indigo-600" : "text-slate-400"}`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Footer block row */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              A
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                Administrator
              </h4>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
