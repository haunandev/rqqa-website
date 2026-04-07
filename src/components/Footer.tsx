"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "./Container";
import { organizationData } from "@/content/data";

const footerVariants = {
  visible: {
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

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white"
    >
      <Container className="py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* About */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Tentang Kami</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Yayasan Markaz Qurrota A'yun adalah lembaga dakwah Islam yang
              berfokus pada pendidikan Qur'an dan pembentukan karakter.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Navigasi</h3>
            <ul className="space-y-2 text-gray-200">
              {[
                { name: "Home", href: "/" },
                { name: "Tentang Kami", href: "/tentang-kami" },
                { name: "Program", href: "/program" },
                { name: "Kontak", href: "/kontak" },
              ].map((item) => (
                <motion.li key={item.href} whileHover={{ x: 5 }}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-300 transition"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Programs */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Program Unggulan</h3>
            <ul className="space-y-2 text-gray-200">
              {[
                { name: "Tahfidzul Qur'an", href: "/program/tahfidzul-quran" },
                {
                  name: "Pendidikan Mulazamah",
                  href: "/program/pendidikan-mulazamah",
                },
                {
                  name: "Pengembangan Karakter",
                  href: "/program/pengembangan-karakter",
                },
              ].map((item) => (
                <motion.li key={item.href} whileHover={{ x: 5 }}>
                  <Link
                    href={item.href}
                    className="hover:text-primary-300 transition"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4">Kontak Kami</h3>
            <div className="space-y-3 text-gray-200 text-sm">
              <div>
                <p className="font-semibold text-primary-300">Alamat:</p>
                <p className="leading-relaxed">
                  {organizationData.address.street},{" "}
                  {organizationData.address.subdistrict},
                  {organizationData.address.district},{" "}
                  {organizationData.address.city}
                </p>
              </div>
              {organizationData.contact?.email && (
                <div>
                  <p className="font-semibold text-primary-300">Email:</p>
                  <p>{organizationData.contact.email}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-primary-700 pt-8 origin-left"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
            <p>
              &copy; 2024 Yayasan Markaz Qurrota A'yun. Semua hak cipta
              terlindungi.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary-300 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-300 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </motion.footer>
  );
}
