"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  // Redirect to role-specific dashboard
  const dashboardPaths = {
    student: "/admin/student",
    teacher: "/admin/teacher",
    admin: "/admin/admin-panel",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-primary-900 to-primary-800 text-white transition-all duration-300 flex flex-col border-r border-primary-700`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-primary-700 flex items-center justify-between">
          <Link href="/admin/student" className="flex items-center gap-3">
            {isSidebarOpen && <div className="text-lg font-bold">Portal</div>}
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-primary-700 rounded-lg transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {user.role === "student" && (
            <>
              <NavLink
                href="/admin/student"
                label="Dashboard"
                icon="📊"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/student?tab=programs"
                label="Program Saya"
                icon="📚"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/student?tab=progress"
                label="Progress"
                icon="📈"
                isOpen={isSidebarOpen}
              />
            </>
          )}

          {user.role === "teacher" && (
            <>
              <NavLink
                href="/admin/teacher"
                label="Dashboard"
                icon="📊"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/teacher?tab=students"
                label="Siswa"
                icon="👥"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/teacher?tab=grades"
                label="Nilai"
                icon="📝"
                isOpen={isSidebarOpen}
              />
            </>
          )}

          {user.role === "admin" && (
            <>
              <NavLink
                href="/admin/admin-panel"
                label="Dashboard"
                icon="📊"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/admin-panel?tab=users"
                label="Users"
                icon="👥"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/admin-panel?tab=programs"
                label="Programs"
                icon="📚"
                isOpen={isSidebarOpen}
              />
              <NavLink
                href="/admin/admin-panel?tab=reports"
                label="Reports"
                icon="📊"
                isOpen={isSidebarOpen}
              />
            </>
          )}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-primary-700">
          <div className="glass-effect rounded-lg p-3 mb-3">
            <div className="text-xs text-primary-300 mb-1">Logged in as</div>
            {isSidebarOpen && (
              <>
                <div className="font-semibold text-sm truncate">
                  {user.name}
                </div>
                <div className="text-xs text-primary-200 capitalize">
                  {user.role}
                </div>
              </>
            )}
          </div>
          <LogoutButton isOpen={isSidebarOpen} />
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">
            {user.role} Portal
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user.name}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user.role}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavLink({
  href,
  label,
  icon,
  isOpen,
}: {
  href: string;
  label: string;
  icon: string;
  isOpen: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-primary-700/50 transition group"
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}

function LogoutButton({ isOpen }: { isOpen: boolean }) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/80 hover:text-white hover:bg-red-600/50 transition text-sm font-medium"
    >
      <span>🚪</span>
      {isOpen && <span>Logout</span>}
    </button>
  );
}
