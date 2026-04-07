"use client";

import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function StudentDashboard() {
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
              Selamat datang, {user?.name}! 👋
            </h2>
            <p className="text-gray-600">
              Kelas: <span className="font-semibold">{user?.class}</span>
            </p>
          </div>
          <div className="text-5xl">📚</div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Program Aktif", value: "2", icon: "📖" },
          { label: "Progress", value: "75%", icon: "📈" },
          { label: "Ranking", value: "#5", icon: "🏆" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-gray-600 text-sm mb-2">{stat.label}</div>
            <div className="text-2xl font-bold text-primary-600">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Programs */}
      {tab === "overview" && (
        <motion.div variants={itemVariants} className="glass-card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Program Saya</h3>
          <div className="space-y-3">
            {[
              { title: "Tahfidzul Qur'an", progress: 85 },
              { title: "Mulazamah", progress: 60 },
            ].map((program, i) => (
              <div
                key={i}
                className="p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-lg border border-primary-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">
                    {program.title}
                  </span>
                  <span className="text-sm text-primary-600 font-bold">
                    {program.progress}%
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-primary-700 h-2 rounded-full"
                    style={{ width: `${program.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Programs Tab */}
      {tab === "programs" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Semua Program</h3>
          {[
            {
              name: "Tahfidzul Qur'an",
              teacher: "Ustadz Ahmad",
              schedule: "Sabtu 08:00",
            },
            {
              name: "Pendidikan Mulazamah",
              teacher: "Ustadz Muhammad",
              schedule: "Minggu 09:00",
            },
            {
              name: "Pengembangan Karakter",
              teacher: "Ustadzah Aisyah",
              schedule: "Rabu 16:00",
            },
          ].map((program, i) => (
            <div key={i} className="glass-card">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {program.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Pengajar: {program.teacher}
                  </p>
                  <p className="text-sm text-gray-600">
                    Jadwal: {program.schedule}
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-semibold hover:bg-primary-700 transition">
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Progress Tab */}
      {tab === "progress" && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">Progress Belajar</h3>
          <div className="glass-card">
            <div className="space-y-4">
              {[
                { metric: "Kehadiran", value: 95, max: 100 },
                { metric: "Nilai Tugas", value: 87, max: 100 },
                { metric: "Partisipasi", value: 78, max: 100 },
                { metric: "Progress Hafalan", value: 65, max: 100 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      {item.metric}
                    </span>
                    <span className="text-primary-600 font-bold">
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-700 h-2.5 rounded-full"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Activities */}
      <motion.div variants={itemVariants} className="glass-card">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Aktivitas Terbaru
        </h3>
        <div className="space-y-3">
          {[
            "✅ Menyelesaikan tugas hafalan Juz 1",
            "📝 Mengumpulkan essay Mulazamah",
            "🎯 Mencapai milestone hafalan 50 halaman",
            "🏆 Naik ranking menjadi #5 di kelas",
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
