// src/layout/users/UserDashboard.jsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Droplets,
  LayoutDashboard,
  User,
  ClipboardList,
  MapPin,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
} from "lucide-react";

const NAVIGATION = [
  { name: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/user/profile", icon: User },
  { name: "My Reports", path: "/user/reports", icon: ClipboardList },
  { name: "Water Points", path: "/user/water-points", icon: MapPin },
  { name: "Settings", path: "/user/settings", icon: Settings },
];

// Swap this for your real auth/user context when it's wired up.
const CURRENT_USER = {
  name: "Fatuma Abdi",
  email: "fatuma@example.com",
  role: "Community Member",
};

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Water point reported low",
    detail: "Borehole #14, Dertu ward",
    time: "10m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Your report was verified",
    detail: "Shallow well #7, Modogashe",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Weekly community summary",
    detail: "3 new water points added nearby",
    time: "Yesterday",
    unread: false,
  },
];

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handlePointer(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutside();
      }
    }
    function handleKey(event) {
      if (event.key === "Escape") onOutside();
    }
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [ref, onOutside]);
}

function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user] = useState(CURRENT_USER);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const navigate = useNavigate();
  const location = useLocation();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(profileRef, () => setProfileOpen(false));

  const unreadCount = notifications.filter((n) => n.unread).length;

  const pageTitle = useMemo(() => {
    const match = NAVIGATION.find((item) =>
      item.path === "/user/dashboard"
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path)
    );
    return match ? match.name : "Dashboard";
  }, [location.pathname]);

  const handleLogout = () => {
    navigate("/user-login");
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ====== SIDEBAR ====== */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-100/80 transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Sidebar navigation"
      >
        {/* Sidebar header – subtle blue brand area */}
        <div className="flex items-center gap-2.5 px-6 h-16 border-b border-slate-100 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#1565C0] flex items-center justify-center shadow-sm shadow-blue-500/10">
            <Droplets className="w-4 h-4 text-white" />
          </div>
          <span className="font-[Poppins] font-semibold text-[#0b1e33] text-sm tracking-tight">
            NE Water Tracker
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-[#1e293b]/40 hover:text-[#1e293b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] rounded"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
          {NAVIGATION.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/user/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-[Inter] text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] ${
                  isActive
                    ? "bg-[#1565C0]/5 text-[#1565C0] font-medium"
                    : "text-[#1e293b]/60 hover:bg-[#f8fafc] hover:text-[#1e293b]"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-4.5 h-4.5 stroke-[1.8]" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* User card – clean, subtle */}
        <div className="block lg:hidden border-t border-slate-100 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1565C0]/10 flex items-center justify-center text-[#1565C0] font-medium font-[Inter] text-sm">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-[Inter] font-medium text-sm text-[#0b1e33] truncate">
                {user.name}
              </p>
              <p className="font-[Inter] text-xs text-[#1e293b]/50 truncate">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Logout – clean, minimal, red accent only on hover */}
        <div className="border-t border-slate-100/80 p-3 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-[Inter] text-[#1e293b]/50 hover:text-red-600 hover:bg-red-50/80 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0]"
          >
            <LogOut className="w-4 h-4 stroke-[1.8]" />
            Log out
          </button>
        </div>
      </aside>

      {/* ====== MAIN CONTENT ====== */}
      <div className="lg:pl-72 flex-1 flex flex-col min-h-screen">
        {/* ====== TOPBAR ====== */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-100/80 px-4 md:px-8 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#1e293b]/60 hover:text-[#1e293b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] rounded"
              aria-label="Open menu"
            >
              <Menu className="w-5.5 h-5.5" />
            </button>
            <span className="font-[Inter] text-sm font-medium text-[#1e293b] hidden lg:block">
              {pageTitle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen((open) => !open);
                  setProfileOpen(false);
                }}
                className="relative text-[#1e293b]/40 hover:text-[#1e293b] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] rounded"
                aria-label="Notifications"
                aria-expanded={notifOpen}
                aria-haspopup="true"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                )}
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-100 shadow-lg shadow-slate-900/5 overflow-hidden"
                  role="menu"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33]">
                      Notifications
                    </p>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="font-[Inter] text-xs text-[#1565C0] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] rounded"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  {notifications.length === 0 ? (
                    <div className="px-4 py-8 text-center">
                      <p className="font-[Inter] text-sm text-[#1e293b]/40">
                        You're all caught up.
                      </p>
                    </div>
                  ) : (
                    <ul className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          role="menuitem"
                          className="px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-[#f8fafc] cursor-pointer"
                        >
                          <div className="flex items-start gap-2.5">
                            {n.unread && (
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1565C0] shrink-0" />
                            )}
                            <div className={n.unread ? "" : "pl-4"}>
                              <p className="font-[Inter] text-sm text-[#0b1e33] font-medium">
                                {n.title}
                              </p>
                              <p className="font-[Inter] text-xs text-[#1e293b]/50 mt-0.5">
                                {n.detail}
                              </p>
                              <p className="font-[Inter] text-xs text-[#1e293b]/30 mt-1">
                                {n.time}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => {
                  setProfileOpen((open) => !open);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1565C0] rounded-lg px-1 py-1"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-full bg-[#1565C0]/5 flex items-center justify-center text-[#1565C0] font-medium font-[Inter] text-sm ring-1 ring-[#1565C0]/10">
                  {user.name.charAt(0)}
                </div>
                <span className="font-[Inter] text-sm text-[#0b1e33] hidden sm:block">
                  {user.name}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#1e293b]/30 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-100 shadow-lg shadow-slate-900/5 overflow-hidden"
                  role="menu"
                >
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-[Inter] text-sm font-medium text-[#0b1e33] truncate">
                      {user.name}
                    </p>
                    <p className="font-[Inter] text-xs text-[#1e293b]/50 truncate">
                      {user.email}
                    </p>
                    <p className="font-[Inter] text-xs text-[#1565C0] mt-1">
                      {user.role}
                    </p>
                  </div>
                  <NavLink
                    to="/user/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 font-[Inter] text-sm text-[#1e293b]/70 hover:bg-[#f8fafc] hover:text-[#1e293b]"
                    role="menuitem"
                  >
                    <User className="w-4 h-4 stroke-[1.8]" />
                    View profile
                  </NavLink>
                  <NavLink
                    to="/user/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 font-[Inter] text-sm text-[#1e293b]/70 hover:bg-[#f8fafc] hover:text-[#1e293b]"
                    role="menuitem"
                  >
                    <Settings className="w-4 h-4 stroke-[1.8]" />
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-4 py-2.5 w-full font-[Inter] text-sm text-[#1e293b]/70 hover:bg-red-50/80 hover:text-red-600 border-t border-slate-100"
                    role="menuitem"
                  >
                    <LogOut className="w-4 h-4 stroke-[1.8]" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ====== PAGE CONTENT ====== */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>

        {/* ====== FOOTER ====== */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-100/80 py-4 px-6 md:px-8 shrink-0">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-[Inter] text-xs text-[#1e293b]/40">
              © {new Date().getFullYear()} North Eastern Community Water Tracker
            </p>
            <div className="flex items-center gap-5">
              <a
                href="/privacy"
                className="font-[Inter] text-xs text-[#1e293b]/40 hover:text-[#1565C0] transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="font-[Inter] text-xs text-[#1e293b]/40 hover:text-[#1565C0] transition-colors"
              >
                Terms
              </a>
              <span className="font-[Inter] text-xs text-[#1e293b]/20">v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default UserDashboard;