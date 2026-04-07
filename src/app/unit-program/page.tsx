import Link from "next/link";
import { Container } from "@/components/Container";
import { programUnits } from "@/content/data";

export const metadata = {
  title: "Unit Program",
  description:
    "Jelajahi berbagai unit program yang tersedia di Yayasan Markaz Qurrota A'yun",
};

export default function UnitProgramPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <Container>
          <h1 className="text-4xl font-bold">Unit Program</h1>
          <p className="text-primary-100 mt-2">
            Berbagai unit yang melayani berbagai kebutuhan dan segmen masyarakat
          </p>
        </Container>
      </section>

      {/* Units Grid */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary-600 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {unit.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {unit.description}
                </p>
                <Link
                  href={`/unit-program/${unit.slug}`}
                  className="inline-block text-primary-600 font-semibold hover:text-primary-700 transition"
                >
                  Selengkapnya →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary-50">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ingin Tahu Unit Mana yang Cocok?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Tim kami siap membantu Anda memilih program yang paling sesuai
            dengan kebutuhan
          </p>
          <Link
            href="/kontak"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition"
          >
            Hubungi Tim Kami
          </Link>
        </Container>
      </section>
    </>
  );
}
