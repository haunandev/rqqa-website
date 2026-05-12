import Link from "next/link";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { articleService } from "@/lib/api/services/articleService";
import { getImageUrl } from "@/lib/utils/image-url";
import type { Article } from "@/lib/api/services/articleService";

export default async function Home() {
  try {
    const { data: articles } = await articleService.getLatest(20);

    const articleList: Article[] = (Array.isArray(articles)
      ? articles
      : articles
        ? [articles]
        : []) as unknown as Article[];

    const featuredArticle = articleList[0] || null;
    const topArticles = articleList.slice(1, 4) || [];
    const mainArticles = articleList.slice(4, 7) || [];
    const sidebarArticles = articleList.slice(7, 10) || [];
    const allArticles = articleList.slice(10) || [];

    return (
      <>
        {/* Modern Header Bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
          <Container>
            <div className="flex items-center justify-between py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Markaz <span className="text-primary-600">Qurrota</span>
                </h1>
                <p className="text-xs text-gray-500">
                  Sumber Inspirasi & Edukasi Islam
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href="/articles"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Semua Artikel
                </Link>
                <Link
                  href="/kontak"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Hubungi
                </Link>
              </div>
            </div>
          </Container>
        </div>

        {/* Featured Article - Hero Section */}
        {featuredArticle && (
          <section className="relative overflow-hidden bg-white">
            <Container>
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Featured Article */}
                  <div className="lg:col-span-2">
                    <Link href={`/articles/${featuredArticle.slug}`}>
                      <article className="group block">
                        <div className="relative h-96 overflow-hidden rounded-2xl mb-6">
                          {featuredArticle.cover && (
                            <img
                              src={getImageUrl(featuredArticle.cover.url) || ""}
                              alt={featuredArticle.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                          {/* Category Badge */}
                          {featuredArticle.category && (
                            <div className="absolute top-4 left-4">
                              <span className="inline-block bg-primary-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
                                {featuredArticle.category.name}
                              </span>
                            </div>
                          )}

                          {/* Read Time */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-2 text-white/80 text-sm mb-3">
                              <span>📖</span>
                              <span>7 min read</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                            {featuredArticle.title}
                          </h2>

                          <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                            {featuredArticle.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                {featuredArticle.author?.name?.charAt(0)}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {featuredArticle.author?.name}
                                </p>
                                {featuredArticle.publishedAt && (
                                  <p className="text-sm text-gray-500">
                                    {new Date(
                                      featuredArticle.publishedAt,
                                    ).toLocaleDateString("id-ID", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </p>
                                )}
                              </div>
                            </div>
                            <span className="text-primary-600 font-bold text-lg group-hover:translate-x-2 transition-transform">
                              →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>

                  {/* Top Articles Sidebar */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">
                      Trending
                    </h3>
                    <div className="space-y-5">
                      {topArticles.map((article, index) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.slug}`}
                          className="group block"
                        >
                          <div className="flex gap-3">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 text-primary-600 font-bold text-sm flex-shrink-0">
                              {index + 1}
                            </span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                                {article.title}
                              </h4>
                              {article.publishedAt && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(
                                    article.publishedAt,
                                  ).toLocaleDateString("id-ID", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200" />

        {/* Main Content Area */}
        <section className="bg-white py-12">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Latest Articles Grid */}
                {mainArticles.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      Artikel Terbaru
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mainArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                      ))}
                    </div>
                  </div>
                )}

                {/* All Articles */}
                {allArticles.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                      Selengkapnya
                    </h2>
                    <div className="space-y-6">
                      {allArticles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.slug}`}
                          className="group flex gap-5 pb-6 border-b border-gray-200 last:border-0 hover:opacity-75 transition-opacity"
                        >
                          {article.cover && (
                            <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                              <img
                                src={getImageUrl(article.cover.url) || ""}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            {article.category && (
                              <span className="inline-block text-xs font-bold text-primary-600 uppercase mb-2">
                                {article.category.name}
                              </span>
                            )}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {article.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {article.author?.name}
                              </p>
                              {article.publishedAt && (
                                <p className="text-xs text-gray-500">
                                  {new Date(
                                    article.publishedAt,
                                  ).toLocaleDateString("id-ID", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </p>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center mt-12">
                  <Link
                    href="/articles"
                    className="inline-block px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                  >
                    Lihat Semua Artikel
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <aside>
                {/* Newsletter */}
                <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-6 mb-8 border border-primary-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    📬 Newsletter
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Dapatkan artikel terbaru setiap minggu langsung ke email
                    Anda
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email Anda"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600 text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors text-sm"
                    >
                      Berlangganan
                    </button>
                  </form>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Berita",
                      "Tips & Trik",
                      "Program",
                      "Inspirasi",
                      "Tanya Jawab",
                    ].map((category) => (
                      <Link
                        key={category}
                        href={`/articles?category=${category.toLowerCase()}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-white transition-colors group"
                      >
                        <span className="text-gray-700 text-sm font-medium group-hover:text-primary-600 transition-colors">
                          {category}
                        </span>
                        <span className="text-primary-600">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Latest in Sidebar */}
                {sidebarArticles.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                      Baru Saja
                    </h3>
                    <div className="space-y-4">
                      {sidebarArticles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/articles/${article.slug}`}
                          className="group block"
                        >
                          {article.cover && (
                            <div className="w-full h-24 rounded-lg overflow-hidden mb-2 bg-gray-200">
                              <img
                                src={getImageUrl(article.cover.url) || ""}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {article.title}
                          </h4>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </Container>
        </section>

        {/* About Section */}
        <section className="bg-gray-50 border-t border-gray-200 py-12">
          <Container>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Tentang Kami
                  </h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Yayasan Markaz Qurrota A'yun adalah lembaga dakwah Islam
                    yang berfokus pada pendidikan Qur'an dan pembentukan
                    karakter generasi masa depan.
                  </p>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Melalui berbagai program berkualitas, kami berkomitmen untuk
                    menyebarkan nilai-nilai Islam yang autentik dan
                    memberdayakan komunitas.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/tentang-kami"
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                      Pelajari Lebih Lanjut
                    </Link>
                    <Link
                      href="/program"
                      className="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                    >
                      Program Kami
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "2022", label: "Tahun Berdiri" },
                    { number: "6+", label: "Unit Program" },
                    {
                      number: "1000+",
                      label: "Peserta Aktif",
                    },
                    {
                      number: "50+",
                      label: "Artikel Edukatif",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-4 text-center border border-primary-200"
                    >
                      <div className="text-3xl font-bold text-primary-600 mb-1">
                        {stat.number}
                      </div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error loading articles:", error);
    return (
      <Container className="py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Selamat Datang
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Yayasan Markaz Qurrota A'yun
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/program"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700"
          >
            Jelajahi Program
          </Link>
          <Link
            href="/articles"
            className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-semibold hover:bg-primary-50"
          >
            Baca Artikel
          </Link>
        </div>
      </Container>
    );
  }
}
