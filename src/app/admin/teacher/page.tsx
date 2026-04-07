"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function TeacherDashboard() {
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
              Assalamu'alaikum, {user?.name}! 👋
            </h2>
            <p className="text-gray-600">
              Departemen:{" "}
              <span className="font-semibold">{user?.department}</span>
            </p>
          </div>
          <div className="text-5xl">👨‍🏫</div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Siswa", value: "45", icon: "👥" },
          { label: "Kelas Aktif", value: "3", icon: "📚" },
          { label: "Tugas Pending", value: "12", icon: "📋" },
          { label: "Rating", value: "4.8⭐", icon: "⭐" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-gray-600 text-xs md:text-sm mb-2">
              {stat.label}
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary-600">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Classes Overview */}
      {tab === "overview" && (
        <motion.div variants={itemVariants} className="glass-card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Kelas Saya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Tahfidzul Qur'an - Pemula",
                students: 15,
                time: "Sabtu 08:00",
              },
              {
                name: "Tahfidzul Qur'an - Menengah",
                students: 18,
                time: "Sabtu 10:00",
              },
              { name: "Mulazamah Pagi", students: 12, time: "Minggu 06:00" },
            ].map((cls, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-lg border border-primary-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{cls.name}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>👥 {cls.students} siswa</div>
                  <div>⏰ {cls.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Students Tab */}
      {tab === "students" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Daftar Siswa</h3>
          <div className="glass-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold">Nama</th>
                    <th className="text-left py-3 px-4 font-semibold">Kelas</th>
                    <th className="text-left py-3 px-4 font-semibold">
                      Kehadiran
                    </th>
                    <th className="text-left py-3 px-4 font-semibold">Nilai</th>
                    <th className="text-left py-3 px-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Ahmad Rizki",
                      class: "Pemula",
                      attendance: "95%",
                      grade: "A",
                    },
                    {
                      name: "Siti Nur Azizah",
                      class: "Pemula",
                      attendance: "88%",
                      grade: "B+",
                    },
                    {
                      name: "Muhammad Hasan",
                      class: "Menengah",
                      attendance: "92%",
                      grade: "A-",
                    },
                    {
                      name: "Noor Eliana",
                      class: "Menengah",
                      attendance: "85%",
                      grade: "B",
                    },
                  ].map((student, i) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{student.name}</td>
                      <td className="py-3 px-4">{student.class}</td>
                      <td className="py-3 px-4">{student.attendance}</td>
                      <td className="py-3 px-4 font-semibold text-primary-600">
                        {student.grade}
                      </td>
                      <td className="py-3 px-4">
                        <button className="px-3 py-1 text-xs bg-primary-600 text-white rounded hover:bg-primary-700 transition">
                          Detail
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

      {/* Grades Tab */}
      {tab === "grades" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Manajemen Nilai</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Input Nilai */}
            <div className="glass-card">
              <h4 className="font-semibold text-gray-900 mb-4">Input Nilai</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pilih Siswa
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600">
                    <option>Ahmad Rizki</option>
                    <option>Siti Nur Azizah</option>
                    <option>Muhammad Hasan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Penilaian
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600">
                    <option>Tugas</option>
                    <option>Quiz</option>
                    <option>UAS</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nilai (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    placeholder="85"
                  />
                </div>
                <button className="w-full bg-primary-600 text-white font-semibold py-2 rounded-lg hover:bg-primary-700 transition">
                  Simpan Nilai
                </button>
              </div>
            </div>

            {/* Grade Summary */}
            <div className="glass-card">
              <h4 className="font-semibold text-gray-900 mb-4">
                Ringkasan Nilai
              </h4>
              <div className="space-y-3">
                {[
                  { name: "Ahmad Rizki", avg: "88" },
                  { name: "Siti Nur Azizah", avg: "82" },
                  { name: "Muhammad Hasan", avg: "91" },
                ].map((student, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      {student.name}
                    </span>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 font-bold rounded-lg">
                      {student.avg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
