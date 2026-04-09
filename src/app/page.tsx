import Link from "next/link";
import { Container } from "@/components/Container";
import PhotoGallery from "@/components/PhotoGallery";
import { flagshipPrograms } from "@/content/data";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp">
              Yayasan Markaz <span className="text-primary-200">Qurrota</span>{" "}
              A'yun
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 text-primary-100 leading-relaxed"
              style={{ animation: "fadeInUp 0.7s ease-out 0.2s both" }}
            >
              Lembaga dakwah Islam yang berfokus pada pendidikan Qur'an dan
              pembentukan karakter generasi masa depan
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: "fadeInUp 0.7s ease-out 0.4s both" }}
            >
              <Link href="/program" className="btn-primary inline-block">
                Jelajahi Program
              </Link>
              <Link
                href="/tentang-kami"
                className="inline-block px-8 py-3 rounded-xl font-bold border-2 border-white/40 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/60 transition-all duration-200"
              >
                Tentang Kami
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50/50 to-white/50 backdrop-blur-sm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "2022", label: "Tahun Didirikan" },
              { number: "6+", label: "Unit Program" },
              { number: "1000+", label: "Santri & Peserta" },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card text-center"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                }}
              >
                <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-3">
                  {stat.number}
                </div>
                <p className="text-gray-700 text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              Program Unggulan
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl">
              Kami menawarkan berbagai program berkualitas untuk mendukung
              pengembangan spiritual dan intelektual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {flagshipPrograms.map((program, index) => (
              <div
                key={program.id}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                }}
              >
                <Link
                  href={`/program/${program.slug}`}
                  className="glass-card group h-full block hover:shadow-2xl hover:shadow-primary-600/20"
                >
                  <div className="mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl">📚</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-primary-600 transition">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {program.description}
                  </p>
                  <span className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:gap-2 transition-all">
                    Pelajari Lebih Lanjut →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Photo Gallery Section */}
      <PhotoGallery />

      {/* Vision & Mission Section */}
      <section className="py-20 bg-gradient-to-br from-white/50 to-primary-50/50 backdrop-blur-sm">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Vision */}
            <div
              className="glass-card"
              style={{ animation: "slideInLeft 0.6s ease-out" }}
            >
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                ✨ Visi
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Menjadi lembaga dakwah Islam yang berfokus pada ukhuwah dan
                optimalisasi potensi umat, guna mewujudkan generasi Islam yang
                berakhlak mulia.
              </p>
            </div>

            {/* Mission */}
            <div
              className="glass-card"
              style={{ animation: "slideInRight 0.6s ease-out" }}
            >
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                🎯 Misi
              </h3>
              <ul className="space-y-3">
                {[
                  "Menyelenggarakan pendidikan Islam berbasis mulazamah",
                  "Mewujudkan pendidikan Qur'an berkualitas",
                  "Memberdayakan komunitas dan individu",
                ].map((mission, i) => (
                  <li
                    key={i}
                    className="flex gap-3"
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${0.1 * i}s both`,
                    }}
                  >
                    <span className="text-primary-600 font-bold text-xl flex-shrink-0">
                      ✓
                    </span>
                    <span className="text-gray-700">{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-white rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary-300 rounded-full opacity-5 blur-3xl" />
        <Container className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeInUp">
            Bergabunglah Bersama Kami
          </h2>
          <p
            className="text-lg md:text-xl mb-8 text-primary-100 max-w-2xl mx-auto"
            style={{ animation: "fadeInUp 0.7s ease-out 0.2s both" }}
          >
            Daftar sekarang dan mulai perjalanan spiritual Anda bersama Yayasan
            Markaz Qurrota A'yun
          </p>
          <div style={{ animation: "fadeInUp 0.7s ease-out 0.4s both" }}>
            <Link
              href="/kontak"
              className="inline-block px-8 py-3 rounded-xl font-bold bg-white/20 text-white border border-white/40 backdrop-blur-md hover:bg-white/30 hover:border-white/60 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Hubungi Kami
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
