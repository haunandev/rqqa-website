import { Container } from "@/components/Container";
import { organizationData } from "@/content/data";

export const metadata = {
  title: "Tentang Kami",
  description:
    "Pelajari lebih lanjut tentang visi, misi, dan sejarah Yayasan Markaz Qurrota A'yun",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <Container>
          <h1 className="text-4xl font-bold">Tentang Kami</h1>
          <p className="text-primary-100 mt-2">
            Mengenal lebih dekat Yayasan Markaz Qurrota A'yun
          </p>
        </Container>
      </section>

      {/* Background */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Latar Belakang</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              {organizationData.background.map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Organization Info */}
      <section className="py-16 bg-primary-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary-700">
                Informasi Dasar
              </h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">
                    Nama Organisasi:
                  </p>
                  <p>{organizationData.name}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Tahun Didirikan:
                  </p>
                  <p>{organizationData.foundedYear}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Alamat:</p>
                  <p>
                    {organizationData.address.street}
                    <br />
                    {organizationData.address.subdistrict},{" "}
                    {organizationData.address.district}
                    <br />
                    {organizationData.address.city},{" "}
                    {organizationData.address.province}{" "}
                    {organizationData.address.postalCode}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary-700">
                Status Organisasi
              </h3>
              <div className="bg-white p-6 rounded-lg border-l-4 border-primary-600">
                <p className="text-gray-700 mb-4">
                  Yayasan ini adalah lembaga nirlaba (non-profit) yang terdaftar
                  resmi di Kementerian Hukum dan HAM RI.
                </p>
                <p className="text-gray-600 text-sm">
                  Berorientasi pada dunia pendidikan dan dakwah di masyarakat
                  dengan fokus pada pemberdayaan umat Islam.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <Container>
          {/* Vision */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Visi</h2>
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-lg border-l-4 border-primary-600">
              <p className="text-xl text-gray-800 leading-relaxed">
                {organizationData.vision}
              </p>
            </div>
          </div>

          {/* Missions */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Misi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {organizationData.missions.map((mission, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-primary-600 transition"
                >
                  <div className="flex gap-4">
                    <span className="text-primary-600 font-bold text-2xl flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-gray-700">{mission}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <Container className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ingin Tahu Lebih Banyak?</h2>
          <p className="text-lg mb-8 text-primary-100">
            Hubungi kami atau kunjungi kantor kami untuk diskusi lebih lanjut
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/kontak"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-primary-50 transition"
            >
              Hubungi Kami
            </a>
            <a
              href="/program"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary-600 transition"
            >
              Lihat Program
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
