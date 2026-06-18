import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaBell,
  FaEnvelope,
  FaSearch,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

interface AdminNavbarProps {
  onToggleSidebar?: () => void; // Optional prop to hook up your sidebar drawer
}

const AdminNavbar = ({ onToggleSidebar }: AdminNavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Centralized Search Submit Handler
  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Direct your user to a search results page
    navigate(`/admin/search?q=${encodeURIComponent(searchQuery)}`);
    setIsMobileSearchOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 md:px-6 flex items-center justify-between shadow-sm">
        
        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-3 lg:hidden">
          {onToggleSidebar && (
            <button 
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Sidebar"
            >
              <FaBars className="text-lg" />
            </button>
          )}
         
        </div>

        {/* Desktop Search */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 w-full max-w-md focus-within:bg-white focus-within:border-indigo-500"
        >
          <FaSearch className="text-slate-400 text-sm shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students, teachers, reports..."
            className="bg-transparent outline-none ml-2 w-full text-sm text-slate-700"
          />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto lg:ml-0">
          {/* Mobile Search Trigger */}
          <button
            onClick={() => setIsMobileSearchOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Open Search"
          >
            <FaSearch />
          </button>

          {/* Messages */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600">
            <FaEnvelope className="text-lg" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              4
            </span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600">
            <FaBell className="text-lg" />
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              8
            </span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          {/* Profile Dropdown Component */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 hover:bg-slate-100 rounded-xl p-1.5 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                A
              </div>

              <div className="hidden md:block text-left">
                <h4 className="text-sm font-semibold text-slate-800">
                  Administrator
                </h4>
                <p className="text-xs text-slate-500">
                  Super Admin
                </p>
              </div>

              <FaChevronDown
                className={`hidden md:block text-xs text-slate-400 transition-transform duration-300 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-40">
                {/* User Header */}
                <div className="p-4 border-b bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-bold">
                      A
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        Administrator
                      </h4>
                      <p className="text-xs text-slate-500">
                        admin@edusmart.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Links */}
                <div className="p-2">
                  <Link
                    to="/AdminProfile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm"
                  >
                    <FaUser className="text-slate-400" />
                    My Profile
                  </Link>

                  <Link
                    to="/AdminSettings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 text-slate-700 text-sm"
                  >
                    <FaCog className="text-slate-400" />
                    Settings
                  </Link>

                  <div className="my-2 border-t border-slate-200" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 text-sm text-left"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
              <FaSearch className="text-slate-400 shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent outline-none ml-3 w-full"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-3 rounded-xl bg-slate-100 text-slate-600"
            >
              <FaTimes />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdminNavbar;