import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { articleService } from "@/lib/api/services/articleService";
import Link from "next/link";

export const metadata = {
  title: "Artikel & Berita | Yayasan Markaz Qurrota A'yun",
  description:
    "Baca artikel terbaru, tips, dan berita dari Yayasan Markaz Qurrota A'yun tentang pendidikan Islam, program, dan inspirasi",
  openGraph: {
    title: "Artikel & Berita",
    description: "Baca artikel terbaru dari Yayasan Markaz Qurrota A'yun",
    url: "https://qurrota-ayun.org/articles",
  },
};

export default async function ArticlesPage() {
  try {
    const { data: articles } = await articleService.getPublished({
      pageSize: 12,
    });

    const articleList = Array.isArray(articles) ? articles : [];

    return (
      <>
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <Container>
            <h1 className="text-5xl font-bold mb-4">Artikel & Berita</h1>
            <p className="text-lg text-primary-100 max-w-2xl">
              Baca artikel terbaru, tips, dan berita dari Yayasan Markaz Qurrota
              A'yun
            </p>
          </Container>
        </div>

        <div className="py-12 md:py-20">
          <Container>
            {articleList.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
                <p className="text-gray-600 text-lg">
                  Belum ada artikel yang dipublikasikan
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {articleList.map((article, index) => (
                    <div
                      key={article.id}
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${0.1 * index}s both`,
                      }}
                    >
                      <ArticleCard article={article} />
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link
                    href="/"
                    className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                  >
                    ← Kembali ke Home
                  </Link>
                </div>
              </>
            )}
          </Container>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);

    return (
      <>
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
          <Container>
            <h1 className="text-5xl font-bold mb-4">Artikel & Berita</h1>
          </Container>
        </div>

        <div className="py-12 md:py-20">
          <Container>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-700">
                Gagal memuat artikel. Silakan coba lagi nanti.
              </p>
            </div>
          </Container>
        </div>
      </>
    );
  }
}
