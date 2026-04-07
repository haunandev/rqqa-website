import Link from "next/link";
import { Container } from "@/components/Container";
import { flagshipPrograms } from "@/content/data";

export const metadata = {
  title: "Program Unggulan",
  description:
    "Jelajahi program-program unggulan kami yang dirancang untuk mengembangkan potensi spiritual dan intelektual",
};

export default function ProgramPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <Container>
          <h1 className="text-4xl font-bold">Program Unggulan</h1>
          <p className="text-primary-100 mt-2">
            Berbagai program berkualitas untuk pengembangan spiritual dan
            intelektual
          </p>
        </Container>
      </section>

      {/* Programs List */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flagshipPrograms.map((program) => (
              <Link
                key={program.id}
                href={`/program/${program.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary-600 hover:shadow-xl transition"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {program.description}
                  </p>

                  {program.details && (
                    <div className="mb-6 space-y-2">
                      <p className="text-sm font-semibold text-gray-700">
                        Cakupan Program:
                      </p>
                      <ul className="space-y-1">
                        {program.details.slice(0, 3).map((detail, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex gap-2"
                          >
                            <span className="text-primary-600">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <span className="inline-block text-primary-600 font-semibold group-hover:translate-x-2 transition">
                    Pelajari Selengkapnya →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-primary-50">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Mengapa Memilih Program Kami?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 text-5xl">📚</div>
              <h3 className="text-xl font-bold mb-3">Kurikulum Terstruktur</h3>
              <p className="text-gray-600">
                Program kami dirancang dengan metode yang telah terbukti efektif
                dan disesuaikan dengan kebutuhan peserta
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">👥</div>
              <h3 className="text-xl font-bold mb-3">Mentor Berpengalaman</h3>
              <p className="text-gray-600">
                Dipandu oleh para ahli dan pendidik berpengalaman di bidangnya
                masing-masing
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🎯</div>
              <h3 className="text-xl font-bold mb-3">Fokus Holistik</h3>
              <p className="text-gray-600">
                Mengembangkan spiritual, intelektual, dan karakter secara
                seimbang
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-4">Siap Mulai?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Daftarkan diri Anda sekarang dan bergabunglah dengan ribuan peserta
            lainnya
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            Hubungi Kami untuk Pendaftaran
          </Link>
        </Container>
      </section>
    </>
  );
}
