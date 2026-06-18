// src/components/SuperAdmin/SuperAdminNavbar/SuperAdminNavbar.tsx

import { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell, FaSearch, FaTimes,
  FaChevronDown, FaSignOutAlt, FaUserCircle,
  FaCog, FaShieldAlt, FaCheckCircle,
  FaSchool, FaUser, FaCreditCard, FaChartBar,
} from "react-icons/fa";

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "security" | "system" | "billing" | "user";
};

type Admin = {
  name: string;
  role: string;
  email: string;
  initials: string;
};

type SearchResult = {
  id: string;
  category: "school" | "admin" | "transaction" | "report";
  title: string;
  subtitle: string;
  meta: string;
  path: string;
};

interface SuperAdminNavbarProps {
  onMenuToggle?: () => void;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const mockAdmin: Admin = {
  name: "Sujan Tamang",
  role: "Super Administrator",
  email: "superadmin@edusmart.edu.np",
  initials: "ST",
};

const mockNotifications: Notification[] = [
  { id: 1, title: "New School Registered",  message: "Greenwood International School joined the platform", time: "5 min ago",  read: false, type: "user"     },
  { id: 2, title: "Security Alert",          message: "Multiple failed login attempts from an unknown IP",   time: "20 min ago", read: false, type: "security" },
  { id: 3, title: "System Backup Completed", message: "Nightly database backup finished successfully",       time: "1 hr ago",   read: false, type: "system"   },
  { id: 4, title: "Subscription Renewed",    message: "Riverside Academy renewed their annual plan",         time: "4 hrs ago",  read: true,  type: "billing"  },
  { id: 5, title: "Server Load Warning",     message: "API response time spiked during peak hours",          time: "1 day ago",  read: true,  type: "system"   },
];

const allSearchData: SearchResult[] = [
  { id: "SCH-1001", category: "school",      title: "Greenwood International School", subtitle: "Kathmandu, Bagmati",       meta: "ID: 1001 · 1,240 students", path: "/superadmin/schools/1001" },
  { id: "SCH-1002", category: "school",      title: "Riverside Academy",              subtitle: "Pokhara, Gandaki",         meta: "ID: 1002 · 870 students",   path: "/superadmin/schools/1002" },
  { id: "SCH-1003", category: "school",      title: "Sunrise Public School",          subtitle: "Lalitpur, Bagmati",        meta: "ID: 1003 · 432 students",   path: "/superadmin/schools/1003" },
  { id: "SCH-1004", category: "school",      title: "Himalayan English Boarding",     subtitle: "Bhaktapur, Bagmati",       meta: "ID: 1004 · 610 students",   path: "/superadmin/schools/1004" },
  { id: "SCH-1005", category: "school",      title: "Summit Model School",            subtitle: "Chitwan, Bagmati",         meta: "ID: 1005 · 328 students",   path: "/superadmin/schools/1005" },
  { id: "USR-2011", category: "admin",       title: "Anil Shrestha",                  subtitle: "School Admin · Greenwood", meta: "ID: 2011 · Active",         path: "/superadmin/users/2011"   },
  { id: "USR-2022", category: "admin",       title: "Priya Thapa",                    subtitle: "School Admin · Riverside", meta: "ID: 2022 · Active",         path: "/superadmin/users/2022"   },
  { id: "USR-2033", category: "admin",       title: "Bikash Karki",                   subtitle: "School Admin · Sunrise",   meta: "ID: 2033 · Suspended",      path: "/superadmin/users/2033"   },
  { id: "USR-2044", category: "admin",       title: "Sita Rai",                       subtitle: "Finance Officer",          meta: "ID: 2044 · Active",         path: "/superadmin/users/2044"   },
  { id: "TXN-3001", category: "transaction", title: "Annual Plan — Greenwood",        subtitle: "Paid via eSewa",           meta: "TXN: 3001 · NPR 45,000",   path: "/superadmin/billing/3001" },
  { id: "TXN-3002", category: "transaction", title: "Monthly Plan — Riverside",       subtitle: "Paid via Khalti",          meta: "TXN: 3002 · NPR 4,500",    path: "/superadmin/billing/3002" },
  { id: "TXN-3003", category: "transaction", title: "Annual Plan — Sunrise",          subtitle: "Pending",                  meta: "TXN: 3003 · NPR 38,000",   path: "/superadmin/billing/3003" },
  { id: "TXN-3004", category: "transaction", title: "Annual Plan — Summit",           subtitle: "Paid via Bank Transfer",   meta: "TXN: 3004 · NPR 45,000",   path: "/superadmin/billing/3004" },
  { id: "RPT-4001", category: "report",      title: "Q1 2025 Revenue Report",         subtitle: "Finance · Apr 2025",       meta: "RPT: 4001",                 path: "/superadmin/reports/4001" },
  { id: "RPT-4002", category: "report",      title: "Enrollment Summary — 2024",      subtitle: "Academic · Jan 2025",      meta: "RPT: 4002",                 path: "/superadmin/reports/4002" },
  { id: "RPT-4003", category: "report",      title: "System Uptime Report — May",     subtitle: "Infrastructure · Jun 2025",meta: "RPT: 4003",                 path: "/superadmin/reports/4003" },
];

const CATEGORY_ORDER: SearchResult["category"][] = ["school", "admin", "transaction", "report"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const notifColor = (type: Notification["type"]) => {
  switch (type) {
    case "security": return "bg-red-100 text-red-600";
    case "system":   return "bg-blue-100 text-blue-600";
    case "billing":  return "bg-emerald-100 text-emerald-600";
    case "user":     return "bg-violet-100 text-violet-600";
  }
};

const notifIcon = (type: Notification["type"]) => {
  switch (type) {
    case "security": return "🔒";
    case "system":   return "⚙️";
    case "billing":  return "💳";
    case "user":     return "🏫";
  }
};

const catIcon = (cat: SearchResult["category"]) => {
  switch (cat) {
    case "school":      return <FaSchool     size={11} />;
    case "admin":       return <FaUser       size={11} />;
    case "transaction": return <FaCreditCard size={11} />;
    case "report":      return <FaChartBar   size={11} />;
  }
};

const catLabel = (cat: SearchResult["category"]) => {
  switch (cat) {
    case "school":      return "Schools";
    case "admin":       return "Users";
    case "transaction": return "Transactions";
    case "report":      return "Reports";
  }
};

const catBadge = (cat: SearchResult["category"]) => {
  switch (cat) {
    case "school":      return "bg-violet-50 text-violet-700 border border-violet-100";
    case "admin":       return "bg-blue-50 text-blue-700 border border-blue-100";
    case "transaction": return "bg-emerald-50 text-emerald-700 border border-emerald-100";
    case "report":      return "bg-amber-50 text-amber-700 border border-amber-100";
  }
};

// Highlight matched text
const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase().trim());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-violet-100 text-violet-700 rounded not-italic font-semibold px-0.5">
        {text.slice(i, i + query.trim().length)}
      </mark>
      {text.slice(i + query.trim().length)}
    </>
  );
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────

