"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function AdminPanelDashboard() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Card */}
      <motion.div variants={itemVariants} className="glass-card">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Dashboard ⚙️
            </h2>
            <p className="text-gray-600">Full control over {user?.name}</p>
          </div>
          <div className="text-5xl">🔐</div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: "Total Users", value: "287", icon: "👥" },
          { label: "Siswa", value: "185", icon: "📚" },
          { label: "Guru", value: "28", icon: "👨‍🏫" },
          { label: "Program", value: "12", icon: "📖" },
          { label: "Active Sessions", value: "43", icon: "🟢" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-gray-600 text-xs mb-2">{stat.label}</div>
            <div className="text-xl font-bold text-primary-600">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="glass-card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              System Status
            </h3>
            <div className="space-y-3">
              {[
                { service: "Database", status: "Online" },
                { service: "API Server", status: "Online" },
                { service: "File Storage", status: "Online" },
                { service: "Email Service", status: "Online" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-900">
                    {item.service}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">{item.status}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                "➕ Add New User",
                "📚 Create Program",
                "📊 Generate Report",
                "🔔 Send Announcement",
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full p-3 text-left bg-gradient-to-r from-primary-50 to-primary-100/50 hover:from-primary-100 hover:to-primary-200 rounded-lg border border-primary-200 font-medium text-primary-700 transition"
                >
                  {action}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Users Management */}
      {tab === "users" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">User Management</h3>
          <div className="glass-card">
            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search users..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Name</th>
                    <th className="text-left py-3 px-4 font-semibold">Email</th>
                    <th className="text-left py-3 px-4 font-semibold">Role</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Ahmad Rizki",
                      email: "ahmad@example.com",
                      role: "Siswa",
                      status: "Active",
                    },
                    {
                      name: "Ustadz Muhammad",
                      email: "muhammad@example.com",
                      role: "Guru",
                      status: "Active",
                    },
                    {
                      name: "Siti Nurhaliza",
                      email: "siti@example.com",
                      role: "Siswa",
                      status: "Active",
                    },
                  ].map((user, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4 text-gray-600">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2" />
                        {user.status}
                      </td>
                      <td className="py-3 px-4 space-x-2">
                        <button className="px-3 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700 transition">
                          Edit
                        </button>
                        <button className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Programs Management */}
      {tab === "programs" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            Program Management
          </h3>
          <button className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition mb-4">
            + Tambah Program
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Tahfidzul Qur'an", students: 45, teachers: 3 },
              { name: "Pendidikan Mulazamah", students: 38, teachers: 2 },
              { name: "Pengembangan Karakter", students: 52, teachers: 4 },
            ].map((program, i) => (
              <div key={i} className="glass-card">
                <h4 className="font-bold text-gray-900 mb-3">{program.name}</h4>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div>👥 {program.students} Siswa</div>
                  <div>👨‍🏫 {program.teachers} Guru</div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary-600 text-white rounded text-sm font-semibold hover:bg-primary-700 transition">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 border border-red-300 text-red-600 rounded text-sm font-semibold hover:bg-red-50 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Reports */}
      {tab === "reports" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">System Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Attendance Report", icon: "📋" },
              { title: "Academic Performance", icon: "📊" },
              { title: "User Activity Log", icon: "📝" },
              { title: "Financial Report", icon: "💰" },
            ].map((report, i) => (
              <button
                key={i}
                className="glass-card text-left hover:shadow-lg transition flex items-start justify-between"
              >
                <div>
                  <h4 className="font-bold text-gray-900">{report.title}</h4>
                  <p className="text-sm text-gray-600">
                    Last generated 2 hours ago
                  </p>
                </div>
                <span className="text-3xl">{report.icon}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
