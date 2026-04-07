"use client";

import { Container } from "@/components/Container";
import { organizationData } from "@/content/data";
import { FormEvent, useState } from "react";

export default function KontakPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission here
    // You can integrate with EmailJS or your backend
    setMessage(
      "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
    );
    setLoading(false);
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <Container>
          <h1 className="text-4xl font-bold">Hubungi Kami</h1>
          <p className="text-primary-100 mt-2">
            Kami siap membantu menjawab pertanyaan Anda
          </p>
        </Container>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Informasi Kontak</h2>

              {/* Address */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-primary-700">
                  Alamat:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {organizationData.address.street}
                  <br />
                  Rt.04 Rw.10, {organizationData.address.subdistrict}
                  <br />
                  {organizationData.address.district}
                  <br />
                  {organizationData.address.city},{" "}
                  {organizationData.address.province}{" "}
                  {organizationData.address.postalCode}
                </p>
              </div>

              {/* Phone */}
              {organizationData.contact?.phone && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3 text-primary-700">
                    Telepon:
                  </h3>
                  <a
                    href={`tel:${organizationData.contact.phone}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {organizationData.contact.phone}
                  </a>
                </div>
              )}

              {/* Email */}
              {organizationData.contact?.email && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3 text-primary-700">
                    Email:
                  </h3>
                  <a
                    href={`mailto:${organizationData.contact.email}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    {organizationData.contact.email}
                  </a>
                </div>
              )}

              {/* Social Media */}
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-xl font-bold mb-4 text-primary-700">
                  Ikuti Kami:
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition"
                    aria-label="YouTube"
                  >
                    ▶
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Kirim Pesan</h2>

              {message && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="Nama Anda"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="Email Anda"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="Subjek Pesan"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pesan
                  </label>
                  <textarea
                    rows={5}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none transition"
                    placeholder="Tuliskan pesan Anda..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg font-bold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </form>
            </div>
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Lokasi Kami</h2>
          <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-600">
              [Google Maps akan ditampilkan di sini]
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