const SuperAdminNavbar = ({ onMenuToggle, searchValue, onSearchChange }: SuperAdminNavbarProps) => {
  const navigate = useNavigate();

  // Search — internal fallback state if parent doesn't pass searchValue
  const [internalQuery, setInternalQuery] = useState("");
  const query = searchValue !== undefined ? searchValue : internalQuery;
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // UI
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [profileOpen,      setProfileOpen]       = useState(false);
  const [notifOpen,        setNotifOpen]          = useState(false);
  const [loginModalOpen,   setLoginModalOpen]     = useState(false);
  const [isLoggedIn,       setIsLoggedIn]         = useState(true);

  // Login
  const [loginForm,    setLoginForm]    = useState({ email: "", password: "" });
  const [loginError,   setLoginError]   = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef   = useRef<HTMLDivElement>(null);

  // ── Search results (computed) ─────────────────────────────────────────────
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSearchData.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.meta.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const map: Partial<Record<SearchResult["category"], SearchResult[]>> = {};
    searchResults.forEach((r) => {
      (map[r.category] ??= []).push(r);
    });
    return map;
  }, [searchResults]);

  const showDropdown = searchFocused && query.trim().length > 0;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    onSearchChange?.(val);
  };

  const handleResultClick = (path: string) => {
    navigate(path);
    handleQueryChange("");
    setSearchFocused(false);
  };

  // ── Click-outside ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target as Node))   setNotifOpen(false);
      if (searchRef.current  && !searchRef.current.contains(e.target as Node))  setSearchFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────
  const handleLogin = async () => {
    setLoginError("");
    if (!loginForm.email || !loginForm.password) { setLoginError("Please fill in all fields."); return; }
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (loginForm.email === "superadmin@edusmart.edu.np" && loginForm.password === "admin123") {
      setIsLoggedIn(true);
      setLoginModalOpen(false);
      setLoginForm({ email: "", password: "" });
    } else {
      setLoginError("Invalid email or password.");
    }
    setLoginLoading(false);
  };

  const handleLogout = () => { setIsLoggedIn(false); setProfileOpen(false); setLoginModalOpen(true); };

  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const markOneRead = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm px-4 md:px-6 h-16 flex items-center justify-between gap-4 w-full">

        {/* Hamburger */}
        <button
          onClick={onMenuToggle}
          type="button"
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 flex flex-col gap-1 w-9 h-9 items-center justify-center shrink-0 transition-colors"
        >
          <span className="w-5 h-0.5 bg-slate-600 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-600 rounded-full" />
          <span className="w-5 h-0.5 bg-slate-600 rounded-full" />
        </button>

        {/* ── DESKTOP SEARCH ──────────────────────────────────────────────── */}
        <div className="hidden lg:block relative flex-1 max-w-md" ref={searchRef}>
          {/* Input box */}
          <div className={`flex items-center bg-slate-50 border rounded-xl px-4 py-2 transition-all ${searchFocused ? "bg-white border-violet-500 ring-4 ring-violet-500/10" : "border-slate-200"}`}>
            <FaSearch className="text-slate-400 text-sm shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={(e) => e.key === "Escape" && setSearchFocused(false)}
              placeholder="Search schools, admins, transactions..."
              className="bg-transparent outline-none ml-3 w-full text-sm text-slate-700 placeholder:text-slate-400"
            />
            {query && (
              <button
                onMouseDown={(e) => { e.preventDefault(); handleQueryChange(""); }}
                className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>

          {/* ── RESULTS DROPDOWN ────────────────────────────────────────── */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">

              {searchResults.length === 0 ? (
                /* Empty state */
                <div className="px-5 py-8 text-center">
                  <p className="text-2xl mb-2">🔍</p>
                  <p className="text-sm font-semibold text-slate-700">No results for "{query}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try a name, ID number, or transaction amount</p>
                </div>
              ) : (
                <>
                  {/* Result count */}
                  <div className="px-4 pt-3 pb-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="max-h-[380px] overflow-y-auto pb-2">
                    {CATEGORY_ORDER.map((cat) => {
                      const items = grouped[cat];
                      if (!items?.length) return null;
                      return (
                        <div key={cat}>
                          {/* Category label */}
                          <div className="flex items-center gap-2 px-4 py-1.5 mt-1">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${catBadge(cat)}`}>
                              {catIcon(cat)} {catLabel(cat)}
                            </span>
                            <span className="flex-1 h-px bg-slate-100" />
                          </div>

                          {/* Result rows */}
                          {items.map((item) => (
                            <button
                              key={item.id}
                              onMouseDown={() => handleResultClick(item.path)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left group"
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${catBadge(cat)}`}>
                                {catIcon(cat)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-violet-700 transition-colors">
                                  <Highlight text={item.title} query={query} />
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                  <Highlight text={item.subtitle} query={query} />
                                </p>
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono shrink-0">
                                <Highlight text={item.meta} query={query} />
                              </span>
                            </button>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-between bg-slate-50/60">
                    <span className="text-[10px] text-slate-400">Click a result to navigate</span>
                    <span className="text-[10px] text-slate-400">Esc to close</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile branding */}
        <div className="lg:hidden block mr-auto">
          <h1 className="font-bold text-slate-800 text-base md:text-lg truncate">Admin Portal</h1>
        </div>

        {/* ── ACTION AREA ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Mobile search trigger */}
          <button
            onClick={() => setMobileSearchOpen(true)}
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <FaSearch size={16} />
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
              className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
            >
              <FaBell className="text-base sm:text-lg" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center gap-2">
                    <FaBell className="text-violet-600 text-sm" />
                    <span className="font-semibold text-slate-800 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="bg-violet-100 text-violet-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-xs text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1">
                      <FaCheckCircle size={11} /> Mark all read
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markOneRead(n.id)}
                      className={`flex gap-3 px-4 py-3 cursor-pointer transition hover:bg-slate-50 ${!n.read ? "bg-violet-50/40" : ""}`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 ${notifColor(n.type)}`}>
                        {notifIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`text-xs font-semibold truncate ${!n.read ? "text-slate-800" : "text-slate-600"}`}>{n.title}</p>
                          {!n.read && <span className="w-2 h-2 bg-violet-500 rounded-full shrink-0" />}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">{n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-slate-100 text-center">
                  <button className="text-xs text-violet-600 hover:text-violet-800 font-medium">View all notifications →</button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block h-6 w-px bg-slate-200" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              className="flex items-center gap-2 hover:bg-slate-100 rounded-xl px-1.5 sm:px-2 py-1.5 transition-colors"
            >
              {isLoggedIn ? (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-md shrink-0">
                  {mockAdmin.initials}
                </div>
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                  <FaUserCircle size={18} />
                </div>
              )}
              <div className="hidden md:block text-left min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-tight truncate">{isLoggedIn ? mockAdmin.name : "Guest"}</p>
                <p className="text-xs text-slate-500 truncate">{isLoggedIn ? mockAdmin.role : "Not logged in"}</p>
              </div>
              <FaChevronDown className={`hidden md:block text-xs text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
                {isLoggedIn ? (
                  <>
                    <div className="px-4 py-4 bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center font-bold text-base shrink-0">{mockAdmin.initials}</div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm truncate">{mockAdmin.name}</p>
                          <p className="text-xs opacity-85 truncate">{mockAdmin.role}</p>
                          <p className="text-xs opacity-60 mt-0.5 truncate">{mockAdmin.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-1.5">
                      <button onClick={() => { navigate("/superadmin/profile"); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition text-left">
                        <FaUserCircle className="text-slate-400" /> My Profile
                      </button>
                      <button onClick={() => { navigate("/superadmin/settings"); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition text-left">
                        <FaCog className="text-slate-400" /> Settings
                      </button>
                      <button onClick={() => setProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition text-left">
                        <FaShieldAlt className="text-slate-400" /> Change Password
                      </button>
                    </div>
                    <div className="border-t border-slate-100 py-1.5">
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition text-left font-medium">
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="py-2">
                    <div className="px-4 py-4 text-center border-b border-slate-100">
                      <FaUserCircle className="text-4xl text-slate-300 mx-auto mb-2" />
                      <p className="text-sm text-slate-500">You are not logged in</p>
                    </div>
                    <button onClick={() => { setLoginModalOpen(true); setProfileOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-violet-600 hover:bg-violet-50 transition font-semibold">
                      Sign In to your account →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── MOBILE FULL-SCREEN SEARCH ────────────────────────────────────────── */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 lg:hidden flex flex-col">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 gap-3">
              <FaSearch className="text-slate-400 shrink-0 text-sm" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                placeholder="Search schools, admins, transactions..."
                className="bg-transparent outline-none w-full text-sm text-slate-700"
              />
              {query && (
                <button onClick={() => handleQueryChange("")} className="text-slate-400">
                  <FaTimes size={12} />
                </button>
              )}
            </div>
            <button onClick={() => setMobileSearchOpen(false)} className="p-3 bg-slate-100 rounded-xl text-slate-600">
              <FaTimes size={14} />
            </button>
          </div>

          <div className="mt-4 overflow-y-auto flex-1">
            {query.trim() === "" ? (
              <>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="space-y-1">
                  {[
                    { label: "Schools Management",      path: "/superadmin/schools"  },
                    { label: "User & Role Management",  path: "/superadmin/users"    },
                    { label: "Billing & Subscriptions", path: "/superadmin/billing"  },
                    { label: "Reports & Analytics",     path: "/superadmin/reports"  },
                  ].map((item) => (
                    <button key={item.label} onClick={() => { navigate(item.path); setMobileSearchOpen(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                      <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : searchResults.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-3xl mb-2">🔍</p>
                <p className="text-sm font-semibold text-slate-700">No results for "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">Try a name, ID number, or transaction amount</p>
              </div>
            ) : (
              <>
                <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </p>
                {CATEGORY_ORDER.map((cat) => {
                  const items = grouped[cat];
                  if (!items?.length) return null;
                  return (
                    <div key={cat} className="mb-4">
                      <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${catBadge(cat)}`}>
                        {catIcon(cat)} {catLabel(cat)}
                      </div>
                      <div className="space-y-1">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => { handleResultClick(item.path); setMobileSearchOpen(false); }}
                            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition text-left"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${catBadge(cat)}`}>
                              {catIcon(cat)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-slate-800 truncate">
                                <Highlight text={item.title} query={query} />
                              </p>
                              <p className="text-xs text-slate-500 truncate">
                                <Highlight text={item.meta} query={query} />
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── LOGIN MODAL ──────────────────────────────────────────────────────── */}
      {loginModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 px-6 py-6 text-white text-center relative">
              <button onClick={() => setLoginModalOpen(false)} className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-white/20 transition-colors">
                <FaTimes size={12} />
              </button>
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-2 text-lg font-bold shadow-inner">ST</div>
              <h2 className="text-base sm:text-lg font-bold">Welcome Back</h2>
              <p className="text-[11px] opacity-75 mt-0.5">Sign in to EduSmart Admin Portal</p>
            </div>
            <div className="px-6 py-5 space-y-3.5">
              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">{loginError}</div>
              )}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="superadmin@edusmart.edu.np"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent"
                />
              </div>
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded text-violet-600 focus:ring-violet-400" /> Remember me
                </label>
                <button className="text-violet-600 hover:underline bg-transparent border-none p-0 cursor-pointer">Forgot password?</button>
              </div>
              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white py-2 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 mt-2 shadow-md shadow-violet-600/10"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-center text-[10px] text-slate-400">Demo: superadmin@edusmart.edu.np / admin123</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminNavbar;