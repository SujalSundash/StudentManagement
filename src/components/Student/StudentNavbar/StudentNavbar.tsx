import { useState } from "react";
import {
  FaBell,
  FaEnvelope,
  FaSearch,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const StudentNavbar = () => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Desktop Search */}
        <div className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full max-w-md transition-all focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10">
          <FaSearch className="text-slate-400 text-sm" />

          <input
            type="text"
            placeholder="Search students, fees, exams..."
            className="bg-transparent outline-none ml-3 w-full text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        {/* Mobile Brand */}
        <div className="lg:hidden">
          <h1 className="font-bold text-slate-800 text-lg">
            EduSmart ERP
          </h1>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600"
          >
            <FaSearch />
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600">
            <FaEnvelope className="text-lg" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600">
            <FaBell className="text-lg" />

            <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              5
            </span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          {/* Profile */}
          <button className="flex items-center gap-3 hover:bg-slate-100 rounded-xl p-1.5 transition">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
              RK
            </div>

            <div className="hidden md:block text-left">
              <h4 className="text-sm font-semibold text-slate-800">
                Rupesh Karki
              </h4>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>

            <FaChevronDown className="hidden md:block text-xs text-slate-400" />
          </button>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-100 p-4 md:hidden flex flex-col">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <FaSearch className="text-slate-400" />

              <input
                type="text"
                autoFocus
                placeholder="Search students, fees, exams..."
                className="bg-transparent outline-none ml-3 w-full text-sm"
              />
            </div>

            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-3 bg-slate-100 rounded-xl"
            >
              <FaTimes />
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Quick Links
            </h3>

            <div className="space-y-2">
              {[
                "Student Management",
                "Attendance Reports",
                "Fee Collection",
                "Exam Results",
                "Homework & Assignments",
                "Settings",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition"
                >
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-sm text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentNavbar;