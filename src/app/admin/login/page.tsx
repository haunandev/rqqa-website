"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login gagal. Silahkan coba lagi.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { role: "Siswa", email: "student@example.com", password: "password123" },
    { role: "Guru", email: "teacher@example.com", password: "password123" },
    { role: "Admin", email: "admin@example.com", password: "password123" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        {/* Card */}
        <div className="glass-effect rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Logo & Title */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-3 bg-white/10 rounded-xl mb-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Portal Admin</h1>
            <p className="text-white/70">Yayasan Markaz Qurrota A'yun</p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Email */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@example.com"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white/20 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/90 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:bg-white/20 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-400 to-primary-500 text-white font-bold hover:shadow-lg hover:shadow-primary-600/30 disabled:opacity-50 transition-all duration-200"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white/90 text-sm font-semibold mb-3">
              📋 Demo Credentials
            </h3>
            <div className="space-y-2">
              {demoCredentials.map((cred) => (
                <div
                  key={cred.email}
                  className="text-xs text-white/60 p-2 bg-white/5 rounded border border-white/10"
                >
                  <div className="font-medium text-white/80">{cred.role}</div>
                  <div className="font-mono text-white/50 text-xs">
                    {cred.email} / {cred.password}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-white/70 hover:text-white text-sm transition"
          >
            ← Kembali ke Halaman Utama
          </a>
        </div>
      </motion.div>
    </div>
  );
}
