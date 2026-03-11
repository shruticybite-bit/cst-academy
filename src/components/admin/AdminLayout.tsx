import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  Menu,
  Mail,
  LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* ---------------- LOGOUT ---------------- */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/launch/dashboard");
  };

  /* ---------------- CLOSE DROPDOWN ---------------- */

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  /* ---------------- MENU LIST ---------------- */

  const menu = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/workshop", label: "Workshop", icon: BookOpen },
    { path: "/admin/contacts", label: "Contacts", icon: Mail },
    { path: "/admin/services", label: "Services", icon: Users },
    { path: "/admin/cms-popup-setting", label: "Settings", icon: Settings },
  ];

  /* ---------------- MENU ITEM ---------------- */

  const MenuItem = ({ path, label, Icon }) => {

    const active = location.pathname === path;

    return (
      <div
        onClick={() => {
          navigate(path);
          setSidebarOpen(false);
        }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all
        ${
          active
            ? "bg-[#F97316] text-white"
            : "text-gray-300 hover:bg-[#1E3A8A] hover:text-white"
        }`}
      >
        <Icon size={18} />
        {!collapsed && <span className="text-sm">{label}</span>}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F4F7FB]">

      {/* -------- MOBILE OVERLAY -------- */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* -------- SIDEBAR -------- */}

      <aside
        className={`fixed lg:relative top-0 left-0 h-screen z-50
        ${collapsed ? "w-20" : "w-64"}
        bg-[#0B1C3D] transition-all duration-300
        transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-full p-6">

          {/* Collapse Button */}

          <div className="flex justify-between mb-6">

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block text-gray-400 hover:text-white"
            >
              {collapsed ? "»" : "«"}
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              ✕
            </button>

          </div>

          {/* Logo */}

          <div className="mb-10 flex justify-center">
            <img
              src="/logo/cst-academy-logo.png"
              alt="logo"
              className="h-10 bg-white rounded p-1"
            />
          </div>

          {/* Menu */}

          <div className="space-y-2 flex-1">

            {menu.map((item) => (
              <MenuItem
                key={item.path}
                path={item.path}
                label={item.label}
                Icon={item.icon}
              />
            ))}

            {/* Logout */}

            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#1E3A8A] hover:text-white rounded-lg cursor-pointer"
            >
              <LogOut size={18} />
              {!collapsed && <span className="text-sm">Logout</span>}
            </div>

          </div>

          <div className="text-xs text-gray-400 text-center">
            © 2026 CST Academy
          </div>

        </div>
      </aside>

      {/* -------- MAIN AREA -------- */}

      <div className="flex-1 flex flex-col">

        {/* HEADER */}

        <header className="bg-white px-6 py-4 flex items-center justify-between border-b">

          <div className="flex items-center gap-4">

            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu />
            </button>

            <div className="text-sm text-gray-500">
              Admin /
              <span className="ml-1 font-medium text-[#F97316] capitalize">
                {location.pathname.split("/")[2] || "dashboard"}
              </span>
            </div>

          </div>

          {/* Profile */}

          <div className="relative" ref={dropdownRef}>

            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 bg-[#F97316] rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              A
            </div>

            {/* {profileOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border">

                <div
                  onClick={handleLogout}
                  className="px-4 py-3 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>

              </div>
            )} */}

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="flex-1 overflow-y-auto p-6">

          <AnimatePresence mode="wait">

            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>

          </AnimatePresence>

        </main>

      </div>

    </div>
  );
};

export default AdminLayout;