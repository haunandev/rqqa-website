"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Tentang Kami", href: "/tentang-kami" },
  { name: "Program", href: "/program" },
  { name: "Unit Program", href: "/unit-program" },
  { name: "Kontak", href: "/kontak" },
];

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-xl shadow-xl border-b border-white/20"
    >
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden glass-effect p-0.5 group-hover:shadow-lg group-hover:shadow-primary-600/20 transition-all duration-300">
                <Image
                  src="/images/logo.png"
                  alt="Yayasan Markaz Qurrota A'yun"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Qurrota
                </div>
                <div className="text-xs text-gray-500 font-medium">A'yun</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-1 bg-white/10 backdrop-blur-lg rounded-full px-2 py-1.5 border border-white/20">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                variants={navVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 font-medium px-4 py-2 rounded-full relative group transition-colors hover:text-primary-600"
                >
                  {item.name}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-700/10 rounded-full -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 inline-flex items-center justify-center text-gray-700 hover:text-primary-600 glass-effect rounded-lg transition-all"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 flex flex-col gap-2 glass-effect rounded-xl p-4 border border-white/20"
          >
            {navItems.map((item) => (
              <motion.div key={item.href} whileHover={{ x: 8 }}>
                <Link
                  href={item.href}
                  className="text-gray-700 transition hover:text-primary-600 font-medium py-2 px-3 rounded-lg hover:bg-primary-600/10 block"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </Container>
    </motion.header>
  );
}
